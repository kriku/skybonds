import {
    BigFloat,
    BigFloats,
    BigFloatError,
} from "./types";

/**
 * Returns 10^power, accept not negative power >= 0
 */
const pow10 = (
    power: number
): bigint => {
    if (power < 0) {
        throw new Error(BigFloatError.NegativePower);
    }
    return BigInt('1' + '0'.repeat(power));
};

/**
 * Shift integral part of number, drop rest fractional part
 * @param power - digits to right.
 * e.g. poweredInt(123.0456, 3) = 123045
 */
const poweredInt = (
    a: BigFloat,
    power: number,
): bigint => {
    if (power < 0) {
        throw new Error(BigFloatError.NegativePower);
    }
    let fractionValue = a.fraction;

    if (power > a.fractionLength) {
        fractionValue = a.fraction * pow10(power - a.fractionLength);
    }

    if (power < a.fractionLength) {
        fractionValue = a.fraction / pow10(a.fractionLength - power);
    }

    return pow10(power) * a.integral + fractionValue;
};

/**
 * Calculate sum of positive BigFloat numbers
 */
export const sum = (input: BigFloats): BigFloat => {
    let integralSum = BigInt(0);
    let fractionSum = BigInt(0);
    let fractionLength = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i].fractionLength) {
            if (input[i].fractionLength > fractionLength) {
                const power = input[i].fractionLength - fractionLength;
                fractionSum *= pow10(power);
                fractionLength = input[i].fractionLength;
            }

            fractionSum += input[i].fraction;

            const wholeFraction = pow10(fractionLength);

            if (fractionSum > wholeFraction) {
                integralSum += BigInt(1);
                fractionSum -= wholeFraction;
            }
        }

        integralSum += input[i].integral;
    }

    if (integralSum === BigInt(0) && fractionSum === BigInt(0)) {
        throw new Error(BigFloatError.InputZeroSum);
    }

    return {
        integral: integralSum,
        fraction: fractionSum,
        fractionLength: fractionLength,
    };
}

/**
 * Calculate ratio of two BigFloat numbers
 * @param power - ratio powered by 10^power
 * @param digits - characters after the decimal point
 * e.g. toFixedRatio(1, 1, 2, 3) = '100.000';
 */
export const toFixedRatio = (
    a: BigFloat,
    b: BigFloat,
    power: number,
    digits: number,
): string => {
    const maxPower = Math.max(a.fractionLength, b.fractionLength);
    const aPowered = poweredInt(a, maxPower + power);
    const bPowered = poweredInt(b, maxPower);
    const ratio: BigInt = aPowered / bPowered;

    let s = ratio.toString();
    while (s.length <= digits) {
        s = '0' + s;
    };

    return s.slice(0, s.length - digits) +
        '.' + s.slice(s.length - digits, s.length);
};
