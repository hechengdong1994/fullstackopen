// 对象方法和this
// 箭头函数和使用function关键字定义的函数，在涉及到它们对关键字this的行为方式时有很大不同，后者指的是对象本身
// 定义函数属性来给对象分配方法
const arto = {
    name:'Arto Hellas',
    age: 35,
    education: 'PhD',
    greet: function(){
        console.log('hello, my name is ' + this.name)
    },
    doAddition:function(a,b){
        console.log(a+b)
    }
}
arto.greet()
// 对象创建后再分配方法
arto.growOlder = function(){
    this.age+=1
}
console.log(arto.age)
arto.growOlder()
console.log(arto.age)
// 添加doAddition方法
// 通过对象调用；或者在一个变量中存储方法引用，通过该变量调用该方法。
arto.doAddition(1,4)
const referenceToAddition=arto.doAddition
referenceToAddition(10, 15)
// 使用变量引用greet方法
// 通过引用调用方法时，该方法失去了对原始this的引用。
// 与其他语言相反，在JavaScript中，this的值是根据方法的调用方式定义的。
// 当通过引用调用方法时，this的值就变成了所谓的全局对象，最终的结果往往不是开发者最初的意图。
const referenceToGreet=arto.greet
referenceToGreet()
// 编写JavaScript代码时失去了对this的跟踪，带来了一些潜在的问题。
// 经常会出现这样的情况：React或Node（或者更确切地说，网络浏览器的JavaScript引擎）需要调用开发者定义的对象中的某些方法。
// 然而，在本课程中，我们通过使用 "this-less "的JavaScript来避免这些问题。
// 使用setTimeout函数设置超时来调用arto对象上的greet函数时，出现了一种导致this消失的情况。
// JavaScript中this的值是根据方法被调用的方式来定义的。当setTimeout在调用方法时，是JavaScript引擎在实际调用方法，此时，this是指全局对象。
setTimeout(arto.greet, 1000)
//有几种机制可以保留原来的this。其中之一是使用一个叫做bind的方法。
// 调用arto.greet.bind(arto)创建一个新的函数，其中this被绑定为指向Arto，与该方法被调用的地点和方式无关。
setTimeout(arto.greet.bind(arto), 1000)
// 使用箭头函数可以解决一些与this有关的问题。然而，它们不应该被用作对象的方法，因为那样的话this就完全不起作用了。

// 对象
// 在JavaScript中没有像面向对象编程语言中的类机制。然而，有一些功能可以使 "模拟 "面向对象的类成为可能。
class Person {
    constructor(name, age) {
        this.name=name
        this.age=age
    }
    greet() {
        console.log('hello, my name is ' + this.name)
    }
}
const adam = new Person('Adam Ondra', 35)
adam.greet()
const janja = new Person('Janja Garnbret', 22)
janja.greet()
// 当涉及到语法时，这些类和由它们创建的对象很容易让人联想到Java的类和对象。它们的行为也与Java对象相当相似。
// 在核心部分，它们仍然是基于JavaScript's prototypal inheritance的对象。
// 这两种对象的类型实际上都是Object，因为JavaScript基本上只定义了Boolean, Null, Undefined, Number, String, Symbol, BigInt, and Object。