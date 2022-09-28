import Main from "@components/Main";
import Router from "@core/Router";

const app = document.getElementById("app");
const routes = [
    ["/", () => new Main(app)],
];


Router.init(routes);