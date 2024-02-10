import {
  CloudAdapter,
  ConfigurationBotFrameworkAuthentication,
  ConfigurationBotFrameworkAuthenticationOptions,
  MemoryStorage,
  UserState,
} from "botbuilder";
import { NextFunction, Request, Response, Router } from "express";
import { Flow } from "./flow";
import { WelcomeBot } from "./welcomeBot";

const router = Router();

const botFrameworkAuthentication = new ConfigurationBotFrameworkAuthentication(
  process.env as ConfigurationBotFrameworkAuthenticationOptions
);

const adapter = new CloudAdapter(botFrameworkAuthentication);
adapter.onTurnError = async (context, error) => {
  console.error(`\n [onTurnError] unhandled error: ${error}`);

  await context.sendTraceActivity(
    "OnTurnError Trace",
    `${error}`,
    "https://www.botframework.com/schemas/error",
    "TurnError"
  );

  await context.sendActivity("The bot encounted an error or bug.");
  await context.sendActivity(
    "To continue to run this bot, please fix the bot source code."
  );
};

const memoryStorage = new MemoryStorage();
const userState = new UserState(memoryStorage);
const flow = new Flow();
const myBot = new WelcomeBot(userState, flow);

router.post(
  "/messages",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await adapter.process(req, res, (context) => myBot.run(context));
    } catch (error) {
      next(error);
    }
  }
);

export default router;
