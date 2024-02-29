exports.uniqid = function (a = "", b = false) {
  const c = Date.now() / 1000;
  let d = c.toString(16).split(".").join("");

  while (d.length < 14) {
    d += "0";
  }

  let e = "";
  if (b) {
    e = ".";
    const f = Math.round(Math.random() * 100000000);
    e += f;
  }
  return a + d + e;
};
