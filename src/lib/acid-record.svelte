<script lang="ts">
    export let isAdding: boolean;
    export let date: string;
    export let location: string;
    export let positive: boolean;
</script>

<form class="pure-form pure-form-stacked">
    <fieldset>
        {#if isAdding}
            日期*
            <input type="date" bind:value={date} />
            地点*
            <input type="text" bind:value={location} />
            结果*
            <select
                class={positive ? "positive" : ""}
                bind:value={positive}
            >
                <option value={true}>阳性</option>
                <option value={false}>阴性</option>
            </select>
        {:else}
            日期
            <input type="date" value={date} readonly />
            地点
            <input type="text" value={location} readonly />
            结果
            <select
                class={positive ? "positive" : ""}
                value={positive}
                disabled
                readonly
            >
                <option value={true}>阳性</option>
                <option value={false}>阴性</option>
            </select>
        {/if}
    </fieldset>
</form>

<style>
    select{
        height: auto;
    }
    select.positive {
        background-color: rgb(202, 60, 60, 0.75);
    }
</style>
