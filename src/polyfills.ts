import 'core-js/es/reflect';
import 'zone.js/dist/zone';

// Add global to window, assigning the value of window itself.
(window as any).global = window;

// Add the following lines to polyfill Buffer
(window as any).global.Buffer = (window as any).global.Buffer || require('buffer').Buffer;


// // import { Buffer } from "buffer";

// // (window as any).global = window;
// // global.Buffer = Buffer;
// // global.process = {
// //   env: { DEBUG: undefined },
// //   version: "",
// //   nextTick: require("next-tick"),
// // } as any;