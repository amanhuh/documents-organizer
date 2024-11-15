import { SessionProvider } from "next-auth/react";
import DocsUpload from "@/components/postUpload/docsUpload";
import departments from "@/utils/data/departments.json";
import NavBar from "@/components/navBar";
import { auth } from "@/auth";

export default async function Page({ params }) {
  const session = await auth();
  
  return (
    <div>
      <NavBar />
      <SessionProvider session={session}>
        <DocsUpload departments={departments} params={params} />
      </SessionProvider>
    </div>
  );
}