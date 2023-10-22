import express from "express";

import os from "node:os";

import config from "./config";
import apiRouter from "./router/api-router";
import ServerRender from "./render";

const server = express();
server.use(express.static("dist"));
server.set("view engine", "ejs");

server.use("/api", apiRouter);

server.get(["/", "/contest/:contestId"], async (req, res) => {
    const {initialMarkup, initialData} = await ServerRender(req);
    res.render("index", {
        initialMarkup,
        initialData
    });
});

server.listen(parseInt(config.PORT), config.HOST, () => {
    console.info(`Express server is listening on ${config.SERVER_URL}`,
        `Free Mem: ${os.freemem() / 1024 / 1024}`);

});