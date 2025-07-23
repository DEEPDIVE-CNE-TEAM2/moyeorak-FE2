import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";

import icon1 from "../../../../img/Calendar.svg";
import icon2 from "../../../../img/PocketWatch.svg";
import icon3 from "../../../../img/MagneticCard.svg";
import icon4 from "../../../../img/Person.svg";

const Card = ({ id, imageUrl, title, details /*, status 파라미터 대신 계산 사용*/ }) => {
  const labels = ["접수기간", "이용기간", "수강료", "대상"];
  const icons = [icon1, icon2, icon3, icon4];
  const navigate = useNavigate();

  // 접수기간 문자열에서 종료일만 추출하여 오늘과 비교
  const isClosed = React.useMemo(() => {
    if (!details || details.length === 0) return false;

    const reg = /(\d{4}-\d{2}-\d{2})\s*~\s*(\d{4}-\d{2}-\d{2})/;
    const match = details[0].match(reg);
    if (!match) return false;

    const endDate = new Date(match[2] + "T23:59:59"); // 종료일 자정까지 포함
    const now = new Date();

    return now > endDate;
  }, [details]);

  const handleClick = () => {
    navigate(`/classReservation/${id}`);
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {isClosed ? (
          <div className={styles.badge} style={{ backgroundColor: "#999" }}>
            접수 마감
          </div>
        ) : (
          <div className={styles.badge}>접수중</div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.infoWrapper}>
          <div className={styles.labels}>
            {labels.map((label, idx) => (
              <div key={idx} className={styles.line}>
                <img src={icons[idx]} alt="" className={styles.icon} />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className={styles.values}>
            {details.map((value, idx) => (
              <div key={idx} className={styles.line}>
                {value}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <button className={styles.button} onClick={handleClick}>
            신청하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
