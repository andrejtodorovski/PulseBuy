import { get } from "svelte/store";
import { getAuthToken, interceptedFetch } from "../helpers/helpers";

class UserRepository {
    
    getProfile = (userId: string): Promise<Response> => {
        return interceptedFetch(`/users/profile/${userId}`, {});
}
}
export default new UserRepository();