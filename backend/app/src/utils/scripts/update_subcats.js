const fetch = require("node-fetch");

const updateSubs = async () => {
  const subcats = await fetch(
    "https://imcon.azurewebsites.net/api/subcategories",
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  const subdata = await subcats.json();

  subdata.data.forEach(async (sub) => {
    const result = await fetch(
      `https://imcon.azurewebsites.net/api/subcategories/${sub.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          data: {
            resource: 3,
          },
        }),
      }
    );
    const resJson = await result.json();

    console.log({ resJson });
  });
};

updateSubs();
