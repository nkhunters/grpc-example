import { createServer } from 'nice-grpc';
import { ChatServiceDefinition } from '../compiled_proto/chat';
import { ChatService } from './services/ChatService';

async function main() {
  // Create a new gRPC server
  const server = createServer();

  // Implement the ChatService
  server.add(ChatServiceDefinition, new ChatService());

  // Start the server
  const port = 3001;
  await server.listen(`0.0.0.0:${port}`);
  console.log(`gRPC server listening on port ${port}`);
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
