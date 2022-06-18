import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from "../services/usersRequester.js";
import { saveUserData } from "../services/auth.js";
const renderPage = (ctx) => html`
<section id="login-page" class="auth">
    <form id="login">
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Login</h1>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">
            <label for="login-pass">Password:</label>
            <input type="password" id="login-password" name="password">
            <input type="submit" class="btn submit" value="Login" @click=${ctx.loginHandler}>
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </div>
    </form>
</section>
`;

export const renderLogin = (ctx) => {
    ctx.loginHandler = loginHandler.bind(null,ctx);
    ctx.renderMiddleware(renderPage(ctx))
}
export const loginHandler = async(ctx,event) => {
    event.preventDefault();
    try {
        let form = new FormData(event.target.parentElement.parentElement);
        let data = Object.fromEntries(form);
        if (data.email && data.password) {
            let response  = await login(data);
            if(response.message){ 
                throw new Error(response.message)
            } else {
                saveUserData(response);
                ctx.page.redirect('/')
            }
        } else {
            throw new Error('All inputs should be filled!')
        }
    } catch (err) {
        alert(err.message)
    }
}