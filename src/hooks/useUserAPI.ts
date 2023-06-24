import type { responseProductsApi } from 'src/@types/api';
import useAxios from './useAxios';

export default function useUserAPI() {
    const { requestApi, requestSecureApi } = useAxios();

    const getMySales = (pageNumber: number, userId: String) => {
        return requestSecureApi<responseProductsApi>(
            'get',
            `/v1/products/${userId}/sales?page=${pageNumber}&size=10&sort=id.desc&paged=true`,
        );
    };

    return { getMySales };
}
