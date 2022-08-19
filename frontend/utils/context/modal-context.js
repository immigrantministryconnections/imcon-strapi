import React, { useState, createContext, useContext } from 'react';
import SignInModal from '@/components/elements/sign-in-modal';
import SignUpModal from '@/components/elements/sign-up-modal';

export const MODAL_TYPES = {
  SIGNUP_MODAL: 'SIGNUP_MODAL',
  SIGNIN_MODAL: 'SIGNIN_MODAL',
};

const MODAL_COMPONENTS = {
  [MODAL_TYPES.SIGNIN_MODAL]: SignInModal,
  [MODAL_TYPES.SIGNUP_MODAL]: SignUpModal,
};

const initialState = {
  showModal: () => {},
  hideModal: () => {},
  store: {},
};

const ModalContext = createContext(initialState);
export const useModalContext = () => useContext(ModalContext);

export const Modal = ({ children }) => {
  const [store, setStore] = useState();
  const { modalType, modalProps } = store || {};

  const showModal = (modalType, modalProps = {}) => {
    setStore({
      ...store,
      modalType,
      modalProps,
    });
  };

  const hideModal = () => {
    setStore({
      ...store,
      modalType: null,
      modalProps: {},
    });
  };

  const renderComponent = () => {
    const ModalComponent = MODAL_COMPONENTS[modalType];
    if (!modalType || !ModalComponent) {
      return null;
    }
    return <ModalComponent id="global-modal" {...modalProps} />;
  };

  return (
    <ModalContext.Provider value={{ store, showModal, hideModal }}>
      {renderComponent()}
      {children}
    </ModalContext.Provider>
  );
};
