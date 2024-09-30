import React from "react";

const VideoCall = () => {
  const initiateVideoCall = () => {
    // Use Twilio, Agora, or any other video API to handle video calls
    window.open("https://video-call-url.com", "_blank"); // Sample URL
  };

  return (
    <div>
      <h1>Video Call</h1>
      <button onClick={initiateVideoCall}>Start Video Call</button>
    </div>
  );
};

export default VideoCall;