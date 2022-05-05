type Ttype = ArrayOrObject
type Vtype = ArrayOrObject | undefined
const vEmail =
  /^[A-z0-9]+([._\\-]*[A-z0-9])*@([A-z0-9]+[-a-z0-9]*[A-z0-9]+\.){1,63}[A-z0-9]+$/; // 邮箱验证
const vPhone = /^(((1[3|4|5|6|7|8|9]{1}[0-9]{1}))[0-9]{8})$/; // 手机验证
// 深拷贝
export const deepClone = <T extends Ttype, V extends Vtype>(
  initalObj: T,
  finalObj?: V
): Ttype => {
  const obj: Ttype = finalObj || (initalObj.constructor === Array ? [] : {});
  Object.keys(initalObj).forEach((key) => {
    const value = initalObj[key];
    // 避免死循环导致内存溢出
    if (value === obj) return;
    // 如果被复制的值不为数组或对象，直接赋值
    if (value == null || typeof value !== 'object') {
      obj[key] = value
      return
    }
    // 如果类型不一样，直接赋值
    if (typeof obj[key] !== typeof value) {
      obj[key] = value
      return;
    }
    deepClone(initalObj[key], obj[key]);
  });
  return obj;
};
// 验证是否是手机号
export const validPhone = (v: string) => vPhone.test(v);
// 验证是否是邮箱
export const validEmail = (v: string) => vEmail.test(v);
