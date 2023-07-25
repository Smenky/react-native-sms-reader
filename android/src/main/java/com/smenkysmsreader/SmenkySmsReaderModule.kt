package com.smenkysmsreader

import android.Manifest
import android.content.IntentFilter
import android.provider.Telephony
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.smenkysmsreader.utils.Constants

private const val NAME = "SmenkySmsReader"

class SmenkySmsReaderModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val smsBroadcastReceiver = SMSBroadcastReceiver()

  init {
    registerReceiver()
  }

  override fun getName(): String {
    return NAME
  }

  override fun getConstants(): MutableMap<String, Any> {
    val constants = mutableMapOf<String, Any>(
      Constants.RECEIVE_SMS_BROADCAST_EVENT to Constants.RECEIVE_SMS_BROADCAST_EVENT,
    )
    super.getConstants()?.let(constants::putAll)

    return constants
  }

  @ReactMethod
  fun startSMSBroadcast() {
    registerReceiver()
  }

  @ReactMethod
  fun stopSMSBroadcast() {
    unregisterReceiver()
  }

  private fun registerReceiver() {
    val intentFilter = IntentFilter()
    intentFilter.addAction(Telephony.Sms.Intents.SMS_RECEIVED_ACTION)
    intentFilter.priority = 1000

    reactApplicationContext.registerReceiver(
      smsBroadcastReceiver,
      intentFilter,
      Manifest.permission.BROADCAST_SMS,
      null
    )
  }

  private fun unregisterReceiver() {
    reactApplicationContext.unregisterReceiver(smsBroadcastReceiver)
  }
}
