import Main from "@component/Main";
import Router from "@core/Router";

const app = document.getElementById("app");
const routes = [
    ["/", () => new Main(app)],
];


Router.init(routes);