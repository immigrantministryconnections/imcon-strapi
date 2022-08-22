module.exports = ({ env }) => ({
  publisher: {
    enabled: true,
  },
  email: {
    config: {
      provider: env("EMAIL_PROVIDER"),
      providerOptions: {
        host: env("EMAIL_SMTP_HOST"),
        port: env("EMAIL_SMTP_PORT"),
        auth: {
          user: env("EMAIL_SMTP_USER"),
          pass: env("EMAIL_SMTP_PASS"),
        },
      },
      settings: {
        defaultFrom: env("EMAIL_DEFAULT_FROM"),
        defaultReplyTo: env("EMAIL_DEFAULT_REPLYTO"),
      },
    },
  },
  "netlify-deployments": {
    enabled: true,
    config: {
      buildHook: env("NETLIFY_DEPLOYMENTS_PLUGIN_BUILD_HOOK"),
      accessToken: env("NETLIFY_DEPLOYMENTS_PLUGIN_ACCESS_TOKEN"),
      siteId: env("NETLIFY_DEPLOYMENTS_PLUGIN_SITE_ID"),
    },
  },
});
