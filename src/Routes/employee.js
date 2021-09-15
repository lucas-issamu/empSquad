const express = require('express');
const router = express.Router()
const employee = require('../Controllers/EmployeeController')

router.post("/create", employee.create);
router.route("/:id")
    .get(employee.get)
    .delete(employee.delete)

module.exports = router