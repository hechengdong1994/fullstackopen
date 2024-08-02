import { createContext, useContext, useReducer } from 'react'

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INC':
      return state + 1
    case 'DEC':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const CounterContext = createContext()

export const CounterContextProvider = (props) => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
    <CounterContext.Provider value={[counter, counterDispatch]}>
      {props.children}
    </CounterContext.Provider>
  )
}

// 作为一个技术细节，应当注意到辅助函数——useCounterValue 和 useCounterDispatch，是 自定义钩子（custom hooks）
// 因为只能通过 React 组件或自定义钩子调用钩子函数——useContext。
// 此外，自定义钩子是必须以 use 作为名称开头的 JavaScript 函数。
export const useCounterValue = () => {
  const counterAndDispatch = useContext(CounterContext)
  return counterAndDispatch[0]
}

export const useCounterDispatch = () => {
  const counterAndDispatch = useContext(CounterContext)
  return counterAndDispatch[1]
}

export default CounterContext