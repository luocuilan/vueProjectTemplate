/**
 * Created on 11/01/2018.
 */

'use strict';

import Toast from '../packages/toast';

const install = function(Vue, config = {}) {
  if (install.installed) {
    return;
  }

  Vue.$toast = Vue.prototype.$toast = Toast;
};

export {
  install,
  Toast
};
