export type InputArray = string[];

export const enum Result {
    Success,
    Failure,
}

export const enum InputError {
    InputNaN = 'Not all elements are numbers',
    InputNegative = 'There are negative elements',
    InputZeroSum = 'Zero sum for elements',
}

export interface Fractions {
    result: Result.Success;
    fractions: string[];
}

export interface InvalidInput {
    result: Result.Failure;
    error: InputError;
}

export type MaybeFractions = Fractions | InvalidInput;
