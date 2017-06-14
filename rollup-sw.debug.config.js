/**
 * @fileoverview
 * @author Taketoshi Aono
 */


import config from './rollup-sw.config.js';
import sourcemaps from 'rollup-plugin-sourcemaps';

config.sourceMap = true;
config.plugins.pop(); //uglify;
config.plugins.push(sourcemaps());

export default config;
