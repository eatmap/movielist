module.exports = (app) => {
  app.get("/isup", (req, res) => {
    res.json({ message: "I'm alive" });
  });
};
