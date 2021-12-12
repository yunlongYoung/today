<script lang='ts'>
    export let datetime_;
    let date_ = datetime_.slice(0, 10)
    let time_ = datetime_.slice(11)
    function changeTime() :void {
        datetime_ = `${date_} ${time_}`
    }
</script>

<input type="date" bind:value={date_} on:change={changeTime}/>
<input type="time" bind:value={time_} on:change={changeTime}/>
