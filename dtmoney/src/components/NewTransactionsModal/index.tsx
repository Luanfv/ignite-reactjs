import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import { Container } from './styles';

interface INewTransactionsModalProps {
  isNewTransactionModalOpen?: Boolean;
  onCloseNewTransactionModal?: () => void;
}

export function NewTransactionsModal({ isNewTransactionModalOpen, onCloseNewTransactionModal }: INewTransactionsModalProps) {
  return (
    <Modal
      isOpen={!!isNewTransactionModalOpen}
      onRequestClose={onCloseNewTransactionModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button">
        <img
          src={closeImg}
          alt="Fechar modal"
          onClick={onCloseNewTransactionModal}
          className="react-modal-close"
        />
      </button>

      <Container>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
        />


        <input
          type="number"
          placeholder="Valor"
        />

        <input
          placeholder="Categoria"
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}
