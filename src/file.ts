/**
 * @fileoverview
 * @author Taketoshi Aono
 */


export async function readFile<T = string>(file: string): Promise<[boolean, T, {[key: string]: string}, number]> {
  try {
    const response = await fetch(file, {
      method: 'GET',
      headers: {'content-type': 'application/typescript'},
      mode: 'no-cors'
    } as any);
    const result = await response.text();
    const headers = {};
    response.headers.forEach((v, k) => headers[k] = v);
    return [response.ok, result as any, headers, response.status];
  } catch(e) {
    return [false, '' as any, {}, 500];
  }
}
