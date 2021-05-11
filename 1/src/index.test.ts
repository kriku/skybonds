import { computeFractions } from './index';
import { BigFloatError } from './big-float';

describe('Fractions calculation', () => {
    it('should throws error on nan in data', () => {
        const sample = ['1.5', '3', 'incorrect', '1.5'];

        expect(() => {
            computeFractions(sample);
        }).toThrow(new RegExp(BigFloatError.GeneralParsingError));
    });

    it('should throws error on negative in data', () => {
        const sample = ['1.5', '3', '-1.5', '1.5'];

        expect(() => {
            computeFractions(sample);
        }).toThrow(BigFloatError.NegativeIntegral);
    });

    it('should throws error on zero sum', () => {
        const sample = ['0'];

        expect(() => {
            computeFractions(sample);
        }).toThrow(BigFloatError.InputZeroSum);
    });

    it('should calculate fraction 100%', () => {
        const sample = ['1'];

        const fractions = computeFractions(sample);
        expect(fractions).toStrictEqual([
            '100.000'
        ]);
    });

    it('should calculate fractions on correct data', () => {
        const sample = ['1.5', '3', '6', '1.5'];

        const fractions = computeFractions(sample);
        expect(fractions).toStrictEqual([
            '12.500', '25.000', '50.000', '12.500',
        ]);
    });

    it('should work with big numbers', () => {
        const sample = [
            '9007199254740992.9007199254740992',
            '9007199254740992.9007199254740992',
            '9007199254740992.9007199254740992',
        ];
        const fractions = computeFractions(sample);
        expect(fractions).toStrictEqual([
            '33.333', '33.333', '33.333',
        ]);
    });

    it('should work on big sum', () => {
        const elements = 1e5;
        const value = '9007199254740992.9007199254740992';

        const ratio = (100 / elements).toFixed(3);
        const sample = (
            new Array(elements)
        ).fill(value, 0, elements);

        const fractions = computeFractions(sample);
        expect(fractions).toStrictEqual(
            (new Array(elements)).fill(ratio, 0, elements)
        );
    });

    it('should work on small numbers', () => {
        const elements = 1e4;
        const value = '0.000000000000000000000000000001992547409921';

        const ratio = (100 / elements).toFixed(3);
        const sample = (
            new Array(elements)
        ).fill(value, 0, elements);

        const fractions = computeFractions(sample);
        expect(fractions).toStrictEqual(
            (new Array(elements)).fill(ratio, 0, elements)
        );
    });
});
