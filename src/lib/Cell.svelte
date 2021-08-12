<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { CellProps, Coords } from './types';
	export let cell: CellProps;

	const dispatch = createEventDispatcher();

	export function getCoords() {
		return cell.coords;
	}
</script>

<div
	on:click={() => {
		console.log(cell)
		dispatch('cellClick', cell);
	}}
	class="cell"
>{cell.bomb ? '*' : cell.cell}</div>

<style>
	.cell {
		width: 100%;
		height: 100%;
		background-color: #ccc;
		transition: background-color 0.3s ease;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cell:hover {
		background-color: #aaa;
	}
</style>
