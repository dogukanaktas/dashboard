import { ReactNode, useEffect } from 'react';
import { Alert } from 'reactstrap';

interface CustomAlertProps {
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  isOpen?: boolean;
  fade?: boolean;
  timeoutTime?: number;
  toggle?: () => void;
  children: ReactNode;
}

const CustomAlert = ({
  color,
  isOpen,
  fade,
  timeoutTime = 2000,
  toggle,
  children,
}: CustomAlertProps) => {
  useEffect(() => {
    let closeAlert = setTimeout(() => toggle?.(), timeoutTime);
    return () => {
      clearTimeout(closeAlert);
    };
  }, [isOpen]);

  return (
    <Alert
      color={`${isOpen ? color : 'danger'}`}
      isOpen={isOpen}
      fade={fade}
      toggle={toggle}
    >
      {children}
    </Alert>
  );
};

export default CustomAlert;
