import { Dimensions, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const { width } = Dimensions.get('window');

EStyleSheet.build({
  rem: width < 375 ? 14 : (width < 414 ? 15 : (width < 768 ? 15.5 : 22)),

  // fonts
  $titleFont: 'Fibre Vintage',
  $systemFont: Platform.select({ios: 'System', android: 'NotoSans-Regular'}),
  $comicHeaderFont: 'CantedComicBold',
  $iconFont: 'FontAwesome',
  $monoFont: Platform.select({ios: 'Courier', android: 'NotoMono-Regular'}),

  // colors (https://ivomynttinen.com/content/3-blog/20150928-ios-design-guidelines/ios-color-theme.jpg)
  $appleOrange: '#FF9600',
  $appleRed: '#FF3824',

  // debug
  outline: 0
});
