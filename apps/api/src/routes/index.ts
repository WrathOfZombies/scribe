import { Router } from "express";
import messagesController from "./messages/messagesController";
import scriptsController from "./scripts/scriptsController";

const api = Router().use(messagesController).use(scriptsController);

export default Router().use("/api", api);
