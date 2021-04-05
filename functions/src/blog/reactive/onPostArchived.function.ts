import * as functions from "firebase-functions";
import workflowDispatchHandler from "../../handlers/workflowDispatch";

exports.onPostArchived = functions.storage
  .bucket(functions.config().fb.storage_bucket)
  .object()
  .onArchive(workflowDispatchHandler);