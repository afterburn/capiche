const express = require('express')

class CAPI {
  constructor (context = {}) {
    this.context = context
    this.app = express()
  }

  use (middleware) {
    this.app.use(middleware)
  }

  get () {
    const args = Array.from(arguments)
    const path = args[0]
    if (args.length === 2) {
      const listener = args[1]
      this.app.get(path, (req, res) => listener(this.context, req, res))
    } else {
      const middleware = args.slice(1, args.length - 1)
      const listener = args[args.length - 1]
      this.app.get(path, ...middleware, (req, res) => listener(this.context, req, res))
    }
  }

  post () {
    const args = Array.from(arguments)
    const path = args[0]
    if (args.length === 2) {
      const listener = args[1]
      this.app.post(path, (req, res) => listener(this.context, req, res))
    } else {
      const middleware = args.slice(1, args.length - 1)
      const listener = args[args.length - 1]
      this.app.post(path, ...middleware, (req, res) => listener(this.context, req, res))
    }
  }

  listen (port, callback = () => {}) {
    this.app.listen(port, () => callback())
  }
}


module.exports = (context) => {
  return new CAPI(context)
}