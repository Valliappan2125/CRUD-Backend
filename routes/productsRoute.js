import express from 'express'
import { Products } from '../models/productsModel.js';

const router = express.Router();

// To save a new product
router.post("/", async (req, res) => {
  try {
    if (!req.body.name || !req.body.price || !req.body.category) {
      return res.status(400).send({
        message: "Send all required fields: name, price and category",
      });
    }
    const newProduct = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const product = await Products.create(newProduct);
    return res.status(201).send(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// to get all products
router.get("/", async (req, res) => {
  try {
    const products = await Products.find({});
    return res.status(200).json(products);
    // return res.status(200).json({
    //     count: products.length,
    //     data: products
    // })
  } catch (error) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

//to get one product using id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    return res.status(200).json(product);
  } catch (error) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

//to update a product using id
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.name || !req.body.price || !req.body.category) {
      return res.status(400).send({
        message: "Send all required fields: name, price and category",
      });
    }
    const { id } = req.params;

    const result = await Products.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).send({ message: "Product updated successfully" });
  } catch (error) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

//to delete a product using id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Products.findByIdAndDelete(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

export default router;
