const { clone, mapKeys } = require('lodash')

const test = require('tape')

const { format, parse } = require('.')

const json = {
  _null: null,
  _false: false,
  _true: true,
  _zero: 0,
  _one: 1,
  _negative: -1,
  _float: 3.14,
  _big: 1e123,
  _string: "...'...'...",
  _array0: [],
  _array1: [1],
  _array2: [1, 2],
  _object0: {},
  _object1: {
    _nested: {
      _value: 1,
    },
  },
  _object2: {
    'a b': 1,
    "...'...'...": 2,
  },
}

const lua = `return {
  _null = nil,
  _false = false,
  _true = true,
  _zero = 0,
  _one = 1,
  _negative = -1,
  _float = 3.14,
  _big = 1e+123,
  _string = '...\\'...\\'...',
  _array0 = {},
  _array1 = {
    1,
  },
  _array2 = {
    1,
    2,
  },
  _object0 = {},
  _object1 = {
    _nested = {
      _value = 1,
    },
  },
  _object2 = {
    ['a b'] = 1,
    ['...\\'...\\'...'] = 2,
  },
}`

const luaMinified = `return{_null=nil,_false=false,_true=true,_zero=0,_one=1,_negative=-1,_float=3.14,_big=1e+123,_string='...\\'...\\'...',_array0={},_array1={1,},_array2={1,2,},_object0={},_object1={_nested={_value=1,},},_object2={['a b']=1,['...\\'...\\'...']=2,},}`

test('basic', t => {
  t.equal(format(json), lua)
  t.deepEqual(parse(lua), json)
  t.end()
})

test('minified', t => {
  t.equal(format(json, { spaces: null }), luaMinified)
  t.deepEqual(parse(luaMinified), json)
  t.end()
})

test('double quote', t => {
  const jsonDoubleQuote = clone(json)
  jsonDoubleQuote._string = jsonDoubleQuote._string.replace(/'/g, '"')
  jsonDoubleQuote._object2 = mapKeys(jsonDoubleQuote._object2, (_, key) => key.replace(/'/g, '"'))
  const luaDoubleQuote = lua.replace(/'/g, '"')
  t.equal(format(jsonDoubleQuote, { singleQuote: false }), luaDoubleQuote)
  t.deepEqual(parse(luaDoubleQuote), jsonDoubleQuote)
  t.end()
})
