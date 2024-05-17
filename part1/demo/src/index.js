import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './App1a';
// import App from './App1c';
import App from './App1d';

// 定义了一个名为App的React组件。
// 在文件index.js的最后一行的命令：将其内容渲染到div-元素中，该元素在文件public/index.html中定义，其id值为'root'。
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
// 默认情况下，文件public/index.html不包含任何我们在浏览器中可见的HTML标记。你可以尝试在该文件中添加一些HTML。当使用React时，所有需要渲染的内容通常被定义为React组件。

// 重新渲染
// let counter = 1
// const refresh = () => {
//     ReactDOM.createRoot(document.getElementById('root')).render(
//         <App counter={counter} />
//     )
// }
// // 数值1和2在屏幕上显示的时间非常短，以至于它们无法被注意到。
// refresh()
// counter += 1
// refresh()
// counter += 1
// refresh()
// // 每秒钟重新渲染并增加计数器
// setInterval(() => {
//     refresh()
//     counter += 1
// }, 1000)
// // 重复调用render方法并不是重新渲染组件的推荐方式。

// 拥有状态的组件
ReactDOM.createRoot(document.getElementById('root')).render(<App />)