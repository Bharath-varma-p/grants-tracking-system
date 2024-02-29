exports.generateToken = function (n) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZVEDAT0123456789";
  let token = "";
  for (let i = 0; i < n; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
};
