import { useEffect, useState } from 'react';
import SmenkySmsReader from './definitions';
import { PermissionsAndroid, DeviceEventEmitter, Platform } from 'react-native';
import type { SMSMessage } from './model';

const ANDROID_RECEIVE_SMS_PERMISSION = 'android.permission.RECEIVE_SMS';

type OnSMSReceived = (sms: SMSMessage) => void;

type OS = 'android' | 'ios';
type OnPermissionGranted = (os: OS) => void;
type OnNotPermissionGranted = (os: OS, err?: Error) => void;

const hasAndroidPermission = (): Promise<boolean> => {
  return PermissionsAndroid.check(ANDROID_RECEIVE_SMS_PERMISSION);
};

const hasIOSPermission = (): boolean => {
  return false;
};

export const useSMSReceivedCallback = (
  callback: OnSMSReceived,
  onNotPermissionGranted?: OnNotPermissionGranted
) => {
  const [androidGranted, setAndroidGranted] = useState<boolean>(false);

  useEffect(() => {
    hasAndroidPermission()
      .then(setAndroidGranted)
      .catch(() => setAndroidGranted(false));

    if (
      (Platform.OS === 'android' && !androidGranted) ||
      (Platform.OS === 'ios' && !hasIOSPermission())
    ) {
      onNotPermissionGranted?.(Platform.OS);
    }

    const emitter = DeviceEventEmitter.addListener(
      SmenkySmsReader.getConstants().RECEIVE_SMS_BROADCAST_EVENT,
      callback
    );

    return () => {
      emitter.remove();
    };
  }, [callback, onNotPermissionGranted, androidGranted]);
};

const requestAndroidPermissions = async (
  onGranted: OnPermissionGranted,
  onDenied: OnNotPermissionGranted
) => {
  try {
    const granted = await PermissionsAndroid.request(
      ANDROID_RECEIVE_SMS_PERMISSION
    );

    if (granted === 'granted') {
      onGranted('android');
    } else {
      onDenied('android');
    }
  } catch (err) {
    onDenied('android', new Error(`${err}`));
  }
};

const requestIOSPermissions = async () => {
  // TODO: Not implemented yet
};

export const requestRequiredPermissions = async (
  onGranted?: OnPermissionGranted,
  onDenied?: OnNotPermissionGranted
) => {
  if (Platform.OS === 'android') {
    await requestAndroidPermissions(
      (os) => onGranted?.(os),
      (os, err) => onDenied?.(os, err)
    );
    return;
  }

  if (Platform.OS === 'ios') {
    await requestIOSPermissions();
    return;
  }
};
