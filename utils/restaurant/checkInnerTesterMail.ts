/**
 * 检测是否是内测用户 --- email为@sayweee.com后缀
 * @param mail
 * @returns
 */
export const checkInnerTesterMail = (mail: string) => {
  const reg = /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+(@sayweee.com)$/;
  return reg.test(mail);
};
