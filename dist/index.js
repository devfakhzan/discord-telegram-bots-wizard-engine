"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DiscordProducer: () => discord_default,
  TelegramProducer: () => telegram_default
});
module.exports = __toCommonJS(src_exports);

// src/launchpadProjectsLaunch.ts
var import_customParseFormat = __toESM(require("dayjs/plugin/customParseFormat"));
var import_dayjs = __toESM(require("dayjs"));
var import_bignumber = __toESM(require("bignumber.js"));
import_dayjs.default.extend(import_customParseFormat.default);
var universalBack = "||universalBack||";
var universalOnComplete = "||onComplete||";
var universalOnCompleteConfirmation = "||onCompleteConfirmation||";
var universalOnCompleteConfirm = "||onCompleteConfirm||";
var backToMainBranch = "back_to_main_steps";
var universalContinue = "||CONTINUE||";
var universalSkip = "||SKIP||";
var dateTimeFormat = "D/M/YYYY HH:mm:ss";
var countryList = [
  { "code": "AF", "code3": "AFG", "name": "Afghanistan", "number": "004" },
  { "code": "AL", "code3": "ALB", "name": "Albania", "number": "008" },
  { "code": "DZ", "code3": "DZA", "name": "Algeria", "number": "012" },
  { "code": "AS", "code3": "ASM", "name": "American Samoa", "number": "016" },
  { "code": "AD", "code3": "AND", "name": "Andorra", "number": "020" },
  { "code": "AO", "code3": "AGO", "name": "Angola", "number": "024" },
  { "code": "AI", "code3": "AIA", "name": "Anguilla", "number": "660" },
  { "code": "AQ", "code3": "ATA", "name": "Antarctica", "number": "010" },
  { "code": "AG", "code3": "ATG", "name": "Antigua and Barbuda", "number": "028" },
  { "code": "AR", "code3": "ARG", "name": "Argentina", "number": "032" },
  { "code": "AM", "code3": "ARM", "name": "Armenia", "number": "051" },
  { "code": "AW", "code3": "ABW", "name": "Aruba", "number": "533" },
  { "code": "AU", "code3": "AUS", "name": "Australia", "number": "036" },
  { "code": "AT", "code3": "AUT", "name": "Austria", "number": "040" },
  { "code": "AZ", "code3": "AZE", "name": "Azerbaijan", "number": "031" },
  { "code": "BS", "code3": "BHS", "name": "Bahamas (the)", "number": "044" },
  { "code": "BH", "code3": "BHR", "name": "Bahrain", "number": "048" },
  { "code": "BD", "code3": "BGD", "name": "Bangladesh", "number": "050" },
  { "code": "BB", "code3": "BRB", "name": "Barbados", "number": "052" },
  { "code": "BY", "code3": "BLR", "name": "Belarus", "number": "112" },
  { "code": "BE", "code3": "BEL", "name": "Belgium", "number": "056" },
  { "code": "BZ", "code3": "BLZ", "name": "Belize", "number": "084" },
  { "code": "BJ", "code3": "BEN", "name": "Benin", "number": "204" },
  { "code": "BM", "code3": "BMU", "name": "Bermuda", "number": "060" },
  { "code": "BT", "code3": "BTN", "name": "Bhutan", "number": "064" },
  { "code": "BO", "code3": "BOL", "name": "Bolivia (Plurinational State of)", "number": "068" },
  { "code": "BQ", "code3": "BES", "name": "Bonaire, Sint Eustatius and Saba", "number": "535" },
  { "code": "BA", "code3": "BIH", "name": "Bosnia and Herzegovina", "number": "070" },
  { "code": "BW", "code3": "BWA", "name": "Botswana", "number": "072" },
  { "code": "BV", "code3": "BVT", "name": "Bouvet Island", "number": "074" },
  { "code": "BR", "code3": "BRA", "name": "Brazil", "number": "076" },
  { "code": "IO", "code3": "IOT", "name": "British Indian Ocean Territory (the)", "number": "086" },
  { "code": "BN", "code3": "BRN", "name": "Brunei Darussalam", "number": "096" },
  { "code": "BG", "code3": "BGR", "name": "Bulgaria", "number": "100" },
  { "code": "BF", "code3": "BFA", "name": "Burkina Faso", "number": "854" },
  { "code": "BI", "code3": "BDI", "name": "Burundi", "number": "108" },
  { "code": "CV", "code3": "CPV", "name": "Cabo Verde", "number": "132" },
  { "code": "KH", "code3": "KHM", "name": "Cambodia", "number": "116" },
  { "code": "CM", "code3": "CMR", "name": "Cameroon", "number": "120" },
  { "code": "CA", "code3": "CAN", "name": "Canada", "number": "124" },
  { "code": "KY", "code3": "CYM", "name": "Cayman Islands (the)", "number": "136" },
  { "code": "CF", "code3": "CAF", "name": "Central African Republic (the)", "number": "140" },
  { "code": "TD", "code3": "TCD", "name": "Chad", "number": "148" },
  { "code": "CL", "code3": "CHL", "name": "Chile", "number": "152" },
  { "code": "CN", "code3": "CHN", "name": "China", "number": "156" },
  { "code": "CX", "code3": "CXR", "name": "Christmas Island", "number": "162" },
  { "code": "CC", "code3": "CCK", "name": "Cocos (Keeling) Islands (the)", "number": "166" },
  { "code": "CO", "code3": "COL", "name": "Colombia", "number": "170" },
  { "code": "KM", "code3": "COM", "name": "Comoros (the)", "number": "174" },
  { "code": "CD", "code3": "COD", "name": "Congo (the Democratic Republic of the)", "number": "180" },
  { "code": "CG", "code3": "COG", "name": "Congo (the)", "number": "178" },
  { "code": "CK", "code3": "COK", "name": "Cook Islands (the)", "number": "184" },
  { "code": "CR", "code3": "CRI", "name": "Costa Rica", "number": "188" },
  { "code": "HR", "code3": "HRV", "name": "Croatia", "number": "191" },
  { "code": "CU", "code3": "CUB", "name": "Cuba", "number": "192" },
  { "code": "CW", "code3": "CUW", "name": "Cura\xE7ao", "number": "531" },
  { "code": "CY", "code3": "CYP", "name": "Cyprus", "number": "196" },
  { "code": "CZ", "code3": "CZE", "name": "Czechia", "number": "203" },
  { "code": "CI", "code3": "CIV", "name": "C\xF4te d'Ivoire", "number": "384" },
  { "code": "DK", "code3": "DNK", "name": "Denmark", "number": "208" },
  { "code": "DJ", "code3": "DJI", "name": "Djibouti", "number": "262" },
  { "code": "DM", "code3": "DMA", "name": "Dominica", "number": "212" },
  { "code": "DO", "code3": "DOM", "name": "Dominican Republic (the)", "number": "214" },
  { "code": "EC", "code3": "ECU", "name": "Ecuador", "number": "218" },
  { "code": "EG", "code3": "EGY", "name": "Egypt", "number": "818" },
  { "code": "SV", "code3": "SLV", "name": "El Salvador", "number": "222" },
  { "code": "GQ", "code3": "GNQ", "name": "Equatorial Guinea", "number": "226" },
  { "code": "ER", "code3": "ERI", "name": "Eritrea", "number": "232" },
  { "code": "EE", "code3": "EST", "name": "Estonia", "number": "233" },
  { "code": "SZ", "code3": "SWZ", "name": "Eswatini", "number": "748" },
  { "code": "ET", "code3": "ETH", "name": "Ethiopia", "number": "231" },
  { "code": "FK", "code3": "FLK", "name": "Falkland Islands (the) [Malvinas]", "number": "238" },
  { "code": "FO", "code3": "FRO", "name": "Faroe Islands (the)", "number": "234" },
  { "code": "FJ", "code3": "FJI", "name": "Fiji", "number": "242" },
  { "code": "FI", "code3": "FIN", "name": "Finland", "number": "246" },
  { "code": "FR", "code3": "FRA", "name": "France", "number": "250" },
  { "code": "GF", "code3": "GUF", "name": "French Guiana", "number": "254" },
  { "code": "PF", "code3": "PYF", "name": "French Polynesia", "number": "258" },
  { "code": "TF", "code3": "ATF", "name": "French Southern Territories (the)", "number": "260" },
  { "code": "GA", "code3": "GAB", "name": "Gabon", "number": "266" },
  { "code": "GM", "code3": "GMB", "name": "Gambia (the)", "number": "270" },
  { "code": "GE", "code3": "GEO", "name": "Georgia", "number": "268" },
  { "code": "DE", "code3": "DEU", "name": "Germany", "number": "276" },
  { "code": "GH", "code3": "GHA", "name": "Ghana", "number": "288" },
  { "code": "GI", "code3": "GIB", "name": "Gibraltar", "number": "292" },
  { "code": "GR", "code3": "GRC", "name": "Greece", "number": "300" },
  { "code": "GL", "code3": "GRL", "name": "Greenland", "number": "304" },
  { "code": "GD", "code3": "GRD", "name": "Grenada", "number": "308" },
  { "code": "GP", "code3": "GLP", "name": "Guadeloupe", "number": "312" },
  { "code": "GU", "code3": "GUM", "name": "Guam", "number": "316" },
  { "code": "GT", "code3": "GTM", "name": "Guatemala", "number": "320" },
  { "code": "GG", "code3": "GGY", "name": "Guernsey", "number": "831" },
  { "code": "GN", "code3": "GIN", "name": "Guinea", "number": "324" },
  { "code": "GW", "code3": "GNB", "name": "Guinea-Bissau", "number": "624" },
  { "code": "GY", "code3": "GUY", "name": "Guyana", "number": "328" },
  { "code": "HT", "code3": "HTI", "name": "Haiti", "number": "332" },
  { "code": "HM", "code3": "HMD", "name": "Heard Island and McDonald Islands", "number": "334" },
  { "code": "VA", "code3": "VAT", "name": "Holy See (the)", "number": "336" },
  { "code": "HN", "code3": "HND", "name": "Honduras", "number": "340" },
  { "code": "HK", "code3": "HKG", "name": "Hong Kong", "number": "344" },
  { "code": "HU", "code3": "HUN", "name": "Hungary", "number": "348" },
  { "code": "IS", "code3": "ISL", "name": "Iceland", "number": "352" },
  { "code": "IN", "code3": "IND", "name": "India", "number": "356" },
  { "code": "ID", "code3": "IDN", "name": "Indonesia", "number": "360" },
  { "code": "IR", "code3": "IRN", "name": "Iran (Islamic Republic of)", "number": "364" },
  { "code": "IQ", "code3": "IRQ", "name": "Iraq", "number": "368" },
  { "code": "IE", "code3": "IRL", "name": "Ireland", "number": "372" },
  { "code": "IM", "code3": "IMN", "name": "Isle of Man", "number": "833" },
  { "code": "IL", "code3": "ISR", "name": "Israel", "number": "376" },
  { "code": "IT", "code3": "ITA", "name": "Italy", "number": "380" },
  { "code": "JM", "code3": "JAM", "name": "Jamaica", "number": "388" },
  { "code": "JP", "code3": "JPN", "name": "Japan", "number": "392" },
  { "code": "JE", "code3": "JEY", "name": "Jersey", "number": "832" },
  { "code": "JO", "code3": "JOR", "name": "Jordan", "number": "400" },
  { "code": "KZ", "code3": "KAZ", "name": "Kazakhstan", "number": "398" },
  { "code": "KE", "code3": "KEN", "name": "Kenya", "number": "404" },
  { "code": "KI", "code3": "KIR", "name": "Kiribati", "number": "296" },
  { "code": "KP", "code3": "PRK", "name": "Korea (the Democratic People's Republic of)", "number": "408" },
  { "code": "KR", "code3": "KOR", "name": "Korea (the Republic of)", "number": "410" },
  { "code": "KW", "code3": "KWT", "name": "Kuwait", "number": "414" },
  { "code": "KG", "code3": "KGZ", "name": "Kyrgyzstan", "number": "417" },
  { "code": "LA", "code3": "LAO", "name": "Lao People's Democratic Republic (the)", "number": "418" },
  { "code": "LV", "code3": "LVA", "name": "Latvia", "number": "428" },
  { "code": "LB", "code3": "LBN", "name": "Lebanon", "number": "422" },
  { "code": "LS", "code3": "LSO", "name": "Lesotho", "number": "426" },
  { "code": "LR", "code3": "LBR", "name": "Liberia", "number": "430" },
  { "code": "LY", "code3": "LBY", "name": "Libya", "number": "434" },
  { "code": "LI", "code3": "LIE", "name": "Liechtenstein", "number": "438" },
  { "code": "LT", "code3": "LTU", "name": "Lithuania", "number": "440" },
  { "code": "LU", "code3": "LUX", "name": "Luxembourg", "number": "442" },
  { "code": "MO", "code3": "MAC", "name": "Macao", "number": "446" },
  { "code": "MG", "code3": "MDG", "name": "Madagascar", "number": "450" },
  { "code": "MW", "code3": "MWI", "name": "Malawi", "number": "454" },
  { "code": "MY", "code3": "MYS", "name": "Malaysia", "number": "458" },
  { "code": "MV", "code3": "MDV", "name": "Maldives", "number": "462" },
  { "code": "ML", "code3": "MLI", "name": "Mali", "number": "466" },
  { "code": "MT", "code3": "MLT", "name": "Malta", "number": "470" },
  { "code": "MH", "code3": "MHL", "name": "Marshall Islands (the)", "number": "584" },
  { "code": "MQ", "code3": "MTQ", "name": "Martinique", "number": "474" },
  { "code": "MR", "code3": "MRT", "name": "Mauritania", "number": "478" },
  { "code": "MU", "code3": "MUS", "name": "Mauritius", "number": "480" },
  { "code": "YT", "code3": "MYT", "name": "Mayotte", "number": "175" },
  { "code": "MX", "code3": "MEX", "name": "Mexico", "number": "484" },
  { "code": "FM", "code3": "FSM", "name": "Micronesia (Federated States of)", "number": "583" },
  { "code": "MD", "code3": "MDA", "name": "Moldova (the Republic of)", "number": "498" },
  { "code": "MC", "code3": "MCO", "name": "Monaco", "number": "492" },
  { "code": "MN", "code3": "MNG", "name": "Mongolia", "number": "496" },
  { "code": "ME", "code3": "MNE", "name": "Montenegro", "number": "499" },
  { "code": "MS", "code3": "MSR", "name": "Montserrat", "number": "500" },
  { "code": "MA", "code3": "MAR", "name": "Morocco", "number": "504" },
  { "code": "MZ", "code3": "MOZ", "name": "Mozambique", "number": "508" },
  { "code": "MM", "code3": "MMR", "name": "Myanmar", "number": "104" },
  { "code": "NA", "code3": "NAM", "name": "Namibia", "number": "516" },
  { "code": "NR", "code3": "NRU", "name": "Nauru", "number": "520" },
  { "code": "NP", "code3": "NPL", "name": "Nepal", "number": "524" },
  { "code": "NL", "code3": "NLD", "name": "Netherlands (the)", "number": "528" },
  { "code": "NC", "code3": "NCL", "name": "New Caledonia", "number": "540" },
  { "code": "NZ", "code3": "NZL", "name": "New Zealand", "number": "554" },
  { "code": "NI", "code3": "NIC", "name": "Nicaragua", "number": "558" },
  { "code": "NE", "code3": "NER", "name": "Niger (the)", "number": "562" },
  { "code": "NG", "code3": "NGA", "name": "Nigeria", "number": "566" },
  { "code": "NU", "code3": "NIU", "name": "Niue", "number": "570" },
  { "code": "NF", "code3": "NFK", "name": "Norfolk Island", "number": "574" },
  { "code": "MP", "code3": "MNP", "name": "Northern Mariana Islands (the)", "number": "580" },
  { "code": "NO", "code3": "NOR", "name": "Norway", "number": "578" },
  { "code": "OM", "code3": "OMN", "name": "Oman", "number": "512" },
  { "code": "PK", "code3": "PAK", "name": "Pakistan", "number": "586" },
  { "code": "PW", "code3": "PLW", "name": "Palau", "number": "585" },
  { "code": "PS", "code3": "PSE", "name": "Palestine, State of", "number": "275" },
  { "code": "PA", "code3": "PAN", "name": "Panama", "number": "591" },
  { "code": "PG", "code3": "PNG", "name": "Papua New Guinea", "number": "598" },
  { "code": "PY", "code3": "PRY", "name": "Paraguay", "number": "600" },
  { "code": "PE", "code3": "PER", "name": "Peru", "number": "604" },
  { "code": "PH", "code3": "PHL", "name": "Philippines (the)", "number": "608" },
  { "code": "PN", "code3": "PCN", "name": "Pitcairn", "number": "612" },
  { "code": "PL", "code3": "POL", "name": "Poland", "number": "616" },
  { "code": "PT", "code3": "PRT", "name": "Portugal", "number": "620" },
  { "code": "PR", "code3": "PRI", "name": "Puerto Rico", "number": "630" },
  { "code": "QA", "code3": "QAT", "name": "Qatar", "number": "634" },
  { "code": "MK", "code3": "MKD", "name": "Republic of North Macedonia", "number": "807" },
  { "code": "RO", "code3": "ROU", "name": "Romania", "number": "642" },
  { "code": "RU", "code3": "RUS", "name": "Russian Federation (the)", "number": "643" },
  { "code": "RW", "code3": "RWA", "name": "Rwanda", "number": "646" },
  { "code": "RE", "code3": "REU", "name": "R\xE9union", "number": "638" },
  { "code": "BL", "code3": "BLM", "name": "Saint Barth\xE9lemy", "number": "652" },
  { "code": "SH", "code3": "SHN", "name": "Saint Helena, Ascension and Tristan da Cunha", "number": "654" },
  { "code": "KN", "code3": "KNA", "name": "Saint Kitts and Nevis", "number": "659" },
  { "code": "LC", "code3": "LCA", "name": "Saint Lucia", "number": "662" },
  { "code": "MF", "code3": "MAF", "name": "Saint Martin (French part)", "number": "663" },
  { "code": "PM", "code3": "SPM", "name": "Saint Pierre and Miquelon", "number": "666" },
  { "code": "VC", "code3": "VCT", "name": "Saint Vincent and the Grenadines", "number": "670" },
  { "code": "WS", "code3": "WSM", "name": "Samoa", "number": "882" },
  { "code": "SM", "code3": "SMR", "name": "San Marino", "number": "674" },
  { "code": "ST", "code3": "STP", "name": "Sao Tome and Principe", "number": "678" },
  { "code": "SA", "code3": "SAU", "name": "Saudi Arabia", "number": "682" },
  { "code": "SN", "code3": "SEN", "name": "Senegal", "number": "686" },
  { "code": "RS", "code3": "SRB", "name": "Serbia", "number": "688" },
  { "code": "SC", "code3": "SYC", "name": "Seychelles", "number": "690" },
  { "code": "SL", "code3": "SLE", "name": "Sierra Leone", "number": "694" },
  { "code": "SG", "code3": "SGP", "name": "Singapore", "number": "702" },
  { "code": "SX", "code3": "SXM", "name": "Sint Maarten (Dutch part)", "number": "534" },
  { "code": "SK", "code3": "SVK", "name": "Slovakia", "number": "703" },
  { "code": "SI", "code3": "SVN", "name": "Slovenia", "number": "705" },
  { "code": "SB", "code3": "SLB", "name": "Solomon Islands", "number": "090" },
  { "code": "SO", "code3": "SOM", "name": "Somalia", "number": "706" },
  { "code": "ZA", "code3": "ZAF", "name": "South Africa", "number": "710" },
  { "code": "GS", "code3": "SGS", "name": "South Georgia and the South Sandwich Islands", "number": "239" },
  { "code": "SS", "code3": "SSD", "name": "South Sudan", "number": "728" },
  { "code": "ES", "code3": "ESP", "name": "Spain", "number": "724" },
  { "code": "LK", "code3": "LKA", "name": "Sri Lanka", "number": "144" },
  { "code": "SD", "code3": "SDN", "name": "Sudan (the)", "number": "729" },
  { "code": "SR", "code3": "SUR", "name": "Suriname", "number": "740" },
  { "code": "SJ", "code3": "SJM", "name": "Svalbard and Jan Mayen", "number": "744" },
  { "code": "SE", "code3": "SWE", "name": "Sweden", "number": "752" },
  { "code": "CH", "code3": "CHE", "name": "Switzerland", "number": "756" },
  { "code": "SY", "code3": "SYR", "name": "Syrian Arab Republic", "number": "760" },
  { "code": "TW", "code3": "TWN", "name": "Taiwan", "number": "158" },
  { "code": "TJ", "code3": "TJK", "name": "Tajikistan", "number": "762" },
  { "code": "TZ", "code3": "TZA", "name": "Tanzania, United Republic of", "number": "834" },
  { "code": "TH", "code3": "THA", "name": "Thailand", "number": "764" },
  { "code": "TL", "code3": "TLS", "name": "Timor-Leste", "number": "626" },
  { "code": "TG", "code3": "TGO", "name": "Togo", "number": "768" },
  { "code": "TK", "code3": "TKL", "name": "Tokelau", "number": "772" },
  { "code": "TO", "code3": "TON", "name": "Tonga", "number": "776" },
  { "code": "TT", "code3": "TTO", "name": "Trinidad and Tobago", "number": "780" },
  { "code": "TN", "code3": "TUN", "name": "Tunisia", "number": "788" },
  { "code": "TR", "code3": "TUR", "name": "Turkey", "number": "792" },
  { "code": "TM", "code3": "TKM", "name": "Turkmenistan", "number": "795" },
  { "code": "TC", "code3": "TCA", "name": "Turks and Caicos Islands (the)", "number": "796" },
  { "code": "TV", "code3": "TUV", "name": "Tuvalu", "number": "798" },
  { "code": "UG", "code3": "UGA", "name": "Uganda", "number": "800" },
  { "code": "UA", "code3": "UKR", "name": "Ukraine", "number": "804" },
  { "code": "AE", "code3": "ARE", "name": "United Arab Emirates (the)", "number": "784" },
  { "code": "GB", "code3": "GBR", "name": "United Kingdom of Great Britain and Northern Ireland (the)", "number": "826" },
  { "code": "UM", "code3": "UMI", "name": "United States Minor Outlying Islands (the)", "number": "581" },
  { "code": "US", "code3": "USA", "name": "United States of America (the)", "number": "840" },
  { "code": "UY", "code3": "URY", "name": "Uruguay", "number": "858" },
  { "code": "UZ", "code3": "UZB", "name": "Uzbekistan", "number": "860" },
  { "code": "VU", "code3": "VUT", "name": "Vanuatu", "number": "548" },
  { "code": "VE", "code3": "VEN", "name": "Venezuela (Bolivarian Republic of)", "number": "862" },
  { "code": "VN", "code3": "VNM", "name": "Viet Nam", "number": "704" },
  { "code": "VG", "code3": "VGB", "name": "Virgin Islands (British)", "number": "092" },
  { "code": "VI", "code3": "VIR", "name": "Virgin Islands (U.S.)", "number": "850" },
  { "code": "WF", "code3": "WLF", "name": "Wallis and Futuna", "number": "876" },
  { "code": "EH", "code3": "ESH", "name": "Western Sahara", "number": "732" },
  { "code": "YE", "code3": "YEM", "name": "Yemen", "number": "887" },
  { "code": "ZM", "code3": "ZMB", "name": "Zambia", "number": "894" },
  { "code": "ZW", "code3": "ZWE", "name": "Zimbabwe", "number": "716" },
  { "code": "AX", "code3": "ALA", "name": "\xC5land Islands", "number": "248" }
];
var listToArray = (input) => {
  return input.split(",").map((item) => item.trim());
};
var getEmojiNum = (number) => {
  switch (number) {
    case 1:
      return `1\uFE0F\u20E3`;
    case 2:
      return `2\uFE0F\u20E3`;
    case 3:
      return `3\uFE0F\u20E3\uFE0F`;
    case 4:
      return `4\uFE0F\u20E3`;
    case 5:
      return `5\uFE0F\u20E3`;
    case 6:
      return `6\uFE0F\u20E3`;
    case 7:
      return `7\uFE0F\u20E3`;
    case 8:
      return `8\uFE0F\u20E3`;
    case 9:
      return `9\uFE0F\u20E3`;
    case 10:
      return `\u{1F51F}`;
  }
};
var getProgressBar = (mainSteps, currentMainStep) => {
  let arr = [`1\uFE0F\u20E3`, `2\uFE0F\u20E3`, `3\uFE0F\u20E3`, `4\uFE0F\u20E3`, `5\uFE0F\u20E3`, `6\uFE0F\u20E3`, `7\uFE0F\u20E3`, `8\uFE0F\u20E3`, `9\uFE0F\u20E3`, `\u{1F51F}`];
  arr = arr.slice(0, mainSteps.length);
  arr.splice(0, currentMainStep - 1, ...Array(currentMainStep - 1).fill("\u2705"));
  return arr.join("");
};
var getSubProgressBar = (steps, currentStep) => {
  let arr = [`1\uFE0F\u20E3`, `2\uFE0F\u20E3`, `3\uFE0F\u20E3`, `4\uFE0F\u20E3`, `5\uFE0F\u20E3`, `6\uFE0F\u20E3`, `7\uFE0F\u20E3`, `8\uFE0F\u20E3`, `9\uFE0F\u20E3`, `\u{1F51F}`];
  arr = arr.slice(0, steps.filter((s) => !s.step.includes("DONESTEP")).length);
  arr.splice(0, currentStep - 1, ...Array(currentStep - 1).fill("\u2705"));
  arr[currentStep - 1] = "\u23FA";
  return arr.join("");
};
var getPreviousStep = (mainSteps, currentMainStep, currentStep) => {
  if (currentMainStep === 0 && currentStep === 0 || currentMainStep < 0 || currentStep < 0) {
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
    previousStep
  };
};
var getNextStep = (mainSteps, currentMainStep, currentStep) => {
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
    nextStep
  };
};
var writeToObject = (obj, previousStepObject, mapTo, value, raw = false) => {
  var _a, _b, _c, _d, _e;
  if (value === null || value === void 0) {
    return;
  }
  if (!Array.isArray(mapTo)) {
    let keys = mapTo.split(".");
    let lastKeyIndex = keys.length - 1;
    for (let i = 0; i < lastKeyIndex; ++i) {
      let key = keys[i];
      if (!(key in obj)) {
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
      if (!(rawValues == null ? void 0 : rawValues.length) || isNaN(rawValues[0])) {
        return false;
      }
      const optsArr = previousStepObject.options.map((o) => {
        let [chainId, address, chainName, coinName] = o.value.split("|");
        chainId = +chainId;
        return {
          chainId,
          address,
          chainName,
          coinName
        };
      });
      let final = {};
      for (let opt of optsArr) {
        final[opt.chainName] = final[opt.chainName] ? final[opt.chainName] : [];
        final[opt.chainName].push({
          chainId: opt.chainId,
          address: opt.address,
          chainName: opt.chainName,
          coinName: opt.coinName
        });
      }
      const optsArrFinal = Object.values(final).flat();
      const selectedOptsArr = [];
      for (let rv of rawValues) {
        rv = +rv;
        if (
          //@ts-ignore
          rv <= 0 || //@ts-ignore
          isNaN(rv) || //@ts-ignore
          rv > optsArrFinal.length || Number(rv) === rv && rv % 1 !== 0
        ) {
          return false;
        }
        selectedOptsArr.push(optsArrFinal[rv - 1]);
      }
      let result = selectedOptsArr.reduce((acc, curr) => {
        let found = acc.findIndex((item) => item.chainId === curr.chainId);
        if (found >= 0) {
          acc[found].tokens.push({
            address: curr.address,
            name: curr.coinName
          });
        } else {
          acc.push({
            chainId: curr.chainId,
            tokens: [
              {
                address: curr.address,
                name: curr.coinName
              }
            ]
          });
        }
        return acc;
      }, []);
      obj[keys[lastKeyIndex]] = result;
      return;
    }
    if (previousStepObject.valueType === "stringArray") {
      if (value.includes("\u2705")) {
        return;
      }
      const values = value.split("|");
      finalValue = [];
      for (let v of values) {
        let obj2 = previousStepObject.options.find((o) => o.value === v);
        finalValue.push({
          label: obj2.text,
          value: obj2.value
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
        obj = obj;
      } else {
        obj = obj[key];
      }
    }
    let finalValue = value;
    switch (previousStepObject.valueType) {
      case "dateRange": {
        finalValue = (_a = value.split("-")) == null ? void 0 : _a[mti];
        const from = (_c = (_b = value.split("-")) == null ? void 0 : _b[0]) == null ? void 0 : _c.trim();
        const to = (_e = (_d = value.split("-")) == null ? void 0 : _d[1]) == null ? void 0 : _e.trim();
        if (!from || !to) {
          return false;
        }
        const fromDate = (0, import_dayjs.default)(from, dateTimeFormat);
        const toDate = (0, import_dayjs.default)(to, dateTimeFormat);
        if (fromDate.isBefore((0, import_dayjs.default)(), "day")) {
          return false;
        }
        if (toDate.isBefore(fromDate, "day") || toDate.isBefore((0, import_dayjs.default)(), "day")) {
          return false;
        }
        finalValue = (0, import_dayjs.default)(finalValue, dateTimeFormat).toDate();
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
        if (new import_bignumber.default(finalValue).isNaN()) {
          return false;
        }
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
var pushToObject = (obj, previousStepObject, mapTo, value, raw = false) => {
  if (value === null || value === void 0) {
    return;
  }
  let keys = mapTo.split(".");
  let lastKeyIndex = keys.length - 1;
  for (let i = 0; i < lastKeyIndex; ++i) {
    let key = keys[i];
    if (!(key in obj)) {
      obj = obj[key];
    }
    obj = obj[key];
  }
  let finalValue = value;
  obj[keys[lastKeyIndex]].push(finalValue);
  return true;
};
var writeToLastItem = (obj, previousStepObject, mapTo, value, raw = false) => {
  if (value === null || value === void 0) {
    return;
  }
  let keys = mapTo.split(".");
  let lastKeyIndex = keys.length - 1;
  for (let i = 0; i < lastKeyIndex; ++i) {
    let key = keys[i];
    if (!(key in obj)) {
      obj = obj[key];
    }
    obj = obj[key];
  }
  let finalValue = value;
  const self = obj[keys[lastKeyIndex]];
  self[self.length - 1] = finalValue;
  return true;
};
var readObject = (obj, path, mainSteps) => {
  var _a, _b, _c, _d, _e, _f, _g;
  if (Array.isArray(path)) {
    let values = [];
    for (let p of path) {
      let value = (_b = (_a = p == null ? void 0 : p.split(".")) == null ? void 0 : _a.reduce(
        (o, i) => o[i],
        obj
      )) != null ? _b : null;
      if (p.includes("period")) {
        if ((0, import_dayjs.default)(value).isValid()) {
          value = (0, import_dayjs.default)(value).format(dateTimeFormat);
        }
        if (values.some((v) => !v)) {
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
          for (let mainStep of mainSteps) {
            let step = mainStep.steps.find(
              //@ts-ignore
              (step2) => JSON.stringify(step2.mapTo) === JSON.stringify(path)
            );
            if (step)
              return step;
          }
          return null;
        };
        return (
          //@ts-ignore
          ((_e = (_d = (_c = findStep()) == null ? void 0 : _c.options) == null ? void 0 : _d.find(
            (o) => {
              var _a2, _b2;
              return (o == null ? void 0 : o.value) === ((_a2 = values[0]) == null ? void 0 : _a2.toString()) + "|" + ((_b2 = values[1]) == null ? void 0 : _b2.toString());
            }
          )) == null ? void 0 : _e.text) || null
        );
      }
    }
    return null;
  }
  let result = (_f = path == null ? void 0 : path.split(".")) == null ? void 0 : _f.reduce((o, i) => o[i], obj);
  if (!result && result !== false) {
    result = null;
  }
  if (path === "payment.chains") {
    let chains = {};
    let networkNames = {};
    if (!((_g = obj == null ? void 0 : obj.payment) == null ? void 0 : _g.chains)) {
      return null;
    }
    obj.payment.chains.forEach((item) => {
      if (!chains[item.chainId]) {
        chains[item.chainId] = [];
      }
      item.tokens.forEach((token) => {
        chains[item.chainId].push({ address: token.address, name: token.name });
      });
    });
    let blockchainsSelectStep = mainSteps.flatMap((mainStep) => mainStep.steps).find((step) => step.mapTo === "payment.chains");
    blockchainsSelectStep.options.forEach((option) => {
      let parts = option.value.split("|");
      let chainId = parseInt(parts[0]);
      let address = parts[1];
      let networkName = parts[2];
      let tokenName = parts[3];
      networkNames[chainId] = networkName;
      if (chains[chainId]) {
        let tokenIndex = chains[chainId].findIndex(
          (token) => token.address === address
        );
        if (tokenIndex !== -1) {
          chains[chainId][tokenIndex].name = "\u2705 " + tokenName;
        }
      }
    });
    let stringResult = "";
    for (let chainId in chains) {
      stringResult += `
${networkNames[chainId]}:
`;
      chains[chainId].forEach((token) => {
        stringResult += ` ${token.name}
`;
      });
    }
    return stringResult.trim();
  }
  if (path === "kyc.contactInfos") {
    if (result === null)
      return null;
    return result.map((item) => `\u2705 ${item.label}`).join("\n");
  }
  return result;
};
var isLink = (input) => {
  const linkDetectionRegex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
  return linkDetectionRegex.test(input);
};
var getCurrentValue = async (ctx, step, value, targetObject, mainSteps) => {
  var _a;
  if (value === null) {
    return null;
  }
  switch (step.type) {
    case "select":
      let options = step.options;
      if (typeof step.options === "function") {
        options = await step.options(ctx, ctx.scene.state.targetObject);
      }
      return (_a = options.find((o) => value == o.value)) == null ? void 0 : _a.text;
    case "input":
      if (step.valueType === "dateRange") {
        const from = readObject(targetObject, step.mapTo[0], mainSteps);
        const to = readObject(targetObject, step.mapTo[1], mainSteps);
        return `${(0, import_dayjs.default)(from).format(dateTimeFormat)} - ${(0, import_dayjs.default)(to).format(dateTimeFormat)}`;
      }
      return value;
    case "boolean":
      return value === true ? "Yes" : "No";
    case "photo":
      if (value === null) {
        return "Not provided";
      }
      if (isLink(value)) {
        return value;
      }
      return `https://nftstorage.link/ipfs/${value}/photo.png`;
    case "list":
      return value.map((v) => v.toUpperCase()).join(", ");
    default:
      return value;
  }
};
var saveLaunchpadLaunchToDB = async (launchpadLaunch, userId, userType, UserDb) => {
  let user = await UserDb.getOrCreateUser(userId, userType);
  await UserDb.updateUser(user.userId, user.type, { ...user, launchpadLaunch });
};
var getSummary = async (ctx, mainSteps, type, obj, skipping) => {
  let summaryText = "";
  let usedMainSteps = [];
  for (let mainStep of mainSteps) {
    let thisMainStep = {
      ...mainStep,
      steps: []
    };
    for (let step of mainStep.steps) {
      if (!skipping.find((s) => step.step === s.stepId)) {
        if (step.step !== "DONESTEP" && step.step !== "DONESTEP_RESPONSE" && step.step !== "DONESTEP_RESPONSE_CONFIRM" && step.step !== "DONESTEP_RESPONSE_CONFIRM_RESPONSE") {
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
      summaryText += `

<u>${mainStep.mainStep}</u>

`;
    } else {
      summaryText += `

<u>Main Step ${getEmojiNum(i)}: ${mainStep.mainStep}</u>

`;
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
      if ((step == null ? void 0 : step.excludeFromSummaryIfValueIs) && (step == null ? void 0 : step.excludeFromSummaryIfValueIs) === readObject(obj, step.mapTo, mainSteps)) {
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
      let title;
      if (typeof step.title === "string") {
        title = step.title;
      } else {
        try {
          title = await step.title(
            ctx.scene.state.userId,
            ctx.scene.state.targetObject,
            ctx
          );
        } catch (e) {
          console.log("ERROR HEREEEEE1");
          return ctx.wizard.steps[ctx.wizard.cursor - 1](ctx);
        }
      }
      summaryText += `<b>${title}</b>
${currentValueLabel}
<b>${currentValue}</b>

`;
    }
  }
  if (type === "telegram") {
    return summaryText;
  } else if (type === "discord") {
    return summaryText.replace(/<b>/g, "").replace(/<\/b>/g, "").replace(/<u>/g, "").replace(/<\/u>/g, "");
  }
};
var splitInput = (input) => {
  let chunks = [];
  let start = 0;
  let end = Math.min(1999, input.length);
  while (start < input.length) {
    let lastBackslash = input.lastIndexOf("\\", end);
    if (lastBackslash === -1 || lastBackslash <= start + 1999) {
      chunks.push(input.substring(start, end));
      start = end;
    } else {
      chunks.push(input.substring(start, lastBackslash));
      start = lastBackslash + 1;
    }
    end = Math.min(end + 1999, input.length);
  }
  return chunks;
};

// src/discord.ts
var import_dayjs2 = __toESM(require("dayjs"));
var import_customParseFormat2 = __toESM(require("dayjs/plugin/customParseFormat"));
var import_discord = require("discord.js");
import_dayjs2.default.extend(import_customParseFormat2.default);
var producer = (UserDb, targetObject, mainSteps) => {
  var _a, _b, _c, _d, _e, _f, _g;
  let handlers = [];
  for (let [msi, mainStep] of mainSteps.entries()) {
    for (let [si, step] of mainStep.steps.entries()) {
      let prev = getPreviousStep(mainSteps, msi, si);
      let current = (_b = (_a = mainSteps == null ? void 0 : mainSteps[msi]) == null ? void 0 : _a.steps) == null ? void 0 : _b[si];
      let next = getNextStep(mainSteps, msi, si);
      let backId = (
        //@ts-ignore
        (_e = (_d = (_c = mainSteps == null ? void 0 : mainSteps[prev == null ? void 0 : prev.previousMainStep]) == null ? void 0 : _c.steps) == null ? void 0 : _d[prev == null ? void 0 : prev.previousStep]) == null ? void 0 : _e.step
      );
      const currentStepObject = (
        //@ts-ignore
        (_g = (_f = mainSteps == null ? void 0 : mainSteps[msi]) == null ? void 0 : _f.steps) == null ? void 0 : _g[si]
      );
      handlers.push({
        name: step.step,
        description: step.title,
        run: async (client, interaction) => {
          console.log("CLIENT", client[interaction.user.id]);
          if (msi === 0 && si === 0) {
            if (!client[interaction.user.id]) {
              client[interaction.user.id] = {};
            }
            client[interaction.user.id].targetObject = JSON.parse(
              JSON.stringify(targetObject)
            );
            client[interaction.user.id].skipping = [];
            console.log("CLIENT", client[interaction.user.id]);
          }
          let components = [];
          let component;
          switch (step.type) {
            case "input": {
              let inputPlaceholder = step.title;
              if (step.valueType === "dateRange") {
                inputPlaceholder = `${(0, import_dayjs2.default)().format("D/M/YYYY")} - ${(0, import_dayjs2.default)().add(7, "day").format("D/M/YYYY")}`;
              }
              if (step.step === "tokenAddress") {
                inputPlaceholder = `0xf467F6d7e5E8dAC1309C30Ea661291c86Ead7462`;
              }
              component = new import_discord.TextInputBuilder().setLabel(step.title).setCustomId(step.step + " Summary").setPlaceholder(inputPlaceholder).setStyle(import_discord.TextInputStyle.Short);
              break;
            }
            case "select":
            case "eitherTrue":
            case "selectTwo": {
              const options = step.options.map(
                (o) => new import_discord.StringSelectMenuOptionBuilder().setLabel(o.text).setValue(o.value)
              );
              component = new import_discord.StringSelectMenuBuilder().setCustomId(step.step + " Summary").setPlaceholder(step.title).addOptions(...options);
              break;
            }
            case "multiSelect": {
              const options = step.options.map(
                (o) => new import_discord.StringSelectMenuOptionBuilder().setLabel(o.text).setValue(o.value)
              );
              component = new import_discord.StringSelectMenuBuilder().setCustomId(step.step + " Summary").setPlaceholder(step.title).addOptions(...options).setMinValues(1).setMaxValues(options.length);
              break;
            }
            case "check": {
              component = new import_discord.StringSelectMenuBuilder().setCustomId(step.step + " Summary").setPlaceholder(step.title).addOptions(
                new import_discord.StringSelectMenuOptionBuilder().setLabel("Yes").setValue("true"),
                new import_discord.StringSelectMenuOptionBuilder().setLabel("No").setValue("false")
              );
              break;
            }
          }
          components.push(new import_discord.ActionRowBuilder().addComponents(component));
          const trimString = (input) => {
            const maxLength = 45;
            const ending = "...";
            if (input.length > maxLength) {
              return input.substring(0, maxLength - ending.length) + ending;
            } else {
              return input;
            }
          };
          if (step.type === "input") {
            const modal = new import_discord.ModalBuilder().setTitle(trimString(`${mainStep.mainStep} - ${step.title}`)).setCustomId(step.step + " Summary");
            modal.setComponents(components);
            await interaction.showModal(modal);
            return;
          } else {
            await (interaction == null ? void 0 : interaction.reply({
              ephemeral: true,
              components
            }));
            return;
          }
        }
      });
      handlers.push({
        name: step.step + " Summary",
        description: step.step + " Summary",
        run: async (client, interaction) => {
          var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h, _i, _j;
          let user = await UserDb.getOrCreateUser(
            interaction.user.id,
            "discord"
          );
          let selection = false;
          if (((_a2 = interaction == null ? void 0 : interaction.values) == null ? void 0 : _a2.length) === 1) {
            selection = (_b2 = interaction == null ? void 0 : interaction.values) == null ? void 0 : _b2[0];
          } else if (((_c2 = interaction == null ? void 0 : interaction.values) == null ? void 0 : _c2.length) > 1) {
            selection = interaction.values;
          }
          let callbackData = selection || ((_e2 = (_d2 = interaction.fields) == null ? void 0 : _d2.getTextInputValue) == null ? void 0 : _e2.call(_d2, (step == null ? void 0 : step.step) + " Summary"));
          if (step.valueType === "blockchainsSelect") {
            if (!Array.isArray(callbackData)) {
              callbackData = [callbackData];
            }
            let selections = [];
            for (let s of callbackData) {
              let i = step.options.findIndex((o) => o.value === s);
              selections.push(i + 1);
            }
            callbackData = selections.join(",");
          }
          const retryButton = new import_discord.ButtonBuilder().setCustomId(
            //@ts-ignore
            mainSteps[msi].steps[si].step
          ).setLabel("Retry").setStyle(import_discord.ButtonStyle.Primary);
          if (
            //@ts-ignore
            (currentStepObject == null ? void 0 : currentStepObject.validation) && callbackData && //@ts-ignore
            !((_f2 = currentStepObject == null ? void 0 : currentStepObject.validation) == null ? void 0 : _f2.call(currentStepObject, callbackData))
          ) {
            await interaction.reply({
              content: "Error. " + currentStepObject.validationError,
              ephemeral: true,
              components: [new import_discord.ActionRowBuilder().addComponents(retryButton)]
            });
            return;
          }
          let mapTos = typeof currentStepObject.mapTo === "string" ? currentStepObject.mapTo : JSON.parse(JSON.stringify(currentStepObject.mapTo));
          let result = writeToObject(
            //@ts-ignore
            client[interaction.user.id].targetObject,
            currentStepObject,
            mapTos,
            callbackData
          );
          if (result === false) {
            let errorMsg = "Invalid input. ";
            let specificErrorMesage = "";
            if (currentStepObject.valueType === "number") {
              specificErrorMesage = "Please enter a valid number.";
            }
            errorMsg = errorMsg + specificErrorMesage;
            if (step.valueType === "dateRange") {
              const exampleDateRange2 = `${(0, import_dayjs2.default)().format(
                dateTimeFormat
              )} - ${(0, import_dayjs2.default)().add(7, "day").format(dateTimeFormat)}`;
              errorMsg = "Invalid input.\n\n*Please enter a valid date range **starting today (" + (0, import_dayjs2.default)().format(dateTimeFormat) + ")** with the following format:\n\n**Day/Month/Year Hour:Minute:Seconds - Day/Month/Year Hour:Minute:Seconds**\n\nFor example:\n**" + exampleDateRange2 + "***";
            }
            await interaction.reply({
              content: errorMsg,
              ephemeral: true,
              components: [new import_discord.ActionRowBuilder().addComponents(retryButton)]
            });
            return;
          }
          user = await UserDb.updateUser(interaction.user.id, "discord", {
            ...user,
            //@ts-ignore
            launchpadLaunch: client[interaction.user.id].targetObject
          });
          const changeValueBtn = new import_discord.ButtonBuilder().setCustomId(
            //@ts-ignore
            mainSteps[msi].steps[si].step
          ).setLabel("Change value").setStyle(import_discord.ButtonStyle.Primary);
          let continueId = "LAUNCHPAD FINISHED";
          if (next) {
            const lastMainStep = mainSteps.length - 1;
            const lastStep = mainSteps[lastMainStep].steps.length - 1;
            continueId = //@ts-ignore
            next.nextMainStep === lastMainStep && next.nextStep === lastStep ? (
              //@ts-ignore
              mainSteps[next.nextMainStep].steps[next.nextStep].step + " Summary"
            ) : (
              //@ts-ignore
              mainSteps[next.nextMainStep].steps[next.nextStep].step
            );
          }
          const dependsOnChecker = (next2) => {
            var _a3, _b3, _c3;
            if (next2 && //@ts-ignore
            ((_c3 = (_b3 = (_a3 = mainSteps == null ? void 0 : mainSteps[next2.nextMainStep]) == null ? void 0 : _a3.steps) == null ? void 0 : _b3[next2.nextStep]) == null ? void 0 : _c3.dependsOn)) {
              const { dependsOn, step: stepId, mapTo: skipMapTo } = (
                //@ts-ignore
                mainSteps[next2.nextMainStep].steps[next2.nextStep]
              );
              const skippingPosition = {
                //@ts-ignore
                mainStep: next2.nextMainStep,
                //@ts-ignore
                step: next2.nextStep,
                stepId
              };
              if (dependsOn.condition === "oneOf") {
                if (!dependsOn.value.includes(
                  readObject(
                    //@ts-ignore
                    client[interaction.user.id].targetObject,
                    dependsOn.key,
                    mainSteps
                  )
                )) {
                  if (
                    //@ts-ignore
                    !client[interaction.user.id].skipping.find(
                      (s) => s.mainStep === msi && s.step === si
                    )
                  ) {
                    client[interaction.user.id].skipping.push(skippingPosition);
                  }
                  const nextNext = getNextStep(
                    mainSteps,
                    //@ts-ignore
                    next2.nextMainStep,
                    //@ts-ignore
                    next2.nextStep
                  );
                  if (nextNext) {
                    continueId = mainSteps[nextNext.nextMainStep].steps[nextNext.nextStep].step;
                  }
                } else {
                  client[interaction.user.id].skipping = //@ts-ignore
                  //prettier-ignore
                  client[interaction.user.id].skipping.filter((s) => !(s.mainStep === next2.nextMainStep && s.step === next2.nextStep));
                }
              } else if (dependsOn.condition === "equals") {
                let dependsOnValue = readObject(
                  //@ts-ignore
                  client[interaction.user.id].targetObject,
                  dependsOn.key,
                  mainSteps
                );
                switch (dependsOn.type) {
                  case "boolean":
                    dependsOnValue = readObject(
                      //@ts-ignore
                      client[interaction.user.id].targetObject,
                      dependsOn.key,
                      mainSteps
                    ) === true;
                    break;
                  case "number":
                    dependsOnValue = readObject(
                      //@ts-ignore
                      client[interaction.user.id].targetObject,
                      dependsOn.key,
                      mainSteps
                    );
                    break;
                }
                if (dependsOn.value !== dependsOnValue) {
                  if (
                    //@ts-ignore
                    !client[interaction.user.id].skipping.find(
                      (s) => s.mainStep === msi && s.step === si
                    )
                  ) {
                    client[interaction.user.id].skipping.push(skippingPosition);
                  }
                  const nextNext = getNextStep(
                    mainSteps,
                    //@ts-ignore
                    next2.nextMainStep,
                    //@ts-ignore
                    next2.nextStep
                  );
                  if (nextNext) {
                    continueId = mainSteps[nextNext.nextMainStep].steps[nextNext.nextStep].step;
                  }
                } else {
                  client[interaction.user.id].skipping = //@ts-ignore
                  //prettier-ignore
                  client[interaction.user.id].skipping.filter((s) => !(s.mainStep === next2.nextMainStep && s.step === next2.nextStep));
                }
              } else if (dependsOn.condition === "eitherTrue") {
                let dependsOnValue1 = readObject(
                  //@ts-ignore
                  client[interaction.user.id].targetObject,
                  dependsOn.key[0],
                  mainSteps
                );
                let dependsOnValue2 = readObject(
                  //@ts-ignore
                  client[interaction.user.id].targetObject,
                  dependsOn.key[1],
                  mainSteps
                );
                if (!(dependsOnValue1 === dependsOn.value || dependsOnValue2 === dependsOn.value)) {
                  if (
                    //@ts-ignore
                    !client[interaction.user.id].skipping.find(
                      (s) => s.mainStep === msi && s.step === si
                    )
                  ) {
                    client[interaction.user.id].skipping.push(skippingPosition);
                  }
                  const nextNext = getNextStep(
                    mainSteps,
                    //@ts-ignore
                    next2.nextMainStep,
                    //@ts-ignore
                    next2.nextStep
                  );
                  if (nextNext) {
                    continueId = mainSteps[nextNext.nextMainStep].steps[nextNext.nextStep].step;
                  }
                } else {
                  client[interaction.user.id].skipping = //@ts-ignore
                  //prettier-ignore
                  client[interaction.user.id].skipping.filter((s) => !(s.mainStep === next2.nextMainStep && s.step === next2.nextStep));
                }
              }
              return true;
            }
            return false;
          };
          let nextDependsOnCheck = next;
          while (dependsOnChecker(nextDependsOnCheck)) {
            nextDependsOnCheck = getNextStep(
              mainSteps,
              nextDependsOnCheck.nextMainStep,
              nextDependsOnCheck.nextStep
            );
          }
          if (continueId === "DONESTEP") {
            continueId = "DONESTEP Summary";
          }
          const continueBtn = new import_discord.ButtonBuilder().setCustomId(
            //@ts-ignore
            continueId
          ).setLabel("Continue").setStyle(import_discord.ButtonStyle.Primary);
          let currentValue = await getCurrentValue(
            {},
            //@ts-ignore
            step,
            //@ts-ignore
            readObject(user.launchpadLaunch, step.mapTo),
            client[interaction.user.id].targetObject,
            mainSteps
          );
          if (current.valueType === "boolean" && currentValue !== null) {
            currentValue = currentValue === true ? "Yes" : "No";
          }
          const exampleDateRange = `${(0, import_dayjs2.default)().format("D/M/YYYY")} - ${(0, import_dayjs2.default)().add(7, "day").format("D/M/YYYY")}`;
          const dateRangeInfo = `${step.valueType === "dateRange" ? "\n\n*Please enter a valid date range **starting today (" + (0, import_dayjs2.default)().format("D/M/YYYY") + ")** with the following format:\n\n**Day/Month/Year - Day/Month/Year**\n\nFor example:\n*****" + exampleDateRange : ""}`;
          let multiSelectMenu = "";
          if (step.type == "multiSelect") {
            if (step.valueType === "blockchainsSelect") {
              const optsArr = step.options.map((o) => {
                let [chainId, address, chainName, coinName] = o.value.split("|");
                chainId = +chainId;
                return {
                  chainId,
                  address,
                  chainName,
                  coinName
                };
              });
              let final = {};
              for (let opt of optsArr) {
                final[opt.chainName] = final[opt.chainName] ? final[opt.chainName] : [];
                final[opt.chainName].push(opt.coinName);
              }
              let count = 1;
              let result2 = "";
              for (let key of Object.keys(final)) {
                result2 += `
${key}:
`;
                for (let item of final[key]) {
                  result2 += `${count}. ${item}
`;
                  count++;
                }
              }
              multiSelectMenu = `

` + result2.trim() + "\n";
            }
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
          const regular = `Question:       
__${step.title}__${dateRangeInfo}${multiSelectMenu}
            
${currentValue ? currentValueLabel : ""}
${currentValue ? "**" + currentValue + "**" : ""}`;
          let summary;
          if (step.step === "DONESTEP") {
            summary = ((_i = (_h = await ((_g2 = getSummary) == null ? void 0 : _g2(
              {},
              mainSteps,
              "discord",
              client[interaction.user.id].targetObject,
              client[interaction.user.id].skipping
            ))) == null ? void 0 : _h.trim) == null ? void 0 : _i.call(_h)) || "";
          }
          const content = `**Step ${getEmojiNum(msi + 1)} of ${getEmojiNum(
            mainSteps.length
          )}: ${step.step !== "DONESTEP" ? mainStep.mainStep : "Summary"}**
                  
${step.step !== "DONESTEP" ? getProgressBar(mainSteps, msi + 1) : getProgressBar(mainSteps, msi + 2)}
                  
${step.step !== "DONESTEP" ? regular : summary}`;
          const buttons = [];
          let skippingMatch = client[interaction.user.id].skipping.find(
            (s) => s.stepId === backId
          );
          while (skippingMatch) {
            let furtherBackStep = (
              //@ts-ignore
              getPreviousStep(mainSteps, skippingMatch.mainStep, skippingMatch.step)
            );
            let furtherBackStepId = (
              //@ts-ignore
              (_j = mainSteps[furtherBackStep.previousMainStep]) == null ? void 0 : _j.steps[
                //@ts-ignore
                furtherBackStep.previousStep
              ].step
            );
            backId = furtherBackStepId;
            skippingMatch = client[interaction.user.id].skipping.find(
              (s) => s.stepId === furtherBackStepId
            );
          }
          if (prev) {
            const backBtn = new import_discord.ButtonBuilder().setCustomId(
              //@ts-ignore
              backId
            ).setLabel("Back").setStyle(import_discord.ButtonStyle.Danger);
            buttons.push(backBtn);
          }
          if (next) {
            buttons.push(changeValueBtn);
            buttons.push(continueBtn);
          }
          const rows = [new import_discord.ActionRowBuilder().addComponents(...[buttons])];
          let finalContent = splitInput(content);
          if (finalContent.length > 1) {
            for (let [ci, chunk] of finalContent.entries()) {
              if (ci === 0) {
                await interaction.reply({
                  content: chunk,
                  ephemeral: true,
                  components: rows
                });
              } else {
                await interaction.followUp({
                  content: chunk,
                  ephemeral: true,
                  components: rows
                });
              }
            }
          } else {
            await interaction.reply({
              content,
              ephemeral: true,
              components: rows
            });
          }
        }
      });
    }
  }
  return handlers;
};
var discord_default = producer;

// src/telegram.ts
var import_dayjs3 = __toESM(require("dayjs"));
var import_customParseFormat3 = __toESM(require("dayjs/plugin/customParseFormat"));
import_dayjs3.default.extend(import_customParseFormat3.default);
var producer2 = (producerInitiator) => {
  const fns = [];
  const mainSteps = producerInitiator.mainSteps;
  for (let [msi, mainStep] of mainSteps.entries()) {
    if (mainStep.steps[mainStep.steps.length - 1].step === "DONESTEP") {
      if (producerInitiator.finalConfirmationNeeded) {
        mainStep.steps.push({
          step: "DONESTEP_RESPONSE_CONFIRM",
          title: "Confirm?",
          type: "select",
          mapTo: "done",
          valueType: "boolean",
          options: [
            {
              text: "Yes",
              value: "||onCompleteConfirm||"
            }
          ]
        });
        mainStep.steps.push({
          step: "DONESTEP_RESPONSE_CONFIRM_RESPONSE",
          title: "DONE!",
          type: "input",
          mapTo: "done",
          valueType: "boolean"
        });
      }
      mainStep.steps.push({
        step: "DONESTEP_RESPONSE",
        title: "DONE!",
        type: "input",
        mapTo: "done",
        valueType: "boolean"
      });
    }
    for (let [si, step] of mainStep.steps.entries()) {
      let fn = async (ctx, TelegramClient, UserDb, targetObject, additionalFunctions) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta;
        try {
          await ctx.deleteMessage();
        } catch (e) {
        }
        if (msi === 0 && si === 0 && !ctx.scene.state.targetObject) {
          ctx.scene.state.targetObject = JSON.parse(
            JSON.stringify(targetObject)
          );
          ctx.scene.state.userId = ((_c = (_b = (_a = ctx == null ? void 0 : ctx.update) == null ? void 0 : _a.callback_query) == null ? void 0 : _b.from) == null ? void 0 : _c.id) || ((_d = ctx == null ? void 0 : ctx.message) == null ? void 0 : _d.from.id);
          ctx.scene.state.skipping = [];
        }
        if (msi === 0 && si === 0 && !ctx.scene.state.targetObjectRaw) {
          ctx.scene.state.targetObjectRaw = JSON.parse(
            JSON.stringify(targetObject)
          );
        }
        if (await TelegramClient.exitWizardAndGoToButtonActionOrCommand(ctx)) {
          return;
        }
        ctx.state.justEntered = false;
        let prev = getPreviousStep(mainSteps, msi, si);
        let current = (_f = (_e = mainSteps == null ? void 0 : mainSteps[msi]) == null ? void 0 : _e.steps) == null ? void 0 : _f[si];
        let next = getNextStep(mainSteps, msi, si);
        let callbackData = ((_h = (_g = mainSteps == null ? void 0 : mainSteps[prev == null ? void 0 : prev.previousMainStep]) == null ? void 0 : _g.steps[prev == null ? void 0 : prev.previousStep]) == null ? void 0 : _h.type) === "input" || ((_j = (_i = mainSteps == null ? void 0 : mainSteps[prev == null ? void 0 : prev.previousMainStep]) == null ? void 0 : _i.steps[prev == null ? void 0 : prev.previousStep]) == null ? void 0 : _j.type) === "multiSelect" ? (_k = ctx == null ? void 0 : ctx.message) == null ? void 0 : _k.text : (_m = (_l = ctx.update) == null ? void 0 : _l.callback_query) == null ? void 0 : _m.data;
        if (!((_n = ctx.scene.state) == null ? void 0 : _n.in_branch) && ((_p = (_o = ctx.scene) == null ? void 0 : _o.state) == null ? void 0 : _p.step_before_branch)) {
          const backToStep = ctx.scene.state.step_before_branch;
          ctx.scene.state.step_before_branch = void 0;
          while (ctx.wizard.cursor < backToStep) {
            ctx.wizard.cursor++;
          }
          ctx.wizard.steps[ctx.wizard.cursor](ctx);
          return;
        }
        if ((_s = (_r = (_q = ctx.update) == null ? void 0 : _q.callback_query) == null ? void 0 : _r.data) == null ? void 0 : _s.includes("branch_")) {
          let branch = (_u = (_t = ctx.update) == null ? void 0 : _t.callback_query) == null ? void 0 : _u.data;
          ctx.update.callback_query.data = void 0;
          ctx.scene.state.step_before_branch = ctx.wizard.cursor - 1;
          ctx.scene.state.in_branch = true;
          ctx.scene.state.branch_first_entry = true;
          await ctx.scene.enter(branch, ctx.scene.state);
          return;
        }
        if (((_w = (_v = ctx.update) == null ? void 0 : _v.callback_query) == null ? void 0 : _w.data) === backToMainBranch) {
          ctx.update.callback_query.data = void 0;
          ctx.scene.state.in_branch = false;
          await ctx.scene.enter("launchpad-projects-launch", ctx.scene.state);
          return;
        }
        let prevObj = (_x = mainSteps == null ? void 0 : mainSteps[prev == null ? void 0 : prev.previousMainStep]) == null ? void 0 : _x.steps[prev == null ? void 0 : prev.previousStep];
        if ((prevObj == null ? void 0 : prevObj.type) === "branch" && (prevObj == null ? void 0 : prevObj.validation) && ((_z = (_y = ctx.update) == null ? void 0 : _y.callback_query) == null ? void 0 : _z.data) !== universalBack) {
          const val = readObject(
            ctx.scene.state.targetObject,
            //@ts-ignore
            prevObj == null ? void 0 : prevObj.validationTarget
          );
          const validationResult = prevObj == null ? void 0 : prevObj.validation(val);
          if (!(validationResult == null ? void 0 : validationResult.success)) {
            return ctx.reply(validationResult == null ? void 0 : validationResult.reason);
          }
        }
        if ((((_B = (_A = mainSteps == null ? void 0 : mainSteps[prev == null ? void 0 : prev.previousMainStep]) == null ? void 0 : _A.steps[prev == null ? void 0 : prev.previousStep]) == null ? void 0 : _B.type) === "select" || ((_D = (_C = mainSteps == null ? void 0 : mainSteps[prev == null ? void 0 : prev.previousMainStep]) == null ? void 0 : _C.steps[prev == null ? void 0 : prev.previousStep]) == null ? void 0 : _D.type) === "check" || ((_F = (_E = mainSteps == null ? void 0 : mainSteps[prev == null ? void 0 : prev.previousMainStep]) == null ? void 0 : _E.steps[prev == null ? void 0 : prev.previousStep]) == null ? void 0 : _F.type) === "selectTwo") && ((_G = ctx == null ? void 0 : ctx.message) == null ? void 0 : _G.text) && !((_H = ctx.scene.state.skipping) == null ? void 0 : _H.find(
          (s) => {
            var _a2, _b2;
            return (
              //@ts-ignore
              s.mainStep === (prev == null ? void 0 : prev.previousMainStep) && //@ts-ignore
              s.step === (prev == null ? void 0 : prev.previousStep) && s.step === ((_b2 = (_a2 = mainSteps == null ? void 0 : mainSteps[prev == null ? void 0 : prev.previousMainStep]) == null ? void 0 : _a2.steps[prev == null ? void 0 : prev.previousStep]) == null ? void 0 : _b2.step)
            );
          }
        )) && !((_J = (_I = mainSteps == null ? void 0 : mainSteps[prev == null ? void 0 : prev.previousMainStep]) == null ? void 0 : _I.steps[prev == null ? void 0 : prev.previousStep]) == null ? void 0 : _J.inBranch)) {
          await ctx.reply("Invalid input. Please try again.");
          return;
        }
        if (((_L = (_K = mainSteps == null ? void 0 : mainSteps[prev == null ? void 0 : prev.previousMainStep]) == null ? void 0 : _K.steps[prev == null ? void 0 : prev.previousStep]) == null ? void 0 : _L.type) === "list" && !((_N = (_M = ctx.update) == null ? void 0 : _M.callback_query) == null ? void 0 : _N.data) && ((_P = (_O = ctx.update) == null ? void 0 : _O.callback_query) == null ? void 0 : _P.data) !== null) {
          if (!ctx.message || !((_Q = ctx.message) == null ? void 0 : _Q.text)) {
            await ctx.reply(
              `Enter a valid comma seperated country code list (E.g.: AF, AL).`
            );
            return;
          }
          const listEntered = listToArray(ctx.message.text);
          if (!(listEntered == null ? void 0 : listEntered.length)) {
            await ctx.reply(
              `Enter a valid comma seperated country code list (E.g.: AF, AL).`
            );
            return;
          }
          for (let item of listEntered) {
            if (!countryList.find(
              (c) => item.toLowerCase() === c.code.toLowerCase() || item.toLowerCase() === c.code3.toLowerCase()
            )) {
              await ctx.reply(`Country code "${item}" is invalid.`);
              return;
            }
          }
          callbackData = ctx.message.text;
        }
        if (((_S = (_R = mainSteps == null ? void 0 : mainSteps[prev == null ? void 0 : prev.previousMainStep]) == null ? void 0 : _R.steps[prev == null ? void 0 : prev.previousStep]) == null ? void 0 : _S.type) === "photo" && !((_U = (_T = ctx.update) == null ? void 0 : _T.callback_query) == null ? void 0 : _U.data) && ((_W = (_V = ctx.update) == null ? void 0 : _V.callback_query) == null ? void 0 : _W.data) !== null) {
          if (!ctx.message || !ctx.message.photo) {
            await ctx.reply(
              `Upload a photo. Select "Compress the image" and try again.`
            );
            return;
          }
          const maxSizeInBytes = 2 * 1024 * 1024;
          const telegramPhotoObj = ctx.message.photo[ctx.message.photo.length - 1];
          if (telegramPhotoObj.file_size > maxSizeInBytes) {
            await ctx.reply("Image size cannot be more than 2MB. Try again.");
            return;
          }
          await ctx.reply("Uploading Logo...");
          const fileId = telegramPhotoObj.file_id;
          const imageObj = await ctx.telegram.getFileLink(fileId);
          const imageName = "photo.png";
          const imgFile = await additionalFunctions.fileFromUrl(
            imageObj.href,
            imageName
          );
          const tokenLogoUrl = await additionalFunctions.uploadImageLogo(
            imgFile,
            imageName
          );
          callbackData = tokenLogoUrl.replace("ipfs://", "").split("/")[0];
          await ctx.reply("Logo Uploaded!");
        }
        if (((_Y = (_X = ctx.update) == null ? void 0 : _X.callback_query) == null ? void 0 : _Y.data) === universalOnCompleteConfirmation) {
        }
        if (((__ = (_Z = ctx.update) == null ? void 0 : _Z.callback_query) == null ? void 0 : __.data) === universalOnCompleteConfirm) {
          ctx.scene.leave();
          try {
            await producerInitiator.onComplete(
              ctx,
              ctx.scene.state.targetObject
            );
          } catch (e) {
            console.error("Error in onComplete", {
              targetObject: ctx.scene.state.targetObject,
              e
            });
          }
          return;
        }
        if (((_aa = (_$ = ctx.update) == null ? void 0 : _$.callback_query) == null ? void 0 : _aa.data) === universalOnComplete) {
          ctx.scene.leave();
          try {
            await producerInitiator.onComplete(
              ctx,
              ctx.scene.state.targetObject
            );
          } catch (e) {
            console.error("Error in onComplete", {
              targetObject: ctx.scene.state.targetObject,
              e
            });
          }
          return;
        }
        if (((_ca = (_ba = ctx.update) == null ? void 0 : _ba.callback_query) == null ? void 0 : _ca.data) === universalBack) {
          ctx.update.callback_query.data = null;
          ctx.wizard.cursor--;
          ctx.wizard.cursor--;
          if (ctx.wizard.steps[ctx.wizard.cursor]) {
            ctx.wizard.steps[ctx.wizard.cursor](ctx);
            return;
          } else {
            ctx.wizard.cursor++;
            ctx.wizard.steps[ctx.wizard.cursor](ctx);
            return;
          }
        }
        let previousStepObject = (
          //@ts-ignore
          (_ea = (_da = mainSteps == null ? void 0 : mainSteps[prev == null ? void 0 : prev.previousMainStep]) == null ? void 0 : _da.steps) == null ? void 0 : _ea[prev == null ? void 0 : prev.previousStep]
        );
        if (prev && //@ts-ignore
        !((_fa = ctx.scene.state.skipping) == null ? void 0 : _fa.find(
          (s) => s.mainStep === (prev == null ? void 0 : prev.previousMainStep) && s.step === (prev == null ? void 0 : prev.previousStep) && s.branch === mainSteps
        )) && //@ts-ignore
        (previousStepObject == null ? void 0 : previousStepObject.validation) && callbackData !== void 0 && previousStepObject.type !== "branch") {
          if (!(previousStepObject == null ? void 0 : previousStepObject.validation(callbackData))) {
            ((_ga = ctx == null ? void 0 : ctx.message) == null ? void 0 : _ga.text) ? ctx.message.text = void 0 : null;
            ((_ia = (_ha = ctx == null ? void 0 : ctx.update) == null ? void 0 : _ha.callback_query) == null ? void 0 : _ia.data) ? ctx.update.callback_query.data = void 0 : null;
            if ((previousStepObject == null ? void 0 : previousStepObject.validationError) && typeof (previousStepObject == null ? void 0 : previousStepObject.validationError) === "string") {
              await ctx.reply(previousStepObject == null ? void 0 : previousStepObject.validationError);
            } else {
              await ctx.reply("Invalid input. Please try again.");
            }
            return;
          }
        }
        let mapTos = null;
        if (previousStepObject == null ? void 0 : previousStepObject.mapTo) {
          mapTos = typeof (previousStepObject == null ? void 0 : previousStepObject.mapTo) === "string" ? previousStepObject == null ? void 0 : previousStepObject.mapTo : JSON.parse(JSON.stringify(previousStepObject == null ? void 0 : previousStepObject.mapTo));
        }
        if (callbackData !== universalBack && callbackData !== null && callbackData !== void 0) {
          if (previousStepObject && !((_ja = ctx.scene.state.skipping) == null ? void 0 : _ja.find(
            (s) => s.mainStep === (prev == null ? void 0 : prev.previousMainStep) && s.step === (prev == null ? void 0 : prev.previousStep) && s.branch === mainSteps
          )) && mapTos) {
            if (!previousStepObject.inBranch) {
              if (callbackData !== universalContinue && callbackData !== universalSkip) {
                let result = writeToObject(
                  ctx.scene.state.targetObject,
                  previousStepObject,
                  mapTos,
                  callbackData
                );
                if (result === false) {
                  console.log("CB", callbackData);
                  await ctx.reply("Invalid input. Please try again.");
                  return;
                }
              } else {
                ctx.update.callback_query.data = null;
                ctx.wizard.cursor++;
                await ctx.wizard.steps[ctx.wizard.cursor - 1](ctx);
                ctx.wizard.cursor--;
                return;
              }
            } else {
              if (previousStepObject.step === "enterReleaseDate") {
                ctx.scene.state.releaseObj = {
                  date: "",
                  percentage: "",
                  allowVesting: false
                };
                const date = (0, import_dayjs3.default)(callbackData, dateTimeFormat);
                if (!date.isValid()) {
                  return ctx.reply(
                    "Please enter a future date with the following format:\nDay/Month/Year Hour:Minute:Seconds\n\nFor example:\n" + (0, import_dayjs3.default)().add(1, "day").format(dateTimeFormat)
                  );
                }
                if (date.isBefore((0, import_dayjs3.default)())) {
                  return ctx.reply(
                    "Please enter a future date with the following format:\nDay/Month/Year Hour:Minute:Seconds\n\nFor example:\n" + (0, import_dayjs3.default)().add(1, "day").format(dateTimeFormat)
                  );
                }
                ctx.scene.state.releaseObj.date = date.toISOString();
                if (ctx.scene.state.branch_first_entry) {
                  pushToObject(
                    ctx.scene.state.targetObject,
                    previousStepObject,
                    mapTos,
                    ctx.scene.state.releaseObj
                  );
                  ctx.scene.state.branch_first_entry = false;
                }
              } else if (previousStepObject.step === "enterPercentage") {
                callbackData = callbackData == null ? void 0 : callbackData.replace(/%/g, "");
                const input = +(callbackData == null ? void 0 : callbackData.replace(/%/g, ""));
                if (Number.isNaN(input) || input < 0) {
                  return ctx.reply("Please enter a valid number");
                }
                const fundraiseRelease = readObject(
                  ctx.scene.state.targetObject,
                  previousStepObject.mapTo,
                  mainSteps
                );
                const totalPerccentage = fundraiseRelease.reduce(
                  (acc, curr) => acc + +curr.percentage,
                  0
                );
                if (totalPerccentage + input > 100) {
                  return ctx.reply(
                    `Invalid percentage. You can only add ${100 - totalPerccentage}% left.`
                  );
                }
                ctx.scene.state.releaseObj.percentage = callbackData;
                writeToLastItem(
                  ctx.scene.state.targetObject,
                  previousStepObject,
                  mapTos,
                  ctx.scene.state.releaseObj
                );
              } else if (previousStepObject.step === "vesting") {
                ctx.scene.state.releaseObj.allowVesting = callbackData;
                writeToLastItem(
                  ctx.scene.state.targetObject,
                  previousStepObject,
                  mapTos,
                  ctx.scene.state.releaseObj
                );
              }
              if (previousStepObject == null ? void 0 : previousStepObject.action) {
                console.log(
                  "ACTION HERE",
                  prevObj == null ? void 0 : prevObj.action,
                  (_la = (_ka = ctx.update) == null ? void 0 : _ka.callback_query) == null ? void 0 : _la.data
                );
                if (((_na = (_ma = ctx.update) == null ? void 0 : _ma.callback_query) == null ? void 0 : _na.data) === "false" && prevObj.actionNoBackTomainBranch) {
                  ctx.update.callback_query.data = void 0;
                  ctx.scene.state.in_branch = false;
                  await ctx.scene.enter(
                    "launchpad-projects-launch",
                    ctx.scene.state
                  );
                  return;
                }
                const val = readObject(
                  ctx.scene.state.targetObject,
                  prevObj == null ? void 0 : prevObj.mapTo
                );
                prevObj == null ? void 0 : prevObj.action(val);
              }
            }
          }
        }
        if (step.step === "DONESTEP" && !producerInitiator.finalConfirmationNeeded) {
          ctx.scene.leave();
          try {
            await producerInitiator.onComplete(
              ctx,
              ctx.scene.state.targetObject
            );
          } catch (e) {
            console.error("Error in onComplete", {
              targetObject: ctx.scene.state.targetObject,
              e
            });
          }
          return;
        }
        if (current.dependsOn) {
          const { dependsOn, step: stepId } = current;
          const currentPosition = {
            mainStep: msi,
            step: si,
            branch: mainSteps,
            stepId
          };
          if (dependsOn.condition === "oneOf") {
            if (!dependsOn.value.includes(
              readObject(
                ctx.scene.state.targetObject,
                dependsOn.key,
                mainSteps
              )
            )) {
              if (!ctx.scene.state.skipping.find(
                (s) => s.mainStep === msi && s.step === si && s.branch === mainSteps
              )) {
                ctx.scene.state.skipping.push(currentPosition);
              }
              switch ((_pa = (_oa = ctx.update) == null ? void 0 : _oa.callback_query) == null ? void 0 : _pa.data) {
                case universalBack: {
                  ctx.wizard.cursor--;
                  ctx.wizard.steps[ctx.wizard.cursor](ctx);
                  return;
                }
                case null: {
                  ctx.wizard.cursor--;
                  ctx.wizard.steps[ctx.wizard.cursor](ctx);
                  return;
                }
              }
              ctx.wizard.cursor++;
              ctx.wizard.steps[ctx.wizard.cursor](ctx);
              return;
            } else {
              ctx.scene.state.skipping = ctx.scene.state.skipping.filter(
                (s) => !(s.mainStep === msi && s.step === si && s.branch === mainSteps)
              );
            }
          } else if (dependsOn.condition === "equals") {
            let dependsOnValue = readObject(
              ctx.scene.state.targetObject,
              dependsOn.key,
              mainSteps
            );
            switch (dependsOn.type) {
              case "boolean":
                dependsOnValue = readObject(
                  ctx.scene.state.targetObject,
                  dependsOn.key,
                  mainSteps
                ) === true;
                break;
              case "number":
                dependsOnValue = readObject(
                  ctx.scene.state.targetObject,
                  dependsOn.key,
                  mainSteps
                );
                break;
            }
            if (dependsOn.value !== dependsOnValue) {
              if (!ctx.scene.state.skipping.find(
                (s) => s.mainStep === msi && s.step === si && s.branch === mainSteps
              )) {
                ctx.scene.state.skipping.push(currentPosition);
              }
              switch ((_ra = (_qa = ctx.update) == null ? void 0 : _qa.callback_query) == null ? void 0 : _ra.data) {
                case universalBack: {
                  ctx.wizard.cursor--;
                  ctx.wizard.steps[ctx.wizard.cursor](ctx);
                  return;
                }
                case null: {
                  ctx.wizard.cursor--;
                  ctx.wizard.steps[ctx.wizard.cursor](ctx);
                  return;
                }
              }
              ctx.wizard.cursor++;
              ctx.wizard.steps[ctx.wizard.cursor](ctx);
              return;
            } else {
              ctx.scene.state.skipping = ctx.scene.state.skipping.filter(
                (s) => !(s.mainStep === msi && s.step === si && s.branch === mainSteps)
              );
            }
          } else if (dependsOn.condition === "eitherTrue") {
            let dependsOnValue1 = readObject(
              ctx.scene.state.targetObject,
              dependsOn.key[0],
              mainSteps
            );
            let dependsOnValue2 = readObject(
              ctx.scene.state.targetObject,
              dependsOn.key[1],
              mainSteps
            );
            if (!(dependsOnValue1 === dependsOn.value || dependsOnValue2 === dependsOn.value)) {
              if (!ctx.scene.state.skipping.find(
                (s) => s.mainStep === msi && s.step === si && s.branch === mainSteps
              )) {
                ctx.scene.state.skipping.push(currentPosition);
              }
              switch ((_ta = (_sa = ctx.update) == null ? void 0 : _sa.callback_query) == null ? void 0 : _ta.data) {
                case universalBack: {
                  ctx.wizard.cursor--;
                  ctx.wizard.steps[ctx.wizard.cursor](ctx);
                  return;
                }
                case null: {
                  ctx.wizard.cursor--;
                  ctx.wizard.steps[ctx.wizard.cursor](ctx);
                  return;
                }
              }
              ctx.wizard.cursor++;
              ctx.wizard.steps[ctx.wizard.cursor](ctx);
              return;
            } else {
              ctx.scene.state.skipping = ctx.scene.state.skipping.filter(
                (s) => !(s.mainStep === msi && s.step === si && s.branch === mainSteps)
              );
            }
          } else if (dependsOn.condition === "not") {
            let dependsOnValue = readObject(
              ctx.scene.state.targetObject,
              dependsOn.key,
              mainSteps
            );
            if (dependsOnValue[dependsOn.type] === dependsOn.value) {
              ctx.wizard.cursor++;
              ctx.wizard.steps[ctx.wizard.cursor](ctx);
              return;
            }
          }
        }
        let currentValue = await getCurrentValue(
          ctx,
          step,
          //@ts-ignore
          readObject(ctx.scene.state.targetObject, step.mapTo),
          ctx.scene.state.targetObject,
          mainSteps
        );
        if (current.valueType === "boolean" && currentValue !== null) {
          if (currentValue !== true && currentValue !== false) {
            currentValue = null;
          } else {
            currentValue = currentValue === true ? "Yes" : "No";
          }
        }
        if (currentValue !== null && typeof currentValue === "object") {
          if (Array.isArray(currentValue)) {
            if (currentValue.length) {
              if (step.display === "lastItem") {
                const val = readObject(
                  ctx.scene.state.targetObject,
                  step.mapTo,
                  mainSteps
                );
                currentValue = val[val.length - 1][step.displayKey];
                if ((0, import_dayjs3.default)(currentValue).isValid()) {
                  currentValue = (0, import_dayjs3.default)(currentValue).format(dateTimeFormat);
                }
              }
            } else {
              currentValue = "-";
            }
          } else {
            currentValue = JSON.stringify({ test: 1, currentValue });
          }
          currentValue = JSON.stringify(currentValue);
        }
        const exampleDateRange = `${(0, import_dayjs3.default)().format(dateTimeFormat)} - ${(0, import_dayjs3.default)().add(7, "day").format(dateTimeFormat)}`;
        const dateRangeInfo = `${step.valueType === "dateRange" ? "\n\n<i>Please enter a valid date range <b>starting today (" + (0, import_dayjs3.default)().format(dateTimeFormat) + ")</b> with the following format:\n\n<b>Day/Month/Year Hour:Minute:Seconds - Day/Month/Year Hour:Minute:Seconds</b>\n\nFor example:</i>\n<b>" + exampleDateRange + "</b>" : ""}`;
        let multiSelectMenu = "";
        if (step.type == "multiSelect") {
          if (step.valueType === "blockchainsSelect") {
            const optsArr = step.options.map((o) => {
              let [chainId, address, chainName, coinName] = o.value.split("|");
              chainId = +chainId;
              return {
                chainId,
                address,
                chainName,
                coinName
              };
            });
            let final = {};
            for (let opt of optsArr) {
              final[opt.chainName] = final[opt.chainName] ? final[opt.chainName] : [];
              final[opt.chainName].push(opt.coinName);
            }
            let count = 1;
            let result = "";
            for (let key of Object.keys(final)) {
              result += `
${key}:
`;
              for (let item of final[key]) {
                result += `${count}. ${item}
`;
                count++;
              }
            }
            multiSelectMenu = `

` + result.trim() + "\n\n<i>Enter a comma seperated number(s) for the blockchain(s) you want to use. For example:\n1,3,5</i>";
          }
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
        let title;
        if (typeof step.title === "string") {
          title = step.title;
        } else {
          try {
            title = await step.title(
              ctx.scene.state.userId,
              ctx.scene.state.targetObject,
              ctx
            );
          } catch (e) {
            console.log("ERROR HEREEEEE2");
            return ctx.wizard.steps[ctx.wizard.cursor - 1](ctx);
          }
        }
        let regular = `

<u>Question</u>:       
${title}${dateRangeInfo}${multiSelectMenu}
${step.example ? "\n For example:\n " + step.example() + "\n" : ""}        
${currentValue ? currentValueLabel : ""}
${currentValue ? "<b>" + currentValue + "</b>" : ""}`;
        let summary = regular;
        let header = `<b>Main Step ${getEmojiNum(msi + 1)} of ${getEmojiNum(
          mainSteps.length
        )}: ${mainStep.mainStep}</b>`;
        if (mainSteps.length === 1) {
          header = `<b>${mainStep.mainStep}</b>`;
        }
        let progressBar = getProgressBar(mainSteps, msi + 1);
        let subProgressBar = getSubProgressBar(mainSteps[msi].steps, si + 1);
        if (step.step === "DONESTEP") {
          summary = await getSummary(
            ctx,
            mainSteps,
            "telegram",
            ctx.scene.state.targetObject,
            ctx.scene.state.skipping
          );
          header = "<b>Summary</b>";
          progressBar = "";
          if (step.branchDone) {
            summary = step.branchDoneText;
            let title2 = "";
            if (typeof step.title === "string") {
              title2 = step.title;
            } else {
              try {
                title2 = await step.title(
                  ctx.scene.state.userId,
                  ctx.scene.state.targetObject,
                  ctx
                );
              } catch (e) {
                console.log("ERROR HEREEEEE0");
                return ctx.wizard.steps[ctx.wizard.cursor - 1](ctx);
              }
            }
            header = ` <b>\u2705 ${title2}</b>

`;
            progressBar = "";
          }
        }
        if (step.step === "DONESTEP_RESPONSE_CONFIRM") {
          try {
            await producerInitiator.onComplete(
              ctx,
              ctx.scene.state.targetObject
            );
          } catch (e) {
            console.error("Error in onComplete", {
              targetObject: ctx.scene.state.targetObject,
              e
            });
          }
          return;
        }
        const body = `${header}${progressBar && (subProgressBar == null ? void 0 : subProgressBar.length) > 1 ? "\n\nSteps: " + subProgressBar : ""}${summary}`;
        const baseKeyboard = [];
        if ((msi === 0 && si > 0 || msi > 0) && !step.branchDone) {
          baseKeyboard.push({
            text: "Back",
            callback_data: universalBack
          });
        }
        if (step.step === "DONESTEP" && step.branchDone) {
          baseKeyboard.push({
            text: "Continue",
            callback_data: backToMainBranch
          });
        }
        if (step.type === "photo") {
          baseKeyboard.push({
            text: "Skip",
            callback_data: "||SKIP||"
          });
        }
        if ((msi === 0 && si > 0 || msi > 0) && step.doneButtonBranch) {
          baseKeyboard.push({
            text: step.doneButtonText,
            callback_data: step.doneButtonBranch
          });
        }
        const finalKeyboard = [baseKeyboard];
        if (step.type === "select" || step.type === "selectTwo" || step.type === "eitherTrue") {
          let options = step.options;
          if (typeof step.options === "function") {
            options = await step.options(ctx, ctx.scene.state.targetObject);
          }
          if (step.options) {
            finalKeyboard.unshift(
              ...options.map((o) => [
                {
                  text: `${o == null ? void 0 : o.text}`,
                  callback_data: o.value
                }
              ])
            );
          }
        }
        if (step.type === "check") {
          finalKeyboard.unshift([
            {
              text: "Yes",
              callback_data: "true"
            },
            {
              text: "No",
              callback_data: "false"
            }
          ]);
        }
        if (step.type === "branch") {
          finalKeyboard.unshift(
            step.branchNames.map(
              (branch) => ({
                text: branch.branchTitle,
                callback_data: branch.branchName
              })
            ),
            [
              {
                text: `Continue`,
                callback_data: universalContinue
              }
            ]
          );
        }
        const cv = await getCurrentValue(
          ctx,
          step,
          //@ts-ignore
          readObject(ctx.scene.state.targetObject, step.mapTo),
          ctx.scene.state.targetObject,
          mainSteps
        );
        if (cv !== null && (typeof cv === "string" && cv || typeof cv === "number" || typeof cv === "boolean") && cv) {
          finalKeyboard.push([
            {
              text: "Continue with current value",
              callback_data: readObject(
                ctx.scene.state.targetObject,
                step.mapTo,
                mainSteps
              ) + ""
            }
          ]);
        }
        if (!(msi === mainSteps.length - 1 && si === mainSteps[msi].steps.length - 1)) {
          ctx.wizard.next();
          await saveLaunchpadLaunchToDB(
            ctx.scene.state.targetObject,
            ctx.scene.state.userId,
            "telegram",
            UserDb
          );
        } else {
        }
        if (producerInitiator.onComplete && msi === mainSteps.length - 1 && si === mainSteps[msi].steps.length - 1) {
          ctx.scene.leave();
          try {
            await producerInitiator.onComplete(
              ctx,
              ctx.scene.state.targetObject
            );
          } catch (e) {
            console.error("Error in onComplete", {
              targetObject: ctx.scene.state.targetObject,
              e
            });
          }
          const backButton = baseKeyboard.find((b) => b.text === "Back");
          if (backButton) {
            baseKeyboard.splice(baseKeyboard.indexOf(backButton), 1);
          }
        }
        if (step.step === "DONESTEP") {
          if ((producerInitiator == null ? void 0 : producerInitiator.onComplete) && typeof (producerInitiator == null ? void 0 : producerInitiator.onComplete) === "function") {
            finalKeyboard.push([
              {
                text: "Confirm",
                callback_data: producerInitiator.finalConfirmationNeeded ? universalOnCompleteConfirmation : universalOnComplete
              }
            ]);
          }
        }
        try {
          await ctx.deleteMessage();
        } catch (e) {
        }
        try {
          await ctx.replyWithHTML(body, {
            reply_markup: {
              inline_keyboard: finalKeyboard
            }
          });
        } catch (e) {
          console.log("error failed replyWithHTML in TG Producer", e);
        }
      };
      fns.push(fn);
    }
  }
  return fns;
};
var telegram_default = producer2;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DiscordProducer,
  TelegramProducer
});
