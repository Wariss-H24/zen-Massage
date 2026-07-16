"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.getMe = getMe;
const prisma_1 = require("../prisma");
const bcrypt_1 = require("../utils/bcrypt");
async function register(body) {
    const exists = await prisma_1.prisma.user.findUnique({ where: { email: body.email } });
    if (exists) {
        const err = new Error('Un compte existe déjà avec cet email');
        err.status = 409;
        throw err;
    }
    const hashed = await (0, bcrypt_1.hashPassword)(body.password);
    const user = await prisma_1.prisma.user.create({
        data: {
            email: body.email,
            password: hashed,
            firstName: body.firstName,
            lastName: body.lastName,
            phone: body.phone,
        },
        select: { id: true, email: true, firstName: true, lastName: true, role: true, avatar: true },
    });
    return user;
}
async function login(body) {
    const user = await prisma_1.prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
        const err = new Error('Email ou mot de passe incorrect');
        err.status = 401;
        throw err;
    }
    const valid = await (0, bcrypt_1.comparePassword)(body.password, user.password);
    if (!valid) {
        const err = new Error('Email ou mot de passe incorrect');
        err.status = 401;
        throw err;
    }
    if (user.deletedAt) {
        const err = new Error('Compte désactivé');
        err.status = 403;
        throw err;
    }
    return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatar: user.avatar,
    };
}
async function getMe(id) {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id },
        select: { id: true, email: true, firstName: true, lastName: true, role: true, avatar: true, phone: true },
    });
    if (!user) {
        const err = new Error('Utilisateur introuvable');
        err.status = 404;
        throw err;
    }
    return user;
}
