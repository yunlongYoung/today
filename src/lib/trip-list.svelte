<script lang="ts">
    import { merge_date, condense_location } from "$lib/tools";
    interface Trip {
        start_time: string;
        end_time: string;
        start_place: string;
        end_place: string;
        vihicle_type: number;
    }
    export let trips: Array<Trip>;
    let vihicle_type_table = {
        0: "自驾车",
        1: "出租车",
        2: "顺风车",
        3: "公共汽车",
        4: "高铁火车",
        5: "飞机",
        6: "其他",
    };
</script>

<table class="pure-table pure-table-horizontal">
    <thead>
        <tr>
            <th>日期</th>
            <th>地点</th>
            <th>交通工具</th>
        </tr>
    </thead>
    {#each trips as trip}
        <tr on:click>
            <td>
                {merge_date(trip.start_time, trip.end_time)}
            </td>
            <td class="location">
                {condense_location(trip.start_place)}<br />
                ⏬<br />
                {condense_location(trip.end_place)}
            </td>
            <td>
                {vihicle_type_table[trip.vihicle_type]}
            </td>
        </tr>
    {/each}
</table>

<style>
    td.location {
        font-size: 0.9rem;
    }
</style>
