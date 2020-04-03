export const createColumns = (array, totalColumns) => {
  let gridArray = [[]]

  let countColumns = 1

  if (array) {
    for (let i = 0; i < array.length; i++) {
      gridArray[gridArray.length - 1].push(array[i])
      if (countColumns <= totalColumns) {
        countColumns++
      }
      if (countColumns > totalColumns && i !== array.length - 1) {
        countColumns = 1
        gridArray.push([])
      }
    }
  }

  return gridArray
}
