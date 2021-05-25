import { Button, Modal, ModalFooter, ModalHeader } from 'reactstrap';

interface CustomModalProps {
  title?: string;
  children: JSX.Element;
  cancelFunc: () => void;
  toggle: () => void;
  isOpen: boolean;
  size?: 'sm' | 'md' | 'lg';
  centered?: boolean;
  centeredButtons?: boolean;
  autoFocus?: boolean;
}

const CustomModal = ({
  title,
  isOpen,
  size,
  centeredButtons,
  toggle,
  cancelFunc,
  children,
}: CustomModalProps) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size={size} autoFocus centered>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalFooter
        className={`${centeredButtons ? 'd-flex justify-content-center' : ''}`}
      >
        {children}
        <Button color="danger" onClick={cancelFunc}>
          CANCEL
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;
