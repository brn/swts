/**
 * @fileoverview
 * @author Taketoshi Aono
 */


import {hello} from './hello';
import {world} from './world';


const output = document.body.appendChild(document.createElement('h1'));
output.textContent = `${hello()} ${world()}`;
