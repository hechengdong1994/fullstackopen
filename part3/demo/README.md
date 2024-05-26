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