"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import FilesUpload from "@/components/postUpload/filesUpload";

function getSubject(departments, session, params) {
  if (!session || !session.user) return null;

  const depName =
    Object.values(departments).find(
      (item) =>
        item.name === session.user.department ||
        item.aliases.includes(session.user.department)
    ) || null;

  if (!depName) return null;

  const subject = depName.subjects[session.user.semmester].find((item) =>
    item.aliases.includes(params)
  );
  return subject ? subject.displayName : null;
}

export default function DocsUpload({ departments, params }) {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); 
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState("");

  const subjectTitle = getSubject(
    departments,
    session,
    params?.slug?.toLowerCase()
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    
  };

  return (
    <div className="my-10 mx-auto w-full justify-center">
      <div className="mx-5 sm:mx-28 md:mx-52 lg:mx-[28rem] rounded-xl bg-white dark:bg-zinc-700/50 p-8 drop-shadow-lg">
        <p className="text-2xl font-bold text-center text-gray-800 dark:text-gray-300 uppercase underline">
          {subjectTitle || "Upload Document"}
        </p>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="md:w-10/12 mx-auto my-6"
        >
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block mb-2 font-bold dark:font-medium text-neutral-800 dark:text-gray-100 font-default"
            >
              Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="block w-full p-2 border rounded-lg bg-neutral-300/50 dark:bg-neutral-600/50 border-gray-500/25 placeholder-gray-400 text-neutral-900 dark:text-neutral-50 focus:ring-blue-500 focus:border-blue-500 font-default shadow-sm shadow-gray-400/25"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 font-bold dark:font-medium text-neutral-800 dark:text-gray-100 font-default"
            >
              Description <span className="text-red-600">*</span>
            </label>
            <textarea
              type="text"
              id="title"
              name="title"
              className="block w-full p-2 border rounded-lg bg-neutral-300/50 dark:bg-neutral-600/50 border-gray-500/25 placeholder-gray-400 text-neutral-900 dark:text-neutral-50 focus:ring-blue-500 focus:border-blue-500 font-default shadow-sm shadow-gray-400/25 min-h-[42px] max-h-52"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <FilesUpload files={files} setFiles={setFiles} fileError={fileError} setFileError={setFileError} />
          <button
            type="submit"
            className="w-full font-medium font-default text-white rounded-md py-2 bg-neutral-800 dark:bg-gray-200/25 backdrop-blur-lg shadow-sm shadow-gray-300/25 hover:bg-gray-800/80 dark:hover:bg-gray-400/25 hover:shadow hover:shadow-gray-500/25 transition ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
