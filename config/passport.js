const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.access_token;
  }
  return token;
};

// passport.use(
//   "Admin",
//   new LocalStrategy((username, password, next) => {
//     User.findOne({ id: username })
//       .then((user) => {
//         if (user && bcrypt.compareSync(password, user.pass))
//           return next(null, user);
//         return next(null, false);
//       })
//       .catch((err) => next(err, false));
//   })
// );
passport.use(
  "User",
  new LocalStrategy((username, password, next) => {
    User.findOne({ username, status: "active" })
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.pass)) {
          return next(null, user);
        }
        return next(null, false);
      })
      .catch((err) => next(err, false));
  })
);
passport.use(
  "UserAuth",
  new JwtStrategy(
    { jwtFromRequest: cookieExtractor, secretOrKey: process.env.JWT_SECRET },
    (payload, next) => {
      User.findOne({ _id: payload.sub, status: "active" })
        .then((user) => (user ? next(null, user) : next(null, false)))
        .catch((err) => next(err, false));
    }
  )
);
// passport.use(
//   "AdminAuth",
//   new JwtStrategy(
//     { jwtFromRequest: cookieExtractor, secretOrKey: process.env.JWT_SECRET },
//     (payload, next) => {
//       User.findOne({ _id: payload.sub, role: "admin" })
//         .then((admin) => (admin ? next(null, admin) : next(null, false)))
//         .catch((err) => next(err, false));
//     }
//   )
// );

passport.serializeUser((user, next) => next(null, user._id));
passport.deserializeUser((username, next) => {
  User.findById(username)
    .then((user) => next(null, user))
    .catch((err) => {
      console.log(err);
      next(err);
    });
});
