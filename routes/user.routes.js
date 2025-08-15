import {Router} from 'express';
import authorize from "../Middleware/auth.middleware.js";
import {getUser, getUsers} from "../controllers/user.controller.js";
const userrouter = Router();

userrouter.get('/', getUsers);

userrouter.get('/:id',authorize, getUser);

userrouter.post('/', (req, res) => res.send('Create a new user'));

userrouter.put('/:id', (req, res) => res.send('Update user by id'));

userrouter.delete('/:id', (req, res) => res.send('Delete a user'));

export default userrouter;
