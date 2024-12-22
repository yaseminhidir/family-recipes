import { PrismaClient } from "@prisma/client";
import { createHash } from "crypto";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const userCount = await prisma.user.count({
    where: {
      email: body.email,
    },
  });
  if (userCount > 0) {
    return { success: false, message: "Bu email ile kayıt olunamaz." };
  }
  let user = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    passwordHash: createHash("sha256").update(body.password).digest("hex"),
  };
  console.log("user",user)
  const userRes= await prisma.user.create({
    data:user
  })
  await setUserSession(event, {
    user: userRes,
  });
  console.log("userREs",userRes)
  return { success: true, user:userRes};
});
