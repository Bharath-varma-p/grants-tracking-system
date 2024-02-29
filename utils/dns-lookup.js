const dns = require("dns/promises");

exports.dnsLookup = async (ip) => {
  let hostname, domains;
  try {
    hostname = (await dns.lookupService(ip, 80)).hostname;
    const domainList = await dns.reverse(ip);
    domains = domainList.join(",");
    // eslint-disable-next-line no-empty
  } catch (error) {}

  return {
    hostname,
    domains,
  };
};
