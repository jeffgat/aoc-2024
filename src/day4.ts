import { readFile } from 'fs';
import { join } from 'path';

export function day4() {
    const filePath = join(__dirname, 'day4-input.txt');

    readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        // horizontal, vertical, diagonal, written backwards,
        let matrix = [];
        let row = [];
        const XMAS = 'XMAS';
        let count = 0;

        // build matrix
        for (let i = 0; i < data.length; i++) {
            // for (let i = 400; i < 600; i++) {
            if (data[i] !== '\n') {
                row.push(data[i]);
            }

            if (data[i] === '\n') {
                console.log('hit');
                matrix.push(row);
                row = [];
            }
        }
        // handle end of file
        if (row.length > 0) {
            matrix.push(row);
        }

        let rightCount = 0;
        let leftCount = 0;
        let downCount = 0;
        let upCount = 0;
        let downRightCount = 0;
        let downLeftCount = 0;
        let topRightCount = 0;
        let topLeftCount = 0;

        for (let i = 0; i < matrix.length; i++) {
            const row = matrix[i];
            console.log('row', row);

            for (let j = 0; j < row.length; j++) {
                if (row[j] === 'X') {
                    // increment (k) 3 times to find 'MAS', add (k) to (j)
                    let inc = 0;

                    let right = '';
                    let left = '';
                    let down = '';
                    let up = '';
                    let downLeft = '';
                    let downRight = '';
                    let topRight = '';
                    let topLeft = '';

                    while (inc <= 3) {
                        // right
                        if (row[j + inc] === XMAS[inc]) {
                            right = right.concat(join(row[j + inc]));

                            if (right === XMAS) {
                                rightCount++;
                                count++;
                                right = '';
                            }
                        }

                        // left
                        if (row[j - inc] === XMAS[inc]) {
                            left = left.concat(join(row[j - inc]));

                            if (left === XMAS) {
                                leftCount++;
                                count++;
                                left = '';
                            }
                        }
                        // down
                        if (matrix[i + inc]?.[j] === XMAS[inc]) {
                            down = down.concat(join(matrix[i + inc][j]));

                            if (down === XMAS) {
                                downCount++;
                                count++;
                                down = '';
                            }
                        }
                        // up
                        if (matrix[i - inc]?.[j] === XMAS[inc]) {
                            up = up.concat(join(matrix[i - inc][j]));

                            if (up === XMAS) {
                                upCount++;
                                count++;
                                up = '';
                            }
                        }
                        // top-right
                        if (matrix[i - inc]?.[j + inc] === XMAS[inc]) {
                            topRight = topRight.concat(join(matrix[i - inc][j + inc]));

                            if (topRight === XMAS) {
                                topRightCount++;
                                count++;
                                topRight = '';
                            }
                        }
                        // top-left
                        if (matrix[i - inc]?.[j - inc] === XMAS[inc]) {
                            topLeft = topLeft.concat(join(matrix[i - inc][j - inc]));

                            if (topLeft === XMAS) {
                                topLeftCount++;
                                count++;
                                topLeft = '';
                            }
                        }
                        // down-right
                        if (matrix[i + inc]?.[j + inc] === XMAS[inc]) {
                            downRight = downRight.concat(join(matrix[i + inc][j + inc]));

                            if (downRight === XMAS) {
                                downRightCount++;
                                count++;
                                downRight = '';
                            }
                        }
                        // down-left
                        if (matrix[i + inc]?.[j - inc] === XMAS[inc]) {
                            downLeft = downLeft.concat(join(matrix[i + inc][j - inc]));

                            if (downLeft === XMAS) {
                                downLeftCount++;
                                count++;
                                downLeft = '';
                            }
                        }

                        inc++;
                    }
                }
            }
        }

        console.log('right', rightCount);
        console.log('left', leftCount);
        console.log('down', downCount);
        console.log('up', upCount);

        console.log('downright', downRightCount);
        console.log('downleft', downLeftCount);
        console.log('top left', topLeftCount);
        console.log('top right', topRightCount);

        console.log('count', count);
        // 466 is too low
        // console.log('matrix', matrix);
        // console.log('data', data);
    });
}
