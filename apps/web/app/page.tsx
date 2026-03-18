import { prisma } from "@repo/db/client";

export default async function Home() {
  console.log(process.env.DATABASE_URL);
  const users = await prisma.user.findFirst();
  console.log("users : ", users);
  return (
    <div>
      <h1>username : {users?.username}</h1>
      <h1>password : {users?.password}</h1>
    </div>
  );
}
