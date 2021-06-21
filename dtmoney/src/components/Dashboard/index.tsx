import { TransactionsTable } from '../TransactionsTable';
import { Summary } from '../Summary';

import { Container } from './style';

export function Dashboard() {
  return (
    <Container>
      <Summary />

      <TransactionsTable />
    </Container>
  )
}
