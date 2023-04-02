import React, { useState } from 'react';

function UploadVideo() {
  const [video, setVideo] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', video);

    fetch('/video', {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  };

  const handleFileChange = (event) => {
    setVideo(event.target.files[0]);
  };

  return (
    <div>
      <h1>Upload Video</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="video" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadVideo;
