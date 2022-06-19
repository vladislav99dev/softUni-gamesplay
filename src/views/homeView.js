import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllGames } from "../services/moviesRequester.js";

const renderPage = (ctx) => html`
  <section id="welcome-world">
    <div class="welcome-message">
      <h2>ALL new games are</h2>
      <h3>Only in GamesPlay</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero" />

    <div id="home-page">
      <h1>Latest Games</h1>
      ${ctx.games.length > 0
        ? ctx.games.map((x) => ctx.renderGameCard(x))
        : html` <p class="no-articles">No games yet</p> `};
    </div>
  </section>
`;

export const renderHome = async (ctx) => {
  let sortedGames = await getAllGames();
  sortedGames = sortedGames.sort((a, b) => a._createdOn - b._createdOn);
  let latestGames = sortedGames.splice(0, 3);
  ctx.games = latestGames;
  ctx.renderGameCard = renderGameCard;
  ctx.renderMiddleware(renderPage(ctx));
};

const renderGameCard = (game) => html`
  <div class="game">
    <div class="image-wrap">
      <img src="${game.imageUrl}" />
    </div>
    <h3>${game.title}</h3>
    <div class="rating">
      <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
    </div>
    <div class="data-buttons">
      <a href="/details/${game._id}" class="btn details-btn">Details</a>
    </div>
  </div>
`;
