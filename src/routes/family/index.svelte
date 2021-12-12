<script context="module" lang="ts">
  export const prerender = true;
  import { goto } from "$app/navigation";
  import { family, index } from "$lib/stores";
</script>

<script lang="ts">
  let radio_index: number;
  function holdDelete() {
    // TODO 必须连接到数据库
    let arr = [
      ...$family.slice(0, radio_index),
      ...$family.slice(radio_index + 1),
    ];
    family.set(arr);
  }
</script>

<h2>家庭主页</h2>

<table class="pure-table pure-table-horizontal">
  <thead>
    <tr>
      <th />
      <th>姓名</th>
      <th>手机</th>
      <th>关系</th>
    </tr>
  </thead>
  {#each $family as person, i (person)}
    <tr class={i&1 ? "pure-table-odd" : ""}>
      <td>
        <input
          type="radio"
          name="familyRadio"
          bind:group={radio_index}
          value={i}
        />
      </td>
      <td
        on:click={() => {
          index.set(i);
          goto("/person");
        }}
      >
        {person.name}
      </td>
      <td
        on:click={() => {
          index.set(i);
          goto("/person");
        }}
      >
        {person.phone}
      </td>
      <td
        on:click={() => {
          index.set(i);
          goto("/person");
        }}
      >
        {person.relative}
      </td>
    </tr>
  {/each}
</table>
<div class="bottom-buttons">
  <a class="pure-button" href="/family/new">新增家庭成员</a>
  <button class="pure-button button-error" on:click={holdDelete}>删除</button>
</div>

<style>
  .button-error {
    background: rgb(202, 60, 60);
  }
  .bottom-buttons {
    margin-top: 5%;
  }
</style>
