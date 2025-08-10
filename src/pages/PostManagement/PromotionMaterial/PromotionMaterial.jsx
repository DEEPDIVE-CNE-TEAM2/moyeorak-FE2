import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PromotionMaterial.module.css';
import Navbar from '../../../components/Navbar/Navbar';
import PromotionAddEditPopup from '../PromotionAddPopup/PromotionAddPopup';
import { getPromotionImages } from '../../../Api';

const PromotionMaterial = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // ✅ 조회 API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPromotionImages();
        const formattedData = res.map(item => ({
          id: item.id,
          image: item.imageUrl,
          visible: item.active,
          displayOrder: item.displayOrder
        }));
        setData(formattedData);
      } catch (err) {
        console.error('홍보물 데이터 불러오기 실패:', err);
      }
    };

    fetchData();
  }, []);

  // ✅ 표시 여부 변경 (프론트 상태만 변경)
  const handleVisibilityChange = (id) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  // ✅ 추가 버튼 → 팝업 열기
  const openAddPopup = () => {
    setEditingItem(null);
    setIsPopupOpen(true);
  };

  // ✅ 수정 버튼 → 수정 페이지 이동
  const openEditPage = () => {
    navigate('/admin/post/promotion/edit');
  };

  // ✅ 팝업 저장 후 처리 (여기서는 단순히 닫기만)
  const handleSave = () => {
    setIsPopupOpen(false);
    // 저장 후 다시 조회 필요하면 여기서 fetchData() 호출 가능
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <div></div>
          <div className={styles.buttonGroup}>
            <button className={styles.editBtn} onClick={openAddPopup}>추가</button>
            <button className={styles.editBtn} onClick={openEditPage}>수정</button>
          </div>
        </div>

        <table className={styles.detailTable}>
          <thead>
            <tr>
              <th>순서</th>
              <th>이미지</th>
              <th>표시 여부</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item.id}>
                <td>{item.displayOrder ?? idx + 1}</td>
                <td>
                  <img
                    src={item.image}
                    alt={`홍보물 ${idx + 1}`}
                    className={styles.imagePreview}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.visible}
                    onChange={() => handleVisibilityChange(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 추가 팝업 */}
      {isPopupOpen && (
        <PromotionAddEditPopup
          onClose={() => setIsPopupOpen(false)}
          onSave={handleSave}
          initialImage={editingItem ? editingItem.image : null}
        />
      )}
    </div>
  );
};

export default PromotionMaterial;
