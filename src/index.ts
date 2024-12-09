import express from 'express';
import { day4 } from './day4';
import { day5 } from './day5';

const app = express();
const port = 3000;

const main = async () => {
    // day1();
    // day2();
    // day3();
    // day4();
    day5()
};

app.listen(port, () => {
    return main();
});
