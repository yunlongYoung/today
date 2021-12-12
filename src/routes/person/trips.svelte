<script lang="ts">
    import { onMount } from "svelte";
    import { family, index } from "$lib/stores";
    import { compareDateDesc, getDateStr, compareTimeDesc } from "$lib/tools";
    import Trip_list from "$lib/trip-list.svelte";
    import Trip_detail from "$lib/trip-detail.svelte";
    let i: number;
    let state = "list";
    let trips = [];
    let trip_index = 0;
    $: trip = trips[trip_index];
    function toAdd(): void {
        state = "detail-adding";
        trips.unshift({
            start_time: `${getDateStr()} 08:30`,
            start_place: "",
            end_time: `${getDateStr()} 14:30`,
            end_place: "",
            vihicle_type: null,
            vihicle_number: "",
            remarks: "",
        });
        trip = trips[0];
    }
    function watchDetail(event: any): void {
        state = "detail-watching";
        // TODO: 为了规避新增行程后，index不正确的bug
        console.log(event);
        trip = trips[0];
    }
    function toSubmit(): void {
        state = "list";
        trips = trips.sort(compareTimeDesc);
    }
    function toLast(): void {
        trip_index -= 1;
    }
    function toNext(): void {
        trip_index += 1;
    }
    function toList(): void {
        state = "list";
    }
    async function getRecords() {
        const url = `http://localhost:8000/person/trips?idcard=${$family[$index]["id"]}`;
        const res = await fetch(url);

        if (res.ok) {
            trips = await res.json();
            trips = trips.sort(compareDateDesc);
            return {
                props: {},
            };
        }
    }
    onMount(async () => {
        await getRecords();
        i = $index;
    });
</script>

{#if state == "list"}
    <h2>行程列表</h2>
    <form class="pure-form">
        <button
            id="button-new-trip"
            class="pure-button pure-button-primary"
            on:click={toAdd}>新增行程</button
        >
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
    <Trip_list {trips} on:click={(e) => watchDetail(e)} />
{:else if state == "detail-adding"}
    <h2>添加行程</h2>
    <Trip_detail isAdding={true} {trip} />
    <button class="pure-button pure-button-primary" on:click={toSubmit}
        >提交</button
    >
{:else if state == "detail-watching"}
    <h2>行程详情</h2>
    <div class="pure-control-group">
        <button class="pure-button" on:click={toList}>返回列表</button>
        <button class="pure-button" on:click={toLast} disabled={trip_index == 0}
            >上一条</button
        >
        <button
            class="pure-button"
            on:click={toNext}
            disabled={trip_index == trips.length - 1}>下一条</button
        >
    </div>
    <Trip_detail isAdding={false} {trip} />
{/if}

<style>
    #button-new-trip {
        margin: 1.5rem 1rem;
    }
    select {
        height: auto;
    }
</style>
