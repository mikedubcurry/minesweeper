<script lang="ts">
	export let gridSize = 5;
</script>

<div style={`--grid-size: ${gridSize};`} class="minefield">
	<slot />
</div>

<style>
	.minefield {
		width: 480px;
		height: 480px;
		display: grid;
		grid-template-columns: repeat(var(--grid-size), 1fr);
		gap: 8px;
	}
</style>
