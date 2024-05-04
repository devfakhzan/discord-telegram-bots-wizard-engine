"use strict";
// Flow:
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitInput = exports.getSummary = exports.saveLaunchpadLaunchToDB = exports.getCurrentValue = exports.nullifyKey = exports.deleteKey = exports.readObject = exports.writeToObject = exports.getNextStep = exports.getPreviousStep = exports.getProgressBar = exports.getEmojiNum = exports.universalBack = void 0;
// 1. There is a flow wizard
// 2. Lay down the big steps and the small steps in each of the big steps
// 3. Find out the type of the input for each of the small steps
// 4. Map it to the master object
// 5. The types are: Choices, Multi-select, Regular input (number), Date range
// 6. There are optional steps based on the input from previous step
// 7. There are choice based on choice
const customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
const dayjs_1 = __importDefault(require("dayjs"));
dayjs_1.default.extend(customParseFormat_1.default);
exports.universalBack = "||universalBack||";
const getEmojiNum = (number) => {
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
exports.getEmojiNum = getEmojiNum;
const getProgressBar = (currentMainStep) => {
    let arr = [`1️⃣`, `2️⃣`, `3️⃣`, `4️⃣`, `5️⃣`, `6️⃣`, `7️⃣`, `8️⃣`, `9️⃣`, `🔟`];
    arr.splice(0, currentMainStep - 1, ...Array(currentMainStep - 1).fill("✅"));
    return arr.join("");
};
exports.getProgressBar = getProgressBar;
const getPreviousStep = (mainSteps, currentMainStep, currentStep) => {
    if ((currentMainStep === 0 && currentStep === 0) ||
        currentMainStep < 0 ||
        currentStep < 0) {
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
exports.getPreviousStep = getPreviousStep;
const getNextStep = (mainSteps, currentMainStep, currentStep) => {
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
exports.getNextStep = getNextStep;
const writeToObject = (obj, originalObj, previousStepObject, mapTo, value, raw = false) => {
    var _a, _b, _c, _d, _e;
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
                obj = originalObj[key];
            }
            obj = obj[key];
        }
        let finalValue = value;
        switch (previousStepObject.valueType) {
            case "number": {
                if (isNaN(Number(finalValue))) {
                    return false;
                }
                finalValue = Number(finalValue);
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
        if (previousStepObject.valueType === "blockchainsSelect") {
            const rawValues = [...new Set(value.replace(/\s/g, "").split(","))];
            //@ts-ignore
            if (!(rawValues === null || rawValues === void 0 ? void 0 : rawValues.length) || isNaN(rawValues[0])) {
                return false;
            }
            const optsArr = previousStepObject.options.map((o) => {
                let [chainId, address, chainName, coinName] = o.value.split("|");
                chainId = +chainId;
                return {
                    chainId,
                    address,
                    chainName,
                    coinName,
                };
            });
            let final = {};
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
                    (Number(rv) === rv && rv % 1 !== 0)) {
                    return false;
                }
                //@ts-ignore
                selectedOptsArr.push(optsArrFinal[rv - 1]);
            }
            let result = selectedOptsArr.reduce((acc, curr) => {
                let found = acc.findIndex((item) => item.chainId === curr.chainId);
                if (found >= 0) {
                    acc[found].tokens.push({
                        address: curr.address,
                        name: curr.coinName,
                    });
                }
                else {
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
                let obj = previousStepObject.options.find((o) => o.value === v);
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
                obj = originalObj[key];
            }
            else {
                obj = obj[key];
            }
        }
        let finalValue = value;
        switch (previousStepObject.valueType) {
            case "dateRange": {
                finalValue = (_a = value.split("-")) === null || _a === void 0 ? void 0 : _a[mti];
                const from = (_c = (_b = value.split("-")) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.trim();
                const to = (_e = (_d = value.split("-")) === null || _d === void 0 ? void 0 : _d[1]) === null || _e === void 0 ? void 0 : _e.trim();
                console.log("WRITING", from, to);
                if (!from || !to) {
                    return false;
                }
                const fromDate = (0, dayjs_1.default)(from, "D/M/YYYY");
                const toDate = (0, dayjs_1.default)(to, "D/M/YYYY");
                if (fromDate.isBefore((0, dayjs_1.default)(), "day")) {
                    return false;
                }
                if (toDate.isBefore(fromDate, "day") ||
                    toDate.isBefore((0, dayjs_1.default)(), "day")) {
                    return false;
                }
                finalValue = (0, dayjs_1.default)(finalValue, "D/M/YYYY").toDate();
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
                if (isNaN(Number(finalValue))) {
                    return false;
                }
                finalValue = Number(finalValue);
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
exports.writeToObject = writeToObject;
const readObject = (obj, path, mainSteps) => {
    var _a, _b, _c, _d, _e, _f, _g;
    //console.log("OBJ", obj, path)
    if (Array.isArray(path)) {
        let values = [];
        for (let p of path) {
            let value = (_b = (_a = p === null || p === void 0 ? void 0 : p.split(".")) === null || _a === void 0 ? void 0 : _a.reduce((o, i) => o[i], obj)) !== null && _b !== void 0 ? _b : null;
            if (p.includes("period")) {
                if ((0, dayjs_1.default)(value).isValid()) {
                    value = (0, dayjs_1.default)(value).format("D/M/YYYY");
                }
                if (values.some((v) => !v)) {
                    return null;
                }
            }
            values.push(value);
        }
        if (values.length === 2 && values[0] !== null && values[1] !== null) {
            if (path[0].includes("period")) {
                return values.join(" - ");
            }
            if (path[0].includes("kyc")) {
                let findStep = () => {
                    //@ts-ignore
                    for (let mainStep of mainSteps) {
                        //@ts-ignore
                        let step = mainStep.steps.find(
                        //@ts-ignore
                        (step) => JSON.stringify(step.mapTo) === JSON.stringify(path));
                        if (step)
                            return step;
                    }
                    return null;
                };
                return (
                //@ts-ignore
                ((_e = (_d = (_c = findStep()) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.find((o) => { var _a, _b; return (o === null || o === void 0 ? void 0 : o.value) === ((_a = values[0]) === null || _a === void 0 ? void 0 : _a.toString()) + "|" + ((_b = values[1]) === null || _b === void 0 ? void 0 : _b.toString()); })) === null || _e === void 0 ? void 0 : _e.text) || null);
            }
        }
        return null;
    }
    let result = (_f = path === null || path === void 0 ? void 0 : path.split(".")) === null || _f === void 0 ? void 0 : _f.reduce((o, i) => o[i], obj);
    if (!result && result !== false) {
        //@ts-ignore
        result = null;
    }
    if (path === "payment.chains") {
        let chains = {};
        let networkNames = {};
        if (!((_g = obj === null || obj === void 0 ? void 0 : obj.payment) === null || _g === void 0 ? void 0 : _g.chains)) {
            return null;
        }
        //@ts-ignore
        obj.payment.chains.forEach((item) => {
            if (!chains[item.chainId]) {
                chains[item.chainId] = [];
            }
            item.tokens.forEach((token) => {
                chains[item.chainId].push({ address: token.address, name: token.name });
            });
        });
        let blockchainsSelectStep = mainSteps
            .flatMap((mainStep) => mainStep.steps)
            .find((step) => step.mapTo === "payment.chains");
        blockchainsSelectStep.options.forEach((option) => {
            let parts = option.value.split("|");
            let chainId = parseInt(parts[0]);
            let address = parts[1];
            let networkName = parts[2];
            let tokenName = parts[3];
            networkNames[chainId] = networkName;
            if (chains[chainId]) {
                let tokenIndex = chains[chainId].findIndex((token) => token.address === address);
                if (tokenIndex !== -1) {
                    chains[chainId][tokenIndex].name = "✅ " + tokenName;
                }
            }
        });
        let stringResult = "";
        for (let chainId in chains) {
            stringResult += `\n${networkNames[chainId]}:\n`; // Use networkNames here
            chains[chainId].forEach((token) => {
                stringResult += ` ${token.name}\n`;
            });
        }
        return stringResult.trim();
    }
    if (path === "kyc.contactInfos") {
        if (result === null)
            return null;
        return result.map((item) => `✅ ${item.label}`).join("\n");
    }
    return result;
};
exports.readObject = readObject;
const deleteKey = (obj, path) => {
    let keys = path.split(".");
    let lastKeyIndex = keys.length - 1;
    let parentObj = obj;
    for (let i = 0; i <= lastKeyIndex; i++) {
        if (i === lastKeyIndex) {
            delete parentObj[keys[i]];
        }
        else {
            parentObj = parentObj[keys[i]];
        }
    }
};
exports.deleteKey = deleteKey;
const nullifyKey = (obj, path) => {
    let keys = path.split(".");
    let lastKeyIndex = keys.length - 1;
    let parentObj = obj;
    for (let i = 0; i <= lastKeyIndex; i++) {
        if (i === lastKeyIndex) {
            parentObj[keys[i]] = null;
        }
        else {
            parentObj = parentObj[keys[i]];
        }
    }
};
exports.nullifyKey = nullifyKey;
const getCurrentValue = (step, value) => {
    var _a;
    if (value === null) {
        return null;
    }
    switch (step.type) {
        case "select":
            return (_a = step.options.find((o) => value == o.value)) === null || _a === void 0 ? void 0 : _a.text;
        case "input":
            return value;
        case "boolean":
            //@ts-ignore
            return value === true ? "Yes" : "No";
        default:
            return value;
    }
};
exports.getCurrentValue = getCurrentValue;
const saveLaunchpadLaunchToDB = (launchpadLaunch, userId, userType, UserDb) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield UserDb.getOrCreateUser(userId, userType);
    yield UserDb.updateUser(user.userId, user.type, Object.assign(Object.assign({}, user), { launchpadLaunch }));
});
exports.saveLaunchpadLaunchToDB = saveLaunchpadLaunchToDB;
const getSummary = (mainSteps, type, obj, skipping) => {
    let summaryText = "";
    let originalMainSteps = JSON.parse(JSON.stringify(mainSteps));
    let usedMainSteps = [];
    for (let mainStep of originalMainSteps) {
        let thisMainStep = Object.assign(Object.assign({}, mainStep), { steps: [] });
        for (let step of mainStep.steps) {
            if (!skipping.find((s) => step.step === s.stepId)) {
                if (step.step !== 'DONESTEP') {
                    thisMainStep.steps.push(step);
                }
            }
        }
        usedMainSteps.push(thisMainStep);
    }
    let i = 0;
    usedMainSteps = usedMainSteps.map((mainStep) => {
        i++;
        return {
            title: `Step ${(0, exports.getEmojiNum)(i)}: ${mainStep.mainStep}`,
            steps: mainStep.steps.map((step) => {
                let currentValue = (0, exports.getCurrentValue)(
                //@ts-ignore
                step, 
                //@ts-ignore
                (0, exports.readObject)(obj, step.mapTo));
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
                return {
                    title: step.title,
                    valueLabel: currentValueLabel,
                    value: currentValue,
                };
            }),
        };
    });
    for (let mainStep of usedMainSteps) {
        summaryText += `\n\n<u>${mainStep.title}</u>\n\n`;
        for (let step of mainStep.steps) {
            summaryText += `<u>${step.title}</u>\n${step.valueLabel}\n\n<b>${step.value}</b>\n\n`;
        }
    }
    if (type === "telegram") {
        return summaryText;
    }
    else if (type === "discord") {
        return summaryText
            .replace(/<b>/g, "")
            .replace(/<\/b>/g, "")
            .replace(/<u>/g, "")
            .replace(/<\/u>/g, "");
    }
};
exports.getSummary = getSummary;
const splitInput = (input) => {
    let chunks = [];
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
        }
        else {
            // Otherwise, split at the "\" character
            chunks.push(input.substring(start, lastBackslash));
            start = lastBackslash + 1;
        }
        // Move to the next chunk
        end = Math.min(end + 1999, input.length);
    }
    return chunks;
};
exports.splitInput = splitInput;
