import { promisify } from "util";
import { exec as legacyExec } from "child_process";

import { selectBranch } from "../utils";

const exec = promisify(legacyExec);

export default async function handle(argv: any) {
  const branch = await selectBranch();
  const flag = argv.force ? "-D" : "-d";

  const { stdout, stderr } = await exec(`git branch ${flag} ${branch}`);

  process.stdout.write(stdout);
  process.stderr.write(stderr);
}
