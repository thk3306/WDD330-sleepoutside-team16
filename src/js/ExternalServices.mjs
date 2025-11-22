const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  let jsonResponse = res.json();
  if (jsonResponse.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', messag: jsonResponse };
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category || this.category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}
