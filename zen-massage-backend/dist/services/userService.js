"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.getUserStats = getUserStats;
exports.updateUserRole = updateUserRole;
exports.toggleUserActive = toggleUserActive;
const prisma_1 = require("../prisma");
function toListItem(user) {
    return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        active: user.deletedAt === null,
        avatar: user.avatar,
        createdAt: user.createdAt,
    };
}
async function getUsers() {
    const users = await prisma_1.prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
    });
    return users.map(toListItem);
}
async function getUserStats() {
    const [totalUsers, superAdmins, admins] = await Promise.all([
        prisma_1.prisma.user.count({ where: { deletedAt: null } }),
        prisma_1.prisma.user.count({ where: { role: 'SUPER_ADMIN', deletedAt: null } }),
        prisma_1.prisma.user.count({ where: { role: 'ADMIN', deletedAt: null } }),
    ]);
    return {
        totalUsers,
        superAdmins,
        admins,
        regularUsers: totalUsers - superAdmins - admins,
    };
}
async function updateUserRole(userId, role) {
    const user = await prisma_1.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        const err = new Error('Utilisateur introuvable');
        err.status = 404;
        throw err;
    }
    const updated = await prisma_1.prisma.user.update({
        where: { id: userId },
        data: { role },
    });
    return toListItem(updated);
}
async function toggleUserActive(userId) {
    const user = await prisma_1.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        const err = new Error('Utilisateur introuvable');
        err.status = 404;
        throw err;
    }
    const updated = await prisma_1.prisma.user.update({
        where: { id: userId },
        data: { deletedAt: user.deletedAt ? null : new Date() },
    });
    return toListItem(updated);
}
