import { mergeSort } from "./sort";

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array, 0, (array.length - 1));
    }

    //function to remove duplicates from initial array 
    removeDuplicates(array) {
        return array.filter((item, index) => array.indexOf(item) === index);
    }

    buildTree(array, startIndex, endIndex) {
        //clean array
        let sortedArray = mergeSort(array);
        let filteredArray = this.removeDuplicates(sortedArray);

        const builder = (array, startIndex, endIndex) => {
            if(startIndex > endIndex) {
                return null;
            }
            const mid = Math.floor((startIndex + endIndex) / 2);
            const root = new Node(array[mid]);
            root.left = builder(array, startIndex, mid-1);
            root.right = builder(array, mid+1, endIndex);
            return root;
        };

        return builder(filteredArray, 0, filteredArray.length - 1);
    }

    insert(value) {
        let newNode = new Node(value);

        if(this.root === null) {
            this.root = newNode;
            return true;
        }

        let current = this.root;
        while(current) {
            if (current.value === newNode.value) {
                console.log('Value already in tree');
                return false; //stops insertion of duplicate value
            }
            
            if (current.value > newNode.value) {
                if(current.left === null) {
                    current.left = newNode;
                    return true;
                } else {
                    current = current.left;
                }
            } else if (current.value < newNode.value) {
                if(current.right === null) {
                    current.right = newNode;
                    return true;
                } else {
                    current = current.right;
                }
            }      
        }
    }

    deleteItem(value) {
        const findMin = (node) => {
            while(node.left !== null) {
                node = node.left;
            }
            return node;
        }

        const deleteHelper = (currentNode, value) => {
            if(currentNode === null) {
                return null;
            }
            //checks to see if desired value is less than current value
            //if it is, we must go to the left side of the tree
            if(currentNode.value > value) {
                currentNode.left = deleteHelper(currentNode.left, value);
            //checks to see if desired value is greater than current value
            //if it is, we must go down the right side of the tree
            } else if (currentNode.value < value) {
                 currentNode.right = deleteHelper(currentNode.right, value)
            //if neither of the above are true, we know that current node is the desired value
            } else {
                //checks to see if both children are null
                if(currentNode.left === null && currentNode.right === null) {
                    return null;
                } 
                
                //if it goes through first test, we know that at least one isn't null, so we check left first
                else if (currentNode.left === null) {
                    return currentNode.right;
                //now we check if right is null
                } else if (currentNode.right === null) {
                    return currentNode.left;
                //if we get to here, we know that none of the children are null
                } else {
                    //run function that scales down the right side of the tree, finding the furthest left value
                    let minNode = findMin(currentNode.right);
                    //sets current value to be the value of the next highest value in the tree
                    currentNode.value = minNode.value;
                    //deletes the next highest value, that we just swapped to the spot of the deleted node
                    currentNode.right = deleteHelper(currentNode.right, minNode.value);
                }
            }
            return currentNode;
        }
        //starts the delete function from the root, deleting the specified value
        this.root = deleteHelper(this.root, value);
    }

    find(value) {
        let currentNode = this.root;
        //returns null if tree is empty
        if(currentNode === null) {
            console.log('Tree is empty')
            return null;
        }

        //searches tree while current node isn't null
        while(currentNode !== null) {
            // returns null if value is found
            if(currentNode.value === value) {
                return currentNode;
            //goes down right tree if value is bigger
            } else if (value > currentNode.value) {
                currentNode = currentNode.right;
            //goes down left tree if value is smaller
            } else if (value < currentNode.value) {
                currentNode = currentNode.left;
            }
        }
        //returns null if value isn't found
        console.log('Value not found in tree.');
        return null;
    }

    levelOrder(callback) {
        if(!callback) {
            console.log('Function LevelOrder requires a callback function.');
            return null;
        }
        if(this.root === null) {
            console.log('Tree is empty');
            return null;
        }
        let queue = [];
        let levelOrderArray = [];

        queue.push(this.root);
        //while queue is not empty
        while(queue.length > 0) {
            let current = queue[0];
            levelOrderArray.push(callback(current.value));
            if(current.left !== null) {
                queue.push(current.left);
            }
            if(current.right !== null) {
                queue.push(current.right);
            }
            queue.shift();
        }
        return levelOrderArray;
    }

    //function to traverse array in preorder (root, left, right) fashion, applying a callback to each
    //we will log the root of the tree, then the entire left side of the tree, then the right side of the tree
    preOrder(callback) {
        //ensure a callback function is passed in
        if(!callback) {
            console.log('Function preorder requires a callback function.');
            return null;
        }
        //ensure that the tree isn't empty
        if(this.root === null) {
            console.log('Tree is empty.');
            return null;
        }
        //establish preOrder array for results
        let preOrderArray = [];
        
        //helper function for recursion
        const preOrderHelper = (node) => {
            //if node is null, we want to return to the node we just left
            if(node === null) {
                return;
            }
            //we start on the root and we use the callback function on it and add it to the array
            preOrderArray.push(callback(node.value));
            //we then go to the left node
            preOrderHelper(node.left);
            //then we will deal with the right node
            preOrderHelper(node.right);
            //this will result in us logging the root, going to the left child, logging that node, and so on until 
            //we hit the end of the tree scaling only left nodes, we will then scale the right side of each node as we
            //traverse back up to the initial root, before heading to the right side of the tree, where we will traverse
            //down the left side of the right tree, logging each node on the way down, before coming back up and logging
            //the rights on the way up
        }
        //we call our helper function on the root of the tree, and the return the array that it produces
        preOrderHelper(this.root);
        return preOrderArray;
    }
    //this is the same as the preoder function, except the order is (left node, root node, right node)
    //we will go down to the furthest left node, before traversing back up to log root nodes and right nodes
    //this will log the entire left side of the tree, then the root of the tree, then the right side of the tree
    inOrder(callback) {
        if(!callback) {
            console.log('Function inorder requires a callback function.');
            return null;
        }
        if(this.root === null) {
            console.log('Tree is empty.');
            return null;
        }
        let inOrderArray = [];
        
        const inOrderHelper = (node) => {
            if(node === null) {
                return;
            }
            inOrderHelper(node.left);
            inOrderArray.push(callback(node.value));
            inOrderHelper(node.right);
        }
        inOrderHelper(this.root);
        return inOrderArray;
    }

    //this is the same as the preoder function, except the order is (left node, right node, root node)
    //we will go down to the furthest left node, before traversing back up to log right nodes and only once a nodes
    //left and right children are both logged will it be logged
    //this will log the entire left side of the tree, then the entire right side of the tree
    //then the root node of the tree last
    postOrder(callback) {
        if(!callback) {
            console.log('Function postorder requires a callback function.');
            return null;
        }
        if(this.root === null) {
            console.log('Tree is empty.');
            return null;
        }
        let postOrderArray = [];
        
        const postOrderHelper = (node) => {
            if(node === null) {
                return;
            }
            postOrderHelper(node.left);
            postOrderHelper(node.right);
            postOrderArray.push(callback(node.value));
        }
        postOrderHelper(this.root);
        return postOrderArray;
    }

    //this is the same function as find, but it will instead return a count of how many steps it took to get to the node
    depth(node) {
        let currentNode = this.root;
        let depth = 0;
        //returns null if tree is empty
        if(currentNode === null) {
            console.log('Tree is empty')
            return null;
        }

        //searches tree while current node isn't null
        while(currentNode !== null) {
            // returns null if value is found
            if(currentNode.value === node.value) {
                return depth;
            //goes down right tree if value is bigger
            } else if (node.value > currentNode.value) {
                currentNode = currentNode.right;
                depth++;
            //goes down left tree if value is smaller
            } else if (node.value < currentNode.value) {
                currentNode = currentNode.left;
                depth++;
            }
        }
        //returns null if value isn't found
        console.log('Node not found in tree.');
        return null;
    }

    height(node) {
        if(this.root === null) {
            console.log('Tree is empty.');
            return;
        }
        
        const heightHelp = (node) => {
            //empty node has height of -1
            if(node === null) {
                return -1;
            } else {
                //calls function recursively on left and right children
                const leftTreeHeight = heightHelp(node.left);
                const rightTreeHeight = heightHelp(node.right);
                //returns the height of the largest branch going down from that node.
                return Math.max(leftTreeHeight, rightTreeHeight) + 1;
            }
        }
        //calls function on the given node (generally this would be called on the root)
        return heightHelp(node);
    }

    isBalanced() {
        if(this.root === null) {
            console.log('Tree is empty');
            return true; //empty tree is technically balanced
        }

        const balanceHelper = (node) => {
            if(node === null) {
                return true; //empty node is considered balanced
            }

            //establishes height of left and right trees
            const leftTreeHeight = this.height(node.left);
            const rightTreeHeight = this.height(node.right);

            //determines absolute value of the difference between the trees
            //if this is greater than 1, they are unbalanced
            if(Math.abs((leftTreeHeight - rightTreeHeight) > 1)) {
                return false;
            }
            //calls function recursively on the left and right nodes
            return balanceHelper(node.left) && balanceHelper(node.right);
        }
        //calls function on the root of the tree to return result for the tree
        return balanceHelper(this.root);
    }

    rebalance() {
        const noChange = (node) => node;
        let balanceArray = this.inOrder(noChange);
        this.root = this.buildTree(balanceArray, 0, balanceArray.length - 1);
    }

}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

export { Tree, prettyPrint };