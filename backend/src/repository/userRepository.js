import pool from "../config/db.js";

export const getUsers = async ({ name, email, password }) => {
    const result = await pool.query("SELECT id, name, email FROM users");
    return result.rows;
}

export const getUserByEmail = async ({ email }) => {
    const result = await pool.query("SELECT 1 FROM users WHERE email = $1", [email]);
    return result.rows[0];
}

export const createUser = async ({ name, email, password }) => {
    const query = `
        INSERT INTO users(name, email, password)
        VALUES($1, $2, $3)
        RETURNING id, name, email
    `;
    const values = [name, email, password];

    const result = await pool.query(query, values);
    return result.rows[0];
}

export const existsEmail = async ({ email }) => {
    const result = await pool.query("SELECT 1 FROM users WHERE email = $1", [email]);
    
    if (result.rowCount > 1) {
        return true;
    }
    
    return false;
}