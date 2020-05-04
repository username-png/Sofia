const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Place = require("../models/places");
const validation = require('../../services/sofia_learn');
const Datas = require('../../data/data_db');
const Data_questions = require('../../data/question_db');
const answers = require('../../services/sofia');



var perg_r = "qual a cor do produto"
const datas = Datas
const data_questions = Data_questions


// Pega todos os indices do banco de dados
router.get("/", (req, res, next) => {
  Place.find()
    .exec()
    .then(placeList => res.status(200).json(placeList))
    .catch(err => res.status(500).json({ error: err }));
});


// Grava apenas um dado no banco de dados
router.post("/", (req, res, next) => {
  const place = new Place({
    // _id: new mongoose.Types.ObjectId(),
    _id: req.body._id,
    product_name: req.body.product_name,
    color: req.body.color,
    product_qty: req.body.product_qty,
    description: req.body.description,
    seller_name: req.body.seller_name
    
  });
  place
    .save()
    .then(result => console.log(result))
  // está retornando erro mesmo com status 200
  //.cath(err => console.log(err));
  res.status(200).json({
    message: "New place created"
  });
});


// Exibe um indice pelo id.
router.get("/:placeId/:question", (req, res, next) => {
  const question = req.params.question;
  const id = req.params.placeId;
  Place.findById(id)
    .exec()
    .then(place => {
      if (place) {
        res.status(200).json({
          message: answers(question, data_questions, datas, id)
          // message: "Successfully edited"
        });
      } else {
        res.status(404).json({ message: "Local Não encontrado" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// res.status(200).json({
//       message: "Successfully edited"
//     });

// trabalhando nessa função

// router.put("/:placeId", (req, res, next) => {
//   const id = req.params.placeId
//   Place.findOneAndUpdate({
//     _id: id,
//     country: req.body.country,
//     cases: req.body.cases,
//     death: req.body.death,
//     date: req.body.date,
    
//   },{new: true})
//   .exec()
//   .then(result => console.log(result))
//   .catch(err => res.status(500).json({ error: err }));
//   res.status(200).json({
//     message: "Successfully edited"
//   });
// });

// // Deleta apenas um dado no banco de dados
// router.delete("/:placeId", (req, res, next) => {
//   const id = req.params.placeId;
//   Place.remove({ _id: id })
//   .exec()
//   .then(result => {
//     res.status(200).json(result);
//   })
//   .catch(err => res.status(500).json({ error: err }));
// });

// // vai atualizar um registro
// router.patch("/:placeId", (req, res, next) => {
//   const id = req.params.placeId
//   Place.updateOne({
//     _id: id,
//     country: req.body.country,
//     cases: req.body.cases,
//     death: req.body.death,
//     date: req.body.date
//   })
//   .exec()
//   .then(result => console.log(result))
//   .catch(err => res.status(500).json({ error: err }));
//   res.status(200).json({
//     message: "Successfully edited"
//   });
// });

// router.get("/:pages", (req, res, next) => {
//   // estou preparando um parametro para ser executado por uma função
//   let query = {};
//   let page = req.params.pages;
//   // parametro para quantidade de usuarios retornados no get importate
//   let limit = 2;
//   let skip = limit * (page - 1);
//   Place.find(query)
//     .skip(skip)
//     .limit(limit)
//     .exec()
//     .then(placeList => res.status(200).json(page))
//     .catch(err => res.status(500).json({ error: err }));
// });



module.exports = router;
