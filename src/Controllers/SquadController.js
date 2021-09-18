const repSquad = require('../Repositories/Squad')
const repEmployee = require('../Repositories/Employee')

module.exports = {
    create: async function (req, res) {
        const squad = {
            name: req.body.name,
            responsability: req.body.responsability,
            member: req.body.member
        }
        let result = await repSquad.create(squad)
        console.log(result)
        result ? res.status(201).json(squad) : res.json({ error: 'Failed to create a new squad' })
    },

    get: async function (req, res) {
        const squad = await repSquad.find(req.params.id)
        squad ? res.json(squad) : res.json({ error: `Couldn't find the employee` })
    },

    addEmployee: async function (req, res) {
        const userSquad = { //Get the IDs to add
            empId: req.body.empId,
            squadId: req.body.squadId
        }
        const employee = await repEmployee.find(userSquad.empId)
        const squad = await repSquad.find(userSquad.squadId)
        if (employee.squad || !squad) {
            res.json({ error: 'Failed to add a employee to a new squad' })
        }
        else {
            const addRes = await repSquad.addEmployee(employee.id, squad.id)
            const updateRes = await repEmployee.addSquad(employee.id, squad.name)
            if (addRes && updateRes)
                res.json(updateRes)
            else
                res.json({ error: 'Failed to add a employee to a new squad' })
        }
    }
}