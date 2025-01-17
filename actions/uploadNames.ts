"use server";

import { prisma } from "@/lib/prisma";
import * as fs from "fs";
import * as path from "path";

export async function uploadNames(gender: "male" | "female") {
  const jsonFilePath = path.join(process.cwd(), "public", `${gender}.json`);

  const data = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

  for (const name of data) {
    await prisma.givenName.create({
      data: {
        name: name.name,
        gender: gender,
      },
    });
  }
}
