import { html } from "../../node_modules/lit-html/lit-html.js";
import { getToken } from "../services/auth.js";


let guestButtons = () => html`
        <!-- Guest users -->
        <div id="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
`;
let userButtons = () => html`
    <!-- Logged-in users -->
    <div id="user">
        <a href="/create">Create Game</a>
        <a href="/logout">Logout</a>
    </div>

`;
export const navBar = () => html`
            <header>
                <!-- Navigation -->
                <h1><a class="home" href="/">GamesPlay</a></h1>
                <nav>
                    <a href="/catalogue">All games</a>
                    ${getToken()
                        ? userButtons()
                        : guestButtons()
                    }
                </nav>
            </header>
`;
