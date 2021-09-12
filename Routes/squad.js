const express = require('express')
const Squad = require('../Models/Squad')
const Employee = require('../Models/Employee')
const router = express.Router()

router.post("/create", (req, res) => {
    const squad = new Squad({
        name: req.body.name,
        responsability: req.body.responsability,
        member: req.body.member
    });
    squad.save(function (err) {
        if (err)
            res.send('Failed to create a new squad')
        console.log(`Added a new Squad named: ${squad.name}.`);
        res.status(201).send(squad);
    })
})

router.post("/add", (req, res) => {
    const userSquad = { //Get the IDs to add
        empId: req.body.empId,
        squadId: req.body.squadId
    }
    Employee.findById(userSquad.empId).exec(function (err, result) { //Get the employee on DB
        if (err || !result)
            res.send('Employee not found' + err)
        else if (result.squad != "") //Employee belongs to 0 or 1 squad.
            res.send(`The employee: ${result.name} already belongs to one squad`)
        else {
            console.log(`Found: ${result.name}`);
            Squad.findById(userSquad.squadId) //Get the squad on DB
                .exec(function (err, Squad) {
                    if (err || !Squad)
                        res.send('Squad not found')
                    else {
                        console.log(result);
                        Squad.members.push(userSquad.empId) //Add the employeeID to Squad Collection
                        result.squad = Squad.name //Update the squad field of the employee
                        Squad.save()
                        result.save()
                        console.log(`Added ${result.name} to ${Squad.name}.`);
                        res.status(201).send('New member added to Squad!')
                    }
                })
        }
    })
})

router.get("/:id", (req, res) => {
    res.send(`Get the squad with the ID: ${req.params.id}`)
})


module.exports = router