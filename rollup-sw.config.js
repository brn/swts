/**
 * @fileoverview
 * @author Taketoshi Aono
 */


// rollup.config.js
import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: './src/sw.ts',
  plugins: [
    typescript({typescript: require('typescript')}),
    resolve({
      module: true, // Default: true
      jsnext: true,  // Default: false
      main: true,  // Default: true
      browser: true,  // Default: false
      extensions: [ '.js', '.json', '.ts' ],
      preferBuiltins: false,  // Default: true
      jail: '/', // Default: '/'
      modulesOnly: false, // Default: false
      customResolveOptions: {}
    }),
    commonjs({
      namedExports: {
        'node_modules/typescript/lib/typescript.js': ['transpileModule']
      }
    }),
    builtins(),
    uglify()
  ],

  external: []
};
