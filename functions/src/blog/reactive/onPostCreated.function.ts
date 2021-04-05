import * as functions from "firebase-functions";
import workflowDispatchHandler from "../../handlers/workflowDispatch";

exports.onPostCreated = functions.storage
  .bucket(functions.config().fb.storage_bucket)
  .object()
  .onFinalize(workflowDispatchHandler);