import type { CellProps, Coords } from './types';

export function genMines(gridSize: number, mineCount: number, coords: Coords) {
	let mines = [];
	let cX = coords[0];
	let cY = coords[1];
	while (mineCount > 0) {
		let randX = Math.floor(Math.random() * gridSize) + 1;
		let randY = Math.floor(Math.random() * gridSize) + 1;
		if (
			(randX !== cX || randY !== cY - 1) &&
			(randX !== cX || randY !== cY) &&
			(randX !== cX || randY !== cY + 1) &&
			(randX !== cX - 1 || randY !== cY - 1) &&
			(randX !== cX - 1 || randY !== cY) &&
			(randX !== cX - 1 || randY !== cY + 1) &&
			(randX !== cX + 1 || randY !== cY - 1) &&
			(randX !== cX + 1 || randY !== cY) &&
			(randX !== cX + 1 || randY !== cY + 1)
		) {
			if (!mines.map((m) => m.join('')).includes('' + randX + randY)) {
				mines.push([randX, randY]);
				mineCount--;
			}
		}
	}

	return mines;
}

// export function traverseGridMap(coords, cells) {
// 	let offset = [-1, 0, 1];
// 	let coordX = coords[0];
// 	let coordY = coords[1];
// 	offset.forEach((x) => {
// 		offset.forEach((y) => {
// 			// make sure cell is in gridMap
// 			if (cells['' + (coordX + x) + (coordY + y)]) {
// 				if (!cells['' + (coordX + x) + (coordY + y)].checked && cells['' + (coordX + x) + (coordY + y)].cell !== '*') {
// 					cells = {
// 						...cells,
// 						['' + (coordX + x) + (coordY + y)]: { ...cells[['' + (coordX + x) + (coordY + y)]], checked: true },
// 					};
// 					let cell = document.querySelector(`[data-coords='${'' + (coordX + x) + ',' + (coordY + y)}']`);
// 					if (cell) {
// 						cell.innerText =
// 							cells['' + (coordX + x) + (coordY + y)].cell === 'x' ? 0 : cells['' + (coordX + x) + (coordY + y)].cell;
// 						cell.removeEventListener('contextmenu', rclickCell);
// 					}
// 					if (cells['' + (coordX + x) + (coordY + y)].cell === 'x') traverseGridMap([coordX + x, coordY + y]);
// 				}
// 			}
// 		});
// 	});
// }

export function generateMinesweeper(gridSize: number, mines: Coords[]) {
	const genGrid = (gridSize: number) => {
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

export function initCells(gridSize) {
	let cells: CellProps[] = [];
	for (let i = 0; i < gridSize ** 2; i++) {
		cells.push({
			coords: toCoords(gridSize, i),
			flagged: false,
			cell: 0,
			bomb: false,
			show: false
		});
	}
	return cells;
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
