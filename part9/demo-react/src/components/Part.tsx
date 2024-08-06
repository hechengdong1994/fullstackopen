import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal': {
      return (
        <div>
          <p>{part.name} {part.exerciseCount}</p>
          <p>{part.description}</p>
        </div>
      )
    }
    case 'groupProject': {
      return (
        <div>
          <p>{part.name} {part.exerciseCount}</p>
          <p>project exercise {part.groupProjectCount}</p>
        </div>
      )
    }
    case 'submission': {
      return (
        <div>
          <p>{part.name} {part.exerciseCount}</p>
          <p>{part.description}</p>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </div>
      )
    }
    case 'special': {
      return (
        <div>
          <p>{part.name} {part.exerciseCount}</p>
          <p>{part.description}</p>
          <p>required skils: {part.requirements}</p>
        </div>
      )
    }
    // 添加新类型怎么办？如果我们要添加一个新的课程部分，知道我们的代码中是否已经实现了对该类型的处理不是很好吗？
    // 在上面的例子中，一个新的类型会进入default块，而对于一个新的类型，什么也不会被打印出来。
    // 当然，有时候，这是完全可以接受的，例如，如果你只想处理一个类型联盟的特定（但不是全部）情况，但在大多数情况下，建议单独处理所有的变化。
    // 通过TypeScript，我们可以使用一种叫做详尽的类型检查的方法。
    // 它的基本原理是，如果我们遇到一个意外的值，我们就调用一个接受类型为never并且返回类型为never的函数。
    // 这个函数的直接版本可以是这样的。
    default: {
      return assertNever(part);
    }
  }
};

// 详尽的类型检查的方法。
// 它的基本原理是，如果我们遇到一个意外的值，我们就调用一个接受类型为never并且返回类型为never的函数。
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;