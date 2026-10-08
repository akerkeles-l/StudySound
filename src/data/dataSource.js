import { DATA_SOURCE } from "../config";
import { rawResponses } from "./rawResponses";

/**
 * Returns the RAW responses as an array of { musicHours, testScore }.
 * The rest of the app only calls this function, so switching the data
 * source later does not require changing any chart or component.
 */
export async function loadRawResponses() {
  switch (DATA_SOURCE) {
    case "static":
      return rawResponses;

    case "sheets":
      // Future idea: publish the Google Sheet as CSV / JSON, fetch() it here
      // and map every row to { musicHours: Number, testScore: Number | string }.
      throw new Error('DATA_SOURCE "sheets" is not implemented yet.');

    default:
      throw new Error(`Unknown DATA_SOURCE: ${DATA_SOURCE}`);
  }
}
