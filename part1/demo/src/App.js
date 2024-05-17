// 组件的辅助函数
// const Hello = props => {
//     // 解构使得变量的赋值更加容易，可以用来提取和收集一个对象的属性值到单独的变量中。
//     const { name, age } = props
// 更进一步的解构
// const Hello = ({ name, age }) => {
//     // 这个辅助函数实际上是定义在另一个函数里面，这个函数定义了我们组件行为。
//     // 在Java编程中，在另一个函数中定义一个函数是很复杂和麻烦的，所以不是那么常见。
//     // 然而，在JavaScript中，在函数中定义函数是一种常规操作。
//     // const bornYear = () => {
//     //     const yearNow = new Date().getFullYear()
//     //     return yearNow - age
//     // }
//     // 箭头函数的更紧凑的语法。函数只是返回单个表达式的结果
//     const bornYear = () => new Date().getFullYear() - age


//     return (
//         <div>
//             <p>
//                 Hello {name}, you are {age} years old
//             </p>
//             <p>So you were probably born in {bornYear()}</p>
//         </div>
//     )
// }
// 组件的辅助函数
// const App = () => {
//     const name = 'Peter'
//     const age = 10

//     return (
//         <div>
//             <h1>Greetings</h1>
//             <Hello name='Maya' age={26 + 10} />
//             <Hello name={name} age={age} />
//         </div>
//     )
// }

// 组件的重新渲染
// const App = props => {
//     const {counter} = props
//     return (
//         <div>{counter}</div>
//     )
// }

import { useState } from "react";

// 拥有状态的组件
// 在React的状态钩子的帮助下，给组件添加状态。
// const App = () => {
//     // 该函数调用将state添加到组件中，并将其初始化为0值。该函数返回一个包含两个项目的数组。
//     const [counter, setCounter] = useState(0)
//     // 当修改状态的函数setCounter被调用时，React重新渲染组件，这意味着组件函数的函数体被重新执行。
//     // 第二次执行组件函数时，它会调用useState函数并返回状态的新值。

//     // 事件处理函数
//     // const handleClick = () => {
//     //     console.log('clicked')
//     // }
//     const increaseByOne = () => setCounter(counter + 1)
//     const setToZero = () => setCounter(0)

//     // setTimeout(
//     //     () => setCounter(counter + 1),
//     //     1000
//     // )

//     // 重新渲染意味着重新执行函数体
//     console.log('rendering...', counter)

//     return (
//         <div>
//             <div>{counter}</div>
//             {/* 注意：一个事件处理程序应该是一个函数或者一个函数引用 */}
//             {/* <button onClick={handleClick}> */}
//             {/* 事件处理函数也可以直接在属性赋值中定义， 但通常在JSX模板中定义事件处理程序并不是一个好主意 */}
//             {/* <button onClick={() => setCounter(counter + 1)}> */}
//             {/* 在这里，事件处理程序已经被正确定义。onClick属性的值是一个变量，包含对一个函数的引用。 */}
//             <button onClick={increaseByOne}>
//                 plus
//             </button>
//             {/* <button onClick={() => setCounter(0)}> */}
//             <button onClick={setToZero}>
//                 zero
//             </button>
//             {/* 该事件处理程序实际上是一个函数调用。这将导致组件不断循环重复被渲染 */}
//             {/* <button onClick={setCounter(counter+1)}>
//                 plus error
//             </button> */}
//         </div>
//     )
// }

// 状态的传递
const Display = ({counter}) => <div>{counter}</div>
// 注意: 要小心不要过于简化您的组件，因为这会使日后增加复杂性变得更加繁琐。


const Button = (props) => {
    // 事件处理程序是通过onClick prop传递给Button组件的。这个prop的名字本身并不重要，但我们的命名选择并不是完全随机的。React的官方 tutorial建议采用这种惯例。
    // 根据约定，事件处理程序属性应以 on 开头，后面跟着一个大写字母。 例如，按钮组件的 onClick 属性可以称为 onSmash
    return (
        <button onClick={props.onClick}>
            {props.text}
        </button>
    )
}

const App = () => {
    // 1.当应用启动时，App中的代码被执行。这段代码使用一个useState钩子来创建应用的状态，设置变量counter的初始值。
    // 4.调用一个改变状态的函数会导致组件重新渲染。App组件被重新渲染。这导致其子组件Display和Button也被重新渲染。
    const [counter, setCounter] = useState(0)

    const increaseByOne = () => setCounter(counter + 1)
    const decreaseByOne = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)

    // 2.这个组件包含Display组件--显示计数器的值0--和三个Button组件。这些按钮都有事件处理程序，用来改变计数器的状态。
    // 3.当其中一个按钮被点击时，事件处理程序被执行。该事件处理程序通过setCounter函数改变App组件的状态。
    return (
        <div>
            <Display counter={counter} />
            <Button
                onClick={increaseByOne}
                text='plus'
            />
            <Button
                onClick={setToZero}
                text='zero'
            />
            <Button
                onClick={decreaseByOne}
                text='minus'
            />
        </div>
    )
}

export default App;