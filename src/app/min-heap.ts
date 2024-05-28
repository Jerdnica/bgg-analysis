export class MinHeap {
    private heap: Array<any>;
  
    constructor() {
      this.heap = [];
    }
  
    insert(edge: any): void {
      this.heap.push(edge);
      this.bubbleUp();
    }
  
    private bubbleUp(): void {
      let index = this.heap.length - 1;
      while (index > 0) {
        let element = this.heap[index];
        let parentIndex = Math.floor((index - 1) / 2);
        let parent = this.heap[parentIndex] as any;
  
        if (element.score >= parent.score) break;
  
        this.heap[index] = parent;
        this.heap[parentIndex] = element;
        index = parentIndex;
      }
    }
  
    extractMin() {
      if (this.heap.length === 0) return undefined;
  
      const min = this.heap[0];
      const end = this.heap.pop();
  
      if (this.heap.length > 0) {
        this.heap[0] = end;
        this.sinkDown(0);
      }
      return min;
    }
  
    private sinkDown(index: number): void {
      let length = this.heap.length;
      let element = this.heap[index];
      while (true) {
        let leftChildIndex = 2 * index + 1;
        let rightChildIndex = 2 * index + 2;
        let leftChild, rightChild;
        let swap = null;
  
        if (leftChildIndex < length) {
          leftChild = this.heap[leftChildIndex];
          if (leftChild.score < element.score) {
            swap = leftChildIndex;
          }
        }
        if (rightChildIndex < length) {
          rightChild = this.heap[rightChildIndex];
          if (
            (swap === null && rightChild.score < element.score) ||
            (swap !== null && rightChild.score < leftChild.score)
          ) {
            swap = rightChildIndex;
          }
        }
        if (swap === null) break;
        this.heap[index] = this.heap[swap];
        this.heap[swap] = element;
        index = swap;
      }
    }
  
    size(): number {
      return this.heap.length;
    }
  
    getMin(): any {
      return this.heap.length > 0 ? this.heap[0] : undefined;
    }
  }
  