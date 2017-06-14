/**
 * @fileoverview
 * @author Taketoshi Aono
 */


// rollup.config.js
import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: './src/index.ts',
  moduleName: 'swts',
  plugins: [
    typescript({typescript: require('typescript')}),
    uglify()
  ],
  external: []
};
