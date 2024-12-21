import { NotFoundException, InternalServerErrorException } from "@nestjs/common/exceptions";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default class ErrorHandlerHelper {

    static CatchErrorHandler(error: Error) {
        if(error instanceof PrismaClientKnownRequestError) {
            throw new NotFoundException('Record not found');
        } else if(error instanceof NotFoundException) {
            throw new NotFoundException(error.message);
        } else {
            throw new InternalServerErrorException(error.message);
        }
    }
}