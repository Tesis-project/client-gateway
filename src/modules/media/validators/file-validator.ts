import { HttpStatus, HttpException } from "@nestjs/common";
import { Media_Format_Enum } from "@tesis-project/dev-globals/dist/modules/media/interfaces";
import { extname } from "path";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const generateRandomFileName = () => {

    const randomName = Math.random().toString(36).substring(2, 15);
    const timestamp = new Date().getTime();
    return `${randomName}_${timestamp}`;

};

export const fileValidatorFilter = (req, file, callback) => {

    const fileExt = extname(file.originalname).toUpperCase().substring(1);

    if (!Object.values(Media_Format_Enum).includes(fileExt as Media_Format_Enum)) {

        const response = {
            ok: false,
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Formato de archivo no válido',
        };
        return callback(new HttpException(response, response.statusCode), false);

    }

    if (file.size > MAX_FILE_SIZE) {

        const response = {
            ok: false,
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'El archivo excede el tamaño máximo permitido (10MB)',
        };
        return callback(new HttpException(response, response.statusCode), false);

    }

    const randomFileName = generateRandomFileName();

    file.originalname = `${randomFileName}.${fileExt.toLowerCase()}`;

    callback(null, true);

};