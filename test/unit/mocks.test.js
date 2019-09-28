function forEach(items, callback) {
    for (let index = 0; index < items.length; index++) {
        callback(items[index]);
    }
}
const mockCallBack = jest.fn(x => 42 + x );
forEach([0,0],mockCallBack);

describe('forEach function test', function () {
    test('mockCallBack should be called twice',() => {
        expect(mockCallBack.mock.calls.length).toBe(2);
    });


    test('mockCallBack arguments should be [0,0]',() => {
        expect(mockCallBack.mock.calls[0][0]).toBe(0);
        expect(mockCallBack.mock.calls[1][0]).toBe(0);
    });

    test('mockCallBack returned value should be [42,42]',() => {
        expect(mockCallBack.mock.results).toEqual([{"type":"return","value":42},{"type":"return","value":42}]);
    });
});
