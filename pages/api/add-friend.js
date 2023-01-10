import connectMongo from "../../db/conn";
import users from "../../models/userSchema";

const addFriend = async (req, res) => {
  connectMongo().catch((error) => res.json({ error: "Connection failed!" }));

  if (req.method === "POST") {
    
    users.updateOne(
      { email: req.body.email },
      {
        $push: {
          friendsList: {
            id: req.body.id,
            email: req.body.emailOfFriend,
            name: req.body.name,
          },
        },
      },
      function (err, data) {
        if (err) {
          return res.status(404).json({ message: "Something went wrong." });
        } else {
          return res
            .status(201)
            .json({ status: true, message: "Friend added successfuly" });
        }
      }
    );
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST accepted...!" });
  }
};

export default addFriend;
