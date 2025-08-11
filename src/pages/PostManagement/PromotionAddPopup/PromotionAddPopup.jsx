import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import styles from './PromotionAddPopup.module.css';
import { uploadPromotionImage } from '../../../Api'; // 경로 맞춰주세요

const PromotionAddPopup = ({ onClose, onSave }) => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // 이미지 선택 시 미리보기 및 파일 저장
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // 이미지 삭제
  const handleDelete = () => {
    setFile(null);
    setImagePreview(null);
  };

  // 저장 (API 호출)
  const handleSave = async () => {
    if (!file) {
      alert('이미지를 등록해주세요.');
      return;
    }

    try {
      const result = await uploadPromotionImage(file);
      alert('홍보물이 등록되었습니다.');
      // result 전체가 아니라, imageUrl만 부모 콜백으로 전달
      if (onSave) onSave(result.imageUrl);
      onClose();
    } catch (error) {
      console.error(error);
      alert('등록 실패. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <IoMdClose size={24} />
        </button>

        <h3 className={styles.title}>홍보물 추가</h3>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.fileInput}
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="등록된 홍보물"
            className={styles.previewImage}
          />
        )}

        <div className={styles.btnRow}>
          <button className={styles.deleteBtn} onClick={handleDelete}>
            삭제
          </button>
        </div>

        <button className={styles.saveBtn} onClick={handleSave}>
          저장
        </button>
      </div>
    </>
  );
};

export default PromotionAddPopup;
