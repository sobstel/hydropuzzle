import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import '@initializers';
import App from './src/app';

AppRegistry.registerComponent(appName, () => App);
