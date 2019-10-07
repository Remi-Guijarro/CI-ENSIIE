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

describe('Interval union tests', function () {
    test('test union overlapping intervals',() => {
        const interval = new Interval(5,10);
        expect(interval.union(new Interval(8,15))).toEqual([new Interval(5,15)]);
    });

    test('test union with same interval should return same interval',() => {
        const interval = new Interval(5,10);
        const comparedInterval = new Interval(5,10);
        expect(interval.union(comparedInterval)).toEqual([interval]);
    });

    test('test union non overlapping intervals',() => {
        const interval = new Interval(5,10);
        const comparedInterval = new Interval(12,15);
        expect(interval.union(comparedInterval)).toEqual([interval,comparedInterval]);
    });
});

describe('toString test', () => {
    test('toString should return a string representation of the interval [start,end]',() => {
        const interval = new Interval(10,20);
        expect(interval.toString()).toEqual("[10,20]");
    });
});
