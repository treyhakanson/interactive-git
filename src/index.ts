#!/usr/bin/env node

import yargs from "yargs";

import handleCheckout from "./commands/checkout";
import handleDelete from "./commands/delete";

yargs
  .command("c", "checkout a branch", {}, handleCheckout)
  .command(
    "d",
    "delete a branch",
    {
      force: {
        alias: "f",
        type: "boolean",
        descrition: "Delete the branch even if its changes haven't been merged",
      },
    },
    handleDelete
  )
  .help().argv;
