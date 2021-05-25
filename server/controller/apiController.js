const axios = require('axios');

exports.getAllItems = (req, res, next) => {
  let query = req.query.q;
  axios
    .get('https://api.mercadolibre.com/sites/MLA/search?limit=4&q=' + query)
    .then(response => {

      let apiCategories = response.data.filters.length === 0 ?
        response.data.available_filters.find(p => p.id === 'category').values :
        response.data.filters.find(p => p.id === 'category').values.map(item => item.path_from_root);

      // Here i sorted the category array if the items have the results property.
      // remember the api may have or not available_filters per product.
      apiCategories.map(category => {
        if (category.hasOwnProperty('results')) {
          apiCategories.sort((a, b) => b.results - a.results)
          apiCategories = apiCategories.slice(0, 4);
        } else {
          apiCategories = apiCategories[0].slice(0, 4)
        }
      })


      const signature = {
        name: "Stefanny",
        lastname: "Fracica"
      }

      const apiProducts = response.data.results.map(product => { //traemos la informacio de la API. y la organizamos en un nuevo array de objeto.
        return {
          id: product.id,
          title: product.title,
          price: {
            currency: product.currency_id,
            amount: String(product.price).split('.')[0],
            decimals: String(product.price).split('.')[1] || '0',
          },
          picture: product.thumbnail,
          condition: product.condition,
          free_shipping: product.shipping.free_shipping,
          location: product.address.state_name
        };
      })

      res.status(200).json({
        status: 'success',
        autor: signature,
        categories: apiCategories,
        items: apiProducts
      });

    })
    .catch(function (err) {
      res.status(404).json({
        status: 'fail',
        message: `This is the problem ${err}`
      });
    })
}


exports.getItem = (req, res) => {
  const productID = req.params.id;
  axios
    .get('https://api.mercadolibre.com/items/' + productID)
    .then(response => {
      // get the category ID
      const categoryCode = response.data.category_id;
      // get the product data
      const productOutcome = response.data

      //axios.all() is Axios's own way of making concurrent HTTP requests and
      // getting back an equal number of responses
      axiosrequest1 = axios.get('https://api.mercadolibre.com/categories/' + categoryCode)
      axiosrequest2 = axios.get('https://api.mercadolibre.com/items/' + productID + '/description')

      axios.all([
        axiosrequest1, axiosrequest2
      ]).then(axios.spread(function (res1, res2) {
        const signature = {
          name: "Stefanny",
          lastname: "Fracica"
        };
        const CategoryMap = res1.data.path_from_root
        const myProduct = {
          author: signature,
          categories: CategoryMap,
          item: {
            id: productOutcome.id,
            title: productOutcome.title,
            price: {
              currency: productOutcome.currency_id,
              amount: String(productOutcome.price).split(".")[0],
              decimal: String(productOutcome.price).split(".")[1] || "0"
            },
            picture: productOutcome.thumbnail,
            condition: productOutcome.condition,
            sold: productOutcome.sold_quantity,
            free_shipping: productOutcome.shipping.free_shipping

          },
          categoryId: categoryCode,
          description: res2.data.plain_text
        };

        res.status(200).json({
          status: 'success',
          myProduct
        });
      })).catch(function (err) {
        res.status(404).json({
          status: 'fail',
          message: `This is the problem ${err}`
        });
      });
    })
    .catch(function (err) {
      res.status(404).json({
        status: 'fail',
        message: `This is the problem ${err}`
      });
    });
}