import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('http://localhost:5000/api/video', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => setResponse(data.message))
    .catch(error => console.error(error));
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {response && <p>{response}</p>}
    </div>
  );
}

export default App;
