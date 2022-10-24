export class HttpResponse {
  /*
   * 响应代码
   */
  code: 20000 | 20001 | 40001 | 40002 | 40003 | 40004 | 50001;
  /*
   * 响应消息
   */
  msg: string;

  constructor(
    code: 20000 | 20001 | 40001 | 40002 | 40003 | 40004 | 50001,
    msg: string
  ) {
    this.code = code;
    this.msg = msg;
  }
}
