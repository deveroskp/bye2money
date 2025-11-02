import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useInputBarContext} from './InputBarContext';
import {useAppContext} from './AppContext';

export type Transaction = {
    id: string;
    date: string;
    amount: number;
    isExpense: boolean;
    description: string;
    paymentMethod: string;
    category: string;
};

type TransactionContextValue = {
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    TotalTransaction: number;
    expensedChecked: boolean;
    setExpensedChecked: React.Dispatch<React.SetStateAction<boolean>>;
    incomeChecked: boolean;
    setIncomeChecked: React.Dispatch<React.SetStateAction<boolean>>;
    totalExpenseAmount: number;
    totalIncomeAmount: number;
    editHandler: (targetTransaction: Transaction) => void;
    deleteTransaction: (id: string) => void;
    transactionToDelete: Transaction | null;
    setTransactionToDelete: React.Dispatch<React.SetStateAction<Transaction | null>>;
};

const TransactionContext = createContext<TransactionContextValue | null>(null);

const STORAGE_KEY = 'bye2money:transactions';

export function TransactionContextProvider({children}: {children: React.ReactNode}) {
    const {year, month} = useAppContext();

    const {setDate, setIsExpense, setAmount, setDescription, setPaymentMethod, setCategory} = useInputBarContext();

    const [allTransactions, setAllTransactions] = useState<Transaction[]>(() => {
        if (typeof window === 'undefined') {
            return [];
        }
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            return [];
        }
        try {
            const parsed: Transaction[] = JSON.parse(stored);
            if (!Array.isArray(parsed)) {
                return [];
            }
            return parsed
                .filter((item): item is Transaction =>
                    typeof item === 'object' &&
                    item !== null &&
                    typeof (item as Transaction).id === 'string' &&
                    typeof (item as Transaction).date === 'string' &&
                    typeof (item as Transaction).amount === 'number' &&
                    typeof (item as Transaction).isExpense === 'boolean' &&
                    typeof (item as Transaction).description === 'string' &&
                    typeof (item as Transaction).paymentMethod === 'string' &&
                    typeof (item as Transaction).category === 'string',
                )
                .map((item) => ({
                    ...item,
                    amount: Math.abs(item.amount),
                }));
        } catch (error) {
            console.error('Failed to parse stored transactions', error);
            return [];
        }
    });
    const [expensedChecked, setExpensedChecked] = useState(true);
    const [incomeChecked, setIncomeChecked] = useState(true);
    const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(allTransactions));
    }, [allTransactions]);

    const [editingTransactionId, setEditingTransactionId] = useState<string | null>(null);

    const addTransaction = useCallback(
        (transaction: Omit<Transaction, 'id'>) => {
            const normalizedAmount = Math.abs(transaction.amount);

            if (editingTransactionId) {
                setAllTransactions((prev) =>
                    prev.map((existing) =>
                        existing.id === editingTransactionId ? {...existing, ...transaction, amount: normalizedAmount} : existing,
                    ),
                );
                setEditingTransactionId(null);
                return;
            }

            const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}`;
            setAllTransactions((prev) => [{...transaction, id, amount: normalizedAmount}, ...prev]);
        },
        [editingTransactionId],
    );

    const monthlyTransactions = useMemo(() => {
        return allTransactions.filter((tx) => {
            const [yearPart, monthPart] = tx.date.split('-');
            const txYear = Number(yearPart);
            const txMonth = Number(monthPart);
            if (Number.isNaN(txYear) || Number.isNaN(txMonth)) {
                return false;
            }
            return txYear === year && txMonth === month;
        });
    }, [allTransactions, year, month]);

    const totalIncomeAmount = useMemo(
        () =>
            monthlyTransactions
                .filter((tx) => !tx.isExpense)
                .reduce((sum, tx) => sum + tx.amount, 0),
        [monthlyTransactions],
    );

    const totalExpenseAmount = useMemo(
        () =>
            monthlyTransactions
                .filter((tx) => tx.isExpense)
                .reduce((sum, tx) => sum + tx.amount, 0),
        [monthlyTransactions],
    );

    const editHandler = (targetTransaction: Transaction) => {
        setDate(targetTransaction.date);
        setIsExpense(targetTransaction.isExpense);
        setAmount(targetTransaction.amount);
        setDescription(targetTransaction.description);
        setPaymentMethod(targetTransaction.paymentMethod);
        setCategory(targetTransaction.category);
        setEditingTransactionId(targetTransaction.id);
    };

    const deleteTransaction = useCallback(
        (id: string) => {
            setAllTransactions((prev) => prev.filter((transactionItem) => transactionItem.id !== id));
            setTransactionToDelete((prev) => (prev?.id === id ? null : prev));
            setEditingTransactionId((prev) => (prev === id ? null : prev));
        },
        [setAllTransactions, setTransactionToDelete, setEditingTransactionId],
    );

    const totalTransactionCount = useMemo(() => monthlyTransactions.length, [monthlyTransactions]);

    const value: TransactionContextValue = {
        transactions: monthlyTransactions,
        addTransaction,
        TotalTransaction: totalTransactionCount,
        expensedChecked,
        setExpensedChecked,
        incomeChecked,
        setIncomeChecked,
        totalExpenseAmount,
        totalIncomeAmount,
        editHandler,
        deleteTransaction,
        transactionToDelete,
        setTransactionToDelete,
    };

    return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
}

export function useTransactionContext() {
    const context = useContext(TransactionContext);
    if (!context) {
        throw new Error('useTransactionContext must be used within a TransactionContextProvider');
    }
    return context;
}
