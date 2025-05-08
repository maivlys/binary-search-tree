class Tree {
  constructor(arr) {
    this.root = buildTree(arr);
  }

  insert(value) {
    let currentNode = this.root;
    if (currentNode.data === value) {
      console.log("value already in the tree");
      return;
    }
    while (currentNode.data !== value) {
      if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(value);
          return;
        }
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = new Node(value);
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  find(value, toDelete = false) {
    let currentNode = this.root;

    while (currentNode.data !== value) {
      let direction = value < currentNode.data ? "left" : "right";

      if (currentNode[direction] === null) {
        console.log("value not in the tree");
        return null;
      } else if (currentNode[direction].data === value) {
        return toDelete ? currentNode : currentNode[direction];
      } else {
        currentNode = currentNode[direction];
      }
    }
    return currentNode;
  }

  deleteItem(value) {
    let parentNode = this.find(value, true);

    if (value === parentNode.data) {
      //delete root.data
      let nodeToReplace = parentNode.right;
      let prev = null;

      while (nodeToReplace.left !== null) {
        prev = nodeToReplace;
        nodeToReplace = nodeToReplace.left;
      }
      parentNode.data = nodeToReplace.data;
      prev.left = nodeToReplace.right;
      return;
    }
    let direction = value < parentNode.data ? "left" : "right";
    let nodeToDelete = parentNode[direction];

    if (nodeToDelete.left === null && nodeToDelete.right === null) {
      //node is a leaf
      parentNode[direction] = null;
      return;
    } else if (nodeToDelete.left === null || nodeToDelete.right === null) {
      //node has one child
      let childNode =
        nodeToDelete.left !== null ? nodeToDelete.left : nodeToDelete.right;
      parentNode[direction] = childNode;
      return;
    } else if (nodeToDelete.left !== null && nodeToDelete.right !== null) {
      //node has two children
      let nodeToReplace = nodeToDelete.right;
      let prev = null;

      while (nodeToReplace.left !== null) {
        prev = nodeToReplace;
        nodeToReplace = nodeToReplace.left;
      }

      if (prev === null) {
        //there is no left node to take the data from
        nodeToDelete.data = nodeToReplace.data;
        nodeToDelete.right = nodeToReplace.right;
        return;
      }

      parentNode.right.data = nodeToReplace.data;
      prev.left = null;

      return;
    }
  }

  levelOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback is required");
    }
    let queue = [this.root];
    while (queue.length > 0) {
      let current = queue.shift();
      callback(current);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  inOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback is required");
    }

    function traverse(node) {
      if (node === null) return;
      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    }
    traverse(this.root);
  }

  preOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback is required");
    }
    function traverse(node) {
      if (node === null) return;
      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
  }

  postOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback is required");
    }
    function traverse(node) {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      callback(node.data);
    }
    traverse(this.root);
  }

  height(value) {
    let valueNode = this.find(value);
    if (!valueNode) return null;

    const calculateHeight = (node) => {
      if (node === null) return -1;
      return (
        1 + Math.max(calculateHeight(node.left), calculateHeight(node.right))
      );
    };
    return calculateHeight(valueNode);
  }

  depth(value) {
    const calculateDepth = (node, depth = 0) => {
      if (node === null) return null;
      if (node.data === value) return depth;

      if (value < node.data) {
        return calculateDepth(node.left, depth + 1);
      } else {
        return calculateDepth(node.right, depth + 1);
      }
    };

    return calculateDepth(this.root);
  }

  isBalanced() {
    const calculateHeights = (node) => {
      if (node === null) return -1;
      return (
        1 + Math.max(calculateHeights(node.left), calculateHeights(node.right))
      );
    };
    let leftHeight = calculateHeights(this.root.left);
    let rightHeight = calculateHeights(this.root.right);

    console.log(leftHeight);
    console.log(rightHeight);

    if (Math.abs(leftHeight - rightHeight) <= 1) {
      return true;
    } else {
      return false;
    }
  }

  rebalance() {
    let arr = [];
    function traverse(node) {
      if (node === null) return;
      traverse(node.left);

      traverse(node.right);
      arr.push(node.data);
      return arr;
    }
    arr = traverse(this.root);
    this.root = buildTree(arr);
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function removeDuplicates(arr) {
  let newArr = [];
  newArr.push(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] !== arr[i]) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

function prepareArr(arr) {
  arr = arr.sort(function (a, b) {
    return a - b;
  });
  arr = removeDuplicates(arr);
  return arr;
}

function build(arr, start, end) {
  let mid = Math.floor((start + end) / 2);
  if (start > end) {
    return null;
  }
  let node = new Node(arr[mid]);
  node.left = build(arr, start, mid - 1);
  node.right = build(arr, mid + 1, end);
  return node;
}

function buildTree(arr) {
  arr = prepareArr(arr);
  return build(arr, 0, arr.length - 1);
}

//-------------------------------------------------
// const root = {
//   data: 5,
//   left: {
//     data: 3,
//     left: null,
//     right: null,
//   },
//   right: {
//     data: 8,
//     left: null,
//     right: null,
//   },
// };
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let myTree = new Tree([8, 3, 10, 1, 6, 14, 4, 7, 13]);

myTree.insert(16);
myTree.deleteItem(4);
myTree.insert(40);

prettyPrint(myTree.root);
console.log(myTree.isBalanced());
console.log(myTree.rebalance());
prettyPrint(myTree.root);
