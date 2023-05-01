const { writeFileSync, readFileSync } = require("fs");
const { resolve } = require("path");

function read(filename) {
  const data = readFileSync(resolve("database", filename + ".json"), "utf-8");
  return JSON.parse(data);
}

function write(filename, data) {
  writeFileSync(resolve("database", filename + ".json"), JSON.stringify(data));
  return true;
}

class PostCategory {
  constructor(category_id, category_name) {
    (this.category_id = category_id), (this.category_name = category_name);
  }
}

module.exports = {
  read,
  write,
  PostCategory,
};
