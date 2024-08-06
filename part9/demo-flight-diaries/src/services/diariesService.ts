// import diaryData from '../../data/diaries.json';
import diaries from '../../data/diaries';

import { NonSensitiveDiaryEntry, DiaryEntry, NewDiaryEntry } from '../types';

// 错误信息的结尾揭示了问题所在：weather字段是不兼容的。在DiaryEntry中，我们指定其类型为Weather，但
// TypeScript编译器已经推断其类型为string。
// 我们可以通过做一个type assertion来解决这个问题。只有当我们确定我们知道自己在做什么的时候才可以这样做。
// 用关键字as断言变量diaryData的类型为DiaryEntry，一切都会正常。
// 除非没有其他办法，否则我们不应该使用类型断言，因为我们总是有可能断言一个不合适的类型给一个对象，导致一个讨厌的运行时错误。
// 虽然编译器相信你在使用as时知道你在做什么，但通过这样做，我们没有使用TypeScript的全部力量，而是依靠编码者来保护代码。
// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};


const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  // 正在返回完整的日记条目，而且没有给出错误，尽管输入了!
  // 发生这种情况是因为TypeScript只检查我们是否有所有需要的字段，但多余的字段不被禁止。
  // 在我们的例子中，这意味着返回一个DiaryEntry[]类型的对象是不禁止的
  // 但是如果我们试图访问comment字段，这将是不可能的，因为我们将访问一个TypeScript不知道的字段，即使它存在。
  // 不幸的是，如果你不知道你在做什么，这可能会导致不必要的行为；就TypeScript而言，这种情况是有效的，但你很可能允许使用不想要的东西。
  // 如果我们现在从getNonSensitiveEntries函数中返回所有的diaryEntries到frontend，我们实际上会将不需要的字段泄露给请求的浏览器，尽管我们的类型似乎暗示了这一点
  // 因为TypeScript并不修改实际数据，而只是修改其类型，所以我们需要自己排除这些字段。
  // return diaries;
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

// 问题是不能保证能找到一个指定id的条目。
// 我们在编译阶段就已经意识到了这个潜在的问题。如果没有TypeScript，我们就不会被警告这个问题
// 在最坏的情况下，我们最终可能会返回一个undefined对象，而不是通知用户指定的条目没有被找到。
// 首先，在这样的情况下，我们需要决定如果没有找到一个对象，返回值应该是什么，以及如何处理这种情况。
// 如果没有找到对象，数组的find方法会返回undefined，而这对我们来说其实是没有问题的。
// 我们可以通过输入如下的返回值来解决我们的问题。
// const findById = (id: number): DiaryEntry | undefined
const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addDiary
};