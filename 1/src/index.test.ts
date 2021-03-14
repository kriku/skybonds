import { percentage } from './index';

describe('Percentage calculation', () => {
    it('should calculate fractions on correct data', () => {
        const sample = ['1', '1', '2'];
        const fractions = percentage(sample);
        expect(fractions).toBe(['0.250', '0.250', '0.500']);
    });
});
