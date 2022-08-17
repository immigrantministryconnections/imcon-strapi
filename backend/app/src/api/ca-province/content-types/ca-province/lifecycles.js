const { ApplicationError } = require("@strapi/utils").errors;

module.exports = {
  async beforeCreate(event) {
    if (!event.params.data.resource || !event.params.data.country) {
      const resource = await strapi.db.query("api::resource.resource").findOne({
        where: {
          resourceSlug: "canadian-resources",
        },
      });
      event.params.data.resource = resource;
      const country = await strapi.db.query("api::country.country").findOne({
        where: {
          name: "Canada",
        },
      });
      event.params.data.country = country;
    }
  },
  async beforeUpdate(event) {
    if (!event.params.data.resource || !event.params.data.country) {
      const resource = await strapi.db.query("api::resource.resource").findOne({
        where: {
          resourceSlug: "canadian-resources",
        },
      });
      event.params.data.resource = resource;
      const country = await strapi.db.query("api::country.country").findOne({
        where: {
          name: "Canada",
        },
      });
      event.params.data.country = country;
    }
  },
};
