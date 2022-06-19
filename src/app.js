import page from "../node_modules/page/page.mjs";
import { renderMiddleware } from "./middleware/renderMiddleware.js";
import { renderHome } from "./views/homeView.js";
import { renderLogin } from "./views/loginView.js";
import { renderRegister } from "./views/registerView.js";
import { renderCreate } from "./views/createView.js";
import { renderLogout } from "./views/logoutView.js";
import { renderCatalogue } from "./views/catalogueView.js";
import {  renderDetails } from "./views/detailsView.js";
import { renderEdit } from "./views/editView.js";
// import { renderDelete } from "./views/deleteView.js";



page(renderMiddleware);
page("/", renderHome);
page("/login", renderLogin);
page("/register", renderRegister);
page("/create", renderCreate);
page("/logout", renderLogout);
page("/catalogue", renderCatalogue);
page("/catalogue", renderCatalogue);
page("/details/:gameId", renderDetails);
page("/edit/:gameId", renderEdit);
// page("/delete/:gameId", renderDelete);



page.start();
