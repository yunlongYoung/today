<script>
  import "purecss";
  import "normalize.css";
</script>

<svelte:head>
  <title>礼县幸福家园疫情防控大数据平台</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>


<main>
  <slot />
</main>

<style>
  main {
    max-width: 768px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
