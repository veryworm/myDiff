import createElement from "./createElement";
import updateChildren from "./updateChildren";

export default function patchVnode(oldVnode, newVnode) {
  if (oldVnode === newVnode) return
  // 判断新结点中是否有text属性
  if (newVnode.text !== '' && (!newVnode.children || !newVnode.children.length)) {
    // console.log('新结点有text属性！');
    if (newVnode.text !== oldVnode.text) {
      // console.log('新结点老节点text属性相同！');
      oldVnode.elm.innerText = newVnode.text
    }
  } else {
    // console.log('newVnode中没有text属性（证明有children属性）');
    // 判断老结点是否有children属性，有的话就需要进行最复杂的情况计算。。
    if (oldVnode.children && oldVnode.children.length) {
      console.log(oldVnode, newVnode, 'oldannew');
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else { //老结点无children，新结点有children
      oldVnode.elm.innerText = ""
      for (let i = 0; i < newVnode.children.length; i++) {
        let ch = createElement(newVnode[i])
        oldVnode.elm.appendChild(ch)
      }
    }
  }
}