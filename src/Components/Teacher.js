const mqtt = require('mqtt');
const redis = require('redis');

// Connect to the MQTT broker
const client = mqtt.connect('mqtt://broker.example.com');

// Connect to the Redis database
const db = redis.createClient();

client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Subscribe to a topic
  client.subscribe('my/topic', (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Subscribed to topic');
    }
  });
});

client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message}`);

  // Save the message to the Redis database
  db.set(topic, message, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Saved message to Redis: ${topic} => ${message}`);
    }
  });
});
