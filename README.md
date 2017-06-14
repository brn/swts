# What's this?

swts

Typescript Dev Compiler for ServiceWorker and ES6 Modules Era.

## Examples

*Now only works with Google Chrome Canary.*

[https://brn.github.io/swts/](https://brn.github.io/swts/)

## Install

```
npm i swts --save
cp node_modules/swts/sw.js ./
```

## Usage

### In html

```html
<script src="path to swts/index.js"></script>
<script>
  swts.register({serviceWorkerPath: '/sw.js', src: './src', entry: 'index.ts', scope: '/'});
</script>
```

### In ES6 module

```javascript
import swts from 'swts';

swts.register({serviceWorkerPath: '/sw.js', src: './src', entry: 'index.ts', scope: '/'});
```

### For typescript

Use swts.d.ts

### Options

**serviceWorkerPath: string** *required*

Path to swts/sw.js.

**src** *required*

Path to the root directory of typescript source files.

**entry** *required*

Entry module file name.

**scope** *optional* __default__ '/'

ServiceWorker scope.


## Contribution

```shell
sudo vi /etc/hosts
# add entry - 127.0.0.1 localhost.daplie.me
git clone git@github.com:brn/swts
npm install
npm run build-all-debug
npm start
```

And Open `localhost.daplie.me:8686` with Google Chrome Canary M60+.
