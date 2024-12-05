import { readFile } from 'fs';
import { join } from 'path';

export function day1() {
    const filePath = join(__dirname, 'day1-input.txt');
    readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data[0]);
        console.log(data[1]);

        // todo: need a way to split the string into its correct numbers (side by side)
        //
    });
}
