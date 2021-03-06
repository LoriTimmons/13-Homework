const router = require("express").Router();
const { Tag, Product, ProductTag, Category } = require("../../models");
const { create } = require("../../models/Product");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((productData) => res.json(productData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((productData) => res.json(productData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(data => {
    res.status(200).json(data)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  req.params.id
  Tag.update(req.body, {
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

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  req.params.id
  Tag.destroy({
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
