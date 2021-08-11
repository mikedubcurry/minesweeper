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
		dispatch('cellClick');
		console.log(cell);
	}}
	class="cell"
/>

<style>
	.cell {
		width: 100%;
		height: 100%;
		background-color: #ccc;
		transition: background-color 0.3s ease;
	}

	.cell:hover {
		background-color: #aaa;
	}
</style>
