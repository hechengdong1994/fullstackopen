# json-server
命令npm install -g json-server在你的机器上安装JSON服务器。全局安装需要管理权限，这意味着它不可能在教师的电脑或新生的笔记本电脑上实现。

然而，全局安装并不是必须的。 从你的应用的根目录，我们可以使用npx命令来运行json-server。

npx json-server --port 3001 --watch db.json

json-server默认在端口3000上开始运行；但由于使用create-react-app创建的项目保留了端口3000，我们必须为json-server定义一个备用端口，如端口3001。

让我们在浏览器中导航到http://localhost:3001/notes这个地址。我们可以看到，json-server以JSON格式提供我们之前写到文件中的注释。

# npm
现在，几乎所有的JavaScript项目都是用node包管理器来定义的，也就是npm。使用create-react-app创建的项目也遵循npm的格式。一个项目使用npm的明显标志是位于项目根部的package.json文件。

npm-commands应该总是在项目根目录下运行，也就是可以找到package.json文件的地方。

npm install axios

除了将axios添加到依赖项中，npm install命令还下载了库代码。与其他依赖项一样，代码可以在位于根目录的node/modules目录中找到。

让我们再做一个补充。通过执行以下命令，将json-server安装为开发依赖项（只在开发过程中使用）。

npm install json-server --save-dev

再做一个补充。通过执行以下命令，将json-server安装为开发依赖项（只在开发过程中使用）。

npm install json-server --save-dev

在package.json文件的scripts部分做一个小小的补充。

{
  // ...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server": "json-server -p3001 --watch db.json"
  },
}
我们现在可以方便地，在没有参数定义的情况下，用命令从项目根目录下启动json-server。

npm run server

我们用了两次npm install的命令，但略有不同。

npm install axios
npm install json-server --save-devcopy
在参数上有细微差别。axios被安装为应用的运行时依赖，因为程序的执行需要该库的存在。另一方面，json-server被安装为开发依赖项（--save-dev），因为程序本身并不需要它。它是用来在软件开发过程中提供帮助的。

# Axios and promises
注意：当文件index.js的内容发生变化时，React并不总是自动注意到这一点，所以你可能需要刷新浏览器来看到你的变化!一个简单的解决方法是在项目的根目录下创建一个名为.env的文件，并添加这一行FAST_REFRESH=false，使React自动注意到变化。重新启动应用以使应用的变化生效。

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
