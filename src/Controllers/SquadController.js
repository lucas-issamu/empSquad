const repSquad = require('../Repositories/Squad')
const repEmployee = require('../Repositories/Employee')

const createSquad = async function (req, res) {
    try {
        const squad = {
            name: req.body.name,
            responsability: req.body.responsability,
            member: req.body.member
        }
        if (!squad.name) //Check input for name
            res.status(400).json({ error: 'Name of squad is required' })
        else {
            let result = await repSquad.create(squad)
            console.log(result)
            result ? res.status(201).json(squad) : res.json({ error: 'Failed to create a new squad' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

const getSquad = async function (req, res) {
    try {
        const squad = await repSquad.find(req.params.id)
        squad ? res.json(squad) : res.json({ error: `Couldn't find the employee` })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

const addEmployeeToSquad = async function (req, res) {
    try {
        const userSquad = { //Get the IDs to add
            empId: req.body.empId,
            squadId: req.body.squadId
        }
        if (!userSquad.empId || !userSquad.squadId) { //Check inputs
            res.status(400).json({ error: 'Missing values to execute method' })
        }
        else {
            const employee = await repEmployee.find(userSquad.empId)
            const squad = await repSquad.find(userSquad.squadId)
            if (employee.squad || !squad) { //Check if the employee belongs to a squad
                res.json({ error: 'Failed to add a employee to a new squad' })
            }
            else { //Try to add the employee to a new squad
                const addRes = await repSquad.addEmployee(employee.id, squad.id)
                const updateRes = await repEmployee.addSquad(employee.id, squad.name)
                if (addRes && updateRes)
                    res.json(updateRes)
                else
                    res.json({ error: 'Failed to add a employee to a new squad' })
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {
    createSquad,
    getSquad,
    addEmployeeToSquad
}