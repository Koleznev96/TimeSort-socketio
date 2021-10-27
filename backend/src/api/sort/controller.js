const fs = require('fs');
const errorHandler = require('../../utils/errorHandler');

const { my_sort } = require('../../functional/my_sort');


const stop_iterations_sort = async (list) => {
    list.map(item => clearTimeout(item));
};

global.listTimout = [];

const outputSocketItems = async (list_Data) => {
    global.listTimout = [];
    list_Data.map((item, index) => {
        listTimout.push(setTimeout(() => {
            const status = index !== list_Data.length - 1;
            io.emit('new_iteration_sort', {data: item, status});
        }, 250 * index));
    });
}

module.exports.start_sort = async function(req, res) {
    try {
        const { mass, reverse } = req.body;
        const data_items_sort = my_sort(mass, Boolean(Number(reverse))).list_items_iterations_sort;
        // const data_items_sort = my_sort(mass, false, null, Boolean(Number(reverse)) ? (a, b) => a < b ? 1 : (a > b ? -1 : 0) : null).list_items_iterations_sort;
        await outputSocketItems(data_items_sort);
        res.status(201).json({message: "Сортировка запущенна"});
    } catch(e) {
        errorHandler(res, e);
        throw e;
    }
}

module.exports.stop_sort = async function(req, res) {
    try {
        if (listTimout) {
            await stop_iterations_sort(listTimout);
        }
        res.status(201).json({message: "Сортировка остановлена"});
    } catch(e) {
        errorHandler(res, e);
        throw e;
    }
}

module.exports.file_list = async function(req, res) {
    try {
        let file_list = fs.readdirSync('uploads');
        res.status(201).json(file_list);
    } catch(e) {
        errorHandler(res, e);
        throw e;
    }
}

module.exports.input_file = async function(req, res) {
    try {
        const urlFile = req.file ? req.file.path : null;
        if (urlFile) {
            fs.readFile(urlFile, 'utf8', async function (err, data) {
                const data_list = await JSON.parse(data);
                res.status(201).json(data_list);
            });
        }
        res.status(403).json({message: "что то пошло не так"});
    } catch(e) {
        errorHandler(res, e);
        throw e;
    }
}
