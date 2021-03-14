import { computeFractions } from './index';
import {
    InvalidInput,
    Result,
    Fractions,
    InputError,
} from './types';

describe('Percentage calculation', () => {
    it('should calculate fractions on correct data', () => {
        const sample = ['1.5', '3', '6', '1.5'];
        const fractions = computeFractions(sample);
        expect(fractions.result).toBe(Result.Success);
        const definitelyFractions = fractions as Fractions;
        expect(definitelyFractions.fractions).toStrictEqual([
            '12.500', '25.000', '50.000', '12.500',
        ]);
    });

    it('should return error on nan in data', () => {
        const sample = ['1.5', '3', 'incorrect', '1.5'];
        const fractions = computeFractions(sample);
        expect(fractions.result).toBe(Result.Failure);
        const calculationError = fractions as InvalidInput;
        expect(calculationError.error).toBe(InputError.InputNaN);
    });

    it('should return error on negative in data', () => {
        const sample = ['1.5', '3', '-1.5', '1.5'];
        const fractions = computeFractions(sample);
        expect(fractions.result).toBe(Result.Failure);
        const calculationError = fractions as InvalidInput;
        expect(calculationError.error).toBe(InputError.InputNegative);
    });

    it('should return error on zero sum', () => {
        const sample = ['0'];
        const fractions = computeFractions(sample);
        expect(fractions.result).toBe(Result.Failure);
        const calculationError = fractions as InvalidInput;
        expect(calculationError.error).toBe(InputError.InputZeroSum);
    });
});
