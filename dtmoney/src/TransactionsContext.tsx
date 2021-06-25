import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { api } from './services/api';

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
  createTransaction: (transaction: ITransactionInput) => Promise<Boolean>;
}

export const TransactionsContext = createContext<ITransactionsContextData>({} as ITransactionsContextData);

export const TransactionsProvider = ({ children }: ITransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const createTransaction = useCallback(async (transaction: ITransactionInput) => {
    try {
      const response = await api.post('/transactions', transaction);

      console.log(response.data);

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
      createTransaction,
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}
