export async function getProductList(query) {
  try {
    const apiResponse = await fetch(`http://localhost:3000/api/items/?q=${query}`)
      .then(res => res.json())
    return apiResponse
  } catch (err) {
    console.log(`we have a problem ${err}`);
    return err
  }
};

export async function getProductDetail(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/items/${id}`)
      .then(res => res.json())
    return response
  } catch (err) {
    console.log(`we have a problem ${err}`);
    return err
  }

}