<script lang="ts">
	import { onMount } from "svelte";
	import { family, index } from "$lib/stores";
	import { getDateStr, compareDateDesc } from "$lib/tools";
	import Acid_record from "$lib/acid-record.svelte";
	let i: number;
	let isAdding = false;
	let confirmed = false;
	let tests = [];
	function toAdd(): void {
		isAdding = true;
		tests = [
			{
				date: getDateStr(),
				location: "甘肃省陇南市礼县",
				positive: false,
			},
			...tests,
		];
	}
	function toSubmit(): void {
		tests = tests.sort(compareDateDesc);
		isAdding = false;
		confirmed = false;
	}
	async function getRecords() {
		const url = `http://localhost:8000/person/nucleic-acid-tests?idcard=${$family[$index]["id"]}`;
		const res = await fetch(url);

		if (res.ok) {
			tests = await res.json();
		}
	}
	onMount(async () => {
		await getRecords();
		i = $index;
	});
</script>

<h2>核酸检测</h2>
{#if isAdding}
	<Acid_record
		{isAdding}
		bind:date={tests[0].date}
		bind:location={tests[0].location}
		bind:positive={tests[0].positive}
	/>
	<div class="pure-control-group">
		<label for="read">
			<input type="checkbox" id="read" bind:checked={confirmed} /> 我已确认无误
		</label>
		<button
			class="pure-button pure-button-primary"
			on:click={toSubmit}
			disabled={!confirmed}
		>
			提交
		</button>
	</div>
{:else}
	<form class="pure-form">
		<button
			class="pure-button pure-button-primary"
			id="button-new-record"
			on:click={toAdd}
		>
			新增检测记录
		</button>
		<select
			bind:value={i}
			on:change={async () => {
				index.set(i);
				await getRecords();
			}}
		>
			{#each $family as person, i (person.id)}
				<option value={i}>{person.name}</option>
			{/each}
		</select>
	</form>
	{#each tests as test}
		<Acid_record {isAdding} {...test} />
		<hr />
	{/each}
{/if}

<style>
	.pure-control-group {
		margin-top: 1.5rem;
	}
	#button-new-record {
		margin: 1.5rem 1rem;
	}
	select {
		height: auto;
	}
</style>
