const checkAdmin = (req, res, next) => {
  const role = req.user.role;
  if (role === "ADMIN") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Not permission",
    });
  }
};

module.exports = checkAdmin;
