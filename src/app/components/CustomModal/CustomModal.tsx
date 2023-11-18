// components/CustomModal.tsx

import React, { ReactNode } from 'react';
import styles from './CustomModal.module.css';
import CloseIcon from '@mui/icons-material/Close';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, title, children }) => {
  const handleCloseButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); // Prevent the click event from propagating to the modal overlay
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <button className={styles.closeButton} onClick={handleCloseButtonClick}>
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;