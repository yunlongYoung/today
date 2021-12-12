<script lang="ts">
    import Datetime_ from '$lib/datetime_.svelte'
    export let isAdding: boolean;
    interface Trip {
        start_time: string;
        end_time: string;
        start_place: string;
        end_place: string;
        vihicle_type: number;
        vihicle_number: string;
        remarks: string;
    }
    export let trip: Trip;
</script>

<form class="pure-form pure-form-stacked">
    <fieldset>
        {#if isAdding}
            出发时间*
            <Datetime_ bind:datetime_={trip.start_time}></Datetime_>
            出发地点*
            <input type="text" bind:value={trip.start_place} />
            到达时间*
            <Datetime_ bind:datetime_={trip.end_time}></Datetime_>
            到达地点*
            <input type="text" bind:value={trip.end_place} />
            交通工具*
            <select bind:value={trip.vihicle_type}>
                <option value={0}>自驾车</option>
                <option value={1}>出租车</option>
                <option value={2}>顺风车</option>
                <option value={3}>公共汽车</option>
                <option value={4}>高铁火车</option>
                <option value={5}>飞机</option>
                <option value={6}>其他</option>
            </select>
            号牌*
            <input type="text" bind:value={trip.vihicle_number} />
            备注
            <input type="text" bind:value={trip.remarks} />
        {:else}
            出发时间
            <input type="date" value={trip.start_time.slice(0, 10)} readonly />
            <input type="time" value={trip.start_time.slice(11)} readonly />
            出发地点
            <input type="text" value={trip.start_place} readonly />
            到达时间
            <input type="date" value={trip.end_time.slice(0, 10)} readonly />
            <input type="time" value={trip.end_time.slice(11)} readonly />
            到达地点
            <input type="text" value={trip.end_place} readonly />
            交通工具
            <select
                value={trip.vihicle_type}
                readonly
                disabled
            >
                <option value={0}>自驾车</option>
                <option value={1}>出租车</option>
                <option value={2}>顺风车</option>
                <option value={3}>公共汽车</option>
                <option value={4}>高铁火车</option>
                <option value={5}>飞机</option>
                <option value={7}>其他</option>
            </select>
            号牌
            <input type="text" value={trip.vihicle_number} readonly />
            备注
            <input type="text" value={trip.remarks} readonly />
        {/if}
    </fieldset>
</form>

<style>
    select {
        height: auto;
    }
</style>
