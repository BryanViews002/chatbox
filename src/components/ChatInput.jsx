import React, { useState, useRef } from "react";
import "../styles/ChatInput.css";

const ChatInput = ({ input, setInput, handleSend }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [image, setImage] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Toggle emoji picker
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // Add emoji to the text
  const addEmoji = (emoji) => {
    setInput(input + emoji);
    setShowEmojiPicker(false);
  };

  // Handle audio recording
  const handleAudioRecord = () => {
    if (isRecording) {
      // Stop recording
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      // Start recording
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
          audioChunksRef.current.push(e.data);
        };
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          setAudioFile(audioBlob);
          audioChunksRef.current = []; // Reset chunks
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
      });
    }
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (input.trim() || audioFile || image) {
      handleSend(input, audioFile, image);
      setInput("");
      setAudioFile(null);
      setImage(null);
    }
  };

  // Handle image selection
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImage(URL.createObjectURL(selectedImage));
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage} className="send-button">
        Send
      </button>
      <button onClick={toggleEmojiPicker} className="emoji-button">
        😊
      </button>
      <button
        onClick={handleAudioRecord}
        className="audio-record-button"
        title={isRecording ? "Stop Recording" : "Start Recording"}
      >
        {isRecording ? "Stop" : "🎙️"}
      </button>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="Selected" className="image-preview" />}
      {audioFile && (
        <audio controls>
          <source src={URL.createObjectURL(audioFile)} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default ChatInput;
