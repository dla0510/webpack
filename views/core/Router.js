export default class Router {
    static init(routes) {
        this.app = document.getElementById("app");
        this.routes = new Map(routes);
        window.addEventListener("popstate", () => {
            this.render(location.pathname);
        });
        this.render(location.pathname);
    }

    static render = (path) => {
        if (this.routes.has(path)) this.routes.get(path)();
        else {
            history.pushState({}, "", "/");
            this.routes.get("/")();
        }
    };
}