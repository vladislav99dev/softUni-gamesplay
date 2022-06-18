import { render, html } from "../../node_modules/lit-html/lit-html.js"
import { navBar } from "../views/navigationView.js"

let root = document.querySelector('#box');

const renderPage = (template) => html`
        <header>${navBar()}</header>
        <main id="main-content">${template}</main>
`;

export const renderMiddleware = (ctx, next) => {
    ctx.renderMiddleware = (template) => {
        return render(renderPage(template), root)
    };
    next();
}