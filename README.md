# What's this?

swts

Typescript Dev Compiler for ServiceWorker and ES6 Modules Era.

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
  swts.register({serviceWorkerPath: '/sw.js', src: './src', entry: 'index.ts'});
</script>
```

### In ES6 module

```javascript
import swts from 'swts';

swts.register({serviceWorkerPath: '/sw.js', src: './src', entry: 'index.ts'});
```

### For typescript

Use swts.d.ts

### Options

**serviceWorkerPath: string**

Path to swts/sw.js.

**src**

Path to the root directory of typescript source files.

**entry**

Entry module file name.


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
