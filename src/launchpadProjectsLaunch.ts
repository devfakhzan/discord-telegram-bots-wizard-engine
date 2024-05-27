// Flow:

// 1. There is a flow wizard
// 2. Lay down the big steps and the small steps in each of the big steps
// 3. Find out the type of the input for each of the small steps
// 4. Map it to the master object
// 5. The types are: Choices, Multi-select, Regular input (number), Date range
// 6. There are optional steps based on the input from previous step
// 7. There are choice based on choice

import customParseFormat from "dayjs/plugin/customParseFormat";

import dayjs from "dayjs";
import BigNumber from "bignumber.js";
dayjs.extend(customParseFormat);

export const universalBack = "||universalBack||";

export const universalOnComplete = "||onComplete||";

export const universalOnCompleteConfirmation = "||onCompleteConfirmation||";

export const universalOnCompleteConfirm = "||onCompleteConfirm||";

export const backToMainBranch = "back_to_main_steps";

export const universalContinue = "||CONTINUE||";

export const universalSkip = "||SKIP||";

export const dateTimeFormat = "D/M/YYYY HH:mm:ss";

export const countryList = [
	{"code": "AF", "code3": "AFG", "name": "Afghanistan", "number": "004"},
	{"code": "AL", "code3": "ALB", "name": "Albania", "number": "008"},
	{"code": "DZ", "code3": "DZA", "name": "Algeria", "number": "012"},
	{"code": "AS", "code3": "ASM", "name": "American Samoa", "number": "016"},
	{"code": "AD", "code3": "AND", "name": "Andorra", "number": "020"},
	{"code": "AO", "code3": "AGO", "name": "Angola", "number": "024"},
	{"code": "AI", "code3": "AIA", "name": "Anguilla", "number": "660"},
	{"code": "AQ", "code3": "ATA", "name": "Antarctica", "number": "010"},
	{"code": "AG", "code3": "ATG", "name": "Antigua and Barbuda", "number": "028"},
	{"code": "AR", "code3": "ARG", "name": "Argentina", "number": "032"},
	{"code": "AM", "code3": "ARM", "name": "Armenia", "number": "051"},
	{"code": "AW", "code3": "ABW", "name": "Aruba", "number": "533"},
	{"code": "AU", "code3": "AUS", "name": "Australia", "number": "036"},
	{"code": "AT", "code3": "AUT", "name": "Austria", "number": "040"},
	{"code": "AZ", "code3": "AZE", "name": "Azerbaijan", "number": "031"},
	{"code": "BS", "code3": "BHS", "name": "Bahamas (the)", "number": "044"},
	{"code": "BH", "code3": "BHR", "name": "Bahrain", "number": "048"},
	{"code": "BD", "code3": "BGD", "name": "Bangladesh", "number": "050"},
	{"code": "BB", "code3": "BRB", "name": "Barbados", "number": "052"},
	{"code": "BY", "code3": "BLR", "name": "Belarus", "number": "112"},
	{"code": "BE", "code3": "BEL", "name": "Belgium", "number": "056"},
	{"code": "BZ", "code3": "BLZ", "name": "Belize", "number": "084"},
	{"code": "BJ", "code3": "BEN", "name": "Benin", "number": "204"},
	{"code": "BM", "code3": "BMU", "name": "Bermuda", "number": "060"},
	{"code": "BT", "code3": "BTN", "name": "Bhutan", "number": "064"},
	{"code": "BO", "code3": "BOL", "name": "Bolivia (Plurinational State of)", "number": "068"},
	{"code": "BQ", "code3": "BES", "name": "Bonaire, Sint Eustatius and Saba", "number": "535"},
	{"code": "BA", "code3": "BIH", "name": "Bosnia and Herzegovina", "number": "070"},
	{"code": "BW", "code3": "BWA", "name": "Botswana", "number": "072"},
	{"code": "BV", "code3": "BVT", "name": "Bouvet Island", "number": "074"},
	{"code": "BR", "code3": "BRA", "name": "Brazil", "number": "076"},
	{"code": "IO", "code3": "IOT", "name": "British Indian Ocean Territory (the)", "number": "086"},
	{"code": "BN", "code3": "BRN", "name": "Brunei Darussalam", "number": "096"},
	{"code": "BG", "code3": "BGR", "name": "Bulgaria", "number": "100"},
	{"code": "BF", "code3": "BFA", "name": "Burkina Faso", "number": "854"},
	{"code": "BI", "code3": "BDI", "name": "Burundi", "number": "108"},
	{"code": "CV", "code3": "CPV", "name": "Cabo Verde", "number": "132"},
	{"code": "KH", "code3": "KHM", "name": "Cambodia", "number": "116"},
	{"code": "CM", "code3": "CMR", "name": "Cameroon", "number": "120"},
	{"code": "CA", "code3": "CAN", "name": "Canada", "number": "124"},
	{"code": "KY", "code3": "CYM", "name": "Cayman Islands (the)", "number": "136"},
	{"code": "CF", "code3": "CAF", "name": "Central African Republic (the)", "number": "140"},
	{"code": "TD", "code3": "TCD", "name": "Chad", "number": "148"},
	{"code": "CL", "code3": "CHL", "name": "Chile", "number": "152"},
	{"code": "CN", "code3": "CHN", "name": "China", "number": "156"},
	{"code": "CX", "code3": "CXR", "name": "Christmas Island", "number": "162"},
	{"code": "CC", "code3": "CCK", "name": "Cocos (Keeling) Islands (the)", "number": "166"},
	{"code": "CO", "code3": "COL", "name": "Colombia", "number": "170"},
	{"code": "KM", "code3": "COM", "name": "Comoros (the)", "number": "174"},
	{"code": "CD", "code3": "COD", "name": "Congo (the Democratic Republic of the)", "number": "180"},
	{"code": "CG", "code3": "COG", "name": "Congo (the)", "number": "178"},
	{"code": "CK", "code3": "COK", "name": "Cook Islands (the)", "number": "184"},
	{"code": "CR", "code3": "CRI", "name": "Costa Rica", "number": "188"},
	{"code": "HR", "code3": "HRV", "name": "Croatia", "number": "191"},
	{"code": "CU", "code3": "CUB", "name": "Cuba", "number": "192"},
	{"code": "CW", "code3": "CUW", "name": "Curaçao", "number": "531"},
	{"code": "CY", "code3": "CYP", "name": "Cyprus", "number": "196"},
	{"code": "CZ", "code3": "CZE", "name": "Czechia", "number": "203"},
	{"code": "CI", "code3": "CIV", "name": "Côte d'Ivoire", "number": "384"},
	{"code": "DK", "code3": "DNK", "name": "Denmark", "number": "208"},
	{"code": "DJ", "code3": "DJI", "name": "Djibouti", "number": "262"},
	{"code": "DM", "code3": "DMA", "name": "Dominica", "number": "212"},
	{"code": "DO", "code3": "DOM", "name": "Dominican Republic (the)", "number": "214"},
	{"code": "EC", "code3": "ECU", "name": "Ecuador", "number": "218"},
	{"code": "EG", "code3": "EGY", "name": "Egypt", "number": "818"},
	{"code": "SV", "code3": "SLV", "name": "El Salvador", "number": "222"},
	{"code": "GQ", "code3": "GNQ", "name": "Equatorial Guinea", "number": "226"},
	{"code": "ER", "code3": "ERI", "name": "Eritrea", "number": "232"},
	{"code": "EE", "code3": "EST", "name": "Estonia", "number": "233"},
	{"code": "SZ", "code3": "SWZ", "name": "Eswatini", "number": "748"},
	{"code": "ET", "code3": "ETH", "name": "Ethiopia", "number": "231"},
	{"code": "FK", "code3": "FLK", "name": "Falkland Islands (the) [Malvinas]", "number": "238"},
	{"code": "FO", "code3": "FRO", "name": "Faroe Islands (the)", "number": "234"},
	{"code": "FJ", "code3": "FJI", "name": "Fiji", "number": "242"},
	{"code": "FI", "code3": "FIN", "name": "Finland", "number": "246"},
	{"code": "FR", "code3": "FRA", "name": "France", "number": "250"},
	{"code": "GF", "code3": "GUF", "name": "French Guiana", "number": "254"},
	{"code": "PF", "code3": "PYF", "name": "French Polynesia", "number": "258"},
	{"code": "TF", "code3": "ATF", "name": "French Southern Territories (the)", "number": "260"},
	{"code": "GA", "code3": "GAB", "name": "Gabon", "number": "266"},
	{"code": "GM", "code3": "GMB", "name": "Gambia (the)", "number": "270"},
	{"code": "GE", "code3": "GEO", "name": "Georgia", "number": "268"},
	{"code": "DE", "code3": "DEU", "name": "Germany", "number": "276"},
	{"code": "GH", "code3": "GHA", "name": "Ghana", "number": "288"},
	{"code": "GI", "code3": "GIB", "name": "Gibraltar", "number": "292"},
	{"code": "GR", "code3": "GRC", "name": "Greece", "number": "300"},
	{"code": "GL", "code3": "GRL", "name": "Greenland", "number": "304"},
	{"code": "GD", "code3": "GRD", "name": "Grenada", "number": "308"},
	{"code": "GP", "code3": "GLP", "name": "Guadeloupe", "number": "312"},
	{"code": "GU", "code3": "GUM", "name": "Guam", "number": "316"},
	{"code": "GT", "code3": "GTM", "name": "Guatemala", "number": "320"},
	{"code": "GG", "code3": "GGY", "name": "Guernsey", "number": "831"},
	{"code": "GN", "code3": "GIN", "name": "Guinea", "number": "324"},
	{"code": "GW", "code3": "GNB", "name": "Guinea-Bissau", "number": "624"},
	{"code": "GY", "code3": "GUY", "name": "Guyana", "number": "328"},
	{"code": "HT", "code3": "HTI", "name": "Haiti", "number": "332"},
	{"code": "HM", "code3": "HMD", "name": "Heard Island and McDonald Islands", "number": "334"},
	{"code": "VA", "code3": "VAT", "name": "Holy See (the)", "number": "336"},
	{"code": "HN", "code3": "HND", "name": "Honduras", "number": "340"},
	{"code": "HK", "code3": "HKG", "name": "Hong Kong", "number": "344"},
	{"code": "HU", "code3": "HUN", "name": "Hungary", "number": "348"},
	{"code": "IS", "code3": "ISL", "name": "Iceland", "number": "352"},
	{"code": "IN", "code3": "IND", "name": "India", "number": "356"},
	{"code": "ID", "code3": "IDN", "name": "Indonesia", "number": "360"},
	{"code": "IR", "code3": "IRN", "name": "Iran (Islamic Republic of)", "number": "364"},
	{"code": "IQ", "code3": "IRQ", "name": "Iraq", "number": "368"},
	{"code": "IE", "code3": "IRL", "name": "Ireland", "number": "372"},
	{"code": "IM", "code3": "IMN", "name": "Isle of Man", "number": "833"},
	{"code": "IL", "code3": "ISR", "name": "Israel", "number": "376"},
	{"code": "IT", "code3": "ITA", "name": "Italy", "number": "380"},
	{"code": "JM", "code3": "JAM", "name": "Jamaica", "number": "388"},
	{"code": "JP", "code3": "JPN", "name": "Japan", "number": "392"},
	{"code": "JE", "code3": "JEY", "name": "Jersey", "number": "832"},
	{"code": "JO", "code3": "JOR", "name": "Jordan", "number": "400"},
	{"code": "KZ", "code3": "KAZ", "name": "Kazakhstan", "number": "398"},
	{"code": "KE", "code3": "KEN", "name": "Kenya", "number": "404"},
	{"code": "KI", "code3": "KIR", "name": "Kiribati", "number": "296"},
	{"code": "KP", "code3": "PRK", "name": "Korea (the Democratic People's Republic of)", "number": "408"},
	{"code": "KR", "code3": "KOR", "name": "Korea (the Republic of)", "number": "410"},
	{"code": "KW", "code3": "KWT", "name": "Kuwait", "number": "414"},
	{"code": "KG", "code3": "KGZ", "name": "Kyrgyzstan", "number": "417"},
	{"code": "LA", "code3": "LAO", "name": "Lao People's Democratic Republic (the)", "number": "418"},
	{"code": "LV", "code3": "LVA", "name": "Latvia", "number": "428"},
	{"code": "LB", "code3": "LBN", "name": "Lebanon", "number": "422"},
	{"code": "LS", "code3": "LSO", "name": "Lesotho", "number": "426"},
	{"code": "LR", "code3": "LBR", "name": "Liberia", "number": "430"},
	{"code": "LY", "code3": "LBY", "name": "Libya", "number": "434"},
	{"code": "LI", "code3": "LIE", "name": "Liechtenstein", "number": "438"},
	{"code": "LT", "code3": "LTU", "name": "Lithuania", "number": "440"},
	{"code": "LU", "code3": "LUX", "name": "Luxembourg", "number": "442"},
	{"code": "MO", "code3": "MAC", "name": "Macao", "number": "446"},
	{"code": "MG", "code3": "MDG", "name": "Madagascar", "number": "450"},
	{"code": "MW", "code3": "MWI", "name": "Malawi", "number": "454"},
	{"code": "MY", "code3": "MYS", "name": "Malaysia", "number": "458"},
	{"code": "MV", "code3": "MDV", "name": "Maldives", "number": "462"},
	{"code": "ML", "code3": "MLI", "name": "Mali", "number": "466"},
	{"code": "MT", "code3": "MLT", "name": "Malta", "number": "470"},
	{"code": "MH", "code3": "MHL", "name": "Marshall Islands (the)", "number": "584"},
	{"code": "MQ", "code3": "MTQ", "name": "Martinique", "number": "474"},
	{"code": "MR", "code3": "MRT", "name": "Mauritania", "number": "478"},
	{"code": "MU", "code3": "MUS", "name": "Mauritius", "number": "480"},
	{"code": "YT", "code3": "MYT", "name": "Mayotte", "number": "175"},
	{"code": "MX", "code3": "MEX", "name": "Mexico", "number": "484"},
	{"code": "FM", "code3": "FSM", "name": "Micronesia (Federated States of)", "number": "583"},
	{"code": "MD", "code3": "MDA", "name": "Moldova (the Republic of)", "number": "498"},
	{"code": "MC", "code3": "MCO", "name": "Monaco", "number": "492"},
	{"code": "MN", "code3": "MNG", "name": "Mongolia", "number": "496"},
	{"code": "ME", "code3": "MNE", "name": "Montenegro", "number": "499"},
	{"code": "MS", "code3": "MSR", "name": "Montserrat", "number": "500"},
	{"code": "MA", "code3": "MAR", "name": "Morocco", "number": "504"},
	{"code": "MZ", "code3": "MOZ", "name": "Mozambique", "number": "508"},
	{"code": "MM", "code3": "MMR", "name": "Myanmar", "number": "104"},
	{"code": "NA", "code3": "NAM", "name": "Namibia", "number": "516"},
	{"code": "NR", "code3": "NRU", "name": "Nauru", "number": "520"},
	{"code": "NP", "code3": "NPL", "name": "Nepal", "number": "524"},
	{"code": "NL", "code3": "NLD", "name": "Netherlands (the)", "number": "528"},
	{"code": "NC", "code3": "NCL", "name": "New Caledonia", "number": "540"},
	{"code": "NZ", "code3": "NZL", "name": "New Zealand", "number": "554"},
	{"code": "NI", "code3": "NIC", "name": "Nicaragua", "number": "558"},
	{"code": "NE", "code3": "NER", "name": "Niger (the)", "number": "562"},
	{"code": "NG", "code3": "NGA", "name": "Nigeria", "number": "566"},
	{"code": "NU", "code3": "NIU", "name": "Niue", "number": "570"},
	{"code": "NF", "code3": "NFK", "name": "Norfolk Island", "number": "574"},
	{"code": "MP", "code3": "MNP", "name": "Northern Mariana Islands (the)", "number": "580"},
	{"code": "NO", "code3": "NOR", "name": "Norway", "number": "578"},
	{"code": "OM", "code3": "OMN", "name": "Oman", "number": "512"},
	{"code": "PK", "code3": "PAK", "name": "Pakistan", "number": "586"},
	{"code": "PW", "code3": "PLW", "name": "Palau", "number": "585"},
	{"code": "PS", "code3": "PSE", "name": "Palestine, State of", "number": "275"},
	{"code": "PA", "code3": "PAN", "name": "Panama", "number": "591"},
	{"code": "PG", "code3": "PNG", "name": "Papua New Guinea", "number": "598"},
	{"code": "PY", "code3": "PRY", "name": "Paraguay", "number": "600"},
	{"code": "PE", "code3": "PER", "name": "Peru", "number": "604"},
	{"code": "PH", "code3": "PHL", "name": "Philippines (the)", "number": "608"},
	{"code": "PN", "code3": "PCN", "name": "Pitcairn", "number": "612"},
	{"code": "PL", "code3": "POL", "name": "Poland", "number": "616"},
	{"code": "PT", "code3": "PRT", "name": "Portugal", "number": "620"},
	{"code": "PR", "code3": "PRI", "name": "Puerto Rico", "number": "630"},
	{"code": "QA", "code3": "QAT", "name": "Qatar", "number": "634"},
	{"code": "MK", "code3": "MKD", "name": "Republic of North Macedonia", "number": "807"},
	{"code": "RO", "code3": "ROU", "name": "Romania", "number": "642"},
	{"code": "RU", "code3": "RUS", "name": "Russian Federation (the)", "number": "643"},
	{"code": "RW", "code3": "RWA", "name": "Rwanda", "number": "646"},
	{"code": "RE", "code3": "REU", "name": "Réunion", "number": "638"},
	{"code": "BL", "code3": "BLM", "name": "Saint Barthélemy", "number": "652"},
	{"code": "SH", "code3": "SHN", "name": "Saint Helena, Ascension and Tristan da Cunha", "number": "654"},
	{"code": "KN", "code3": "KNA", "name": "Saint Kitts and Nevis", "number": "659"},
	{"code": "LC", "code3": "LCA", "name": "Saint Lucia", "number": "662"},
	{"code": "MF", "code3": "MAF", "name": "Saint Martin (French part)", "number": "663"},
	{"code": "PM", "code3": "SPM", "name": "Saint Pierre and Miquelon", "number": "666"},
	{"code": "VC", "code3": "VCT", "name": "Saint Vincent and the Grenadines", "number": "670"},
	{"code": "WS", "code3": "WSM", "name": "Samoa", "number": "882"},
	{"code": "SM", "code3": "SMR", "name": "San Marino", "number": "674"},
	{"code": "ST", "code3": "STP", "name": "Sao Tome and Principe", "number": "678"},
	{"code": "SA", "code3": "SAU", "name": "Saudi Arabia", "number": "682"},
	{"code": "SN", "code3": "SEN", "name": "Senegal", "number": "686"},
	{"code": "RS", "code3": "SRB", "name": "Serbia", "number": "688"},
	{"code": "SC", "code3": "SYC", "name": "Seychelles", "number": "690"},
	{"code": "SL", "code3": "SLE", "name": "Sierra Leone", "number": "694"},
	{"code": "SG", "code3": "SGP", "name": "Singapore", "number": "702"},
	{"code": "SX", "code3": "SXM", "name": "Sint Maarten (Dutch part)", "number": "534"},
	{"code": "SK", "code3": "SVK", "name": "Slovakia", "number": "703"},
	{"code": "SI", "code3": "SVN", "name": "Slovenia", "number": "705"},
	{"code": "SB", "code3": "SLB", "name": "Solomon Islands", "number": "090"},
	{"code": "SO", "code3": "SOM", "name": "Somalia", "number": "706"},
	{"code": "ZA", "code3": "ZAF", "name": "South Africa", "number": "710"},
	{"code": "GS", "code3": "SGS", "name": "South Georgia and the South Sandwich Islands", "number": "239"},
	{"code": "SS", "code3": "SSD", "name": "South Sudan", "number": "728"},
	{"code": "ES", "code3": "ESP", "name": "Spain", "number": "724"},
	{"code": "LK", "code3": "LKA", "name": "Sri Lanka", "number": "144"},
	{"code": "SD", "code3": "SDN", "name": "Sudan (the)", "number": "729"},
	{"code": "SR", "code3": "SUR", "name": "Suriname", "number": "740"},
	{"code": "SJ", "code3": "SJM", "name": "Svalbard and Jan Mayen", "number": "744"},
	{"code": "SE", "code3": "SWE", "name": "Sweden", "number": "752"},
	{"code": "CH", "code3": "CHE", "name": "Switzerland", "number": "756"},
	{"code": "SY", "code3": "SYR", "name": "Syrian Arab Republic", "number": "760"},
	{"code": "TW", "code3": "TWN", "name": "Taiwan", "number": "158"},
	{"code": "TJ", "code3": "TJK", "name": "Tajikistan", "number": "762"},
	{"code": "TZ", "code3": "TZA", "name": "Tanzania, United Republic of", "number": "834"},
	{"code": "TH", "code3": "THA", "name": "Thailand", "number": "764"},
	{"code": "TL", "code3": "TLS", "name": "Timor-Leste", "number": "626"},
	{"code": "TG", "code3": "TGO", "name": "Togo", "number": "768"},
	{"code": "TK", "code3": "TKL", "name": "Tokelau", "number": "772"},
	{"code": "TO", "code3": "TON", "name": "Tonga", "number": "776"},
	{"code": "TT", "code3": "TTO", "name": "Trinidad and Tobago", "number": "780"},
	{"code": "TN", "code3": "TUN", "name": "Tunisia", "number": "788"},
	{"code": "TR", "code3": "TUR", "name": "Turkey", "number": "792"},
	{"code": "TM", "code3": "TKM", "name": "Turkmenistan", "number": "795"},
	{"code": "TC", "code3": "TCA", "name": "Turks and Caicos Islands (the)", "number": "796"},
	{"code": "TV", "code3": "TUV", "name": "Tuvalu", "number": "798"},
	{"code": "UG", "code3": "UGA", "name": "Uganda", "number": "800"},
	{"code": "UA", "code3": "UKR", "name": "Ukraine", "number": "804"},
	{"code": "AE", "code3": "ARE", "name": "United Arab Emirates (the)", "number": "784"},
	{"code": "GB", "code3": "GBR", "name": "United Kingdom of Great Britain and Northern Ireland (the)", "number": "826"},
	{"code": "UM", "code3": "UMI", "name": "United States Minor Outlying Islands (the)", "number": "581"},
	{"code": "US", "code3": "USA", "name": "United States of America (the)", "number": "840"},
	{"code": "UY", "code3": "URY", "name": "Uruguay", "number": "858"},
	{"code": "UZ", "code3": "UZB", "name": "Uzbekistan", "number": "860"},
	{"code": "VU", "code3": "VUT", "name": "Vanuatu", "number": "548"},
	{"code": "VE", "code3": "VEN", "name": "Venezuela (Bolivarian Republic of)", "number": "862"},
	{"code": "VN", "code3": "VNM", "name": "Viet Nam", "number": "704"},
	{"code": "VG", "code3": "VGB", "name": "Virgin Islands (British)", "number": "092"},
	{"code": "VI", "code3": "VIR", "name": "Virgin Islands (U.S.)", "number": "850"},
	{"code": "WF", "code3": "WLF", "name": "Wallis and Futuna", "number": "876"},
	{"code": "EH", "code3": "ESH", "name": "Western Sahara", "number": "732"},
	{"code": "YE", "code3": "YEM", "name": "Yemen", "number": "887"},
	{"code": "ZM", "code3": "ZMB", "name": "Zambia", "number": "894"},
	{"code": "ZW", "code3": "ZWE", "name": "Zimbabwe", "number": "716"},
	{"code": "AX", "code3": "ALA", "name": "Åland Islands", "number": "248"}
];

export const listToArray = (input: string): string[] => {
  return input.split(',').map(item => item.trim());
}

export const getEmojiNum = (number: number) => {
  switch (number) {
    case 1:
      return `1️⃣`;
    case 2:
      return `2️⃣`;
    case 3:
      return `3️⃣️`;
    case 4:
      return `4️⃣`;
    case 5:
      return `5️⃣`;
    case 6:
      return `6️⃣`;
    case 7:
      return `7️⃣`;
    case 8:
      return `8️⃣`;
    case 9:
      return `9️⃣`;
    case 10:
      return `🔟`;
  }
};

export const getProgressBar = (mainSteps: any, currentMainStep: number) => {
  let arr = [`1️⃣`, `2️⃣`, `3️⃣`, `4️⃣`, `5️⃣`, `6️⃣`, `7️⃣`, `8️⃣`, `9️⃣`, `🔟`];
  arr = arr.slice(0, mainSteps.length);
  arr.splice(0, currentMainStep - 1, ...Array(currentMainStep - 1).fill("✅"));
  return arr.join("");
};

export const getSubProgressBar = (steps: any, currentStep: number) => {
  let arr = [`1️⃣`, `2️⃣`, `3️⃣`, `4️⃣`, `5️⃣`, `6️⃣`, `7️⃣`, `8️⃣`, `9️⃣`, `🔟`];
  arr = arr.slice(0, steps.filter((s: {
    step: any; title: { includes: (arg0: string) => { (): any; new(): any; length: any; }; }; 
}) => !s.step.includes("DONESTEP")).length);
  arr.splice(0, currentStep - 1, ...Array(currentStep - 1).fill("✅"));
  arr[currentStep-1] = '⏺';
  return arr.join("");
};

export const getPreviousStep = (
  mainSteps: any,
  currentMainStep: number,
  currentStep: number,
) => {
  if (
    (currentMainStep === 0 && currentStep === 0) ||
    currentMainStep < 0 ||
    currentStep < 0
  ) {
    return false;
  }

  let previousMainStep = currentMainStep;
  let previousStep = currentStep - 1;
  if (currentStep === 0) {
    previousMainStep = currentMainStep - 1;
    previousStep = mainSteps[previousMainStep].steps.length - 1;
  }

  return {
    previousMainStep,
    previousStep,
  };
};

export const getNextStep = (mainSteps: any, currentMainStep: number, currentStep: number) => {
  const lastMainStep = mainSteps.length - 1;
  const lastStepInMainStep = mainSteps[lastMainStep].steps.length - 1;

  if (currentMainStep === lastMainStep && currentStep === lastStepInMainStep) {
    return false;
  }

  let nextMainStep = currentMainStep;
  let nextStep = currentStep + 1;
  if (currentStep === mainSteps[currentMainStep].steps.length - 1) {
    nextMainStep = currentMainStep + 1;
    nextStep = 0;
  }

  return {
    nextMainStep,
    nextStep,
  };
};

export const writeToObject = (
  obj: any,
  previousStepObject: any,
  mapTo: string | string[],
  value: any,
  raw = false
) => {
  if (value === null || value === undefined) {
    return;
  }

  if (!Array.isArray(mapTo)) {
    let keys = mapTo.split(".");
    let lastKeyIndex = keys.length - 1;

    for (let i = 0; i < lastKeyIndex; ++i) {
      let key = keys[i];
      if (!(key in obj)) {
        //throw new Error(`Invalid path: "${mapTo}"`);
        obj = obj[key];
      }

      obj = obj[key];
    }

    let finalValue = value;

    switch (previousStepObject.valueType) {
      case "number": {
        if (isNaN(Number(finalValue))) {
          return false;
        }
        //finalValue = Number(finalValue);
        break;
      }
      case "boolean": {
        if (!(finalValue == "true" || finalValue == "false")) {
          return false;
        }

        finalValue = finalValue == "true";
        break;
      }
      case "array": {
        finalValue = listToArray(value);
        break;
      }
      default:
        break;
    }

    if (previousStepObject.valueType === "blockchainsSelect") {
      const rawValues = [...new Set(value.replace(/\s/g, "").split(","))];
      //@ts-ignore
      if (!rawValues?.length || isNaN(rawValues[0])) {
        return false;
      }

      const optsArr = previousStepObject.options.map((o: any) => {
        let [chainId, address, chainName, coinName] = o.value.split("|");
        chainId = +chainId;
        return {
          chainId,
          address,
          chainName,
          coinName,
        };
      });

      let final: any = {};
      for (let opt of optsArr) {
        final[opt.chainName] = final[opt.chainName] ? final[opt.chainName] : [];
        final[opt.chainName].push({
          chainId: opt.chainId,
          address: opt.address,
          chainName: opt.chainName,
          coinName: opt.coinName,
        });
      }

      const optsArrFinal = Object.values(final).flat();
      const selectedOptsArr = [];
      for (let rv of rawValues) {
        //@ts-ignore
        rv = +rv;
        //@ts-ignore
        if (
          //@ts-ignore

          rv <= 0 ||
          //@ts-ignore

          isNaN(rv) ||
          //@ts-ignore

          rv > optsArrFinal.length ||
          (Number(rv) === rv && rv % 1 !== 0)
        ) {
          return false;
        }
        //@ts-ignore
        selectedOptsArr.push(optsArrFinal[rv - 1]);
      }

      let result = selectedOptsArr.reduce((acc: any, curr: any) => {
        let found = acc.findIndex((item: any) => item.chainId === curr.chainId);
        if (found >= 0) {
          acc[found].tokens.push({
            address: curr.address,
            name: curr.coinName,
          });
        } else {
          acc.push({
            chainId: curr.chainId,
            tokens: [
              {
                address: curr.address,
                name: curr.coinName,
              },
            ],
          });
        }
        return acc;
      }, []);

      obj[keys[lastKeyIndex]] = result;
      return;
    }

    if (previousStepObject.valueType === "stringArray") {
      if (value.includes("✅")) {
        return;
      }

      const values = value.split("|");

      finalValue = [];
      for (let v of values) {
        let obj = previousStepObject.options.find((o: any) => o.value === v);
        finalValue.push({
          label: obj.text,
          value: obj.value,
        });
      }
    }

    obj[keys[lastKeyIndex]] = finalValue;
    return;
  }

  for (let [mti, mt] of mapTo.entries()) {
    let keys = mt.split(".");
    let lastKeyIndex = keys.length - 1;

    for (let i = 0; i < lastKeyIndex; ++i) {
      let key = keys[i];
      if (!(key in obj)) {
        //throw new Error(`Invalid path: "${mt}"`);
        obj = obj;
      } else {
        obj = obj[key];
      }
    }

    let finalValue = value;
    switch (previousStepObject.valueType) {
      case "dateRange": {
        finalValue = value.split("-")?.[mti];
        const from = value.split("-")?.[0]?.trim();
        const to = value.split("-")?.[1]?.trim();

        if (!from || !to) {
          return false;
        }

        const fromDate = dayjs(from, dateTimeFormat);
        const toDate = dayjs(to, dateTimeFormat);

        if (fromDate.isBefore(dayjs(), 'day')) {
          return false;
        }

        if (
          toDate.isBefore(fromDate, "day") ||
          toDate.isBefore(dayjs(), "day")
        ) {
          return false;
        }

        finalValue = dayjs(finalValue, dateTimeFormat).toDate();

        break;
      }
      case "twoBoolean": {
        if (!value.includes("|")) {
          return;
        }

        finalValue = value.split("|")[mti];
        if (!(finalValue == "true" || finalValue == "false")) {
          return false;
        }

        finalValue = finalValue == "true";

        break;
      }
      case "number": {
        if ((new BigNumber(finalValue)).isNaN()) {
          return false;
        }
        //finalValue = Number(finalValue);
        break;
      }
      case "boolean": {
        if (!(finalValue == "true" || finalValue == "false")) {
          return false;
        }

        finalValue = finalValue == "true";
        break;
      }
      default:
        break;
    }

    obj[keys[lastKeyIndex]] = finalValue;
  }
};

export const pushToObject = (
  obj: any,
  previousStepObject: any,
  mapTo: any,
  value: any,
  raw = false
) => {
  if (value === null || value === undefined) {
    return;
  }

  let keys = mapTo.split(".");
  let lastKeyIndex = keys.length - 1;

  for (let i = 0; i < lastKeyIndex; ++i) {
    let key = keys[i];
    if (!(key in obj)) {
      //throw new Error(`Invalid path: "${mapTo}"`);
      obj = obj[key];
    }

    obj = obj[key];
  }

  let finalValue = value;

  obj[keys[lastKeyIndex]].push(finalValue);
  return true;
}

export const writeToLastItem = (
  obj: any,
  previousStepObject: any,
  mapTo: any,
  value: any,
  raw = false
) => {
  if (value === null || value === undefined) {
    return;
  }

  let keys = mapTo.split(".");
  let lastKeyIndex = keys.length - 1;

  for (let i = 0; i < lastKeyIndex; ++i) {
    let key = keys[i];
    if (!(key in obj)) {
      //throw new Error(`Invalid path: "${mapTo}"`);
      obj = obj[key];
    }

    obj = obj[key];
  }

  let finalValue = value;

  const self = obj[keys[lastKeyIndex]];
  self[self.length-1] = finalValue;
  return true;
}

export const readObject = (
  obj: any,
  path: string,
  mainSteps: any
) => {
  //console.log("OBJ", obj, path)
  if (Array.isArray(path)) {
    let values: any = [];
    for (let p of path) {
      let value =
        p
          ?.split(".")
          ?.reduce(
            (o: { [x: string]: any }, i: string | number) => o[i],
            obj
          ) ?? null;
      if (p.includes("period")) {
        if (dayjs(value).isValid()) {
          value = dayjs(value).format(dateTimeFormat);
        }

        if (values.some((v: any) => !v)) {
          return null;
        }
      }

      values.push(value);
    }
      if (values.length === 2 && values[0] !== null && values[1] !== null) {
        if (path[0].includes("Date")) {
          return universalContinue;
        }

        if (path[0].includes("kyc")) {
          let findStep = () => {
            //@ts-ignore
            for (let mainStep of mainSteps) {
              //@ts-ignore
              let step = mainStep.steps.find(
                //@ts-ignore
                (step) => JSON.stringify(step.mapTo) === JSON.stringify(path)
              );
              if (step) return step;
            }
            return null;
          };
          return (
            //@ts-ignore
            findStep()?.options?.find(
              (o: any) =>
                o?.value === values[0]?.toString() + "|" + values[1]?.toString()
            )?.text || null
          );
        }
      }
    
    return null;
  }

  
  let result = path
    ?.split(".")
    ?.reduce((o: { [x: string]: any }, i: string | number) => o[i], obj);

  if (!result && result !== false) {
    //@ts-ignore
    result = null;
  }

  if (path === "payment.chains") {
    let chains: any = {};
    let networkNames: any = {};

    if (!obj?.payment?.chains) {
      return null;
    }

    //@ts-ignore
    obj.payment.chains.forEach((item) => {
      if (!chains[item.chainId]) {
        chains[item.chainId] = [];
      }
      item.tokens.forEach((token: any) => {
        chains[item.chainId].push({ address: token.address, name: token.name });
      });
    });

    let blockchainsSelectStep = mainSteps
      .flatMap((mainStep: any) => mainStep.steps)
      .find((step: any) => step.mapTo === "payment.chains");

    blockchainsSelectStep.options.forEach((option: any) => {
      let parts = option.value.split("|");
      let chainId = parseInt(parts[0]);
      let address = parts[1];
      let networkName = parts[2];
      let tokenName = parts[3];

      networkNames[chainId] = networkName;

      if (chains[chainId]) {
        let tokenIndex = chains[chainId].findIndex(
          (token: any) => token.address === address
        );
        if (tokenIndex !== -1) {
          chains[chainId][tokenIndex].name = "✅ " + tokenName;
        }
      }
    });

    let stringResult = "";
    for (let chainId in chains) {
      stringResult += `\n${networkNames[chainId]}:\n`; // Use networkNames here
      chains[chainId].forEach((token: any) => {
        stringResult += ` ${token.name}\n`;
      });
    }

    return stringResult.trim();
  }

  if (path === "kyc.contactInfos") {
    if (result === null) return null;
    return result.map((item: any) => `✅ ${item.label}`).join("\n");
  }

  return result;
};

const isLink = (input: any): boolean => {
  const linkDetectionRegex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
  return linkDetectionRegex.test(input);
}

export const getCurrentValue = async (
  ctx: any,
  step: any,
  value: any,
  targetObject: any,
  mainSteps: any
) => {
  if (value === null) {
    return null;
  }

  switch (step.type) {
    case "select":
      let options = step.options;
      if (typeof step.options === "function") {
        options = await step.options(ctx, ctx.scene.state.targetObject);
      }
      return options.find((o: any) => value == o.value)?.text;
    case "input":
      if (step.valueType === "dateRange") {
        const from = readObject(targetObject, step.mapTo[0], mainSteps);
        const to = readObject(targetObject, step.mapTo[1], mainSteps);
        return `${dayjs(from).format(dateTimeFormat)} - ${dayjs(to).format(dateTimeFormat)}`
      }
      return value;
    case "boolean":
      return value === true ? "Yes" : "No";
    case "photo":
      if (value === null) {
        return "Not provided"
      }
      
      if (isLink(value)) {
        return value;
      }
      return `https://nftstorage.link/ipfs/${value}/photo.png`
    case "list": 
      return value.map((v: string) => v.toUpperCase()).join(', ');
    default:
      return value;
  }
};

export const saveLaunchpadLaunchToDB = async (
  launchpadLaunch: any,
  userId: any,
  userType: any,
  UserDb: any,
) => {
  let user = await UserDb.getOrCreateUser(userId, userType);
  await UserDb.updateUser(user.userId, user.type, { ...user, launchpadLaunch });
};

export const getSummary = async (ctx:any, mainSteps: any, type: any, obj: any, skipping: any) => {
  let summaryText = "";
  // let originalMainSteps = JSON.parse(JSON.stringify(mainSteps));
  let usedMainSteps: any = [];

  for (let mainStep of mainSteps) {
    let thisMainStep = {
      ...mainStep,
      steps: [],
    };
    for (let step of mainStep.steps) {
      if (!skipping.find((s: any) => step.step === s.stepId)) {
        if (
        step.step !== 'DONESTEP' && 
        step.step !== 'DONESTEP_RESPONSE' &&
        step.step !== "DONESTEP_RESPONSE_CONFIRM" &&
        step.step !== "DONESTEP_RESPONSE_CONFIRM_RESPONSE"
      ) {
          thisMainStep.steps.push(step);
        }
      }
    }

    usedMainSteps.push(thisMainStep);
  }

  let i = 0;

  for (let mainStep of usedMainSteps) {
    i++;
    if (usedMainSteps.length === 1) {
      summaryText += `\n\n<u>${mainStep.mainStep}</u>\n\n`; 
    } else {
      summaryText += `\n\n<u>Main Step ${getEmojiNum(i)}: ${mainStep.mainStep}</u>\n\n`;
    }
    for (let step of mainStep.steps) {
      let currentValue = await getCurrentValue(
        ctx,
        step,
        //@ts-ignore
        readObject(obj, step.mapTo, mainSteps),
        obj,
        mainSteps
      );

      if (step?.excludeFromSummaryIfValueIs && step?.excludeFromSummaryIfValueIs === readObject(obj, step.mapTo, mainSteps)) {
        continue;
      }

      if (step.valueType === "boolean" && currentValue !== null) {
        currentValue = currentValue === true ? "Yes" : "No";
      }

      let currentValueLabel = "Entered value:";

      switch (step.type) {
        case "select":
        case "selectTwo":
        case "multiSelect":
        case "check":
        case "eitherTrue":
          currentValueLabel = "Selected value:";
          break;
        case "input":
          currentValueLabel = "Entered value:";
          break;
      }

      summaryText += `<b>${ typeof step.title === "string"
      ? step.title
      : await step.title(
          ctx.scene.state.userId,
          ctx.scene.state.targetObject,
          ctx
        )}</b>\n${currentValueLabel}\n<b>${currentValue}</b>\n\n`;
    }
  }

  if (type === "telegram") {
    return summaryText;
  } else if (type === "discord") {
    return summaryText
      .replace(/<b>/g, "")
      .replace(/<\/b>/g, "")
      .replace(/<u>/g, "")
      .replace(/<\/u>/g, "");
  }
};

export const splitInput = (input: string) =>{
  let chunks:any = [];
  let start = 0;
  let end = Math.min(1999, input.length);

  while (start < input.length) {
      // Find the last "\" character within the current chunk
      let lastBackslash = input.lastIndexOf('\\', end);

      // If there is no "\" character in the current chunk, or it is beyond the current chunk size,
      // split at the chunk size
      if (lastBackslash === -1 || lastBackslash <= start + 1999) {
          chunks.push(input.substring(start, end));
          start = end;
      } else {
          // Otherwise, split at the "\" character
          chunks.push(input.substring(start, lastBackslash));
          start = lastBackslash + 1;
      }

      // Move to the next chunk
      end = Math.min(end + 1999, input.length);
  }

  return chunks;
}
