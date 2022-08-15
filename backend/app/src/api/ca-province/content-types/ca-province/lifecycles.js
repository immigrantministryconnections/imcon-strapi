const { ApplicationError } = require("@strapi/utils").errors;

module.exports = {
  beforeCreate(event) {
    if (!event.params.data.resource) {
      throw new ApplicationError("Resource type is required");
    }

    if (!event.params.data.country) {
      throw new ApplicationError("Country is required");
    }
  },
};
