import {
    parseBigFloat,
    toFixedRatio,
    sum,
} from './big-float';

export const computeFractions = (input: string[]): string[] => {
    const parsed = input.map(parseBigFloat);
    const summary = sum(parsed);
    return parsed.map(el => toFixedRatio(el, summary, 5, 3));
}
