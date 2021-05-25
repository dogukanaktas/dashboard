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
  toggle?: () => void;
  children: ReactNode;
}

const CustomAlert = ({ color, isOpen, fade, toggle, children }: CustomAlertProps) => {
  useEffect(() => {
    let closeAlert = setTimeout(() => {
      toggle?.();
    }, 3000);
    return () => {
      clearTimeout(closeAlert);
    };
  }, []);

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