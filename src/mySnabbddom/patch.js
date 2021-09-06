import vnode from "./vnode"
import createElement from './createElement'
import patchVnode from './patchVnode'

export default function (oldVnode, newVnode) {
  // 如果是真实节点，将其包装为虚拟节点。
  if (!oldVnode.sel) {
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }
  // 判断新老元素是否为同一个节点
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    console.log('same');
    // 维护一个函数来进行递归
    patchVnode(oldVnode, newVnode)
  } else {
    console.log('删除旧的，插入新的');
    let newVnodeElm = createElement(newVnode)
    // 以父元素为准（parentNode），插入到老节点之前
    oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
  }
}