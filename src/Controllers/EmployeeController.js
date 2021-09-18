const repSquad = require('../Repositories/Squad')
const repEmployee = require('../Repositories/Employee')

module.exports = {
    create: async function (req, res) { //TODO check informed squad
        const employee = {
            name: req.body.name,
            email: req.body.email,
            squad: req.body.squad
        }
        let result = await repEmployee.create(employee)
        result ? res.status(201).json(employee) : res.json({ error: 'Failed to create a new employee' })
    },

    get: async function (req, res) {
        const emp = await repEmployee.find(req.params.id)
        emp ? res.json(emp) : res.json({ error: `Couldn't find the employee` })
    },

    delete: async function (req, res) {
        const employee = await repEmployee.find(req.params.id)
        if(employee.squad !== ""){
            const squad = await repSquad.findbyName(employee.squad)
            const pulledEmployee = await repSquad.removeEmployee(employee.id, squad.id)
            if(!pulledEmployee)
                res.json({error: 'Failed to delete the employee from squad'})
        }
        const deletedEmployee = repEmployee.deleteEmployee(employee.id)
        deletedEmployee ? res.json({success: 'Employee deleted'}) : res.json({error: 'Failed to delete the employee'})
    }
}