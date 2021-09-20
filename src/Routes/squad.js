const express = require('express')
const squad = require('../Controllers/SquadController')
const router = express.Router()

router.post("/create", squad.create)
router.post("/add", squad.addEmployee)
router.get("/:id", squad.get)

module.exports = router