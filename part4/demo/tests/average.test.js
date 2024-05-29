const { test, describe } = require('node:test')
const assert = require('node:assert')

const average = require('../utils/for_testing').average

// describe块可用于将测试分组到逻辑集合中。测试输出也使用描述块的名称
// 当我们想要为一组测试运行一些共享的设置或拆卸操作时，describe 块是必需的。
describe('average'), () => {
    test('of one value is the value itself', () => {
        assert.strictEqual(average([1]), 1)
    })

    test('of many is calculated right', () => {
        assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5)
    })

    test('of empty is zero', () => {
        assert.strictEqual(average([]), 0)
    })
}