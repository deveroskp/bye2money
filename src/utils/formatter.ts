export function parseNumberFromString(s: string): number {
    const numericString = s.replace(/[^0-9.-]+/g, '');
    const parsedNumber = parseFloat(numericString);
    return isNaN(parsedNumber) ? 0 : parsedNumber;
}