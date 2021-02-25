1. fix  plan 给plan 添加两个字段 数据的时候  用了 findoneandupdate() 报错， 解决办法： a. 给添加的schema key  设置default 值 (解决办法：搜索增加知识点) b.default 的类型和tyoe不匹配 （纯属粗心）
