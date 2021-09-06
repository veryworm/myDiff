// 把虚拟DOM变为真实DOM
// 判断text与child属性不能共存
// 判断是否为文字
// 对DOM的child进行递归，然后把child插入到父元素真实DOM中
// 将最外层元素返回
export default function createElement(vnode) {
  console.log('用来把虚拟DOM变为真实DOM');
  let domNode = document.createElement(vnode.sel)
  // 判断是否为文字
  if (vnode.text !== "" && !vnode.children) {
    domNode.innerText = vnode.text
  } else if (Array.isArray(vnode.children) && vnode.children.length) {
    for (let i = 0; i < vnode.children.length; i++) {
      let ch = vnode.children[i]
      let chNode = createElement(ch)
      domNode.appendChild(chNode) //真正上树操作
    }
  }
  vnode.elm = domNode
  return domNode
}

// const myVnode2 = h('ul', {}, [
//   h('li', {}, 'A'),
//   h('li', {}, 'BB'),
//   h('li', {}, 'C')
// ])

















// let domNode = document.createElement(vnode.sel)
// if (vnode.text !== "" && (vnode.children === undefined || !vnode.children.length)) {
//   domNode.innerText = vnode.text
// } else if (Array.isArray(vnode.children) && vnode.children.length) {
//   for (let i = 0; i < vnode.children.length; i++) {
//     let ch = vnode.children[i]
//     let chDom = createElement(ch)
//     domNode.appendChild(chDom)
//   }
// }
// vnode.elm = domNode
// return vnode.elm