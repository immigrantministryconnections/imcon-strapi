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
  upload: {
    config: {
      provider: "strapi-provider-upload-azure-storage",
      providerOptions: {
        account: env("STORAGE_ACCOUNT"),
        accountKey: env("STORAGE_ACCOUNT_KEY"),
        serviceBaseURL: env("STORAGE_URL"),
        containerName: env("STORAGE_CONTAINER_NAME"),
        defaultPath: "assets",
        maxConcurrent: 10,
      },
    },
  },
});
