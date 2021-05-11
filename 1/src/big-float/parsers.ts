import {
    BigFloat,
    BigFloatError,
} from './types';

/**
 * Parse positive big float number
 * Throws errors on incorrect data
 */
export const parseBigFloat = (s: string): BigFloat => {
    let integralValue, fractionValue = BigInt(0);

    const splited = s.replace(',', '.').split('.');

    if (splited.length > 2) {
        throw new Error(BigFloatError.SplittingError)
    }

    const [integerPart, fractionPart] = splited;

    try {
        integralValue = BigInt(integerPart);
        if (fractionPart) {
            fractionValue = BigInt(fractionPart);
        }
    } catch (e) {
        throw new Error(`${BigFloatError.GeneralParsingError}\n${e}`);
    }

    if (fractionValue < BigInt(0)) {
        throw new Error(BigFloatError.NegativeFraction);
    }

    if (integralValue < BigInt(0)) {
        throw new Error(BigFloatError.NegativeIntegral);
    }

    return {
        integral: integralValue,
        fraction: fractionValue,
        fractionLength: fractionPart ? fractionPart.length : 0,
    };
}
