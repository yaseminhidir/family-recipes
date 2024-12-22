import { PrismaClient } from "@prisma/client";
import { createHash } from "crypto";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const password= createHash("sha256").update(body.password).digest("hex");

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
      passwordHash: password
    },
  });
  if (!user) {
    return { success: false, message: "Giriş Başarısız" };
  }

  await setUserSession(event, {
    user: user,
  });
  console.log("uloginUser",user)
  return { success: true, user:user};
});
