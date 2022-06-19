import { html } from "../../node_modules/lit-html/lit-html.js";
import { createGame } from "../services/moviesRequester.js";

const renderPage = (ctx) => html`
  <section id="create-page" class="auth">
    <form id="create">
      <div class="container">
        <h1>Create Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter game title..."
        />

        <label for="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Enter game category..."
        />

        <label for="levels">MaxLevel:</label>
        <input
          type="number"
          id="maxLevel"
          name="maxLevel"
          min="1"
          placeholder="1"
        />

        <label for="game-img">Image:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          placeholder="Upload a photo..."
        />

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary"></textarea>
        <input
          class="btn submit"
          type="submit"
          value="Create Game"
          @click=${ctx.createHandler}
        />
      </div>
    </form>
  </section>
`;

export const renderCreate = (ctx) => {
  ctx.createHandler = createHandler.bind(null,ctx);
  ctx.renderMiddleware(renderPage(ctx));
};

const createHandler = async(ctx,event) => {
  event.preventDefault();
  let formData = new FormData(event.target.parentElement.parentElement);
  let data = Object.fromEntries(formData);
  let response = await createGame(null,data);
  console.log(response)
  if(response.message) {
    alert(response.message)
  } else {
    ctx.page.redirect('/')
  }
};
