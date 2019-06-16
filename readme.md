# `lua-json`

[![Version](https://img.shields.io/npm/v/lua-json.svg)](https://www.npmjs.com/package/lua-json)
[![Build](https://img.shields.io/travis/kcwiki/lua-json.svg)](https://travis-ci.org/kcwiki/lua-json)
[![Dependencies](https://img.shields.io/david/kcwiki/lua-json.svg)](https://david-dm.org/kcwiki/lua-json)
[![Dev Dependencies](https://img.shields.io/david/dev/kcwiki/lua-json.svg)](https://david-dm.org/kcwiki/lua-json?type=dev)

Convert Lua tables to and from JSON.

## Install

```sh
yarn add lua-json
```

## Usage

```js
const { format, parse } = require('lua-json')

format({ x: 1 }) // 'return { x = 1 }'
parse('return { x = 1 }') // { x: 1 }
```

## API

```ts
type Json = null | boolean | number | string | Json[] | { [_: string]: Json }

format(
  value: Json,
  options?: {
    eol: string = '\n',
    singleQuote: boolean = true,
    spaces: null | number | string = 2,
  }
): string

parse(value: string): Json
```

## TODO

- More formatting options à la [prettier](https://prettier.io/docs/en/options.html): `printWidth` (!), `trailingComma`, `bracketSpacing`.
