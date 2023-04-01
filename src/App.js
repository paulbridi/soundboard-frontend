import React, { useState } from 'react';
import axios from 'axios'

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    axios.post('/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response.data); // Do something with the response data
    })
    .catch(error => {
      console.error(error); // Handle any errors
    });
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
