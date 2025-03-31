module.exports = {
  project: {
    ios: {},
    android: {},
  },
  "react-native-vector-icons": {
    platform: {
      ios: null,
    },
  },
  asserts: ["./assets/fonts/"],
  getTransformModulePath() {
    return require.resolve("react-native-typescript-transformer");
  },

  getScourceExts() {
    return ["ts", "tsx"];
  },
};
