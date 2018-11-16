//
// Converts script to txt
//

import { script } from '../src/app/script';

console.log(Object.keys(script));

Object.keys(script).forEach((key) => {
  console.log(script[key]);
});
