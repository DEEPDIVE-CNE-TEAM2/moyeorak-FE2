import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar.jsx';
import SelectPanel from './SelectPanel/SelectPanel.jsx';
import Card from './card/Card.jsx';
import styles from './ClassReservation.module.css';

const ClassReservation = () => {
  const [cardData, setCardData] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    // 나중에 axios로 백엔드 데이터 받아오기
    const dummy = [
      {
        id: 1,
        sport: '축구', // 종목 추가
        status: '접수 중', // 상태 추가
        imageUrl: "/img/어린이축구강습.png",
        title: '어린이 축구교실',
        details: ['2025.07.08~2025.07.31', '2025.08.01~2025.08.10', '관내 36,200 / 관외 40,000', '어린이']
      },
      {
        id: 2,
        sport: '탁구',
        status: '접수 중',
        imageUrl: "/img/탁구강의홍보.png",
        title: '탁구 초급반',
        details: ['2025.07.08~2025.07.31', '2025.08.10~2025.08.25', '관내 30,000 / 관외 33,000', '제한없음']
      },
      {
        id: 3,
        sport: '테니스',
        status: '접수 중',
        imageUrl: "/img/테니스강습.png",
        title: '테니스 초급반',
        details: ['2025.07.08~2025.07.31', '2025.08.01~2025.08.20', '관내 36,200 / 관외 40,000', '제한없음']
      },
      {
        id: 4,
        sport: '수영',
        status: '접수 중',
        imageUrl: "/img/수영초급반.png",
        title: '수영 초급반',
        details: ['2025.07.08~2025.07.31', '2025.08.01~2025.08.20', '관내 36,200 / 관외 40,000', '제한없음']
      }
    ];
    setCardData(dummy);
  }, []);

  // 종목 + 상태 필터링
  const filteredData = cardData.filter(card => {
    const sportMatch = selectedSport ? card.sport === selectedSport : true;
    const statusMatch = selectedStatus ? card.status === selectedStatus : true;
    return sportMatch && statusMatch;
  });

  return (
    <>
      <Navbar />
      <div className={styles.centerWrapper}>
        <SelectPanel
          selectedSport={selectedSport}
          setSelectedSport={setSelectedSport}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        <div className={styles.cardGrid}>
          {filteredData.length % 2 === 1 ? (
            <>
              {filteredData.slice(0, -1).map((card) => (
                <Card key={card.id} {...card} />
              ))}
              <div className={styles.singleCardWrapper}>
                <Card {...filteredData[filteredData.length - 1]} />
              </div>
            </>
          ) : (
            filteredData.map((card) => <Card key={card.id} {...card} />)
          )}
        </div>
      </div>
    </>
  );
};

export default ClassReservation;
