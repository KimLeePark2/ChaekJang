import type {
  requestNewBookApiData,
  responseProductsApi,
} from 'src/@types/api';
import type {
  Content,
} from 'src/@types/book';
import useAxios from './useAxios';

export default function useBookAPI() {
  const { requestApi, requestSecureApi } = useAxios();

  const createNewBook = (data: requestNewBookApiData) => {
    const formData = new FormData();
    formData.append('thumbnailImages', {
      uri: data.photo[0].uri,
      type: data.photo[0].type,
      name: data.photo[0].fileName,
    });
    formData.append('title', data.title);
    formData.append('price', data.price);
    formData.append('description', data.description);
    return requestSecureApi('post', '/v1/products', formData, {
      'Content-Type': 'multipart/form-data',
    });
  };

  const getProducts = (pageNumber: number) => {
    return requestApi<responseProductsApi>(
      'get',
      `/v1/products?page=${pageNumber}&size=6&sort=id.desc&paged=true`,
    );
  };

  const getProduct = (productId: number) => {
    return requestApi<Content>(
      'get',
      `/v1/products/${productId}`,
    );
  };

  const wishClick = (productId: number) => {
    return requestSecureApi(
      'patch',
      `/v1/products/${productId}/wish`,
    );
  };

  const changeToSale = (productId: number) => {
    return requestSecureApi(
      'patch',
      `/v1/products/${productId}/sale`,
    );
  };
  const changeToSold = (productId: number) => {
    return requestSecureApi(
      'patch',
      `/v1/products/${productId}/sold`,
    );
  };

  return { createNewBook, getProducts, getProduct, wishClick, changeToSale, changeToSold };
}
