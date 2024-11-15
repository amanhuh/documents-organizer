"use Client";

export default function FilesUpload({
  files,
  setFiles,
  fileError,
  setFileError,
}) {
  const handleFileChange = (e) => {
    const newFiles = [...e.target.files];
    const updatedFiles = [...files];
    let errorIndex = 0;

    newFiles.forEach((file) => {
      if (file.size < 10000 * 1024) {
        if (updatedFiles.length < 7) {
          const imgSrc = URL.createObjectURL(file);
          updatedFiles.push({ file, imgSrc });
        } else {
          setFileError("You cannot upload more than 7 files.");
        }
      } else {
        errorIndex++;
      }
    });

    if (errorIndex == 1) {
      setFileError(`1 file wasn't uploaded as it exceeded the 10 MB limit.`);
    } else if (errorIndex > 1) {
      setFileError(
        `${errorIndex} files weren't uploaded as they exceeded the 10 MB limit.`
      );
    }
    setFiles(updatedFiles);
  };

  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    setError('');
  };

  return (
    <div className="mb-8">
      <p className="block mb-5 font-bold dark:font-medium text-neutral-800 dark:text-gray-100 font-default">
        Documents <span className="text-red-600">*</span>
      </p>
      <label
        htmlFor="fileUpload"
        className="bg-neutral-700 hover:bg-neutral-700/90 dark:bg-neutral-900 dark:hover:bg-neutral-900/60 px-6 py-2.5 rounded-lg text-gray-100 dark:text-gray-200 font-medium cursor-pointer transition ease-in-out"
      >
        <i className="fa fa-upload mr-2 text-sm"></i> Upload
        <input
          type="file"
          id="fileUpload"
          name="fileUpload"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
      </label>
      <p className="text-xs md:text-sm italic text-red-600 mt-2">{fileError}</p>
      <div className="mt-4 flex gap-x-3 overflow-x-auto overflow-y-visible w-full">
        {files
          ? files.map((fileObj, index) => (
              <div
                key={index}
                className="relative p-1.5 bg-neutral-700 dark:bg-neutral-900 w-40 justify-center place-content-center shrink-0 rounded-lg"
              >
                <div className="h-40 mb-1 shrink-0">
                  <img
                    src={fileObj.imgSrc}
                    className="w-full h-full rounded-lg shrink-0"
                  />
                </div>
                <div className="font-default text-gray-200 text-xs">
                  <p title={fileObj.file.name.length}>
                    {fileObj.file.name.length > 19
                      ? `${fileObj.file.name.slice(0, 19)}...`
                      : fileObj.file.name}
                  </p>
                </div>
                <div className="absolute top-2 right-2 cursor-pointer">
                  <div
                    className="rounded-full bg-neutral-900 text-gray-300 text-sm px-2 py-1 justify-center place-content-center hover:text-red-600 cursor-pointer shadow-xl"
                    onClick={() => removeFile(index)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
