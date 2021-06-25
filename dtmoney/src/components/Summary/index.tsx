import { useTransactions } from '../../hooks/useTransactions';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';

import { Container } from "./style";

export function Summary() {
  const { totalDeposits, totalWithdraws, total } = useTransactions();

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>

        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(totalDeposits))}
        </strong>
      </div>

      <div>
        <header>
          <p>Entradas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>

        <strong>
          -{new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(totalWithdraws))}
        </strong>
      </div>
      <div className={total >= 0 ? 'deposit' : 'withdraw'}>
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>

        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(total))}
        </strong>
      </div>
    </Container>
  )
}
