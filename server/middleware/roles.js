export const checkRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: `Access denied. Requires ${role} role.` });
    }
    next();
  };
};

export const checkAdmin = checkRole('admin');

export const checkMinor = (req, res, next) => {
  if (!req.user || !req.user.isMinor) {
    return res.status(403).json({ message: "Access denied. Requires minor student." });
  }
  next();
};

export const checkParentLinked = (req, res, next) => {
  if (req.user && req.user.isMinor && !req.user.parentLinked) {
    return res.status(403).json({ message: "Parent approval required. Please complete parent linking." });
  }
  next();
};
