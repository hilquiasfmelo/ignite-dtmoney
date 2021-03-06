import Modal from 'react-modal';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

import { Container, TranscationTypeContainer, RadioBox } from './styles';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

interface INewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: INewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      value,
      type,
      category,
    });

    setTitle('');
    setValue(0);
    setCategory('');
    setType('deposit');

    // Assim que criarmos uma transação fecha o modal automaticamente
    onRequestClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName="react-modal-overlay" className="react-modal-content">

      {/* Adicionando botão de fechar o Modal */}
      <button type="button" onClick={onRequestClose}>
        <img src={closeImg} alt="Fechar Modal" className="react-modal-close" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input type="text" placeholder="Título" value={title} onChange={(event) => setTitle(event.target.value)} />

        <input type="number" placeholder="Valor" value={value} onChange={(event) => setValue(Number(event.target.value))} />

        <TranscationTypeContainer>
          <RadioBox type="button" onClick={() => { setType('deposit') }} isActive={type === 'deposit'} activeColor="green" >
            <img src={incomeImg} alt="Entradas" />
            <span>Entradas</span>
          </RadioBox>

          <RadioBox type="button" onClick={() => { setType('withdraw') }} isActive={type === 'withdraw'} activeColor="red" >
            <img src={outcomeImg} alt="Saídas" />
            <span>Saídas</span>
          </RadioBox>
        </TranscationTypeContainer>

        <input type="text" placeholder="Categoria" value={category} onChange={(event) => setCategory(event.target.value)} />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
