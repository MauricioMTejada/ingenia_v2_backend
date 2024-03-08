const express = require('express');
const pg = require("pg");
const { Sequelize, DataTypes } = require("sequelize");
const databaseTest = express.Router();

/* DB local:
// Variables de entorno
const { DB_USER, DB_PASSWORD, DB_HOST, DB, DB_PORT } = process.env;

// Crear una instancia de Sequelize
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB}`,
  {
    logging: false, // Establecer en console.log para ver las consultas SQL sin procesar
    native: false, // Permite que Sequelize sepa que podemos usar pg-native para ~30% más de velocidad
  }
);*/


// Crear una instancia de Sequelize (Render)
// const sequelize = new Sequelize(
//   process.env.DATABASE_URL_INTERNAL,
//   {
//     logging: false, // Establecer en console.log para ver las consultas SQL sin procesar
//     native: false, // Permite que Sequelize sepa que podemos usar pg-native para ~30% más de velocidad
//   });

// Crear una instancia de Sequelize (Vercel)
  const sequelize = new Sequelize(
    process.env.POSTGRES_URL,
    {
      dialectModule: pg
    }
    // {
    //   logging: false, // Establecer en console.log para ver las consultas SQL sin procesar
    //   native: false, // Permite que Sequelize sepa que podemos usar pg-native para ~30% más de velocidad
    // }
    );


// Definir el modelo
const DatabaseTestModel = sequelize.define('DatabaseTestModel', {
    // Define los campos de tu modelo y sus tipos de datos
    field1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    field2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Agrega más campos según sea necesario
  });

  // Función para crear un nuevo registro
async function createDatabaseTestModel(req, res) {
    try {
      const { field1, field2 } = req.body;
      const databaseTestModel = await DatabaseTestModel.create({ field1, field2 });
      res.status(201).json(databaseTestModel);
    } catch (error) {
      console.error('Error al crear un nuevo registro:', error);
      res.status(500).json({ message: 'Hubo un error al crear el registro.' });
    }
  }

  // Función para obtener todos los registros
  async function getAllDatabaseTestModels(req, res) {
    try {
      const databaseTestModels = await DatabaseTestModel.findAll();
      res.status(200).json(databaseTestModels);
    } catch (error) {
      console.error('Error al obtener todos los registros:', error);
      res.status(500).json({ message: 'Hubo un error al obtener los registros.' });
    }
  }

  // Función para obtener un registro por ID
  async function getDatabaseTestModelById(req, res) {
    const { id } = req.params;
    try {
      const databaseTestModel = await DatabaseTestModel.findByPk(id);
      if (!databaseTestModel) {
        return res.status(404).json({ message: 'Registro no encontrado.' });
      }
      res.status(200).json(databaseTestModel);
    } catch (error) {
      console.error('Error al obtener el registro por ID:', error);
      res.status(500).json({ message: 'Hubo un error al obtener el registro.' });
    }
  }

  // Función para actualizar un registro por ID
  async function updateDatabaseTestModel(req, res) {
    const { id } = req.params;
    try {
      const [updatedRows] = await DatabaseTestModel.update(req.body, {
        where: { id },
      });
      if (updatedRows === 0) {
        return res.status(404).json({ message: 'Registro no encontrado.' });
      }
      res.status(200).json({ message: 'Registro actualizado exitosamente.' });
    } catch (error) {
      console.error('Error al actualizar el registro por ID:', error);
      res.status(500).json({ message: 'Hubo un error al actualizar el registro.' });
    }
  }

  // Función para eliminar un registro por ID
  async function deleteDatabaseTestModel(req, res) {
    const { id } = req.params;
    try {
      const deletedRowCount = await DatabaseTestModel.destroy({
        where: { id },
      });
      if (deletedRowCount === 0) {
        return res.status(404).json({ message: 'Registro no encontrado.' });
      }
      res.status(200).json({ message: 'Registro eliminado exitosamente.' });
    } catch (error) {
      console.error('Error al eliminar el registro por ID:', error);
      res.status(500).json({ message: 'Hubo un error al eliminar el registro.' });
    }
  }

  databaseTest.use((req, res, next) => {
    console.log(`Database test handler loaded`);
    next();
  });

  // Rutas
  databaseTest.post('/', createDatabaseTestModel); // Crear un nuevo registro
  databaseTest.get('/', getAllDatabaseTestModels); // Obtener todos los registros
  databaseTest.get('/:id', getDatabaseTestModelById); // Obtener un registro por ID
  databaseTest.put('/:id', updateDatabaseTestModel); // Actualizar un registro por ID
  databaseTest.delete('/:id', deleteDatabaseTestModel); // Eliminar un registro por ID


  // Exportar el modelo
  module.exports = { databaseTest, sequelize };
