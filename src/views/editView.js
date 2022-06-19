import { html } from "../../node_modules/lit-html/lit-html.js"
import { getGame, updateGame } from "../services/moviesRequester.js";

const renderPage = (ctx) =>  html`
 <section id="edit-page" class="auth">
<form id="edit">
    <div class="container">
        <h1>Edit Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input type="text" id="title" name="title" value="${ctx.game.title}">

        <label for="category">Category:</label>
        <input type="text" id="category" name="category" value="${ctx.game.category}">

        <label for="levels">MaxLevel:</label>
        <input type="number" id="maxLevel" name="maxLevel" min="1" value="${ctx.game.maxLevel}">

        <label for="game-img">Image:</label>
        <input type="text" id="imageUrl" name="imageUrl" value="${ctx.game.imageUrl}">

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary">${ctx.game.summary}</textarea>
        <input class="btn submit" type="submit" value="Edit Game" @click=${ctx.submitHandler}>

    </div>
</form>
</section> 
`;

export const renderEdit = async(ctx) => {
ctx.game = await getGame(ctx.params.gameId);
ctx.submitHandler = submitHandler.bind(null,ctx);
ctx.renderMiddleware(renderPage(ctx))
}
const submitHandler = async(ctx,event) => {
    event.preventDefault();
    let formData = new FormData(event.target.parentElement.parentElement);
    let data = Object.fromEntries(formData);
    let response = await updateGame(ctx.game._id, data)
    if(response.message) {
        alert(response.message)
    } else {
        ctx.page.redirect('/')
    }

}