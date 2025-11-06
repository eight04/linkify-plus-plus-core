var tlds = require("./tlds.json");

module.exports = {
  IMAGE: /^[^?#]+\.(?:jpg|jpeg|png|apng|gif|svg|webp|avif)(?:$|[?#])/i,
  PROTOCOL: /([a-z][-a-z*]+:\/\/)?/i,
  USER: /(?:([\w:.+-]+)@)?/i,
  DOMAIN_UNI: new RegExp(`([a-z0-9-.\\u00A0-\\uFFFF]+\\.[a-z0-9-${tlds.chars}]{1,${tlds.maxLength}})`, "i"),
  DOMAIN: new RegExp(`([a-z0-9-.]+\\.[a-z0-9-]{1,${tlds.maxLength}})`, "i"),
  PORT: /(:\d+\b)?/,
  PATH_UNI: /([/?#]\S*)?/,
  PATH: /([/?#][\w-.~!$&*+;=:@%/?#(),'[\]]*)?/
}
