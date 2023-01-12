import { Schema, model, models } from "mongoose";

const chatBoxSchema = new Schema({
  owner: { type: Object },
  talkingTo: { type: Object },
  messages: { type: Array },
  lastMessage: { type: Object },
});

const chatBoxes = models.chatBoxes || model("chatBoxes", chatBoxSchema);

export default chatBoxes;
