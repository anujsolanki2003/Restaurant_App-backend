const testUser = (req, res) => {
  const { name } = req.body;
  console.log(name);

  res.status(201).send(`welcome your name is ${name}`);
};
const getUser = (req, res) => {
  res.status(200).send({
    success:true,
    message:"Testing Route"
  });
};

module.exports = { getUser, testUser };
