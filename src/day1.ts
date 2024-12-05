import { readFile } from 'fs';
import { join } from 'path';

export function day1() {
    const filePath = join(__dirname, 'day1-input.txt');
    readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        let leftList: number[] = [];
        let rightList: number[] = [];

        // * newline === '\n'

        let currentNumber = [];

        for (let i = 0; i < data.length; i++) {
            // if next char is a space, and current number is not empty array, push to left list
            // if next char is a newline, push to right list

            if (data[i] === ' ' || data[i] === '\n') {
                continue;
            }

            currentNumber.push(String(data[i]));
            if (data[i + 1] === ' ') {
                leftList.push(parseInt(currentNumber.join('')));
                currentNumber = [];
            } else if (data[i + 1] === '\n') {
                rightList.push(parseInt(currentNumber.join('')));
                currentNumber = [];
            }
        }

        // ! file is not ending with a newline?
        if (currentNumber.length > 0) {
            rightList.push(parseInt(currentNumber.join('')));
        }

        leftList.sort((a, b) => a - b);
        rightList.sort((a, b) => a - b);

        let distanceSum = 0;

        console.log(leftList.length);
        console.log(rightList.length);

        for (let i = 0; i < leftList.length; i++) {
            distanceSum += Math.abs(leftList[i] - rightList[i]);
            if (Number.isNaN(distanceSum)) {
            }
        }
        console.log('distanceSum', distanceSum);

        // where am i getting NaN?
    });
}
