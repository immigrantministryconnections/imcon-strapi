# imcon-strapi monorepo

## Frontend (NextJS hosted on Netlify)

**Contact John for all of the environment variables that are needed. The template in the repo contains all needed variables**

### NextJS

The frontend is a NextJS web app.

The app is primarily made up of nested dynamic pages:

**[resourceSlug]/[slug1]/[slug2]**

There are queries to the Strapi backend in the `getStaticProps` functions that are ultimately parsed to build all necessary pages.

**[resourceSlug]** is the top level of "state" (local / canadian recources), or "categories" (national resources).

**[slug1]** is the next level - which would be cites or sub-categories associated with the `resourceSlug` from the parent route.

**[slug2]** is the deepest path before we show organizations. The data at this level is associated with both of the parent
paths.

**organization** is a page that renders an org from the database based on its slug.

**blog** is the blog page and pulls posts from the database - based on the blog post slug.

### Authentication

**nextAuth** is the library used to authenticate a user against users in the Strapi backend.

When the user logs in with the form - a request is sent to Strapi and a JWT token is sent back.

NextAuth sets a session cookie and we use the JWT in that cookie to authentcate with the Strapi backend.

### Mailchimp and Hubspot

After the user creates an account, two extra requests are sent to mailchimp and hubspot.

These requests are not wrapped in try / catch blocks to avoid breaking the signup flow entirely should one
of those services go down.

Requests are sent to a custom Strapi endpoint / controller and forwarded to hubspot and mailchimp from there.

**The frontend _does not_ call the mailchimp or hubspot APIs directly**

## Backend (Strapi deployed to Azure)

## CI/CD

There are github actions set up. They include:

- Deploy to azure when you tag a new release
- Deploy to Netlify when a PR is merged into main _or_ something is pushed to main
- A Netlify `staging` preview app is deployed when a pull request is open against `main`
- There is a Strapi webook that calls the github API to deploy to netlify whenever new content is saved in Strapi
