module.exports = ({ options }) => ({
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': { stage: 0 },
    cssnano: options.cssnano,
  },
});
