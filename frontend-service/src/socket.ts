import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('Connected to server:', socket.id);
});

export default socket;
