当一切工作正常时，TypeScript将帮助我们捕捉以下错误。
1.试图向组件传递一个额外/不需要的prop
2.忘记向组件传递一个必要的prop
3.传递错误类型的prop给一个组件
如果我们犯了这些错误，TypeScript可以帮助我们立即在编辑器中发现它们。


使用create-react-app来创建一个TypeScript应用，在其中添加一个template
npx create-react-app my-app --template typescript


tsconfig.json文件：
选项现在已经键入了lib，其中包括例如浏览器API's类型的项目。
除了目前配置允许编译JavaScript文件外，其他一切都应该差不多了，因为allowJs被设置为true。
如果你需要混合使用TypeScript和JavaScript（例如，如果你正在将一个JavaScript项目转化为TypeScript或类似的东西），那会很好。


在.eslintrc中配置eslint:
由于基本上所有React组件的返回类型都是JSX.Element或null，我们通过禁用explicit-function-return-type和explicit-module-boundary-types的规则，将默认的linting规则放宽一点。
现在我们不需要到处明确说明我们的函数返回类型。我们也将禁用react/react-in-jsx-scope，因为不再需要在每个文件中导入React了。

需要让我们的linting脚本解析*.tsx文件，这是相当于react's JSX文件的TypeScript。


在大多数情况下，你可以使用type或interface，无论你喜欢哪种语法。然而，有几件事需要注意。
例如，如果你定义了多个同名的接口，它们将产生一个合并的接口，而如果你试图定义多个同名的类型，将导致一个错误，说明同名的类型已经被声明。
TypeScript文档建议在大多数情况下使用接口。