package com.smenkysmsreader.utils

import android.content.Context
import com.facebook.react.bridge.ReactContext
import com.smenkysmsreader.SmenkySMSReader

internal fun Context?.onReactContext(let: (ReactContext) -> Unit) {
  if (this == null || this !is SmenkySMSReader) return
  this.reactContext()?.let(let)
}
