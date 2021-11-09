const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');
// start all get all, get one (id)
// update one 
// create category 
// delete a category 



// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll ({
    include: [
      {
        model: Product,
        attributes: ["product_name"],
        foreignKey: "product_id",
      },
    ],
  })
  .then((productData) => res.json(productData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["product_name"],
        foreignKey: "product_id",
      },
    ],
  })
    .then((productData) => res.json(productData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then(data => {
    res.status(200).json(data)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
 req.params.id
 Category.update(req.body, {
   where: {
     id: req.params.id
   }
 })
  .then(data => {
    res.status(200).json(data)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
 });


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  req.params.id
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    res.status(200).json(data)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
});

module.exports = router;
