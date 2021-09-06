import patch from "./mySnabbddom/patch"
import h from './mySnabbddom/h'

const container = document.getElementById("container")
const btn = document.getElementById("btn")

// 同级同顺序节点值变化，会被diff算法。
const myVnode1 = h('ul', {}, [
  h('li', {}, [
    h('p', {}, 'p1'),
    h('span', {}, 'p4'),
    h('div', {}, 'p2'),
    h('span', {}, 'p3'),
  ]),
])
patch(container, myVnode1)
const myVnode2 = h('ul', {}, [
  h('li', {}, [
    h('p', {}, 'p3'),
    h('p', {}, 'p2'),
    h('p', {}, 'p1'),
    h('p', {}, 'p5'),
  ])
])
patch(myVnode1, myVnode2)

// 如果key值不绑定，那么新老结点子项比对都是命中规则1。所以每次都是将老结点中的值替换掉，数据量大的话非常影响性能。使用key值的话，如果新老结点一样，那么只是做一个更新。