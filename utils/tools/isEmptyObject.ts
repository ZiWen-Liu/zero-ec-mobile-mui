/**
 * 判断是否为空对象
 * @param obj
 * @returns
 */
export const isEmptyObject = (
  obj: { [key: string]: any } | undefined | null
) => {
  if (
    obj === null ||
    obj === undefined ||
    obj.constructor !== Object ||
    Object.keys(obj).length < 1
  ) {
    return true;
  }
  return false;
};
