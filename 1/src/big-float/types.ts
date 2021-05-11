export interface BigFloat {
    integral: bigint;
    fraction: bigint;
    fractionLength: number;
}

export type BigFloats = BigFloat[];

export const enum BigFloatError {
    NegativePower = 'BigFloatError: Supports only positive power',
    SplittingError = 'BigFloatError: Incorrect number format, more than two parts',
    NegativeFraction = 'BigFloatError: Incorrect number format, negative fraction part',
    NegativeIntegral = 'BigFloatError: Incorrect number format, negative integral part',
    GeneralParsingError = 'BigFloatError: Incorrect number format',
    InputZeroSum = 'BigFloatError: Zero sum for elements',
}
