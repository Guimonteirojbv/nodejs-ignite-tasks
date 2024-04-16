import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    METHOD: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title || !description) {
        res.writeHead(404, "Dados incompletos").end();
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: null,
      };

      database.insert("tasks", task);

      return res.end(JSON.stringify(task));
    },
  },
  {
    METHOD: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const tasks = database.select("tasks");

      res.end(JSON.stringify(tasks));
    },
  },
  {
    METHOD: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const data = req.body;

      const updatedTask = database.update("tasks", id, data);

      return res.writeHead(200, JSON.stringify(updatedTask));
    },
  },
  {
    METHOD: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.remove("tasks", id);

      return res.writeHead(200, "Tarefa excluída");
    },
  },
  {
    METHOD: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      database.completeTask("tasks", id);

      return res.writeHead(200, "Tarefa atualizada");
    },
  },
];
