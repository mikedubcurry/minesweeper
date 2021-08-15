<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let difficulty: 'easy' | 'medium' | 'hard' = 'easy';

	const dispatch = createEventDispatcher();
</script>

<section>
	<button class="newgame" on:click={() => dispatch('newGame')}>New Game</button>
	<button on:click={() => dispatch('rulesVisible')}>View Rules</button>
	<select bind:value={difficulty} name="difficulty" id="difficulty">
		<option value="easy">Easy</option>
		<option value="medium">Medium</option>
		<option value="hard">Hard</option>
	</select>
</section>

<style>
	section {
		display: flex;
		/* flex-direction: column; */
		justify-content: space-between;
		align-items: center;
		width: 300px;
		height: 80px;
	}
	button {
		padding: 6px 14px;
		border-radius: 8px;
		border: none;
		background-color: lightpink;
		filter: brightness(100%) drop-shadow(0 3px 4px #555);
		transition: filter 0.2s ease;
	}
	.newgame {
		background-color: lightgreen;

	}
	button:hover {
		filter: brightness(110%) drop-shadow(0 5px 5px #444);
	}
	button:active {
		filter: brightness(95%) drop-shadow(0 2px 3px #333);
	}
</style>
