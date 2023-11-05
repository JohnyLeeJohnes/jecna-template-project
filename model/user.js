import {query} from "../utils/database.js";

export const getUserByUsername = async (username) => {
    const user = await query('SELECT * FROM Users WHERE username = ? LIMIT 1', [username]);
    return user ? user[0] : null;
}

export const getUserById = async (id) => {
    const user = await query('SELECT * FROM Users WHERE id = ? LIMIT 1', [id]);
    return user ? user[0] : null;
}

export const insertUser = async ({id, username, email, password}) => {
    return await query('INSERT INTO Users VALUES (?,?,?,?)', [id, username, email, password]);
}