// import BACKEND_HOST from "./host";
// const baseUrl = `${BACKEND_HOST}/api/notes`

// let token = null

const setToken = newToken => {
    // token = `bearer ${newToken}`
}

let blogs = [
    {
        id: 10000,
        content: 'This note is not saved to server',
        date: '2019-05-30T17:30:31.098Z',
        important: true
    }
]

const getAll = async () => {
    // const request = axios.get(baseUrl)
    // const nonExisting = {
    //     id: 10000,
    //     content: 'This note is not saved to server',
    //     date: '2019-05-30T17:30:31.098Z',
    //     important: true,
    // }
    // return request.then(response => response.data.concat(nonExisting))
    return blogs
}

const create = async newObject => {
    // const config = {
    //     headers: { Authorization: token }
    // }
    // const response = await axios.post(baseUrl, newObject, config)
    // return response.data
    const data = { ...newObject, id: Date.now() }
    blogs.concat(data)
    return data
}

const update = async (id, newObject) => {
    // const request = axios.put(`${baseUrl}/${id}`, newObject)
    // return request.then(response => response.data)
    const data = { ...newObject, id: id }
    blogs = blogs.map(blog => blog.id === id ? data : blog)
    return data
}

export default { getAll, create, update, setToken }