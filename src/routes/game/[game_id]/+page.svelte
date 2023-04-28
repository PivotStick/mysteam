<script>
	export let data;

	let game = data.game;
	let currentVid = 0;
</script>

<div class="container">
	<h1>{game.name}</h1>

	<img src={game.background} alt="" class="background" />

	{#if game.movies?.length}
		<video
			width="480"
			autoplay
			src={game.movies[currentVid].mp4.max}
			controls
			on:ended={() => {
				currentVid = (currentVid + 1) % game.movies.length;
			}}
		>
			<track kind="captions" />
		</video>
	{/if}

	<div class="screenshots">
		{#each game.screenshots as screen}
			<img src={screen.path_full} alt="" />
		{/each}
	</div>

	<ul class="successes">
		{#each game.achievements as success}
			<li class:achieved={success.achieved}>
				<img src={success.achieved ? success.details.icon : success.details.icongray} alt="" />
				<div class="details">
					<p class="name">{@html success.name}</p>
					<p class="description">{success.description}</p>
				</div>
			</li>
		{/each}
	</ul>

	<p>{@html game.detailed_description}</p>

	<pre>{JSON.stringify(game, null, 2)}</pre>
</div>

<style lang="scss">
	.container {
		position: relative;

		z-index: 0;
		padding: 4rem;

		.background {
			position: absolute;
			z-index: -1;
			inset: 0;
			width: 100%;
			object-fit: cover;
		}

		video {
			width: 100%;
			aspect-ratio: 16 / 9;
			border-radius: 1rem;
		}

		.screenshots {
			overflow: auto;

			display: flex;
			gap: 1rem;
			height: 10rem;

			img {
				display: block;
				flex-shrink: 0;
			}
		}
	}

	pre {
		white-space: pre-wrap;
	}

	.successes {
		display: flex;
		overflow: auto;
		list-style: none;

		gap: 1rem;
		margin: 2rem 0;
		scrollbar-width: none;
		border-radius: 0.5rem;

		&::-webkit-scrollbar {
			display: none;
		}

		li {
			flex-shrink: 0;
			background-color: rgba(white, 0.1);
			padding: 1.5rem;
			border-radius: 0.5rem;
			display: flex;
			gap: 1rem;
			align-items: center;

			&:not(.achieved) {
				opacity: 0.5;
			}

			.name {
				font-weight: 700;
				font-size: 1.5rem;
				margin-bottom: 0.25rem;
			}

			.description {
				opacity: 0.75;
			}
		}
	}
</style>
