import { HttpException, UnsupportedMediaTypeException } from '@nestjs/common';
import { _Response_I } from '@tesis-project/dev-globals/dist/core/interfaces';

import 'multer';


export function fileMimetypeFilter(...mimetypes: string[]) {
//   return (
//     req,
//     file: Express.Multer.File,
//     callback: (error: Error | null, acceptFile: boolean) => void,
//   ) => {
//     if (mimetypes.some((m) => file.mimetype.includes(m))) {
//       callback(null, true);
//     } else {

//       let _Response: _Response_I = {
//         ok: false,
//         statusCode: 400,
//         message: `Formato no valido ${mimetypes.join(', ')}`
//       }

//       callback( new HttpException(_Response, _Response.statusCode), false );

//       // callback(
//       //   new UnsupportedMediaTypeException(
//       //     `File type is not matching: ${mimetypes.join(', ')}`,
//       //   ),
//       //   false,
//       // );
//     }
//   };
}
