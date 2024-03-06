# Pruebas de servidor:
Consta en cambiar el nombre original de los siguientes archivos al de "index.js"

(El nombre original de los archivos se encuentra escrito en la primera línea de los mismos)

- test_server(1): es el archivo para probar el servidor y la BD sin "sequelize".

  - Solicita la hora en la base de datos.
  - Está configurada para la base de datos en línea.
  - La solicitud se realiza a: `<GET>   "<root>/ping"`
  - también tiene la siguiente solicitud de prueba: `<GET>   "<root>/"`
  - tener en cuenta si la prueba se realiza de manera locar o en el deploy: hay que descomentar línea 'ssl' de la constate "pool"
  - en éste archivo no se utiliza archivo otro archivo para "rutear"

- test_server(2): es el archivo para probar el servidor y la BD con "sequelize" y una ruta de prueba

  - solicitud: `<GET> "<root>/"`
  - solicitud: `<GET> "<root>/test_route"`
  - solicitud: `<POST>  "<root>/db_test"`

    JSON:
    {
        "field1": "Valor del campo 3",
        "field2": "Valor del campo 4"
    }

- server_production: archivo de servidor para producción

# Explanation of the functioning of the backend
para levantar el servidor => `npm start`
## Explanation of the folders

- ### src

  #### La carpeta src contiene las carpetas rutas, modelos y algunos otros, puede ser usada para desarrollo de este proyecto

- ### .env

  #### Archivo de configuración que contiene la información de la base de datos.

  #### Colócalo en la raíz del directorio de tu proyecto. Esto significa que el archivo debe estar ubicado en el mismo nivel que la carpeta que contiene tu código fuente y otros archivos de configuración, como package.json o requirements.txt.

  #### Este esta configurado de esta forma:

  ```
  DB_USER=postgres
  DB_PASSWORD=Lazone12$12
  DB_HOST=localhost:5432
  DB =ingenia
  PORT=3001

  JWT_SECRET= ingenia2023

  CLOUDINARY_NAME= (agregar nombre aqui)
  CLOUDINARY_API_KEY= (agregar api key aqui)
  CLOUDINARY_API_SECRET= (agregar api secret aqui)
  ```
- ### package.json

  #### Archivo que describe la aplicación y sus dependencias.