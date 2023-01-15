const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1538753",
  key: "95bf0f982a46bd0e9a56",
  secret: "4981ac693b5656bc3756",
  cluster: "eu",
  useTLS: true,
});

export default async function handler(req, res) {
  const { message, username } = req.body;
  const response = await pusher.trigger("chat", "chat-update", {
    message,
    
  });

  res.json({ message: "Message sent" });
}
