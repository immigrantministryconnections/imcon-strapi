module.exports = {
  routes: [
    {
      method: "POST",
      path: "/mailchimp-subscribe",
      handler: "mailchimp-subscribe.subscribe",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
