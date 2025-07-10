import React from 'react';
import styles from './SelectPanel.module.css';
import deleteIcon from '../../../../img/delete.svg';

import { PiSoccerBallFill } from 'react-icons/pi';
import { CiBaseball } from 'react-icons/ci';
import { FaSwimmer } from 'react-icons/fa';
import { IoIosTennisball } from 'react-icons/io';
import { GiShuttlecock } from 'react-icons/gi';
import { RiPingPongFill } from 'react-icons/ri';

const sportOptions = [
  { name: '축구', icon: <PiSoccerBallFill size={60} /> },
  { name: '야구', icon: <CiBaseball size={60} /> },
  { name: '수영', icon: <FaSwimmer size={60} /> },
  { name: '테니스', icon: <IoIosTennisball size={60} /> },
  { name: '배드민턴', icon: <GiShuttlecock size={60} /> },
  { name: '탁구', icon: <RiPingPongFill size={60} /> },
];

const statusOptions = ['접수 중', '접수 마감'];

const SelectPanel = ({ selectedSport, setSelectedSport, selectedStatus, setSelectedStatus }) => {
  const toggleSelect = (value, selectedValue, setter) => {
    setter(value === selectedValue ? null : value);
  };

  return (
    <>
      <div className={styles.wrapper}>
        {/* 종목 선택 */}
        <div className={styles.sectionTitle}>종목 선택</div>
        <div className={styles.sportOptions}>
          {sportOptions.map((sport, index) => (
            <div
              key={index}
              className={`${styles.sportItem} ${selectedSport === sport.name ? styles.selected : ''}`}
              onClick={() => toggleSelect(sport.name, selectedSport, setSelectedSport)}
            >
              <div
                className={styles.sportIcon}
                style={{ color: selectedSport === sport.name ? '#3096E6' : '#555555' }}
              >
                {sport.icon}
              </div>
              <div
                className={styles.sportLabel}
                style={{ color: selectedSport === sport.name ? '#3096E6' : '#333' }}
              >
                {sport.name}
              </div>
            </div>
          ))}
        </div>

        {/* 접수 상태 */}
        <div className={styles.sectionTitle}>접수 상태</div>
        <div className={styles.statusOptions}>
          {statusOptions.map((status, index) => (
            <div
              key={index}
              className={`${styles.statusItem} ${selectedStatus === status ? styles.selected : ''}`}
              onClick={() => toggleSelect(status, selectedStatus, setSelectedStatus)}
            >
              {status}
            </div>
          ))}
        </div>
      </div>

      {/* 선택된 항목 출력 */}
      {(selectedSport || selectedStatus) && (
        <div className={styles.selectedChips}>
          {selectedSport && (
            <div className={styles.chip}>
              {selectedSport}
              <img
                src={deleteIcon}
                alt="삭제"
                className={styles.deleteIcon}
                onClick={() => setSelectedSport(null)}
              />
            </div>
          )}
          {selectedStatus && (
            <div className={styles.chip}>
              {selectedStatus}
              <img
                src={deleteIcon}
                alt="삭제"
                className={styles.deleteIcon}
                onClick={() => setSelectedStatus(null)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SelectPanel;
