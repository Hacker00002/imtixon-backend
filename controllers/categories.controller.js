const { read, write } = require("../model/model");

const categories = {
  GET: (req, res) => {
    const categoriesList = read("categories");
    const subcategoriesList = read("subcategories");
    try {
      const result = categoriesList.map((category) => {
        return {
          ...category,
          subcategory: subcategoriesList.filter(
            (subcategory) => subcategory.category_id == category.category_id
          ),
        };
      });
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ result }));
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: 400, message: error.message }));
    }
  },

  POST: async (req, res) => {
    try {
      const { category_name } = await req.body;
      const categories = read("categories");
      const newCategories = {
        category_id: categories.at(-1).category_id + 1 || 1,
        category_name,
      };
      categories.push(newCategories);
      write("categories", categories);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.json(200, { status: 200, success: true });
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.json(400, { status: 400, message: error.message });
    }
  },
  PUT: async (req, res) => {
    try {
      const { category_id, category_name } = await req.body;
      const putCategories = read("categories");
      let putcategory = putCategories.filter(
        (edit) => edit.category_id != category_id
      );
      putcategory.push({ category_id, category_name });
      putcategory.category_name = category_name || putcategory.category_name;
      write("categories", putcategory);
      res.json(200, { status: 200, success: true });
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.json(400, { status: 400, message: error.message });
    }
  },
  DELETE: async (req, res) => {
    try {
      const { category_id } = await req.body;
      const categories = read("categories");
      const categoriesDel = categories.filter(
        (categories) => categories.category_id != category_id
      );
      write("categories", categoriesDel);
      res.json(204, { status: 204, success: true });
    } catch (error) {
      res.json(400, { status: 400, message: error.message });
    }
  },
};

module.exports = categories;
