import connectMongo from "../../db/conn";
import chatBoxes from "../../models/chatBoxSchema";
const getUser = async (req, res) => {
  connectMongo().catch((error) => res.json({ error: "Connection failed!" }));

  if (req.method === "POST") {
    chatBoxes.find(
      { users: req.body.email },
      function (err, data) {
        if (err)
          return res.status(404).json({ message: "Something Went Wrong" });
        else return res.status(201).json({ status: true, data: data });
      }
    );
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST accepted...!" });
  }
};

export default getUser;
