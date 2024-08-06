TypeScript的本地编译器（tsc）可以通过生成tsconfig.json文件帮助我们初始化项目。

首先，我们需要将tsc命令添加到package.json的可执行脚本列表中
"tsc": "tsc"

现在可以通过运行以下程序来初始化我们的tsconfig.json设置。
npm run tsc -- --init
注意实际参数前的额外--
--之前的参数被解释为用于npm命令，而之后的参数是指通过脚本运行的命令（即本例中的tsc）。


安装express，当然还有@types/express。另外，由于这是一个真正的项目，它打算随着时间的推移而发展，我们将从一开始就使用eslint。
npm install express
npm install --save-dev eslint @types/express @typescript-eslint/eslint-plugin @typescript-eslint/parser
试着通过运行TypeScript编译器来创建一个生产构建。因为我们已经在tsconfig.json中定义了outdir，所以除了运行脚本npm run tsc之外，真的没有其他事情要做。


早些时候，我们看到编译器如何通过分配给它的值来决定变量的类型。
同样地，编译器可以解释由对象和数组组成的大型数据集。
由于这个原因，如果我们试图对我们正在处理的json数据做一些可疑的事情，编译器实际上可以警告我们。

尽管编译器能很好地确保我们不做任何不必要的事情，但自己定义数据的类型还是比较安全的。


Node and JSON modules
需要注意的是，在使用tsconfig resolveJsonModule选项时，可能出现一个问题。

{
  "compilerOptions": {
    // ...
    "resolveJsonModule": true
  }
}copy
根据node文档中的file modules。

node将尝试按照扩展的顺序来解决模块。

 ["js", "json", "node"]copy
除此之外，默认情况下，ts-node和ts-node-dev将可能的节点模块扩展列表扩展为。

 ["js", "json", "node", "ts", "tsx"]copy
NB:.js、.json和.node文件作为TypeScript中的模块的有效性取决于环境配置，包括tsconfig选项，例如allowJs和resolveJsonModule。

考虑一个包含文件的平面文件夹结构。

  ├── myModule.json
  └── myModule.tscopy
在TypeScript中，当resolveJsonModule选项设置为true时，文件myModule.json成为有效的节点模块。现在，设想一个场景，我们希望将文件myModule.ts投入使用。

import myModule from "./myModule";copy
仔细看一下节点模块的扩展顺序。

 ["js", "json", "node", "ts", "tsx"]copy
我们注意到.json文件扩展名优先于.ts，所以myModule.json将被导入而不是myModule.ts。

为了避免吃时间的错误，建议在一个平面目录中，每个具有有效节点模块扩展名的文件都有一个唯一的文件名。