const { User, Category } = require("../../database");
const createCourse = require("../courseControllers/createCourse");
const {publicationControllers} = require('../instructorControllers/publicationControllers')
const categorias = require("./categorias");
const instructores = require("./instructores");
const cursos = require("./cursos");
const articulos = require('./artuculos')

const rellenarControllers = async () => {
  console.log(`paso 00`);
  for (let i = 0; i < categorias.length; i++) {
    const name = categorias[i].name;
    const newCategory = await Category.create({ name });
  }
  console.log(`paso 01`);
  for (let i = 0; i < instructores.length; i++) {
    const obj = instructores[i];
    const newInstr = await User.create(obj);
  }
  console.log(`paso 02`);
  for (let i = 0; i < cursos.length; i++) {
    const {
      title,
      description,
      image,
      lenguage,
      price,
      pro,
      duration,
      content,
      dificulty,
      requirement,
      learnTo,
      studyMethod,
      users,
      catego,
    } = cursos[i];
    console.log(`paso 03`);
    const newCurso = await createCourse(
      title,
      description,
      image,
      lenguage,
      price,
      pro,
      duration,
      content,
      dificulty,
      requirement,
      learnTo,
      studyMethod,
      users,
      catego
    );
  }
  console.log(`paso 04`);
  for(let j = 0; j < articulos.length; j++){
    const idAr = articulos[j].idUser
    const titleAr = articulos[j].title
    const imgAr = articulos[j].img
    const {
      subtitle,
      text,
      subtitleTwo,
      textTwo,
      subtitleThree,
      textThree} = articulos[j]
    const publi = await publicationControllers(idAr,titleAr,subtitle,text,imgAr,subtitleTwo,textTwo,subtitleThree,textThree)
  }

  return { Data: "Agregada" };
};
module.exports = rellenarControllers;
