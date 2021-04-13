const userModel = new Schema({
  name: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  pass: { type: String, require: true },
  status: { type: String, default: "active" },
});

const User = mongoose.model("User", userModel);
global.User = User;
