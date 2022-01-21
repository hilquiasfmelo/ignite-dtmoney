import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface ITransactionProps {
  id: string;
  title: string;
  value: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<ITransactionProps, 'id' | 'createdAt'>;

interface ITransactionsProviderProps {
  children: ReactNode;
}

interface ITransactionsContextData {
  transactions: ITransactionProps[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

// Contexto de Transações sendo exportado
const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData
);

// Componente do Contexto que envolverá toda a aplicação
export function TransactionsProvider({ children }: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransactionProps[]>([]);

  useEffect(() => {
    api
      .get('/transactions')
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });

    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}