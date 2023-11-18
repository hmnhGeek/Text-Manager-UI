import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

type CustomBreadcrumbsActionType = {
    icon: React.ReactElement,
    name: string
};

interface CustomSpeedDialProps {
    className: string,
    actions: CustomBreadcrumbsActionType[],
    speedDialIcon: React.ReactElement
};

const CustomSppedDial: React.FC<CustomSpeedDialProps> = (props) => {
  return (
    <div className={props.className}>
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={props.speedDialIcon}
        >
            {props.actions.map((action) => (
            <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
            />
            ))}
        </SpeedDial>
        </Box>
    </div>
  );
}

export default CustomSppedDial;