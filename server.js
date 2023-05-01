const http = require("http");
const Express = require("./lib/Express");

const admin = require("./controllers/admin.controller");
const products = require("./controllers/products.controller");
const categories = require("./controllers/categories.controller");
const subcategories = require("./controllers/subcategory.controller");

const PORT_API = process.env.PORT || 5000;

function httpServer(req, res) {
  const app = new Express(req, res);

  app.get("/admin", admin.GET);
  app.post("/sigin", admin.POST);

  app.get("/categories", categories.GET);
  app.post("/add-categories", categories.POST);
  app.put("/edit-categories", categories.PUT);
  app.delete("/delete-categories", categories.DELETE);

  app.get("/subcategories", subcategories.GET);
  app.post("/add-subcategories", subcategories.POST);
  app.put("/edit-subcategories", subcategories.PUT);
  app.delete("/delete-subcategories", subcategories.DELETE);

  app.get("/products", products.GET);
  app.post("/add-products", products.POST);
  app.put("/edit-products", products.PUT);
  app.delete("/delete-products", products.DELETE);
}

http
  .createServer(httpServer)
  .listen(PORT_API, () => console.log("Server running"));
