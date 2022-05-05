export default {
  get(name) {
    let temp = null
    let str = localStorage.getItem(name)
    try {
      temp = JSON.parse(str)
    } catch(e) {
      temp = str
    }
    return temp
  },
  remove(name) {
    localStorage.removeItem(name)
  },
  set(name, val) {
    localStorage.setItem(name, JSON.stringify(val))
  },
  add(name, addVal) {
    let oldVal = JSON.parse(localStorage.getItem(name))
    let newVal = oldVal.concat(addVal)
    localStorage.setItem(name, JSON.stringify(newVal))
  },
}
