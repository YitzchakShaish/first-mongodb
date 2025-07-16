import express, { json } from "express";
import { handleLogin , getAllUsers, getUserById, updateUserById, deleteUserById, insertNewUsername} from "./usersCtrl.js";

const router = express.Router();
//POST login
router.post('/login', handleLogin)

//POST add user TDB
router.post('/adduser', insertNewUsername)

//GET all users
router.get('/', getAllUsers)

//GET user by id
router.get('/:id', getUserById)

//PUT update user by id
router.put('/:id', updateUserById)

//DELETE user by id
router.delete('/:id', deleteUserById)


export default router
