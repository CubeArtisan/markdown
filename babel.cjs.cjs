const sharedConfig = require('./babel.shared.cjs');

module.exports = (api) => sharedConfig(api,
      [
        '@babel/preset-env',
        {
          modules: 'cjs',
        },
      ],
);
