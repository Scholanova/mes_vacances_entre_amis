class ResourceNotFoundError extends Error {
  constructor (value) {
    super(value)
  }
}

class LoginError extends Error{
  constructor(value)
  {
    super(value)
  }
}

module.exports = {
  ResourceNotFoundError,
  LoginError
}
