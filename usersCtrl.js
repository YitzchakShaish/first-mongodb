import { getUserByNameAndPassword, getAllUsersFDB, getUserByIdFDB, insertNewUsernameTDB, updateUsernameTDB, deleteUsernameFDB } from "./usersDAL.js"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


export const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    // Validate username
    if (!username || typeof username !== 'string' || username.trim() === '') {
        return res.status(400).json({ message: 'Invalid or missing username.' });
    }

    // Validate password
    if (!password || typeof password !== 'string' || password.trim() === '') {
        return res.status(400).json({ message: 'Invalid or missing password.' });
    }


    const user = await getUserByNameAndPassword(username, password);
    console.log(user);


    if (!user.success) {
        return res.status(401).json({ message: 'Wrong username or password' });
    }
    const token = jwt.sign(
        {
            id: user.data._id.toString(),
            username: user.data.username,
            role: user.data.role || 'user'
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    console.log(`token:` + token);

    res.cookie('token', token, { httpOnly: true, sameSite: true });
    res.json({ message: 'Login successful', user: user.data });
}

export const insertNewUsername = async (req, res) => {
    const { username, password , role} = req.body;
    // Validate username
    if (!username || typeof username !== 'string' || username.trim() === '') {
        return res.status(400).json({ message: 'Invalid or missing username.' });
    }

    // Validate password
    if (!password || typeof password !== 'string' || password.trim() === '') {
        return res.status(400).json({ message: 'Invalid or missing password.' });
    }
    console.log(`password: ` + password + `role: ` + role);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hachedPassword: ' + hashedPassword)
    const result = await insertNewUsernameTDB({ username, hashedPassword, role});

    if (!result.success) {
        return res.status(401).json({ message: 'Wrong username or password' });
    }

    res.json({ message: 'new user added successfully', user: result.data });
}

export const getAllUsers = async (req, res) => {

    const result = await getAllUsersFDB();

    if (!result.success) {
        return res.status(401).json({ message: 'no users' });
    }

    res.json({ message: `All users Hello ${req.user.username}, your role is ${req.user.role}`, user: result.data });
}

export const getUserById = async (req, res) => {
    const id = req.params.id;
    // Validate ID
    if (!id) {
        return res.status(400).json({ message: 'Invalid or missing user ID.' });
    }

    const result = await getUserByIdFDB(id);

    if (!result.success) {
        return res.status(401).json({ message: 'user not found' });
    }

    res.json({ message: 'user:', user: result.data });
}

export const updateUserById = async (req, res) => {
    const id = req.params.id;
    const { username, password } = req.body;

    // Validate ID
    if (!id) {
        return res.status(400).json({ message: 'Invalid or missing user ID.' });
    }

    // Validate username
    if (!username || typeof username !== 'string' || username.trim() === '') {
        return res.status(400).json({ message: 'Invalid or missing username.' });
    }

    // // Validate password
    // if (!password || typeof password !== 'string' || password.trim() === '') {
    //     return res.status(400).json({ message: 'Invalid or missing password.' });
    // }

    // Update in DB
    const result = await updateUsernameTDB(id, { username, password });

    if (!result.success) {
        return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User updated successfully.', user: result.data });
}

export const deleteUserById = async (req, res) => {
    const id = req.params.id;

    // Validate ID
    if (!id) {
        return res.status(400).json({ message: 'Invalid or missing user ID.' });
    }

    // Update in DB
    const result = await deleteUsernameFDB(id);

    if (!result.success) {
        return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User deleted successfully.', user: result.data });
}

export function logout(req, res) {
  res.clearCookie('token');  
  res.json({ message: 'Logged out successfully' });
}