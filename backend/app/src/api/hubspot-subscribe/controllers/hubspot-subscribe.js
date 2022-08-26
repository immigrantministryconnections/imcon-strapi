"use strict";
const hubspot = require("@hubspot/api-client");

let hubspotClient = new hubspot.Client({
  accessToken: process.env.HUBSPOT_API_KEY,
});

/**
 * A set of functions called "actions" for `mailchimp-subscribe`
 */

module.exports = {
  subscribe: async (ctx, next) => {
    const { email, firstName, lastName } = ctx.request.body;
    if (!email || !firstName || !lastName) {
      ctx.status = 400;
      ctx.body = "Missing a required param";
      return;
    }
    const properties = {
      email,
      firstname: firstName,
      lastname: lastName,
    };
    const ObjectInput = { properties };
    try {
      const response = await hubspotClient.crm.contacts.basicApi.create(
        ObjectInput
      );
      const { ...res } = response;
      ctx.status = 200;
      ctx.body = JSON.stringify(res);
    } catch (err) {
      console.log(err);
      ctx.status = err.status;
      ctx.body = err.detail;
    }
  },
  update: async (ctx, next) => {
    const { id, ministryfocus, ethnicfocus, salariedministry, state } =
      ctx.request.body;
    const contactId = id;
    if (!ministryfocus && !ethnicfocus && !salariedministry && !state) {
      ctx.status = 200;
      ctx.body = "Nothing to see here";
      return;
    }
    const properties = {
      state,
      ministryfocus,
      ethnicfocus,
      salariedministry,
    };
    const ObjectInput = { properties };
    try {
      const response = await hubspotClient.crm.contacts.basicApi.update(
        contactId,
        ObjectInput
      );
      const { ...res } = response;
      ctx.status = 200;
      ctx.body = JSON.stringify(res);
    } catch (err) {
      console.log(err);
      ctx.status = err.status;
      ctx.body = err.detail;
    }
  },
};
