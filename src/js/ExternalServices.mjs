import { convertToJson } from './utils.mjs';

const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ExternalServices {
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async submitOrder(order) {
    const response = await fetch(`${baseURL}checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });

    const jsonResponse = await response.json();

    if (!response.ok) {
      
      throw {
        name: 'servicesError',
        message: jsonResponse  
      };
    }

    return jsonResponse;
  }
}

