const Squad = require('../../Models/Squad')
const Employee = require('../../Models/Employee')

module.exports = {
    create: function (req, res) {
        const employee = new Employee({
            name: req.body.name,
            email: req.body.email,
            squad: req.body.squad
        });
        employee.save(function (err) {
            if (err)
                res.json({ error: 'Failed to create a new employee' })
            console.log(`Welcome ${employee.name}!`);
        })
        res.json(employee);
    },

    get: function (req, res) {
        Employee.findById(req.params.id)
            .lean().exec(function (err, employee) {
                if (err)
                    return console.error(err)
                try {
                    console.log(employee)
                } catch (error) {
                    console.log("Failed to find the user")
                    console.log(error)
                }
                finally {
                    if (employee)
                        res.json(employee)
                    else
                        res.json({ error: `Couldn't find the employee` })
                }
            })
    },

    delete: function (req, res) {
        Employee.findById(req.params.id).exec(function (err, emp) { //Get the employee
            if (err || !emp)
                res.json({error: 'Employee not found'})
            console.log(`Employee found: ${emp.name}`);
            if (emp.squad != "") { //Check the squad
                Squad.findOne({ name: emp.squad }, function (err, squad) { //Get the squad of the employee
                    if (err || !squad)
                        res.json({error: 'Failed to find the squad of the employee'})
                    console.log(`Got this squad: ${squad['_id']} with the name ${squad['name']}`)
                    Squad.updateOne({ _id: squad['_id'] }, { $pull: { members: { $in: [emp._id] } } }).exec() //delete from squad
                    res.json({success: 'Employee deleted'})
                })
            }
        })

        Employee.deleteOne({ _id: req.params.id }, function (err, result) { //Delete employee
            if (err)
                return console.error(err)
            if (result["deletedCount"] == 1) {
                res.json({success: 'Employee Deleted'})
            }
            else {
                res.json({error: 'Employee not found'})
            }
        })
    }
}