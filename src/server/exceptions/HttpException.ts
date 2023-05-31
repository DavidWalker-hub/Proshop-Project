class HttpException extends Error {
  status: number;
  message: string;
  kind: string;
  constructor(status: number, message: string, kind: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.kind = kind;
  }
}

export default HttpException;
