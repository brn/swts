/**
 * @fileoverview
 * @author Taketoshi Aono
 */


import * as ts from "typescript";
import {
  compile
}              from './ts';
import {
  readFile
} from './file';


// The path of tsconfig.json
const TSCONFIG = `${location.protocol}//${location.host}/tsconfig.json`;
const global: SWWindow = self as any;
let tsconfig = null;
let src = 'src';

interface SWWindow extends Window {
  skipWaiting(): Promise<any>;
  clients: Clients;
}

interface SWEvent extends Event {
  waitUntil(p: Promise<any>): void;
  respondWith(p: Promise<Response>);
  readonly request: Request;
}


interface Clients {
  claim(): Promise<any>;
  postMessage(message: any, context?: string): void;
  matchAll(options: any): Promise<Clients[]>
}


global.addEventListener('fetch', (event: SWEvent) => {
  if (event.request.url.indexOf(src) === 0) {
    event.respondWith(findCache(event));
  }
});

global.addEventListener('install', (event: SWEvent) => {
  event.waitUntil(global.skipWaiting());
});


global.addEventListener('activate', (event: SWEvent) => {
  event.waitUntil(global.clients.claim());
});


global.addEventListener('message', async event => {
  if (event.data && event.data.type === 'LOAD_TSCONFIG') {
    const [ok, content] = await readFile(TSCONFIG);
    if (ok) {
      tsconfig = JSON.parse(content);
      if (!tsconfig.compilerOptions) {
        tsconfig = DEFAULT_OPTIONS;
      } else {
        tsconfig.compilerOptions.module = 'ES6';
        tsconfig.compilerOptions.inlineSourceMap = true;
      }
    } else {
      tsconfig = DEFAULT_OPTIONS;
    }
    event.ports[0].postMessage({type: 'TSCONFIG_LOADED'});
  }

  if (event.data && 'src' in event.data) {
    src = event.data.src;
  }
});


const CACHE_NAME = 'test';
const DEFAULT_OPTIONS = {compilerOptions: {module: 'ES6', inlineSourceMap: true}};

async function findCache(event: SWEvent) {
  const url = /\.tsx?$/.test(event.request.url)? event.request.url: `${event.request.url}.ts`;
  const result = await compile(event.request, url, tsconfig.compilerOptions as any);
  let responseToCache = new Response(new Blob([result], {type: 'application/javascript'}), {status: 200});

  const cache = await caches.open(CACHE_NAME)
  cache.put(event.request, responseToCache.clone());
  return responseToCache;
}
