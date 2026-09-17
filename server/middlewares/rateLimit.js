const requestsByKey = new Map();

export const rateLimit = ({ windowMs, maxRequests }) => (req, res, next) => {
  const key = `${req.ip}:${req.path}`;
  const now = Date.now();
  const requestWindow = requestsByKey.get(key) || [];
  const activeRequests = requestWindow.filter((timestamp) => now - timestamp < windowMs);

  if (activeRequests.length >= maxRequests) {
    res.set("Retry-After", Math.ceil(windowMs / 1000));
    return res.status(429).json({ message: "Too many requests. Please try again later." });
  }

  activeRequests.push(now);
  requestsByKey.set(key, activeRequests);
  next();
};
