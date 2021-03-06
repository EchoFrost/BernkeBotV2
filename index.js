const Discord = require("discord.js");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./config.json"));
const commands = JSON.parse(fs.readFileSync("./commands.json"));
const client = new Discord.Client();

client.login(config.loginToken);

client.once("ready", () => {
  console.log("Ready");
});

commands.forEach((element) => {
  client.api
    .applications(config.botId).guilds("249809874853036033")
    .commands.post({ data: element })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
});

client.ws.on("INTERACTION_CREATE", async (interaction) => {
  const command = interaction.data.name;
  const args = interaction.data.options;

  if (commands.filter((x) => x.name === command).length > 0) {
    if (command === "takematrix") {
      client.api
        .interactions(interaction.id, interaction.token)
        .callback.post({
          data: {
            type: 4,
            data: {
              content:
                "Q1 = Hot and Right, Q2 = Hot and Wrong, Q3 = Cold and Wrong, Q4 = Cold and Right",
            },
          },
        })
        .catch((error) => console.log(error));
    }
    else if (command === "everyone") {
      client.api
        .interactions(interaction.id, interaction.token)
        .callback.post({
          data: {
            type: 4,
            data: {
              content:
                "@everyone lmao",
            },
          },
        })
        .catch((error) => console.log(error))
    }
    else if (command === "model") {
      client.api
        .interactions(interaction.id, interaction.token)
        .callback.post({
          data: {
            type: 4,
            data: {
              content:
                "What's your model?",
            },
          },
        })
        .catch((error) => console.log(error))
    }
    else if (command === "thisu") {
      client.api
        .interactions(interaction.id, interaction.token)
        .callback.post({
          data: {
            type: 3,
            data: {
              content:
                "This, but unironically",
            },
          },
        })
        .catch((error) => console.log(error))
    }
    else if (command === "census") {
      client.api
        .interactions(interaction.id, interaction.token)
        .callback.post({
          data: {
            type: 3,
            data: {
              content:
                "https://www2.census.gov/library/publications/decennial/1860/population/1860a-31.pdf",
            },
          },
        })
        .catch((error) => console.log(error))
    }
    else if (command === "child") {
      client.api
        .interactions(interaction.id, interaction.token)
        .callback.post({
          data: {
            type: 3,
            data: {
              content:
                "Did a child write this?",
            },
          },
        })
        .catch((error) => console.log(error))
    }
  } else {
    console.log("Unknown command.");
  }
});
