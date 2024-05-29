// 库 node:test 默认情况下期望测试文件的文件名包含 test。
// 在本课程中，我们将遵循使用扩展名 test.js 命名测试文件约定的约定。
const { test } = require('node:test')
const assert = require('node:assert')

const reverse = require('../utils/for_testing').reverse

// 使用 test 函数定义各个测试用例。
// 该函数的第一个参数是作为字符串的测试描述。第二个参数是 function，用于定义测试用例的功能。
test('reverse of a', () => {
    const result = reverse('a')

    assert.strictEqual(result, 'a')
})

test('reverse of react', () => {
    const result = reverse('react')

    assert.strictEqual(result, 'tcaer')
})
// test('reverse of react', () => {
//     const result = reverse('react')

//     assert.strictEqual(result, 'tkaer')
// })

test('reverse of saippuakauppias', () => {
    const result = reverse('saippuakauppias')

    assert.strictEqual(result, 'saippuakauppias')
})