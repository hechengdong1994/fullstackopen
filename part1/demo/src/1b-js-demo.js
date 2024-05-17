const x=1
let y=5

console.log(x, y)
y+=10
console.log(x, y)
y='sometext'
console.log(x, y)
//x=4 //运行时错误

const t=[1, -1, 3]
t.push(5) // 变量总是指向同一个对象。然而，数组的内容可以改变
console.log(t.length)
console.log(t[1])
t.forEach(value=>{ // 接收一个用箭头语法定义的函数作为参数。为数组中的每个项调用函数
    console.log(value)
})
// 在使用React时，经常使用函数式编程的技术。函数式编程范式的一个特点是使用不可变的数据结构。
// 在React代码中，最好使用concat方法，该方法不会将项目添加到数组中，而是创建一个新的数组，其中同时包含旧数组和新项目的内容。
const t2=t.concat(5)
console.log(t)
console.log(t2)

// 数组转化
const m1=t.map(value=>value*2)
console.log(m1)
const m2=t.map(value=>'<li>'+value+'</li>')
console.log(m2)

// 数组解构赋值
const t3=[1,2,3,4,5]
const [first, second, ...rest] = t3
console.log(first, second)
console.log(rest)

// 对象
const object1 = {
    name:'Arto Hellas',
    age:35,
    education:'PhD',
}
const object2={
    name:'Full Stack web application development',
    level:'intermediate studies',
    size:5,
}
const object3={
    name:{
        first:'Dan',
        last:'Abramov',
    },
    grades:[2,3,5,3],
    department:'Standford University'
}
// 对象属性引用
console.log(object1.name)
const fieldName='age'
console.log(object1[fieldName])
// 对象属性添加
object1.address='Helsinki'
object1['secret number']=12341

// 箭头函数
const sum=(p1,p2)=>{
    console.log(p1)
    console.log(p2)
    return p1+p2
}
const result=sum(1,5)
console.log(result)
// 只有一个参数
const square=p=>{
    console.log(p)
    return p*p
}
// 函数体只包含一个表达式
const square2 = p=>p*p
// map中的应用
const t4=[1,2,3]
const t4Square=t4.map(value=>value*value)
console.log(t4Square)

// 关键字function
function product(a,b){
    return a*b
}
const resultProduct=product(2,6)
console.log(resultProduct)
// 函数表达式
const average=function(a,b){
    return (a+b)/2
}
const resultAverage=average(2,5)
console.log(resultAverage)
