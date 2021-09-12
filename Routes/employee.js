const express = require('express')
const Squad = require('../Models/Squad')
const Employee = require('../Models/Employee')
const router = express.Router()

router.post("/create", (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        squad: req.body.squad
    });
    employee.save(function (err) {
        if (err)
            return console.error(err);
        console.log(`Welcome ${employee.name}!`);
    })
    res.send(employee);
});

router
    .route("/:id")
    .get((req, res) => {
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
                        res.send(`Found the following employee: ${employee.name} in the ${employee.squad}`)
                    else
                        res.send(`Couldn't find a employee with the id: ${req.params.id}`)
                }
            })
    })
    .delete((req, res) => {
        Employee.findById(req.params.id).exec(function (err, emp) { //Get the employee
            if (err || !emp)
                res.send('Employee not found')
            console.log(`Got: ${emp.name}`);
            if (emp.squad != "") { //Check the squad
                Squad.findOne({ name: emp.squad }, function (err, squad) { //Get the squad of the employee
                    if (err || !squad)
                        res.send('Squad not found')
                    console.log(`Got this squad: ${squad['_id']} with the name ${squad['name']}`)
                    Squad.updateOne({ _id: squad['_id'] }, { $pull: { members: { $in: [emp._id] } } }).exec() //delete from squad
                })
            }
        })

        Employee.deleteOne({ _id: req.params.id }, function (err, result) { //Delete employee
            if (err)
                return console.error(err)
            if (result["deletedCount"] == 1) {
                res.send("One employee was succesfully deleted")
            }
            else {
                res.send(`No employee found with the id: ${req.params.id}`)
            }
        })
    })

// const users = [{ name: "Kyle" }, { name: "Sally" }, { name: "eu" }]
// router.param("id", (req, res, next, id) => {
//     req.user = users[id]
//     next()
// })

module.exports = router