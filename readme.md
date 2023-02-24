# 手绘风格流程图

基于[LogicFlow](https://github.com/didi/LogicFlow)和[rough.js](https://github.com/rough-stuff/rough)实现的手绘风格流程图。

![1](https://cdn.jsdelivr.net/gh/towersxu/draft-flow@latest/packages/website/public/redis.png)

## 使用方法

```js
import LogicFlow from '@logicflow/core';
import RoughPlugin from 'lf-rough';

const lf = new LogicFlow({
  container: document.querySelector('#container'),
  width: 500,
  height: 500,
  plugins: [RoughPlugin],
});
lf.render({
  nodes: [
    {
      type: 'rough-database',
      x: 100,
      y: 100,
      text: '数据库',
    }
  ]
})
```