在一个老式网络应用中，改变应用显示的页面将由浏览器向服务器发出HTTP GET请求并渲染代表返回的视图的HTML来完成。

在单页应用中，实际上我们总是在同一个页面上。浏览器运行的Javascript代码创造了一个不同 "页面 "的假象。如果在切换视图时发出HTTP请求，它们只是为了获取JSON格式的数据，而新的视图可能需要它来显示。

React有React Router库，它为管理React应用中的导航提供了一个很好的解决方案。

npm install react-router-dom


Hooks
React提供了10种不同的内置钩子，其中最常用的是我们已经广泛使用的useState和useEffect钩子。

在第五章节中，我们使用了useImperativeHandle钩子，它允许组件向其他组件提供其功能。

在过去几年中，许多React库已经开始提供基于钩子的apis。在第6章节中，我们使用了来自react-redux库的useSelector和useDispatch钩子来分享我们的redux-store和调度功能到我们的组件。Redux's hook-based api比其旧的、仍然可用的connectAPI容易使用得多。

我们在前一部分中介绍的React Router'sapi也是部分基于hook。它的钩子可以用来访问url参数和navigation对象，这允许以编程方式操纵浏览器的url。

正如在第一章节中提到的，钩子不是普通的函数，在使用这些钩子时，我们必须遵守某些规则或限制。让我们回顾一下使用钩子的规则，这些规则是逐字复制自React官方文档。

不要在循环、条件或嵌套函数中调用钩子。相反，总是在React函数的顶层使用钩子。

不要从普通的JavaScript函数中调用Hooks。相反，你可以:
1.从React函数组件调用Hooks
2.从自定义Hooks中调用Hooks

有一个现有的ESlint规则，可以用来验证应用是否正确使用钩子。

Create-react-app有一个现成的规则eslint-plugin-react-hooks，如果钩子被以非法的方式使用就会被投诉。

自定义钩子显然不仅仅是一个重用的工具，它们还提供了一个更好的方法来将我们的代码划分为更小的模块化部分。
