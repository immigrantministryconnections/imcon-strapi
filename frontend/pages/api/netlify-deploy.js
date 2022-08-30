export default async function exit(req, res) {
  await fetch(
    'https://api.github.com/repos/immigrantministryconnections/imcon-strapi/dispatches',
    {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github.everest-preview+json',
        Authorization: `Bearer ${req.query.secret}`,
      },
      body: JSON.stringify({ event_type: 'webhook' }),
    }
  );

  // Redirect the user back to a provided redirect path or the index page
  res.end();
}
