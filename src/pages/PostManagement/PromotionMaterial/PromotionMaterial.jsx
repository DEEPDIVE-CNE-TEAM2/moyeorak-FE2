// src/pages/Admin/PromotionMaterial/PromotionMaterial.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PromotionMaterial.module.css';
import Navbar from '../../../components/Navbar/Navbar';
import PromotionAddEditPopup from '../PromotionAddPopup/PromotionAddPopup';
import { getPromotionImages } from '../../../Api'; // API 호출 함수 import

const PromotionMaterial = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // 수정 중인 아이템(null=추가)

  // ✅ 페이지 로드 시 홍보물 리스트 API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPromotionImages();
        const formattedData = res.map(item => ({
          id: item.id,
          image: item.imageUrl, // API 필드명: imageUrl
          visible: item.active, // API 필드명: active
          displayOrder: item.displayOrder
        }));
        setData(formattedData);
      } catch (err) {
        console.error('홍보물 데이터 불러오기 실패:', err);
      }
    };

    fetchData();
  }, []);

  const handleVisibilityChange = (id) => {
    const updatedData = data.map(item =>
      item.id === id ? { ...item, visible: !item.visible } : item
    );
    setData(updatedData);
    // 필요하면 여기서 표시 여부 변경 API 호출(PATCH) 추가 가능
  };

  const openAddPopup = () => {
    setEditingItem(null);
    setIsPopupOpen(true);
  };

  const openEditPage = () => {
    navigate('/admin/post/promotion/edit');
  };

  const handleSave = (image) => {
    if (editingItem) {
      // 수정
      const updatedData = data.map(item =>
        item.id === editingItem.id ? { ...item, image } : item
      );
      setData(updatedData);
    } else {
      // 추가 (프론트에서만 반영 — 실제 API 호출 필요)
      const newId = data.length ? Math.max(...data.map(d => d.id)) + 1 : 1;
      const newItem = { id: newId, image, visible: false };
      setData([...data, newItem]);
    }
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
