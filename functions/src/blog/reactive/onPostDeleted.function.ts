import * as functions from "firebase-functions";
import workflowDispatchHandler from "../../handlers/workflowDispatch";

exports.onPostDeleted = functions.storage
  .bucket(functions.config().fb.storage_bucket)
  .object()
  .onDelete(workflowDispatchHandler);