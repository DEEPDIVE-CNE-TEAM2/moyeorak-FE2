import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RentalCard.css';

const RentalCard = ({ id, imageUrl, title, details }) => {
  const labels = ['주소', '운영시간', '정원'];
  const icons = [
    "/img/Location.svg",
    "/img/PocketWatch.svg",
    "/img/Person.svg",
  ];
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/rentalReservation/${id}`);
  };

  return (
    <div className="card">
      <div
        className="card-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="card-title">{title}</div>
      <div className="card-content-wrapper">
        <div className="card-content-1">
          {labels.map((label, index) => (
            <div key={index} className="card-line">
              <img src={icons[index]} alt={label} className="card-icon" />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="card-content-2">
          {details.map((value, index) => (
            <div key={index} className="card-line">
              {value}
            </div>
          ))}
        </div>
      </div>
      <div className="card-button-wrapper">
        <button className="card-button" onClick={handleClick}>
          신청하기
        </button>
      </div>
    </div>
  );
};

export default RentalCard;
