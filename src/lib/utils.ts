import type { Coords } from './types';

export function genMines(gridSize: number, mineCount: number, coords: Coords) {
	console.log(coords);

	let mines = [];
	let cX = coords[0];
	let cY = coords[1];
	while (mineCount > 0) {
		let randX = Math.floor(Math.random() * gridSize) + 1;
		let randY = Math.floor(Math.random() * gridSize) + 1;
		if (randX !== cX && randX !== cX - 1 && randX !== cX + 1) {
			if (randY !== cY && randY !== cY - 1 && randY !== cY + 1) {
				if (!mines.map((m) => m.join('')).includes('' + randX + randY)) {
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
		// let grid = [];
		// for (let i = 0; i < gridSize; i++) {
		//     let row = [];
		//     for (let j = 0; j < gridSize; j++) {
		//         let isMine = mines.filter((m) => m.join("") === "" + (j + 1) + (i + 1)).length;
		//         if (isMine) row.push("*");
		//         else row.push("x");
		//     }
		//     grid.push(row);
		// }
		let grid = {};
		for (let i = 0; i < gridSize ** 2; i++) {
			let coords = toCoords(gridSize, i);
			let coordsString = toCoordString(coords);
			let isMine = mines.filter((m) => m.join(',') === coordsString).length;
			if (isMine) {
				// if coord contains a mine, make val negative
				grid[coordsString] = -1;
			} else {
				// intialize non mines with 0
				grid[coordsString] = 0;
			}
		}
		return grid;
	};

	let grid = genGrid(gridSize);

	// grid.forEach((row, y) => {
	// 	row.forEach((cell, x) => {
	// 		if (cell === '*') {
	// 			[-1, 0, 1].forEach((offsetX) => {
	// 				[-1, 0, 1].forEach((offsetY) => {
	// 					if (grid[y + offsetY]) {
	// 						if (grid[y + offsetY][x + offsetX]) {
	// 							if (grid[y + offsetY][x + offsetX] === 'x') {
	// 								grid[y + offsetY][x + offsetX] = 1;
	// 							} else if (grid[y + offsetY][x + offsetX] !== '*') {
	// 								grid[y + offsetY][x + offsetX] += 1;
	// 							}
	// 						}
	// 					}
	// 				});
	// 			});
	// 		}
	// 	});
	// });

	Object.keys(grid).forEach((coord) => {
		if (grid[coord] < 0) {
			// check for presence of mine
			let offset = [-1, 0, 1];
			offset.forEach((oX) => {
				offset.forEach((oY) => {
					// double loop over offsets to set numbers around each mine
					let offsetCoord = coordOffset(coord, oX, oY);
					if (!offsetCoord.split(',').includes('0') && offsetCoord.indexOf((gridSize + 1).toString()) < 0) {
						// only check offsets within bounds of grid
						if (grid[offsetCoord] > -1) {
							grid[offsetCoord] += 1;
						}
					}
				});
			});
		}
	});

	return grid;
}

export function toCoords(gridSize: number, i: number): Coords {
	return [(i % gridSize) + 1, Math.ceil((i + 1) / gridSize)];
}

export function coordOffset(coordString: string, offsetX: number, offsetY: number) {
	let coords = coordString.split(',').map((s) => parseInt(s));
	return toCoordString([coords[0] + offsetX, coords[1] + offsetY]);
}

export function toCoordString(coords: Coords) {
	return coords.join(',');
}
