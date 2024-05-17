import { useState } from "react";

// 复杂状态
// 建议将倾向于一起变化的状态拆分为多个状态变量
// const App = () => {
//     // 组件的状态或其状态的一部分可以是任何类型。我们可以通过将left和right按钮的点击次数保存在一个对象中来实现同样的功能。
//     const [clicks, setClicks] = useState({
//         left: 0, right: 0
//     })

//     // 该应用似乎可以工作。然而，在React中是禁止直接改变状态的，因为它可能导致意想不到的副作用。
//     // 改变状态必须始终通过将状态设置为一个新的对象来完成。
//     // 如果前一个状态对象的属性没有改变，它们需要简单地复制，这可以通过将这些属性复制到一个新的对象中，并将其设置为新的状态来完成。
//     // const handleLeftClick = () => {
//     //     clicks.left++
//     //     setClicks(clicks)
//     // }

//     const handleLeftClick = () => {
//         const newClicks = {
//             // 通过使用对象传播来更整齐地定义新的状态对象
//             ...clicks,
//             left: clicks.left + 1,
//             // right: clicks.right
//         }
//         setClicks(newClicks)
//     }

//     const handleRightClick = () => {
//         const newClicks = {
//             ...clicks,
//             // left: clicks.left,
//             right: clicks.right + 1
//         }
//         setClicks(newClicks)
//     }

//     return (
//         <div>
//             {clicks.left}
//             <button onClick={handleLeftClick}>left</button>
//             <button onClick={handleRightClick}>right</button>
//             {clicks.right}
//         </div>
//     )
// }

// 数组状态和条件渲染
// const History = (props) => {
//     // 条件渲染
//     if (props.allClicks.length === 0) {
//         return (
//             <div>
//                 the app is used by pressing the buttons
//             </div>
//         )
//     }
//     return (
//         <div>
//             button press history: {props.allClicks.join(' ')}
//         </div>
//     )
// }

// const Button = ({ handleClick, text }) => (
//     <button onClick={handleClick}>
//         {text}
//     </button>
// )

// const App = () => {
//     const [left, setLeft] = useState(0)
//     const [right, setRight] = useState(0)
//     const [allClicks, setAll] = useState([])

//     const handleLeftClick = () => {
//         // 将新的项目添加到数组中是通过concat方法完成的，该方法并不改变现有的数组，而是返回一个数组的新副本，并将项目添加到其中
//         setAll(allClicks.concat('L'))
//         setLeft(left + 1)
//     }

//     const handleRightClick = () => {
//         setAll(allClicks.concat('R'))
//         setRight(right + 1)
//     }

//     return (
//         <div>
//             {left}
//             <Button handleClick={handleLeftClick} text='left' />
//             <Button handleClick={handleRightClick} text='right' />
//             {right}
//             <History allClicks={allClicks} />
//         </div>
//     )
// }

//Rules of Hooks
// 为了确保我们的应用正确使用基于钩子的状态函数，有一些限制和规则是我们必须遵循的。
// useState函数（以及课程后面介绍的useEffect函数）不能从循环、条件表达式或任何不是定义组件的函数的地方调用。
// 这样做是为了确保钩子总是以相同的顺序被调用，如果不是这样的话，应用将表现得不正常。
// 简而言之，钩子只能从定义了React组件的函数体内部调用。
// const App = () => {
//     // these are ok
//     const [age, setAge] = useState(0)
//     const [name, setName] = useState('Juha Tauriainen')

//     if (age > 10) {
//         // this does not work!
//         const [foobar, setFoobar] = useState(null)
//     }

//     for (let i = 0; i < age; i++) {
//         // also this is not good
//         const [rightWay, setRightWay] = useState(false)
//     }

//     const notGood = () => {
//         // and this is also illegal
//         const [x, setX] = useState(-1000)
//     }

//     return (
//       //...
//     )
// }

// Function that returns a function
// 另一种定义事件处理程序的方法是使用返回函数的函数。
// 返回的函数可以被利用来定义可以用参数定制的通用功能。
const App = () => {
    const [value, setValue] = useState(10)

    const hello = (who) => {
        // 创建事件处理程序的hello函数可以被认为是一个工厂，它产生了定制的事件处理程序，旨在向用户问好。
        const handler = () => console.log('hello', who)
        return handler
    }

    const setToValue = (newValue) => {
        console.log('value now', newValue)
        setValue(newValue)
    }

    return (
        <div>
            <button onClick={hello('world')}>button</button>
            <button onClick={hello('react')}>button</button>
            <button onClick={hello('function')}>button</button>

            {/* 可以把事件处理程序定义为一个函数，用一个适当的参数调用setToValue函数 */}
            {value}
            <button onClick={() => setToValue(1000)}>thousand</button>
            <button onClick={() => setToValue(10)}>reset</button>
            <button onClick={() => setToValue(value + 1)}>increment</button>
        </div>
    )
}

// 应用似乎仍在工作，但不要在组件中定义组件。
// 这种方法没有任何好处，而且会导致许多不愉快的问题。
// 最大的问题是由于React在每次渲染时都将定义在另一个组件内的组件视为一个新的组件。这使得React无法优化该组件。

export default App;