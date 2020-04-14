import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  private transactionsReducerByType(type: 'income' | 'outcome'): number {
    return this.transactions.reduce((accumulator, transaction) => {
      if (transaction.type === type) {
        return transaction.value + accumulator;
      }

      return accumulator;
    }, 0);
  }

  public getBalance(): Balance {
    const income = this.transactionsReducerByType('income');
    const outcome = this.transactionsReducerByType('outcome');

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ type, title, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
