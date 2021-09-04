// import {safeGet} from './a';

// safeGet({}, 'a.b.c')

import('./a.js').then(({default: d}) => {
  console.log(d);
})
