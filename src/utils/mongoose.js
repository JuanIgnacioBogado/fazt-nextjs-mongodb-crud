import { connect, connection } from 'mongoose';

const mongodbConnection = {
    isConnected: false
};

export default (async () => {
    if (mongodbConnection.isConnected) return;

    const db = await connect(process.env.MONGODB_URL);
    mongodbConnection.isConnected = db.connections[0].readyState;
})();

connection.on('connected', () => console.log('DB is connected:', connection.name));

connection.on('error', err => console.log(err));