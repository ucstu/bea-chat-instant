export class ErrorModel {
  /*
   * 错误代码
   */
  code: number;
  /*
   * 错误消息
   */
  msg: string;

  constructor(code: number, msg: string) {
    this.code = code;
    this.msg = msg;
  }
}
