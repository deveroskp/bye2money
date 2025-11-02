export function dayOfWeek(date: Date): number {
    const day = date.getDay();
    return day === 0 ? 7 : day;
}