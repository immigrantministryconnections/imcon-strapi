const { ApplicationError } = require("@strapi/utils").errors;

module.exports = {
  beforeCreate(event) {
    if (event.params.data.us_state || event.params.data.ca_province) {
      throw new ApplicationError(
        "Please select either a US state OR a CA province"
      );
    }
  },

  async afterCreate(event) {
    const { result } = event;
    const resource = await strapi.db.query("api::resource.resource").findOne({
      where: { resourceSlug: "local-resources" },
    });
    if (!event.params.data.resource) {
      await strapi.db.query("api::city-region.city-region").update({
        where: { id: result.id },
        data: {
          resource: resource.id,
        },
      });
    }
  },

  async afterUpdate(event) {
    const { result } = event;
    const resource = await strapi.db.query("api::resource.resource").findOne({
      where: { resourceSlug: "local-resources" },
    });
    if (!event.params.data.resource) {
      await strapi.db.query("api::city-region.city-region").update({
        where: { id: result.id },
        data: {
          resource: resource.id,
        },
      });
    }
  },

  beforeUpdate(event) {
    if (event.params.data.us_state || event.params.data.ca_province) {
      throw new ApplicationError(
        "Please select either a US state OR a CA province"
      );
    }
  },
};
