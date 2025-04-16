export interface IUser {
  userId: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export class User {
  userId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: IUser) {
    this.userId = data.userId;
    this.name = data.name;
    this.email = data.email;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  static getTableName(): string {
    return 'Users';
  }

  static getKeySchema(): { [key: string]: string } {
    return {
      userId: 'S'  // String type
    };
  }

  toDynamoDB(): { TableName: string; Item: IUser } {
    return {
      TableName: User.getTableName(),
      Item: {
        userId: this.userId,
        name: this.name,
        email: this.email,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
    };
  }
} 