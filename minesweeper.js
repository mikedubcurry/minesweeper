let gridSize = 5;
let mines = [
    [1, 3],
    [3, 5],
    [2, 4],
];

function generateMinesweeper(gridSize, mines) {
    const genGrid = (gridSize) => {
        let grid = [];
        for (let i = 0; i < gridSize; i++) {
            let row = [];
            for (let j = 0; j < gridSize; j++) {
                let isMine = mines.filter((m) => m.join("") === "" + (j + 1) + (i + 1)).length;
                if (isMine) row.push("*");
                else row.push("x");
            }
            grid.push(row);
        }
        return grid;
    };

    const gridToString = (grid) => grid.map((row) => row.join("")).join("\n");

    const grid = genGrid(gridSize);

    grid.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell === "*") {
                [-1, 0, 1].forEach((offsetX) => {
                    [-1, 0, 1].forEach((offsetY) => {
                        if (grid[y + offsetY]) {
                            if (grid[y + offsetY][x + offsetX]) {
                                if (grid[y + offsetY][x + offsetX] === "x") {
                                    grid[y + offsetY][x + offsetX] = 1;
                                } else if (grid[y + offsetY][x + offsetX] !== '*') {
                                    grid[y + offsetY][x + offsetX] += 1;
                                }
                            }
                        }
                    });
                });
            }
        });
    });

    return gridToString(grid)
}

console.log(generateMinesweeper(gridSize, mines));
// x x x x x
// 1 1 x x x
// * 2 1 x x
// 2 * 2 1 x
// 1 2 * 1 x
