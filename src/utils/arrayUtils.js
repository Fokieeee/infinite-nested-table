const sortArray = (array) => {
  array.sort((a, b) => a.name.localeCompare(b.name))

  for (const item of array) {
    if (item.children && item.children.length > 0) {
      sortArray(item.children)
    }
  }
  return array
}

const addItemToArray = (array, newItem) => {
  if (newItem.level === 0) {
    array.push(newItem)
  } else {
    array.forEach((item) => {
      if (item.id === newItem.parentId) {
        if (!item.children) {
          item.children = []
        }
        item.children.push(newItem)
      } else if (item.children && item.children.length > 0) {
        addItemToArray(item.children, newItem)
      }
    })
  }
}

const flattenArray = (array) => {
  const flattenedArray = []

  const extractItems = (array) => {
    for (let item of array) {
      flattenedArray.push(item)

      if (item.children && item.children.length > 0) {
        extractItems(item.children)
      }
    }
  }

  extractItems(array)
  return flattenedArray
}

export { addItemToArray, sortArray, flattenArray }
