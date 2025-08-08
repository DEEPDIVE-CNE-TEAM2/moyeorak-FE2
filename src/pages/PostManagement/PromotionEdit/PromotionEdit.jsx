import React, { useState } from 'react';
import styles from './PromotionEdit.module.css';
import Navbar from '../../../components/Navbar/Navbar';
import sampleImage from '../../../img/아이콘최종.png';
import { FaTrashAlt } from 'react-icons/fa';

const initialData = [
  { id: 1, image: sampleImage, visible: true },
  { id: 2, image: sampleImage, visible: false },
  { id: 3, image: sampleImage, visible: false },
];

const toggleSwitchStyle = {
  position: 'relative',
  display: 'inline-block',
  width: '40px',
  height: '22px',
};

const sliderStyle = {
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#ccc',
  transition: '.4s',
  borderRadius: '34px',
};

const sliderBeforeStyle = {
  position: 'absolute',
  content: '""',
  height: '16px',
  width: '16px',
  left: '3px',
  bottom: '3px',
  backgroundColor: 'white',
  transition: '.4s',
  borderRadius: '50%',
};

const PromotionEdit = () => {
  const [data, setData] = useState(initialData);

  const handleVisibilityChange = (id, checked) => {
    const updated = data.map(item =>
      item.id === id ? { ...item, visible: checked } : item
    );
    setData(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    alert('저장 완료! (임시)');
    // 실제 저장 로직은 API 연동
  };

  const handleCancel = () => {
    alert('수정 취소되었습니다.');
    // 이전 화면으로 이동하거나 상태 초기화
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <div></div>
          <div className={styles.buttonGroup}>
            <button className={styles.editBtn} onClick={handleSave}>저장</button>
            <button className={styles.deleteBtn} onClick={handleCancel}>취소</button>
          </div>
        </div>

        <table className={styles.detailTable}>
          <thead>
            <tr>
              <th>순서</th>
              <th>이미지</th>
              <th>표시 여부</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>
                  <img
                    src={item.image}
                    alt={`홍보물 ${idx + 1}`}
                    className={styles.imagePreview}
                  />
                </td>
                <td>
                  {/* 토글 스위치 */}
                  <label style={toggleSwitchStyle}>
                    <input
                      type="checkbox"
                      checked={item.visible}
                      onChange={(e) =>
                        handleVisibilityChange(item.id, e.target.checked)
                      }
                      style={{ display: 'none' }}
                    />
                    <span
                      style={{
                        ...sliderStyle,
                        backgroundColor: item.visible ? '#4caf50' : '#ccc',
                      }}
                    >
                      <span
                        style={{
                          ...sliderBeforeStyle,
                          transform: item.visible ? 'translateX(18px)' : 'translateX(0)',
                        }}
                      />
                    </span>
                  </label>
                </td>
                <td>
                  <button
                    className={styles.deleteIconBtn}
                    onClick={() => handleDelete(item.id)}
                    title="삭제"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PromotionEdit;
