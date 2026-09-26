const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
app.use(express.text({ limit: "1mb" }));

app.post("/logs", (req, res) => {
    const body = (req.body || "").toString().trim();
    if (body) {
        console.log("[LOG]", body);
        wss.clients.forEach(c => {
            if (c.readyState === 1) c.send(body);
        });
    }
    res.send("ok");
});

app.get("/", (req, res) => res.send("OdsWUa Logs API online"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: "/ws" });

wss.on("connection", (ws) => {
    console.log("Cliente WS conectado | total:", wss.clients.size);
    ws.on("close", () => console.log("Cliente WS saiu | total:", wss.clients.size));
    ws.on("error", (e) => console.log("WS erro:", e.message));
});

server.listen(process.env.PORT || 3000, () => {
    console.log("Servidor rodando na porta", process.env.PORT || 3000);
});
