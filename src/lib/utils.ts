import type { CellMap, CellProps, Coords } from './types';

export function genMines(gridSize: number, mineCount: number, coords: Coords, hard: boolean = false) {
	let mines = [];
	let cX = coords[0];
	let cY = coords[1];
	while (mineCount > 0) {
		let randX = Math.floor(Math.random() * gridSize) + 1;
		let randY = hard ? Math.floor(Math.random() * (gridSize + 3)) + 1 : Math.floor(Math.random() * gridSize) + 1;
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

export function generateMinesweeper(gridSize: number, mines: Coords[], hard: boolean = false) {
	const genGrid = (gridSize: number, hard: boolean) => {
		let grid = {};
		for (let i = 0; hard ? i < gridSize ** 2 + gridSize * 3 : i < gridSize ** 2; i++) {
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

	let grid = genGrid(gridSize, hard);

	Object.keys(grid).forEach((coord) => {
		if (grid[coord] < 0) {
			// check for presence of mine
			let offset = [-1, 0, 1];
			offset.forEach((oX) => {
				offset.forEach((oY) => {
					// double loop over offsets to set numbers around each mine
					let offsetCoord = coordOffset(coord, oX, oY);
					if (
						!offsetCoord.split(',').includes('0') &&
						offsetCoord.indexOf((hard ? gridSize * 3 + 1 : gridSize + 1).toString()) < 0
					) {
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

export function initCells(gridSize: number, hard: boolean = false) {
	let cells: CellProps[] = [];
	if (hard) {
		for (let i = 0; i < gridSize ** 2 + gridSize * 3; i++) {
			cells.push({
				coords: toCoords(gridSize, i),
				flagged: false,
				cell: 0,
				bomb: false,
				show: false,
			});
		}
	} else {
		for (let i = 0; i < gridSize ** 2; i++) {
			cells.push({
				coords: toCoords(gridSize, i),
				flagged: false,
				cell: 0,
				bomb: false,
				show: false,
			});
		}
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

export function gameOver(cells: CellProps[]) {
	return cells.map((c) => ({ ...c, show: true }));
}

export function didWin(cells: CellProps[]) {
	let flags = cells.filter((c) => c.flagged);
	let bombs = cells.filter((c) => c.bomb);
	if (flags.length === bombs.length) {
		let didWin = true;
		flags.forEach((cell, i) => {
			if (toCoordString(cell.coords) !== toCoordString(bombs[i].coords)) {
				didWin = false;
			}
		});
		return didWin;
	}
	return false;
}

export function revealSurroundingNums(cells: CellProps[], coords: Coords) {
	let cellMap = cells.reduce((map, cell) => {
		map[toCoordString(cell.coords)] = cell;
		return map;
	}, {} as CellMap);

	let coordString = toCoordString(coords);

	let offset = [-1, 0, 1];
	// known zeros that need to be shown
	let zeros: CellProps[] = [cellMap[coordString]];
	// handled zeros to ignore
	let handled: string[] = [];
	// while there are zeros to deal with
	while (zeros.length) {
		offset.forEach((oX) => {
			offset.forEach((oY) => {
				// not the one we initially clicked on
				if (oX !== 0 && oY !== 0) {
					let offsetCoords = coordOffset(coordString, oX, oY);
					// cell exists and is a zero
					if (cellMap[offsetCoords] && cellMap[offsetCoords].cell === 0) {
						zeros.push(cellMap[offsetCoords]);
					}
				}
			});
		});

		// handle zeros
		zeros.forEach((cell) => {
			if (!handled.includes(toCoordString(cell.coords))) handled.push(toCoordString(cell.coords));
			zeros = zeros.filter((c) => toCoordString(c.coords) !== toCoordString(cell.coords));
			offset.forEach((oX) => {
				offset.forEach((oY) => {
					let offsetCoords = coordOffset(toCoordString(cell.coords), oX, oY);
					if (cellMap[offsetCoords]) {
						// cell exists and is a zero
						if (cellMap[offsetCoords].cell === 0) {
							if (!handled.includes(offsetCoords)) zeros.push(cellMap[offsetCoords]);
						} else {
							// cell is around a zero
							handled.push(offsetCoords);
						}
					}
				});
			});
		});
	}

	return cells.map((cell) => {
		if (handled.includes(toCoordString(cell.coords))) {
			return { ...cell, show: true };
		} else {
			return cell;
		}
	});
}
