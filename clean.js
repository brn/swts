/**
 * @fileoverview
 * @author Taketoshi Aono
 */


const fs = require('fs-extra');
const srm = (path) => {try {fs.removeSync(path);} catch(e) {}};

srm('index.js');
srm('index.js.map');
srm('sw.js');
srm('sw.js.map');
