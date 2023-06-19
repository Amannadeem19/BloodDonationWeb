const express = require('express');
const router = express.Router()
const {validateToken} = require('../jwtTokens/jwt')
const {validateToken2} = require('../jwtTokens/jwtPerson')
const {getPerson, getPersonContact, getPersonLoc,  getPersonContact1, getPersonByCnic} = require('../controllers/Person')

router.get("/personinfo", validateToken2, getPerson)
router.get("/person/:id", validateToken2, getPersonByCnic)
router.get("/personcontact", validateToken2, getPersonContact)
router.get("/personcontact1/:id", validateToken2, getPersonContact1)
router.get("/personLoc/:id", validateToken2, getPersonLoc)


module.exports = router;
