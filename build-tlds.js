/* eslint-env node */
const cheerio = require("cheerio");
const punycode = require("punycode");
	
async function rp(url) {
  const r = await fetch(url);
  if (!r.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return r.text();
}

Promise.all([
	rp("http://data.iana.org/TLD/tlds-alpha-by-domain.txt"),
	rp("http://research.domaintools.com/statistics/tld-counts/")
]).then(function([tlds, statistic]) {
	var $ = cheerio.load(statistic),
		tldCount = {};
		
	$("#tld-counts tbody").children().each(function(){
		var name = $(this).data("key"),
			amount = $(this).find(".amount").text().replace(/,/g, "");
			
		if (amount == "N/A") {
			amount = 0;
		}
			
		tldCount[name] = +amount;
	});
	
	tlds = tlds.split("\n")
		.map(line => line.toLowerCase())
		.filter(
			line => 
				line 
				&& line[0] != "#" 
				&& (tldCount[line] > 2 || tldCount[line] == undefined)
		);
	
	tlds = tlds.concat(
		tlds.filter(tld => tld.startsWith("xn--"))
			.map(tld => punycode.decode(tld.substr(4)))
	);

	var repl = {
		maxLength: tlds.reduce(
			(max, tld) => tld.length > max ? tld.length : max,
			0
		),
		
		chars: [...tlds.reduce(
			(s, tld) => {
				for (let c of tld) {
					if (c.charCodeAt(0) >= 128) {
						s.add(c);
					}
				}
				return s;
			},
			new Set
		)].join(""),
		
		table: tlds.reduce(
			(o, tld) => {
				o[tld] = true;
				return o;
			},
			{}
		)
	};

	process.stdout.write(JSON.stringify(repl, null, "  "));
});
