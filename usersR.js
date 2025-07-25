import express, { json } from "express";
import { handleLogin , getAllUsers,  updateUserById, deleteUserById, insertNewUsername, logout} from "./usersCtrl.js";
import { verifyToken, authorizeRoles } from "./middlewares.js";

const router = express.Router();

//POST /signup
router.post('/signup', insertNewUsername)

//POST login
router.post('/login', handleLogin)

//GET all users
router.get('/',verifyToken, getAllUsers)


//PUT update user by id
router.put('/:id',verifyToken, authorizeRoles('admin','manager'), updateUserById)

//DELETE user by id
router.delete('/:id',verifyToken, authorizeRoles('manager'), deleteUserById)


router.post('/logout', logout);


export default router
