const signToken = (_id, role) => {
  return jwt.sign(
    {
      iss: "fatwaArchive",
      sub: _id,
      role: role,
    },
    process.env.JWT_SECRET
  );
};

router.route("/register").post((req, res) => {
  const { username, name, email, pass } = req.body;
  bcrypt.hash(pass, 10).then((hash) => {
    new User({
      username,
      name,
      email,
      pass: hash,
    })
      .save()
      .then((user) => {
        ["pass", "__v"].forEach((key) => delete user[key]);
        const token = signToken(user._id, "user");
        res.cookie("access_token", token, { httpOnly: true, sameSite: true });
        res.status(200).json({ code: "ok", user: user });
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.status(400).json({
            code: err.code,
            field: Object.keys(err.keyValue)[0],
          });
        } else {
          console.log(err);
          res.status(500).json({ code: 500, message: "something went wrong" });
        }
      });
  });
});
router.route("/login").post(
  passport.authenticate("User", { session: false, failWithError: true }),
  (req, res, next) => {
    const user = { ...req.user._doc };
    ["pass", "__v"].forEach((key) => delete user[key]);
    const token = signToken(req.user._id, "user");
    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: true,
      maxAge: 60 * 60 * 60 * 24 * 365,
    });
    res.status(200).json({ code: "ok", user: user });
  },
  (err, req, res, next) => {
    console.log(err);
    res.status(401).json({ code: 401, message: "invalid credentials" });
  }
);
// router.route("/auth").get((req, res) => {
//   console.log("called");
//   if (req.cookies && req.cookies.access_token) {
//     const token = jwt_decode(req.cookies.access_token);
//     if (ObjectID.isValid(token.sub) && token.role === "user") {
//       res.redirect("/api/authUser");
//     } else if (ObjectID.isValid(token.sub) && token.role === "admin") {
//       res.redirect("/api/authAdmin");
//     }
//   } else {
//     res.json({ code: 400, message: "bad request" });
//   }
// });
router.route("/authUser").get(passport.authenticate("UserAuth"), (req, res) => {
  const user = { ...req.user._doc };
  ["pass", "__v"].forEach((key) => delete user[key]);
  res.json({ code: "ok", user });
});
router.route("/logout").get((req, res) => {
  res.clearCookie("access_token");
  res.json({ user: null, success: true });
});

module.exports = router;
