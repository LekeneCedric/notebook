
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    // plugins: [
    //   [
    //     'module-resolver',
    //     {
    //       extensions: ['.tsx', '.ts', '.js', '.json'],
    //       alias: {
    //         [pak.name]: path.join(__dirname, '..', pak.source),
    //       },
    //     },
    //   ],
    //   'react-native-reanimated/plugin',
    // ],
  };
};
