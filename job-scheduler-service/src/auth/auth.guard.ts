import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const key = request.headers.apikey;    
    if (!key) {
      throw new UnauthorizedException();
    }

    if (key !== process.env.JOB_SCHEDULER_API_KEY) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
