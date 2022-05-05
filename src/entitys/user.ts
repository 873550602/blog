export default class UserEntity implements User {
  id: number;
  account: string;
  labels?: string[];
  avatarUrl?: string;
  realName?: string;
  phoneNumbers?: string[];
  email?: string;
  constructor(
    id: number,
    account: string,
    labels?: string[],
    avatarUrl?: string,
    realName?: string,
    phoneNumbers?: string[],
    email?: string
  ) {
    this.id = id;
    this.account = account;
    this.realName = realName;
    this.labels = labels;
    this.avatarUrl = avatarUrl;
    this.phoneNumbers = phoneNumbers;
    this.email = email;
  }

  static fromJson(obj: User): UserEntity {
    return new UserEntity(
      obj.id,
      obj.account,
      obj.labels,
      obj.avatarUrl,
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
      avatarUrl: entity.avatarUrl,
      realName: entity.realName,
      phoneNumbers: entity.phoneNumbers,
      email: entity.email,
    };
  }
}
