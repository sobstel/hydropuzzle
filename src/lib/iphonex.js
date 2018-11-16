import { ifIphoneX } from 'react-native-iphone-x-helper';

export default function iphonex (iphonexValue = true, regularValue = false) {
  return ifIphoneX(iphonexValue, regularValue);
}
