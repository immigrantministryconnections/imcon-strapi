const { ApplicationError } = require("@strapi/utils").errors;

module.exports = {
  beforeCreate(event) {
    if (!event.params.data.resource) {
      throw new ApplicationError(
        "Please select a resource type for this Organization"
      );
    }

    if (event.params.data.city_region && event.params.data.us_state) {
      throw new ApplicationError(
        "Please select either a City / Region OR a State / Province"
      );
    }

    if (event.params.data.city_region && event.params.data.ca_province) {
      throw new ApplicationError(
        "Please select either a City / Region OR a State / Province"
      );
    }

    if (event.params.data.us_state && event.params.data.ca_province) {
      throw new ApplicationError(
        "Please select either a US state OR a CA province"
      );
    }

    if (
      event.params.data.resource_category &&
      event.params.data.resource_subcategory
    ) {
      throw new ApplicationError(
        "Please select either a resource cateogry or resource subcategory"
      );
    }
  },
};
