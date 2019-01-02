export * from "./auth";
export * from "./devices";
export * from "./deviceTypes";
export * from "./settings";
export * from "./rooms";
export * from "./documents";
export * from "./patientTracking";
export * from "./patients";
export * from "./users";
export * from "./home";
export * from "./duty";
export * from "./warning";
export * from "./report";

export const INITIAL = "INITIAL";

export function initialStates() {
    return {
        type: INITIAL,
        payload: {}
    };
}
