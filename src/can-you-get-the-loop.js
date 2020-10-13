function loop_size(node) {
  let currentNode = node;
  let nodes = [currentNode];
  let startIndex = 0;
  while (currentNode.next) {
    startIndex = nodes.indexOf(currentNode.next);
    if (startIndex != -1) {
      break;
    }
    nodes.push(currentNode.next);
    currentNode = currentNode.next;
  }
  if (startIndex >= 0) {
    return nodes.length - startIndex;
  }
  return 0;
}

// let node1 = { name: 1, next: undefined };
// let node2 = { name: 2, next: undefined };
// let node3 = { name: 3, next: undefined };
// let node4 = { name: 4, next: undefined };
// let node5 = { name: 5, next: undefined };
// node1.next = node2;
// node2.next = node3;
// node3.next = node4;
// node4.next = node5;
// node5.next = node3;
// console.log(loop_size(node1));
