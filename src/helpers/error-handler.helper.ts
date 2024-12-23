import InternalServerErrorException from '../exceptions/internal-server-error.exception';
import NotFoundException from "../exceptions/not-found.exception";
import BadRequestException from "../exceptions/bad-request.exception";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default class ErrorHandlerHelper {

    static CatchErrorHandler(error: Error) {
        if(error instanceof PrismaClientKnownRequestError) {
            //TODO: Add logic to return specific exception by error.code
            //e.g. if(error.code==='P2002')
            throw new BadRequestException();
        } else if(error instanceof NotFoundException) {
            throw error;
        } else {
            throw new InternalServerErrorException(error.message);
        }
    }
}