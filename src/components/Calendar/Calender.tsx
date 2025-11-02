import { CalendarHeader } from './CalendarHeader';
import { CalendarFooter } from './CalendarFooter';
import { CalendarBody } from './CalendarBody';
import { CalendarContextProvider } from '../../contexts/CalendarContext';

export function Calendar() {
    return (
        <CalendarContextProvider>
            <CalendarHeader />
            <CalendarBody />
            <CalendarFooter />
        </CalendarContextProvider>
    );
}