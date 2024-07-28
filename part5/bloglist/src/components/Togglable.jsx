import { useState } from "react"

const Togglable = (props) => {
  const [visiable, setVisiable] = useState(false)

  const switchVisiable = () => {
    setVisiable(!visiable)
  }

  if (!visiable) {
    return (
      <button onClick={switchVisiable}>{props.message}</button>
    )
  } else {
    return (
      <div>
        {props.children}
        <button onClick={switchVisiable}>cancel</button>
      </div>
    )
  }
}

export default Togglable