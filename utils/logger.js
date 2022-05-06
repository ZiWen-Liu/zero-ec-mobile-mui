import { isServer } from "@/utils/tool";

class Logger {
  format(type, params) {
    return Object.keys(params)
      .reduce(
        (pre, cur) => {
          pre.push(`---${cur} `, params[cur], "<<<---");
          return pre;
        },
        [`---${type} `],
      )
      .concat("---end---");
  }

  info(params) {
    if (!isServer) return;
    console.info.apply(null, this.format("info", params));
  }
  api(params) {
    if (!isServer) return;
    console.log.apply(null, this.format("api", params));
  }
  warning(params) {
    if (!isServer) return;
    console.warning.apply(null, this.format("warning", params));
  }
  error(params) {
    if (!isServer) return;
    console.error.apply(null, this.format("error", params));
  }
}

export default new Logger();
