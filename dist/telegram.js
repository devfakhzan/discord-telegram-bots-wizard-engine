"use strict";
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
const launchpadProjectsLaunch_1 = require("./launchpadProjectsLaunch");
const dayjs_1 = __importDefault(require("dayjs"));
const customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
dayjs_1.default.extend(customParseFormat_1.default);
const producer = (mainSteps) => {
    const fns = [];
    for (let [msi, mainStep] of mainSteps.entries()) {
        //@ts-ignore
        for (let [si, step] of mainStep.steps.entries()) {
            let fn = (ctx, TelegramClient, UserDb, targetObject) => __awaiter(void 0, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
                //Deep clone targetObject to use at the start
                if (msi === 0 && si === 0 && !ctx.scene.state.targetObject) {
                    ctx.scene.state.targetObject = JSON.parse(JSON.stringify(targetObject));
                    ctx.scene.state.userId = ((_c = (_b = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.update) === null || _a === void 0 ? void 0 : _a.callback_query) === null || _b === void 0 ? void 0 : _b.from) === null || _c === void 0 ? void 0 : _c.id) || ((_d = ctx === null || ctx === void 0 ? void 0 : ctx.message) === null || _d === void 0 ? void 0 : _d.from.id);
                    ctx.session.skipping = [];
                }
                if (msi === 0 &&
                    si === 0 &&
                    !ctx.scene.state.targetObjectRaw) {
                    ctx.scene.state.targetObjectRaw = JSON.parse(JSON.stringify(targetObject));
                }
                if (yield TelegramClient.exitWizardAndGoToButtonActionOrCommand(ctx)) {
                    return;
                }
                let prev = (0, launchpadProjectsLaunch_1.getPreviousStep)(mainSteps, msi, si);
                let current = (_f = (_e = mainSteps === null || mainSteps === void 0 ? void 0 : mainSteps[msi]) === null || _e === void 0 ? void 0 : _e.steps) === null || _f === void 0 ? void 0 : _f[si];
                let next = (0, launchpadProjectsLaunch_1.getNextStep)(mainSteps, msi, si);
                const callbackData = 
                //@ts-ignore
                //@ts-ignore
                ((_h = (_g = mainSteps === null || mainSteps === void 0 ? void 0 : mainSteps[prev === null || prev === void 0 ? void 0 : prev.previousMainStep]) === null || _g === void 0 ? void 0 : _g.steps[prev === null || prev === void 0 ? void 0 : prev.previousStep]) === null || _h === void 0 ? void 0 : _h.type) === "input" ||
                    //@ts-ignore
                    ((_k = (_j = mainSteps === null || mainSteps === void 0 ? void 0 : mainSteps[prev === null || prev === void 0 ? void 0 : prev.previousMainStep]) === null || _j === void 0 ? void 0 : _j.steps[prev === null || prev === void 0 ? void 0 : prev.previousStep]) === null || _k === void 0 ? void 0 : _k.type) === "multiSelect"
                    ? (_l = ctx === null || ctx === void 0 ? void 0 : ctx.message) === null || _l === void 0 ? void 0 : _l.text
                    : (_o = (_m = ctx.update) === null || _m === void 0 ? void 0 : _m.callback_query) === null || _o === void 0 ? void 0 : _o.data;
                //@ts-ignore
                if (
                //@ts-ignore
                (((_q = (_p = mainSteps === null || mainSteps === void 0 ? void 0 : mainSteps[prev === null || prev === void 0 ? void 0 : prev.previousMainStep]) === null || _p === void 0 ? void 0 : _p.steps[prev === null || prev === void 0 ? void 0 : prev.previousStep]) === null || _q === void 0 ? void 0 : _q.type) === "select" ||
                    //@ts-ignore
                    ((_s = (_r = mainSteps === null || mainSteps === void 0 ? void 0 : mainSteps[prev === null || prev === void 0 ? void 0 : prev.previousMainStep]) === null || _r === void 0 ? void 0 : _r.steps[prev === null || prev === void 0 ? void 0 : prev.previousStep]) === null || _s === void 0 ? void 0 : _s.type) === "check" ||
                    //@ts-ignore
                    ((_u = (_t = mainSteps === null || mainSteps === void 0 ? void 0 : mainSteps[prev === null || prev === void 0 ? void 0 : prev.previousMainStep]) === null || _t === void 0 ? void 0 : _t.steps[prev === null || prev === void 0 ? void 0 : prev.previousStep]) === null || _u === void 0 ? void 0 : _u.type) === "selectTwo") &&
                    ((_v = ctx === null || ctx === void 0 ? void 0 : ctx.message) === null || _v === void 0 ? void 0 : _v.text) &&
                    !((_w = ctx.session.skipping) === null || _w === void 0 ? void 0 : _w.find((s) => 
                    //@ts-ignore
                    s.mainStep === (prev === null || prev === void 0 ? void 0 : prev.previousMainStep) &&
                        //@ts-ignore
                        s.step === (prev === null || prev === void 0 ? void 0 : prev.previousStep)))) {
                    //ctx.wizard.cursor--;
                    //ctx.wizard.steps[ctx.wizard.cursor](ctx);
                    yield ctx.reply("Invalid input. Please try again.");
                    return;
                }
                if (((_y = (_x = ctx.update) === null || _x === void 0 ? void 0 : _x.callback_query) === null || _y === void 0 ? void 0 : _y.data) === launchpadProjectsLaunch_1.universalBack //&&
                // !(
                //   //prettier-ignore
                //   //@ts-ignore
                //   next?.nextMainStep === undefined && next.nextStep === undefined
                // )
                ) {
                    ctx.update.callback_query.data = null;
                    ctx.wizard.cursor--;
                    ctx.wizard.cursor--;
                    return ctx.wizard.steps[ctx.wizard.cursor](ctx);
                }
                //Callback data validation
                const previousStepObject = 
                //@ts-ignore
                (_0 = (_z = mainSteps === null || mainSteps === void 0 ? void 0 : mainSteps[prev === null || prev === void 0 ? void 0 : prev.previousMainStep]) === null || _z === void 0 ? void 0 : _z.steps) === null || _0 === void 0 ? void 0 : _0[prev === null || prev === void 0 ? void 0 : prev.previousStep];
                if (prev &&
                    //@ts-ignore
                    !((_1 = ctx.session.skipping) === null || _1 === void 0 ? void 0 : _1.find((s) => 
                    //@ts-ignore
                    s.mainStep === (prev === null || prev === void 0 ? void 0 : prev.previousMainStep) &&
                        //@ts-ignore
                        s.step === (prev === null || prev === void 0 ? void 0 : prev.previousStep))) &&
                    (
                    //@ts-ignore
                    previousStepObject === null || previousStepObject === void 0 ? void 0 : previousStepObject.validation) &&
                    callbackData !== undefined) {
                    if (
                    //@ts-ignore
                    !(previousStepObject === null || previousStepObject === void 0 ? void 0 : previousStepObject.validation(callbackData))) {
                        ((_2 = ctx === null || ctx === void 0 ? void 0 : ctx.message) === null || _2 === void 0 ? void 0 : _2.text) ? (ctx.message.text = undefined) : null;
                        ((_4 = (_3 = ctx === null || ctx === void 0 ? void 0 : ctx.update) === null || _3 === void 0 ? void 0 : _3.callback_query) === null || _4 === void 0 ? void 0 : _4.data)
                            ? (ctx.update.callback_query.data = undefined)
                            : null;
                        yield ctx.reply("Invalid input. Please try again.");
                        return;
                    }
                }
                //Callback data processor
                if (previousStepObject &&
                    !((_5 = ctx.session.skipping) === null || _5 === void 0 ? void 0 : _5.find((s) => 
                    //@ts-ignore
                    s.mainStep === (prev === null || prev === void 0 ? void 0 : prev.previousMainStep) &&
                        //@ts-ignore
                        s.step === (prev === null || prev === void 0 ? void 0 : prev.previousStep)))) {
                    //prettier-ignore
                    //@ts-ignore
                    let mapTos = typeof previousStepObject.mapTo === 'string' ? previousStepObject.mapTo : JSON.parse(JSON.stringify(previousStepObject.mapTo));
                    //@ts-ignore
                    let result = (0, launchpadProjectsLaunch_1.writeToObject)(ctx.scene.state.targetObject, ctx.scene.state.targetObject, previousStepObject, mapTos, callbackData);
                    if (result === false) {
                        yield ctx.reply("Invalid input. Please try again.");
                        return;
                    }
                    //write to raw object
                    // writeToObject(
                    //   ctx.scene.state.targetObjectRaw,
                    //   previousStepObject,
                    //   mapTos,
                    //   callbackData,
                    //   true
                    // );
                }
                //@ts-ignore
                if (current.dependsOn) {
                    //@ts-ignore
                    const { dependsOn, step: stepId } = current;
                    const currentPosition = {
                        mainStep: msi,
                        step: si,
                        stepId
                    };
                    if (dependsOn.condition === "oneOf") {
                        if (!dependsOn.value.includes((0, launchpadProjectsLaunch_1.readObject)(ctx.scene.state.targetObject, dependsOn.key, mainSteps))) {
                            if (!ctx.session.skipping.find((s) => s.mainStep === msi && s.step === si)) {
                                ctx.session.skipping.push(currentPosition);
                            }
                            switch ((_7 = (_6 = ctx.update) === null || _6 === void 0 ? void 0 : _6.callback_query) === null || _7 === void 0 ? void 0 : _7.data) {
                                case launchpadProjectsLaunch_1.universalBack: {
                                    //ctx.wizard.cursor--;
                                    ctx.wizard.cursor--;
                                    ctx.wizard.steps[ctx.wizard.cursor](ctx);
                                    //ctx.update.callback_query.data = null;
                                    return;
                                }
                                case null: {
                                    ctx.wizard.cursor--;
                                    ctx.wizard.steps[ctx.wizard.cursor](ctx);
                                    //ctx.update.callback_query.data = null;
                                    return;
                                }
                            }
                            if ((dependsOn === null || dependsOn === void 0 ? void 0 : dependsOn.onSkip) === "deleteMapTo") {
                                console.log(ctx.scene.state.targetObject, "DELETING", current.mapTo);
                                (0, launchpadProjectsLaunch_1.deleteKey)(ctx.scene.state.targetObject, current.mapTo);
                            }
                            else {
                                console.log(ctx.scene.state.targetObject, 'NULLIFIED', current.mapTo);
                                (0, launchpadProjectsLaunch_1.nullifyKey)(//@ts-ignore
                                ctx.scene.state.targetObject, current.mapTo);
                            }
                            ctx.wizard.cursor++;
                            ctx.wizard.steps[ctx.wizard.cursor](ctx);
                            return;
                        }
                        else {
                            ctx.session.skipping = ctx.session.skipping.filter((s) => !(s.mainStep === msi && s.step === si));
                        }
                    }
                    else if (dependsOn.condition === "equals") {
                        let dependsOnValue = (0, launchpadProjectsLaunch_1.readObject)(ctx.scene.state.targetObject, dependsOn.key, mainSteps);
                        switch (dependsOn.type) {
                            case "boolean":
                                //@ts-ignore
                                dependsOnValue =
                                    (0, launchpadProjectsLaunch_1.readObject)(ctx.scene.state.targetObject, dependsOn.key, mainSteps) === true;
                                break;
                            case "number":
                                //@ts-ignore
                                dependsOnValue = Number((0, launchpadProjectsLaunch_1.readObject)(ctx.scene.state.targetObject, dependsOn.key, mainSteps));
                                break;
                        }
                        if (dependsOn.value !== dependsOnValue) {
                            if (!ctx.session.skipping.find((s) => s.mainStep === msi && s.step === si)) {
                                ctx.session.skipping.push(currentPosition);
                            }
                            switch ((_9 = (_8 = ctx.update) === null || _8 === void 0 ? void 0 : _8.callback_query) === null || _9 === void 0 ? void 0 : _9.data) {
                                case launchpadProjectsLaunch_1.universalBack: {
                                    //ctx.wizard.cursor--;
                                    ctx.wizard.cursor--;
                                    ctx.wizard.steps[ctx.wizard.cursor](ctx);
                                    //ctx.update.callback_query.data = null;
                                    return;
                                }
                                case null: {
                                    ctx.wizard.cursor--;
                                    ctx.wizard.steps[ctx.wizard.cursor](ctx);
                                    //ctx.update.callback_query.data = null;
                                    return;
                                }
                            }
                            if ((dependsOn === null || dependsOn === void 0 ? void 0 : dependsOn.onSkip) === "deleteMapTo") {
                                console.log(ctx.scene.state.targetObject, "DELETING", current.mapTo);
                                (0, launchpadProjectsLaunch_1.deleteKey)(ctx.scene.state.targetObject, current.mapTo);
                            }
                            else {
                                console.log(ctx.scene.state.targetObject, 'NULLIFIED', current.mapTo);
                                (0, launchpadProjectsLaunch_1.nullifyKey)(//@ts-ignore
                                ctx.scene.state.targetObject, current.mapTo);
                            }
                            ctx.wizard.cursor++;
                            ctx.wizard.steps[ctx.wizard.cursor](ctx);
                            return;
                        }
                        else {
                            ctx.session.skipping = ctx.session.skipping.filter((s) => !(s.mainStep === msi && s.step === si));
                        }
                    }
                    else if (dependsOn.condition === "eitherTrue") {
                        let dependsOnValue1 = (0, launchpadProjectsLaunch_1.readObject)(ctx.scene.state.targetObject, dependsOn.key[0], mainSteps);
                        let dependsOnValue2 = (0, launchpadProjectsLaunch_1.readObject)(ctx.scene.state.targetObject, dependsOn.key[1], mainSteps);
                        if (!(dependsOnValue1 === dependsOn.value ||
                            dependsOnValue2 === dependsOn.value)) {
                            if (!ctx.session.skipping.find((s) => s.mainStep === msi && s.step === si)) {
                                ctx.session.skipping.push(currentPosition);
                            }
                            switch ((_11 = (_10 = ctx.update) === null || _10 === void 0 ? void 0 : _10.callback_query) === null || _11 === void 0 ? void 0 : _11.data) {
                                case launchpadProjectsLaunch_1.universalBack: {
                                    //ctx.wizard.cursor--;
                                    ctx.wizard.cursor--;
                                    ctx.wizard.steps[ctx.wizard.cursor](ctx);
                                    //ctx.update.callback_query.data = null;
                                    return;
                                }
                                case null: {
                                    ctx.wizard.cursor--;
                                    ctx.wizard.steps[ctx.wizard.cursor](ctx);
                                    //ctx.update.callback_query.data = null;
                                    return;
                                }
                            }
                            if ((dependsOn === null || dependsOn === void 0 ? void 0 : dependsOn.onSkip) === "deleteMapTo") {
                                console.log(ctx.scene.state.targetObject, "DELETING", current.mapTo);
                                (0, launchpadProjectsLaunch_1.deleteKey)(ctx.scene.state.targetObject, current.mapTo);
                            }
                            else {
                                console.log(ctx.scene.state.targetObject, 'NULLIFIED', current.mapTo);
                                (0, launchpadProjectsLaunch_1.nullifyKey)(//@ts-ignore
                                ctx.scene.state.targetObject, current.mapTo);
                            }
                            ctx.wizard.cursor++;
                            ctx.wizard.steps[ctx.wizard.cursor](ctx);
                            return;
                        }
                        else {
                            ctx.session.skipping = ctx.session.skipping.filter((s) => !(s.mainStep === msi && s.step === si));
                        }
                    }
                }
                //body
                let currentValue = (0, launchpadProjectsLaunch_1.getCurrentValue)(step, 
                //@ts-ignore
                (0, launchpadProjectsLaunch_1.readObject)(ctx.scene.state.targetObject, step.mapTo));
                if (current.valueType === "boolean" && currentValue !== null) {
                    currentValue = currentValue === true ? "Yes" : "No";
                }
                const exampleDateRange = `${(0, dayjs_1.default)().format("D/M/YYYY")} - ${(0, dayjs_1.default)()
                    .add(7, "day")
                    .format("D/M/YYYY")}`;
                const dateRangeInfo = `${step.valueType === "dateRange"
                    ? "\n\n<i>Please enter a valid date range <b>starting today (" +
                        (0, dayjs_1.default)().format("D/M/YYYY") +
                        ")" +
                        "</b> with the following format:\n\n<b>Day/Month/Year - Day/Month/Year</b>\n\nFor example:\n<b>" +
                        exampleDateRange +
                        "</b></i>"
                    : ""}`;
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
                                coinName,
                            };
                        });
                        let final = {};
                        for (let opt of optsArr) {
                            final[opt.chainName] = final[opt.chainName]
                                ? final[opt.chainName]
                                : [];
                            final[opt.chainName].push(opt.coinName);
                        }
                        let count = 1;
                        let result = "";
                        for (let key of Object.keys(final)) {
                            result += `\n${key}:\n`;
                            for (let item of final[key]) {
                                result += `${count}. ${item}\n`;
                                count++;
                            }
                        }
                        multiSelectMenu =
                            `\n\n` +
                                result.trim() +
                                "\n\n<i>Enter a comma seperated number(s) for the blockchain(s) you want to use. For example:\n1,3,5</i>";
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
  <u>${step.title}</u>${dateRangeInfo}${multiSelectMenu}
          
  ${currentValue ? currentValueLabel : ""}
  ${currentValue ? "<b>" + currentValue + "</b>" : ""}`;
                const summary = `Done!`;
                const body = `<b>Step ${(0, launchpadProjectsLaunch_1.getEmojiNum)(msi + 1)} of ${(0, launchpadProjectsLaunch_1.getEmojiNum)(mainSteps.length)}: ${step.step !== "DONESTEP" ? mainStep.mainStep : "Summary"}</b>
                
  ${step.step !== "DONESTEP" ? (0, launchpadProjectsLaunch_1.getProgressBar)(msi + 1) : (0, launchpadProjectsLaunch_1.getProgressBar)(msi + 2)}
                
  ${step.step !== "DONESTEP" ? regular : summary}`;
                const baseKeyboard = [];
                if ((msi === 0 && si > 0) || msi > 0) {
                    baseKeyboard.push({
                        text: "Back",
                        callback_data: launchpadProjectsLaunch_1.universalBack,
                    });
                }
                const finalKeyboard = [baseKeyboard];
                if (step.type === "select" ||
                    step.type === "selectTwo" ||
                    step.type === "eitherTrue") {
                    if (step.options) {
                        finalKeyboard.unshift(...step.options.map((o) => [
                            {
                                text: `${o === null || o === void 0 ? void 0 : o.text}`,
                                callback_data: o.value,
                            },
                        ]));
                    }
                }
                if (step.type === "check") {
                    finalKeyboard.unshift([
                        {
                            text: "Yes",
                            callback_data: "true",
                        },
                        {
                            text: "No",
                            callback_data: "false",
                        },
                    ]);
                }
                const cv = (0, launchpadProjectsLaunch_1.getCurrentValue)(step, 
                //@ts-ignore
                (0, launchpadProjectsLaunch_1.readObject)(ctx.scene.state.targetObject, step.mapTo));
                if (cv !== null &&
                    (typeof cv === "string" ||
                        typeof cv === "number" ||
                        typeof cv === "boolean")) {
                    finalKeyboard.push([
                        {
                            text: "Continue with current value",
                            callback_data: (0, launchpadProjectsLaunch_1.readObject)(ctx.scene.state.targetObject, step.mapTo, mainSteps) + "",
                        },
                    ]);
                }
                yield ctx.replyWithHTML(body, {
                    reply_markup: {
                        inline_keyboard: finalKeyboard,
                    },
                });
                if (!(msi === mainSteps.length - 1 &&
                    si === mainSteps[msi].steps.length - 1)) {
                    ctx.wizard.next();
                    yield (0, launchpadProjectsLaunch_1.saveLaunchpadLaunchToDB)(ctx.scene.state.targetObject, ctx.scene.state.userId, "telegram", UserDb);
                }
                else {
                    console.log("NO MORE NEXT");
                }
            });
            fns.push(fn);
        }
    }
    return fns;
};
exports.default = producer;
