# gRPC Patterns Demo

This project demonstrates all four gRPC patterns using nice-grpc:

1. Unary RPC (simple request-response)
2. Server Streaming RPC
3. Client Streaming RPC
4. Bidirectional Streaming RPC

## Prerequisites

- Node.js (v14 or higher)
- npm
- Protocol Buffers compiler (protoc)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Generate TypeScript code from proto files:

```bash
npm run generate:proto
```

## Running the Demo

You can run the server and client in separate terminals:

Terminal 1 (Server):

```bash
npm run start:server
```

Terminal 2 (Client):

```bash
npm run start:client
```

Or run both simultaneously:

```bash
npm run dev
```

## What's Included

1. **Unary RPC**: Simple request-response pattern

   - Client sends a single message
   - Server responds with a success status and message ID

2. **Server Streaming RPC**: Server sends multiple responses

   - Client subscribes to messages
   - Server sends 5 messages with 2-second intervals

3. **Client Streaming RPC**: Client sends multiple requests

   - Client uploads 3 messages
   - Server responds with the total count of received messages

4. **Bidirectional Streaming RPC**: Both client and server can send messages
   - Client sends 3 messages
   - Server echoes each message back with a prefix

## Project Structure

- `proto/chat.proto`: Protocol buffer definitions
- `src/server.ts`: gRPC server implementation
- `src/client.ts`: gRPC client implementation
- `compiled_proto/`: Generated TypeScript code from proto files
