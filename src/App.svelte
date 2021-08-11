<script lang="ts">
	import Minefield from '$lib/Minefield.svelte';
	import Cell from '$lib/Cell.svelte';
	import Controls from '$lib/Controls.svelte';
	import { genMines } from './lib/utils'
	import type { Coords, CellProps } from './lib/types';

	let gridSize = 5;
	let mineCount: 3 | 15 | 25 = 3;
	let cells: CellProps[] = []
	$: {
		cells = [];
		for(let i = 0; i < gridSize**2; i++) {
			cells.push({
				coords: [(i % gridSize) + 1,Math.ceil((i + 1) / gridSize)],
				flagged: false,
				cell: 0,
				bomb: false
			})
		}
	}
	
	let difficulty: 'easy' | 'medium' | 'hard' = 'easy';

	function newGame() {
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
				mineCount = 25;
				break;
		}
	}
</script>

<main>
	<Controls on:newGame={newGame} bind:difficulty />
	<Minefield {gridSize}>
		{#each cells as cell, i}
			<Cell
				{cell}
				on:cellClick={() => console.log(genMines(gridSize, mineCount, cell.coords))}
			/>
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
	}

	@media (min-width: 480px) {
	}
</style>
