import {
  init
} from 'snabbdom/build/init'
import {
  classModule
} from 'snabbdom/build/modules/class'
import {
  propsModule
} from 'snabbdom/build/modules/props'
import {
  styleModule
} from 'snabbdom/build/modules/style'
import {
  eventListenersModule
} from 'snabbdom/build/modules/eventlisteners'
import {
  h
} from 'snabbdom/build/h'
// import h from './mySnabbddom/h'

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule // attaches event listeners
])

const container = document.getElementById("container")
const btn = document.getElementById("btn")

// 同级同顺序节点值变化，会被diff算法。
// const myVnode = h('ul', {}, [
//   h('li', {}, 'A'),
//   h('li', {}, 'B'),
//   h('li', {}, 'C')
// ])
// patch(container,myVnode)
// const myVnode2 = h('ul', {}, [
//   h('li', {}, 'A'),
//   h('li', {}, 'BB'),
//   h('li', {}, 'C')
// ])

// 
const myVnode = h('ul', {}, [
  h('li', {key:'A'}, 'A'),
  h('li', {key:'B'}, 'B'),
  h('li', {key:'C'}, 'C')
])
patch(container,myVnode)
const myVnode2 = h('ul', {}, [
  h('li', {key:'D'}, 'D'),
  h('li', {key:'A'}, 'A'),
  h('li', {key:'B'}, 'B'),
  h('li', {key:'C'}, 'C')
])

btn.onclick = function () {
  patch(myVnode, myVnode2)
}
// patch(container,myVnode)