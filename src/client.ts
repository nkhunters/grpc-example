import { createChannel, createClient } from 'nice-grpc';
import {
  ChatServiceDefinition,
  Message,
  MessageResponse,
  SubscribeRequest,
  UploadResponse
} from '../compiled_proto/chat';

async function main() {
  // Create a channel and client
  const channel = createChannel('localhost:3001');
  const client = createClient(ChatServiceDefinition, channel);

  try {
    // 1. Unary RPC
    console.log('\n1. Testing Unary RPC:');
    const response: MessageResponse = await client.sendMessage({
      userId: 'client1',
      content: 'Hello from unary RPC!',
      timestamp: new Date().toISOString()
    });
    console.log('Unary response:', response);

    // 2. Server Streaming RPC
    console.log('\n2. Testing Server Streaming RPC:');
    const serverStream = client.subscribeToMessages({ userId: 'client1' });
    for await (const message of serverStream) {
      console.log('Received server message:', message);
    }

    // 3. Client Streaming RPC
    console.log('\n3. Testing Client Streaming RPC:');
    const messages = [
      {
        userId: 'client1',
        content: 'Client message 1',
        timestamp: new Date().toISOString()
      },
      {
        userId: 'client1',
        content: 'Client message 2',
        timestamp: new Date().toISOString()
      },
      {
        userId: 'client1',
        content: 'Client message 3',
        timestamp: new Date().toISOString()
      }
    ];

    // Create an async iterator for the messages
    const messageIterator = (async function* () {
      for (const message of messages) {
        yield message;
      }
    })();

    const uploadResponse: UploadResponse = await client.uploadMessages(
      messageIterator
    );
    console.log('Upload response:', uploadResponse);

    // 4. Bidirectional Streaming RPC
    console.log('\n4. Testing Bidirectional Streaming RPC:');
    const chatMessages = ['Hello!', 'How are you?', 'Goodbye!'];

    // Create an async iterator for chat messages
    const chatIterator = (async function* () {
      for (const message of chatMessages) {
        yield {
          userId: 'client1',
          content: message,
          timestamp: new Date().toISOString()
        };
      }
    })();

    const chatStream = client.chat(chatIterator);
    for await (const response of chatStream) {
      console.log('Received chat response:', response);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the channel
    await channel.close();
  }
}

main().catch(console.error);
