const express = require('express')
const router = express.Router()
const squad = require('../Controllers/SquadController')

router.post("/create", squad.create)
router.post("/add", squad.addEmployee)
router.get("/:id", squad.get)

module.exports = router