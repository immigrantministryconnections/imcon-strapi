const Mailchimp = require("mailchimp-api-v3");
require("dotenv").config();

let mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);

const run = async () => {
  const lists = await mailchimp.get("/lists/");

  console.log(lists);
};

run();
