// Тесты для модуля my_sort

const {my_sort} = require('./my_sort');


const TEST_NUMBER  = [
    [],
    [1],
    [1, 2, 3, 4, 5],
    [0, 0, 0, 55, 55, 60],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    [8, 0, 42, 3, 4, 8, 0, 45, 50, 9999, 7],
    [-5, 0, 9, -999, 874, 35, -4, -5, 0],
    [1, 1, 1],
];

const TEST_STR  = [
    [],
    ['a'],
    ['a', 'b', 'c', 'd', 'e'],
    ['aa', 'aa', 'aa', 'ab', 'ac', 'b'],
    ['e', 'd', 'c', 'b', 'a'],
    ['abc', 'a', 'foo', 'bar', 'booz', 'baz', 'spam', 'love'],
    ['abc', 'abc', 'abc'],
    [''],
];


const compareAscending = function(a, b) {
    return (a < b) ? -1 : (a > b) ? 1 : 0;
};

const compareDescending = function(a, b) {
    return (a < b) ? 0 : (a > b) ? -1 : 0;
};


describe('Тест-кейс модуля my_sort', () => {
    it('Тест функции сортировки числовых данных по возрастанию', () => {
        TEST_NUMBER.forEach((test_data) => {
            expect(my_sort(test_data).arr).toEqual(test_data.sort(compareAscending));
        });
    });

    it('Тест функции сортировки числовых данных по невозрастанию', () => {
        TEST_NUMBER.forEach((test_data) => {
            expect(my_sort(test_data, true).arr).toEqual(test_data.sort(compareDescending));
        });
    });

    it('Тест функции сортировки строковых данных по возрастанию', () => {
        TEST_STR.forEach((test_data) => {
            expect(my_sort(test_data).arr).toEqual(test_data.sort(compareAscending));
        });
    });

    it('Тест функции сортировки строковых данных по невозрастанию', () => {
        TEST_STR.forEach((test_data) => {
            expect(my_sort(test_data, true).arr).toEqual(test_data.sort(compareDescending));
        });
    });
});
