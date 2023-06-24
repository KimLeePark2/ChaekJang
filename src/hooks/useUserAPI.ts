import type { responseProductsApi } from 'src/@types/api';
import type { IUser } from 'src/@types/user';
import useAxios from './useAxios';

export default function useUserAPI() {
    const { requestApi, requestSecureApi } = useAxios();

    const getUser = () => {
        return requestSecureApi<IUser>(
            'get',
            '/auths/my',
        );
    };
    const getMySales = (pageNumber: number, userId: String) => {
        return requestSecureApi<responseProductsApi>(
            'get',
            `/v1/products/${userId}/sales?page=${pageNumber}&size=10&sort=id.desc&paged=true`,
        );
    };
    const getMyWishes = (pageNumber: number, userId: String) => {
        return requestSecureApi<responseProductsApi>(
            'get',
            `/v1/products/${userId}/wishes?page=${pageNumber}&size=10&sort=id.desc&paged=true`,
        );
    };
    return { getUser, getMySales, getMyWishes };
}
