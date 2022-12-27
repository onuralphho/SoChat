import connectMongo from "../../db/conn";
import users from "../../models/userSchema";

const handler3 = async (req, res) => {
 
  connectMongo().catch((error) => res.json({ error: "Connection failed!" }));

  if (req.method === "POST") {
    users.findOne({ email: req.body.email }, function (err, data) {
      res.status(201).json({ user: data });
    });
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST accepted...!" });
  }
};

export default handler3;
