import {
    InputArray,
    InputError,
    MaybeFractions,
    Result,
} from './types';

export const computeFractions = (input: InputArray): MaybeFractions => {
    // O(n)
    const parsed = input.map(parseFloat);
    // O(n)
    const isNaN = parsed.some(curr => !Number.isFinite(curr));

    if (isNaN) {
        return {
            result: Result.Failure,
            error: InputError.InputNaN,
        };
    }

    // O(n)
    const isNegative = parsed.some(curr => curr < 0);

    if (isNegative) {
        return {
            result: Result.Failure,
            error: InputError.InputNegative,
        };
    }

    // O(n)
    const sum = parsed.reduce(
        (sum, curr) => sum += curr, 0
    );

    if (sum === 0) {
        return {
            result: Result.Failure,
            error: InputError.InputZeroSum,
        };
    }

    return {
        result: Result.Success,
        // O(n)
        fractions: parsed.map(curr => (curr / sum * 100).toFixed(3)),
    }
}
