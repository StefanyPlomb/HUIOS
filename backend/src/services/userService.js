import bcrypt from "bcrypt";
import * as userRepository from "../repository/userRepository.js";

export const getUsers = async () => {
    return await userRepository.getUsers();
};

export const getUserByEmail = async ({ body }) => {
    const { email } = body;

    if (!email) {
        throw new BadRequestError("Email é obrigatório.");
    }

    const user = await userRepository.getUserByEmail(email);

    if (!user) {
        throw new BadRequestError("Usuário não encontrado.");
    }

    const { password: _, ...userSafe } = user;
    return userSafe;
};

export const createUser = async ({ body }) => {
    const { name, email, password, retypedPassword } = body;

    if (!name || !email || !password || !retypedPassword) {
        throw new BadRequestError("Nome, email e senha são obrigatórios.");
    }

    if (password != retypedPassword) {
        throw new BadRequestError("As senhas não coincidem.")
    }

    const emailExists = await emailExists(email);
    if (emailExists) {
        throw new BadRequestError("Email já cadastrado.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await userRepository.createUser(name, email, hashedPassword);
};

export const authUser = async ({ body }) => {
    const { email, password } = body;

    if (!email || !password) {
        throw new BadRequestError("Email e senha são obrigatórios.");
    }

    let successLogin = false;

    const user = await userRepository.getUserByEmail(email);

    if (user) {
        const hashedPassword = user.password;

        successLogin = await bcrypt.compare(password, hashedPassword);
    }

    if (!successLogin) {
        throw new BadRequestError("Email ou senha incorreto.");
    }

    const { password: _, ...userSafe } = user;
    return userSafe;
};

export const emailExists = async ({ email }) => {
    return await userRepository.emailExists(email);
}