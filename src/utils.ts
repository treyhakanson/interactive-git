import { promisify } from "util";
import { exec as legacyExec } from "child_process";
import prompts from "prompts";

const exec = promisify(legacyExec);

export async function getBranchChoices(): Promise<prompts.Choice[]> {
  const result = await exec("git branch -v --sort=-committerdate");
  return result.stdout
    .split("\n")
    .map((branch) => branch.trim())
    .filter((branch) => branch.length !== 0)
    .map((branch) => {
      console.log(branch);
      const [, flag, name, description] = branch.match(
        /^(\*)?\s*([^\s]+)\s+(.+)$/
      )!;
      return { title: name, value: name, description, disabled: flag === "*" };
    });
}

export async function selectBranch(): Promise<string> {
  const choices = await getBranchChoices();
  const { branch } = await prompts({
    type: "select",
    name: "branch",
    message: "Switch branch",
    choices,
    hint: choices[0].description,
    warn: "current branch",
    onState({ value }) {
      if (!Array.isArray(this)) {
        this.hint = choices.find((c) => c.value === value)?.description;
      }
    },
  });
  return branch;
}
