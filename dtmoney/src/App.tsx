import { useState, useCallback } from 'react';
import Modal from 'react-modal';

import { GlobalStyle } from './styles/global';

import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { NewTransactionsModal } from './components/NewTransactionsModal';

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

      <NewTransactionsModal
        isNewTransactionModalOpen={isNewTransactionModalOpen}
        onCloseNewTransactionModal={handleCloseNewTransactionModal}
      />

      <GlobalStyle />
    </>
  );
}
