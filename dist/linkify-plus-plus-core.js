var linkifyPlusPlusCore = (function (exports) {
  'use strict';

  var maxLength = 24;
  var chars = "セール佛山ಭಾರತ慈善集团在线한국ଭାରତভাৰতর八卦ישראלموقعবংল公益司网站移动我爱你москвақзнлйт联通рбгеקוםファッションストアசிங்கபூர商标店城дию新闻家電中文信国國娱乐భారత్ලංකා购物クラウドભારતभारतम्ोसंगठन餐厅络у香港食品飞利浦台湾灣手机الجزئرنیتبيپکسدغظحةڀ澳門닷컴شكგე构健康ไทย招聘фລາວみんなευλ世界書籍ഭാരതംਭਾਰਤ址넷コム游戏ö企业息صط广东இலைநதயாհայ加坡ف政务";
  var table = {
  	aaa: true,
  	aarp: true,
  	abb: true,
  	abbott: true,
  	abbvie: true,
  	abc: true,
  	able: true,
  	abogado: true,
  	abudhabi: true,
  	ac: true,
  	academy: true,
  	accountant: true,
  	accountants: true,
  	aco: true,
  	actor: true,
  	ad: true,
  	adult: true,
  	ae: true,
  	aeg: true,
  	aero: true,
  	aetna: true,
  	af: true,
  	afl: true,
  	africa: true,
  	ag: true,
  	agency: true,
  	ai: true,
  	aig: true,
  	airbus: true,
  	airforce: true,
  	akdn: true,
  	al: true,
  	allfinanz: true,
  	allstate: true,
  	ally: true,
  	alsace: true,
  	alstom: true,
  	am: true,
  	amazon: true,
  	americanexpress: true,
  	amex: true,
  	amfam: true,
  	amica: true,
  	amsterdam: true,
  	analytics: true,
  	android: true,
  	anz: true,
  	ao: true,
  	apartments: true,
  	app: true,
  	apple: true,
  	aq: true,
  	aquarelle: true,
  	ar: true,
  	archi: true,
  	army: true,
  	arpa: true,
  	art: true,
  	arte: true,
  	as: true,
  	asia: true,
  	associates: true,
  	at: true,
  	attorney: true,
  	au: true,
  	auction: true,
  	audi: true,
  	audio: true,
  	auspost: true,
  	auto: true,
  	autos: true,
  	aw: true,
  	aws: true,
  	ax: true,
  	axa: true,
  	az: true,
  	azure: true,
  	ba: true,
  	baby: true,
  	band: true,
  	bank: true,
  	bar: true,
  	barcelona: true,
  	barclaycard: true,
  	barclays: true,
  	bargains: true,
  	basketball: true,
  	bauhaus: true,
  	bayern: true,
  	bb: true,
  	bbc: true,
  	bbva: true,
  	bd: true,
  	be: true,
  	beauty: true,
  	beer: true,
  	bentley: true,
  	berlin: true,
  	best: true,
  	bet: true,
  	bf: true,
  	bg: true,
  	bh: true,
  	bi: true,
  	bible: true,
  	bid: true,
  	bike: true,
  	bing: true,
  	bingo: true,
  	bio: true,
  	biz: true,
  	bj: true,
  	black: true,
  	blackfriday: true,
  	blog: true,
  	bloomberg: true,
  	blue: true,
  	bm: true,
  	bmw: true,
  	bn: true,
  	bnpparibas: true,
  	bo: true,
  	boats: true,
  	bond: true,
  	boo: true,
  	bostik: true,
  	boston: true,
  	bot: true,
  	boutique: true,
  	box: true,
  	br: true,
  	bradesco: true,
  	bridgestone: true,
  	broadway: true,
  	broker: true,
  	brother: true,
  	brussels: true,
  	bs: true,
  	bt: true,
  	build: true,
  	builders: true,
  	business: true,
  	buzz: true,
  	bw: true,
  	by: true,
  	bz: true,
  	bzh: true,
  	ca: true,
  	cab: true,
  	cafe: true,
  	cam: true,
  	camera: true,
  	camp: true,
  	canon: true,
  	capetown: true,
  	capital: true,
  	car: true,
  	cards: true,
  	care: true,
  	career: true,
  	careers: true,
  	cars: true,
  	casa: true,
  	"case": true,
  	cash: true,
  	casino: true,
  	cat: true,
  	catering: true,
  	catholic: true,
  	cba: true,
  	cbn: true,
  	cc: true,
  	cd: true,
  	center: true,
  	ceo: true,
  	cern: true,
  	cf: true,
  	cfa: true,
  	cfd: true,
  	cg: true,
  	ch: true,
  	chanel: true,
  	channel: true,
  	charity: true,
  	chase: true,
  	chat: true,
  	cheap: true,
  	chintai: true,
  	christmas: true,
  	church: true,
  	ci: true,
  	cisco: true,
  	citi: true,
  	citic: true,
  	city: true,
  	ck: true,
  	cl: true,
  	claims: true,
  	cleaning: true,
  	click: true,
  	clinic: true,
  	clothing: true,
  	cloud: true,
  	club: true,
  	clubmed: true,
  	cm: true,
  	cn: true,
  	co: true,
  	coach: true,
  	codes: true,
  	coffee: true,
  	college: true,
  	cologne: true,
  	com: true,
  	commbank: true,
  	community: true,
  	company: true,
  	compare: true,
  	computer: true,
  	condos: true,
  	construction: true,
  	consulting: true,
  	contact: true,
  	contractors: true,
  	cooking: true,
  	cool: true,
  	coop: true,
  	corsica: true,
  	country: true,
  	coupons: true,
  	courses: true,
  	cpa: true,
  	cr: true,
  	credit: true,
  	creditcard: true,
  	creditunion: true,
  	cricket: true,
  	crown: true,
  	crs: true,
  	cruises: true,
  	cu: true,
  	cuisinella: true,
  	cv: true,
  	cw: true,
  	cx: true,
  	cy: true,
  	cymru: true,
  	cyou: true,
  	cz: true,
  	dabur: true,
  	dad: true,
  	dance: true,
  	date: true,
  	dating: true,
  	day: true,
  	de: true,
  	dealer: true,
  	deals: true,
  	degree: true,
  	delivery: true,
  	dell: true,
  	deloitte: true,
  	democrat: true,
  	dental: true,
  	dentist: true,
  	desi: true,
  	design: true,
  	dev: true,
  	dhl: true,
  	diamonds: true,
  	diet: true,
  	digital: true,
  	direct: true,
  	directory: true,
  	discount: true,
  	discover: true,
  	diy: true,
  	dj: true,
  	dk: true,
  	dm: true,
  	dnp: true,
  	"do": true,
  	doctor: true,
  	dog: true,
  	domains: true,
  	download: true,
  	dubai: true,
  	dupont: true,
  	durban: true,
  	dvag: true,
  	dz: true,
  	earth: true,
  	ec: true,
  	eco: true,
  	edeka: true,
  	edu: true,
  	education: true,
  	ee: true,
  	eg: true,
  	email: true,
  	emerck: true,
  	energy: true,
  	engineer: true,
  	engineering: true,
  	enterprises: true,
  	equipment: true,
  	er: true,
  	ericsson: true,
  	erni: true,
  	es: true,
  	esq: true,
  	estate: true,
  	et: true,
  	eu: true,
  	eurovision: true,
  	eus: true,
  	events: true,
  	exchange: true,
  	expert: true,
  	exposed: true,
  	express: true,
  	extraspace: true,
  	fage: true,
  	fail: true,
  	fairwinds: true,
  	faith: true,
  	family: true,
  	fan: true,
  	fans: true,
  	farm: true,
  	fashion: true,
  	feedback: true,
  	ferrero: true,
  	fi: true,
  	film: true,
  	finance: true,
  	financial: true,
  	firmdale: true,
  	fish: true,
  	fishing: true,
  	fit: true,
  	fitness: true,
  	fj: true,
  	fk: true,
  	flickr: true,
  	flights: true,
  	florist: true,
  	flowers: true,
  	fm: true,
  	fo: true,
  	foo: true,
  	food: true,
  	football: true,
  	ford: true,
  	forex: true,
  	forsale: true,
  	forum: true,
  	foundation: true,
  	fox: true,
  	fr: true,
  	fresenius: true,
  	frl: true,
  	frogans: true,
  	fujitsu: true,
  	fun: true,
  	fund: true,
  	furniture: true,
  	futbol: true,
  	fyi: true,
  	ga: true,
  	gal: true,
  	gallery: true,
  	game: true,
  	games: true,
  	garden: true,
  	gay: true,
  	gd: true,
  	gdn: true,
  	ge: true,
  	gea: true,
  	gent: true,
  	genting: true,
  	gf: true,
  	gg: true,
  	gh: true,
  	gi: true,
  	gift: true,
  	gifts: true,
  	gives: true,
  	giving: true,
  	gl: true,
  	glass: true,
  	gle: true,
  	global: true,
  	globo: true,
  	gm: true,
  	gmail: true,
  	gmbh: true,
  	gmo: true,
  	gmx: true,
  	gn: true,
  	godaddy: true,
  	gold: true,
  	golf: true,
  	goog: true,
  	google: true,
  	gop: true,
  	gov: true,
  	gp: true,
  	gq: true,
  	gr: true,
  	grainger: true,
  	graphics: true,
  	gratis: true,
  	green: true,
  	gripe: true,
  	group: true,
  	gs: true,
  	gt: true,
  	gu: true,
  	gucci: true,
  	guide: true,
  	guitars: true,
  	guru: true,
  	gw: true,
  	gy: true,
  	hair: true,
  	hamburg: true,
  	haus: true,
  	health: true,
  	healthcare: true,
  	help: true,
  	helsinki: true,
  	here: true,
  	hermes: true,
  	hiphop: true,
  	hisamitsu: true,
  	hitachi: true,
  	hiv: true,
  	hk: true,
  	hm: true,
  	hn: true,
  	hockey: true,
  	holdings: true,
  	holiday: true,
  	homes: true,
  	honda: true,
  	horse: true,
  	hospital: true,
  	host: true,
  	hosting: true,
  	hotmail: true,
  	house: true,
  	how: true,
  	hr: true,
  	hsbc: true,
  	ht: true,
  	hu: true,
  	hyatt: true,
  	hyundai: true,
  	ice: true,
  	icu: true,
  	id: true,
  	ie: true,
  	ieee: true,
  	ifm: true,
  	ikano: true,
  	il: true,
  	im: true,
  	imamat: true,
  	immo: true,
  	immobilien: true,
  	"in": true,
  	inc: true,
  	industries: true,
  	info: true,
  	ing: true,
  	ink: true,
  	institute: true,
  	insurance: true,
  	insure: true,
  	int: true,
  	international: true,
  	investments: true,
  	io: true,
  	ipiranga: true,
  	iq: true,
  	ir: true,
  	irish: true,
  	is: true,
  	ismaili: true,
  	ist: true,
  	istanbul: true,
  	it: true,
  	itau: true,
  	itv: true,
  	jaguar: true,
  	java: true,
  	jcb: true,
  	je: true,
  	jetzt: true,
  	jewelry: true,
  	jio: true,
  	jll: true,
  	jm: true,
  	jmp: true,
  	jnj: true,
  	jo: true,
  	jobs: true,
  	joburg: true,
  	jp: true,
  	jpmorgan: true,
  	jprs: true,
  	juegos: true,
  	kaufen: true,
  	ke: true,
  	kfh: true,
  	kg: true,
  	kh: true,
  	ki: true,
  	kia: true,
  	kids: true,
  	kim: true,
  	kitchen: true,
  	kiwi: true,
  	km: true,
  	kn: true,
  	koeln: true,
  	komatsu: true,
  	kp: true,
  	kpmg: true,
  	kpn: true,
  	kr: true,
  	krd: true,
  	kred: true,
  	kw: true,
  	ky: true,
  	kyoto: true,
  	kz: true,
  	la: true,
  	lamborghini: true,
  	lancaster: true,
  	land: true,
  	landrover: true,
  	lanxess: true,
  	lat: true,
  	latrobe: true,
  	law: true,
  	lawyer: true,
  	lb: true,
  	lc: true,
  	lease: true,
  	leclerc: true,
  	legal: true,
  	lexus: true,
  	lgbt: true,
  	li: true,
  	lidl: true,
  	life: true,
  	lifestyle: true,
  	lighting: true,
  	lilly: true,
  	limited: true,
  	limo: true,
  	lincoln: true,
  	link: true,
  	lipsy: true,
  	live: true,
  	living: true,
  	lk: true,
  	llc: true,
  	loan: true,
  	loans: true,
  	locus: true,
  	lol: true,
  	london: true,
  	lotto: true,
  	love: true,
  	lr: true,
  	ls: true,
  	lt: true,
  	ltd: true,
  	ltda: true,
  	lu: true,
  	lundbeck: true,
  	luxe: true,
  	luxury: true,
  	lv: true,
  	ly: true,
  	ma: true,
  	madrid: true,
  	maif: true,
  	maison: true,
  	makeup: true,
  	man: true,
  	management: true,
  	mango: true,
  	market: true,
  	marketing: true,
  	markets: true,
  	marriott: true,
  	mattel: true,
  	mba: true,
  	mc: true,
  	md: true,
  	me: true,
  	med: true,
  	media: true,
  	meet: true,
  	melbourne: true,
  	meme: true,
  	memorial: true,
  	men: true,
  	menu: true,
  	mg: true,
  	mh: true,
  	miami: true,
  	microsoft: true,
  	mil: true,
  	mini: true,
  	mit: true,
  	mk: true,
  	ml: true,
  	mlb: true,
  	mm: true,
  	mma: true,
  	mn: true,
  	mo: true,
  	mobi: true,
  	moda: true,
  	moe: true,
  	moi: true,
  	mom: true,
  	monash: true,
  	money: true,
  	monster: true,
  	mortgage: true,
  	moscow: true,
  	motorcycles: true,
  	mov: true,
  	movie: true,
  	mp: true,
  	mq: true,
  	mr: true,
  	ms: true,
  	mt: true,
  	mtn: true,
  	mtr: true,
  	mu: true,
  	museum: true,
  	music: true,
  	mv: true,
  	mw: true,
  	mx: true,
  	my: true,
  	mz: true,
  	na: true,
  	nab: true,
  	nagoya: true,
  	name: true,
  	navy: true,
  	nc: true,
  	ne: true,
  	nec: true,
  	net: true,
  	netbank: true,
  	network: true,
  	neustar: true,
  	"new": true,
  	news: true,
  	next: true,
  	nexus: true,
  	nf: true,
  	ng: true,
  	ngo: true,
  	ni: true,
  	nico: true,
  	nike: true,
  	ninja: true,
  	nissan: true,
  	nl: true,
  	no: true,
  	nokia: true,
  	nowruz: true,
  	np: true,
  	nr: true,
  	nra: true,
  	nrw: true,
  	ntt: true,
  	nu: true,
  	nyc: true,
  	nz: true,
  	observer: true,
  	office: true,
  	okinawa: true,
  	om: true,
  	omega: true,
  	one: true,
  	ong: true,
  	onl: true,
  	online: true,
  	ooo: true,
  	oracle: true,
  	orange: true,
  	org: true,
  	organic: true,
  	osaka: true,
  	otsuka: true,
  	ovh: true,
  	pa: true,
  	page: true,
  	panasonic: true,
  	paris: true,
  	partners: true,
  	parts: true,
  	party: true,
  	pe: true,
  	pet: true,
  	pf: true,
  	pfizer: true,
  	pg: true,
  	ph: true,
  	pharmacy: true,
  	phd: true,
  	philips: true,
  	photo: true,
  	photography: true,
  	photos: true,
  	physio: true,
  	pics: true,
  	pictet: true,
  	pictures: true,
  	ping: true,
  	pink: true,
  	pioneer: true,
  	pizza: true,
  	pk: true,
  	pl: true,
  	place: true,
  	plumbing: true,
  	plus: true,
  	pm: true,
  	pn: true,
  	pohl: true,
  	poker: true,
  	politie: true,
  	porn: true,
  	post: true,
  	pr: true,
  	praxi: true,
  	press: true,
  	prime: true,
  	pro: true,
  	productions: true,
  	prof: true,
  	promo: true,
  	properties: true,
  	property: true,
  	protection: true,
  	pru: true,
  	prudential: true,
  	ps: true,
  	pt: true,
  	pub: true,
  	pw: true,
  	pwc: true,
  	py: true,
  	qa: true,
  	qpon: true,
  	quebec: true,
  	quest: true,
  	racing: true,
  	radio: true,
  	re: true,
  	realestate: true,
  	realtor: true,
  	realty: true,
  	recipes: true,
  	red: true,
  	redstone: true,
  	rehab: true,
  	reise: true,
  	reisen: true,
  	reit: true,
  	ren: true,
  	rent: true,
  	rentals: true,
  	repair: true,
  	report: true,
  	republican: true,
  	rest: true,
  	restaurant: true,
  	review: true,
  	reviews: true,
  	rexroth: true,
  	rich: true,
  	ricoh: true,
  	rio: true,
  	rip: true,
  	ro: true,
  	rocks: true,
  	rodeo: true,
  	rogers: true,
  	rs: true,
  	rsvp: true,
  	ru: true,
  	rugby: true,
  	ruhr: true,
  	run: true,
  	rw: true,
  	ryukyu: true,
  	sa: true,
  	saarland: true,
  	sale: true,
  	salon: true,
  	samsung: true,
  	sandvik: true,
  	sandvikcoromant: true,
  	sanofi: true,
  	sap: true,
  	sarl: true,
  	saxo: true,
  	sb: true,
  	sbi: true,
  	sbs: true,
  	sc: true,
  	scb: true,
  	schaeffler: true,
  	schmidt: true,
  	school: true,
  	schule: true,
  	schwarz: true,
  	science: true,
  	scot: true,
  	sd: true,
  	se: true,
  	seat: true,
  	security: true,
  	select: true,
  	sener: true,
  	services: true,
  	seven: true,
  	sew: true,
  	sex: true,
  	sexy: true,
  	sfr: true,
  	sg: true,
  	sh: true,
  	sharp: true,
  	shell: true,
  	shiksha: true,
  	shoes: true,
  	shop: true,
  	shopping: true,
  	show: true,
  	si: true,
  	singles: true,
  	site: true,
  	sk: true,
  	ski: true,
  	skin: true,
  	sky: true,
  	skype: true,
  	sl: true,
  	sm: true,
  	smart: true,
  	sn: true,
  	sncf: true,
  	so: true,
  	soccer: true,
  	social: true,
  	softbank: true,
  	software: true,
  	sohu: true,
  	solar: true,
  	solutions: true,
  	sony: true,
  	soy: true,
  	spa: true,
  	space: true,
  	sport: true,
  	sr: true,
  	srl: true,
  	ss: true,
  	st: true,
  	stada: true,
  	statebank: true,
  	statefarm: true,
  	stc: true,
  	stockholm: true,
  	storage: true,
  	store: true,
  	stream: true,
  	studio: true,
  	study: true,
  	style: true,
  	su: true,
  	sucks: true,
  	supplies: true,
  	supply: true,
  	support: true,
  	surf: true,
  	surgery: true,
  	suzuki: true,
  	sv: true,
  	swatch: true,
  	swiss: true,
  	sx: true,
  	sy: true,
  	sydney: true,
  	systems: true,
  	sz: true,
  	taipei: true,
  	target: true,
  	tatamotors: true,
  	tatar: true,
  	tattoo: true,
  	tax: true,
  	taxi: true,
  	tc: true,
  	td: true,
  	team: true,
  	tech: true,
  	technology: true,
  	tel: true,
  	temasek: true,
  	tennis: true,
  	teva: true,
  	tf: true,
  	tg: true,
  	th: true,
  	theater: true,
  	theatre: true,
  	tickets: true,
  	tienda: true,
  	tips: true,
  	tires: true,
  	tirol: true,
  	tj: true,
  	tk: true,
  	tl: true,
  	tm: true,
  	tn: true,
  	to: true,
  	today: true,
  	tokyo: true,
  	tools: true,
  	top: true,
  	toray: true,
  	toshiba: true,
  	total: true,
  	tours: true,
  	town: true,
  	toyota: true,
  	toys: true,
  	tr: true,
  	trade: true,
  	trading: true,
  	training: true,
  	travel: true,
  	travelers: true,
  	trust: true,
  	tt: true,
  	tube: true,
  	tui: true,
  	tv: true,
  	tvs: true,
  	tw: true,
  	tz: true,
  	ua: true,
  	ug: true,
  	uk: true,
  	unicom: true,
  	university: true,
  	uno: true,
  	uol: true,
  	us: true,
  	uy: true,
  	uz: true,
  	va: true,
  	vacations: true,
  	vana: true,
  	vanguard: true,
  	vc: true,
  	ve: true,
  	vegas: true,
  	ventures: true,
  	versicherung: true,
  	vet: true,
  	vg: true,
  	vi: true,
  	viajes: true,
  	video: true,
  	vig: true,
  	villas: true,
  	vin: true,
  	vip: true,
  	vision: true,
  	vivo: true,
  	vlaanderen: true,
  	vn: true,
  	vodka: true,
  	vote: true,
  	voting: true,
  	voto: true,
  	voyage: true,
  	vu: true,
  	wales: true,
  	walter: true,
  	wang: true,
  	watch: true,
  	watches: true,
  	webcam: true,
  	weber: true,
  	website: true,
  	wed: true,
  	wedding: true,
  	weir: true,
  	wf: true,
  	whoswho: true,
  	wien: true,
  	wiki: true,
  	williamhill: true,
  	win: true,
  	windows: true,
  	wine: true,
  	wme: true,
  	woodside: true,
  	work: true,
  	works: true,
  	world: true,
  	ws: true,
  	wtf: true,
  	xbox: true,
  	xin: true,
  	"xn--1ck2e1b": true,
  	"xn--1qqw23a": true,
  	"xn--2scrj9c": true,
  	"xn--30rr7y": true,
  	"xn--3bst00m": true,
  	"xn--3ds443g": true,
  	"xn--3e0b707e": true,
  	"xn--3hcrj9c": true,
  	"xn--45br5cyl": true,
  	"xn--45brj9c": true,
  	"xn--45q11c": true,
  	"xn--4dbrk0ce": true,
  	"xn--4gbrim": true,
  	"xn--54b7fta0cc": true,
  	"xn--55qw42g": true,
  	"xn--55qx5d": true,
  	"xn--5tzm5g": true,
  	"xn--6frz82g": true,
  	"xn--6qq986b3xl": true,
  	"xn--80adxhks": true,
  	"xn--80ao21a": true,
  	"xn--80asehdb": true,
  	"xn--80aswg": true,
  	"xn--8y0a063a": true,
  	"xn--90a3ac": true,
  	"xn--90ae": true,
  	"xn--90ais": true,
  	"xn--9dbq2a": true,
  	"xn--bck1b9a5dre4c": true,
  	"xn--c1avg": true,
  	"xn--cck2b3b": true,
  	"xn--clchc0ea0b2g2a9gcd": true,
  	"xn--czr694b": true,
  	"xn--czrs0t": true,
  	"xn--czru2d": true,
  	"xn--d1acj3b": true,
  	"xn--d1alf": true,
  	"xn--e1a4c": true,
  	"xn--efvy88h": true,
  	"xn--fct429k": true,
  	"xn--fiq228c5hs": true,
  	"xn--fiq64b": true,
  	"xn--fiqs8s": true,
  	"xn--fiqz9s": true,
  	"xn--fjq720a": true,
  	"xn--fpcrj9c3d": true,
  	"xn--fzc2c9e2c": true,
  	"xn--g2xx48c": true,
  	"xn--gckr3f0f": true,
  	"xn--gecrj9c": true,
  	"xn--h2breg3eve": true,
  	"xn--h2brj9c": true,
  	"xn--h2brj9c8c": true,
  	"xn--hxt814e": true,
  	"xn--i1b6b1a6a2e": true,
  	"xn--imr513n": true,
  	"xn--io0a7i": true,
  	"xn--j1amh": true,
  	"xn--j6w193g": true,
  	"xn--jvr189m": true,
  	"xn--kcrx77d1x4a": true,
  	"xn--kprw13d": true,
  	"xn--kpry57d": true,
  	"xn--kput3i": true,
  	"xn--l1acc": true,
  	"xn--lgbbat1ad8j": true,
  	"xn--mgb9awbf": true,
  	"xn--mgba3a4f16a": true,
  	"xn--mgbaam7a8h": true,
  	"xn--mgbab2bd": true,
  	"xn--mgbah1a3hjkrd": true,
  	"xn--mgbai9azgqp6j": true,
  	"xn--mgbayh7gpa": true,
  	"xn--mgbbh1a": true,
  	"xn--mgbc0a9azcg": true,
  	"xn--mgbca7dzdo": true,
  	"xn--mgbcpq6gpa1a": true,
  	"xn--mgberp4a5d4ar": true,
  	"xn--mgbgu82a": true,
  	"xn--mgbpl2fh": true,
  	"xn--mgbtx2b": true,
  	"xn--mix891f": true,
  	"xn--mk1bu44c": true,
  	"xn--ngbc5azd": true,
  	"xn--ngbe9e0a": true,
  	"xn--node": true,
  	"xn--nqv7f": true,
  	"xn--nyqy26a": true,
  	"xn--o3cw4h": true,
  	"xn--ogbpf8fl": true,
  	"xn--otu796d": true,
  	"xn--p1acf": true,
  	"xn--p1ai": true,
  	"xn--pgbs0dh": true,
  	"xn--q7ce6a": true,
  	"xn--q9jyb4c": true,
  	"xn--qxa6a": true,
  	"xn--qxam": true,
  	"xn--rhqv96g": true,
  	"xn--rovu88b": true,
  	"xn--rvc1e0am3e": true,
  	"xn--s9brj9c": true,
  	"xn--ses554g": true,
  	"xn--t60b56a": true,
  	"xn--tckwe": true,
  	"xn--unup4y": true,
  	"xn--vermgensberatung-pwb": true,
  	"xn--vhquv": true,
  	"xn--vuq861b": true,
  	"xn--wgbh1c": true,
  	"xn--wgbl6a": true,
  	"xn--xhq521b": true,
  	"xn--xkc2al3hye2a": true,
  	"xn--xkc2dl3a5ee0h": true,
  	"xn--y9a3aq": true,
  	"xn--yfro4i67o": true,
  	"xn--ygbi2ammx": true,
  	"xn--zfr164b": true,
  	xxx: true,
  	xyz: true,
  	yachts: true,
  	yahoo: true,
  	yandex: true,
  	ye: true,
  	yodobashi: true,
  	yoga: true,
  	yokohama: true,
  	youtube: true,
  	yt: true,
  	za: true,
  	zappos: true,
  	zara: true,
  	zip: true,
  	zm: true,
  	zone: true,
  	zuerich: true,
  	zw: true,
  	"セール": true,
  	"佛山": true,
  	"ಭಾರತ": true,
  	"慈善": true,
  	"集团": true,
  	"在线": true,
  	"한국": true,
  	"ଭାରତ": true,
  	"ভাৰত": true,
  	"ভারত": true,
  	"八卦": true,
  	"ישראל": true,
  	"موقع": true,
  	"বাংলা": true,
  	"公益": true,
  	"公司": true,
  	"网站": true,
  	"移动": true,
  	"我爱你": true,
  	"москва": true,
  	"қаз": true,
  	"онлайн": true,
  	"сайт": true,
  	"联通": true,
  	"срб": true,
  	"бг": true,
  	"бел": true,
  	"קום": true,
  	"ファッション": true,
  	"орг": true,
  	"ストア": true,
  	"சிங்கப்பூர்": true,
  	"商标": true,
  	"商店": true,
  	"商城": true,
  	"дети": true,
  	"мкд": true,
  	"ею": true,
  	"新闻": true,
  	"家電": true,
  	"中文网": true,
  	"中信": true,
  	"中国": true,
  	"中國": true,
  	"娱乐": true,
  	"భారత్": true,
  	"ලංකා": true,
  	"购物": true,
  	"クラウド": true,
  	"ભારત": true,
  	"भारतम्": true,
  	"भारत": true,
  	"भारोत": true,
  	"网店": true,
  	"संगठन": true,
  	"餐厅": true,
  	"网络": true,
  	"укр": true,
  	"香港": true,
  	"食品": true,
  	"飞利浦": true,
  	"台湾": true,
  	"台灣": true,
  	"手机": true,
  	"мон": true,
  	"الجزائر": true,
  	"عمان": true,
  	"ایران": true,
  	"امارات": true,
  	"بازار": true,
  	"موريتانيا": true,
  	"پاکستان": true,
  	"الاردن": true,
  	"بارت": true,
  	"المغرب": true,
  	"ابوظبي": true,
  	"البحرين": true,
  	"السعودية": true,
  	"ڀارت": true,
  	"سودان": true,
  	"عراق": true,
  	"澳門": true,
  	"닷컴": true,
  	"شبكة": true,
  	"بيتك": true,
  	"გე": true,
  	"机构": true,
  	"健康": true,
  	"ไทย": true,
  	"سورية": true,
  	"招聘": true,
  	"рус": true,
  	"рф": true,
  	"تونس": true,
  	"ລາວ": true,
  	"みんな": true,
  	"ευ": true,
  	"ελ": true,
  	"世界": true,
  	"書籍": true,
  	"ഭാരതം": true,
  	"ਭਾਰਤ": true,
  	"网址": true,
  	"닷넷": true,
  	"コム": true,
  	"游戏": true,
  	"vermögensberatung": true,
  	"企业": true,
  	"信息": true,
  	"مصر": true,
  	"قطر": true,
  	"广东": true,
  	"இலங்கை": true,
  	"இந்தியா": true,
  	"հայ": true,
  	"新加坡": true,
  	"فلسطين": true,
  	"政务": true
  };

  var RE = {
  		PROTOCOL: "([a-z][-a-z*]+://)?",
  		USER: "(?:([\\w:.+-]+)@)?",
  		DOMAIN_UNI: `([a-z0-9-.\\u00A0-\\uFFFF]+\\.[a-z0-9-${chars}]{1,${maxLength}})`,
  		DOMAIN: `([a-z0-9-.]+\\.[a-z0-9-]{1,${maxLength}})`,
  		PORT: "(:\\d+\\b)?",
  		PATH_UNI: "([/?#]\\S*)?",
  		PATH: "([/?#][\\w-.~!$&*+;=:@%/?#(),'\\[\\]]*)?"
  	},
  	TLD_TABLE = table;

  function regexEscape(text) {
  	return text.replace(/[[\]\\^-]/g, "\\$&");
  }

  function buildRegex({
  	unicode = false, customRules = [], standalone = false,
  	boundaryLeft, boundaryRight
  }) {
  	var pattern = RE.PROTOCOL + RE.USER;
  	
  	if (unicode) {
  		pattern += RE.DOMAIN_UNI + RE.PORT + RE.PATH_UNI;
  	} else {
  		pattern += RE.DOMAIN + RE.PORT + RE.PATH;
  	}
  	
  	if (customRules.length) {
  		pattern = "(?:(" + customRules.join("|") + ")|" + pattern + ")";
  	} else {
  		pattern = "()" + pattern;
  	}
  	
  	var prefix, suffix, invalidSuffix;
  	if (standalone) {
  		if (boundaryLeft) {
  			prefix = "((?:^|\\s)[" + regexEscape(boundaryLeft) + "]*?)";
  		} else {
  			prefix = "(^|\\s)";
  		}
  		if (boundaryRight) {
  			suffix = "([" + regexEscape(boundaryRight) + "]*(?:$|\\s))";
  		} else {
  			suffix = "($|\\s)";
  		}
  		invalidSuffix = "[^\\s" + regexEscape(boundaryRight) + "]";
  	} else {
  		prefix = "(^|\\b|_)";
  		suffix = "()";
  	}
  	
  	pattern = prefix + pattern + suffix;
  	
  	return {
  		url: new RegExp(pattern, "igm"),
  		invalidSuffix: invalidSuffix && new RegExp(invalidSuffix),
  		mustache: /\{\{[\s\S]+?\}\}/g
  	};
  }

  function pathStrip(m, re, repl) {
  	var s = m.path.replace(re, repl);

  	if (s == m.path) return;
  	
  	m.end -= m.path.length - s.length;
  	m.suffix = m.path.slice(s.length) + m.suffix;
  	m.path = s;
  }

  function pathStripQuote(m, c) {
  	var i = 0, s = m.path, end, pos = 0;
  	
  	if (!s.endsWith(c)) return;
  	
  	while ((pos = s.indexOf(c, pos)) >= 0) {
  		if (i % 2) {
  			end = null;
  		} else {
  			end = pos;
  		}
  		pos++;
  		i++;
  	}
  	
  	if (!end) return;
  	
  	m.end -= s.length - end;
  	m.path = s.slice(0, end);
  	m.suffix = s.slice(end) + m.suffix;
  }

  function pathStripBrace(m, left, right) {
  	var str = m.path,
  		re = new RegExp("[\\" + left + "\\" + right + "]", "g"),
  		match, count = 0, end;

  	// Match loop
  	while ((match = re.exec(str))) {
  		if (count % 2 == 0) {
  			end = match.index;
  			if (match[0] == right) {
  				break;
  			}
  		} else {
  			if (match[0] == left) {
  				break;
  			}
  		}
  		count++;
  	}

  	if (!match && count % 2 == 0) {
  		return;
  	}
  	
  	m.end -= m.path.length - end;
  	m.path = str.slice(0, end);
  	m.suffix = str.slice(end) + m.suffix;
  }

  function isIP(s) {
  	var m, i;
  	if (!(m = s.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/))) {
  		return false;
  	}
  	for (i = 1; i < m.length; i++) {
  		if (+m[i] > 255 || (m[i].length > 1 && m[i][0] == "0")) {
  			return false;
  		}
  	}
  	return true;
  }

  function inTLDS(domain) {
  	var match = domain.match(/\.([^.]+)$/);
  	if (!match) {
  		return false;
  	}
  	var key = match[1].toLowerCase();
    // eslint-disable-next-line no-prototype-builtins
  	return TLD_TABLE.hasOwnProperty(key);
  }

  class UrlMatcher {
  	constructor(options = {}) {
  		this.options = options;
  		this.regex = buildRegex(options);
  	}
  	
  	*match(text) {
  		var {
  				fuzzyIp = true,
  				ignoreMustache = false,
          mail = true
  			} = this.options,
  			{
  				url,
  				invalidSuffix,
  				mustache
  			} = this.regex,
  			urlLastIndex, mustacheLastIndex;
  			
  		mustache.lastIndex = 0;
  		url.lastIndex = 0;
  		
  		var mustacheMatch, mustacheRange;
  		if (ignoreMustache) {
  			mustacheMatch = mustache.exec(text);
  			if (mustacheMatch) {
  				mustacheRange = {
  					start: mustacheMatch.index,
  					end: mustache.lastIndex
  				};
  			}
  		}
  		
  		var urlMatch;
  		while ((urlMatch = url.exec(text))) {
        const result = {
          start: 0,
          end: 0,
          
          text: "",
          url: "",
          
          prefix: urlMatch[1],
          custom: urlMatch[2],
          protocol: urlMatch[3],
          auth: urlMatch[4] || "",
          domain: urlMatch[5],
          port: urlMatch[6] || "",
          path: urlMatch[7] || "",
          suffix: urlMatch[8]
        };
        
        if (result.custom) {
          result.start = urlMatch.index;
          result.end = url.lastIndex;
          result.text = result.url = urlMatch[0];
  			} else {
          
          result.start = urlMatch.index + result.prefix.length;
          result.end = url.lastIndex - result.suffix.length;
  			}
  			
  			if (mustacheRange && mustacheRange.end <= result.start) {
  				mustacheMatch = mustache.exec(text);
  				if (mustacheMatch) {
  					mustacheRange.start = mustacheMatch.index;
  					mustacheRange.end = mustache.lastIndex;
  				} else {
  					mustacheRange = null;
  				}
  			}
  			
  			// ignore urls inside mustache pair
  			if (mustacheRange && result.start < mustacheRange.end && result.end >= mustacheRange.start) {
  				continue;
  			}
  			
  			if (!result.custom) {
  				// adjust path and suffix
  				if (result.path) {
  					// Strip BBCode
  					pathStrip(result, /\[\/?(b|i|u|url|img|quote|code|size|color)\].*/i, "");
  					
  					// Strip braces
  					pathStripBrace(result, "(", ")");
  					pathStripBrace(result, "[", "]");
  					pathStripBrace(result, "{", "}");
  					
  					// Strip quotes
  					pathStripQuote(result, "'");
  					pathStripQuote(result, '"');
  					
  					// Remove trailing ".,?"
  					pathStrip(result, /(^|[^-_])[.,?]+$/, "$1");
  				}
  				
  				// check suffix
  				if (invalidSuffix && invalidSuffix.test(result.suffix)) {
  					if (/\s$/.test(result.suffix)) {
  						url.lastIndex--;
  					}
  					continue;
  				}
          
          // ignore fuzzy ip
  				if (!fuzzyIp && isIP(result.domain) &&
              !result.protocol && !result.auth && !result.path) {
            continue;
          }
          
  				// mailto protocol
  				if (!result.protocol && result.auth) {
  					var matchMail = result.auth.match(/^mailto:(.+)/);
  					if (matchMail) {
  						result.protocol = "mailto:";
  						result.auth = matchMail[1];
  					}
  				}

  				// http alias
  				if (result.protocol && result.protocol.match(/^(hxxp|h\*\*p|ttp)/)) {
  					result.protocol = "http://";
  				}

  				// guess protocol
  				if (!result.protocol) {
  					var domainMatch;
  					if ((domainMatch = result.domain.match(/^(ftp|irc)/))) {
  						result.protocol = domainMatch[0] + "://";
  					} else if (result.domain.match(/^(www|web)/)) {
  						result.protocol = "http://";
  					} else if (result.auth && result.auth.indexOf(":") < 0 && !result.path) {
  						result.protocol = "mailto:";
  					} else {
  						result.protocol = "http://";
  					}
  				}
          
          // ignore mail
          if (!mail && result.protocol === "mailto:") {
            continue;
          }
          
  				// verify domain
          if (!isIP(result.domain)) {
            if (/^(http|https|mailto)/.test(result.protocol) && !inTLDS(result.domain)) {
              continue;
            }
            
            const invalidLabel = getInvalidLabel(result.domain);
            if (invalidLabel) {
              url.lastIndex = urlMatch.index + invalidLabel.index + 1;
              continue;
            }
          }

  				// Create URL
  				result.url = result.protocol + (result.auth && result.auth + "@") + result.domain + result.port + result.path;
  				result.text = text.slice(result.start, result.end);
  			}
  			
  			// since regex is shared with other parse generators, cache lastIndex position and restore later
  			mustacheLastIndex = mustache.lastIndex;
  			urlLastIndex = url.lastIndex;
  			
  			yield result;
  			
  			url.lastIndex = urlLastIndex;
  			mustache.lastIndex = mustacheLastIndex;
  		}
  	}
  }

  function getInvalidLabel(domain) {
    // https://tools.ietf.org/html/rfc1035
    // https://serverfault.com/questions/638260/is-it-valid-for-a-hostname-to-start-with-a-digit
    let index = 0;
    const parts = domain.split(".");
    for (const part of parts) {
      if (
        !part ||
        part.startsWith("-") ||
        part.endsWith("-")
      ) {
        return {
          index,
          value: part
        };
      }
      index += part.length + 1;
    }
  }

  /**
   * event-lite.js - Light-weight EventEmitter (less than 1KB when gzipped)
   *
   * @copyright Yusuke Kawasaki
   * @license MIT
   * @constructor
   * @see https://github.com/kawanet/event-lite
   * @see http://kawanet.github.io/event-lite/EventLite.html
   * @example
   * var EventLite = require("event-lite");
   *
   * function MyClass() {...}             // your class
   *
   * EventLite.mixin(MyClass.prototype);  // import event methods
   *
   * var obj = new MyClass();
   * obj.on("foo", function() {...});     // add event listener
   * obj.once("bar", function() {...});   // add one-time event listener
   * obj.emit("foo");                     // dispatch event
   * obj.emit("bar");                     // dispatch another event
   * obj.off("foo");                      // remove event listener
   */

  function EventLite() {
    if (!(this instanceof EventLite)) return new EventLite();
  }

  // (function(EventLite) {
    // export the class for node.js
    // if ("undefined" !== typeof module) module.exports = EventLite;

    // property name to hold listeners
    var LISTENERS = "listeners";

    // methods to export
    var methods = {
      on: on,
      once: once,
      off: off,
      emit: emit
    };

    // mixin to self
    mixin(EventLite.prototype);

    // export mixin function
    EventLite.mixin = mixin;

    /**
     * Import on(), once(), off() and emit() methods into target object.
     *
     * @function EventLite.mixin
     * @param target {Prototype}
     */

    function mixin(target) {
      for (var key in methods) {
        target[key] = methods[key];
      }
      return target;
    }

    /**
     * Add an event listener.
     *
     * @function EventLite.prototype.on
     * @param type {string}
     * @param func {Function}
     * @returns {EventLite} Self for method chaining
     */

    function on(type, func) {
      getListeners(this, type).push(func);
      return this;
    }

    /**
     * Add one-time event listener.
     *
     * @function EventLite.prototype.once
     * @param type {string}
     * @param func {Function}
     * @returns {EventLite} Self for method chaining
     */

    function once(type, func) {
      var that = this;
      wrap.originalListener = func;
      getListeners(that, type).push(wrap);
      return that;

      function wrap() {
        off.call(that, type, wrap);
        func.apply(this, arguments);
      }
    }

    /**
     * Remove an event listener.
     *
     * @function EventLite.prototype.off
     * @param [type] {string}
     * @param [func] {Function}
     * @returns {EventLite} Self for method chaining
     */

    function off(type, func) {
      var that = this;
      var listners;
      if (!arguments.length) {
        delete that[LISTENERS];
      } else if (!func) {
        listners = that[LISTENERS];
        if (listners) {
          delete listners[type];
          if (!Object.keys(listners).length) return off.call(that);
        }
      } else {
        listners = getListeners(that, type, true);
        if (listners) {
          listners = listners.filter(ne);
          if (!listners.length) return off.call(that, type);
          that[LISTENERS][type] = listners;
        }
      }
      return that;

      function ne(test) {
        return test !== func && test.originalListener !== func;
      }
    }

    /**
     * Dispatch (trigger) an event.
     *
     * @function EventLite.prototype.emit
     * @param type {string}
     * @param [value] {*}
     * @returns {boolean} True when a listener received the event
     */

    function emit(type, value) {
      var that = this;
      var listeners = getListeners(that, type, true);
      if (!listeners) return false;
      var arglen = arguments.length;
      if (arglen === 1) {
        listeners.forEach(zeroarg);
      } else if (arglen === 2) {
        listeners.forEach(onearg);
      } else {
        var args = Array.prototype.slice.call(arguments, 1);
        listeners.forEach(moreargs);
      }
      return !!listeners.length;

      function zeroarg(func) {
        func.call(that);
      }

      function onearg(func) {
        func.call(that, value);
      }

      function moreargs(func) {
        func.apply(that, args);
      }
    }

    /**
     * @ignore
     */

    function getListeners(that, type, readonly) {
      if (readonly && !that[LISTENERS]) return;
      var listeners = that[LISTENERS] || (that[LISTENERS] = {});
      return listeners[type] || (listeners[type] = []);
    }

  // })(EventLite);

  /* eslint-env browser */


  var INVALID_TAGS = {
  	a: true,
  	noscript: true,
  	option: true,
  	script: true,
  	style: true,
  	textarea: true,
  	svg: true,
  	canvas: true,
  	button: true,
  	select: true,
  	template: true,
  	meter: true,
  	progress: true,
  	math: true,
  	time: true
  };

  class Pos {
  	constructor(container, offset, i = 0) {
  		this.container = container;
  		this.offset = offset;
  		this.i = i;
  	}
  	
  	add(change) {
  		var cont = this.container,
  			offset = this.offset;

  		this.i += change;
  		
  		// If the container is #text.parentNode
  		if (cont.childNodes.length) {
  			cont = cont.childNodes[offset];
  			offset = 0;
  		}

  		// If the container is #text
  		while (cont) {
  			if (cont.nodeType == 3) {
  				if (!cont.LEN) {
  					cont.LEN = cont.nodeValue.length;
  				}
  				if (offset + change <= cont.LEN) {
  					this.container = cont;
  					this.offset = offset + change;
  					return;
  				}
  				change = offset + change - cont.LEN;
  				offset = 0;
  			}
  			cont = cont.nextSibling;
  		}
  	}
  	
  	moveTo(offset) {
  		this.add(offset - this.i);
  	}
  }

  function cloneContents(range) {
  	if (range.startContainer == range.endContainer) {
  		return document.createTextNode(range.toString());
  	}
  	return range.cloneContents();
  }

  var DEFAULT_OPTIONS = {
  	maxRunTime: 100,
  	timeout: 10000,
  	newTab: true,
  	noOpener: true,
  	embedImage: true,
    recursive: true,
  };

  class Linkifier extends EventLite {
  	constructor(root, options = {}) {
  		super();
  		if (!(root instanceof Node)) {
  			options = root;
  			root = options.root;
  		}
  		this.root = root;
  		this.options = Object.assign({}, DEFAULT_OPTIONS, options);
  		this.aborted = false;
  	}
  	start() {
  		var time = Date.now,
  			startTime = time(),
  			chunks = this.generateChunks();
  			
  		var next = () => {
  			if (this.aborted) {
  				this.emit("error", new Error("Aborted"));
  				return;
  			}
  			var chunkStart = time(),
  				now;
  				
  			do {
  				if (chunks.next().done) {
  					this.emit("complete", time() - startTime);
  					return;
  				}
  			} while ((now = time()) - chunkStart < this.options.maxRunTime);
  			
  			if (now - startTime > this.options.timeout) {
  				this.emit("error", new Error(`max execution time exceeded: ${now - startTime}, on ${this.root}`));
  				return;
  			}
  			
  			setTimeout(next);
  		};
  			
  		setTimeout(next);
  	}
  	abort() {
  		this.aborted = true;
  	}
  	*generateRanges() {
  		var {validator, recursive} = this.options;
  		var filter = {
  			acceptNode: function(node) {
  				if (validator && !validator(node)) {
  					return NodeFilter.FILTER_REJECT;
  				}
  				if (INVALID_TAGS[node.localName]) {
  					return NodeFilter.FILTER_REJECT;
  				}
  				if (node.localName == "wbr") {
  					return NodeFilter.FILTER_ACCEPT;
  				}
  				if (node.nodeType == 3) {
  					return NodeFilter.FILTER_ACCEPT;
  				}
  				return recursive ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_REJECT;
  			}
  		};
  		// Generate linkified ranges.
  		var walker = document.createTreeWalker(
  			this.root,
  			NodeFilter.SHOW_TEXT + NodeFilter.SHOW_ELEMENT,
  			filter
  		), start, end, current, range;

  		end = start = walker.nextNode();
  		if (!start) {
  			return;
  		}
  		range = document.createRange();
  		range.setStartBefore(start);
  		while ((current = walker.nextNode())) {
  			if (end.nextSibling == current) {
  				end = current;
  				continue;
  			}
  			range.setEndAfter(end);
  			yield range;

  			end = start = current;
  			range.setStartBefore(start);
  		}
  		range.setEndAfter(end);
  		yield range;
  	}
  	*generateChunks() {
  		var {matcher} = this.options;
  		for (var range of this.generateRanges()) {
  			var frag = null,
  				pos = null,
  				text = range.toString(),
  				textRange = null;
  			for (var result of matcher.match(text)) {
  				if (!frag) {
  					frag = document.createDocumentFragment();
  					pos = new Pos(range.startContainer, range.startOffset);
  					textRange = range.cloneRange();
  				}
  				// clone text
  				pos.moveTo(result.start);
  				textRange.setEnd(pos.container, pos.offset);
  				frag.appendChild(cloneContents(textRange));
  				
  				// clone link
  				textRange.collapse();
  				pos.moveTo(result.end);
  				textRange.setEnd(pos.container, pos.offset);
  				
  				var content = cloneContents(textRange),
  					link = this.buildLink(result, content);

  				textRange.collapse();

  				frag.appendChild(link);
  				this.emit("link", {link, range, result, content});
  			}
  			if (pos) {
  				pos.moveTo(text.length);
  				textRange.setEnd(pos.container, pos.offset);
  				frag.appendChild(cloneContents(textRange));
  				
  				range.deleteContents();
  				range.insertNode(frag);
  			}
  			yield;
  		}
  	}
  	buildLink(result, content) {
  		var {newTab, embedImage, noOpener} = this.options;
  		var link = document.createElement("a");
  		link.href = result.url;
  		link.title = "Linkify Plus Plus";
  		link.className = "linkifyplus";
  		if (newTab) {
  			link.target = "_blank";
  		}
  		if (noOpener) {
  			link.rel = "noopener";
  		}
  		var child;
  		if (embedImage && /^[^?#]+\.(?:jpg|jpeg|png|apng|gif|svg|webp)(?:$|[?#])/i.test(result.url)) {
  			child = new Image;
  			child.src = result.url;
  			child.alt = result.text;
  		} else {
  			child = content;
  		}
  		link.appendChild(child);
  		return link;
  	}
  }

  function linkify(...args) {
  	return new Promise((resolve, reject) => {
  		var linkifier = new Linkifier(...args);
  		linkifier.on("error", reject);
  		linkifier.on("complete", resolve);
  		for (var key of Object.keys(linkifier.options)) {
  			if (key.startsWith("on")) {
  				linkifier.on(key.slice(2), linkifier.options[key]);
  			}
  		}
  		linkifier.start();
  	});
  }

  exports.INVALID_TAGS = INVALID_TAGS;
  exports.Linkifier = Linkifier;
  exports.UrlMatcher = UrlMatcher;
  exports.linkify = linkify;

  return exports;

})({});
//# sourceMappingURL=linkify-plus-plus-core.js.map
