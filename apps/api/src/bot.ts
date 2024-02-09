import {
  ActionTypes,
  ActivityHandler,
  CardFactory,
  StatePropertyAccessor,
  TurnContext,
  UserState,
} from "botbuilder";

const WELCOMED_USER = "welcomedUserProperty";

export class WelcomeBot extends ActivityHandler {
  private welcomedUserProperty: StatePropertyAccessor<boolean>;
  private userState: UserState;

  constructor(userState: UserState) {
    super();
    this.welcomedUserProperty = userState.createProperty(WELCOMED_USER);

    this.userState = userState;

    this.onMessage(async (context, next) => {
      const didBotWelcomedUser = await this.welcomedUserProperty.get(
        context,
        false
      );

      if (didBotWelcomedUser === false) {
        const userName = context.activity.from.name;
        await context.sendActivity(
          "You are seeing th!!!!is message because this was your first message ever sent to this bot."
        );
        await context.sendActivity(
          `It is a good practice to welcome the user and provide personal greeting. For example, welcome ${userName}.`
        );

        await this.welcomedUserProperty.set(context, true);
      } else {
        const text = context.activity.text.toLowerCase();
        switch (text) {
          case "hello":
          case "hi":
            await context.sendActivity(`You said "${context.activity.text}"`);
            break;
          case "intro":
          case "help":
            await this.sendIntroCard(context);
            break;
          default:
            await context.sendActivity(`This is a simple Welcome Bot sample. You can say 'intro' to
                                                    see the introduction card. If you are running this bot in the Bot
                                                    Framework Emulator, press the 'Start Over' button to simulate user joining a bot or a channel`);
        }
      }
      await this.userState.saveChanges(context);

      await next();
    });

    this.onMembersAdded(async (context, next) => {
      for (const member of context.activity.membersAdded ?? []) {
        if (member.id && context.activity.recipient.id) {
          await context.sendActivity(
            "Welcome to the 'Welcome User' Bot. This bot will introduce you to welcoming and greeting users."
          );
          await context.sendActivity(
            `You are seeing this message because the bot received at least one 'ConversationUpdate' ` +
              "event, indicating you (and possibly others) joined the conversation. If you are using the emulator, " +
              "pressing the 'Start Over' button to trigger this event again. The specifics of the 'ConversationUpdate' " +
              "event depends on the channel. You can read more information at https://aka.ms/about-botframework-welcome-user"
          );
          await context.sendActivity(
            "It is a good pattern to use this event to send general greeting to user, explaining what your bot can do. " +
              "In this example, the bot handles 'hello', 'hi', 'help' and 'intro'. " +
              "Try it now, type 'hi'"
          );
        }
      }

      await next();
    });
  }

  private async sendIntroCard(context: TurnContext) {
    const card = CardFactory.heroCard(
      "Welcome to Bot Framework!",
      "Welcome to Welcome Users bot sample! This Introduction card is a great way to introduce your Bot to the user and suggest some things to get them started. We use this opportunity to recommend a few next steps for learning more creating and deploying bots.",
      ["https://aka.ms/bf-welcome-card-image"],
      [
        {
          title: "Get an overview",
          type: ActionTypes.OpenUrl,
          value:
            "https://docs.microsoft.com/en-us/azure/bot-service/?view=azure-bot-service-4.0",
        },
        {
          title: "Ask a question",
          type: ActionTypes.OpenUrl,
          value: "https://stackoverflow.com/questions/tagged/botframework",
        },
        {
          title: "Learn how to deploy",
          type: ActionTypes.OpenUrl,
          value:
            "https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-deploy-azure?view=azure-bot-service-4.0",
        },
      ]
    );

    await context.sendActivity({ attachments: [card] });
  }
}
