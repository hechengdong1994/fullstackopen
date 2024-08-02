import { CounterContextProvider, useCounterDispatch, useCounterValue } from './CounterContext'

const Display = () => {
  const counter = useCounterValue()
  return (
    <div>
      {counter}
    </div>
  )
}

const Button = ({ type, label }) => {
  const dispatch = useCounterDispatch()
  return (
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  )
}

const App = () => {
  // useReducer 钩子提供了为应用创建状态的机制。创建一个状态所需的参数有：处理状态变化的 reducer 函数，以及状态的初始值
  // const [counter, counterDispatch] = useReducer(counterReducer, 0)

  // React 的 context 类似应用的全局状态，应用中的组件均可以直接访问它。
  return (
    <CounterContextProvider>
      <Display />
      <div>
        <Button type='INC' label='+' />
        <Button type='DEC' label='-' />
        <Button type='ZERO' label='0' />
      </div>
    </CounterContextProvider>
  )
}

export default App;
