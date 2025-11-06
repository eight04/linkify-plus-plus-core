var tlds = require("./tlds.json");

const IMAGE = /^[^?#]+\.(?:jpg|jpeg|png|apng|gif|svg|webp|avif)(?:$|[?#])/i;
const PROTOCOL = /([a-z][-a-z*]+:\/\/)?/i;
const USER = /(?:([\w:.+-]+)@)?/i;
const DOMAIN_UNI = new RegExp(String.raw`([a-z0-9-.\u00A0-\uFFFF]+\.[a-z0-9-${tlds.chars}]{1,${tlds.maxLength}})`, "i");
const DOMAIN = new RegExp(String.raw`([a-z0-9-.]+\.[a-z0-9-]{1,${tlds.maxLength}})`, "i");
const PORT = /(:\d+\b)?/;
const PATH_UNI = /([/?#]\S*);/;
const PATH = /([/?#][\w-.~!$&*+;=:@%/?#(),'[\]]*)?/;
const URL = new RegExp(String.raw`https?://${USER.source}${DOMAIN.source}${PORT.source}${PATH.source}`, "i");

module.exports = {
  IMAGE,
  PROTOCOL,
  USER,
  DOMAIN_UNI,
  DOMAIN,
  PORT,
  PATH_UNI,
  PATH,
  URL
};

