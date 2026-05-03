import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

// Inisialisasi Firebase Admin hanya sekali
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId:    process.env.FIREBASE_PROJECT_ID,
      privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
      privateKey:   process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail:  process.env.FIREBASE_CLIENT_EMAIL,
      clientId:     process.env.FIREBASE_CLIENT_ID,
      clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    }),
  });
}

export const auth = admin.auth();
export const db   = admin.firestore();

// Firestore settings — timestamps sebagai Date object
db.settings({ ignoreUndefinedProperties: true });

export default admin;