import { computeFractions } from './index';
import {
    InvalidInput,
    Result,
    Fractions,
    InputError,
} from './types';

describe('Percentage calculation', () => {
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

    it('should calculate fraction 100%', () => {
        const sample = ['1'];
        const fractions = computeFractions(sample);
        expect(fractions.result).toBe(Result.Success);
        const definitelyFractions = fractions as Fractions;
        expect(definitelyFractions.fractions).toStrictEqual([
            '100.000'
        ]);
    });

    it('should calculate fractions on correct data', () => {
        const sample = ['1.5', '3', '6', '1.5'];
        const fractions = computeFractions(sample);
        expect(fractions.result).toBe(Result.Success);
        const definitelyFractions = fractions as Fractions;
        expect(definitelyFractions.fractions).toStrictEqual([
            '12.500', '25.000', '50.000', '12.500',
        ]);
    });

    it('should work with big integers', () => {
        const sample = [
            '9007199254740992.9007199254740992',
            '9007199254740992.9007199254740992',
            '9007199254740992.9007199254740992',
            '18014398509481985.8014398509481984',
        ];
        const fractions = computeFractions(sample);
        expect(fractions.result).toBe(Result.Success);
        const definitelyFractions = fractions as Fractions;
        expect(definitelyFractions.fractions).toStrictEqual([
            '20.000', '20.000', '20.000', '40.000',
        ]);
    });

    it('should work with infinite decimal expansion', () => {
        const sample = [
            '9007199254740992.9007199254740992',
            '9007199254740992.9007199254740992',
            '9007199254740992.9007199254740992',
        ];
        const fractions = computeFractions(sample);
        expect(fractions.result).toBe(Result.Success);
        const definitelyFractions = fractions as Fractions;
        expect(definitelyFractions.fractions).toStrictEqual([
            '33.333', '33.333', '33.333',
        ]);
    });

    it('should work on big sum', () => {
        let power = 5;
        let ratio = '0.001';
        const sample = (
            new Array(Math.pow(10, power))
        ).fill('9007199254740992.9007199254740992', 0, Math.pow(10, power));

        const fractions = computeFractions(sample);
        expect(fractions.result).toBe(Result.Success);
        const definitelyFractions = fractions as Fractions;
        expect(definitelyFractions.fractions).toStrictEqual(
            (
                new Array(Math.pow(10, power))
            ).fill('0.001', 0, Math.pow(10, power))
        );
    });

    it('should work on small numbers', () => {
        let power = 5;
        let ratio = '0.001';
        const sample = (
            new Array(Math.pow(10, power))
        ).fill('0.0000000000000000000000000001', 0, Math.pow(10, power));

        const fractions = computeFractions(sample);
        expect(fractions.result).toBe(Result.Success);
        const definitelyFractions = fractions as Fractions;
        expect(definitelyFractions.fractions).toStrictEqual(
            (
                new Array(Math.pow(10, power))
            ).fill('0.001', 0, Math.pow(10, power))
        );
    });
});
