/**
 * @fileoverview
 * @author Taketoshi Aono
 */


declare module 'swts' {
  interface SWTSOptions {
    serviceWorkerPath: string;
    src: string;
    entry: string;
    scope?: string;
    tsconfig?: string;
  }

  interface SWTS {
    register(opt: SWTSOptions): void
  }
  
  export var swts: SWTS;
}
