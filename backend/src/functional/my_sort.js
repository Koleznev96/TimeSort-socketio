// функция TimSort

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
};

const defaultCompare = (a, b) => a < b ? Compare.LESS_THAN : (a > b ? Compare.BIGGER_THAN : 0);

const defaultKey = value => value;

const getMinRun = (n) => {
    let r = 0;
    while (n >= 64) {
        r |= n & 1;
        n >>= 1;
    }
    return n + r;
}

// (Сортировка вставками) эта функция сортирует массив из левого индекса в
// к правому индексу, размер которого не превышает minRun
const insertionSort = (arr, left, right, key, cmp) => {
    console.log(cmp)
    let list_items_iterations_sort = [];
    for (let i = left + 1; i <= right; i++) {
        list_items_iterations_sort.push({data: arr.slice(), red_index: i});
        let temp = arr[i];
        let j = i - 1;
        while (cmp(key(arr[j]), key(temp)) === Compare.BIGGER_THAN && j >= left) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = temp;
        list_items_iterations_sort.push({data: arr.slice(), red_index: j + 1});
    }
    return list_items_iterations_sort;
}

// (Сортировка слиянием) эта функция объединяет отсортированные прогоны
const merge = (arr, l, m, r, key, cmp) => {
    let list_items_iterations_sort = [];

    // исходный массив разбит на две части
    // левый и правый массив
    let len1 = m - l + 1;
    let len2 = r - m;
    let left = [];
    let right = [];

    for (let i = 0; i < len1; i++)  {
        left[i] = arr[l + i];
        list_items_iterations_sort.push({data: arr.slice(), red_index: l + i});
    }

    for (let i = 0; i < len2; i++) {
        right[i] = arr[m + 1 + i];
        list_items_iterations_sort.push({data: arr.slice(), red_index: m + 1 + i});
    }

    let i = 0;
    let j = 0;
    let k = l;

    // после сравнения мы объединяем эти два массива
    // в большем подмассиве
    while (i < len1 && j < len2) {
        if (cmp(key(left[i]), key(right[j])) !== Compare.BIGGER_THAN) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            list_items_iterations_sort.push({data: arr.slice(), red_index: j + 1 + m});
            j++;
        }
        list_items_iterations_sort.push({data: arr.slice(), red_index: k});
        k++;
    }

    // копируем оставшиеся элементы left, если есть
    while (i < len1) {
        arr[k] = left[i];
        k++;
        i++;
        list_items_iterations_sort.push({data: arr.slice(), red_index: k});
    }

    // копируем оставшийся элемент right, если есть
    while (j < len2) {
        arr[k] = right[j];
        k++;
        j++;
        list_items_iterations_sort.push({data: arr.slice(), red_index: k});
    }
    return list_items_iterations_sort;
}

// итеративная функция TimSort для сортировки
// массив [0 ... n-1] (аналог сортировки слиянием)
const my_sort = (arr, reverse = false, key = null, cmp = null) => {
    key = key ? key : defaultKey;
    cmp = cmp ? cmp : defaultCompare;

    const length = arr.length;
    const minRun = getMinRun(length);
    let list_items_iterations_sort = [];

    // Сортировка отдельных подмассивов по размеру minRun
    for (let i = 0; i < length; i+=minRun)
        list_items_iterations_sort = list_items_iterations_sort
            .concat(insertionSort(arr, i, Math.min((i+minRun-1), (length-1)), key, cmp));

    // начинаем слияние с размера minRun (или 32). Будет сливаться
    // сформировать размер 2*minRun, затем 4*minRun, 8*minRun и т. д.
    for (let size = minRun; size < length; size = 2*size) {
        // выбрать начальную точку левого подмассива. Мы
        // собираемся объединить arr [left..left + size-1]
        // и arr [left + size, left + 2 * size-1]
        // После каждого слияния мы увеличиваем влево на 2 * размер
        for (let left = 0; left < length; left += 2*size){
            // найти конечную точку левого подмассива
            // середина + 1 - начальная точка правого подмассива
            let mid = left + size - 1;
            let right = Math.min((left + 2*size - 1), (length-1));

            // объединить подмассив arr [left ..... mid] &
            // arr [mid + 1 .... right]
            list_items_iterations_sort = list_items_iterations_sort
                .concat(merge(arr, left, mid, right, key, cmp));
        }
    }
    if (reverse) {
        arr.reverse();
        list_items_iterations_sort.push({data: arr.slice(), red_index: 0});
    }
    return {arr, list_items_iterations_sort};
}

module.exports = { my_sort };


