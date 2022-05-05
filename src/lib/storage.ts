export default class StorageFactory {
  private storage: any
  static get localStorage() {
    return new StorageFactory('local')
  }

  static get sessionStorage() {
    return new StorageFactory('session')
  }


  constructor(type: 'local' | 'session') {
    if (type === 'local') {
      this.storage = localStorage
    } else {
      this.storage = sessionStorage
    }
  }

  get(name: string) {
    let temp = null
    const str = this.storage.getItem(name)
    try {
      temp = JSON.parse(str || "")
    } catch (e) {
      temp = str
    }
    return temp
  }

  remove(name: string) {
    this.storage.removeItem(name)
  }

  set(name: string, val: any) {
    this.storage.setItem(name, JSON.stringify(val))
  }
}

