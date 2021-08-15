<script>
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { portal } from './portal';

	const dispatch = createEventDispatcher();
</script>

<div transition:fly={{ y: 20, opacity: 0, duration: 300 }} use:portal class="rules">
	<p>Left-Click or tap to check a cell.</p>
	<p>Right-Click or long press to plant or remove a flag.</p>
	<p>You win when all bombs are flagged!</p>
	<button on:click={() => dispatch('rulesClose')}>Close</button>
</div>
<div transition:fade on:click={() => dispatch('rulesClose')} class="bg-overlay" />

<style>
	.rules {
		text-align: center;
		color: #111;
		box-sizing: border-box;
		background-color: #ddd;
		border-radius: 8px;
		border: 1px solid #eee;
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4), -1px 1px 5px rgba(0, 0, 0, 0.4), 0 5px 14px rgba(0, 0, 0, 0.2);
		transition: box-shadow 0.5s ease, background-color 0.3s ease;
		margin: 16px;
		padding: 32px;
		position: fixed;
		inset: 0;
		top: 50%;
		z-index: 101;
		max-width: fit-content;
		max-height: fit-content;
	}
	p {
		margin-bottom: 8px;
	}
	.bg-overlay {
		position: fixed;
		padding: 0;
		margin: 0;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 100;
		cursor: pointer;
	}

	button {
		padding: 6px 14px;
		border-radius: 8px;
		border: none;
		background-color: lightgreen;
		filter: brightness(100%) drop-shadow(0 3px 4px #555);
		transition: filter 0.2s ease;
	}
	button:hover {
		filter: brightness(110%) drop-shadow(0 5px 5px #444);
	}
	button:active {
		filter: brightness(95%) drop-shadow(0 2px 3px #333);
	}

	@media screen and (min-width: 500px) {
		.rules {
			margin: 16px auto;
		}
	}
</style>
