const Interval = require('../../src/interval').Interval;
describe('Overlaping method test',() => {
    test('interval[9-10] shouldn\'t overlap with interval[2,8]',() => {
        const interval = new Interval(2,8);
        expect(interval.overlaps(new Interval(9,10))).toBeFalsy();
    });

    test('interval[3-5] should overlap with interval[2,8]',() => {
        const interval = new Interval(2,8);
        expect(interval.overlaps(new Interval(3,5))).toBeTruthy();
    });

    test('interval[3-5] should overlap with interval[5,8]',() => {
        const interval = new Interval(3,5);
        expect(interval.overlaps(new Interval(5,10))).toBeFalsy();
    });
});

describe('Interval includes ', () => {
    test('interval includes should return false', () => {
        const interval = new Interval(5,10);
        expect(interval.includes(new Interval(2,4))).toBeFalsy();
    });

    test('interval includes should return true ', () => {
        const interval = new Interval(5,10);
        expect(interval.includes(new Interval(5,8))).toBeTruthy();
    });

    test('interval includes should return true when interval is the same', () => {
        const interval = new Interval(5,10);
        expect(interval.includes(new Interval(5,10))).toBeTruthy();
    });
});
