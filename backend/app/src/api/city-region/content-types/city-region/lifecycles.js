const { ApplicationError } = require("@strapi/utils").errors;

module.exports = {
  async beforeCreate(event) {
    if (!event.params.data.us_state && !event.params.data.ca_province) {
      throw new ApplicationError(
        "Please select either a US state OR a CA province"
      );
    }
    if (!event.params.data.resource) {
      const resource = await strapi.db.query("api::resource.resource").findOne({
        where: { resourceSlug: "local-resources" },
      });
      event.params.data.resource = resource;
    }
  },

  async beforeUpdate(event) {
    if (!event.params.data.resource) {
      const resource = await strapi.db.query("api::resource.resource").findOne({
        where: { resourceSlug: "local-resources" },
      });
      event.params.data.resource = resource;
    }

    if (!event.params.data.us_state && !event.params.data.ca_province) {
      throw new ApplicationError(
        "Please select either a US state OR a CA province"
      );
    }
  },
};
