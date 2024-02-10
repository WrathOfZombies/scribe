import { Router } from "express";
import messagesController from "./messages/messagesController";

const api = Router().use(messagesController);

export default Router().use("/api", api);
