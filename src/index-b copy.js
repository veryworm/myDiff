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
const myVnode = h('p', {}, '我是p标签')
patch(container, myVnode)