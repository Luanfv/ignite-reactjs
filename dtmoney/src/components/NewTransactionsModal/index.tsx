import { useState, useCallback, FormEvent, useContext } from 'react';
import Modal from 'react-modal';

import { TransactionsContext } from '../../TransactionsContext';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface INewTransactionsModalProps {
  isNewTransactionModalOpen?: Boolean;
  onRequestClose: () => void;
}

export function NewTransactionsModal({ isNewTransactionModalOpen, onRequestClose }: INewTransactionsModalProps) {
  const { createTransaction } = useContext(TransactionsContext);

  const [type, setType] = useState('deposit');

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  const handleCreateNewTransaction = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    const response = await createTransaction({
      title,
      amount,
      category,
      type
    });

    if (response) {
      onRequestClose();

      setType('deposit');
      setTitle('');
      setAmount(0);
      setCategory('');
    }
  }, [category, createTransaction, onRequestClose, title, type, amount]);

  return (
    <Modal
      isOpen={!!isNewTransactionModalOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button">
        <img
          src={closeImg}
          alt="Fechar modal"
          onClick={onRequestClose}
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
          value={Number(amount)}
          onChange={(event) => setAmount(Number(event.target.value))}
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
