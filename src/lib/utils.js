const vEmail = /^[A-z0-9]+([._\\-]*[A-z0-9])*@([A-z0-9]+[-a-z0-9]*[A-z0-9]+\.){1,63}[A-z0-9]+$/; // 邮箱验证
const vPhone = /^(((1[3|4|5|6|7|8|9]{1}[0-9]{1}))[0-9]{8})$/; // 手机验证
// 深拷贝
export const deepClone = (initalObj, finalObj) => {
    const obj = finalObj || (initalObj.constructor === Array ? [] : {});
    Object.keys(initalObj).forEach((key) => {
        const prop = initalObj[key];
        if (prop === obj) {
            return;
        }
        if (typeof initalObj[key] === 'object' && initalObj[key] != null) {
            obj[key] =
                initalObj[key].constructor === Array ? [] : {};
            deepClone(initalObj[key], obj[key]);
        }
        else {
            obj[key] = initalObj[key];
        }
    });
    return obj;
};
// 验证是否是手机号
export const validPhone = (v) => vPhone.test(v);
// 验证是否是邮箱
export const validEmail = (v) => vEmail.test(v);
//# sourceMappingURL=utils.js.map