import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';


interface ITransactionProps {
  id: string;
  title: string;
  value: number;
  type: string;
  category: string;
  created_at: string;
}

interface TransactionInput {
  title: string;
  value: number;
  type: string;
  category: string;
  created_at?: string;
}

interface ITransactionsProviderProps {
  children: ReactNode;
}

interface ITransactionsContextData {
  transactions: ITransactionProps[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

// Contexto de Transações sendo exportado
const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData
);

// Componente do Contexto que envolverá toda a aplicação
export function TransactionsProvider({ children }: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransactionProps[]>([]);

  // Carrega todas as transações
  useEffect(() => {
    loadTransactions()
  }, []);

  async function loadTransactions() {
    const response = await api.get('/transactions');
    setTransactions(response.data);
  }

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', transactionInput);

    setTransactions([...transactions, response.data]);
  }

  async function deleteTransaction(id: string) {
    await api.delete(`/transactions/${id}`);
    loadTransactions();
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction, deleteTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}