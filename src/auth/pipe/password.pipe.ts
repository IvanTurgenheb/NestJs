import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class PasswordPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (value.toString().length > 8) {
      throw new BadRequestException('비밀번호는 8글자 이하로 입력해주세요.');
    }

    return value.toString();
  }
}

@Injectable()
export class MaxLengthPipe implements PipeTransform {
  constructor(
    private readonly length: number,
    private readonly subject: string,
  ) {}

  transform(value: string) {
    if (value.length > this.length) {
      throw new BadRequestException(
        `${this.subject}의 최대길이는 ${this.length}글자 입니다.`,
      );
    }

    return value;
  }
}

@Injectable()
export class MinLengthPipe implements PipeTransform {
  constructor(
    private readonly length: number,
    private readonly subject: string,
  ) {}

  transform(value: string) {
    if (value.length < this.length) {
      throw new BadRequestException(
        `${this.subject}의 최소길이는 ${this.length}글자 입니다.`,
      );
    }

    return value;
  }
}
