import restify from "restify";

import {
  CloudAdapter,
  ConfigurationBotFrameworkAuthentication,
  ConfigurationBotFrameworkAuthenticationOptions,
  MemoryStorage,
  UserState,
} from "botbuilder";

import { WelcomeBot } from "./bot";
import { Flow } from "./flow";

const server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(`\n${server.name} listening to ${server.url}`);
});

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

server.post("/api/messages", async (req, res) => {
  await adapter.process(req, res, (context) => myBot.run(context));
});

server.post("/api/flow/save", async (req, res) => {
  const flowNode = req.body;
  console.log(flowNode);
  await flow.save(flowNode);
});
