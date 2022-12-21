import React, { useState } from 'react';
import { connect } from 'react-redux';
import MQTTClient from 'mqtt';

const StudentTypingBox = (props) => {
  const [rollNo, setRollNo] = useState('');
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  const handleRollNoChange = (event) => {
    setRollNo(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
    sendTextToServer(event.target.value);
  };

  const sendTextToServer = (text) => {
    const mqttClient = MQTTClient.connect('mqtt://localhost');
    mqttClient.publish('typingText', text);
    mqttClient.end();
  };

  return (
    <div>
      <form>
        <label>
          Roll No:
          <input type="text" value={rollNo} onChange={handleRollNoChange} />
        </label>
        <br />
        <label>
          Image:
          <input type="file" onChange={handleImageChange} />
        </label>
        <br />
        <label>
          Text:
          <textarea value={text} onChange={handleTextChange} />
        </label>
      </form>
    </div>
  );
};

export default connect()(StudentTypingBox);
