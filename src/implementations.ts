import { useEffect, useState } from 'react';
import SmenkySmsReader from './definitions';
import { DeviceEventEmitter, PermissionsAndroid } from 'react-native';
import type { SMSMessage } from './model';


// TODO: Move this to the Native side.
// TODO: Once this is moved, remove the `start` and `stop` functions and just add defitions into `index.ts` file.
const requestRequiredPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      'android.permission.RECEIVE_SMS',
      {
        title: 'Receive SMS Permission',
        message: 'This permission is required to read your SMS',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Decline',
        buttonPositive: 'Grant permission',
      }
    );

    console.log("SMS Permission ->", granted);
  } catch (err) {
    console.warn(err);
  }
}

export const startSMSBroadcast = async () => {
  await requestRequiredPermissions();
  SmenkySmsReader.startSMSBroadcast();
}

export const stopSMSBroadcast = () => SmenkySmsReader.stopSMSBroadcast();

export const useSMSReceiver = (): SMSMessage | undefined => {
  const [event, setEvent] = useState<SMSMessage | undefined>();

  useEffect(() => {
    const emitter = DeviceEventEmitter.addListener(
      SmenkySmsReader.getConstants().RECEIVE_SMS_BROADCAST_EVENT,
      setEvent,
    );

    return () => {
      emitter.remove();
    };
  }, []);

  return event;
}