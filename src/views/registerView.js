{/* */ }
import { html } from "../../node_modules/lit-html/lit-html.js"
import { register } from "../services/usersRequester.js";
import { saveUserData } from "../services/auth.js";

const renderPage = (ctx) => html`
<section id="register-page" class="content auth">
    <form id="register">
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Register</h1>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="maria@email.com">

            <label for="pass">Password:</label>
            <input type="password" name="password" id="register-password">

            <label for="con-pass">Confirm Password:</label>
            <input type="password" name="confirmPassword" id="confirm-password">

            <input class="btn submit" type="submit" value="Register" @click=${ctx.registerHandler}>

            <p class="field">
                <span>If you already have profile click <a href="#">here</a></span>
            </p>
        </div>
    </form>
</section>
`;

export const renderRegister = (ctx) => {
    ctx.registerHandler = registerHandler.bind(null,ctx);
    ctx.renderMiddleware(renderPage(ctx))
}
export const registerHandler = async(ctx,event) => {
    event.preventDefault();
    try {
        let form = new FormData(event.target.parentElement.parentElement);
        let data = Object.fromEntries(form);
        if (data.email && data.password && data.confirmPassword) {
            if(data.password === data.confirmPassword) {
                let response  = await register(data);
                if(response.message){ 
                    console.log(response.message)
                    throw new Error(response.message)
                } else {
                    saveUserData(response);
                    ctx.page.redirect('/')
                }
            }else {
                throw new Error('Passwords does not match!')
            }
        } else {
            throw new Error('All inputs should be filled!')
        }
    } catch (err) {
        console.log(err)
        alert(err.message)
    }
}