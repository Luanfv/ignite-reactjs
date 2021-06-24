import { useEffect, useState } from 'react';
import { api } from '../../services/api';

import { Container } from './style';

interface ITRansaction {
  id: Number;
  title: String;
  amount: Number;
  type: String;
  category: String;
  createdAt: String;
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<ITRansaction[]>([]);

  useEffect(() => {
    api.get('/transactions')
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={String(transaction.id)}>
              <td>
                {transaction.title}
              </td>
              <td className={String(transaction.type)}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Number(transaction.amount))}
              </td>
              <td>
                {transaction.category}
              </td>
              <td>
              {new Intl.DateTimeFormat('pt-BR').format(new Date(String(transaction.createdAt)))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
