import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

interface AccordionProps {
  title: string;
  prompts: string[];
}

const CollapsibleCard: React.FC<AccordionProps> = ({ title, prompts }) => {
  return (
    <div>
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
            <ul>
              {prompts.map((prompt, index) => (
                <li key={index}>{prompt}</li>
              ))}
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CollapsibleCard;