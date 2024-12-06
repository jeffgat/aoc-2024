import { readFile } from 'fs';
import { join } from 'path';

export function day2() {
    const filePath = join(__dirname, 'day2-input.txt');
    readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log('err', err);
            return;
        }

        const reports = [];
        let safeCount = 0;
        let currentValue = '';

        // build reports

        for (let i = 0; i < data.length; i++) {
            if (data[i] !== '\n') {
                currentValue = currentValue.concat(String(data[i]));
            } else {
                reports.push(currentValue.split(' '));
                currentValue = '';
            }
        }
        if (currentValue.length > 0) {
            reports.push(currentValue.split(' '));
        }

        for (const report of reports) {
            let safe = true;
            let direction = '';

            // here
            if (parseInt(report[0]) > parseInt(report[1])) {
                direction = 'dec';
            } else if (parseInt(report[0]) < parseInt(report[1])) {
                direction = 'inc';
            } else {
                continue;
            }

            for (let i = 0; i < report.length; i++) {
                const curr = parseInt(report[i]);
                const next = parseInt(report[i + 1]);
                const difference = Math.abs(curr - next);

                // Any two adjacent levels differ by at least one and at most three
                if (difference < 1 || difference > 3) {
                    safe = false;
                    break;
                }

                // The levels are either all increasing or all decreasing.
                if (direction === 'dec') {
                    if (curr <= next) {
                        safe = false;
                        break;
                    }
                }

                if (direction === 'inc') {
                    if (curr >= next) {
                        safe = false;
                        break;
                    }
                }
            }

            if (safe) {
                safeCount++;
            }
        }

        // * solution #1
        console.log('safeCount', safeCount);
    });
}