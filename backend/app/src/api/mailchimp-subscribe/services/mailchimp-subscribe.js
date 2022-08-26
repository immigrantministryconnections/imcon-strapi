"use strict";
const Mailchimp = require("mailchimp-api-v3");

/**
 * mailchimp-subscribe service.
 */

module.exports = () => ({
  mailchimp: new Mailchimp(process.env.MAILCHIMP_API_KEY),
});
