import { NativeModules, Platform } from 'react-native';

interface SmenkySmsReaderDefinitions {
  getConstants(): { RECEIVE_SMS_BROADCAST_EVENT: string };
  startSMSBroadcast(): void;
  stopSMSBroadcast(): void;
}

interface SmenkySmsReaderDefinitions {
  getConstants(): { RECEIVE_SMS_BROADCAST_EVENT: string };
  startSMSBroadcast(): void;
  stopSMSBroadcast(): void;
}

const LINKING_ERROR =
  `The package 'react-native-smenky-sms-reader' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const SmenkySmsReader = NativeModules.SmenkySmsReader
  ? NativeModules.SmenkySmsReader
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default SmenkySmsReader as SmenkySmsReaderDefinitions;
