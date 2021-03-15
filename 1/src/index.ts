import {
    InputArray,
    InputError,
    MaybeFractions,
    Result,
} from './types';

export const computeFractions = (input: InputArray): MaybeFractions => {
    let isNaN = false,
        isNegative = false,
        sum = 0;

    const parsed = new Array(input.length);

    for (let i = 0; i < input.length; i++) {
        const value = Number.parseFloat(input[i]);
        isNaN = isNaN || !Number.isFinite(value);
        isNegative = isNegative || value < 0;
        sum += value;
        parsed[i] = value;
    }

    if (isNaN) {
        return {
            result: Result.Failure,
            error: InputError.InputNaN,
        };
    }

    if (isNegative) {
        return {
            result: Result.Failure,
            error: InputError.InputNegative,
        };
    }

    if (sum === 0) {
        return {
            result: Result.Failure,
            error: InputError.InputZeroSum,
        };
    }

    const fractions = new Array(input.length);

    for (let i = 0; i < input.length; i++) {
        fractions[i] = (parsed[i] / sum * 100).toFixed(3);
    }

    return {
        result: Result.Success,
        fractions,
    };
}
