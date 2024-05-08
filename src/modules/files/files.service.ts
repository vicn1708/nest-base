import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { MESSAGES } from '../../common/constants';
import { BaseApiResponse } from '../../shared/dtos';
import { Readable } from 'stream';
import { ReadStream } from 'fs';
import { appSettings } from '@common/configs/appSetting';
@Injectable()
export class FilesService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  s3: AWS.S3;
  onModuleInit() {
    this.s3 = new AWS.S3({
      endpoint: appSettings.do_endpoint,
      s3ForcePathStyle: true,
      region: 'sgp1',
      credentials: {
        accessKeyId: appSettings.do_access_key || '',
        secretAccessKey: appSettings.do_secret_key || '',
      },
    });
  }

  async uploadBuffer(
    identify: number | string,
    buffer: Buffer,
  ): Promise<BaseApiResponse<string>> {
    const uploadParams = {
      Bucket: appSettings.do_bucket || '',
      Body: buffer,
      Key: `audio/${identify}.mp3`,
      ACL: 'public-read',
    };
    const uploadResult = await this.s3.upload(uploadParams).promise();

    return {
      error: false,
      data: uploadResult.Location,
      message: MESSAGES.UPLOAD_SUCCESS,
      code: 200,
    };
  }

  async uploadBufferImage(
    identify: number | string,
    buffer: Buffer,
  ): Promise<BaseApiResponse<string>> {
    const uploadParams = {
      Bucket: appSettings.do_bucket || '',
      Body: buffer,
      Key: `image/${identify}.png`,
      ACL: 'public-read',
    };
    const uploadResult = await this.s3.upload(uploadParams).promise();

    return {
      error: false,
      data: uploadResult.Location,
      message: MESSAGES.UPLOAD_SUCCESS,
      code: 200,
    };
  }

  async uploadBufferTxt(
    identify: number | string,
    buffer: Buffer,
  ): Promise<BaseApiResponse<string>> {
    const uploadParams = {
      Bucket: appSettings.do_bucket || '',
      Body: buffer,
      Key: `audio/${identify}.txt`,
      ACL: 'public-read',
    };
    const uploadResult = await this.s3.upload(uploadParams).promise();

    return {
      error: false,
      data: uploadResult.Location,
      message: MESSAGES.UPLOAD_SUCCESS,
      code: 200,
    };
  }

  async uploadStream(
    identify: number | string,
    base64: ReadStream,
  ): Promise<BaseApiResponse<string>> {
    const uploadParams = {
      Bucket: appSettings.do_bucket || '',
      Body: base64,
      Key: `chat/${identify}.txt`,
      ACL: 'public-read',
    };
    const uploadResult = await this.s3.upload(uploadParams).promise();

    return {
      error: false,
      data: uploadResult.Location,
      message: MESSAGES.UPLOAD_SUCCESS,
      code: 200,
    };
  }

  async uploadBase64(
    identify: number | string,
    base64: Buffer | string,
  ): Promise<BaseApiResponse<string>> {
    const uploadParams = {
      Bucket: appSettings.do_bucket || '',
      Body: base64,
      Key: `images/${identify}`,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
    };
    const uploadResult = await this.s3.upload(uploadParams).promise();

    return {
      error: false,
      data: uploadResult.Location,
      message: MESSAGES.UPLOAD_SUCCESS,
      code: 200,
    };
  }

  async uploadSingle(
    identify: number | string,
    file: Express.Multer.File,
  ): Promise<BaseApiResponse<string>> {
    if (!file)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.NOT_FOUND,
          code: 400,
        },
        HttpStatus.BAD_REQUEST,
      );
    const uploadParams = {
      Bucket: appSettings.do_bucket || '',
      Body: file.buffer,
      Key: `images/${identify}/${file.originalname}`,
      ACL: 'public-read',
    };
    const uploadResult = await this.s3.upload(uploadParams).promise();

    return {
      error: false,
      data: uploadResult.Location,
      message: MESSAGES.UPLOAD_SUCCESS,
      code: 200,
    };
  }

  async getObject(key: string): Promise<Readable> {
    const { Body } = await this.s3
      .getObject({
        Key: key,
        Bucket: appSettings.do_bucket || '',
      })
      .promise();
    const data = Body as Buffer;

    return Readable.from(Buffer.from(data));
  }

  async uploadMulti(
    files?: Express.Multer.File[],
  ): Promise<BaseApiResponse<string[]>> {
    if (!files || files?.length === 0)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.NOT_FOUND,
          code: 400,
        },
        HttpStatus.BAD_REQUEST,
      );

    const urls: string[] = [];
    const uuidDate = new Date().getTime();
    await Promise.all(
      files.map(async (file, index) => {
        const uuid = Math.floor(Math.random() * 1000000);
        const uploadParams = {
          Bucket: appSettings.do_bucket || '',
          Body: file.buffer,
          Key: `images/${uuid}-${uuidDate}-${index}/${file.originalname}`,
          ACL: 'public-read',
        };
        const uploadResult = await this.s3.upload(uploadParams).promise();
        urls.push(uploadResult.Location);
      }),
    );

    return {
      error: false,
      data: urls,
      message: MESSAGES.UPLOAD_SUCCESS,
      code: 200,
    };
  }
}
