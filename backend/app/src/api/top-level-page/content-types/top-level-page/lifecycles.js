const { ApplicationError } = require("@strapi/utils").errors;

module.exports = {
  async afterCreate(event) {
    const { id } = event.result;
    if (event.result.slug === null) {
      strapi.db.query("api::top-level-page.top-level-page").update({
        where: { id },
        data: {
          slug: "",
        },
      });
    }
  },
  async beforeUpdate(event) {
    const { id } = event.params.where;
    if (event.params.data.slug === null) {
      strapi.db.query("api::top-level-page.top-level-page").update({
        where: { id },
        data: {
          slug: "",
        },
      });
    }
  },
};
