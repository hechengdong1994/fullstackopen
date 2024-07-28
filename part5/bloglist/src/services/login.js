const login = async credentials => {
  if (credentials.username === 'wrong') {
    throw new Error('wrong user')
  } else {
    return { username: credentials.username, token: '111' }
  }
}

export default { login }