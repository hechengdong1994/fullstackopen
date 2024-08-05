// 提供了一种为输入定义特定类型的方法，它确切地描述了什么类型的输入是可接受的。在此基础上，TypeScript还可以在编辑器级别显示已接受的值的信息。
// 使用OR运算符|，我们可以通过创建一个联合类型来定义一个变量，接受多个值。
type Operation = 'multiply' | 'add' | 'divide';
type Result = number

const calculator = (a: number, b: number, op: Operation): Result => {
  switch (op) {
    case 'multiply':
      return a * b;
    case 'add':
      return a + b;
    case 'divide': {
      if (b === 0) throw new Error('Can\'t divide by 0!');
      return a / b;
    }
    default:
      throw new Error('invalid operation!')
  }
}

try {
  console.log(calculator(1, 2, 'multiply'))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage)
}

// console.log(process.argv)

export { calculator }