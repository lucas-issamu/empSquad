const Squad = require('../../Models/Squad')
const Employee = require('../../Models/Employee')

module.exports = {
    create: function (req, res) {
        const squad = new Squad({
            name: req.body.name,
            responsability: req.body.responsability,
            member: req.body.member
        });
        squad.save(function (err) {
            if (err)
                res.send('Failed to create a new squad')
            res.status(201).json(squad);
        })
    },

    addEmployee: function (req, res) {
        const userSquad = { //Get the IDs to add
            empId: req.body.empId,
            squadId: req.body.squadId
        }
        Employee.findById(userSquad.empId).exec(function (err, result) { //Get the employee on DB
            if (err || !result)
                res.json({ error: 'Squad not found' })
            else if (result.squad != "") //Employee belongs to 0 or 1 squad.
                res.json({error: 'The employee already have belongs to a squad'})
            else {
                console.log(`Found: ${result.name}`);
                Squad.findById(userSquad.squadId) //Get the squad on DB
                    .exec(function (err, Squad) {
                        if (err || !Squad)
                            res.json({ error: 'Squad not found' })
                        else {
                            console.log(result);
                            Squad.members.push(userSquad.empId) //Add the employeeID to Squad Collection
                            result.squad = Squad.name //Update the squad field of the employee
                            Squad.save()
                            result.save()
                            console.log(`Added ${result.name} to ${Squad.name}.`);
                            res.json({ success: 'Employee added to the squad' })
                        }
                    })
            }
        })
    },

    get: function (req, res) {
        Squad.findById(req.params.id)
            .lean().exec(function (err, squad) {
                if (err)
                    return console.error(err)
                try {
                    console.log(squad)
                } catch (error) {
                    console.log("Failed to find the user")
                    console.log(error)
                }
                finally {
                    if (squad)
                        res.json(squad)
                    else
                        res.json({ error: `Couldn't find the squad` })
                }
            })
    },
}