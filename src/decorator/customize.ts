
import { SetMetadata } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true); // key:value

export const RESPONSE_MESSAGE = 'response message'
export const ResponseMessage = (message: string) => 
  SetMetadata('response message', message);

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const IS_PUBLIC_PERMISSION = "isPublicPermission";
export const SkilCheckPermission = () => SetMetadata(IS_PUBLIC_PERMISSION, true);