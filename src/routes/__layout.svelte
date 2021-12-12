<script lang="ts" context="module">
  import { family, index } from "$lib/stores";
</script>

<script>
  import { onMount } from "svelte";
  import {goto} from '$app/navigation'
  import "purecss";
  import "normalize.css";
  import { tick } from "svelte";
  onMount(async () => {
    if ($family == []) {
      goto("/login");
    }
  });
</script>

<svelte:head>
  <title>礼县幸福家园疫情防控大数据平台</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

{#if $family != []}
  <div id="menu" class="">
    <div class="pure-menu pure-menu-horizontal custom-restricted-width">
      <ul class="pure-menu-list">
        <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
          <a sveltekit:prefetch href="/person" class="pure-menu-link"
            >个人主页</a
          >
          <ul class="pure-menu-children">
            <li class="pure-menu-item">
              <a
                sveltekit:prefetch
                href="/person/nucleic-acid-tests"
                class="pure-menu-link">核酸检测</a
              >
            </li>
            <li class="pure-menu-item">
              <a
                sveltekit:prefetch
                href="/person/vaccinations"
                class="pure-menu-link">疫苗注射</a
              >
            </li>
            <li class="pure-menu-item">
              <a sveltekit:prefetch href="/person/trips" class="pure-menu-link"
                >行程信息</a
              >
            </li>
          </ul>
        </li>
        <li class="pure-menu-item">
          <a sveltekit:prefetch href="/family" class="pure-menu-link"
            >家庭主页</a
          >
        </li>
        <li class="pure-menu-item">
          <a
            href="/login"
            class="pure-menu-link"
            on:click={async () => {
              await tick();
              family.set([]);
              index.set(0)
            }}>退出登录</a
          >
        </li>
      </ul>
    </div>
  </div>
{:else}
  <div id="menu" class="">
    <div class="pure-menu pure-menu-horizontal custom-restricted-width" />
  </div>
{/if}

<main>
  <slot />
</main>

<style>
  .custom-restricted-width {
    /* To limit the menu width to the content of the menu: */
    display: inline-block;
    /* Or set the width explicitly: */
    /* width: 10em; */
  }
  /* :global(:root) {
    --color-primary: #8696a7;
    --color-lightGrey: #dadad8;
    --color-grey: #939391;
    --color-darkGrey: #656565;
    --color-error: #965454;
    --color-success: #b5c4b1;
    --grid-maxWidth: 67.5rem;
    --grid-gutter: 2rem;
    --font-size: 1.6rem;
    --font-family: "Helvetica Neue", sans-serif;
  } */
  main {
    max-width: 768px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
