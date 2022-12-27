import { hash } from "bcryptjs";
import connectMongo from "../../db/conn";
import users from "../../models/userSchema";

const register = async (req, res) => {

  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  if (req.method === "POST") {
    const { email, password } = req.body;
    req.body.password = await hash(password, 12);

    if (!req.body) {
      return res.status(404).json({ message: "Invalid form data." });
    }

    const checkExisting = await users.findOne({ email });

    if (checkExisting) {
      return res.status(422).json({ message: "User already exist." });
    }

    users.create(req.body, function (err, data) {
      if (err) return res.status(404).json({ err });
      return res.status(201).json({ status: true, user: data });
    });
  } else {
    return res
      .status(500)
      .json({ message: "HTTP method not valid. Only POST method accepted." });
  }
};

export default register;
