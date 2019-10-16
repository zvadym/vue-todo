import uniqueId from '@/unique-id'

class BaseModel {
  constructor(data) {
    this.fields().forEach(field => {
      Object.defineProperty(this, field, {
        value:
          data[field] !== undefined
            ? data[field]
            : this.defaults()[field] !== undefined
            ? this.defaults()[field]
            : null,
        writable: false,
        enumerable: true
      })
    })
  }

  fields() {
    // return [...]
    throw 'Fields not defined'
  }

  guid() {
    return uniqueId()
  }
}
export class CardModel extends BaseModel {
  fields() {
    return ['id', 'title', 'owner', 'items', 'createdAt']
  }

  defaults() {
    return {
      id: this.guid(),
      title: 'TODO list',
      owner: null,
      items: [],
      createdAt: Date.now()
    }
  }
}

export class ItemModel extends BaseModel {
  fields() {
    return ['id', 'label', 'done', 'order']
  }

  defaults() {
    return {
      id: this.guid(),
      label: '...',
      done: false,
      order: 1
    }
  }
}
