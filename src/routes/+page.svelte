<script>
	import { goto } from "$app/navigation";
	import { navigating } from "$app/stores";

	export let data;
</script>

<h1>Home</h1>

<div class="games">
	{#each data.user.games as game}
		{@const href = `/game/${game.appid}`}
		<img
			class:pending={$navigating?.to?.url.pathname === href}
			on:click={() => goto(href)}
			src={game.cover}
			alt=""
		/>
	{/each}
</div>

<style lang="scss">
	.games {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		padding: 3rem;
	}

	img {
		cursor: pointer;
		user-select: none;
		-webkit-user-drag: none;

		display: block;
		width: 100%;
		border-radius: 0.25rem;
		background-color: rgba(white, 0.1);

		transition-property: translate, opacity, scale;

		&:hover {
			translate: 0 -0.25rem;
		}

		&.pending,
		&:active {
			opacity: 0.5;
			scale: 0.99;
		}

		&.pending {
			pointer-events: none;
			filter: grayscale(100%);
		}
	}
</style>
