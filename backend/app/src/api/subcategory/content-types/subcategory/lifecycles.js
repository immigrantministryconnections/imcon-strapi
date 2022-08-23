const { ApplicationError } = require("@strapi/utils").errors;

module.exports = {
  async beforeCreate(event) {
    console.log({ event });
    const { result } = event;
    const resource = await strapi.db.query("api::resource.resource").findOne({
      where: { resourceSlug: "national-resources" },
    });
    event.params.data.resource = resource;
  },

  async beforeUpdate(event) {
    console.log({ data: event.params.data });
    const { result } = event;
    const resource = await strapi.db.query("api::resource.resource").findOne({
      where: { resourceSlug: "national-resources" },
    });
    event.params.data.resource = resource;
  },
};
