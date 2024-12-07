import { join } from 'path';
import { readFile } from 'fs';

export function day3() {
    const filePath = join(__dirname, 'day3-input.txt');

    readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log('err', err);
            return;
        }
        const length = data.length;
        const pairs = [];
        let sum = 0;
        let enabled = true;

        for (let i = 0; i < length; i++) {
            if (data.slice(i, i + 4) === 'do()') {
                // console.log(data.slice(i, i + 70));
                enabled = true;
                i += 4;
            }

            if (data.slice(i, i + 7) === "don't()") {
                // console.log(data.slice(i, i + 70));
                enabled = false;
                i += 7;
            }

            if (data.slice(i, i + 4) === 'mul(') {
                if (!enabled) continue;
                i += 4;

                let first = '';
                let second = '';
                let left = true;

                while (data[i] !== ')') {
                    if (data[i] === ',') {
                        left = false;
                    } else if (!Number.isNaN(Number(data[i]))) {
                        if (left) {
                            first += data[i];
                        } else {
                            second += data[i];
                        }
                    } else {
                        break;
                    }
                    i++;
                }

                if (data[i] === ')' && first !== '' && second !== '') {
                    pairs.push([Number(first), Number(second)]);
                }
            }
        }

        for (const pair of pairs) {
            sum += pair[0] * pair[1];
        }
        // console.log('pairs', pairs);
        // * solution #1
        console.log('sum', sum);
        // 185837920 too low
        // 1356604 too high
    });
}

// export function day3() {
//     const filePath = join(__dirname, 'day3-input.txt');

//     readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             console.log('err', err);
//             return;
//         }
//         const length = data.length;
//         let sum = 0;

//         // match mul
//         // build first number
//         // split at ","
//         // build second number
//         // there must be brackets as well

//         // so the approach may be to build a lexer

//         const pairs: [number, number][] = [];

//         for (let i = 0; i < length; i++) {
//             if (
//                 data[i] === 'm' &&
//                 data[i + 1] === 'u' &&
//                 data[i + 2] === 'l' &&
//                 data[i + 3] === '('
//             ) {
//                 i += 4;

//                 // while the next char is not a comma
//                 let first = '';
//                 while (data[i] !== ',') {
//                     if (!Number.isNaN(Number(data[i])) && data[i] !== ' ') {
//                         first += data[i];
//                     } else if (data[i] !== ' ') {
//                         break;
//                     }
//                     i++;
//                 }

//                 if (data[i] === ',') {
//                     i++;
//                 } else {
//                     continue;
//                 }

//                 let second = '';
//                 while (data[i] !== ')') {
//                     if (!Number.isNaN(Number(data[i])) && data[i] !== ' ') {
//                         second += data[i];
//                     } else if (data[i] !== ' ') {
//                         break;
//                     }
//                     i++;
//                 }

//                 if (data[i] === ')' && first && second) {
//                     const num1 = Number(first);
//                     const num2 = Number(second);
//                     if (num1 && num2) {
//                         sum += num1 * num2; // Add the multiplication result to the sum
//                     }
//                 }
//             }
//         }

//         console.log('sum', sum);
//         // 191080424 is too high
//         // 180755480 is too low
//         // 187123659 is incorrect
//         //! 184567302 is the answer, so how do i get here
//     });
// }
