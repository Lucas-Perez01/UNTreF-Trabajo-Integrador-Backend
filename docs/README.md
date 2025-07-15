# API de Productos - UNTreF Trabajo Integrador

Este proyecto es una API REST para gestionar productos en una base de datos MongoDB. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Borrar), así como búsquedas y filtrados avanzados.

---

## Tecnologías

- Node.js
- Express.js
- MongoDB con Mongoose
- dotenv (para variables de entorno)

---

## Estructura del Proyecto

- **config/**  
  Contiene la configuración de la conexión a la base de datos (`database.js`).

- **controllers/**  
  Funciones que manejan la lógica para los productos (`productController.js`).

- **models/**  
  Modelo de datos para productos con Mongoose (`product.js`).

- **routes/**  
  Rutas de Express para los endpoints de productos (`productRoutes.js`).

- **data/**  
  Archivos JSON para poblar la base de datos (`computacion.json`).

- **scripts/**
  Script para poblar la base de datos (`poblarDB.js`).

- **app.js**  
  Archivo principal que inicia el servidor Express.

---

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <url-del-repo>
   ```

2. Instala dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz con las siguientes variables:

   ```
   PORT=3000
   MONGO_URI=<tu_url_de_mongodb>
   ```

4. Para poblar la base de datos con productos desde un archivo JSON:

   ```bash
   node poblarDB.js
   ```

5. Inicia el servidor:
   ```bash
   npm start
   ```

---

## Endpoints disponibles

| Método | Ruta                               | Descripción                                       |
| ------ | ---------------------------------- | ------------------------------------------------- |
| GET    | `/api/productos`                   | Obtener todos los productos                       |
| GET    | `/api/productos/:codigo`           | Obtener un producto por código                    |
| POST   | `/api/productos`                   | Crear un nuevo producto                           |
| PUT    | `/api/productos/:codigo`           | Modificar un producto existente                   |
| DELETE | `/api/productos/:codigo`           | Borrar un producto por código                     |
| GET    | `/api/productos/buscar?q=...`      | Buscar productos por término                      |
| GET    | `/api/productos/categoria/:nombre` | Filtrar productos por categoría                   |
| GET    | `/api/productos/precio/:min-:max`  | Obtener productos dentro de un rango de precio    |
| POST   | `/api/productos/masivo`            | Agregar múltiples productos en una sola solicitud |

---

## Ejemplo de Uso

- **Crear un producto** (POST `/api/productos`)

  ```json
  {
    "codigo": 101,
    "nombre": "Teclado Luminoso RGB",
    "precio": 65.5,
    "categoria": ["Accesorios", "Computación", "Gaming"]
  }
  ```

- **Buscar productos por término** (GET `/api/productos/buscar?q=Laptop`)

---

## Detalles Técnicos

- La conexión con MongoDB se maneja en `config/database.js` con `mongoose`.
- El modelo `Producto` define `codigo` (número), `nombre` (string), `precio` (número), y `categoria` (array de strings).
- Los controladores en `controllers/productController.js` manejan la lógica para cada endpoint.
- Las rutas están definidas en `routes/productRoutes.js` y usan esos controladores.
- El servidor corre en el puerto definido en `.env` o 3000 por defecto.
