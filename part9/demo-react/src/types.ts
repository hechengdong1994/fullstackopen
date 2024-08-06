interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
interface CourseDescriptionPart extends CoursePartBase {
  description: string;
}

// 不同的课程部分定义类型
// 多亏了name string literal，TypeScript可以识别哪个课程部分需要哪些额外的属性，即使该变量被定义为使用union类型。
interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}
interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission";
  exerciseSubmissionLink: string;
}
interface CourseSpecialPart extends CourseDescriptionPart {
  type: "special";
  requirements: string[];
}

// 创建一个所有这些类型的union
// 可以用它来为我们的数组定义一个类型，它应该接受这些课程部分的任何类型。
export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

export const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]