const asyncHandler = (requestHadler) => {
  return (req, res, next) => {
    Promise.resolve(requestHadler(req, res, next)).catch((err) => next(err));
  };
};

/*const asyncHandler = (requestHadler) => async (req, res, next) => {
  try {
    await requestHadler(req, res, next);
  } catch (error) {
    res
      .status(error.code || 500)
      .json({
        success: false,
        message: error.message || "Internal Server Error",
      });
  }
};*/

/*const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get(
  "/users",
  asyncHandler(async (req, res) => {
    const users = await getUsersFromDB();
    res.json(users);
  })
);
*/
