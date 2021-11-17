const app = require("./server");

console.log(process.env.PORT)

app.listen(process.env.PORT || 8080, () => {
  console.log("Starting the server");
});
