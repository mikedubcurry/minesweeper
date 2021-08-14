<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { CellProps } from './types';

	export let cell: CellProps;
	const dispatch = createEventDispatcher();

	export function getCoords() {
		return cell.coords;
	}

	function handleTouch() {
		if (!moved) {
			if (t < 150) {
				if (!cell.flagged) dispatch('cellClick', cell);
			} else {
				if (!cell.show) dispatch('flagClick', cell);
			}
		}

		moved = false;
		t = 0;
	}

	let t: number = 0;
	let moved: boolean = false;
</script>

<div
	on:click={() => {
		if (!cell.flagged) dispatch('cellClick', cell);
	}}
	on:contextmenu={(e) => {
		e.preventDefault();
		if (!cell.show) dispatch('flagClick', cell);
		return false;
	}}
	on:touchstart={(e) => {
		e.preventDefault();
		t = -e.timeStamp;
	}}
	on:touchmove={(e) => {
		e.preventDefault();
		moved = true;
		t = 0;
	}}
	on:touchend={(e) => {
		e.preventDefault();
		t += e.timeStamp;
		handleTouch();
	}}
	class="cell"
	class:flagged={cell.flagged}
>
	{#if cell.flagged}
		<div
			class:wrong={cell.flagged && cell.show && !cell.bomb}
			transition:fly={{ y: -10, opacity: 0, duration: 200 }}
			class="flag"
		>
			🚩
		</div>
	{:else}
		{cell.show ? (cell.bomb ? '💣' : cell.cell) : ''}
	{/if}
</div>

<style>
	.cell {
		width: 100%;
		height: 100%;
		background-color: #fff;
		transition: background-color 0.3s ease;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		font-size: 12px;
	}

	.cell.cell.flagged {
		background-color: lightgreen;
	}

	.flag {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.wrong {
		background-color: purple;
	}

	.cell:hover {
		background-color: #ddd;
	}
	.cell:active {
		background-color: #eff;
	}
</style>
