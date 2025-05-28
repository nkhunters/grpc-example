import { CallContext } from 'nice-grpc';
import { v4 as uuidv4 } from 'uuid';
import {
  ChatServiceImplementation,
  DeepPartial,
  Message,
  MessageResponse,
  ServerStreamingMethodResult,
  SubscribeRequest,
  UploadResponse
} from '../../compiled_proto/chat';

export class ChatService implements ChatServiceImplementation {
  private messages: Message[] = [];

  // Unary RPC implementation
  async sendMessage(
    request: Message,
    context: CallContext
  ): Promise<MessageResponse> {
    console.log('Received message:', request);
    this.messages.push(request);
    return {
      success: true,
      messageId: uuidv4()
    };
  }

  // Server Streaming RPC implementation
  async *subscribeToMessages(
    request: SubscribeRequest,
    context: CallContext
  ): AsyncGenerator<Message> {
    console.log('Client subscribed:', request.userId);

    // Simulate sending messages every 2 seconds
    for (let i = 0; i < 5; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      yield {
        userId: 'server',
        content: `Server message ${i + 1}`,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Client Streaming RPC implementation
  async uploadMessages(
    requestStream: AsyncIterable<Message>,
    context: CallContext
  ): Promise<UploadResponse> {
    let messageCount = 0;

    for await (const message of requestStream) {
      console.log('Received message in upload:', message);
      this.messages.push(message);
      messageCount++;
    }

    return {
      messagesReceived: messageCount,
      success: true
    };
  }

  // Bidirectional Streaming RPC implementation
  async *chat(
    requestStream: AsyncIterable<Message>,
    context: CallContext
  ): AsyncGenerator<Message> {
    for await (const message of requestStream) {
      console.log('Received message in chat:', message);

      // Echo the message back with a server prefix
      yield {
        userId: 'server',
        content: `Echo: ${message.content}`,
        timestamp: new Date().toISOString()
      };
    }
  }
}
