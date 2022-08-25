import { fetchAPI } from 'utils/api';

export default async (req, res) => {
  const { q } = req.query;

  if (q) {
    const results = await fetchAPI('/orgs', {
      populate: '*',
      pagination: {
        page: 1,
        pageSize: 2000,
      },
      filters: {
        $or: [
          {
            name: {
              $containsi: q,
            },
          },
          {
            us_state: {
              name: {
                $containsi: q,
              },
            },
          },
          {
            ca_province: {
              name: {
                $containsi: q,
              },
            },
          },
          {
            city_region: {
              name: {
                $containsi: q,
              },
            },
          },
          {
            resource_category: {
              title: {
                $containsi: q,
              },
            },
          },
          {
            subcategory: {
              title: {
                $containsi: q,
              },
            },
          },
        ],
      },
    });
    return res.status(200).json({ results: results.data });
  }
  res.status(200).json({ results: [] });
};
