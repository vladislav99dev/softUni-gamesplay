import { logout } from "../services/usersRequester.js"
import { removeUserData } from "../services/auth.js";

export const renderLogout = async(ctx) => {
    let response = await logout();

    if(response){
      let error =  await response.json();
      alert(error.message);
      throw new Error(error.message)
    } else {
        removeUserData();
        ctx.page.redirect('/')
    }
}