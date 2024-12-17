import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import * as sanitizeHtml from 'sanitize-html';

@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    console.log("Sanitizing value:",value);
    if (typeof value === 'string') {
      console.log("Sanitizing string:",value);  
      return sanitizeHtml(value); // Sanitize strings
    } else if (typeof value === 'object') {
      console.log("Sanitizing object:",value);
      return this.sanitizeObject(value); // Recursively sanitize objects
    } else {
      return value; // No sanitization for other types
    }
  }

  private sanitizeObject(obj: any): any {
    const sanitizedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitizedObj[key] = this.transform(obj[key], null); // Recursively sanitize
      }
    }
    return sanitizedObj;
  }
}