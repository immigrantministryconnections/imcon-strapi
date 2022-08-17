module.exports = ({ env }) => ({
  publisher: {
    enabled: true,
  },
  email: {
    provider: env("EMAIL_PROVIDER", "nodemailer"),
    providerOptions: {
      host: env("EMAIL_SMTP_HOST", "smtp.imcon.church"),
      port: env("EMAIL_SMTP_PORT", 587),
      auth: {
        user: env("EMAIL_SMTP_USER"),
        pass: env("EMAIL_SMTP_PASS"),
      },
      settings: {
        defaultFrom: "john@imcon.church",
        defaultReplyTo: "john@imcon.church",
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
