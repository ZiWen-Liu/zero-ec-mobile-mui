// FIXME TS
// @ts-nocheck

type callInfo = {
  a?: string;
  functionname?: string;
  callback?: string;
  args?: any;
};

function createCallbackFunction(funcName, callbackFunc, bCreateCallback) {
  if (callbackFunc && callbackFunc.name && callbackFunc.name.length > 0) {
    return callbackFunc.name;
  }

  if (!window.__functionIndexMap) {
    window.__functionIndexMap = {};
  }

  if (typeof window[funcName + 0] != "function") {
    window[funcName + 0] = callbackFunc;
    window.__functionIndexMap[funcName] = 0;
    return funcName + 0;
  } else {
    if (!bCreateCallback) {
      const maxIndex = window.__functionIndexMap[funcName];
      const callbackFuncStr = callbackFunc.toString();
      for (let i = 0; i <= maxIndex; i++) {
        const tmpName = funcName + i;
        if (window[tmpName].toString() == callbackFuncStr) return tmpName;
      }
    }

    const newIndex = ++window.__functionIndexMap[funcName];
    window[funcName + newIndex] = callbackFunc;
    return funcName + newIndex;
  }
}

function createIFrame(src) {
  const rootElm = document.documentElement;
  const newFrameElm = document.createElement("IFRAME");
  newFrameElm.setAttribute("src", src);
  rootElm.appendChild(newFrameElm);
  return newFrameElm;
}

export default function callAppFunction(
  functionName: string,
  args?,
  callback?,
  bCreateCallback?,
) {
  // creates a JSON string from function name and arguments and then calls openCustomURLinIFrame.
  let url = "js2app://";

  const callInfo: callInfo = {};
  callInfo.a = "aa/aa";
  callInfo.functionname = functionName;
  if (callback) {
    if (typeof callback == "function") {
      const callbackFuncName = createCallbackFunction(
        functionName + "_" + "callback",
        callback,
        bCreateCallback,
      );
      callInfo.callback = callbackFuncName;
    } else callInfo.callback = callback;
  }
  if (args) {
    callInfo.args = args;
  }
  url += encodeURIComponent(JSON.stringify(callInfo));
  url = url.replace("aa%2Faa", "aa/aa");

  const iFrame = createIFrame(url);
  // remove the frame now
  iFrame.parentNode.removeChild(iFrame);
}

export function callAppFunctionMock(
  functionName,
  args,
  callback,
  bCreateCallback,
) {
  if (functionName === "getSupportedList") {
    callback({
      result: true,
      object: {
        supported: [
          "WeChatSession",
          "WeChatMoments",
          "facebook",
          "saveImage",
          "copyLink",
        ],
      },
    });
  }
}
