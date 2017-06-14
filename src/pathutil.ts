/**
 * @fileoverview
 * @author Taketoshi Aono
 */


export function dirname(path: string) {
  return path.slice(0, path.lastIndexOf('/'));
}


export function normalizePath(path: string) {
  const isSSL = path.indexOf('https') === 0;
  return `${isSSL? 'https': 'http'}://${path.replace(/https?\:\/\//, '').replace(/\/\/+|\/\.+\//g, '/')}`;
}
