import React, { useState } from 'react';

const UploadForm = ({ subName }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [fileError, setFileError] = useState('');

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    files.forEach(file => formData.append('fileUpload', file));
    
    // Perform your form submission logic here
    // Example: Sending data to an API
    fetch('/your-upload-endpoint', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setSuccessMsg('File uploaded successfully!');
        setTitle('');
        setDescription('');
        setFiles([]);
      })
      .catch(error => {
        setFileError('Failed to upload files.');
      });
  };

  return (
    <form
      encType="multipart/form-data"
      id="uploadForm"
      className="md:w-10/12 mx-auto my-6"
      onSubmit={handleSubmit}
    >
      <div className="mb-6">
        <p className="text-xs italic text-green-400 font-default mb-1" id="successMsg">{successMsg}</p>
        <label htmlFor="title" className="block mb-2 font-medium text-gray-100 font-default">
          Title <span className="text-gray-300">*</span>
        </label>
        <input
          type="text"
          id="title"
          className="block w-full p-2 border rounded-lg focus:ring-blue-500 bg-gray-600/50 border-gray-500/25 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 font-default shadow-sm shadow-gray-400/25 text-gray-200"
          minLength="3"
          maxLength="50"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-8">
        <label htmlFor="description" className="block mb-2 font-medium text-gray-100 font-default">
          Description
        </label>
        <textarea
          id="description"
          className="block w-full p-2 border rounded-lg focus:ring-blue-500 bg-gray-600/50 border-gray-500/25 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 font-default shadow-sm shadow-gray-400/25 text-gray-200"
          name="description"
          style={{ minHeight: '2.7rem', maxHeight: '100px' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-8">
        <p className="block mb-2 font-medium text-gray-100 font-default">Documents *</p>
        <label
          htmlFor="dropzone-file"
          className="bg-main hover:bg-main/70 px-5 py-1.5 rounded-lg text-gray-200 font-default font-medium cursor-pointer"
        >
          <i className="fa-solid fa-upload text-gray-200 mr-2 text-sm"></i> Upload
          <input
            name="fileUpload"
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
        </label>
        <p className="text-xs md:text-sm italic text-red-400 font-default mt-2" id="fileError">{fileError}</p>
        <div className="mt-4 flex gap-x-3 overflow-x-auto overflow-y-visible w-full" id="previewMain">
          {files.length > 0 && files.map((file, index) => (
            <div key={index} className="bg-gray-200 text-gray-900 p-2 rounded-lg shadow">
              {file.name}
            </div>
          ))}
        </div>
      </div>
      <div>
        <button
          className="w-full font-medium font-default text-white rounded-md py-2 bg-gray-200/25 backdrop-blur-lg shadow-sm shadow-gray-300/25 hover:bg-gray-400/25 hover:shadow hover:shadow-gray-500/25 transition ease-in-out"
          type="submit"
          id="formSubmitBtn"
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default UploadForm;
