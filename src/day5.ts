import { readFile } from 'fs';
import { join } from 'path';

export function day5() {
    const filePath = join(__dirname, 'day5-input.txt');

    readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log('err', err);
        }

        const rules = new Map();
        const updates = [];
        const validUpdates = [];

        let split = false;

        let rule = '';
        let update = '';

        for (let i = 0; i < data.length; i++) {
            // split after the rules are parsed
            if (data[i] === '\n' && data[i + 1] === '\n') {
                split = true;
                i++;
            }

            // parse rules to array
            if (!split) {
                if (data[i] === '\n' && rule.length) {
                    const splitRule = rule.split('|');
                    const first = splitRule[0];
                    const second = splitRule[1];

                    if (rules.get(first)) {
                        rules.set(first, [...rules.get(first), second]);
                    } else {
                        rules.set(first, [second]);
                    }
                    rule = '';
                } else {
                    rule += data[i];
                }
                // parse updates to array
            } else {
                if (data[i] === '\n') {
                    update.length && updates.push(update.split(','));
                    update = '';
                } else {
                    update += data[i];
                }
            }
        }

        update.length > 0 && updates.push(update);

        for (const row of updates) {
            // console.log('row', row);
            let valid = false;
            for (let j = 0; j < row.length - 1; j++) {
                if (rules.has(row[j])) {
                    const possibleMatches = rules.get(row[j]);

                    if (possibleMatches.includes(row[j + 1])) {
                        valid = true;
                    } else {
                        valid = false;

                        //* needed to break here. else invalids get flipped back to true.
                        break
                    }
                }
            }
            if (valid) {
                validUpdates.push(row);
            }
        }
        //   const sum = validUpdates.reduce((acc, update) => {
        //     return acc + parseInt(update[Math.floor(update.length / 2)]);
        // }, 0);

        const sum = validUpdates.reduce((acc, update) => {
            return acc + parseInt(update[Math.floor(update.length / 2)]);
        }, 0);

        console.log('sum', sum);

        //! 3633 is too low
        //! 7136 is too high
    });
}
