export default class UserEntity {
    id;
    account;
    labels;
    avatarUrl;
    realName;
    phoneNumbers;
    email;
    constructor(id, account, labels, avatarUrl, realName, phoneNumbers, email) {
        this.id = id;
        this.account = account;
        this.realName = realName;
        this.labels = labels;
        this.avatarUrl = avatarUrl;
        this.phoneNumbers = phoneNumbers;
        this.email = email;
    }
    static fromJson(obj) {
        return new UserEntity(obj.id, obj.account, obj.labels, obj.avatarUrl, obj.realName, obj.phoneNumbers, obj.email);
    }
    static toJson(entity) {
        return {
            id: entity.id,
            account: entity.account,
            labels: entity.labels,
            avatarUrl: entity.avatarUrl,
            realName: entity.realName,
            phoneNumbers: entity.phoneNumbers,
            email: entity.email,
        };
    }
}
//# sourceMappingURL=user.js.map