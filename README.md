# Mercado Libre Challenge


El Challenge consiste en una aplicación que consta de tres componentes principales:
* El cuadro de búsqueda
* El listado de los productos
* El detalle de un producto

Para construir la aplicación es necesario utilizar:
* Cliente
  * HTML
  * JS (Utilizando **React**)
  * CSS (Utilizando **SASS**)
* Servidor
  * Node
  * Express

Las 3 pantallas que vamos a tener son las siguientes:
1. **Cuadro de búsqueda**

2. **Listado de productos**

3. **Detalle de un producto**


## Requerimientos

* En base al diseño, construir las tres pantallas:
  * Cuadro de búsqueda
  * Listado de productos
  * Detalle de un producto


* Las vistas tiene que ser navegables de manera independiente y sus URLs son:
  * Cuadro de búsqueda: `/`
  * Listado de productos: `/items?search=`
  * Detalle de un producto: `/items/:id`


* En el servidor, construir los siguientes endpoints (rutas):
  * /api/items?q=**:query**
    * Debe hacer un request al siguiente endpoint de la API de Mercado Libre: [https://api.mercadolibre.com/sites/MLA/search?q=**:query**](https://api.mercadolibre.com/sites/MLA/search?q=:query)

      Y retornar los datos con el siguiente formato
      ```js
      {
        author: {
          name: String
          lastname: String
        },
        categories: [String, String, String, ...],
        items: [
          {
            id: String,
            title: String,
            price: {
              currency: String,
              amount: Number,
              decimals: Number
            },
            picture: String,
            condition: String,
            free_shipping: Boolean,
            location: String
          },
          { ... },
          { ... },
          { ... }
        ]
      }
      ```

  * /api/items/**:id**
    * Debe hacer un requeste a los siguientes endpoints de la API de Mercado Libre:

      [https://api.mercadolibre.com/items/**:id**](https://api.mercadolibre.com/items/:id)

      [https://api.mercadolibre.com/items/**:id**/description](https://api.mercadolibre.com/items/:id/description)

      Y retornar los datos con el siguiente formato
      ```js
      {
        author: {
          name: String
          lastname: String
        },
        categories: [String, String, String, ...],
        item: {
          id: String,
          title: String,
          price: {
            currency: String,
            amount: Number,
            decimals: Number,
          },
          picture: String,
          condition: String,
          free_shipping: Boolean,
          sold_quantity: Number,
          description: String
        }
      }
      ```

## Descripción

* En la vista de caja de búsqueda, debería poder ingresar el producto a buscar y, al enviar el formulario, navegar a la vista de Resultados de búsqueda, visualizando **solo 4** productos. Luego, al hacer clic sobre uno de ellos, debería navegar a la vista de Detalle de Producto.
* Dado un ID de producto, debería poder ingresar directamente a la vista de detalle de producto. 

## Comenzando 🚀
Usa git clone para clonar este repositorio en tu ordenador.

* Para hacer escuchar el servidor es importante que te dirijas a la siguiente ruta: server 
luego `npm start`

* Para levantar REACT, es necesario que te dirijas a la siguiente ruta: client 
luego `npm start`

⌨️ con ❤️ por [tifafracica](https://github.com/tifafracica) 😊
 

