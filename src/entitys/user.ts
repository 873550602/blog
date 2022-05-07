export default class UserEntity implements User {
  id: number;
  account: string;
  labels?: string[];
  avatar?: string;
  realName?: string;
  phoneNumbers?: string[];
  email?: string;
  constructor(
    id: number,
    account: string,
    labels?: string[],
    avatar?: string,
    realName?: string,
    phoneNumbers?: string[],
    email?: string
  ) {
    this.id = id;
    this.account = account;
    this.realName = realName;
    this.labels = labels;
    this.avatar = avatar;
    this.phoneNumbers = phoneNumbers;
    this.email = email;
  }

  static fromJson(obj: User): UserEntity {
    return new UserEntity(
      obj.id,
      obj.account,
      obj.labels,
      obj.avatar,
      obj.realName,
      obj.phoneNumbers,
      obj.email
    );
  }

  static toJson(entity: UserEntity): User {
    return {
      id: entity.id,
      account: entity.account,
      labels: entity.labels,
      avatar: entity.avatar,
      realName: entity.realName,
      phoneNumbers: entity.phoneNumbers,
      email: entity.email,
    };
  }
}
