/**
 * @fileoverview
 * @author Taketoshi Aono
 */


import * as ts from 'typescript';
import {
  readFile
}              from './file';


export async function compile(request: Request, url: string, options: ts.CompilerOptions): Promise<string> {
  const [ok, content, headers, status] = await readFile(url);
  if (!ok) {
    return `"throw new Error('${url} not found')"`;
  }

  const cached = await caches.match(request);
  if (status === 304 && cached) {
    return cached;
  }

  const transpiled = ts.transpileModule(content, {compilerOptions: options, moduleName: url});
  return transpiled.outputText;
}
