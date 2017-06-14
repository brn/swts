/**
 * @fileoverview
 * @author Taketoshi Aono
 */


import {
  normalizePath
} from './pathutil';


interface SWTSOptions {
  serviceWorkerPath: string;
  src: string;
  entry: string;
  scope: string;
}


class SWTS {
  public register(options: SWTSOptions) {
    const PATH_PREFIX = `${location.protocol}//${location.host}`;
    const CONTROLLER_CHANGE_PROMISE = new Promise(resolve => {
      navigator.serviceWorker.addEventListener('controllerchange', resolve);
    });
    navigator.serviceWorker.register('sw.js', {scope: options.scope || '/'}).then(r => {
      if (r.active && r.active.state === 'activated') {
        return;
      }
      return CONTROLLER_CHANGE_PROMISE;
    }).then(() => {
      var messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = function(event) {
        if (event.data && event.data.type === 'TSCONFIG_LOADED') {
          const sc = document.body.appendChild(document.createElement('script'));
          sc.type = 'module';
          sc.src = normalizePath(`${PATH_PREFIX}/${options.src}/${options.entry}`);
        }
      };
      const normalizedSrc = normalizePath(`${PATH_PREFIX}/${options.src}`);
      navigator.serviceWorker.controller.postMessage({type: 'LOAD_TSCONFIG', src: normalizedSrc}, [messageChannel.port2]);
    })
  }
}


export default new SWTS;
