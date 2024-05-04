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
const discord_js_1 = require("discord.js");
dayjs_1.default.extend(customParseFormat_1.default);
const producer = (UserDb, targetObject, mainSteps) => {
    var _a, _b, _c, _d, _e, _f, _g;
    let handlers = [];
    for (let [msi, mainStep] of mainSteps.entries()) {
        for (let [si, step] of mainStep.steps.entries()) {
            let prev = (0, launchpadProjectsLaunch_1.getPreviousStep)(mainSteps, msi, si);
            let current = (_b = (_a = mainSteps === null || mainSteps === void 0 ? void 0 : mainSteps[msi]) === null || _a === void 0 ? void 0 : _a.steps) === null || _b === void 0 ? void 0 : _b[si];
            let next = (0, launchpadProjectsLaunch_1.getNextStep)(mainSteps, msi, si);
            let backId = 
            //@ts-ignore
            (_e = (_d = (_c = mainSteps === null || mainSteps === void 0 ? void 0 : mainSteps[prev === null || prev === void 0 ? void 0 : prev.previousMainStep]) === null || _c === void 0 ? void 0 : _c.steps) === null || _d === void 0 ? void 0 : _d[prev === null || prev === void 0 ? void 0 : prev.previousStep]) === null || _e === void 0 ? void 0 : _e.step;
            const currentStepObject = 
            //@ts-ignore
            (_g = (_f = mainSteps === null || mainSteps === void 0 ? void 0 : mainSteps[msi]) === null || _f === void 0 ? void 0 : _f.steps) === null || _g === void 0 ? void 0 : _g[si];
            handlers.push({
                name: step.step,
                description: step.title,
                run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
                    //@ts-ignore
                    if (msi === 0 && si === 0 && !client[interaction.user.id]) {
                        //@ts-ignore
                        client[interaction.user.id] = {};
                        //@ts-ignore
                        client[interaction.user.id].launchpadObject = JSON.parse(JSON.stringify(targetObject));
                        //@ts-ignore
                        client[interaction.user.id].stepsLog = [];
                        //@ts-ignore
                        client[interaction.user.id].skipping = [];
                    }
                    //@ts-ignore
                    const latestStepsLogEntry = {
                        mainStep: msi,
                        step: si,
                    };
                    //@ts-ignore
                    client[interaction.user.id].stepsLog.push(latestStepsLogEntry);
                    let components = [];
                    let component;
                    switch (step.type) {
                        case "input": {
                            let inputPlaceholder = step.title;
                            if (step.valueType === "dateRange") {
                                inputPlaceholder = `${(0, dayjs_1.default)().format("D/M/YYYY")} - ${(0, dayjs_1.default)()
                                    .add(7, "day")
                                    .format("D/M/YYYY")}`;
                            }
                            if (step.step === "tokenAddress") {
                                inputPlaceholder = `0xf467F6d7e5E8dAC1309C30Ea661291c86Ead7462`;
                            }
                            component = new discord_js_1.TextInputBuilder()
                                .setLabel(step.title)
                                .setCustomId(step.step + " Summary")
                                .setPlaceholder(inputPlaceholder)
                                .setStyle(discord_js_1.TextInputStyle.Short);
                            break;
                        }
                        case "select":
                        case "eitherTrue":
                        case "selectTwo": {
                            //@ts-ignore
                            const options = step.options.map((o) => new discord_js_1.StringSelectMenuOptionBuilder()
                                .setLabel(o.text)
                                .setValue(o.value));
                            component = new discord_js_1.StringSelectMenuBuilder()
                                .setCustomId(step.step + " Summary")
                                .setPlaceholder(step.title)
                                .addOptions(...options);
                            break;
                        }
                        case "multiSelect": {
                            //@ts-ignore
                            const options = step.options.map((o) => new discord_js_1.StringSelectMenuOptionBuilder()
                                .setLabel(o.text)
                                .setValue(o.value));
                            component = new discord_js_1.StringSelectMenuBuilder()
                                .setCustomId(step.step + " Summary")
                                .setPlaceholder(step.title)
                                .addOptions(...options)
                                .setMinValues(1)
                                .setMaxValues(options.length);
                            break;
                        }
                        case "check": {
                            component = new discord_js_1.StringSelectMenuBuilder()
                                .setCustomId(step.step + " Summary")
                                .setPlaceholder(step.title)
                                .addOptions(new discord_js_1.StringSelectMenuOptionBuilder()
                                .setLabel("Yes")
                                .setValue("true"), new discord_js_1.StringSelectMenuOptionBuilder()
                                .setLabel("No")
                                .setValue("false"));
                            break;
                        }
                    }
                    //@ts-ignore
                    components.push(new discord_js_1.ActionRowBuilder().addComponents(component));
                    const trimString = (input) => {
                        const maxLength = 45;
                        const ending = "...";
                        if (input.length > maxLength) {
                            return input.substring(0, maxLength - ending.length) + ending;
                        }
                        else {
                            return input;
                        }
                    };
                    if (step.type === "input") {
                        const modal = new discord_js_1.ModalBuilder()
                            .setTitle(trimString(`${mainStep.mainStep} - ${step.title}`))
                            .setCustomId(step.step + " Summary");
                        modal.setComponents(components);
                        yield interaction.showModal(modal);
                        return;
                    }
                    else {
                        yield (interaction === null || interaction === void 0 ? void 0 : interaction.reply({
                            ephemeral: true,
                            components,
                        }));
                        return;
                    }
                }),
            });
            handlers.push({
                name: step.step + " Summary",
                description: step.step + " Summary",
                run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
                    var _h, _j, _k, _l, _m, _o, _p, _q, _r;
                    let user = yield UserDb.getOrCreateUser(interaction.user.id, "discord");
                    let selection = false;
                    if (((_h = interaction === null || interaction === void 0 ? void 0 : interaction.values) === null || _h === void 0 ? void 0 : _h.length) === 1) {
                        selection = (_j = interaction === null || interaction === void 0 ? void 0 : interaction.values) === null || _j === void 0 ? void 0 : _j[0];
                    }
                    else if (((_k = interaction === null || interaction === void 0 ? void 0 : interaction.values) === null || _k === void 0 ? void 0 : _k.length) > 1) {
                        selection = interaction.values;
                    }
                    let callbackData = selection ||
                        ((_m = (_l = interaction.fields) === null || _l === void 0 ? void 0 : _l.getTextInputValue) === null || _m === void 0 ? void 0 : _m.call(_l, (step === null || step === void 0 ? void 0 : step.step) + " Summary"));
                    if (step.valueType === "blockchainsSelect") {
                        if (!Array.isArray(callbackData)) {
                            callbackData = [callbackData];
                        }
                        let selections = [];
                        for (let s of callbackData) {
                            //@ts-ignore
                            let i = step.options.findIndex((o) => o.value === s);
                            selections.push(i + 1);
                        }
                        callbackData = selections.join(",");
                    }
                    const retryButton = new discord_js_1.ButtonBuilder()
                        .setCustomId(
                    //@ts-ignore
                    mainSteps[msi].steps[si].step)
                        .setLabel("Retry")
                        .setStyle(discord_js_1.ButtonStyle.Primary);
                    if (
                    //@ts-ignore
                    (currentStepObject === null || currentStepObject === void 0 ? void 0 : currentStepObject.validation) &&
                        callbackData &&
                        //@ts-ignore
                        !((_o = currentStepObject === null || currentStepObject === void 0 ? void 0 : currentStepObject.validation) === null || _o === void 0 ? void 0 : _o.call(currentStepObject, callbackData))) {
                        yield interaction.reply({
                            content: "Error. " + currentStepObject.validationError,
                            ephemeral: true,
                            components: [new discord_js_1.ActionRowBuilder().addComponents(retryButton)],
                        });
                        return;
                    }
                    let mapTos = typeof currentStepObject.mapTo === "string"
                        ? currentStepObject.mapTo
                        : JSON.parse(JSON.stringify(currentStepObject.mapTo));
                    let result = (0, launchpadProjectsLaunch_1.writeToObject)(
                    //@ts-ignore
                    client[interaction.user.id].launchpadObject, 
                    //@ts-ignore
                    client[interaction.user.id].launchpadObject, currentStepObject, mapTos, callbackData);
                    if (result === false) {
                        let errorMsg = "Invalid input. ";
                        let specificErrorMesage = "";
                        if (currentStepObject.valueType === "number") {
                            specificErrorMesage = "Please enter a valid number.";
                        }
                        errorMsg = errorMsg + specificErrorMesage;
                        if (step.valueType === "dateRange") {
                            const exampleDateRange = `${(0, dayjs_1.default)().format("D/M/YYYY")} - ${(0, dayjs_1.default)().add(7, "day").format("D/M/YYYY")}`;
                            errorMsg =
                                "Invalid input.\n\n*Please enter a valid date range **starting today (" +
                                    (0, dayjs_1.default)().format("D/M/YYYY") +
                                    ")" +
                                    "** with the following format:\n\n**Day/Month/Year - Day/Month/Year**\n\nFor example:\n**" +
                                    exampleDateRange +
                                    "***";
                        }
                        yield interaction.reply({
                            content: errorMsg,
                            ephemeral: true,
                            components: [new discord_js_1.ActionRowBuilder().addComponents(retryButton)],
                        });
                        return;
                    }
                    //@ts-ignore
                    user = yield UserDb.updateUser(interaction.user.id, "discord", Object.assign(Object.assign({}, user), { 
                        //@ts-ignore
                        launchpadLaunch: client[interaction.user.id].launchpadObject }));
                    const changeValueBtn = new discord_js_1.ButtonBuilder()
                        .setCustomId(
                    //@ts-ignore
                    mainSteps[msi].steps[si].step)
                        .setLabel("Change value")
                        .setStyle(discord_js_1.ButtonStyle.Primary);
                    let continueId = "LAUNCHPAD FINISHED";
                    if (next) {
                        const lastMainStep = mainSteps.length - 1;
                        const lastStep = mainSteps[lastMainStep].steps.length - 1;
                        continueId =
                            //@ts-ignore
                            next.nextMainStep === lastMainStep && next.nextStep === lastStep
                                ? //@ts-ignore
                                    mainSteps[next.nextMainStep].steps[next.nextStep].step +
                                        " Summary"
                                : //@ts-ignore
                                    mainSteps[next.nextMainStep].steps[next.nextStep].step;
                    }
                    const dependsOnChecker = (next) => {
                        var _a, _b, _c;
                        if (next &&
                            (
                            //@ts-ignore
                            (_c = (_b = (_a = mainSteps === null || mainSteps === void 0 ? void 0 : mainSteps[next.nextMainStep]) === null || _a === void 0 ? void 0 : _a.steps) === null || _b === void 0 ? void 0 : _b[next.nextStep]) === null || _c === void 0 ? void 0 : _c.dependsOn)) {
                            //@ts-ignore
                            const { dependsOn, step: stepId, mapTo: skipMapTo } = 
                            //@ts-ignore
                            mainSteps[next.nextMainStep].steps[next.nextStep];
                            const skippingPosition = {
                                //@ts-ignore
                                mainStep: next.nextMainStep,
                                //@ts-ignore
                                step: next.nextStep,
                                stepId,
                            };
                            if (dependsOn.condition === "oneOf") {
                                if (!dependsOn.value.includes((0, launchpadProjectsLaunch_1.readObject)(
                                //@ts-ignore
                                client[interaction.user.id].launchpadObject, dependsOn.key, mainSteps))) {
                                    if (
                                    //@ts-ignore
                                    !client[interaction.user.id].skipping.find((s) => s.mainStep === msi && s.step === si)) {
                                        //@ts-ignore
                                        client[interaction.user.id].skipping.push(skippingPosition);
                                    }
                                    //@ts-ignore
                                    const nextNext = (0, launchpadProjectsLaunch_1.getNextStep)(mainSteps, 
                                    //@ts-ignore
                                    next.nextMainStep, 
                                    //@ts-ignore
                                    next.nextStep);
                                    if (nextNext) {
                                        //@ts-ignore
                                        continueId =
                                            mainSteps[nextNext.nextMainStep].steps[nextNext.nextStep]
                                                .step;
                                    }
                                    if ((dependsOn === null || dependsOn === void 0 ? void 0 : dependsOn.onSkip) === "deleteMapTo") {
                                        (0, launchpadProjectsLaunch_1.deleteKey)(
                                        //@ts-ignore
                                        client[interaction.user.id].launchpadObject, skipMapTo);
                                    }
                                    else {
                                        (0, launchpadProjectsLaunch_1.nullifyKey)(
                                        //@ts-ignore
                                        client[interaction.user.id].launchpadObject, skipMapTo);
                                    }
                                }
                                else {
                                    //prettier-ignore
                                    //@ts-ignore
                                    client[interaction.user.id].skipping =
                                        //@ts-ignore
                                        //prettier-ignore
                                        client[interaction.user.id].skipping.filter((s) => !(s.mainStep === next.nextMainStep && s.step === next.nextStep));
                                }
                            }
                            else if (dependsOn.condition === "equals") {
                                let dependsOnValue = (0, launchpadProjectsLaunch_1.readObject)(
                                //@ts-ignore
                                client[interaction.user.id].launchpadObject, dependsOn.key, mainSteps);
                                switch (dependsOn.type) {
                                    case "boolean":
                                        //@ts-ignore
                                        dependsOnValue =
                                            (0, launchpadProjectsLaunch_1.readObject)(
                                            //@ts-ignore
                                            client[interaction.user.id].launchpadObject, dependsOn.key, mainSteps) === true;
                                        break;
                                    case "number":
                                        //@ts-ignore
                                        dependsOnValue = Number((0, launchpadProjectsLaunch_1.readObject)(
                                        //@ts-ignore
                                        client[interaction.user.id].launchpadObject, dependsOn.key, mainSteps));
                                        break;
                                }
                                if (dependsOn.value !== dependsOnValue) {
                                    if (
                                    //@ts-ignore
                                    !client[interaction.user.id].skipping.find((s) => s.mainStep === msi && s.step === si)) {
                                        //@ts-ignore
                                        client[interaction.user.id].skipping.push(skippingPosition);
                                    }
                                    //@ts-ignore
                                    const nextNext = (0, launchpadProjectsLaunch_1.getNextStep)(mainSteps, 
                                    //@ts-ignore
                                    next.nextMainStep, 
                                    //@ts-ignore
                                    next.nextStep);
                                    if (nextNext) {
                                        //@ts-ignore
                                        continueId =
                                            mainSteps[nextNext.nextMainStep].steps[nextNext.nextStep]
                                                .step;
                                    }
                                    if ((dependsOn === null || dependsOn === void 0 ? void 0 : dependsOn.onSkip) === "deleteMapTo") {
                                        (0, launchpadProjectsLaunch_1.deleteKey)(
                                        //@ts-ignore
                                        client[interaction.user.id].launchpadObject, skipMapTo);
                                    }
                                    else {
                                        (0, launchpadProjectsLaunch_1.nullifyKey)(
                                        //@ts-ignore
                                        client[interaction.user.id].launchpadObject, skipMapTo);
                                    }
                                }
                                else {
                                    //prettier-ignore
                                    //@ts-ignore
                                    client[interaction.user.id].skipping =
                                        //@ts-ignore
                                        //prettier-ignore
                                        client[interaction.user.id].skipping.filter((s) => !(s.mainStep === next.nextMainStep && s.step === next.nextStep));
                                }
                            }
                            else if (dependsOn.condition === "eitherTrue") {
                                let dependsOnValue1 = (0, launchpadProjectsLaunch_1.readObject)(
                                //@ts-ignore
                                client[interaction.user.id].launchpadObject, dependsOn.key[0], mainSteps);
                                let dependsOnValue2 = (0, launchpadProjectsLaunch_1.readObject)(
                                //@ts-ignore
                                client[interaction.user.id].launchpadObject, dependsOn.key[1], mainSteps);
                                if (!(dependsOnValue1 === dependsOn.value ||
                                    dependsOnValue2 === dependsOn.value)) {
                                    if (
                                    //@ts-ignore
                                    !client[interaction.user.id].skipping.find((s) => s.mainStep === msi && s.step === si)) {
                                        //@ts-ignore
                                        client[interaction.user.id].skipping.push(skippingPosition);
                                    }
                                    //@ts-ignore
                                    const nextNext = (0, launchpadProjectsLaunch_1.getNextStep)(mainSteps, 
                                    //@ts-ignore
                                    next.nextMainStep, 
                                    //@ts-ignore
                                    next.nextStep);
                                    if (nextNext) {
                                        //@ts-ignore
                                        continueId =
                                            mainSteps[nextNext.nextMainStep].steps[nextNext.nextStep]
                                                .step;
                                    }
                                    if ((dependsOn === null || dependsOn === void 0 ? void 0 : dependsOn.onSkip) === "deleteMapTo") {
                                        (0, launchpadProjectsLaunch_1.deleteKey)(
                                        //@ts-ignore
                                        client[interaction.user.id].launchpadObject, skipMapTo);
                                    }
                                    else {
                                        (0, launchpadProjectsLaunch_1.nullifyKey)(
                                        //@ts-ignore
                                        client[interaction.user.id].launchpadObject, skipMapTo);
                                    }
                                }
                                else {
                                    //prettier-ignore
                                    //@ts-ignore
                                    client[interaction.user.id].skipping =
                                        //@ts-ignore
                                        //prettier-ignore
                                        client[interaction.user.id].skipping.filter((s) => !(s.mainStep === next.nextMainStep && s.step === next.nextStep));
                                }
                            }
                            return true;
                        }
                        return false;
                    };
                    let nextDependsOnCheck = next;
                    while (dependsOnChecker(nextDependsOnCheck)) {
                        //@ts-ignore
                        nextDependsOnCheck = (0, launchpadProjectsLaunch_1.getNextStep)(mainSteps, nextDependsOnCheck.nextMainStep, nextDependsOnCheck.nextStep);
                    }
                    if (continueId === "DONESTEP") {
                        continueId = "DONESTEP Summary";
                    }
                    const continueBtn = new discord_js_1.ButtonBuilder()
                        .setCustomId(
                    //@ts-ignore
                    continueId)
                        .setLabel("Continue")
                        .setStyle(discord_js_1.ButtonStyle.Primary);
                    let currentValue = (0, launchpadProjectsLaunch_1.getCurrentValue)(
                    //@ts-ignore
                    step, 
                    //@ts-ignore
                    (0, launchpadProjectsLaunch_1.readObject)(user.launchpadLaunch, step.mapTo));
                    if (current.valueType === "boolean" && currentValue !== null) {
                        currentValue = currentValue === true ? "Yes" : "No";
                    }
                    const exampleDateRange = `${(0, dayjs_1.default)().format("D/M/YYYY")} - ${(0, dayjs_1.default)()
                        .add(7, "day")
                        .format("D/M/YYYY")}`;
                    const dateRangeInfo = `${step.valueType === "dateRange"
                        ? "\n\n*Please enter a valid date range **starting today (" +
                            (0, dayjs_1.default)().format("D/M/YYYY") +
                            ")" +
                            "** with the following format:\n\n**Day/Month/Year - Day/Month/Year**\n\nFor example:\n**" +
                            exampleDateRange +
                            "***"
                        : ""}`;
                    let multiSelectMenu = "";
                    if (step.type == "multiSelect") {
                        if (step.valueType === "blockchainsSelect") {
                            //@ts-ignore
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
                            multiSelectMenu = `\n\n` + result.trim() + "\n";
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
                    //@ts-ignore
                    let summary;
                    if (step.step === "DONESTEP") {
                        summary =
                            ((_q = (_p = launchpadProjectsLaunch_1.getSummary === null || launchpadProjectsLaunch_1.getSummary === void 0 ? void 0 : (0, launchpadProjectsLaunch_1.getSummary)(mainSteps, "discord", client[interaction.user.id].launchpadObject, client[interaction.user.id].skipping)) === null || _p === void 0 ? void 0 : _p.trim) === null || _q === void 0 ? void 0 : _q.call(_p)) || "";
                    }
                    const content = `**Step ${(0, launchpadProjectsLaunch_1.getEmojiNum)(msi + 1)} of ${(0, launchpadProjectsLaunch_1.getEmojiNum)(mainSteps.length)}: ${step.step !== "DONESTEP" ? mainStep.mainStep : "Summary"}**
                  
${step.step !== "DONESTEP" ? (0, launchpadProjectsLaunch_1.getProgressBar)(msi + 1) : (0, launchpadProjectsLaunch_1.getProgressBar)(msi + 2)}
                  
${step.step !== "DONESTEP" ? regular : summary}`;
                    const buttons = [];
                    //@ts-ignore
                    let skippingMatch = client[interaction.user.id].skipping.find((s) => s.stepId === backId);
                    while (skippingMatch) {
                        let furtherBackStep = 
                        //@ts-ignore
                        (0, launchpadProjectsLaunch_1.getPreviousStep)(mainSteps, skippingMatch.mainStep, skippingMatch.step);
                        let furtherBackStepId = 
                        //@ts-ignore
                        (_r = mainSteps[furtherBackStep.previousMainStep]) === null || _r === void 0 ? void 0 : _r.steps[
                        //@ts-ignore
                        furtherBackStep.previousStep].step;
                        backId = furtherBackStepId;
                        skippingMatch = client[interaction.user.id].skipping.find((s) => s.stepId === furtherBackStepId);
                    }
                    if (prev) {
                        const backBtn = new discord_js_1.ButtonBuilder()
                            .setCustomId(
                        //@ts-ignore
                        backId)
                            .setLabel("Back")
                            .setStyle(discord_js_1.ButtonStyle.Danger);
                        buttons.push(backBtn);
                    }
                    if (next) {
                        buttons.push(changeValueBtn);
                        buttons.push(continueBtn);
                    }
                    const rows = [new discord_js_1.ActionRowBuilder().addComponents(...[buttons])];
                    let finalContent = (0, launchpadProjectsLaunch_1.splitInput)(content);
                    if (finalContent.length > 1) {
                        for (let [ci, chunk] of finalContent.entries()) {
                            if (ci === 0) {
                                yield interaction.reply({
                                    content: chunk,
                                    ephemeral: true,
                                    components: rows,
                                });
                            }
                            else {
                                yield interaction.followUp({
                                    content: chunk,
                                    ephemeral: true,
                                    components: rows,
                                });
                            }
                        }
                    }
                    else {
                        yield interaction.reply({
                            content: content,
                            ephemeral: true,
                            components: rows,
                        });
                    }
                }),
            });
        }
    }
    return handlers;
};
exports.default = producer;
