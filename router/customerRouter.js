const express = require("express");
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get("/", customerController.index);
router.get("/:id", customerController.customer);
router.post("/", customerController.create);
router.put("/:id", customerController.update);
router.delete("/:id", customerController.delete);

module.exports = router;