interface utilsProps {
  isObject?: (args: any) => boolean;
  isString?: (args: any) => boolean;
  isNumber?: (args: any) => boolean;
  isUndefined?: (args: any) => boolean;
  isArray?: (args: any) => boolean;
}

const utils: any = {};

["Object", "String", "Number", "Undefined", "Array"].forEach((type) => {
  utils[`is${type}`] = function (args: any): boolean {
    return Object.prototype.toString.call(args) === `[object ${type}]`;
  };
});

export default utils;
