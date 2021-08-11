<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let difficulty: 'easy' | 'medium' | 'hard' = 'easy';

	const dispatch = createEventDispatcher();
</script>

<select bind:value={difficulty} name="difficulty" id="difficulty">
	<option value="easy">Easy</option>
	<option value="medium">Medium</option>
	<option value="hard">Hard</option>
</select>

<button on:click={() => dispatch('newGame')}>New Game</button>
