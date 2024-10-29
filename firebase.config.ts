interface FirebaseConfig {
  reactNative: {
    databasePersistenceEnabled: boolean;
    analyticsAutoCollectionEnabled: boolean;
    messagingAutoInitEnabled: boolean;
    crashlyticsAutoCollectionEnabled: boolean;
    performanceAutoCollectionEnabled: boolean;
  };
}

const firebaseConfig: FirebaseConfig = {
  reactNative: {
    databasePersistenceEnabled: true,
    analyticsAutoCollectionEnabled: true,
    messagingAutoInitEnabled: true,
    crashlyticsAutoCollectionEnabled: true,
    performanceAutoCollectionEnabled: true,
  },
};

export default firebaseConfig;
