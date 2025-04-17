import { User, IUser } from '../models/user.model.js';
import { DynamoDBService } from '../services/dynamodb.service.js';

export class UserController {
  static async createUser(userData: IUser): Promise<IUser> {
    try {
      console.log('Creating user:', userData);
      const user = new User(userData);
      await DynamoDBService.createItem(User.getTableName(), user.toDynamoDB().Item);
      return user;
    } catch (error) {
      throw new Error(`Error creating user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async getUser(userId: string): Promise<IUser> {
    try {
      const user = await DynamoDBService.getItem(User.getTableName(), { userId });
      if (!user) {
        throw new Error('User not found');
      }
      return user as IUser;
    } catch (error) {
      throw new Error(`Error getting user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser> {
    try {
      const updateExpression = 'SET #name = :name, email = :email, updatedAt = :updatedAt';
      const expressionAttributeValues = {
        ':name': updateData.name,
        ':email': updateData.email,
        ':updatedAt': new Date().toISOString()
      };
      const expressionAttributeNames = {
        '#name': 'name'
      };

      const result = await DynamoDBService.updateItem(
        User.getTableName(),
        { userId },
        updateExpression,
        expressionAttributeValues,
        expressionAttributeNames
      );

      return result.Attributes as IUser;
    } catch (error) {
      throw new Error(`Error updating user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async deleteUser(userId: string): Promise<{ message: string }> {
    try {
      await DynamoDBService.deleteItem(User.getTableName(), { userId });
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async listUsers(): Promise<IUser[]> {
    try {
      return await DynamoDBService.scanTable(User.getTableName()) as IUser[];
    } catch (error) {
      throw new Error(`Error listing users: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 