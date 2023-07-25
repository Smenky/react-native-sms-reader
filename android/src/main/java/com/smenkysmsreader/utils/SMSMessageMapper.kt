package com.smenkysmsreader.utils

import android.telephony.SmsMessage
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

internal fun SmsMessage.toWritableMap(): WritableMap {
  return Arguments.createMap().apply {
    putString("origin", this@toWritableMap.originatingAddress)
    putString("bodyContent", this@toWritableMap.messageBody)
    putDouble("timeStamp", this@toWritableMap.timestampMillis.toDouble())
  }
}
