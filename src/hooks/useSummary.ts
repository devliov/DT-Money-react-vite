import { TransactionsContext } from "../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";
//useMemo semelhante ao memo compara o componente pai se tiver alguma alteração ele renderiza
import { useMemo } from "react";

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  const summary = useMemo(() => {
    return transactions.reduce(
      (acumulator, transaction) => {
        if (transaction.type === "income") {
          acumulator.income += transaction.price;
          acumulator.total += transaction.price;
        } else {
          acumulator.outcome += transaction.price;
          acumulator.total -= transaction.price;
        }
        return acumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      }
    );
  }, [transactions]);

  return summary;
}
