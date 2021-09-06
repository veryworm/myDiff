import createElement from "./createElement";
import patchVnode from "./patchVnode";

function isSameNode(a, b) {
  return a.sel === b.sel && a.key === b.key
}

export default function updateChildren(parentElm, oldch, newch) {
  let oldStartIdx = 0;
  let oldEndIdx = oldch.length - 1;
  let oldStartVnode = oldch[oldStartIdx];
  let oldEndVnode = oldch[oldEndIdx];
  let newStartIdx = 0;
  let newEndIdx = newch.length - 1;
  let newStartVnode = newch[newStartIdx];
  let newEndVnode = newch[newEndIdx];
  let keyMap = null;
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 略过undefined的项
    if (!oldStartVnode || !oldch[oldStartIdx]) {
      oldStartVnode = oldch[++oldStartIdx]
    } else if (!oldEndVnode || !oldch[oldEndIdx]) {
      oldEndVnode = oldch[--oldEndIdx]
    } else if (!newStartVnode || !newch[newStartIdx]) {
      newStartVnode = newch[++newStartIdx]
    } else if (!newEndVnode || !newch[newEndIdx]) {
      newEndVnode = newch[--newEndIdx]
    } else if (isSameNode(oldStartVnode, newStartVnode)) {
      console.log('命中1：新前与旧前');
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldch[++oldStartIdx]
      newStartVnode = newch[++newStartIdx]
    } else if (isSameNode(oldEndVnode, newEndVnode)) {
      console.log('命中2：新后与旧后');
      patchVnode(oldEndVnode, newEndVnode)// 进行结点比较
      oldEndVnode = oldch[--oldEndIdx]
      newEndVnode = newch[--newEndIdx]
    } else if (isSameNode(oldStartVnode, newEndVnode)) { // 顺序替换：将老结点移动到旧后的后面。
      console.log(oldStartVnode, newEndVnode, 'inner');
      console.log('命中3：新后与旧前');
      patchVnode(oldStartVnode, newEndVnode)// 进行结点比较。
      parentElm.insertBefore(oldStartVnode.elm, oldStartVnode.elm.nextsibling)
      oldStartVnode = oldch[++oldStartIdx]
      newEndVnode = newch[--newEndIdx]
    } else if (isSameNode(newStartVnode, oldEndVnode)) {
      console.log('命中4：新前与旧后');// 进行结点比较。
      patchVnode(newStartVnode, oldEndVnode)
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)// 顺序替换：将老结点移动到旧前的前面。
      oldEndVnode = oldch[--oldEndIdx]
      newStartVnode = newch[++newStartIdx]
    } else {
      // 四种情况都没有找到
      // 制作keyMap一个映射对象，这样每次就不用都遍历老对象了。
      if (!keyMap) {
        keyMap = {}
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          let key = oldch[i].key
          if (key !== undefined) {
            keyMap[key] = i
          }
        }
      }
      let idxInOld = keyMap[newStartVnode.key]
      if (idxInOld === undefined) { // 1.idxInOld为undefined就代表是新节点，在老节点中不存在，所以需要将它转换成真实DOM那移动它的位置到旧前前面
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      } else { // 2.idxInOld不为undefined就代表老节点中已经存在，那直接移动它的位置到旧前前面
        let elmToMove = oldch[idxInOld]
        // 把这项设置为undefined，表示已经处理完这项了。
        patchVnode(elmToMove, newStartVnode)
        oldch[idxInOld] = undefined;
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
      }
      newStartVnode = newch[++newStartIdx]
    }
  }
  // 当while条件结束有几种可能性：
  // 1.新children已结束，但旧children还未结束，表示要进行旧children的删除。例如以下表示：
  // 旧 ：1,2,3,4，5 新：1,2，3
  // 2.新children未结束，但旧children已结束，表示要进行旧children的增加。
  // 新：1,2，3 旧 ：1,2,3,4，5 
  if (newStartIdx <= newEndIdx) {
    console.log('新结点还有剩余结点没处理，要加项');
    // before:标杆元素
    let before = !oldch[oldStartIdx] ? null : oldch[oldStartIdx].elm
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // insertBefore的第二个参数如果为null，和appendChild意思一样。如果不是null，就将元素插入到标杆元素前面
      parentElm.insertBefore(createElement(newch[i]), before)
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log('旧结点中还有剩余结点未处理，要减项');
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldch[i]) {
        parentElm.removeChild(oldch[i].elm)
      }
    }
  }
}