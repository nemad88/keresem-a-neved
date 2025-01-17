import { prisma } from "@/lib/prisma";

export async function getGivenNames(gender: "female" | "male") {
  try {
    const givenNames = await prisma.givenName.findMany({
      where: {
        gender,
      },
      orderBy: {
        name: "asc",
      },
    });
    return givenNames;
  } catch (error) {
    console.error(error);
  }
}
