import React, { useState } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import {
  useSMSReceivedCallback,
  type SMSMessage,
  requestRequiredPermissions,
} from 'react-native-smenky-sms-reader';

export default function App() {
  const [latestSMS, onLatestSMS] = useState<SMSMessage | undefined>();
  useSMSReceivedCallback(onLatestSMS, (_) => {
    requestRequiredPermissions();
  });

  return (
    <View style={styles.container}>
      <Text>Number: {latestSMS?.origin}</Text>
      <Text>Body: {latestSMS?.bodyContent}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
