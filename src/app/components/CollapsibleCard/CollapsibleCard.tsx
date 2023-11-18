import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import styles from "./CollapsibleCard.module.css";

interface AccordionProps {
  title: string;
  prompts: string[];
}

const CollapsibleCard: React.FC<AccordionProps> = ({ title, prompts }) => {
  return (
    <div className={styles['collapsible-card']}>
      <Accordion>
        <AccordionSummary
        //   expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul className={styles['collapsible-list']}>
              {prompts.map((prompt, index) => (
                <li key={index} className={styles['collapsible-list-item']}>{prompt}</li>
              ))}
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CollapsibleCard;