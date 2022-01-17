import { Summary } from '../Summary';
import { TranscationTable } from '../TransactionsTable';
import { Container } from './styles';

export function Dashboard() {
  return (
    <Container>
      <Summary />
      <TranscationTable />
    </Container>
  );
}
