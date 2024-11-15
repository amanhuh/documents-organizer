import NavBar from "@/components/navBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import departments from "@/utils/data/departments.json";
import { auth } from "@/auth";

async function getSubject(params) {
  const session = await auth();
  if (!session || !session.user) return null;

  const depName =
    Object.values(departments).find(
      (item) =>
        item.name === session.user.department ||
        item.aliases.includes(session.user.department)
    ) || null;

  if (!depName) return null;
  
  const subject = depName.subjects[session.user.semmester].find((item) =>
    item.name === params || item.aliases.includes(params)
  );

  console.log(subject);
  return subject ? subject.displayName : null;
  
}

export default async function Page({ params }) {
  
  const subjectName = await getSubject(params.slug.toLowerCase());
  return (
    <div>
      <NavBar />
      <div className="py-16 px-64 mx-auto justify-center">
        <div className="relative h-52 w-full bg-yellow-300/90 dark:bg-yellow-400 rounded-xl flex px-10 pb-7 shadow-lg mb-6">
          <p className="mt-auto font-default font-bold text-5xl drop-shadow-md dark:text-neutral-100 uppercase">
            {subjectName}
          </p>
          <a href={"/practicals/uploads/"+subjectName} className="absolute right-0 bottom-0 px-4 py-1.5 bg-white dark:bg-gray-50 text-neutral-900 rounded-lg mr-4 mb-4 font-medium text-default shadow hover:border-gray-900 border cursor-pointer">
            <i className="fa-solid fa-plus mr-2"></i> New Entry
          </a>
        </div>
      </div>
    </div>
  );
}
