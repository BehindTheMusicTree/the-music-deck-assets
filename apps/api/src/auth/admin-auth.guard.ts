import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

/**
 * Bearer-token guard for admin write endpoints. Reads `ADMIN_API_TOKEN` from env.
 * If the env var is unset, the guard fails closed (denies all). Real auth
 * (Clerk/Auth0) replaces this in a follow-up.
 */
@Injectable()
export class AdminAuthGuard implements CanActivate {
  private readonly logger = new Logger(AdminAuthGuard.name);

  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const expected = this.config.get<string>("ADMIN_API_TOKEN");
    if (!expected) {
      this.logger.warn(
        "ADMIN_API_TOKEN is not configured; rejecting admin request",
      );
      throw new UnauthorizedException("Admin token not configured");
    }
    const req = context.switchToHttp().getRequest<Request>();
    const header = req.headers["authorization"];
    if (typeof header !== "string" || !header.toLowerCase().startsWith("bearer ")) {
      throw new UnauthorizedException("Bearer token required");
    }
    const token = header.slice("Bearer ".length).trim();
    if (token !== expected) {
      throw new UnauthorizedException("Invalid token");
    }
    return true;
  }
}
