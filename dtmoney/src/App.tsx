import { useState, useCallback } from 'react';
import Modal from 'react-modal';

import { GlobalStyle } from './styles/global';

import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState<Boolean>(false);

  const handleOpenNewTransactionModal = useCallback(
    () => {
      setIsNewTransactionModalOpen(true);
    },
    [],
  )

  const handleCloseNewTransactionModal = useCallback(
    () => {
      setIsNewTransactionModalOpen(false);
    },
    [],
  )

  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      <GlobalStyle />

      <Modal
        isOpen={!!isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      >
        <h2>Cadastrar transação</h2>
      </Modal>
    </>
  );
}
