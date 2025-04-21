const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Add support for `.glb` files
config.resolver.assetExts.push('glb');

// Wrap with NativeWind and export
module.exports = withNativeWind(config, { input: './global.css' });
