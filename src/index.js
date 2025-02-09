import { Tree, prettyPrint } from './binarySearchTree';

const scrambledArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log("Original Array:", scrambledArray);
const noChangeCallback = (node) => node;
const addOneCallback = (node) => node + 1;
  
// Create a tree
const tree = new Tree(scrambledArray);
console.log("Initial Tree:");
prettyPrint(tree.root);

console.log("Is tree balanced?", tree.isBalanced());

// Print traversals
console.log("Level Order Traversal:");
console.log(tree.levelOrder(noChangeCallback));

console.log("In-Order Traversal with no change:");
console.log(tree.inOrder(noChangeCallback));

console.log("In-Order Traversal with +1 callback function:");
console.log(tree.inOrder(addOneCallback));

console.log("Pre-Order Traversal:");
console.log(tree.preOrder(noChangeCallback));

console.log("Post-Order Traversal:");
console.log(tree.postOrder(noChangeCallback));

// Unbalance the tree
console.log("Adding large values to unbalance the tree...");
[101, 105, 110].forEach(value => tree.insert(value));
console.log("Is tree balanced after adding values?", tree.isBalanced());

// Rebalance the tree
tree.rebalance();
console.log("Tree rebalanced.");
console.log("Is tree balanced after rebalance?", tree.isBalanced());

// Print traversals again after rebalancing
console.log("Level Order Traversal After Rebalancing:");
console.log(tree.levelOrder(noChangeCallback));

//Testing height and depth functions
console.log('Height of root:');
console.log(tree.height(tree.root));

console.log('Depth of root:');
console.log(tree.depth(tree.root));

//Final touches
console.log("In-Order Traversal After Rebalancing:");
tree.inOrder(noChangeCallback);

console.log('Final tree:');
prettyPrint(tree.root);
