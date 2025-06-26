import styles from './RecommendProgramSection.module.css';
import RecommendProgramCard from '../RecommendProgramCard/RecommendProgramCard';

const RecommendProgramSection = () => {
  const programs = [
    {
      title: "어린이 축구교실",
      time: "토 일 17:00~18:00",
      fee: { in: "36,000원", out: "50,000원" },
      image: "/img/어린이축구반 (1).png",
    },
    {
      title: "수영 초급반",
      time: "월 수 금 17:00~18:00",
      fee: { in: "36,000원", out: "50,000원" },
      image: "/img/수영초급반.png",
    },
    {
      title: "배드민턴 초급반",
      time: "화 목 금 17:00~18:00",
      fee: { in: "36,000원", out: "50,000원" },
      image: "/img/배드민턴초급.png",
    },
    {
      title: "중년을 위한 요가반",
      time: "화 목 17:00~18:00",
      fee: { in: "36,000원", out: "50,000원" },
      image: "/img/중년요가.jpg",
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>이번 주 가장 관심도가 높은 강의를 확인하세요!</h2>
      <div className={styles.cardContainer}>
        {programs.map((p, i) => (
          <RecommendProgramCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
};

export default RecommendProgramSection;
