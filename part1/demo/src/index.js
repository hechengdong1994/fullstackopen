import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

// 定义了一个名为App的React组件。
// 在文件index.js的最后一行的命令：将其内容渲染到div-元素中，该元素在文件public/index.html中定义，其id值为'root'。
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
// 默认情况下，文件public/index.html不包含任何我们在浏览器中可见的HTML标记。你可以尝试在该文件中添加一些HTML。当使用React时，所有需要渲染的内容通常被定义为React组件。