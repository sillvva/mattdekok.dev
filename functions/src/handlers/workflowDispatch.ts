import * as functions from "firebase-functions";
import * as path from "path";
import { Octokit } from "@octokit/core";

export default async (object: functions.storage.ObjectMetadata) => {
  const filePath = object.name || "";
  const fileExtension = path.extname(filePath);
  const fileDir = path.dirname(filePath);

  functions.logger.log(`Storage Trigger: ${filePath}`);

  if (fileDir === "blog/articles" && fileExtension == ".md") {
    const octokit = new Octokit({ auth: functions.config().github.personal_access_token });
    try {
      await octokit.request("POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches", {
        owner: "sillvva",
        repo: "mattdekok.dev",
        workflow_id: "deploy.yml",
        ref: "master",
      });
    } catch (err) {
      console.log(err.toString());
      console.log("Documentation:", err.documentation_url);
      return false;
    }
  }

  return true;
};
