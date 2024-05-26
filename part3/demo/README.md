Streamlining deploying of the frontend
为了创建一个新的前端生产构建，不需要额外的手工工作，让我们在后端仓库的package.json中添加一些npm脚本。

{
  "scripts": {
    //...
    "build:ui": "rm -rf build && cd ../part2-notes/ && npm run build && cp -r build ../notes-backend",
    "deploy": "git push heroku main",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && npm run deploy",
    "logs:prod": "heroku logs --tail"
  }
}
脚本 npm run build:ui 构建前端，并将生产版本复制到后端仓库下。 npm run deploy释放当前的后端到heroku。

npm run deploy:full结合了这两者，并包含必要的git命令来更新后端仓库。

还有一个脚本npm run logs:prod来显示heroku的日志。

注意，脚本build:ui中的目录路径取决于文件系统中存储库的位置。

NB 在Windows上，npm脚本在cmd.exe中执行，作为默认的shell，不支持bash命令。为了让上述bash命令发挥作用，你可以将默认的shell改为Bash（在默认的Git for Windows安装中），方法如下。

npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"
另一个选择是使用 shx。

Proxy
前端的变化导致它在开发模式下不再工作（当用npm start命令启动时），因为与后端的连接不起作用。


这是由于将后端地址改为相对的URL。

const baseUrl = '/api/notes'copy
因为在开发模式下，前端的地址是localhost:3000，对后端的请求会进入错误的地址localhost:3000/api/notes。后端是在localhost:3001。

如果该项目是用create-react-app创建的，这个问题很容易解决。只需在前端仓库的package.json文件中添加以下声明。

{
  "dependencies": {
    // ...
  },
  "scripts": {
    // ...
  },
  "proxy": "http://localhost:3001"
}
重启后，React开发环境将作为一个代理工作。如果React代码向http://localhost:3000的服务器地址做HTTP请求，而不是由React应用本身管理（即当请求不是关于获取应用的CSS或JavaScript），该请求将被重定向到http://localhost:3001的服务器。

现在前端也很好，在开发和生产模式下都能与服务器一起工作。

我们的方法的一个消极方面是部署前端是多么的复杂。部署一个新的版本需要生成新的前端生产版本并将其复制到后端仓库。这使得创建一个自动化的部署管道更加困难。部署管道是指通过不同的测试和质量检查，将代码从开发者的电脑中转移到生产环境中的一种自动化和可控的方式。构建一个部署管道是本课程第11部分的主题。

有多种方法来实现这个目标（例如，将后端和前端的代码放在同一个仓库），但我们现在不会去讨论这些。

在某些情况下，将前端代码部署为自己的应用可能是明智的。对于用create-react-app创建的应用，这是直接的。

Debugging Node applications
调试 Node 应用程序比调试在浏览器中运行的 JavaScript 稍微困难一些。打印到控制台是一种经过验证的方法，值得一试。有些人认为应该使用更复杂的方法，但我不同意。即使是世界上顶级的开源开发人员也会使用这种方法。

Visual Studio Code
在某些情况下，Visual Studio Code 的调试器可能很有用。您可以像这样以调试模式启动应用程序（在这个和接下来的几个图像中，注释中有一个名为“日期”的字段，在当前版本的应用程序中已被删除）：

截图显示如何在 vscode 中启动调试器
请注意，应用程序不应该在另一个控制台中运行，否则端口将已经被占用。

注意：Visual Studio Code 的较新版本可能会将“Debug”更改为“Run”。此外，您可能需要配置您的 launch.json 文件来开始调试。您可以通过选择下拉菜单上方的绿色播放按钮旁边的 Add Configuration...，然后选择 Run "npm start" in a debug terminal 来进行配置。有关更详细的设置说明，请访问 Visual Studio Code 的调试文档。

下面是一张截图，显示代码执行在保存新笔记的过程中被暂停：

断点处执行的vscode屏幕截图
代码执行在第 69 行的断点处停止。在控制台中，您可以看到 note 变量的值。在左上角的窗口中，您可以看到与应用程序状态相关的其他信息。

顶部的箭头可以用于控制调试器的流程。

出于某种原因，我并不经常使用 Visual Studio Code 的调试器。

Chrome dev tools
您也可以通过在命令中启动应用程序来使用 Chrome 开发者控制台进行调试：

node --inspect index.jscopy
您还可以将 --inspect 标志传递给 nodemon：

nodemon --inspect index.jscopy
您可以通过点击 Chrome 开发者控制台中出现的绿色图标（node logo）来访问调试器：

带有绿色node标志图标的开发者工具
调试器的界面与在 React 应用程序中的使用方式相同。可以使用Sources选项卡设置断点，代码执行将在断点处暂停。

开发者工具的 Sources 选项卡，包含断点和监视变量
应用程序的所有console.log消息都将出现在调试器的Console选项卡中。您还可以检查变量的值并执行自己的 JavaScript 代码。

开发者工具的控制台选项卡显示输入的笔记对象
Question everything
调试全栈应用程序可能一开始看起来很棘手。很快，我们的应用程序除了前端和后端之外还将有一个数据库，而应用程序中可能存在许多潜在的错误。

当应用程序"无法工作"时，我们首先必须找出问题实际发生在哪里。问题往往存在于您意想不到的地方，可能需要几分钟、几小时甚至几天才能找到问题的根源。

关键是要有系统性。由于问题可能存在于任何地方，您必须对所有事物提出质疑，逐个排除所有可能性。记录到控制台、使用 Postman、调试器和经验都会有所帮助。

当出现错误时，最糟糕的策略就是继续编写代码。这将确保您的代码很快会有更多的错误，并且调试它们将变得更加困难。丰田生产系统的 Jidoka（停止和修复）原则 在这种情况下也非常有效。

# env
有许多方法可以定义环境变量的值。一种方法是在启动应用程序时定义它：

MONGODB_URI=address_here npm run devcopy
更聪明的方法是使用dotenv库。你可以用以下命令安装这个库：

npm install dotenvcopy
要使用这个库，我们在项目的根目录下创建一个.env文件。环境变量在文件内部定义，它可以像这样：

MONGODB_URI=mongodb+srv://fullstack:thepasswordishere@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority
PORT=3001copy
我们也将服务器的硬编码端口添加到PORT环境变量中。

我们应该立即将.env文件添加到gitignore中，因为我们不希望公开发布任何机密信息！

.gitignore in vscode with .env line added
在.env文件中定义的环境变量可以通过表达式require('dotenv').config()引入，你可以像引用普通环境变量一样在代码中引用它们，使用process.env.MONGODB_URI语法。

# Lint
在我们进入下一部分之前，我们介绍一个重要的工具，叫做lint。维基百科对lint的描述如下：

一般来说，lint或者linter是任何检测和标记编程语言中错误的工具，包括样式错误。术语 lint-like behavior 有时用于标记可疑语言使用的过程。Lint类 的工具通常对源代码进行静态分析。

在编译的静态类型语言如Java中，像NetBeans这样的IDE可以指出代码中的错误，甚至是编译错误之外的错误。像checkstyle这样的用于执行静态分析的附加工具，可以用来扩展IDE的能力，也可以指出与样式相关的问题，如缩进。

在JavaScript领域，目前主导的静态分析（又名"linting"）工具是ESlinthttps://eslint.org/。

让我们使用以下命令将ESlint作为开发依赖项安装到notes后端项目中：

npm install eslint --save-devcopy
之后我们可以用以下命令初始化一个默认的ESlint配置：

npx eslint --initcopy
我们要回答所有的问题：

ESlint初始化的终端输出
配置将会保存在 .eslintrc.js 文件中。我们将在 env 配置中将 browser 改为 node：

module.exports = {
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
    }
}copy
让我们稍微修改一下配置。安装一个插件，该插件定义了一套与代码风格相关的规则https://eslint.style/packages/js：

npm install --save-dev @stylistic/eslint-plugin-jscopy
启用插件并添加一个扩展定义和四个代码风格规则：

module.exports = {
    // ...
    'plugins': [
        '@stylistic/js'
    ],
    'extends': 'eslint:recommended',
    'rules': {
        '@stylistic/js/indent': [
            'error',
            2
        ],
        '@stylistic/js/linebreak-style': [
            'error',
            'unix'
        ],
        '@stylistic/js/quotes': [
            'error',
            'single'
        ],
        '@stylistic/js/semi': [
            'error',
            'never'
        ],
    }
}copy
扩展 eslint:recommended 将一套推荐的规则https://eslint.org/docs/latest/rules/添加到项目中。此外，还添加了关于缩进、换行、连字符和分号的规则。这四条规则都在Eslint样式插件中定义了。

可以使用以下命令检查和验证像 index.js 这样的文件：

npx eslint index.jscopy
我们建议为linting创建一个单独的 npm script：

{
  // ...
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    // ...
    "lint": "eslint ."
  },
  // ...
}copy
现在，npm run lint 命令将检查项目中的每个文件。

当运行命令时，dist 目录中的文件也会被检查，我们不希望这种情况发生、我们可以通过在项目的根目录中创建一个.eslintignore 文件来实现这一点，文件的内容如下：

distcopy
这将导致整个dist目录不被ESlint检查。

Lint对我们的代码有很多意见：

ESlint错误的终端输出
我们暂时不去修复这些问题。

从命令行执行linter的更好替代方案是将eslint-plugin配置到编辑器中，这将连续运行linter。通过使用插件，你将立即在代码中看到错误。你可以在这里找到更多关于Visual Studio ESLint插件https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint的信息。

VS Code的ESlint插件会用红线下划出风格违规：

VScode ESLint插件显示错误的截图
这使得错误很容易被发现并立即修复。

ESlint有大量的规则https://eslint.org/docs/rules/，这些规则通过编辑 .eslintrc.js 文件就可以很容易地使用。

让我们添加eqeqeq规则，如果用非三等号运算符检查等式，它会发出警告。该规则是在配置文件的rules字段下添加的。

{
  // ...
  'rules': {
    // ...
   'eqeqeq': 'error',
  },
}copy
在我们进行这项工作的同时，让我们对规则进行一些其他更改。

让我们阻止行尾的不必要的尾随空格，要求大括号前后始终有一个空格，并且也要求箭头函数的函数参数中一致使用空格。

{
  // ...
  'rules': {
    // ...
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
        'error', 'always'
    ],
    'arrow-spacing': [
        'error', { 'before': true, 'after': true }
    ]
  },
}copy
我们的默认配置从eslint:recommended中使用了一堆预定的规则：

'extends': 'eslint:recommended',copy
这包括一个关于 console.log 命令的警告规则。可以通过在配置文件中将其"值"定义为0来禁用一条规则。我们暂时为no-console规则这样做。

{
  // ...
  'rules': {
    // ...
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
        'error', 'always'
    ],
    'arrow-spacing': [
        'error', { 'before': true, 'after': true }
    ],
    'no-console': 0
  },
}copy
注意 当你对.eslintrc.js文件进行更改时，建议从命令行运行linter。这将验证配置文件是否正确格式化：

如果你的配置文件中有什么错误，lint插件可能会表现得相当不稳定。

许多公司定义编码标准，这些标准通过ESlint配置文件在整个组织中强制执行。不建议反复重新发明轮子，采用别人项目中的现成配置可能是个好主意。最近，许多项目通过采用Airbnb的ESlint配置https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb，采纳了Airbnb的Javascript风格指南https://github.com/airbnb/javascript。