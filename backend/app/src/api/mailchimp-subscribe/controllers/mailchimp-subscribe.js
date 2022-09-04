"use strict";

/**
 * A set of functions called "actions" for `mailchimp-subscribe`
 */

module.exports = {
  subscribe: async (ctx, next) => {
    const { email, firstName, lastName, subscribe } = ctx.request.body;

    if (!email || !firstName || !lastName) {
      ctx.status = 400;
      ctx.body = "Email and full name are required";
      return;
    }
    try {
      const response = await strapi
        .service("api::mailchimp-subscribe.mailchimp-subscribe")
        .mailchimp.request({
          method: "post",
          path: `/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
          body: {
            email_address: email,
            status: !!subscribe === true ? "subscribed" : "unsubscribed",
            tags: ["IMCON"],
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName,
            },
          },
        });
      const { _links, ...res } = response;
      ctx.status = res.statusCode;
      ctx.body = JSON.stringify(res);
    } catch (err) {
      console.log(err);
      ctx.status = err.status;
      ctx.body = err.detail;
    }
  },
};
