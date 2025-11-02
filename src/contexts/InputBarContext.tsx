import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useAppContext} from './AppContext';

const MAX_DESCRIPTION_LENGTH = 32;

export type PaymentMethodOption = {
    value: string;
    label: string;
};

export type CategoryOption = {
    value: string;
    label: string;
};

type InputBarContextType = {
    date: string;
    setDate: (value: string) => void;
    amount: number;
    setAmount: (value: number) => void;
    isExpense: boolean;
    setIsExpense: (value: boolean) => void;
    description: string;
    setDescription: (value: string) => void;
    paymentMethod: string;
    setPaymentMethod: (value: string) => void;
    paymentMethodOptions: PaymentMethodOption[];
    addPaymentMethod: (label: string) => void;
    removePaymentMethod: (option: PaymentMethodOption) => void;
    category: string;
    setCategory: (value: string) => void;
    categoryOptions: CategoryOption[];
    maxDescriptionLength: number;
    resetForm: () => void;
};

const InputBarContext = createContext<InputBarContextType | null>(null);

const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const clampDayToMonth = (day: number, year: number, month: number) => {
    const lastDay = new Date(year, month, 0).getDate();
    return Math.min(day, lastDay);
};

export function InputBarProvider({children}: {children: React.ReactNode}) {
    const {year, month} = useAppContext();

    const [date, setDateState] = useState(() => formatDateForInput(new Date()));
    const [amount, setAmountState] = useState<number>(0);
    const [isExpense, setIsExpenseState] = useState(true);
    const [description, setDescriptionState] = useState('');
    const [paymentMethod, setPaymentMethodState] = useState('');
    const [category, setCategoryState] = useState('');
    const [paymentMethodOptions, setPaymentMethodOptions] = useState<PaymentMethodOption[]>([
        {value: 'cash', label: '현금'},
        {value: 'card', label: '신용카드'},
        {value: 'account', label: '계좌이체'},
        {value: 'mobile', label: '모바일결제'},
    ]);

    useEffect(() => {
        setDateState((prev) => {
            const current = new Date(prev);
            const safeDay = clampDayToMonth(current.getDate(), year, month);
            return formatDateForInput(new Date(year, month - 1, safeDay));
        });
    }, [year, month]);

    const resetForm = useCallback(() => {
        setAmountState(0);
        setIsExpenseState(true);
        setDescriptionState('');
        setPaymentMethodState('');
        setCategoryState('');
        setDateState((prev) => {
            const current = new Date(prev);
            const safeDay = clampDayToMonth(current.getDate(), year, month);
            return formatDateForInput(new Date(year, month - 1, safeDay));
        });
    }, [year, month]);

    const setDate = (value: string) => {
        const nextDate = new Date(value);
        if (!Number.isNaN(nextDate.getTime())) {
            setDateState(formatDateForInput(nextDate));
        }
    };

    const setAmount = (value: number) => {
        if (Number.isNaN(value)) {
            setAmountState(0);
            return;
        }
        setAmountState(Math.max(0, value));
    };

    const setIsExpense = useCallback((value: boolean) => {
        setIsExpenseState(value);
        setCategoryState('');
    }, []);

    const setDescription = (value: string) => {
        if (value.length <= MAX_DESCRIPTION_LENGTH) {
            setDescriptionState(value);
        } else {
            setDescriptionState(value.slice(0, MAX_DESCRIPTION_LENGTH));
        }
    };

    const addPaymentMethod = useCallback(
        (rawLabel: string) => {
            const trimmed = rawLabel.trim();
            if (!trimmed) {
                return;
            }
            setPaymentMethodOptions((prev) => {
                if (prev.some((option) => option.label === trimmed)) {
                    return prev;
                }
                const value = `custom-${Date.now()}`;
                return [...prev, {value, label: trimmed}];
            });
            setPaymentMethodState(trimmed);
        },
        [setPaymentMethodState],
    );

    const removePaymentMethod = useCallback(
        (option: PaymentMethodOption) => {
            setPaymentMethodOptions((prev) => prev.filter((item) => item.value !== option.value));
            setPaymentMethodState((prev) => (prev === option.label ? '' : prev));
        },
        [setPaymentMethodState],
    );

    const expenseCategoryOptions = useMemo<CategoryOption[]>(
        () => [
            {value: 'life', label: '생활'},
            {value: 'food', label: '식비'},
            {value: 'transport', label: '교통'},
            {value: 'shopping', label: '쇼핑/뷰티'},
            {value: 'health', label: '의료/건강'},
            {value: 'culture', label: '문화/여가'},
            {value: 'etc', label: '미분류'},
        ],
        [],
    );

    const incomeCategoryOptions = useMemo<CategoryOption[]>(
        () => [
            {value: 'salary', label: '월급'},
            {value: 'allowance', label: '용돈'},
            {value: 'otherIncome', label: '기타 수입'},
        ],
        [],
    );

    const categoryOptions = useMemo(
        () => (isExpense ? expenseCategoryOptions : incomeCategoryOptions),
        [isExpense, expenseCategoryOptions, incomeCategoryOptions],
    );

    const value = useMemo(
        () => ({
            date,
            setDate,
            amount,
            setAmount,
            isExpense,
            setIsExpense,
            description,
            setDescription,
            paymentMethod,
            setPaymentMethod: setPaymentMethodState,
            paymentMethodOptions,
            addPaymentMethod,
            removePaymentMethod,
            category,
            setCategory: setCategoryState,
            categoryOptions,
            maxDescriptionLength: MAX_DESCRIPTION_LENGTH,
            resetForm,
        }),
        [
            date,
            amount,
            isExpense,
            setIsExpense,
            description,
            paymentMethod,
            paymentMethodOptions,
            addPaymentMethod,
            removePaymentMethod,
            category,
            categoryOptions,
            resetForm,
        ],
    );

    return <InputBarContext.Provider value={value}>{children}</InputBarContext.Provider>;
}

export function useInputBarContext() {
    const context = useContext(InputBarContext);
    if (!context) {
        throw new Error('useInputBarContext must be used within an InputBarProvider');
    }
    return context;
}
