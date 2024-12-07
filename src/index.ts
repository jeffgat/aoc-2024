import express from 'express';
import { day3 } from './day3';

const app = express();
const port = 3000;

const main = async () => {
    // day1();
    // day2();
    day3();
};

app.listen(port, () => {
    return main();
});
