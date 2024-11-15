import Image from "next/image";
import departments from "@/utils/data/departments.json";
import SubjectCard from "@/components/subjectCard";
import NavBar from "@/components/navBar";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const depName =
    Object.values(departments).find(
      (item) =>
        item.name === session.user.department ||
        item.aliases.includes(session.user.department)
    ) || null;

  if (!depName) return null;

  const subjects = depName.subjects[session.user.semmester];

  return (
    <div>
      <NavBar />
      <main className="flex flex-wrap min-h-screen p-24 gap-10">
        {subjects.map((subject, index) => (
          <SubjectCard key={index} title={subject.displayName} subName={subject.name} />
        ))          
        }
      </main>
    </div>
  );
}
