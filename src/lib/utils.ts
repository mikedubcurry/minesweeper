import type { Coords } from "./types";

export function genMines(gridSize: number, mineCount: number, coords: Coords) {
    let mines = [];
    let cX = coords[0];
    let cY = coords[1];
    while (mineCount > 0) {
        let randX = Math.floor(Math.random() * gridSize) + 1;
        let randY = Math.floor(Math.random() * gridSize) + 1;
        console.log(randX, randY, cX, cY);

        if (randX !== cX && randX !== cX - 1 && randX !== cX + 1) {
            if (randY !== cY && randY !== cY - 1 && randY !== cY + 1) {
                if (!mines.map((m) => m.join("")).includes("" + randX + randY)) {
                    mines.push([randX, randY]);
                    mineCount--;
                }
            }
        }
    }
    return mines;
}

export function generateMinesweeper(gridSize: number, mines: Coords[]) {
    const genGrid = (gridSize: number) => {
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
                                } else if (grid[y + offsetY][x + offsetX] !== "*") {
                                    grid[y + offsetY][x + offsetX] += 1;
                                }
                            }
                        }
                    });
                });
            }
        });
    });

    return grid;
}
