import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import { api } from '../services/api';

interface ITransaction {
  id: Number;
  title: String;
  amount: Number;
  type: String;
  category: String;
  createdAt: String;
}

type ITransactionInput = Omit<ITransaction, 'id' | 'createdAt'>;

interface ITransactionsProviderProps {
  children: ReactNode;
}

interface ITransactionsContextData {
  transactions: ITransaction[];
  totalDeposits: Number;
  totalWithdraws: Number;
  total: Number;
  createTransaction: (transaction: ITransactionInput) => Promise<Boolean>;
}

const TransactionsContext = createContext<ITransactionsContextData>({} as ITransactionsContextData);

export const TransactionsProvider = ({ children }: ITransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const totalDeposits = useMemo(() => (
    transactions.reduce((acc, transaction) => {
      if (transaction.type === 'deposit') {
        return acc + Number(transaction.amount);
      }

      return acc;
    }, 0)),
    [transactions]
  );

  const totalWithdraws = useMemo(() => (
    transactions.reduce((acc, transaction) => {
      if (transaction.type === 'withdraw') {
        return acc + Number(transaction.amount);
      }

      return acc;
    }, 0)),
    [transactions]
  );

  const total = useMemo(() => totalDeposits - totalWithdraws, [totalDeposits, totalWithdraws]);

  const createTransaction = useCallback(async (transaction: ITransactionInput) => {
    try {
      const response = await api.post('/transactions', transaction);

      setTransactions([...transactions, response.data.transactions]);

      return true;
    } catch (err) {
      return false;
    }
  }, [transactions]);

  useEffect(() => {
    api.get('/transactions')
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider value={{
      transactions,
      totalDeposits,
      totalWithdraws,
      total,
      createTransaction,
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  return context;
}
