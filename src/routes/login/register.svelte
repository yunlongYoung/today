<svelte:head>
    <title>注册新用户</title>
</svelte:head>

<h2>注册新用户</h2>
<form class="pure-form pure-form-stacked">
    <fieldset>
        <label for="name">姓名*</label>
        <input type="text" id="name" required />
        <label for="idcard">身份证*</label>
        <input type="text" id="idcard" required />
        <label for="phone">手机号*</label>
        <input type="tel" id="phone" required />
        <label for="password">密码*</label>
        <input type="password" id="password" required />
        <label for="workplace">工作单位</label>
        <input type="text" id="workplace" />
        <label for="location">详细住址</label>
        <textarea id="location" />
        <label for="remarks">备注</label>
        <textarea id="remarks" />
        <button type="submit" class="pure-button" id="add">提交</button>
    </fieldset>
</form>
