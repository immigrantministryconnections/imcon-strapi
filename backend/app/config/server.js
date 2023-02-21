module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: "https://imcon.azurewebsites.net",
  app: {
    keys: env.array("APP_KEYS"),
  },
  cron: {
    enabled: true,
  },
});
