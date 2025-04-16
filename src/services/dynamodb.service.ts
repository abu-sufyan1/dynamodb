import { docClient } from '../config/aws.config.js';
import { PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { IUser } from '../models/user.model.js';

export class DynamoDBService {
  static async createItem(tableName: string, item: any): Promise<void> {
    const command = new PutCommand({
      TableName: tableName,
      Item: item
    });
    await docClient.send(command);
}

  static async getItem(tableName: string, key: { [key: string]: any }): Promise<any> {
    const command = new GetCommand({
      TableName: tableName,
      Key: key
    });
    const result = await docClient.send(command);
    return result.Item;
  }

  static async updateItem(
    tableName: string,
    key: { [key: string]: any },
    updateExpression: string,
    expressionAttributeValues: { [key: string]: any },
    expressionAttributeNames?: { [key: string]: string }
  ): Promise<any> {
    const command = new UpdateCommand({
      TableName: tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
      ReturnValues: "ALL_NEW"
    });
    return await docClient.send(command);
  }

  static async deleteItem(tableName: string, key: { [key: string]: any }): Promise<void> {
    const command = new DeleteCommand({
      TableName: tableName,
      Key: key
    });
    await docClient.send(command);
  }

  static async scanTable(tableName: string): Promise<any[]> {
    const command = new ScanCommand({
      TableName: tableName
    });
    const result = await docClient.send(command);
    return result.Items || [];
  }
} 