<script lang="ts">
    export let isAdding: boolean;
    export let date: string;
    export let location: string;
    export let type_: string;
</script>

<form class="pure-form pure-form-stacked">
    <fieldset>
        {#if isAdding}
            日期*
            <input type="date" bind:value={date} />
            地点*
            <input type="text" bind:value={location} />
            疫苗类型*
            <select
                bind:value={type_}
            >
                <option value="腺病毒">腺病毒</option>
                <option value="灭活">灭活</option>
                <option value="重组蛋白">重组蛋白</option>
            </select>
        {:else}
            日期
            <input type="date" value={date} readonly />
            地点
            <input type="text" value={location} readonly />
            疫苗类型
            <select
                value={type_}
                disabled
                readonly
            >
                <option value="腺病毒">腺病毒</option>
                <option value="灭活">灭活</option>
                <option value="重组蛋白">重组蛋白</option>
            </select>
        {/if}
    </fieldset>
</form>

<style>
    select {
        height: auto;
    }
</style>
