<script lang="ts">
	export let gridSize = 5;
	export let hard = false;
</script>

<div style={`--grid-size: ${gridSize}; --ratio: ${hard ? '1.3' : '1'};`} class="minefield">
	<slot />
</div>

<style>
	.minefield {
		--width: calc(100vw - 32px);
		--height: calc((100vw * var(--ratio)) - 32px);
		width: var(--width);
		height: var(--height);
		display: grid;
		grid-template-columns: repeat(var(--grid-size), 1fr);
		grid-auto-rows: 1fr;
		gap: 2px;
		/* margin: 16px; */
	}

	@media screen and (min-width: 500px) {
		.minefield {
			width: 500px;
			height: calc(500px * var(--ratio));
		}
	}
</style>
