import service from '@/components/utils/request'
export function login(data) {
    return service.post("/user/login", data);
}