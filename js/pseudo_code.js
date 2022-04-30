const pseudo_code = {
  bubble_sort: [
    "do",
    "   for i = 1 to indexOfLastUnsortedElement-1",
    "       if leftElement > rightElement",
    "           swap(leftElement, rightElement)",
    "while swapped"
  ],
  selection_sort: [
    "Repeat (numOfElements - 1) times",
    "   Set the first unsorted element as the minimum",
    "   for each of the unsorted elements",
    "       if element < currentMinimum",
    "           Set element as new minimum",
    "   Swap minimum with first unsorted position"
  ],
  insertion_sort: [
    "Mark first element as sorted",
    "for each unsorted element X",
    "   Extract the element X",
    "   for j = lastSortedIndex down to 0",
    "       if current element j > X",
    "           move sorted element to the right by 1",
    "       break loop and insert X here"
  ],
  merge_sort: [
    "Split each element into partitions of size 1",
    "Recursively merge adjacent partitions",
    "   for i = leftPartIdx to rightPartIdx",
    "       if leftPartHeadValue <= rightPartHeadValue",
    "           copy leftPartHeadValue",
    "       else: copy rightPartHeadValue; Increase InvIdx",
    "Copy elements back to original array"
  ],
  quick_sort: [
    "for each (unsorted) partition",
    "set first element as pivot",
    "   storeIndex = pivotIndex+1",
    "   for i = pivotIndex+1 to rightmostIndex",
    "       if ((a[i] < a[pivot]) or (equal but 50% lucky))",
    "           swap(i, storeIndex)",
    "           ++storeIndex",
    "   swap(pivot, storeIndex-1)"
  ],
  heap_sort: [
    "HeapSort(A)",
    "    BuildMaxHeap(A)",
    "    for i = length[A] downto 2",
    "       do swap A[1] with A[i]",
    "           heap-size[A] = heap-size[A] – 1",
    "           MaxHeapify(A, 1)",
    "end func",
    "BuildMaxHeap(A)",
    "   heap-size[A] = length[A]",
    "   for i = |length[A]/2| downto 1",
    "        do MaxHeapify(A, i)",
    "end func",
  ]
}

function addPsuedoCode(algoName) {
  const currentPseudoCode = pseudo_code[algoName]
  psuedo_code_container.innerHTML = ""
  currentPseudoCode.forEach((line, index) => {
    // psuedo_code_container
    const div = document.createElement("div")
    div.classList.add("line")
    div.id = `line${index + 1}`
    div.innerHTML = `
      <span class="line_number">${index + 1}.</span>
      ${line.replaceAll(" ", "&nbsp;")}`
    psuedo_code_container.appendChild(div)
  })
}

function highlightLine(payload) {
  const lineNumbers = Object.keys(payload).map(Number)
  const allLines = document.querySelectorAll(".line")
  allLines.forEach((line, index) => {
    if (lineNumbers.includes(index + 1)) {
      line.classList.add("highlighted_line")
      line.style.backgroundColor = payload[index + 1]
    } else {
      line.classList.remove("highlighted_line")
      line.style.backgroundColor = "unset"
    }
  })
}