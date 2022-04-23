const express = require("express");

const pingRequest = require("../Controllers/pingRequest");
const pingController = require("../Controllers/pingController");

const app = express();
const router = express.Router();

//Get /api/posts request
router.get("/posts", pingRequest.getRequests);

//Get /api/ping request
router.get("/ping", pingController.pingRoute);

module.exports = router;
