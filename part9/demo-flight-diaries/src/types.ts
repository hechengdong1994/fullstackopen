// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';
// 枚举通常用于有一组预先确定的值的情况下，预计在未来不会改变。通常枚举用于更严格的不变的值
export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy'
};

// export type Visibility = 'great' | 'good' | 'ok' | 'poor';
export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

// 如果我们希望能够保存没有某个字段的条目，例如comment，我们可以通过在类型声明中添加?，将字段的类型设置为optional。
export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

// 有时，我们可能想使用一种类型的特定修改。
// 例如，考虑一个用于列出一些数据的页面，其中一些是敏感的，一些是不敏感的。
// 我们可能想确保没有敏感数据被使用或显示。我们可以挑选我们允许使用的类型的字段来执行这一点。
// 我们可以通过使用实用类型Pick来做到这一点。
// Pick实用类型允许我们选择我们想使用的现有类型的哪些字段。
// Pick可以用来构建一个全新的类型，也可以用来通知一个函数在运行时应该返回什么。
// 实用类型是一种特殊的类型工具，但它们可以像普通类型一样使用。
// Array<Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>>
// 由于Pick要求它所修改的类型作为类型变量给出，就像Array一样，我们现在有两个嵌套的类型变量，语法开始变得有点奇怪了。
// 我们可以通过使用替代 数组语法来提高代码的可读性。
// Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[]

// 只想排除一个字段,使用Omit工具类型会更好，我们可以用它来声明要排除哪些字段。
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;