import React, { useState, useEffect } from 'react';
import axios from 'axios'
import videojs from 'video.js';
import './App.css';


function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState('');
  const [videoClips, setVideoClips] = useState([]);


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

  const getVideoClips = async () => {
    try {
      const response = await axios.get('/clips');
      const videoClips = response.data;
      setVideoClips(videoClips);
  
      // Create a video element for each video clip
      const videoElements = videoClips.map(videoClip => {
        const videoEl = document.createElement('video');
        videoEl.src = videoClip.url;
        videoEl.controls = true;
        return videoEl;
      });
  
      // Initialize the video player when the video elements are ready
      const videoPlayerEl = document.querySelector('#video-player');
      videoElements.forEach(videoEl => videoPlayerEl.appendChild(videoEl));
      const videoPlayer = videojs(videoPlayerEl);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getVideoClips();
  }, []);  
  
return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {response && <p>{response}</p>}
      <div id="video-player"></div>
    </div>
  );
}

export default App;