import { useTransactions } from '../../hooks/useTransactions';

import { Container } from './style';

export function TransactionsTable() {
  const { transactions } = useTransactions();

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
                {transaction.type === 'withdraw' && '-'}
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
