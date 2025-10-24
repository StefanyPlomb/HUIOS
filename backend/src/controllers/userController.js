import * as userService from "../services/userService.js";
import BaseError from "../errors/BaseError.js";

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (err) {
        if (err instanceof BaseError) {
        return res.status(err.status).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: "Erro interno" });
    }
};

export const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await userService.getUserByEmail(email);
        res.status(200).json(user);
    } catch (err) {
        if (err instanceof BaseError) {
        return res.status(err.status).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: "Erro interno" });
    }
};

export const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        if (err instanceof BaseError) {
        return res.status(err.status).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: "Erro interno" });
    }
};

export const authUser = async (req, res) => {
    try {
        const user = await userService.authUser(req.body);
        res.status(200).json(user);
    } catch (err) {
        if (err instanceof BaseError) {
        return res.status(err.status).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: "Erro interno" });
    }
};