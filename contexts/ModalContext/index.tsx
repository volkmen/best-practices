import React from 'react';
import Modal from 'components/Modal';

interface IModalContext {
  openModal: (
    component: React.ReactNode,
    options?: { modalType?: ModalType; getStyles?: (styles: { content?: object }) => { content?: object } }
  ) => void;
  closeModal: () => void;
}

export const ModalContext = React.createContext<IModalContext>({ openModal: () => null, closeModal: () => null });

interface ModalContextProviderProps {
  children: React.ReactNode;
}

type ModalType = 'default' | 'confirm';

const ModalContextProvider: React.FC<ModalContextProviderProps> = ({ children }) => {
  const [modalComponent, setModalComponent] = React.useState<React.ReactNode>(null);
  const [options, setOptions] = React.useState<{ modalType?: ModalType }>({});

  const openModal = React.useCallback((component: React.ReactNode, optionsL = {}) => {
    setModalComponent(() => component);
    setOptions(optionsL);
  }, []);

  const closeModal = React.useCallback(() => {
    setModalComponent(null);
    setOptions({});
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal isOpen={Boolean(modalComponent)} onClose={closeModal} modalType='default' {...options}>
        {modalComponent}
      </Modal>
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
