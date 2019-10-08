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

describe('intersection tests', function () {
    test('test right intersection',() => {
        const interval = new Interval(5,10);
        const intervalResult = new Interval(8,10);
        expect(interval.intersection(new Interval(8,15))).toEqual(intervalResult);
    });

    test('test left intersection',() => {
        const interval = new Interval(5,10);
        const intervalResult = new Interval(5,8);
        expect(interval.intersection(new Interval(4,8))).toEqual(intervalResult);
    });

    test('test middle intersection',() => {
        const interval = new Interval(5,10);
        const intervalResult = new Interval(5,10);
        expect(interval.intersection(new Interval(4,12))).toEqual(intervalResult);
    });

    test('test same interval intersection',() => {
        const interval = new Interval(5,10);
        const intervalResult = new Interval(5,10);
        expect(interval.intersection(new Interval(5,10))).toEqual(intervalResult);
    });

    test('test no intersection should return null',() => {
        const interval = new Interval(5,10);
        expect(interval.intersection(new Interval(12,20))).toBeNull();
    });
});

describe('test exclusion',  () => {
    test('test right exclusion',() => {
        const interval = new Interval(5,10);
        const comparedInterval = new Interval(8,15);
        const result = [new Interval(5,8),new Interval(10,15)];
        expect(interval.exclusion(comparedInterval)).toEqual(result);
    });

    test('test left exclusion',() => {
        const interval = new Interval(8,15);
        const comparedInterval = new Interval(5,10);
        const result = [new Interval(5,8),new Interval(10,15)];
        expect(interval.exclusion(comparedInterval)).toEqual(result);
    });

    test('test middle exclusion',() => {
        const interval = new Interval(5,15);
        const comparedInterval = new Interval(8,10);
        const result = [new Interval(5,8),new Interval(10,15)];
        expect(interval.exclusion(comparedInterval)).toEqual(result);
    });

    test('test same interval exclusion',() => {
        const interval = new Interval(5,10);
        const comparedInterval = new Interval(5,10);
        const result = [];
        expect(interval.exclusion(comparedInterval)).toEqual(result);
    });

    test('test exclusion with interval that have no intersections ',() => {
        const interval = new Interval(5,10);
        const comparedInterval = new Interval(15,20);
        const result = [new Interval(5,10),new Interval(15,20)];
        expect(interval.exclusion(comparedInterval)).toEqual(result);
    });
});
