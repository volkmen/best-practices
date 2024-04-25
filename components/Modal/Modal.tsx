import React from 'react';
import ReactModal from 'react-modal';
import { IoMdClose } from 'react-icons/io';
import './Modal.scss';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  modalType: 'default' | 'confirm';
  getStyles?: (styles: object) => { content: object; overlay: object };
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    maxWidth: '600px',
    backgroundColor: '#323232',
    borderColor: '#616263',
    padding: '2rem'
  },
  overlay: {
    backgroundColor: 'rgba(0 0 0 / .8)',
    zIndex: 21
  }
};

const modalStylesMap = {
  default: customStyles,
  confirm: {
    content: {
      ...customStyles.content,
      padding: '1rem',
      width: '100%',
      maxWidth: '400px'
    },
    overlay: {
      backgroundColor: 'rgba(0 0 0 / .4)'
    }
  }
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, modalType = 'default', getStyles = null }) => (
  <ReactModal
    isOpen={isOpen}
    style={getStyles ? getStyles(modalStylesMap[modalType]) : modalStylesMap[modalType]}
    ariaHideApp={false}
  >
    {children}
    {modalType === 'default' && <IoMdClose size={35} className='close-icon' onClick={onClose} />}
  </ReactModal>
);

export default Modal;
