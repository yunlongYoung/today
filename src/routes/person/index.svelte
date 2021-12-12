<script lang="ts">
	//一共两种模式，修改或者新建，默认为修改模式
	import { family, index } from "$lib/stores";
	import { onMount } from "svelte";
	let i: number;
	$: person = $family[$index];
	let state = "watching";
	function toModify(): void {
		state = "modifying";
	}
	function toAdd(): void {
		state = "adding";
	}
</script>

<h2>个人信息</h2>
<form class="pure-form pure-form-stacked">
	<fieldset>
		<!-- 正在新增，所有input为空 -->
		{#if state == "watching"}
			姓名*
			<select
				bind:value={i}
				on:change={async () => {
					index.set(i);
				}}
			>
				{#each $family as person, i (person.id)}
					<option value={i}>{person.name}</option>
				{/each}
			</select>
			<label for="idcard">身份证*</label>
			<input type="text" id="idcard" value={person["id"]} readonly />
			<label for="phone">手机号</label>
			<input type="tel" id="phone" value={person["phone"]} readonly />
			<label for="workplace">工作单位</label>
			<input
				type="text"
				id="workplace"
				value={person["workplace"]}
				readonly
			/>
			<lable id="location">详细住址</lable>
			<textarea
				id="location"
				value={$family[$index]["address"].replace("甘肃省陇南市", "")}
				readonly
			/>
			<label for="remarks">备注</label>
			<textarea id="remarks" value={person["remarks"]} readonly />
			<button class="pure-button" on:click={toModify}>修改</button>
			<button class="pure-button" on:click={toAdd}>新增</button>
			{#if person["family"] != null}
				<a class="pure-button" href="/family">进入家庭主页</a>
			{:else}
				<a class="pure-button" href="/family/new">创建/加入家庭</a>
			{/if}
		{:else if state == "modifying"}
			<label for="name">姓名*</label>
			<input type="text" id="name" value={person["name"]} required />
			<label for="idcard">身份证*</label>
			<input type="text" id="idcard" value={person["id"]} />
			<label for="phone">手机号</label>
			<input type="tel" id="phone" value={person["phone"]} />
			<label for="workplace">工作单位</label>
			<input type="text" id="workplace" value={person["workplace"]} />
			<lable id="location">详细住址</lable>
			<textarea
				id="location"
				value={$family[$index]["address"].replace("甘肃省陇南市", "")}
			/>
			<label for="remarks">备注</label>
			<textarea id="remarks" value={person["remarks"]} />
			<button type="submit" class="pure-button" id="add">完成修改</button>
		{:else if state == "adding"}
			<label for="name">姓名*</label>
			<input type="text" id="name" required />
			<label for="idcard">身份证*</label>
			<input type="text" id="idcard" required />
			<label for="phone">手机号</label>
			<input type="tel" id="phone" />
			<label for="workplace">工作单位</label>
			<input type="text" id="workplace" />
			<lable id="location">详细住址</lable>
			<textarea id="location" />
			<label for="remarks">备注</label>
			<textarea id="remarks" />
			<button type="submit" class="pure-button" id="add">提交</button>
		{/if}
	</fieldset>
</form>

<style>
	.pure-button {
		margin-top: 0.7em;
	}
	select{
		height:auto;
	}
</style>
