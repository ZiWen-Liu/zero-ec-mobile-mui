// FIXME TS
// @ts-nocheck

const isFunction = (obj) => {
  return Object.prototype.toString.call(obj) === "[object Function]";
};

const isEqual = (a, b, aStack?, bStack?) => {
  // === 结果为 true 的区别出 +0 和 -0
  if (a === b) return a !== 0 || 1 / a === 1 / b;

  // 判断 NaN
  if (a !== a) return b !== b;

  // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
  const type = typeof a;
  if (type !== "function" && type !== "object" && typeof b != "object")
    return false;

  // 更复杂的对象使用 deepEq 函数进行深度比较
  return deepEq(a, b, aStack, bStack);
};

const deepEq = (a, b, aStack, bStack) => {
  // a 和 b 的内部属性 [[class]] 相同时 返回 true
  const className = Object.prototype.toString.call(a);
  if (className !== Object.prototype.toString.call(b)) return false;

  switch (className) {
    case "[object RegExp]":
    case "[object String]":
      return "" + a === "" + b;
    case "[object Number]":
      if (+a !== +a) return +b !== +b;
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case "[object Date]":
    case "[object Boolean]":
      return +a === +b;
  }

  const areArrays = className === "[object Array]";
  // 不是数组
  if (!areArrays) {
    // 过滤掉两个函数的情况
    if (typeof a != "object" || typeof b != "object") return false;

    const aCtor = a.constructor;
    const bCtor = b.constructor;
    // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
    if (
      aCtor !== bCtor &&
      !(
        isFunction(aCtor) &&
        aCtor instanceof aCtor &&
        isFunction(bCtor) &&
        bCtor instanceof bCtor
      ) &&
      "constructor" in a &&
      "constructor" in b
    ) {
      return false;
    }
  }

  aStack = aStack || [];
  bStack = bStack || [];
  let length = aStack.length;

  // 检查是否有循环引用的部分
  while (length--) {
    if (aStack[length] === a) {
      return bStack[length] === b;
    }
  }

  aStack.push(a);
  bStack.push(b);

  // 数组判断
  if (areArrays) {
    length = a.length;
    if (length !== b.length) return false;

    while (length--) {
      if (!isEqual(a[length], b[length], aStack, bStack)) return false;
    }
  }
  // 对象判断
  else {
    const keys = Object.keys(a);
    let key;
    length = keys.length;

    if (Object.keys(b).length !== length) return false;
    while (length--) {
      key = keys[length];
      if (!(b.hasOwnProperty(key) && isEqual(a[key], b[key], aStack, bStack)))
        return false;
    }
  }

  aStack.pop();
  bStack.pop();
  return true;
};

export default isEqual;

/**
 * 以下为 test 结果
 */

/* .................... start

console.log(isEqual(0, 0)); // true
console.log(isEqual(0, -0)); // false

console.log(isEqual(NaN, NaN)); // true
console.log(isEqual(Number(NaN), Number(NaN))); // true

console.log(isEqual('Curly', new String('Curly'))); // true

console.log(isEqual([1], [1])); // true
console.log(isEqual({ value: 1 }, { value: 1 })); // true

var a, b;

a = { foo: { b: { foo: { c: { foo: null } } } } };
b = { foo: { b: { foo: { c: { foo: null } } } } };
a.foo.b.foo.c.foo = a;
b.foo.b.foo.c.foo = b;

console.log(isEqual(a, b)); // true

console.log(isEqual(0, 0)); // true
console.log(isEqual(0, -0)); // false

console.log(isEqual(NaN, NaN)); // true
console.log(isEqual(Number(NaN), Number(NaN))); // true

console.log(isEqual('Curly', new String('Curly'))); // true

console.log(isEqual([1], [1])); // true
console.log(isEqual({ value: 1 }, { value: 1 })); // true

var a, b;

a = { foo: { b: { foo: { c: { foo: null } } } } };
b = { foo: { b: { foo: { c: { foo: null } } } } };
a.foo.b.foo.c.foo = a;
b.foo.b.foo.c.foo = b;

console.log(isEqual(a, b)); // true

const data1 = [
  {
    detail: 'https://www.sayweee.com/zh/restaurants/2003?ws=restaurants_page_banner',
    img_url: 'https://weee-img.s3.us-west-2.amazonaws.com/2021-10/TkIpskdIRgClH4pmTqEYxw.jpg?sayweee=1',
    storefront: [],
    sub_type: '',
    type: 'restaurants'
  },
  {
    detail: 'https://www.sayweee.com/zh/restaurants/657?ws=restaurants_page_banner',
    img_url: 'https://weee-img.s3.us-west-2.amazonaws.com/2021-08/1pc5yUdBTX-i1ktB5VqNVA.jpg?sayweee=1',
    storefront: [],
    sub_type: '',
    type: 'restaurants'
  }
];

const data2 = [
  {
    detail: 'https://www.sayweee.com/zh/restaurants/2003?ws=restaurants_page_banner',
    img_url: 'https://weee-img.s3.us-west-2.amazonaws.com/2021-10/TkIpskdIRgClH4pmTqEYxw.jpg?sayweee=1',
    storefront: [],
    sub_type: '',
    type: 'restaurants'
  },
  {
    detail: 'https://www.sayweee.com/zh/restaurants/657?ws=restaurants_page_banner',
    img_url: 'https://weee-img.s3.us-west-2.amazonaws.com/2021-08/1pc5yUdBTX-i1ktB5VqNVA.jpg?sayweee=1',
    storefront: [],
    sub_type: '',
    type: 'restaurants'
  }
];

const data3 = [
  {
    detail: 'https://www.sayweee.com/zh/restaurants/657?ws=restaurants_page_banner',
    img_url: 'https://weee-img.s3.us-west-2.amazonaws.com/2021-08/1pc5yUdBTX-i1ktB5VqNVA.jpg?sayweee=1',
    storefront: [],
    sub_type: '',
    type: 'restaurants'
  },
  {
    detail: 'https://www.sayweee.com/zh/restaurants/2003?ws=restaurants_page_banner',
    img_url: 'https://weee-img.s3.us-west-2.amazonaws.com/2021-10/TkIpskdIRgClH4pmTqEYxw.jpg?sayweee=1',
    storefront: [],
    sub_type: '',
    type: 'restaurants'
  }
];

console.log(isEqual(data1, data2)); // true
console.log(isEqual(data1, data3)); // false ==> 如果两个数组的中的值相等，但是对应位置不一样，返回false

.................... end */
