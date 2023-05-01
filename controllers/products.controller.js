const { read, write } = require("../model/model");

const products = {
  GET: (req, res) => {
    try {
      const subcategory = read("products");
      const { sub_category_id, model } = req.query;
      if (req.query.sub_category_id) {
        const filter = subcategory.filter(
          (user) => user.sub_category_id == sub_category_id
        );
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(filter));
      }

      if (req.query.model) {
        const filterbymodel = subcategory.filter((user) => user.model == model);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(filterbymodel));
      }

      const filterbynamecategory = subcategory.filter(
        (user) => user.sub_category_id == sub_category_id && user.model == model
      );
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(filterbynamecategory));
    } catch (error) {
      res.json(400, { status: 400, message: error.message });
    }
  },
  POST: async (req, res) => {
    try {
      const { sub_category_id, product_name, model, color, price } =
        await req.body;
      const categories = read("products");
      const newCategories = {
        product_id: categories.at(-1).product_id + 1 || 1,
        sub_category_id,
        model,
        product_name,
        color,
        price,
      };
      categories.push(newCategories);
      write("products", categories);
      res.writeHead(201, { "Content-Type": "application/json" });
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.json(400, { status: 400, message: error.message });
    }
  },
  PUT: async (req, res) => {
    try {
      const { product_id, product_name, model, color, price } = await req.body;
      const putCategories = read("products");
      let putcategory = putCategories.filter(
        (edit) => edit.product_id != product_id
      );
      putcategory.push({
        product_id,
        model,
        product_name,
        color,
        price,
      });

      write("products", putcategory);
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.json(400, { status: 400, message: error.message });
    }
  },
  DELETE: async (req, res) => {
    try {
      const { product_id } = await req.body;
      const categories = read("products");
      const categoriesDel = categories.filter(
        (categories) => categories.product_id != product_id
      );
      write("products", categoriesDel);
      res.json(204, { status: 204, success: true });
    } catch (error) {
      res.json(400, { status: 400, message: error.message });
    }
  },
};

module.exports = products;
