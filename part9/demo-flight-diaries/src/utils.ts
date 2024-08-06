import { NewDiaryEntry, Weather, Visibility } from './types';

// object是什么类型？由于object实际上是一个请求的主体，Express将它打成了any。
// 由于这个函数的想法是将未知类型的字段映射到正确类型的字段，并检查它们是否按预期定义，这可能是我们实际上想要允许any类型的罕见情况。
// 更好的办法是遵循编辑器在Quick Fix中给出的建议，将参数类型设置为unknown。
// unknown是我们这种输入验证情况的理想类型，因为我们还不需要定义类型来匹配任何类型，而是可以先验证类型，然后确认预期类型。
// 通过使用unknown，我们也不需要担心@typescript-eslint/no-explicit-any eslint规则，因为我们没有使用any。
// 然而，在某些情况下，我们可能仍然需要使用any，因为我们还不确定类型，需要访问any对象的属性，以便验证或类型检查属性值本身。
// const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//   // 试图访问参数object的字段
//   // 代码不能编译。这是由于未知类型不允许任何操作，所以访问字段是不可能的。
//   const newEntry: NewDiaryEntry = {
//     comment: parseComment(object.comment),
//     date: parseDate(object.date),
//     weather: parseWeather(object.weather),
//     visibility: parseVisibility(object.visibility)
//   };
//   return newEntry;
// };
// 通过将字段重构为未知类型的变量来解决这个问题
type Fields = { comment: unknown, date: unknown, weather: unknown, visibility: unknown };
const toNewDiaryEntry = ({ comment, date, weather, visibility } : Fields): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    comment: parseComment(comment),
    date: parseDate(date),
    weather: parseWeather(weather),
    visibility: parseVisibility(visibility)
  };

  return newEntry;
};
// 绕过这个问题的另一个选择是为参数使用any类型，并禁用该行的lint规则。
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const toNewDiaryEntry = (object: any): NewDiaryEntry => {
//   const newEntry: NewDiaryEntry = {
//     comment: parseComment(object.comment),
//     date: parseDate(object.date),
//     weather: parseWeather(object.weather),
//     visibility: parseVisibility(object.visibility)
//   };

//   return newEntry;
// };

// 在调用类型保护之前，变量的实际类型是不知道的。
const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

// 该函数是一个所谓的类型保护。这意味着它是一个返回布尔值的函数，它有一个类型谓词作为返回类型。
// 类型谓词的一般形式是parameterName is Type，其中parameterName是函数参数的名称，Type是目标类型。
// 如果类型保护函数返回真，TypeScript编译器就知道被测试的变量具有在类型谓词中定义的类型。
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
// 如果我们想绝对确定，两个条件都需要。
// 在JavaScript中，有两种不同的方法来创建字符串对象，这两种方法在typeof和instanceof操作符方面的工作方式有点不同。
// const a = "I'm a string primitive";
// const b = new String("I'm a String Object");
// typeof a; --> returns 'string'
// typeof b; --> returns 'object'
// a instanceof String; --> returns false
// b instanceof String; --> returns true

// 注意，即使parseDate函数接受date变量为未知数，在我们用isString检查类型后，它的类型被设置为字符串，
// 这就是为什么我们可以把变量交给isDate函数，要求它是一个字符串而没有任何问题。
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};
// 不能在这里使用类型保护，因为在这种情况下，日期只被认为是一个字符串。
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isWeather(weather)) {
    throw new Error('Incorrect or missing weather: ' + weather);
  }
  return weather;
};
// const isWeather = (str: string): str is Weather => {
  // 问题是，如果类型被改变，Weather的可能值列表不一定与类型定义保持同步。
  // 这肯定不是好事，因为我们希望所有可能的天气类型都只有一个来源。
  // 应该使用TypeScript的枚举，而不是类型别名，这允许我们在运行时在我们的代码中使用实际值，而不仅仅是在编译阶段。
  // return ['sunny', 'rainy', 'cloudy', 'stormy'].includes(str);
// };
// 需要注意的一点是，我们已经把参数类型改为any。如果它是字符串，那么includes检查就不会被编译。
// 如果你考虑到函数的可重用性，这也是有道理的。
// 通过允许any作为参数，这个函数可以被放心地使用，因为无论我们向它输入什么，这个函数总是告诉我们这个变量是否是有效的天气。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isWeather = (param: any): param is Weather => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Weather).includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
    throw new Error('Incorrect or missing visibility: ' + visibility);
  }
  return visibility;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isVisibility = (param: any): param is Visibility => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Visibility).includes(param);
};

export default toNewDiaryEntry;