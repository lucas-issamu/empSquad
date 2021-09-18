const Squad = require('../../Models/Squad')


const create = async (newSquad) => {
    const { name, responsability, members } = newSquad

    const squad = new Squad({
        name: name,
        responsability: responsability,
        members: members
    });
    await squad.save()
    return squad
}

const find = async squadID => await Squad.findById(squadID)

const findbyName = async squadName => await Squad.findOne({ name: squadName })

const addEmployee = async (empID, squadID) => {
    const squad = await Squad.findByIdAndUpdate(squadID, { $push: { members: empID } }, { new: true })
    return squad ? squad : null;
}

const removeEmployee = async (empID, squadID) => {
    const squad = await Squad.findByIdAndUpdate(squadID, { $pull: { members: empID } }, { new: true })
    return squad ? squad : null;
}

module.exports = {
    create,
    find,
    findbyName,
    removeEmployee,
    addEmployee
}