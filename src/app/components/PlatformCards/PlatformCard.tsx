import React from 'react';
import styles from './PlatformCard.module.css'; // Import the updated CSS module

interface PlatformCardProps {
  content: string;
  onClick: () => void;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ content, onClick }) => {
  return (
    <div className={styles['string-card']} onClick={onClick}>
      <p>{content}</p>
    </div>
  );
};

export default PlatformCard;