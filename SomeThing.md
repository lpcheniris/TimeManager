1. fix  plan 给plan 添加两个字段 数据的时候  用了 findoneandupdate() 报错， 解决办法： a. 给添加的schema key  设置default 值 (解决办法：搜索增加知识点) b.default 的类型和tyoe不匹配 （纯属粗心）

2.moment().[function]  会把对象自身改变掉，不是函数式编程的思想  不用返回值返回结果

3.引入less less-loader 时报错  解决办法 降低less-loader 的版本号  原因 less-loader 的兼容性问题  尽可能引用最近更新的组件库

4. commons.9674860.js:2 TypeError: l.a.duration(...).timer is not a function  在windows 上遇到的问题