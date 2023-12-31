import {query} from "../utils/database.js";

export const getUserByUsername = async (username) => {
    const user = await query('SELECT * FROM user WHERE username = ? LIMIT 1', [username]);
    return user ? user[0] : null;
}

export const getUserById = async (id) => {
    const user = await query('SELECT * FROM user WHERE id = ? LIMIT 1', [id]);
    return user ? user[0] : null;
}

export const insertUser = async ({id, username, email, password}) => {
    return await query('INSERT INTO user VALUES (?,?,?,?)', [id, username, email, password]);
}