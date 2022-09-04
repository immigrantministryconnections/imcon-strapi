module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'root', // the monorepo itself
        /* Strapi Backend */
        'backend',
        /* NextJS Frontend */
        'frontend',
      ],
    ],
  },
  prompt: {
    settings: {
      enableMultipleScopes: true,
      scopeEnumSeparator: ',',
    },
  },
};
