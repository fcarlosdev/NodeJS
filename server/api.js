const fs = require('fs');

let pathFile = "./db/app_db.json";

const readData = () => {
    try {
        return fs.readFileSync(pathFile)
    } catch(err) {
        console.error("Error: " + err)
    }
}

const writeData = data => {
    fs.writeFile(pathFile,data, err => {         
        if (err) {
            console.error(err)
            return false
        }
        return true
    })
}

const getUsers = () => {
    return readData()
} 

const getUser = (id) => {    
    let users = JSON.parse(usrers)
    let user = users.filter(u => u.id === Number.parseInt(id))
    return JSON.stringify(user)
}

const addUser = newUser => {
    let users = JSON.parse(getUsers())    
    newUser.id = (users.length+1)
    users.push(newUser)
    return writeData(JSON.stringify(users))
}

const removeUser = id => {
    let users = JSON.parse(getUsers()).filter(u => u.id !== Number.parseInt(id))
    return writeData(JSON.stringify(users))
}

const updateUser = ([id,updatedName]) => {
    let users = JSON.parse(getUsers())
    if (users.length === 0) {
        return false    
    }
    
    let updatedUsers = users.map(u => {
        return (u !== null && u.id === Number.parseInt(id)) ? 
            {id, name:updatedName.replace(/%22|%20/g," ")} : u;
    })
    return writeData(JSON.stringify(updatedUsers))
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    removeUser,
    updateUser
}