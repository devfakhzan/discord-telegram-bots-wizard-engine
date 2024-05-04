This is a package for creating wizards in both Discord and Telegram bots by just using a configuration flow object and the target map object. More descriptions will be written in the future.

## Main Steps Structure

Each main step object contains the following properties:

- `mainStep`: A string that represents the name of the main step.
- `description`: A string that provides a brief description of the main step.
- `steps`: An array of objects, each representing a step within the main step.

## Steps Structure

Each step object within the `steps` array contains the following properties:

- `step`: A string that represents the name of the step.
- `title`: A string that provides a title or prompt for the step.
- `type`: A string that specifies the type of input or action required for the step. Possible values include `select`, `input`, `check`, `multiSelect`, `selectTwo`, and `eitherTrue`.
- `mapTo`: A string or array of strings that specifies the path(s) in the configuration object where the step's value should be stored.
- `valueType`: A string that specifies the type of value expected for the step. Possible values include `number`, `string`, `boolean`, `dateRange`, `blockchainsSelect`, `twoBoolean`, and `stringArray`.
- `options`: An optional array of objects, each representing an option for the step if the `type` is `select`, `multiSelect`, or `selectTwo`. Each option object contains `text` and `value` properties.
- `dependsOn`: An optional object that specifies conditions under which the step is applicable. It includes `type`, `key`, `value`, `condition`, and `onSkip` properties.
- `validation`: An optional function that validates the input for the step.
- `validationError`: An optional string that specifies the error message to display if the validation fails.

## Example

```const mainSteps = [
 {
    mainStep: "Chain Selection",
    description: "Select which chain and how to create your token.",
    steps: [
      {
        step: "chooseChain",
        title: "Choose a chain to launch your token.",
        type: "select",
        mapTo: "general.chain",
        valueType: "number",
        options: [
          {
            text: "Goerli ETH",
            value: "5",
          },
          {
            text: "Forkfy ETH",
            value: "1337",
          },
        ],
      },
      // Additional steps...
    ],
 },
 // Additional main steps...
];```