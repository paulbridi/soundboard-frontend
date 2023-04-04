import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios'
import './App.css';


function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videos, setVideos] = useState([]);

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
      console.log(response.data); 
      setVideos(response.data); 
    })
    .catch(error => {
      console.error(error); // Handle any errors
    });
  };
  
return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {videos && videos.map(video => (
      <ReactPlayer key={video.filename} url={video.url} controls={true}/>
      ))}
    </div>
  );
}

export default App;