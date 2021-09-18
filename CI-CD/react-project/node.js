const assert = require('assert');

function sum(a, b) {
  return a + b;
}


assert.strictEqual(sum(1, 2), 3, "内容不相等");
assert.strictEqual(sum(NaN, NaN), NaN, "NaN内容不相等");
assert.strictEqual(sum('1', '2'), '12', "'1', '2' 内容不相等");
