const pseudo_code = {
  bubble_sort: [
    "do",
    "   swapped = false",
    "   for i = 1 to indexOfLastUnsortedElement-1",
    "       if leftElement > rightElement",
    "           swap(leftElement, rightElement)",
    "           swapped = true; ++swapCounter",
    "while swapped"
  ],
  selection_sort: [
    "repeat (numOfElements - 1) times",
    "   set the first unsorted element as the minimum",
    "   for each of the unsorted elements",
    "       if element < currentMinimum",
    "           set element as new minimum",
    "   swap minimum with first unsorted position"
  ],
  insertion_sort: [
    "mark first element as sorted",
    "for each unsorted element X",
    "   'extract' the element X",
    "   for j = lastSortedIndex down to 0",
    "       if current element j > X",
    "           move sorted element to the right by 1",
    "       break loop and insert X here"
  ],
  merge_sort: [
    "split each element into partitions of size 1",
    "recursively merge adjacent partitions",
    "   for i = leftPartIdx to rightPartIdx",
    "       if leftPartHeadValue <= rightPartHeadValue",
    "           copy leftPartHeadValue",
    "       else: copy rightPartHeadValue; Increase InvIdx",
    "copy elements back to original array"
  ],
  quick_sort: [
    "for each (unsorted) partition",
    "set first element as pivot",
    "   storeIndex = pivotIndex+1",
    "   for i = pivotIndex+1 to rightmostIndex",
    "       if ((a[i] < a[pivot]) or (equal but 50% lucky))",
    "           swap(i, storeIndex); ++storeIndex",
    "   swap(pivot, storeIndex-1)"
  ],
  heap_sort: [
    "MaxHeapify(A, i)",
    "   l = left(i)",
    "   r = right(i)",
    "   if l <= heap-size[A] and A[l] > A[i]",
    "       then largest = l",
    "   else largest = i",
    "   if r <= heap-size[A] and A[r] > A[largest]",
    "        then largest = r",
    "   if largest != i",
    "       then swap A[i] with A[largest]",
    "       MaxHeapify(A, largest)",
    "end func",
    "BuildMaxHeap(A)",
    "   heap-size[A] = length[A]",
    "   for i = |length[A]/2| downto 1",
    "        do MaxHeapify(A, i)",
    "end func",
    "HeapSort(A)",
    "    BuildMaxHeap(A)",
    "    for i = length[A] downto 2",
    "       do swap A[1] with A[i]",
    "           heap-size[A] = heap-size[A] – 1",
    "           MaxHeapify(A, 1)",
    "end func"
  ]
}