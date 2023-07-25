package com.smenkysmsreader

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.provider.Telephony
import com.smenkysmsreader.utils.Constants
import com.smenkysmsreader.utils.Event
import com.smenkysmsreader.utils.onReactContext
import com.smenkysmsreader.utils.toWritableMap

class SMSBroadcastReceiver : BroadcastReceiver() {

  override fun onReceive(context: Context?, intent: Intent?) {
    if (!intent?.action.equals(Telephony.Sms.Intents.SMS_RECEIVED_ACTION)) return

    val smsMessages = Telephony.Sms.Intents.getMessagesFromIntent(intent)
    smsMessages.forEach { sms ->
      context?.applicationContext.onReactContext { reactContext ->
        Event.sendEvent(
          reactContext,
          Constants.RECEIVE_SMS_BROADCAST_EVENT,
          sms.toWritableMap(),
        )
      }
    }

    // Not sure about the next line
    // HeadlessJsTaskService.acquireWakeLockNow(context)
  }
}
