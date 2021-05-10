import {
    InputArray,
    Fraction,
    FractionArray,
    InputError,
    MaybeFractions,
    Result,
} from './types';

const splitInput = (value: string): string[] => {
    return value
        .replace(',', '.')
        .split('.');
};

const poweredInt = (
    a: Fraction,
    power: number,
): bigint => {
    let fractionValue = a.fraction;

    if (power > a.fractionLength) {
        fractionValue = a.fraction * pow10(power - a.fractionLength);
    }

    if (power < a.fractionLength) {
        fractionValue = a.fraction / pow10(a.fractionLength - power);
    }

    return pow10(power) * a.integer + fractionValue;
};

const poweredRatio = (
    a: Fraction,
    b: Fraction,
    power: number,
    digits: number,
): string => {
    const maxPower = Math.max(a.fractionLength, b.fractionLength);
    const aPowered = poweredInt(a, maxPower + power);
    const bPowered = poweredInt(b, maxPower);
    const ratio = aPowered / bPowered;
    let stringified = ratio.toString();
    while (stringified.length <= digits) {
        stringified = '0' + stringified;
    };
    const length = stringified.length;
    return stringified.slice(0, length - digits) +
        '.' + stringified.slice(length - digits, length);
};

/**
 * works only with positive powers
 */
const pow10 = (
    n: number
): bigint => {
    return BigInt('1' + '0'.repeat(n));
};

export const computeFractions = (input: InputArray): MaybeFractions => {
    let integerSum = BigInt(0);
    let fractionSum = BigInt(0);
    let fractionLength = 0;

    const parsed: FractionArray = new Array(input.length);

    for (let i = 0; i < input.length; i++) {
        let integerValue, fractionValue = BigInt(0);

        const splited = splitInput(input[i]);

        if (splited.length > 2) {
            return {
                result: Result.Failure,
                error: InputError.InputNaN,
            };
        }

        const [integerPart, fractionPart] = splited;

        try {
            integerValue = BigInt(integerPart);
            if (fractionPart) {
                fractionValue = BigInt(fractionPart);
            }

            if (fractionValue < BigInt(0)) {
                return {
                    result: Result.Failure,
                    error: InputError.InputNaN,
                };
            }

            if (integerValue < BigInt(0)) {
                return {
                    result: Result.Failure,
                    error: InputError.InputNegative,
                };
            }
        } catch (e) {
            return {
                result: Result.Failure,
                error: InputError.InputNaN,
            };
        }

        if (fractionPart) {
            if (fractionPart.length > fractionLength) {
                const power = fractionPart.length - fractionLength;
                fractionSum *= pow10(power);
                fractionLength = fractionPart.length;
            }

            fractionSum += fractionValue;

            const wholeFraction = pow10(fractionLength);

            if (fractionSum > wholeFraction) {
                integerSum += BigInt(1);
                fractionSum -= wholeFraction;
            }
        }

        integerSum += integerValue;

        parsed[i] = {
            integer: integerValue,
            fraction: fractionValue,
            fractionLength: fractionPart ? fractionPart.length : 0,
        };
    }

    if (integerSum === BigInt(0) && fractionSum === BigInt(0)) {
        return {
            result: Result.Failure,
            error: InputError.InputZeroSum,
        };
    }

    const sum: Fraction = {
        integer: integerSum,
        fraction: fractionSum,
        fractionLength: fractionLength,
    };

    const fractions = new Array(input.length);

    for (let i = 0; i < input.length; i++) {
        fractions[i] = poweredRatio(parsed[i], sum, 5, 3);
    }

    return {
        result: Result.Success,
        fractions,
    };
}
