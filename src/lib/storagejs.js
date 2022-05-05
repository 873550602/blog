import {encryption,decryption} from '@/assets/lib/base64'
import constList from '@/assets/const'
export default {
  get(name) {
    let temp = null
    let data = sessionStorage.getItem(name)
    try {
      temp = JSON.parse(data)
    } catch(e) {
      temp = data
    }
    return temp
  },
  remove(name) {
    sessionStorage.removeItem(name)
  },
  set(name, val) {
    sessionStorage.setItem(name, JSON.stringify(val))
  },
  add(name, addVal) {
    let oldVal = JSON.parse(sessionStorage.getItem(name))
    let newVal = oldVal.concat(addVal)
    sessionStorage.setItem(name, JSON.stringify(newVal))
  },
  getInfo() {
    return JSON.parse(sessionStorage.getItem(constList.USER_INFO))
  },
  getId() {
    var string = 'id';
    var id = encryption(string);
    var uid = JSON.parse(sessionStorage.getItem(id));
    var decodedString = decryption(uid);
    return parseInt(decodedString);
  }
}
