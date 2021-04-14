router.route("/contacts").get(passport.authenticate("UserAuth"), (req, res) => {
  User.find({ username: { $not: { $regex: req.user.username } } }).then(
    (users) => {
      res.json({
        code: "ok",
        contacts: users.map((user) => ({
          _id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
        })),
      });
    }
  );
});

module.exports = router;
