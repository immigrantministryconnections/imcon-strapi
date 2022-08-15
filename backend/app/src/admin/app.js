import Logo from "./extensions/imcon_logo.png";
import Icon from "./extensions/imcon_icon.png";
import favicon from "./extensions/favicon.ico";

export default {
  config: {
    auth: { logo: Logo },
    head: { favicon },
    menu: {
      logo: Icon,
    },
    theme: {
      colors: {
        primary700: "#133e5dff",
        primary600: "#1d5b8dff",
        primary500: "#247ab9ff",
      },
    },
    translations: {
      en: {
        "Auth.form.welcome.title": "Welcome",
        "Auth.form.welcome.subtitle": "Log in to your IMCON admin account",
        "app.components.LeftMenu.navbrand.title": "IMCON Dashboard",
      },
    },
  },
  bootstrap(app) {
    console.log(app);
  },
};
