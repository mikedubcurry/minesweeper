<script lang="ts">
	export let gridSize = 5;
</script>

<div style={`--grid-size: ${gridSize};`} class="minefield">
	<slot />
</div>

<style>
	.minefield {
		width: calc(100vw - 32px);
		height: calc(100vw - 32px);
		display: grid;
		grid-template-columns: repeat(var(--grid-size), 1fr);
		grid-auto-rows: 1fr;
		gap: 2px;
		/* margin: 16px; */
	}

	@media screen and (min-width: 500px) {
		.minefield {
			width:  500px;
			height: 500px ;
		}
	}
</style>
