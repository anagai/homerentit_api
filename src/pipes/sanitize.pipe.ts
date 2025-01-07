import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import * as sanitizeHtml from 'sanitize-html';

@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (Array.isArray(value)) {
      return this.sanitizeArray(value);
    } else if (typeof value === 'object' && value !== null) {
      console.log("sanitize value:",value);
      if (this.isMulterFile(value)) {
        return value; // Ignore sanitization for uploaded file objects
      }
      return this.sanitizeObject(value);
    } else {
      return this.sanitizeValue(value);
    }
    // if (typeof value === 'string') {
    //   console.log("Sanitizing string:",value);  
    //   return sanitizeHtml(value); // Sanitize strings
    // } else if (typeof value === 'object') {
    //   console.log("Sanitizing object:",value);
    //   return this.sanitizeObject(value); // Recursively sanitize objects
    // } else {
    //   return value; // No sanitization for other types
    // }
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

  private sanitizeArray(arr: any[]): any[] {
    return arr.map(item => this.transform(item, null)); // Recursively sanitize each element
  }

  private sanitizeValue(value: any): any {
    if (typeof value === 'string') {
      return sanitizeHtml(value);
    }
    return value; // No sanitization for other types
  }

  private isMulterFile(obj: any): boolean {
    return obj && typeof obj === 'object' && 'fieldname' in obj && 'originalname' in obj && 'mimetype' in obj;
  }

}