const axios = require('axios')
const url = 'http://localhost:3000'

async function getEmployee(empID) {
    const response = await axios.get(`${url}/employee/${empID}`)
    console.log(response.data)
}

async function createEmployee(empName, empEmail, empSquad) {
    const response = await axios.post(`${url}/employee/create`, {
        name: empName,
        email: empEmail,
        squad: empSquad
    })
    console.log(response.data);
}

async function deleteEmployee(empID) {
    const response = await axios.delete(`${url}/employee/${empID}`)
    console.log(response.data)
}

async function getSquad(squadID) {
    const response = await axios.get(`${url}/employee/${squadID}`)
    console.log(response.data)
}


async function createSquad(squadName, responsability) {
    const response = await axios.post(`${url}/squad/create`, {
        name: squadName,
        responsability: responsability
    })
    console.log(response.data);
}

async function recruitEmployee(empID, squadID) {
    const response = await axios.post(`${url}/squad/add`, {
        empId: empID,
        squadId: squadID
    })
    console.log(response.data);
}
