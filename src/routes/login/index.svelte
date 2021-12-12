<script lang="ts">
    import { goto } from "$app/navigation";

    import { family, index} from "$lib/stores";
    import { get_index } from "$lib/tools";
    let idcard: string = "";
    let password: string = "";
    // 检查是否登录:检查本地数据，是否有用户

    // 如果都没有，则跳转到登录页面
    async function holdSubmit() {
        // if (password.length < 6) {
        //     alert("密码不足6位");
        //     // 将来让登录框禁用
        // }
        // if (idcard.length != 18) {
        //     alert("身份证错误");
        //     // 将来让登录框禁用
        // }
        // 请求服务器
        let result = await login();
        // 如果错误，alert
        if (result[0]["error"] != null) {
            alert(result[0]["error"].message);
            // 如果正确，返回本人信息json
        } else {
            family.set(result);
            index.set(get_index($family, idcard));
            console.log($index)
            goto("/person");
            // 登录转到个人主页，并且存入localStorage
        }
    }
    //在登录前检查本地，发现有person则直接登录，无需再输入
    async function login(): Promise<Array<object>> {
        const url = `http://localhost:8000/login?idcard=${idcard}&password=${password}`;
        const res = await fetch(url);
        console.log(res.json);

        if (res.ok) {
            return await res.json();
        } else {
            return [
                {
                    error: new Error(`用户名或密码错误`),
                },
            ];
        }
    }
</script>

<svelte:head>
    <title>礼县幸福家园疫情防控大数据平台</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<h2>礼县幸福家园疫情防控大数据平台</h2>

<!-- <form on:submit={holdSubmit}> -->
<!-- <Field label="用户名">
        <Input placeholder="请输入你的用户名" />
    </Field>
    <Field label="密码">
        <Input password placeholder="请输入你的密码" />
    </Field> -->

<!-- TODO 这里还需要看下是怎么写submit -->
<!-- <Button on:click={holdSubmit}>登录</Button>
    <Button>注册</Button> -->
<!-- </form> -->
<main>
    <form class="pure-form pure-form-stacked">
        <fieldset>
            <label for="idcard">身份证号</label>
            <input type="text" id="idcard" bind:value={idcard} />
            <label for="password">密码</label>
            <input type="password" id="password" bind:value={password} />
            <button
                class="pure-button pure-button-primary"
                on:click|preventDefault={holdSubmit}>登录</button
            >
            <a class="pure-button" href="/login/register">注册</a>
        </fieldset>
    </form>
</main>

<style>
    form {
        margin-top: 6rem;
    }
    .pure-button {
        margin-top: 0.7em;
    }
</style>
