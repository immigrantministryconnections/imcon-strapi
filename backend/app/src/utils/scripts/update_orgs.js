const fetch = require("node-fetch");

const updateSubs = async () => {
  const subcats = await fetch(
    "https://imcon.azurewebsites.net/api/orgs?pagination[page]=1&pagination[pageSize]=2000",
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  const subdata = await subcats.json();

  subdata.data.forEach(async (sub) => {
    const result = await fetch(
      `https://imcon.azurewebsites.net/api/orgs/${sub.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          data: {
            organizationType: "Government and Private Organizations",
          },
        }),
      }
    );
    const resJson = await result.json();

    console.log({ resJson });
  });
};

updateSubs();
