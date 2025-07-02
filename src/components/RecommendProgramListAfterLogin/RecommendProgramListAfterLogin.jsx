import React from 'react';
import styles from './RecommendProgramListAfterLogin.module.css';

const RecommendProgramListAfterLogin = () => {
  const recentPrograms = [
    {
      title: "수영 초급반",
      time: "화 목 17:00~18:00",
      fee: { in: "36,000원", out: "50,000원" },
      image: "/img/수영초급반.png",
    },
    {
      title: "배드민턴 초급반",
      time: "월 수 금 10:00~11:00",
      fee: { in: "30,000원", out: "45,000원" },
      image: "/img/배드민턴초급.png",
    },
    {
      title: "탁구 초급반",
      time: "월 수 10:00~11:00",
      fee: { in: "25,000원", out: "30,000원" },
      image: "/img/탁구초급.png",
    },
    {
      title: "요가 심화반",
      time: "목 금 13:00~14:00",
      fee: { in: "20,000원", out: "25,000원" },
      image: "/img/요가심화반.jpg",
    },
  ];

  const popularPrograms = [
    {
      title: "수영 초급반",
      time: "화 목 17:00~18:00",
      fee: { in: "36,000원", out: "50,000원" },
      image: "/img/수영초급반.png",
    },
    {
      title: "테니스 중급반",
      time: "화 목 18:00~19:00",
      fee: { in: "38,000원", out: "53,000원" },
      image: "/img/테니스중급.jpg",
    },
    {
      title: "배드민턴 초급반",
      time: "월 수 금 10:00~11:00",
      fee: { in: "30,000원", out: "45,000원" },
      image: "/img/배드민턴초급.png",
    },
    {
      title: "요가 심화반",
      time: "목 금 13:00~14:00",
      fee: { in: "20,000원", out: "25,000원" },
      image: "/img/요가심화반.jpg",
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>최근 수강한 ‘탁구 초급’과 비슷한 프로그램이에요!</h2>
      <div className={styles.cardContainer}>
        {recentPrograms.map((program, idx) => (
          <div key={idx} className={styles.card}>
            <img src={program.image} alt={program.title} className={styles.image} />
            <div className={styles.content}>
              <h3>{program.title}</h3>
              <p className={styles.time}>{program.time}</p>
              <p className={styles.fee}>관내 {program.fee.in} / 관외 {program.fee.out}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className={styles.heading}>20대 여성 사용자들이 많이 신청한 프로그램</h2>
      <div className={styles.cardContainer}>
        {popularPrograms.map((program, idx) => (
          <div key={idx} className={styles.card}>
            <img src={program.image} alt={program.title} className={styles.image} />
            <div className={styles.content}>
              <h3>{program.title}</h3>
              <p className={styles.time}>{program.time}</p>
              <p className={styles.fee}>관내 {program.fee.in} / 관외 {program.fee.out}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendProgramListAfterLogin;
