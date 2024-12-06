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
        let frequency = new Map();

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

            // build left list
            if (!frequency.has(leftList[i])) {
                frequency.set(leftList[i], 0);
            }
        }

        for (const num of rightList) {
            // console.log('num', num);
            if (frequency.has(num)) {
                const existingNum = frequency.get(num);
                frequency.set(num, existingNum + 1);
                console.log('existingNum', existingNum);
            }
        }

        let simScore = 0;

        for (const num of leftList) {
            if (frequency.has(num) && frequency.get(num) > 0) {
                simScore += num * frequency.get(num);
            }
        }

        // * solution #1
        console.log('distanceSum', distanceSum);
        // * solution #2
        console.log('simScore', simScore);
    });
}
