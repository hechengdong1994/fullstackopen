// 可以使用所谓的props向组件传递数据
// props作为一个参数，接收一个对象，该对象有对应于组件用户定义的所有的字段。
const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  // 定义组件的函数，可以包含任何种类的js代码
  // console.log('Hello from App component')
  // 该函数返回表达式的值
  // 可以渲染静态标签
  // return (
  //   <div>
  //     <p>Hello world</p>
  //   </div>
  // )
  // 也可以渲染动态内容
  // const now = new Date()
  // const a = 10
  // const b = 20
  // return (
  //   <div>
  //     <p>Hello world, it is {now.toString()}</p>
  //     <p>
  //       {a} plus {b} is {a + b}
  //     </p>
  //   </div>
  // )
  // const name = 'Peter'
  // const age = 10
  // return (
  //   <div>
  //     <h1>Greetings</h1>
  //     {/* 组件中可以使用其他组件 */}
  //     <Hello />
  //     {/* 一个组件可以被多次使用 */}
  //     <Hello />
  //     {/* pros定义 */}
  //     <Hello name="George" />
  //     <Hello name="Daisy" />
  //     {/* 可以有任意数量的prop，它们的值可以是"硬编码"的字符串或JavaScript表达式的结果。如果prop的值是用JavaScript实现的，它必须用大括号来包裹。 */}
  //     {/* 组件发送的props是变量的值、表达式的计算结果和一个常规字符串。 */}
  //     <Hello name="Maya" age={26+10} />
  //     <Hello name={name} age={age} />
  //   </div>
  // )
  // 注意，React组件的内容（通常）需要包含一个根元素。
  // 例如，如果我们试图定义组件App而不使用最外层的div元素，结果是返回一个错误信息。
  // return (
  //   <h1>Greetings</h1>
  //   <Hello name='Maya' age={26+10} />
  // )
  // 使用根元素并不是唯一可行的选择。一个组件的array也是一个有效的解决方案。
  // 注：实际上依然是报错的
  // return [
  //   <h1>Greetings</h1>
  //   <Hello name='Maya' age={26+10} />
  // ]
  // 由于根元素被强制规定了，我们在DOM树中有"额外的"div元素。这可以通过使用fragments来避免，即用一个空元素来包装组件要返回的元素。
  const name='Peter'
  const age=10
  return (
    <>
      <h1>Greetings</h1>
      <Hello name='Maya' age={26+10} />
      <Hello name={name} age={age} />
    </>
  )
  // 看起来React组件返回的是HTML标记。然而，事实并非如此。
  // React组件的布局大多是用JSX编写的。
  // 虽然JSX如下所示：HTML，但我们实际上是在处理一种写JavaScript的方式。
  // 底层上，由React组件返回的JSX被编译成JavaScript。
  // 编译是由Babel处理的。用create-react-app创建的项目被配置为自动编译。
  // 实际上，JSX很像HTML，区别在于使用JSX，你可以通过在大括号内编写适当的JavaScript来轻松嵌入动态内容。
  // JSX的理念与许多模板语言非常相似，例如与Java Spring一起使用的Thymeleaf，它被用在服务器上。
  // JSX是"XML-like"语言，这意味着每个标签都需要被关闭。
  // 用React编写组件是很容易的，通过组合组件，即使是比较复杂的应用也可以保持相当的可维护性。
  // 事实上，React的一个核心理念是由许多专门的可重复使用的组件组成应用。
  // 另一个强制的惯例是在应用的组件树的顶端有一个叫做App的根组件。
  // 然而，有些情况下，组件App并不完全是根，而是被包裹在一个适当的实用组件中。
  // React组件名称必须大写
}

export default App;
