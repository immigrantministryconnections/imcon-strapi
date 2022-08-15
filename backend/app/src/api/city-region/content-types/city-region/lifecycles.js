const { ApplicationError } = require("@strapi/utils").errors;

module.exports = {
  beforeCreate(event) {
    if (!event.params.data.resource) {
      throw new ApplicationError("Resource type is required");
    }

    if (event.params.data.us_state && event.params.data.ca_province) {
      throw new ApplicationError(
        "Please select either a US state OR a CA province"
      );
    }
  },
};
