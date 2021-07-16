import socketIOClient from 'socket.io-client';
import { SERVER_HOST } from "@env";

const socket = socketIOClient(`${SERVER_HOST}`);

export default socket;
