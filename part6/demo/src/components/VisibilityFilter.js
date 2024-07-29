import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  // 由于所有的单选按钮的名称属性是相同的，它们形成一个按钮组，其中只有一个选项可以选择。
  return (
    <div>
      all<input type='radio' name='filter' onChange={() => dispatch(filterChange('ALL'))} />
      important<input type='radio' name='filter' onChange={() => dispatch(filterChange('IMPORTANT'))} />
      nonimportant<input type='radio' name='filter' onChange={() => dispatch(filterChange('NONIMPORTANT'))} />
    </div>
  )
}

export default VisibilityFilter