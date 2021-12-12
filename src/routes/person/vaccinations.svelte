<script lang="ts">
    import { family, index } from "$lib/stores";
    import { onMount } from "svelte";
    import Vaccination_record from "$lib/vaccination-record.svelte";
    import { getDateStr, compareDateDesc } from "$lib/tools";

    let i: number;
    let isAdding = false;
    let confirmed = false;
    let records = [];
    function toAdd(): void {
        isAdding = true;
        records = [
            {
                date: getDateStr(),
                location: "甘肃省陇南市礼县",
                vaccineType: 1,
            },
            ...records,
        ];
    }
    function toSubmit(): void {
        records = records.sort(compareDateDesc);
        isAdding = false;
        confirmed = false;
    }
    async function getRecords() {
        const url = `http://localhost:8000/person/vaccinations?idcard=${$family[$index]["id"]}`;
        const res = await fetch(url);

        if (res.ok) {
            records = await res.json();
            records = records.sort(compareDateDesc);
        }
    }
	onMount(async () => {
		await getRecords();
		i = $index;
	});
</script>

<h2>疫苗注射</h2>
{#if isAdding}
    <Vaccination_record
        {isAdding}
        bind:date={records[0].date}
        bind:location={records[0].location}
        bind:type_={records[0].vaccineType}
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
            新增注射记录
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
    {#if records == []}
        没有找到注射记录
    {:else}
        {#each records as record}
            <Vaccination_record {isAdding} {...record} />
            <hr />
        {/each}
    {/if}
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
