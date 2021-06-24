import { useState, useCallback, FormEvent } from 'react';
import Modal from 'react-modal';

import { api } from '../../services/api';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface INewTransactionsModalProps {
  isNewTransactionModalOpen?: Boolean;
  onCloseNewTransactionModal?: () => void;
}

export function NewTransactionsModal({ isNewTransactionModalOpen, onCloseNewTransactionModal }: INewTransactionsModalProps) {
  const [type, setType] = useState<String>('deposit');

  const [title, setTitle] = useState<String>('');
  const [value, setValue] = useState<Number>(0);
  const [category, setCategory] = useState<String>('');

  const handleCreateNewTransaction = useCallback((event: FormEvent) => {
    event.preventDefault();

    const data = {
      title,
      value,
      category,
      type
    };

    api.post('/transactions', data);
  }, [category, title, type, value]);

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

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          value={String(title)}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={Number(value)}
          onChange={(event) => setValue(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={type === 'deposit'}
            activeColor="green"
            onClick={() => setType('deposit')}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            isActive={type === 'withdraw'}
            activeColor="red"
            onClick={() => setType('withdraw')}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={String(category)}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}
