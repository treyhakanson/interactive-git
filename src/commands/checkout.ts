import { promisify } from "util";
import { exec as legacyExec } from "child_process";

import { selectBranch } from "../utils";

const exec = promisify(legacyExec);

export default async function handle() {
  const branch = await selectBranch();

  const { stdout, stderr } = await exec(`git checkout ${branch}`);
  process.stdout.write(stdout);
  process.stderr.write(stderr);
}
