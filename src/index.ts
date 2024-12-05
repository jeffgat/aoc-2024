import express from 'express';
import { day1 } from './day1';

const app = express();
const port = 3000;

const main = async () => {
    day1();
};

app.listen(port, () => {
    return main();
});
