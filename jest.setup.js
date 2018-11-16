import '@initializers';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('LayoutAnimation');

// jest.mock('Linking', () => {
//   return {
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     openURL: jest.fn(),
//     canOpenURL: jest.fn(),
//     getInitialURL: jest.fn()
//   };
// });

// jest.mock('NativeEventEmitter', () => class NativeEventEmitterMock {
//   addListener = () => jest.fn()
//   removeListener = () => jest.fn()
//   removeAllListeners = () => jest.fn()
// });

// jest.mock('NativeModules', () => {
//   return {
//     KCKeepAwake: {
//       activate: jest.fn(),
//       deactivate: jest.fn()
//     },
//     BlobModule: {
//       BLOB_URI_SCHEME: 'content',
//       BLOB_URI_HOST: null,
//       enableBlobSupport: jest.fn(),
//       disableBlobSupport: jest.fn(),
//       createFromParts: jest.fn(),
//       sendBlob: jest.fn(),
//       release: jest.fn()
//     }
//   };
// });
