export declare const universalBack = "||universalBack||";
export declare const universalOnComplete = "||onComplete||";
export declare const universalOnCompleteConfirmation = "||onCompleteConfirmation||";
export declare const universalOnCompleteConfirm = "||onCompleteConfirm||";
export declare const getEmojiNum: (number: number) => "1️⃣" | "2️⃣" | "3️⃣️" | "4️⃣" | "5️⃣" | "6️⃣" | "7️⃣" | "8️⃣" | "9️⃣" | "🔟" | undefined;
export declare const getProgressBar: (currentMainStep: number) => string;
export declare const getPreviousStep: (mainSteps: any, currentMainStep: number, currentStep: number) => false | {
    previousMainStep: number;
    previousStep: number;
};
export declare const getNextStep: (mainSteps: any, currentMainStep: number, currentStep: number) => false | {
    nextMainStep: number;
    nextStep: number;
};
export declare const writeToObject: (obj: any, previousStepObject: any, mapTo: string | string[], value: any, raw?: boolean) => false | undefined;
export declare const readObject: (obj: any, path: string, mainSteps: any) => any;
export declare const deleteKey: (obj: any, path: string) => void;
export declare const nullifyKey: (obj: any, path: string) => void;
export declare const getCurrentValue: (step: {
    type: any;
    options: any[];
}, value: {
    [x: string]: any;
} | null) => any;
export declare const saveLaunchpadLaunchToDB: (launchpadLaunch: any, userId: any, userType: any, UserDb: any) => Promise<void>;
export declare const getSummary: (mainSteps: any, type: any, obj: any, skipping: any) => string | undefined;
export declare const splitInput: (input: string) => any;
