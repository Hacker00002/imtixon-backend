const { read, write } = require("../model/model");

const subcategories = {
  GET: (req, res) => {
    const subcategoriesList = read("subcategories");
    const productsList = read("products");
    try {
      const result = subcategoriesList.map((subcat) => {
        return {
          ...subcat,
          subcategory: productsList.filter(
            (subcategory) =>
              subcategory.sub_category_id == subcat.sub_category_id
          ),
        };
      });
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ result }));
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ result }));
    }
  },
  POST: async (req, res) => {
    try {
      const { sub_category_name, category_id } = await req.body;
      const categories = read("subcategories");
      const newCategories = {
        sub_category_id: categories.at(-1).sub_category_id + 1 || 1,
        category_id,
        sub_category_name,
      };
      categories.push(newCategories);
      write("subcategories", categories);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: 201, message: true }));
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: 400, message: error.message }));
    }
  },
  PUT: async (req, res) => {
    try {
      const { sub_category_id, sub_category_name, category_id } =
        await req.body;
      const putCategories = read("subcategories");
      let putcategory = putCategories.filter(
        (edit) => edit.sub_category_id != sub_category_id
      );
      putcategory.push({ sub_category_id, sub_category_name, category_id });
      write("subcategories", putcategory);
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: 400, message: error.message }));
    }
  },
};

module.exports = subcategories;
