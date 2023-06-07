// in ./build.js
const rewire = require('rewire');

const defaults = rewire('react-scripts/scripts/build.js');
const config = defaults.__get__('config');

/**
 * Do not mangle component names in production, for a better learning experience
 * @link https://kentcdodds.com/blog/profile-a-react-app-for-performance#disable-function-name-mangling
 */

config.resolve.alias = { 'react-native': 'react-native-web', buffer: 'buffer', stream: 'stream-browserify' };
config.resolve.fallback = {
  stream: require.resolve('stream-browserify'),
  crypto: require.resolve('crypto-browserify'),
  buffer: require.resolve('buffer/'),
};
