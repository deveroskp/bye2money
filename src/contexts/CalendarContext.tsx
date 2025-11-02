import {createContext, useContext, useMemo, type ReactNode} from 'react';

import {useAppContext} from './AppContext';
import {useTransactionContext, type Transaction} from './TransactionContext';

type CalendarDay = {
    date: string;
    day: number;
    weekday: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    incomeTotal: number;
    expenseTotal: number;
    netTotal: number;
    transactions: Transaction[];
};

type CalendarContextValue = {
    year: number;
    month: number;
    weeks: CalendarDay[][];
    totalIncome: number;
    totalExpense: number;
    totalSum: number;
};

const CalendarContext = createContext<CalendarContextValue | null>(null);

const formatISODate = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export function CalendarContextProvider({children}: {children: ReactNode}) {
    const {year, month} = useAppContext();
    const {transactions, totalIncomeAmount, totalExpenseAmount} = useTransactionContext();

    const weeks = useMemo(() => {
        const todayKey = formatISODate(new Date());
        const transactionsByDate = transactions.reduce<Map<string, Transaction[]>>((acc, transaction) => {
            const items = acc.get(transaction.date) ?? [];
            items.push(transaction);
            acc.set(transaction.date, items);
            return acc;
        }, new Map());

        const firstDayOfMonth = new Date(year, month - 1, 1);
        const startOffset = firstDayOfMonth.getDay();
        const daysInMonth = new Date(year, month, 0).getDate();
        const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

        const cells: CalendarDay[] = [];

        for (let index = 0; index < totalCells; index += 1) {
            const dayOffset = index - startOffset + 1;
            const cellDate = new Date(year, month - 1, dayOffset);
            const cellYear = cellDate.getFullYear();
            const cellMonth = cellDate.getMonth() + 1;
            const isoDate = formatISODate(cellDate);
            const isCurrentMonth = cellYear === year && cellMonth === month;
            const dayTransactions = isCurrentMonth ? transactionsByDate.get(isoDate) ?? [] : [];

            let incomeTotal = 0;
            let expenseTotal = 0;
            for (const transaction of dayTransactions) {
                if (transaction.isExpense) {
                    expenseTotal += transaction.amount;
                } else {
                    incomeTotal += transaction.amount;
                }
            }

            cells.push({
                date: isoDate,
                day: cellDate.getDate(),
                weekday: cellDate.getDay(),
                isCurrentMonth,
                isToday: isoDate === todayKey,
                incomeTotal,
                expenseTotal,
                netTotal: incomeTotal - expenseTotal,
                transactions: dayTransactions,
            });
        }

        const chunked: CalendarDay[][] = [];
        for (let i = 0; i < cells.length; i += 7) {
            chunked.push(cells.slice(i, i + 7));
        }
        return chunked;
    }, [transactions, year, month]);

    const value = useMemo<CalendarContextValue>(
        () => ({
            year,
            month,
            weeks,
            totalIncome: totalIncomeAmount,
            totalExpense: totalExpenseAmount,
            totalSum: totalIncomeAmount - totalExpenseAmount,
        }),
        [year, month, weeks, totalIncomeAmount, totalExpenseAmount],
    );

    return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
}

export function useCalendarContext() {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error('useCalendarContext must be used within a CalendarContextProvider');
    }
    return context;
}

export type {CalendarDay};