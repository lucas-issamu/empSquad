const repSquad = require('../Repositories/Squad')
const repEmployee = require('../Repositories/Employee')

module.exports = {
    create: async function (req, res) {
        try {
            const employee = {
                name: req.body.name,
                email: req.body.email,
                squad: req.body.squad
            }
            if (!employee.name || !employee.email) //Check required name and email
                res.status(400).json({ error: 'Missing values to create a new employee' })
            else {
                let result = await repEmployee.create(employee)
                if (result['squad']) {
                    let squad = await repSquad.findbyName(result['squad']) ?? {}
                    let c_squad = await repSquad.addEmployee(result.id, squad.id) ?? await repSquad.create(result['squad'], "", result.id)
                }
                result ? res.status(201).json(result) : res.json({ error: 'Failed to create a new employee' })
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" })
        }
    },

    get: async function (req, res) {
        try {
            const emp = await repEmployee.find(req.params.id)
            emp ? res.json(emp) : res.json({ error: `Couldn't find the employee` })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" })
        }
    },

    delete: async function (req, res) {
        try {
            const employee = await repEmployee.find(req.params.id)
            if (employee.squad !== "") { //Check if the employee belongs to a squad
                const squad = await repSquad.findbyName(employee.squad) //Find the squad of the employee
                const pulledEmployee = await repSquad.removeEmployee(employee.id, squad.id) //pull employee from squad
                if (!pulledEmployee)
                    res.json({ error: 'Failed to delete the employee from squad' })
            }
            const deletedEmployee = repEmployee.deleteEmployee(employee.id)
            deletedEmployee ? res.json({ success: 'Employee deleted' }) : res.json({ error: 'Failed to delete the employee' })

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" })
        }
    }
}