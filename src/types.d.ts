type OptionsFunction = () => Array<{ text: string; value: string | number }>;

type BotProducerInitiator = {
  finalConfirmationNeeded: any;
  mainSteps: Array<{
    mainStep: string;
    description: string;
    steps: Array<{
      action: any;
      actionNoBackTomainBranch: boolean;
      step: string;
      title: string;
      type:
        | "select"
        | "selectTwo"
        | "multiSelect"
        | "check"
        | "eitherTrue"
        | "list"
        | "input"
        | "photo"
        | "branch";
      mapTo: string;
      valueType:
        | "string"
        | "number"
        | "boolean"
        | "dateRange"
        | "blockchainsSelect";
      options:
        | Array<{ text: string; value: string | number }>
        | OptionsFunction;
      validation?: function;
      validationError?: string;
      inBranch?: boolean;
    }>;
  }>;
  onComplete?: function;
};
