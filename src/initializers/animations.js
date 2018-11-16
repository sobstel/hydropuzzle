// custom animations
import * as Animatable from 'react-native-animatable';

Animatable.initializeRegistryWithDefinitions({
  hLazyFlash: {
    0: {
      opacity: 1
    },
    0.125: {
      opacity: 0
    },
    0.25: {
      opacity: 1
    },
    0.375: {
      opacity: 0
    },
    0.5: {
      opacity: 1
    },
    1: {
      opacity: 1
    }
  }
});
