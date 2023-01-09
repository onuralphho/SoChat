import connectMongo from "../../db/conn";
import chatBoxes from "../../models/chatBoxSchema";

const createChatBox = async (req, res) => {
  connectMongo().catch((error) => res.json({ error: "Connection failed!" }));

  if (req.method === "POST") {
    chatBoxes.create(req.body, function (err, data) {
      if (err) return res.status(404).json({ err });
      return res.status(201).json({ status: true, user: data });
    });
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST accepted...!" });
  }
};

export default createChatBox;
