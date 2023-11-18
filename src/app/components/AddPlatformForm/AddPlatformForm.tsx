import React, { useState } from 'react';
import styles from './AddPlatfromForm.module.css';

// interface AddPlatformFormProps {
//   onSubmit: (platformName: string, title: string) => void;
//   onCancel: () => void;
// }

const AddPlatformForm = () => {
  const [platformName, setPlatformName] = useState('');
  const [title, setTitle] = useState('');

//   const handleSubmit = () => {
//     onSubmit(platformName, title);
//     setPlatformName('');
//     setTitle('');
//   };

  return (
    <div>
      <label className={styles.addlabel}>
        Platform Name:
        <input
          type="text"
          value={platformName}
          onChange={(e) => setPlatformName(e.target.value)}
          className={styles.addinput}
        />
      </label>
      <label className={styles.addlabel}>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.addinput}
        />
      </label>
      <button className={styles.submitButton}>
        Submit
      </button>
    </div>
  );
};

export default AddPlatformForm;