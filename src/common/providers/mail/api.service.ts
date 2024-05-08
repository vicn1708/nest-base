// import { HttpService } from '@nestjs/axios';
// import { Injectable, Logger } from '@nestjs/common';
// import { firstValueFrom } from 'rxjs';
// @Injectable()
// export class ApiService {
//   constructor(private readonly httpService: HttpService) {}

//   async get(domain: string, path: string, token: string): Promise<any> {
//     const axiosConfig = {
//       method: 'get',
//       url: encodeURI(`${domain}${path}`),
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     return firstValueFrom(this.httpService.request(axiosConfig))
//       .then((res) => res.data)
//       .catch((e) => {
//         Logger.error(e.message);
//       });
//   }

//   async post(domain = '', path: string, data: any, token = ''): Promise<any> {
//     const axiosConfig = {
//       method: 'post',
//       url: encodeURI(`${domain}${path}`),
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       data,
//     };
//     console.log('axiosConfig :>> ', axiosConfig);
//     return firstValueFrom(this.httpService.request(axiosConfig))
//       .then((res) => res.data)
//       .catch((e) => {
//         Logger.error(e.message);
//       });
//   }

//   async basicAuth(
//     domain: string,
//     path: string,
//     clientId: string,
//     clientSecret: string,
//   ): Promise<any> {
//     const form = new URLSearchParams();
//     form.append('grant_type', 'client_credentials');
//     const axiosConfig = {
//       method: 'post',
//       url: encodeURI(`${domain}${path}`),
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: `Basic ${Buffer.from(
//           `${clientId}:${clientSecret}`,
//         ).toString('base64')}`,
//       },
//       data: form,
//     };
//     return firstValueFrom(this.httpService.request(axiosConfig))
//       .then((res) => res.data)
//       .catch((e) => {
//         Logger.error(e.message);
//       });
//   }
// }
