import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllGames } from "../services/moviesRequester.js";

const renderPage = (ctx) => html`
  <section id="catalog-page">
    <h1>All Games</h1>
    ${ctx.games.length > 0
      ? ctx.games.map((x) => ctx.renderGameCard(x))
      : html`
    <h3 class="no-articles">No articles yet</h3>
    </section>
    `}
  </section>
`;

export const renderCatalogue = async (ctx) => {
  ctx.games = await getAllGames();
  console.log(ctx.games);
  ctx.renderGameCard = renderGameCard;
  ctx.renderMiddleware(renderPage(ctx));
};

const renderGameCard = (game) => html`
  <div class="allGames">
    <div class="allGames-info">
      <img src="${game.imageUrl}" />
      <h6>${game.category}</h6>
      <h2>${game.title}</h2>
      <a href="/details/${game._id}" class="details-button">Details</a>
    </div>
  </div>
`;
