"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.getMe = getMe;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
exports.updateProfile = updateProfile;
const prisma_1 = require("../prisma");
const bcrypt_1 = require("../utils/bcrypt");
const crypto_1 = require("crypto");
const emailService_1 = require("./emailService");
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
async function forgotPassword(email) {
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    // On ne révèle pas si l'email existe ou non
    if (!user || user.deletedAt)
        return;
    const token = (0, crypto_1.randomBytes)(32).toString('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 heure
    await prisma_1.prisma.user.update({
        where: { id: user.id },
        data: { reset_token: token, reset_token_expires: expires },
    });
    await (0, emailService_1.sendResetPasswordEmail)(email, token);
}
async function resetPassword(token, newPassword) {
    const user = await prisma_1.prisma.user.findUnique({ where: { reset_token: token } });
    if (!user || !user.reset_token_expires || user.reset_token_expires < new Date()) {
        const err = new Error('Lien invalide ou expiré');
        err.status = 400;
        throw err;
    }
    const hashed = await (0, bcrypt_1.hashPassword)(newPassword);
    await prisma_1.prisma.user.update({
        where: { id: user.id },
        data: { password: hashed, reset_token: null, reset_token_expires: null },
    });
}
async function updateProfile(id, data) {
    // Préparer les données à mettre à jour
    const updateData = {};
    if (data.firstName)
        updateData.firstName = data.firstName;
    if (data.lastName)
        updateData.lastName = data.lastName;
    if (data.phone !== undefined)
        updateData.phone = data.phone;
    if (data.password) {
        // Hasher le mot de passe
        updateData.password = await (0, bcrypt_1.hashPassword)(data.password);
    }
    // Mettre à jour l'utilisateur
    const user = await prisma_1.prisma.user.update({
        where: { id },
        data: updateData,
        select: { id: true, email: true, firstName: true, lastName: true, role: true, avatar: true, phone: true },
    });
    return user;
}
