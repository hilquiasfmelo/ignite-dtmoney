import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from './services/api';

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
  createTransaction: (transaction: TransactionInput) => void;
}

// Contexto de Transações sendo exportado
export const TransactionsContext = createContext<ITransactionsContextData>(
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

  function createTransaction(transaction: TransactionInput) {
    api.post('/transactions', transaction);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
