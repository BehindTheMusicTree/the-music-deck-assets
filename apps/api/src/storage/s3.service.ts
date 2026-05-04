import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Readable } from "node:stream";

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly publicBaseUrl: string | undefined;

  constructor(private readonly config: ConfigService) {
    const region = this.config.get<string>("S3_REGION") ?? "us-east-1";
    const endpoint = this.config.get<string>("S3_ENDPOINT");
    const forcePathStyle =
      this.config.get<string>("S3_FORCE_PATH_STYLE") === "true" ||
      this.config.get<string>("S3_FORCE_PATH_STYLE") === "1";
    const accessKeyId = this.config.get<string>("S3_ACCESS_KEY_ID");
    const secretAccessKey = this.config.get<string>("S3_SECRET_ACCESS_KEY");
    const bucket = this.config.get<string>("S3_BUCKET");
    if (!bucket) {
      this.logger.warn("S3_BUCKET is not set; S3 operations will fail");
    }
    this.bucket = bucket ?? "";
    this.publicBaseUrl = this.config.get<string>("S3_PUBLIC_BASE_URL");
    this.client = new S3Client({
      region,
      endpoint: endpoint || undefined,
      // Path-style only when explicitly requested (MinIO local). R2/AWS use virtual-hosted + endpoint URL.
      forcePathStyle,
      credentials:
        accessKeyId && secretAccessKey
          ? { accessKeyId, secretAccessKey }
          : undefined,
      requestChecksumCalculation: "WHEN_REQUIRED",
      responseChecksumValidation: "WHEN_REQUIRED",
    });
  }

  publicUrl(key: string): string | undefined {
    if (!this.publicBaseUrl) return undefined;
    const base = this.publicBaseUrl.replace(/\/+$/, "");
    const k = key.replace(/^\/+/, "");
    return `${base}/${k}`;
  }

  async signedGetUrl(key: string, ttlSeconds = 3600): Promise<string> {
    const cmd = new GetObjectCommand({ Bucket: this.bucket, Key: key });
    return getSignedUrl(this.client, cmd, { expiresIn: ttlSeconds });
  }

  async putObject(
    key: string,
    body: Buffer | Uint8Array | Readable,
    contentType: string,
    contentLength?: number,
  ): Promise<{ etag?: string }> {
    const out = await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
        ...(contentLength != null ? { ContentLength: contentLength } : {}),
      }),
    );
    return { etag: out.ETag };
  }

  async deleteObject(key: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({ Bucket: this.bucket, Key: key }),
    );
  }
}
