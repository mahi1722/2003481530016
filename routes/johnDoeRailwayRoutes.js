const express = require('express');
const johnDoeRailwayController = require('./../controllers/johnDoeRailwayController');
const router = express.Router();
const auth = require('../middlewares/auth');


router.post("/register",johnDoeRailwayController.registerCompany);
router.post("/auth",johnDoeRailwayController.getAuthToken);
router.get("/trains",auth,johnDoeRailwayController.getAllTrains);
router.get("/trains/:id",auth,johnDoeRailwayController.getTrainById);

module.exports = router