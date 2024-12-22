
const formRules = [
  value => {
    if (value) return true
    return `${fieldName} Name is required`
  }
]