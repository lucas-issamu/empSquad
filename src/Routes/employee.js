const express = require('express');
const employee = require('../Controllers/EmployeeController')
const router = express.Router()

router.post("/create", employee.create);
router.route("/:id")
    .get(employee.get)
    .delete(employee.delete)

module.exports = router