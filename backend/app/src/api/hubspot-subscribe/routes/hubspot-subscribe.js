module.exports = {
  routes: [
    {
      method: "POST",
      path: "/hubspot-subscribe",
      handler: "hubspot-subscribe.subscribe",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/hubspot-subscribe",
      handler: "hubspot-subscribe.update",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
