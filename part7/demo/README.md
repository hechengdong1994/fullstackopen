在一个老式网络应用中，改变应用显示的页面将由浏览器向服务器发出HTTP GET请求并渲染代表返回的视图的HTML来完成。

在单页应用中，实际上我们总是在同一个页面上。浏览器运行的Javascript代码创造了一个不同 "页面 "的假象。如果在切换视图时发出HTTP请求，它们只是为了获取JSON格式的数据，而新的视图可能需要它来显示。

React有React Router库，它为管理React应用中的导航提供了一个很好的解决方案。

npm install react-router-dom