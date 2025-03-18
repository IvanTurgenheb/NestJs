/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const User = createParamDecorator((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  const user = request.user;

  if (!user) {
    throw new InternalServerErrorException(
      'Request에 user 프로퍼티가 존재하지 않습니다!',
    );
  }

  return user;
});
