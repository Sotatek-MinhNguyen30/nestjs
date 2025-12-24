
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IS_PUBLIC_KEY, IS_PUBLIC_PERMISSION } from 'src/decorator/customize';
import { ADMIN_ROLE } from 'src/databases/sample';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
    super();
  }

    
  canActivate(context: ExecutionContext) {
    // metadata -> true or false
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }


  handleRequest(err, user, info, context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const isSkipPermission = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_PERMISSION, [
      context.getHandler(),
      context.getClass(),
    ]);

    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException("Token không hợp lệ or không có token ở Bearer Token ở Header request");
    }

    // Bypass permission check for SUPER_ADMIN
    if (user?.role?.name === ADMIN_ROLE) {
      return user;
    }

    //check permission
    const targetMethod = request.method;
    // Use request.url and remove query string to get the full path
    const urlPath = request.url.split('?')[0]; // Remove query parameters
    const targetEndpoint = urlPath;

    const permissions = user?.permissions ?? [];
    let isExist = permissions.find(permission => 
      targetMethod === permission.method
      &&
      targetEndpoint === permission.apiPath
    )
    if (targetEndpoint.startsWith("/api/v1/auth")) isExist = true;
    if (!isExist && !isSkipPermission) {
      throw new ForbiddenException("Ban khong co quyen truy cap endpoint nay")
    }
    return user;
  }
}
