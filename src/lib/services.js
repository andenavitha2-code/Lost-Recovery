import { createOne, getList } from './api';
export const nowIso = () => new Date().toISOString();
export function logActivity(entityType, entityId, action, actorId, note = '') {
    return createOne('activityLogs', { entityType, entityId, action, note, actorId, createdAt: nowIso() });
}
export function notify(userId, type, message, link) {
    return createOne('notifications', { userId, type, message, link, read: false, createdAt: nowIso() });
}
export async function notifyRoles(roles, type, message, link, exceptUserId) {
    const users = await getList('users', { active: true });
    await Promise.all(users.filter((u) => roles.includes(u.role) && u.id !== exceptUserId).map((u) => notify(u.id, type, message, link)));
}
