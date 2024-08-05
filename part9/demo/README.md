TypeScript是JavaScript的一个超集，这意味着它包括了JavaScript的所有特性和

它自己的额外功能以及。换句话说，所有现有的JavaScript代码实际上是有效的TypeScript。

TypeScript由三个独立的、但又相互满足的部分组成。
语言
编译器
语言服务

语言由语法、关键字和类型注释组成。语法与JavaScript语法相似但不相同。从TypeScript的三个部分来看，程序员与语言有最直接的接触。

编译器负责类型信息的清除（即删除类型信息）和代码转换。代码转换使TypeScript代码被转译成可执行的JavaScript。所有与类型相关的东西都在编译时被移除，所以TypeScript实际上并不是真正的静态类型代码。

传统上，编译意味着代码从人类可读的格式转换为机器可读的格式。在TypeScript中，人类可读的源代码被转换为另一个人类可读的源代码，所以正确的术语实际上应该是transpiling。然而，在这种情况下，编译一直是最常用的术语，所以我们将继续使用它。

编译器也执行静态代码分析。如果它发现有理由这样做，它可以发出警告或错误，而且它可以被设置为执行额外的任务，如将生成的代码合并到一个文件中。

语言服务从源代码中收集类型信息。开发工具可以使用这些类型信息来提供智能提示、类型提示和可能的重构替代方案。

type类型别名声明

使用TypeScript可能有一些优势的理由:
首先，TypeScript提供类型检查和静态代码分析。我们可以要求值必须是某种类型，并让编译器对错误使用它们发出警告。这可以减少运行时的错误，你甚至可以减少项目中所需要的单元测试的数量，至少关于纯类型测试。
TypeScript的第二个优势是，代码中的类型注释可以作为一种类型的代码级文档发挥作用。
TypeScript的第三个优势是，当IDE知道你正在处理哪些类型的数据时，它们可以提供更具体、更智能的智能提示。

在使用TypeScript时遇到的一些问题，注意到这些问题也许是好事:
Incomplete, invalid or missing types in external libraries
当使用外部库时，你可能会发现一些库的类型声明缺失或在某些方面无效。大多数情况下，这是由于库不是用TypeScript编写的，而且手动添加类型声明的人没有做得很好。在这些情况下，你可能需要自己定义类型声明。
Sometimes, type inference needs assistance
TypeScript中的类型推理是相当好的，但不是很完美。
有时候，你可能觉得你已经完美地声明了你的类型，但是编译器仍然告诉你这个属性不存在或者这种用法是不允许的。在这种情况下，你可能需要通过做一些类似于 "额外的 "类型检查来帮助编译器，但要注意类型转换和类型保护。
使用类型转换或类型守卫，你基本上是向编译器保证值确实是你声明的类型。
Mysterious type errors
由类型系统给出的错误有时可能相当难以理解，特别是当你使用复杂的类型时。
根据经验，TypeScript的错误信息在信息的最后有最有用的信息。
当遇到长的令人困惑的信息时，从最后开始阅读。


当TypeScript被编译成JavaScript时，代码就会成为类型清除的对象。这意味着类型注释、接口、类型别名和其他类型系统结构被移除，结果是纯粹的可运行的JavaScript。
在生产环境中，编译的需要往往意味着你必须设置一个 "构建步骤"。在构建步骤中，所有的TypeScript代码都被编译成一个单独的文件夹中的JavaScript，然后生产环境从该文件夹中运行代码。在开发环境中，为了能更快地看到所产生的变化，利用实时编译和自动重载往往更方便。

ts-node和官方的typescript包全局安装:
npm install -g ts-node typescript

tsconfig.json文件用于定义TypeScript编译器应该如何解释代码，编译器应该如何严格工作，哪些文件需要观察或忽略，以及很多很多。


TypeScript希望所有全局使用的代码都是类型化的，当你的项目有一个合理的配置时，它对你自己的代码也是如此。TypeScript库本身只包含TypeScript包的代码类型。你可以为一个库编写自己的类型，但这几乎是不需要的--因为TypeScript社区已经为我们做了这个工作
与npm一样，TypeScript世界也在庆祝开源代码。社区很活跃，不断对常用的npm包的更新和变化做出反应。你几乎总能找到npm包的类型，所以你不必单独为你的成千上万的依赖创建类型。
通常，现有软件包的类型可以从npm内部的@types组织中找到，你可以通过安装一个带有@types/前缀的软件包名称的npm包将相关类型添加到你的项目中。比如说npm install --save-dev @types/react @types/express @types/lodash @types/jest @types/mongoose等等，等等。@types/*由Definitely typed维护，这是一个社区项目，目的是在一个地方维护所有的类型。
有时，一个npm包也可以在代码中包含它的类型，在这种情况下，安装相应的@types/*就没有必要。
NB: 由于类型只在编译前使用，所以在生产构建中不需要类型，它们应该总是在package.json的devDependencies中。
由于全局变量process是由Node本身定义的，我们从包@types/node中获得其类型。
从10.0版本开始，ts-node已经将@types/node定义为一个对等依赖。如果npm的版本至少是7.0，那么一个项目的对等依赖就会自动被npm安装。如果你有一个更老的npm，同行依赖必须明确安装。

tsconfig.json文件包含了你希望TypeScript在你的项目中如何工作的所有核心配置。

为了简化开发，我们应该启用自动重载来改善我们的工作流程。在本课程中，你已经使用了nodemon，但是ts-node有一个替代品，叫做ts-node-dev。它只适用于开发环境，在每次修改时都会进行重新编译，所以重新启动应用是不必要的。
让我们把ts-note-dev安装到我们的开发依赖项中。
npm install --save-dev ts-node-dev

eslint和它的TypeScript扩展。
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser