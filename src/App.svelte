<script lang="ts">
	import Minefield from '$lib/Minefield.svelte';
	import Cell from '$lib/Cell.svelte';
	import Controls from '$lib/Controls.svelte';

	let gridSize = 5;
	let mineCount: 3 | 15 | 25 = 3;
	$: cells = Array(gridSize ** 2);
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

	function genMines(gridSize, mineCount, coords) {
		let mines = [];
		let cX = coords[0];
		let cY = coords[1];
		while (mineCount > 0) {
			let randX = Math.floor(Math.random() * gridSize) + 1;
			let randY = Math.floor(Math.random() * gridSize) + 1;
			// make sure coords is a zero
			// this probably has a much simpler refactored syntax...
			if (cX !== randX && cY !== randY) {
				// x, y is not bomb spot
				if (cX - 1 !== randX && cY - 1 !== randY)
					if (cX - 1 !== randX && cY !== randY)
						if (cX !== randX && cY - 1 !== randY)
							if (cX + 1 !== randX && cY + 1 !== randY)
								if (cX !== randX && cY + 1 !== randY)
									if (cX + 1 !== randX && cY !== randY)
										if (!mines.map((m) => m.join('')).includes('' + randX + randY)) {
											mines.push([randX, randY]);
											mineCount--;
										}
			}
		}
		return mines;
	}

	let cell: Cell;
</script>

<main>
	<Controls on:newGame={newGame} bind:difficulty />
	<Minefield {gridSize}>
		{#each cells as _, i}
			<Cell
				bind:this={cell}
				cell={{ coords: `${(i % gridSize) + 1}${Math.ceil((i + 1) / gridSize)}` }}
				on:cellClick={() => console.log(genMines(gridSize, mineCount, cell.getCoords()))}
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
