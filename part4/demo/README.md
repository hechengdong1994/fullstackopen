我们现在将开始为后端编写测试。因为后端不包含任何复杂的逻辑，所以为它写单元测试没有意义。我们唯一可能进行单元测试的是用于格式化笔记的toJSON方法。

在某些情况下，通过模拟数据库而不是使用真正的数据库来实现一些后端测试是有益的。一个可以用于此的库是mongodb-memory-server。

由于我们的应用的后端仍然相对简单，我们将决定通过其REST API测试整个应用，这样数据库也包括在内。这种将系统的多个组件作为一个整体进行测试的测试，被称为集成测试。

# Test environment
在课程材料的前几章中，我们提到当后端服务器在 Fly.io 或 Render 中运行时，它处于production(生产)模式。

Node中的惯例是用NODE_ENV环境变量来定义应用的执行模式。在我们当前的应用中，如果应用不是在生产模式下，我们只加载.env文件中定义的环境变量。

通常的做法是为开发和测试定义不同的模式。

我们在脚本中指定应用模式的方式有一个小问题：它在Windows上将无法工作。我们可以通过安装cross-env包作为开发依赖的命令来纠正这个问题。
npm install --save-dev cross-env

# supertest
让我们使用supertest包来帮助我们编写测试API的测试。

# Running tests one by one
当使用选项 --test-only 运行测试时，即使用命令
npm test -- --test-only
只有标记为 only 的测试才会被执行。

only 的危险在于人们忘记从代码中删除它们。

另一种选择是将需要运行的测试指定为 npm test 命令的参数。

以下命令只运行 tests/note_api.test.js 文件中找到的测试：
npm test -- tests/note_api.test.js

--tests-by-name-pattern 选项可用于运行具有特定名称的测试：
npm test -- --test-name-pattern="the first note is about HTTP methods"

提供的参数可以引用测试的名称或 describe 块。该参数也可以只包含名称的一部分。以下命令将运行所有名称中包含 notes 的测试：
npm run test -- --test-name-pattern="notes"

# async/await
ES7中引入的async/await语法使得使用返回 promise 的异步函数的方式可以使代码看起来是同步的。

如果我们想依次进行几个异步函数的调用，情况很快就会变得很痛苦。异步调用将不得不在回调中进行。这将可能导致复杂的代码，并有可能诞生所谓的回调地狱。
通过链式 promise ，我们可以在一定程度上控制局面，并通过创建一个相当干净的then方法调用链来避免回调地狱。

ES7中引入的async和await关键字带来了与生成器相同的功能，但以一种可理解的、语法上更简洁的方式送到了JavaScript世界所有公民的手中。

使用async/await语法时，有几个重要的细节需要注意。
为了在异步操作中使用await操作符，它们必须返回一个 promise 。这并不是一个问题，因为使用回调的常规异步函数很容易被 promise 所包裹。
await关键字不能在JavaScript代码中随便使用。只有在async函数中才能使用await。

# Eliminating the try-catch
Async/await使代码更加简洁，但其代价是捕捉异常所需的try/catch结构。

所有的路由处理程序都遵循相同的结构

try {
  // do the async operations here
} catch(exception) {
  next(exception)
}
是否有可能重构代码以消除方法中的catch？
express-async-errors库对此有一个解决方案。