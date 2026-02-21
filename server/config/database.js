import mongoose from 'mongoose';

const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI;
  const fallbackUri = process.env.MONGODB_URI_DIRECT;

  if (!primaryUri) {
    console.error('MONGODB_URI is missing in .env');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 15000,
      family: 4,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    const isSrvLookupError =
      typeof error?.message === 'string' &&
      (error.message.includes('querySrv') || error.message.includes('ENOTFOUND'));

    if (isSrvLookupError && fallbackUri) {
      console.warn('SRV lookup failed. Trying MONGODB_URI_DIRECT fallback...');
      try {
        const conn = await mongoose.connect(fallbackUri, {
          serverSelectionTimeoutMS: 15000,
          family: 4,
        });
        console.log(`MongoDB connected via direct URI: ${conn.connection.host}`);
        return;
      } catch (fallbackError) {
        console.error(`Direct URI fallback failed: ${fallbackError.message}`);
      }
    }

    console.error(`MongoDB connection error: ${error.message}`);
    console.error(
      'Checklist: 1) verify Atlas username/password 2) whitelist your IP (or 0.0.0.0/0 for dev) 3) ensure URI includes DB name 4) use MONGODB_URI_DIRECT if SRV DNS is blocked.'
    );
    process.exit(1);
  }
};

export default connectDB;
