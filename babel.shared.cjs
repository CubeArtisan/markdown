module.exports = (api, presetEnv) => {
  const isTest = api.env('test');
  const config = {
    presets: [
      presetEnv,
      '@babel/preset-react',
    ],
    plugins: [
      [
        'babel-plugin-styled-components',
        {
          pure: true,
        },
      ],
      [
        'babel-plugin-module-resolver',
        {
          alias: {
            '@cubeartisan/markdown': './src',
          },
        },
      ],
      !isTest && [
        'babel-plugin-direct-import',
        {
          modules: ['@mui/material', '@mui/icons-material'],
        },
      ],
    ].filter(Boolean),
  };
  return config;
};
