import chatBoxes from "../../models/chatBoxSchema";
import connectMongo from "../../db/conn";

const sendMessage = async (req, res) => {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));
 
  if (req.method === "POST") {
    chatBoxes.findByIdAndUpdate(
      { _id: req.body.id },
      { $push: { messages: req.body.message } },
      function (err, data) {
        if (err) {
          return res.status(400).json({ message: "Something went wrong!" });
        } else {
          return res
            .status(200)
            .json({ message: "Message sent successfuly!", newData: data });
        }
      }
    );
    // chatBoxes.findByIdAndUpdate(
    //   { _id: req.body.id },
    //   {
    //     $set: {
    //       lastMessage: {
    //         body: req.body.message.body,
    //         author: req.body.message.author,
    //       },
    //     },
    //   },
    //   function (err, data) {
    //     if (err) {
    //       return res.status(400).json({ message: "Something went wrong!" });
    //     } else {
    //       return res.status(200).json({ message: "Message sent successfuly!" });
    //     }
    //   }
    // );
  } else {
    return res
      .status(500)
      .json({ message: "HTTP method not valid. Only POST method accepted." });
  }
};

export default sendMessage;
