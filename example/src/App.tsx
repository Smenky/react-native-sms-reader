import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { useSMSReceiver } from 'react-native-smenky-sms-reader';

export default function App() {
  const event = useSMSReceiver();

  return (
    <View style={styles.container}>
      <Text>Result: {event?.bodyContent}</Text>
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
