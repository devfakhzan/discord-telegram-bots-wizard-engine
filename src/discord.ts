// @ts-ignore

import {
  getPreviousStep,
  getCurrentValue,
  getEmojiNum,
  getNextStep,
  getProgressBar,
  readObject,
  writeToObject,
  getSummary,
  splitInput,
  dateTimeFormat,
} from "./launchpadProjectsLaunch";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  ButtonBuilder,
  ButtonStyle,
  Client,
  ModalBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  TextInputStyle,
  TextInputBuilder,
  ActionRowBuilder,
} from "discord.js";

dayjs.extend(customParseFormat);
const producer = (UserDb: any, targetObject: any, mainSteps: any) => {
  let handlers = [] as any;

  for (let [msi, mainStep] of mainSteps.entries()) {
    for (let [si, step] of mainStep.steps.entries()) {
      let prev = getPreviousStep(mainSteps, msi, si);
      let current = mainSteps?.[msi]?.steps?.[si];
      let next = getNextStep(mainSteps, msi, si);

      let backId =
        //@ts-ignore
        mainSteps?.[prev?.previousMainStep]?.steps?.[prev?.previousStep]?.step;

      const currentStepObject: any =
        //@ts-ignore
        mainSteps?.[msi]?.steps?.[si];

      handlers.push({
        name: step.step,
        description: step.title,
        run: async (client: any, interaction: any) => {
          console.log("CLIENT", client[interaction.user.id])
          //@ts-ignore
          if (msi === 0 && si === 0) {
            if (!client[interaction.user.id]) {
              client[interaction.user.id] = {};
            }
            //@ts-ignore
            client[interaction.user.id].targetObject = JSON.parse(
              JSON.stringify(targetObject)
            );
            //@ts-ignore
            //client[interaction.user.id].stepsLog = [];
            //@ts-ignore
            client[interaction.user.id].skipping = [];
            console.log("CLIENT", client[interaction.user.id])
          }

          //@ts-ignore
          // const latestStepsLogEntry = {
          //   mainStep: msi,
          //   step: si,
          // };
          //@ts-ignore
          //client[interaction.user.id].stepsLog.push(latestStepsLogEntry);

          let components: any = [];

          let component;

          switch (step.type) {
            case "input": {
              let inputPlaceholder = step.title;

              if (step.valueType === "dateRange") {
                inputPlaceholder = `${dayjs().format("D/M/YYYY")} - ${dayjs()
                  .add(7, "day")
                  .format("D/M/YYYY")}`;
              }

              if (step.step === "tokenAddress") {
                inputPlaceholder = `0xf467F6d7e5E8dAC1309C30Ea661291c86Ead7462`;
              }

              component = new TextInputBuilder()
                .setLabel(step.title)
                .setCustomId(step.step + " Summary")
                .setPlaceholder(inputPlaceholder)
                .setStyle(TextInputStyle.Short);
              break;
            }
            case "select":
            case "eitherTrue":
            case "selectTwo": {
              //@ts-ignore
              const options = step.options.map((o: any) =>
                new StringSelectMenuOptionBuilder()
                  .setLabel(o.text)
                  .setValue(o.value)
              );
              component = new StringSelectMenuBuilder()
                .setCustomId(step.step + " Summary")
                .setPlaceholder(step.title)
                .addOptions(...options);
              break;
            }
            case "multiSelect": {
              //@ts-ignore
              const options = step.options.map((o: any) =>
                new StringSelectMenuOptionBuilder()
                  .setLabel(o.text)
                  .setValue(o.value)
              );
              component = new StringSelectMenuBuilder()
                .setCustomId(step.step + " Summary")
                .setPlaceholder(step.title)
                .addOptions(...options)
                .setMinValues(1)
                .setMaxValues(options.length);
              break;
            }
            case "check": {
              component = new StringSelectMenuBuilder()
                .setCustomId(step.step + " Summary")
                .setPlaceholder(step.title)
                .addOptions(
                  new StringSelectMenuOptionBuilder()
                    .setLabel("Yes")
                    .setValue("true"),
                  new StringSelectMenuOptionBuilder()
                    .setLabel("No")
                    .setValue("false")
                );
              break;
            }
          }

          //@ts-ignore
          components.push(new ActionRowBuilder().addComponents(component));

          const trimString = (input: any) => {
            const maxLength = 45;
            const ending = "...";

            if (input.length > maxLength) {
              return input.substring(0, maxLength - ending.length) + ending;
            } else {
              return input;
            }
          };

          if (step.type === "input") {
            const modal = new ModalBuilder()
              .setTitle(trimString(`${mainStep.mainStep} - ${step.title}`))
              .setCustomId(step.step + " Summary");
            modal.setComponents(components);
            await interaction.showModal(modal);
            return;
          } else {
            await interaction?.reply({
              ephemeral: true,
              components,
            });
            return;
          }
        },
      });

      handlers.push({
        name: step.step + " Summary",
        description: step.step + " Summary",
        run: async (client: any, interaction: any) => {
          let user = await UserDb.getOrCreateUser(
            interaction.user.id,
            "discord"
          );

          let selection = false;
          if (interaction?.values?.length === 1) {
            selection = interaction?.values?.[0];
          } else if (interaction?.values?.length > 1) {
            selection = interaction.values;
          }

          let callbackData =
            selection ||
            interaction.fields?.getTextInputValue?.(step?.step + " Summary");

          if (step.valueType === "blockchainsSelect") {
            if (!Array.isArray(callbackData)) {
              callbackData = [callbackData];
            }

            let selections = [] as any;
            for (let s of callbackData) {
              //@ts-ignore
              let i = step.options.findIndex((o: any) => o.value === s);
              selections.push(i + 1);
            }

            callbackData = selections.join(",");
          }

          const retryButton = new ButtonBuilder()
            .setCustomId(
              //@ts-ignore
              mainSteps[msi].steps[si].step
            )
            .setLabel("Retry")
            .setStyle(ButtonStyle.Primary);

          if (
            //@ts-ignore
            currentStepObject?.validation &&
            callbackData &&
            //@ts-ignore
            !currentStepObject?.validation?.(callbackData)
          ) {
            await interaction.reply({
              content: "Error. " + currentStepObject.validationError,
              ephemeral: true,
              components: [new ActionRowBuilder().addComponents(retryButton)],
            });
            return;
          }

          let mapTos: Array<string> =
            typeof currentStepObject.mapTo === "string"
              ? currentStepObject.mapTo
              : JSON.parse(JSON.stringify(currentStepObject.mapTo));

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
              const exampleDateRange = `${dayjs().format(
                dateTimeFormat
              )} - ${dayjs().add(7, "day").format(dateTimeFormat)}`;

              errorMsg =
                "Invalid input.\n\n*Please enter a valid date range **starting today (" +
                dayjs().format(dateTimeFormat) +
                ")" +
                "** with the following format:\n\n**Day/Month/Year Hour:Minute:Seconds - Day/Month/Year Hour:Minute:Seconds**\n\nFor example:\n**" +
                exampleDateRange +
                "***";
            }

            await interaction.reply({
              content: errorMsg,
              ephemeral: true,
              components: [new ActionRowBuilder().addComponents(retryButton)],
            });
            return;
          }

          //@ts-ignore
          user = await UserDb.updateUser(interaction.user.id, "discord", {
            ...user,
            //@ts-ignore
            launchpadLaunch: client[interaction.user.id].targetObject,
          });

          const changeValueBtn = new ButtonBuilder()
            .setCustomId(
              //@ts-ignore
              mainSteps[msi].steps[si].step
            )
            .setLabel("Change value")
            .setStyle(ButtonStyle.Primary);

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

          const dependsOnChecker = (next: any) => {
            if (
              next &&
              //@ts-ignore
              mainSteps?.[next.nextMainStep]?.steps?.[next.nextStep]?.dependsOn
            ) {
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
                if (
                  !dependsOn.value.includes(
                    readObject(
                      //@ts-ignore
                      client[interaction.user.id].targetObject,
                      dependsOn.key,
                      mainSteps
                    )
                  )
                ) {
                  if (
                    //@ts-ignore
                    !client[interaction.user.id].skipping.find(
                      (s: { mainStep: number; step: any }) =>
                        s.mainStep === msi && s.step === si
                    )
                  ) {
                    //@ts-ignore
                    client[interaction.user.id].skipping.push(skippingPosition);
                  }

                  //@ts-ignore
                  const nextNext = getNextStep(
                    mainSteps,
                    //@ts-ignore
                    next.nextMainStep,
                    //@ts-ignore
                    next.nextStep
                  );

                  if (nextNext) {
                    //@ts-ignore
                    continueId =
                      mainSteps[nextNext.nextMainStep].steps[nextNext.nextStep]
                        .step;
                  }

                } else {
                  //prettier-ignore
                  //@ts-ignore
                  client[interaction.user.id].skipping =
                  //@ts-ignore
                  //prettier-ignore
                  client[interaction.user.id].skipping.filter((s: { mainStep: number; step: any }) => !(s.mainStep === next.nextMainStep && s.step === next.nextStep));
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
                    //@ts-ignore
                    dependsOnValue =
                      readObject(
                        //@ts-ignore
                        client[interaction.user.id].targetObject,
                        dependsOn.key,
                        mainSteps
                      ) === true;
                    break;
                  case "number":
                    //@ts-ignore
                    dependsOnValue =
                      readObject(
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
                      (s: { mainStep: number; step: any }) =>
                        s.mainStep === msi && s.step === si
                    )
                  ) {
                    //@ts-ignore
                    client[interaction.user.id].skipping.push(skippingPosition);
                  }

                  //@ts-ignore
                  const nextNext = getNextStep(
                    mainSteps,
                    //@ts-ignore
                    next.nextMainStep,
                    //@ts-ignore
                    next.nextStep
                  );

                  if (nextNext) {
                    //@ts-ignore
                    continueId =
                      mainSteps[nextNext.nextMainStep].steps[nextNext.nextStep]
                        .step;
                  }

                } else {
                  //prettier-ignore
                  //@ts-ignore
                  client[interaction.user.id].skipping =
                  //@ts-ignore
                  //prettier-ignore
                  client[interaction.user.id].skipping.filter((s: { mainStep: number; step: any }) => !(s.mainStep === next.nextMainStep && s.step === next.nextStep));
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

                if (
                  !(
                    dependsOnValue1 === dependsOn.value ||
                    dependsOnValue2 === dependsOn.value
                  )
                ) {
                  if (
                    //@ts-ignore
                    !client[interaction.user.id].skipping.find(
                      (s: { mainStep: number; step: any }) =>
                        s.mainStep === msi && s.step === si
                    )
                  ) {
                    //@ts-ignore
                    client[interaction.user.id].skipping.push(skippingPosition);
                  }

                  //@ts-ignore
                  const nextNext = getNextStep(
                    mainSteps,
                    //@ts-ignore
                    next.nextMainStep,
                    //@ts-ignore
                    next.nextStep
                  );

                  if (nextNext) {
                    //@ts-ignore
                    continueId =
                      mainSteps[nextNext.nextMainStep].steps[nextNext.nextStep]
                        .step;
                  }
                } else {
                  //prettier-ignore
                  //@ts-ignore
                  client[interaction.user.id].skipping =
                  //@ts-ignore
                  //prettier-ignore
                  client[interaction.user.id].skipping.filter((s: { mainStep: number; step: any }) => !(s.mainStep === next.nextMainStep && s.step === next.nextStep));
                }
              }
              return true;
            }
            return false;
          };

          let nextDependsOnCheck: any = next;
          while (dependsOnChecker(nextDependsOnCheck)) {
            //@ts-ignore
            nextDependsOnCheck = getNextStep(
              mainSteps,
              nextDependsOnCheck.nextMainStep,
              nextDependsOnCheck.nextStep
            );
          }

          if (continueId === "DONESTEP") {
            continueId = "DONESTEP Summary";
          }
          const continueBtn = new ButtonBuilder()
            .setCustomId(
              //@ts-ignore
              continueId
            )
            .setLabel("Continue")
            .setStyle(ButtonStyle.Primary);

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

          const exampleDateRange = `${dayjs().format("D/M/YYYY")} - ${dayjs()
            .add(7, "day")
            .format("D/M/YYYY")}`;
          const dateRangeInfo = `${
            step.valueType === "dateRange"
              ? "\n\n*Please enter a valid date range **starting today (" +
                dayjs().format("D/M/YYYY") +
                ")" +
                "** with the following format:\n\n**Day/Month/Year - Day/Month/Year**\n\nFor example:\n*****" +
                exampleDateRange
              : ""
          }`;

          let multiSelectMenu = "";

          if (step.type == "multiSelect") {
            if (step.valueType === "blockchainsSelect") {
              //@ts-ignore
              const optsArr = step.options.map((o: any) => {
                let [chainId, address, chainName, coinName] =
                  o.value.split("|");
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
              (await getSummary?.(
                {},
                mainSteps,
                "discord",
                client[interaction.user.id].targetObject,
                client[interaction.user.id].skipping,
              ))?.trim?.() || "";
          }

          const content = `**Step ${getEmojiNum(msi + 1)} of ${getEmojiNum(
            mainSteps.length
          )}: ${step.step !== "DONESTEP" ? mainStep.mainStep : "Summary"}**
                  
${step.step !== "DONESTEP" ? getProgressBar(mainSteps, msi + 1) : getProgressBar(mainSteps, msi + 2)}
                  
${step.step !== "DONESTEP" ? regular : summary}`;

          const buttons = [] as any;

          //@ts-ignore
          let skippingMatch = client[interaction.user.id].skipping.find(
            (s: any) => s.stepId === backId
          );

          while (skippingMatch) {
            let furtherBackStep =
              //@ts-ignore
              getPreviousStep(mainSteps, skippingMatch.mainStep, skippingMatch.step);

            let furtherBackStepId =
              //@ts-ignore
              mainSteps[furtherBackStep.previousMainStep]?.steps[
                //@ts-ignore
                furtherBackStep.previousStep
              ].step;

            backId = furtherBackStepId;

            skippingMatch = client[interaction.user.id].skipping.find(
              (s: any) => s.stepId === furtherBackStepId
            );
          }

          if (prev) {
            const backBtn = new ButtonBuilder()
              .setCustomId(
                //@ts-ignore
                backId
              )
              .setLabel("Back")
              .setStyle(ButtonStyle.Danger);
            buttons.push(backBtn);
          }

          if (next) {
            buttons.push(changeValueBtn);
            buttons.push(continueBtn);
          }
          const rows = [new ActionRowBuilder().addComponents(...[buttons])];

          let finalContent = splitInput(content);
          if (finalContent.length > 1) {
            for (let [ci, chunk] of finalContent.entries()) {
              if (ci === 0) {
                await interaction.reply({
                  content: chunk,
                  ephemeral: true,
                  components: rows,
                });
              } else {
                await interaction.followUp({
                  content: chunk,
                  ephemeral: true,
                  components: rows,
                });
              }
            }
          } else {
            await interaction.reply({
              content: content,
              ephemeral: true,
              components: rows,
            });
          }
        },
      });
    }
  }
  return handlers;
};

export default producer;
