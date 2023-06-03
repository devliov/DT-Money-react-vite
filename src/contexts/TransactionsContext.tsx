// npm i use-context-selector scheduler para fazer a renderizacao unitária
import { ReactNode, useCallback, useEffect, useState } from "react";
import { API } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}
interface CreateTransactionInput {
  category: string;
  description: string;
  price: number;
  type: "income" | "outcome";
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // sem axios
  // async function fetchTransactions(query?: string) {
  //   const url = new URL("http://localhost:3004/transactions");

  //   if (query) {
  //     url.searchParams.append("q", query);
  //   }

  //   const response = await fetch(url);
  //   const data = await response.json();

  //   setTransactions(data);
  // }

  //com axios
  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await API.get("transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });

    setTransactions(response.data);
  }, []);

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { category, description, price, type } = data;
      const response = await API.post("transactions", {
        category,
        description,
        price,
        type,
        createdAt: new Date(),
      });
      setTransactions((state) => [response.data, ...state]);
    },
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
