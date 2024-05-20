import {
  getPreviousStep,
  getCurrentValue,
  getEmojiNum,
  getNextStep,
  getProgressBar,
  universalBack,
  backToMainBranch,
  readObject,
  writeToObject,
  pushToObject,
  writeToLastItem,
  saveLaunchpadLaunchToDB,
  universalContinue,
  universalSkip,
  getSummary,
  listToArray,
  countryList,
  dateTimeFormat,
  universalOnComplete,
  universalOnCompleteConfirmation,
  universalOnCompleteConfirm,
  getSubProgressBar,
} from "./launchpadProjectsLaunch";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const producer = (producerInitiator: BotProducerInitiator) => {
  const fns = [] as any;
  const mainSteps: any = producerInitiator.mainSteps;
  for (let [msi, mainStep] of mainSteps.entries()) {
    //@ts-ignore

    if (mainStep.steps[mainStep.steps.length-1].step === "DONESTEP") {

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
              value: "||onCompleteConfirm||",
            },
          ],
        })

        mainStep.steps.push({
          step: "DONESTEP_RESPONSE_CONFIRM_RESPONSE",
          title: "DONE!",
          type: "input",
          mapTo: "done",
          valueType: "boolean",
        })
      }

      mainStep.steps.push({
        step: "DONESTEP_RESPONSE",
        title: "DONE!",
        type: "input",
        mapTo: "done",
        valueType: "boolean",
      })
    }
    for (let [si, step] of mainStep.steps.entries() as any) {
      let fn = async (
        ctx: any,
        TelegramClient: any,
        UserDb: any,
        targetObject: any,
        additionalFunctions: any
      ) => {
        try {
          await ctx.deleteMessage();
        } catch (e) {
          // console.log("Error deleting message", e);
        }
        
        //Deep clone targetObject to use at the start
        if (msi === 0 && si === 0 && !ctx.scene.state.targetObject) {
          ctx.scene.state.targetObject = JSON.parse(
            JSON.stringify(targetObject)
          );
          ctx.scene.state.userId =
            ctx?.update?.callback_query?.from?.id || ctx?.message?.from.id;
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

        let prev: any = getPreviousStep(mainSteps, msi, si);
        let current: any = mainSteps?.[msi]?.steps?.[si];
        let next: any = getNextStep(mainSteps, msi, si);

        let callbackData =
          mainSteps?.[prev?.previousMainStep]?.steps[prev?.previousStep]
            ?.type === "input" ||
          mainSteps?.[prev?.previousMainStep]?.steps[prev?.previousStep]
            ?.type === "multiSelect"
            ? ctx?.message?.text
            : ctx.update?.callback_query?.data;

        if (
          !ctx.scene.state?.in_branch &&
          ctx.scene?.state?.step_before_branch
        ) {
          const backToStep = ctx.scene.state.step_before_branch;
          ctx.scene.state.step_before_branch = undefined;
          while (ctx.wizard.cursor < backToStep) {
            ctx.wizard.cursor++;
          }
          ctx.wizard.steps[ctx.wizard.cursor](ctx);
          return;
        }

        if (ctx.update?.callback_query?.data?.includes("branch_")) {
          let branch = ctx.update?.callback_query?.data;
          ctx.update.callback_query.data = undefined;
          ctx.scene.state.step_before_branch = ctx.wizard.cursor - 1;
          ctx.scene.state.in_branch = true;
          ctx.scene.state.branch_first_entry = true;
          await ctx.scene.enter(branch, ctx.scene.state);
          return;
        }

        if (ctx.update?.callback_query?.data === backToMainBranch) {
          ctx.update.callback_query.data = undefined;
          ctx.scene.state.in_branch = false;
          await ctx.scene.enter("launchpad-projects-launch", ctx.scene.state);
          return;
        }

        //branch validation
        let prevObj =
          mainSteps?.[prev?.previousMainStep]?.steps[prev?.previousStep];

        if (
          prevObj?.type === "branch" &&
          prevObj?.validation &&
          ctx.update?.callback_query?.data !== universalBack
        ) {
          //@ts-ignore
          const val = readObject(
            ctx.scene.state.targetObject,
            //@ts-ignore
            prevObj?.validationTarget
          );

          const validationResult = prevObj?.validation(val);

          if (!validationResult?.success) {
            return ctx.reply(validationResult?.reason);
          }
        }

        if (
          (mainSteps?.[prev?.previousMainStep]?.steps[prev?.previousStep]
            ?.type === "select" ||
            mainSteps?.[prev?.previousMainStep]?.steps[prev?.previousStep]
              ?.type === "check" ||
            mainSteps?.[prev?.previousMainStep]?.steps[prev?.previousStep]
              ?.type === "selectTwo") &&
          ctx?.message?.text &&
          !ctx.scene.state.skipping?.find(
            (s: { mainStep: any; step: any }) =>
              //@ts-ignore
              s.mainStep === prev?.previousMainStep &&
              //@ts-ignore
              s.step === prev?.previousStep &&
              s.step ===
                mainSteps?.[prev?.previousMainStep]?.steps[prev?.previousStep]
                  ?.step
          ) &&
          !mainSteps?.[prev?.previousMainStep]?.steps[prev?.previousStep]
            ?.inBranch
            
        ) {
          //ctx.wizard.cursor--;
          //ctx.wizard.steps[ctx.wizard.cursor](ctx);
          await ctx.reply("Invalid input. Please try again.");
          return;
        }

        if (
          mainSteps?.[prev?.previousMainStep]?.steps[prev?.previousStep]
            ?.type === "list" &&
          !ctx.update?.callback_query?.data &&
          ctx.update?.callback_query?.data !== null
        ) {
          if (!ctx.message || !ctx.message?.text) {
            await ctx.reply(
              `Enter a valid comma seperated country code list (E.g.: AF, AL).`
            );
            return;
          }

          const listEntered = listToArray(ctx.message.text);

          if (!listEntered?.length) {
            await ctx.reply(
              `Enter a valid comma seperated country code list (E.g.: AF, AL).`
            );
            return;
          }

          for (let item of listEntered) {
            if (
              !countryList.find(
                (c) =>
                  item.toLowerCase() === c.code.toLowerCase() ||
                  item.toLowerCase() === c.code3.toLowerCase()
              )
            ) {
              await ctx.reply(`Country code "${item}" is invalid.`);
              return;
            }
          }

          callbackData = ctx.message.text;
        }

        if (
          mainSteps?.[prev?.previousMainStep]?.steps[prev?.previousStep]
            ?.type === "photo" &&
          !ctx.update?.callback_query?.data &&
          ctx.update?.callback_query?.data !== null
        ) {
          if (!ctx.message || !ctx.message.photo) {
            await ctx.reply(
              `Upload a photo. Select "Compress the image" and try again.`
            );
            return; // Stay in the same step
          }

          const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB in bytes

          const telegramPhotoObj =
            ctx.message.photo[ctx.message.photo.length - 1];
          if (telegramPhotoObj.file_size > maxSizeInBytes) {
            await ctx.reply("Image size cannot be more than 2MB. Try again.");
            return; // Stay in the same step
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
          callbackData = tokenLogoUrl.replace("ipfs://", "").split("/")[0]; //tokenLogoUrl.replace("ipfs://", "https://nftstorage.link/ipfs/");
          await ctx.reply("Logo Uploaded!");
        }

        if (ctx.update?.callback_query?.data === universalOnCompleteConfirmation) {
          //Nothing
        }

        if (ctx.update?.callback_query?.data === universalOnCompleteConfirm) {
          ctx.scene.leave();
          producerInitiator.onComplete(ctx, ctx.scene.state.targetObject);
          return;
        }

        if (ctx.update?.callback_query?.data === universalOnComplete) {
          ctx.scene.leave();
          producerInitiator.onComplete(ctx, ctx.scene.state.targetObject);
          return;
        }

        if (
          ctx.update?.callback_query?.data === universalBack //&&
          // !(
          //   //prettier-ignore
          //   //@ts-ignore
          //   next?.nextMainStep === undefined && next.nextStep === undefined
          // )
        ) {
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

        //Callback data validation

        let previousStepObject =
          //@ts-ignore
          mainSteps?.[prev?.previousMainStep]?.steps?.[prev?.previousStep];

        if (
          prev &&
          //@ts-ignore
          !ctx.scene.state.skipping?.find(
            (s: { branch: any; mainStep: any; step: any }) =>
              s.mainStep === prev?.previousMainStep &&
              s.step === prev?.previousStep &&
              s.branch === mainSteps
          ) &&
          //@ts-ignore
          previousStepObject?.validation &&
          callbackData !== undefined &&
          previousStepObject.type !== "branch" //branch has a special handler
        ) {
          if (!previousStepObject?.validation(callbackData)) {
            ctx?.message?.text ? (ctx.message.text = undefined) : null;
            ctx?.update?.callback_query?.data
              ? (ctx.update.callback_query.data = undefined)
              : null;
            await ctx.reply("Invalid input. Please try again.");
            return;
          }
        }

        //Callback data processor
        
        let mapTos: any = null;
        if (previousStepObject?.mapTo) {
          mapTos =
            typeof previousStepObject?.mapTo === "string"
              ? previousStepObject?.mapTo
              : JSON.parse(JSON.stringify(previousStepObject?.mapTo));
        }

        if (
          callbackData !== universalBack &&
          callbackData !== null &&
          callbackData !== undefined
        ) {
          if (
            previousStepObject &&
            !ctx.scene.state.skipping?.find(
              (s: { branch: any; mainStep: any; step: any }) =>
                s.mainStep === prev?.previousMainStep &&
                s.step === prev?.previousStep &&
                s.branch === mainSteps
            ) &&
            mapTos
          ) {
            //Regular processing
            if (!previousStepObject.inBranch) {
              if (
                callbackData !== universalContinue &&
                callbackData !== universalSkip
              ) {
                let result = writeToObject(
                  ctx.scene.state.targetObject,
                  previousStepObject,
                  mapTos,
                  callbackData
                );

                if (result === false) {
                  console.log("CB", callbackData)
                  // if (callbackData === universalOnCompleteConfirm) {
                  //   ctx.update.callback_query.data = null;
                  //   ctx.wizard.cursor++;
                  //   await ctx.wizard.steps[ctx.wizard.cursor - 1](ctx);
                  //   ctx.wizard.cursor--;
                  //   return;
                  // }

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
              //branch processing
              //Release Schedule processing
              if (previousStepObject.step === "enterReleaseDate") {
                ctx.scene.state.releaseObj = {
                  date: "",
                  percentage: "",
                  allowVesting: false,
                };

                const date = dayjs(callbackData, dateTimeFormat);

                if (!date.isValid()) {
                  return ctx.reply(
                    "Please enter a future date with the following format:\nDay/Month/Year Hour:Minute:Seconds\n\nFor example:\n" +
                      dayjs().add(1, "day").format(dateTimeFormat)
                  );
                }

                if (date.isBefore(dayjs())) {
                  return ctx.reply(
                    "Please enter a future date with the following format:\nDay/Month/Year Hour:Minute:Seconds\n\nFor example:\n" +
                      dayjs().add(1, "day").format(dateTimeFormat)
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
                callbackData = callbackData?.replace(/%/g, "");
                const input = +callbackData?.replace(/%/g, "");
                if (Number.isNaN(input) || input < 0) {
                  return ctx.reply("Please enter a valid number");
                }

                const fundraiseRelease = readObject(
                  ctx.scene.state.targetObject,
                  previousStepObject.mapTo,
                  mainSteps
                );

                const totalPerccentage = fundraiseRelease.reduce(
                  (acc: number, curr: { percentage: string | number }) =>
                    acc + +curr.percentage,
                  0
                );

                if (totalPerccentage + input > 100) {
                  return ctx.reply(
                    `Invalid percentage. You can only add ${
                      100 - totalPerccentage
                    }% left.`
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

              //branch action
              if (previousStepObject?.action) {
                console.log(
                  "ACTION HERE",
                  prevObj?.action,
                  ctx.update?.callback_query?.data
                );
                if (
                  ctx.update?.callback_query?.data === "false" &&
                  prevObj.actionNoBackTomainBranch
                ) {
                  ctx.update.callback_query.data = undefined;
                  ctx.scene.state.in_branch = false;
                  await ctx.scene.enter(
                    "launchpad-projects-launch",
                    ctx.scene.state
                  );
                  return;
                }

                //@ts-ignore
                const val = readObject(
                  ctx.scene.state.targetObject,
                  prevObj?.mapTo
                );

                prevObj?.action(val);
              }
            }
          }
        }

        
        if (step.step === "DONESTEP" && !producerInitiator.finalConfirmationNeeded) {
          console.log(producerInitiator)
          ctx.scene.leave();
          producerInitiator.onComplete(ctx, ctx.scene.state.targetObject);
          return;
        }

        //@ts-ignore
        if (current.dependsOn) {
          //@ts-ignore
          const { dependsOn, step: stepId } = current;

          const currentPosition = {
            mainStep: msi,
            step: si,
            branch: mainSteps,
            stepId: stepId,
          };

          if (dependsOn.condition === "oneOf") {
            if (
              !dependsOn.value.includes(
                readObject(
                  ctx.scene.state.targetObject,
                  dependsOn.key,
                  mainSteps
                )
              )
            ) {
              if (
                !ctx.scene.state.skipping.find(
                  (s: { branch: any; mainStep: number; step: any }) =>
                    s.mainStep === msi &&
                    s.step === si &&
                    s.branch === mainSteps
                )
              ) {
                ctx.scene.state.skipping.push(currentPosition);
              }

              switch (ctx.update?.callback_query?.data) {
                case universalBack: {
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
              ctx.wizard.cursor++;
              ctx.wizard.steps[ctx.wizard.cursor](ctx);

              return;
            } else {
              ctx.scene.state.skipping = ctx.scene.state.skipping.filter(
                (s: { mainStep: number; step: any; branch: any }) =>
                  !(
                    s.mainStep === msi &&
                    s.step === si &&
                    s.branch === mainSteps
                  )
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
                //@ts-ignore
                dependsOnValue =
                  readObject(
                    ctx.scene.state.targetObject,
                    dependsOn.key,
                    mainSteps
                  ) === true;
                break;
              case "number":
                //@ts-ignore
                dependsOnValue = Number(
                  readObject(
                    ctx.scene.state.targetObject,
                    dependsOn.key,
                    mainSteps
                  )
                );
                break;
            }

            if (dependsOn.value !== dependsOnValue) {
              if (
                !ctx.scene.state.skipping.find(
                  (s: { branch: any; mainStep: number; step: any }) =>
                    s.mainStep === msi &&
                    s.step === si &&
                    s.branch === mainSteps
                )
              ) {
                ctx.scene.state.skipping.push(currentPosition);
              }

              switch (ctx.update?.callback_query?.data) {
                case universalBack: {
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

              ctx.wizard.cursor++;
              ctx.wizard.steps[ctx.wizard.cursor](ctx);
              return;
            } else {
              ctx.scene.state.skipping = ctx.scene.state.skipping.filter(
                (s: { mainStep: number; step: any; branch: any }) =>
                  !(
                    s.mainStep === msi &&
                    s.step === si &&
                    s.branch === mainSteps
                  )
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

            if (
              !(
                dependsOnValue1 === dependsOn.value ||
                dependsOnValue2 === dependsOn.value
              )
            ) {
              if (
                !ctx.scene.state.skipping.find(
                  (s: { branch: any; mainStep: number; step: any }) =>
                    s.mainStep === msi &&
                    s.step === si &&
                    s.branch === mainSteps
                )
              ) {
                ctx.scene.state.skipping.push(currentPosition);
              }

              switch (ctx.update?.callback_query?.data) {
                case universalBack: {
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

              ctx.wizard.cursor++;
              ctx.wizard.steps[ctx.wizard.cursor](ctx);
              return;
            } else {
              ctx.scene.state.skipping = ctx.scene.state.skipping.filter(
                (s: { branch: any; mainStep: number; step: any }) =>
                  !(
                    s.mainStep === msi &&
                    s.step === si &&
                    s.branch === mainSteps
                  )
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

        //body
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

                if (dayjs(currentValue).isValid()) {
                  currentValue = dayjs(currentValue).format(dateTimeFormat);
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

        const exampleDateRange = `${dayjs().format(dateTimeFormat)} - ${dayjs()
          .add(7, "day")
          .format(dateTimeFormat)}`;
        const dateRangeInfo = `${
          step.valueType === "dateRange"
            ? "\n\n<i>Please enter a valid date range <b>starting today (" +
              dayjs().format(dateTimeFormat) +
              ")" +
              "</b> with the following format:\n\n<b>Day/Month/Year Hour:Minute:Seconds - Day/Month/Year Hour:Minute:Seconds</b>\n\nFor example:</i>\n<b>" +
              exampleDateRange +
              "</b>"
            : ""
        }`;

        let multiSelectMenu = "";

        if (step.type == "multiSelect") {
          if (step.valueType === "blockchainsSelect") {
            const optsArr = step.options.map((o: any) => {
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

        let regular = `Question:       
<u>${
          typeof step.title === "string"
            ? step.title
            : await step.title(
                ctx.scene.state.userId,
                ctx.scene.state.targetObject
              )
        }</u>${dateRangeInfo}${multiSelectMenu}
${step.example ? "\n For example:\n " + step.example() + "\n" : ""}        
${currentValue ? currentValueLabel : ""}
${currentValue ? "<b>" + currentValue + "</b>" : ""}`;

        let summary = regular;
        let header = `<b>Main Step ${getEmojiNum(msi + 1)} of ${getEmojiNum(
          mainSteps.length
        )}: ${mainStep.mainStep}</b>`;
        let progressBar = getProgressBar(mainSteps, msi + 1);
        let subProgressBar = getSubProgressBar(mainSteps[msi].steps, si + 1);
        if (step.step === "DONESTEP") {
          summary = (await getSummary(
            ctx,
            mainSteps,
            "telegram",
            ctx.scene.state.targetObject,
            ctx.scene.state.skipping
          )) as string;

          header = "<b>Summary</b>";
          progressBar = "";

          if (step.branchDone) {
            summary = step.branchDoneText;
            header = ` <b>✅ ${
              typeof step.title === "string"
                ? step.title
                : await step.title(
                    ctx.scene.state.userId,
                    ctx.scene.state.targetObject
                  )
            }</b>\n\n`;
            progressBar = "";
          }
        }

        if (step.step === "DONESTEP_RESPONSE_CONFIRM") {
          header = "<b>Confirm to proceed?</b>";
          progressBar = "";
          summary = "";
        }

        const body = `${header}${
          progressBar ? "\n\nSteps: " + subProgressBar + "\n\n" : ""
        }${summary}`;

        const baseKeyboard = [] as any;

        if (((msi === 0 && si > 0) || msi > 0) && !step.branchDone) {
          baseKeyboard.push({
            text: "Back",
            callback_data: universalBack,
          });
        }

        if (step.step === "DONESTEP" && step.branchDone) {
          baseKeyboard.push({
            text: "Continue",
            callback_data: backToMainBranch,
          });
        }

        if (step.type === "photo") {
          baseKeyboard.push({
            text: "Skip",
            callback_data: "||SKIP||",
          });
        }

        if (((msi === 0 && si > 0) || msi > 0) && step.doneButtonBranch) {
          baseKeyboard.push({
            text: step.doneButtonText,
            callback_data: step.doneButtonBranch,
          });
        }

        const finalKeyboard = [baseKeyboard];

        if (
          step.type === "select" ||
          step.type === "selectTwo" ||
          step.type === "eitherTrue"
        ) {
          let options = step.options;
          if (typeof step.options === "function") {
            options = await step.options(ctx, ctx.scene.state.targetObject);
          }
          if (step.options) {
            finalKeyboard.unshift(
              ...options.map((o: { text: any; value: any }) => [
                {
                  text: `${o?.text}`,
                  callback_data: o.value,
                },
              ])
            );
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

        if (step.type === "branch") {
          finalKeyboard.unshift(
            step.branchNames.map(
              (branch: { branchTitle: any; branchName: any }) => ({
                text: branch.branchTitle,
                callback_data: branch.branchName,
              })
            ),
            [
              {
                text: `Continue`,
                callback_data: universalContinue,
              },
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
        if (
          cv !== null &&
          ((typeof cv === "string" && cv) ||
            typeof cv === "number" ||
            typeof cv === "boolean") &&
          cv
        ) {
          finalKeyboard.push([
            {
              text: "Continue with current value",
              callback_data:
                readObject(
                  ctx.scene.state.targetObject,
                  step.mapTo,
                  mainSteps
                ) + "",
            },
          ]);
        }

        if (
          !(
            msi === mainSteps.length - 1 &&
            si === mainSteps[msi].steps.length - 1
          )
        ) {
          ctx.wizard.next();
          await saveLaunchpadLaunchToDB(
            ctx.scene.state.targetObject,
            ctx.scene.state.userId,
            "telegram",
            UserDb
          );
        } else {
        }

        if (
          producerInitiator.onComplete &&
          msi === mainSteps.length - 1 &&
          si === mainSteps[msi].steps.length - 1
        ) {
          ctx.scene.leave();
          producerInitiator.onComplete(ctx, ctx.scene.state.targetObject);

          const backButton = baseKeyboard.find((b: any) => b.text === "Back");
          if (backButton) {
            // Removes back button since user has completed the form
            baseKeyboard.splice(baseKeyboard.indexOf(backButton), 1);
          }
        }

        if (step.step === "DONESTEP") {
          if (
            producerInitiator?.onComplete &&
            typeof producerInitiator?.onComplete === "function"
          ) {
            finalKeyboard.push([
              {
                text: "Confirm",
                callback_data: producerInitiator.finalConfirmationNeeded ? universalOnCompleteConfirmation :  universalOnComplete,
              },
            ]);
          }
        }
        try {
          await ctx.deleteMessage()
        } catch (e) {
          
        }
        
        await ctx.replyWithHTML(body, {
          reply_markup: {
            inline_keyboard: finalKeyboard,
          },
        });
      };
      fns.push(fn);
    }
  }
  return fns;
};

export default producer;
