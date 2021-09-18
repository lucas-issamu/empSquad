const Employee = require('../../Models/Employee')


const create = async (newEmployee) => {
    const { name, email, squad } = newEmployee

    const employee = new Employee({
        name: name,
        email: email,
        squad: squad
    })
    await employee.save()
    return employee
}

const find = async employeeID => await Employee.findById(employeeID)

const addSquad = async (empID, squadName) => {
    const added = await Employee.findByIdAndUpdate(empID, {squad: squadName}, {new: true})
    return added ? added : null
}

const deleteEmployee = async employeeID => await Employee.findByIdAndDelete(employeeID)

module.exports = {
    create,
    find,
    addSquad,
    deleteEmployee
}