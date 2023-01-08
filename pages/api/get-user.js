import connectMongo from "../../db/conn";
import users from "../../models/userSchema";

const getUser = async (req, res) => {
  connectMongo().catch((error) => res.json({ error: "Connection failed!" }));
  const { searchInput } = req.body;

  if (req.method === "POST") {
    // users.find({$text:{$search:"/"+searchInput+"/"}}, function (err, data) {
    //   if (err) return res.status(404).json({ err });
    //   return res.status(201).json({ status: true, user: data });
    // });
    users.find({ name: { $regex: searchInput } }, function (err, data) {
      if (err) return res.status(404).json({ err });
      return res.status(201).json({ status: true, user: data });
    });
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST accepted...!" });
  }
};

export default getUser;
