import socketIOClient from 'socket.io-client';

const url = 'http://3.142.86.155';
// const url = 'http://192.168.0.110:3000';

const socket = socketIOClient(url);

export default socket;
