// 使用哪种导入语句取决于导入包中使用的导出方法。
// 一个好的经验法则是先尝试用import语句导入一个模块。我们总是在前端中使用这种方法。
// 如果 import 不起作用，请尝试使用组合方法。import ... = require(''...')。
// const express = require('express');
import express from 'express';
import { calculator } from './calculator';
const app = express();

// tsconfig.json中禁止了未使用的参数"noUnusedParameters": true,
app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.post('/calculate', (req, res) => {
  // 如果把鼠标悬停在从请求中解析出来的值上，就会出现一个问题。所有的变量都有any类型。这并不令人惊讶，因为还没有人给他们一个类型。
  // 考虑为什么会接受这个问题，以及类型any是怎么来的。
  // 在TypeScript中，每一个没有类型的变量，其类型不能被隐式推断出来，就变成了类型any。Any是一种 "通配符 "类型，字面意思是代表whatever类型。
  // 当人们忘记对函数进行类型化时，事情就会经常变成隐含的任何类型。
  // 我们也可以显式地给事物输入any。隐式和显式任意类型之间的唯一区别是代码的外观；编译器并不关心这种区别。
  // 然而，当any被显式执行时，程序员看到的代码与隐式推断时不同。
  // 隐式的any类型通常被认为是有问题的，因为它经常是由于程序员忘记了分配类型（或者懒得分配），而且它也意味着TypeScript的全部功能没有被正确利用。
  // 这就是为什么配置规则noImplicitAny存在于编译器级别，并且强烈建议在任何时候都保持它。
  // 在少数情况下，当你真的不知道一个变量的类型是什么时，你应该在代码中明确说明。
  // 配置了noImplicitAny，那么为什么编译器没有产生警告隐含的any类型？
  // 原因是express Request对象的query字段是明确的类型any。我们用来向应用发布数据的request.body字段也是如此。
  // 除了tsconfig.json，我们还有其他方法来强制执行编码风格。我们可以做的是使用eslint来管理
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if (!value1 || isNaN(Number(value1))) {
    return res.send({ error: '...' }).status(400);
  }
  // more validations here...

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(value1, value2, op);
  res.send(result);
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});