import styles from './RecommendProgramCard.module.css';

const RecommendProgramCard = ({ title, time, fee, image }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{time}</p>
        <p>관내 {fee.in} / 관외 {fee.out}</p>
      </div>
    </div>
  );
};

export default RecommendProgramCard;
