import express from 'express';
import { day2 } from './day2';

const app = express();
const port = 3000;

const main = async () => {
    // day1();
    day2();
};

app.listen(port, () => {
    return main();
});
