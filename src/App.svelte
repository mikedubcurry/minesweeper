<script lang="ts">
	import Minefield from '$lib/Minefield.svelte';
	import Cell from '$lib/Cell.svelte';
	import Controls from '$lib/Controls.svelte';
	import { generateMinesweeper, genMines, toCoords, toCoordString, initCells, gameOver, didWin, revealSurroundingNums } from './lib/utils';
	import type { Coords, CellProps } from './lib/types';

	let gridSize = 5;
	let mineCount: 3 | 15 | 45 = 3;
	let cells: CellProps[] = initCells(gridSize);
	let playing = false;
	let difficulty: 'easy' | 'medium' | 'hard' = 'easy';
	let grid: ReturnType<typeof generateMinesweeper>;
	let gameState: 'gameover' | 'win' | undefined;

	function newGame() {
		gameState = undefined;
		playing = false;
		switch (difficulty) {
			case 'easy':
				gridSize = 5;
				mineCount = 3;
				break;
			case 'medium':
				gridSize = 10;
				mineCount = 15;
				break;
			case 'hard':
				gridSize = 15;
				mineCount = 45;
				break;
		}
		cells = initCells(gridSize);
	}
	function handleCellClick(e: CustomEvent) {
		let cell = e.detail as CellProps;
		if (!playing) {
			// initialize game
			playing = true;
			grid = generateMinesweeper(gridSize, genMines(gridSize, mineCount, cell.coords));
			cells = cells.map((cell) => {
				let coords = toCoordString(cell.coords);
				return { ...cell, bomb: grid[coords] === -1, cell: grid[coords] };
			});
			// reveal adjacent 0s and border numbers
			cells = revealSurroundingNums(cells, cell.coords)
		} else {
			// handle regular cell click
			if (cell.bomb) {
				gameState = 'gameover';
				cells = gameOver(cells);
			} else {
				// handle revealing bomb number(s)
				if(cell.cell === 0) {
					cells = revealSurroundingNums(cells, cell.coords)
				} else {
				let coordString = toCoordString(cell.coords);
				cells = cells.map((c) => {
					if (toCoordString(c.coords) === coordString) {
						return { ...c, show: true };
					} else {
						return c;
					}
				});
			}
			}
		}
	}

	function handleFlagClick(e: CustomEvent) {
		let cell = e.detail as CellProps;
		cells = cells.map((c) => {
			if (toCoordString(c.coords) === toCoordString(cell.coords)) {
				return { ...c, flagged: !c.flagged };
			} else {
				return c;
			}
		});
		if (didWin(cells)) {
			gameState = 'win';
		}
	}
</script>

<main class:gameover={gameState === 'gameover'} class:win={gameState === 'win'}>
	<Controls on:newGame={newGame} bind:difficulty />
	<Minefield {gridSize}>
		{#each cells as cell, i}
			<Cell {cell} on:cellClick={handleCellClick} on:flagClick={handleFlagClick} />
		{/each}
	</Minefield>
</main>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
			'Helvetica Neue', sans-serif;
	}

	main {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		background-color: lightblue;
		transition: all 0.3s;
	}

	main.gameover {
		background-color: orangered;
	}

	main.win {
		animation: winner 3s linear;
	}

	@keyframes winner {
		to {
			filter: hue-rotate(1080deg);
		}
	}

	@media (min-width: 480px) {
	}
</style>
