import jwt from 'jsonwebtoken';


export function verifyToken(req, res, next) {
  const token = req.cookies['token'];   

  if (!token) {
    return res.status(401).json({ message: "Missing token" });

  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "The token is not valid."});       
    }

    req.user = decoded;                 
    next();                             
  });
}

export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: No permission", yourrole: `${req.user.role}` });
    }

    next();
  };
}

