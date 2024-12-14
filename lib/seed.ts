"use server";

import fs from "fs";
import path from "path";
import { prisma } from "./db";

export const saveNames = async (gender: "male" | "female") => {
  const fileName = gender === "male" ? "osszesffi" : "osszesnoi";
  const filePath = path.join(process.cwd(), "data", `${fileName}.json`);
  const maleResponse = await fetch(`https://file.nytud.hu/${fileName}.txt`);
  const maleNames = await maleResponse.text();
  const maleNamesArray = maleNames.split("\n");
  const maleData = maleNamesArray.slice(1, -1).map((name) => {
    return {
      name,
      gender,
    };
  });

  fs.writeFileSync(filePath, JSON.stringify(maleData, null, 2), "utf8");
};

export const uploadToDb = async (gender: "male" | "female") => {
  const fileName = gender === "male" ? "osszesffi" : "osszesnoi";
  const filePath = path.join(process.cwd(), "data", `${fileName}.json`);
  fs.readFile(filePath, "utf8", async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const names = JSON.parse(data);

    const result = await prisma.name.createMany({
      data: names,
    });
    console.log(result);
    console.log(names[0]);
  });
};
