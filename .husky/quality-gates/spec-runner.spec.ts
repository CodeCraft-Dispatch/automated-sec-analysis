import { SpecRunner } from './spec-runner';

describe('SpecRunner', () => {
    it('should run the spec runner', () => {
        const result = SpecRunner.run(true);
        expect(Boolean(result)).toBe(true);
    });
});