module.exports = ({ env }) => ({
  publisher: {
    enabled: true,
  },
  email: {
    provider: "nodemailer",
    providerOptions: {
      host: "localhost",
      port: 1025,
      ignoreTLS: true,
    },
  },
});
