import axios from 'axios';
export const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3001'),
    timeout: 8000,
});
export async function getList(resource, params = {}) {
    return (await http.get(`/${resource}`, { params })).data;
}
export async function getOne(resource, id) {
    return (await http.get(`/${resource}/${id}`)).data;
}
export async function createOne(resource, body) {
    return (await http.post(`/${resource}`, body)).data;
}
export async function patchOne(resource, id, body) {
    return (await http.patch(`/${resource}/${id}`, body)).data;
}
export async function deleteOne(resource, id) {
    await http.delete(`/${resource}/${id}`);
}
export function errMsg(e) {
    if (axios.isAxiosError(e)) {
        if (e.code === 'ERR_NETWORK' || e.code === 'ECONNABORTED')
            return 'Cannot reach the API. Start it with "npm run api" and try again.';
        if (e.response?.status === 404)
            return 'That record no longer exists.';
        return e.message;
    }
    return e instanceof Error ? e.message : 'Something went wrong. Try again.';
}
