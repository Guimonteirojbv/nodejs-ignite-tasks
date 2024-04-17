import http from "node:http";
import { routes } from "./routes.js";
import { json } from "./middlewares/json.js";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);
  const route = routes.find((r) => r.METHOD === method && r.path.test(url));

  if (route) {
    const routeParams = req.url.match(route.path);
    req.params = { ...routeParams.groups };
    route.handler(req, res);
  }
});

server.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
