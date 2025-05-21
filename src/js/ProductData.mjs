import { convertToJson } from './utils.mjs';

const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ProductData {
  // No constructor needed since category is passed per call now

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result; // API returns { Result: [...] }
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data;
  }
}
