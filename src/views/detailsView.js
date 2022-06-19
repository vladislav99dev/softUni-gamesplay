import { html,nothing } from "../../node_modules/lit-html/lit-html.js"
import { getUserData } from "../services/auth.js"
import { getGame } from "../services/moviesRequester.js";

const renderPage = (ctx) =>  html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src="${ctx.game.imageUrl}" />
            <h1>${ctx.game.title}</h1>
            <span class="levels">MaxLevel: ${ctx.game.title}</span>
            <p class="type">${ctx.game.category}</p>
        </div>

        <p class="text">
            ${ctx.game.summary}
        </p>

        <div class="details-comments">
            <h2>Comments:</h2>
            <ul>
                <!-- list all comments for current game (If any) -->
                <li class="comment">
                    <p>Content: I rate this one quite highly.</p>
                </li>
                <li class="comment">
                    <p>Content: The best game.</p>
                </li>
            </ul>
            <!-- Display paragraph: If there are no games in the database -->
            <p class="no-comment">No comments.</p>
        </div>

        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        ${ctx.isUserLoggedIn._id  === ctx.game._ownerId
        ? html`
        <div class="buttons">
            <a href="edit/${ctx.game._id}" class="button">Edit</a>
            <a href="delete/${ctx.game._id}" class="button">Delete</a>
        </div>
        `
        : nothing
    }

    </div>

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    <article class="create-comment">
        <label>Add new comment:</label>
        <form class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>

</section>
`;

export const renderDetails = async(ctx) => {
ctx.game = await getGame(ctx.params.gameId)
ctx.isUserLoggedIn = getUserData();
ctx.renderMiddleware(renderPage(ctx))
}