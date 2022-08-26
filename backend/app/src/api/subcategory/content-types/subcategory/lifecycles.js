const { ApplicationError } = require("@strapi/utils").errors;

module.exports = {
  async beforeCreate(event) {
    if (!event.params.data.resource_category) {
      throw new ApplicationError(
        "Please choose a resource category for this subcategory"
      );
    }
    const resource = await strapi.db.query("api::resource.resource").findOne({
      where: { resourceSlug: "national-resources" },
    });
    event.params.data.resource = resource;
  },

  async beforeUpdate(event) {
    const resource = await strapi.db.query("api::resource.resource").findOne({
      where: { resourceSlug: "national-resources" },
    });
    event.params.data.resource = resource;
  },
};
