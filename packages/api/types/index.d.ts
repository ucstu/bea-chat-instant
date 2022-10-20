/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
type ApiRequestOptions = {
  readonly method:
    | "GET"
    | "PUT"
    | "POST"
    | "DELETE"
    | "OPTIONS"
    | "HEAD"
    | "PATCH";
  readonly url: string;
  readonly path?: Record<string, any>;
  readonly cookies?: Record<string, any>;
  readonly headers?: Record<string, any>;
  readonly query?: Record<string, any>;
  readonly formData?: Record<string, any>;
  readonly body?: any;
  readonly mediaType?: string;
  readonly responseHeader?: string;
  readonly errors?: Record<number, string>;
};
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
declare class CancelError extends Error {
  constructor(message: string);
  get isCancelled(): boolean;
}
interface OnCancel {
  readonly isResolved: boolean;
  readonly isRejected: boolean;
  readonly isCancelled: boolean;
  (cancelHandler: () => void): void;
}
declare class CancelablePromise<T> implements Promise<T> {
  readonly [Symbol.toStringTag]: string;
  private _isResolved;
  private _isRejected;
  private _isCancelled;
  private readonly _cancelHandlers;
  private readonly _promise;
  private _resolve?;
  private _reject?;
  constructor(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void,
      onCancel: OnCancel
    ) => void
  );
  then<TResult1 = T, TResult2 = never>(
    onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2>;
  catch<TResult = never>(
    onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null
  ): Promise<T | TResult>;
  finally(onFinally?: (() => void) | null): Promise<T>;
  cancel(): void;
  get isCancelled(): boolean;
}
type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;
type OpenAPIConfig = {
  BASE: string;
  VERSION: string;
  WITH_CREDENTIALS: boolean;
  CREDENTIALS: "include" | "omit" | "same-origin";
  TOKEN?: string | Resolver<string>;
  USERNAME?: string | Resolver<string>;
  PASSWORD?: string | Resolver<string>;
  HEADERS?: Headers | Resolver<Headers>;
  ENCODE_PATH?: (path: string) => string;
};
declare const OpenAPI: OpenAPIConfig;
declare abstract class BaseHttpRequest {
  readonly config: OpenAPIConfig;
  constructor(config: OpenAPIConfig);
  abstract request<T>(options: ApiRequestOptions): CancelablePromise<T>;
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
type BasicBehavior = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 行为类型
   */
  mainType: BasicBehavior.mainType;
  /**
   * 子行为类型
   */
  subType: BasicBehavior.subType;
  /**
   * 开始时间
   */
  startTime: number;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 用户ID
   */
  userID: string;
  /**
   * 指标数值
   */
  value: number;
};
declare namespace BasicBehavior {
  /**
   * 行为类型
   */
  enum mainType {
    BasicBehavior = 1,
    ClickBehavior = 2,
    PageSkipBehavior = 3,
    RoutingSkipBehavior = 4,
  }
  /**
   * 子行为类型
   */
  enum subType {
    PV = 1001,
    UV = 1002,
    PageDwellTime = 1003,
    PageAccessDepth = 1004,
    ClickBehavior = 2001,
    PageSkipBehavior = 3001,
    RoutingSkipBehavior = 4001,
  }
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
type BasicIndicator = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 指标类型
   */
  mainType: BasicIndicator.mainType;
  /**
   * 子指标类型
   */
  subType: BasicIndicator.subType;
  /**
   * 开始时间
   */
  startTime: number;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 用户ID
   */
  userID: string;
  /**
   * 指标数值
   */
  value: number;
};
declare namespace BasicIndicator {
  /**
   * 指标类型
   */
  enum mainType {
    Performance = 1,
    LoadIndicator = 2,
    DrawIndicator = 3,
    OperationIndicator = 4,
    InterfaceIndicator = 5,
    ResourceIndicator = 6,
  }
  /**
   * 子指标类型
   */
  enum subType {
    FirstPaint = 1001,
    FirstContentfulPaint = 1002,
    LargestContentfulPaint = 1003,
    LayoutShift = 1004,
    DOMContentLoaded = 2001,
    FullLoad = 2002,
    FirstScreenLoad = 3001,
    FramesPerSecond = 4001,
    RouterLoadTime = 4002,
    InterfaceIndicator = 5001,
    ResourceIndicator = 6001,
  }
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
type ClickBehavior = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 行为类型
   */
  mainType: ClickBehavior.mainType;
  /**
   * 子行为类型
   */
  subType: ClickBehavior.subType;
  /**
   * 开始时间
   */
  startTime: number;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 用户ID
   */
  userID: string;
  /**
   * 点击位置距离页面左端距离
   */
  left: number;
  /**
   * 点击位置距离页面顶端距离
   */
  top: number;
  /**
   * 点击对象
   */
  target: string;
  /**
   * 页面结构
   */
  html: string;
  /**
   * 内部文本
   */
  inner: string;
};
declare namespace ClickBehavior {
  /**
   * 行为类型
   */
  enum mainType {
    BasicBehavior = 1,
    ClickBehavior = 2,
    PageSkipBehavior = 3,
    RoutingSkipBehavior = 4,
  }
  /**
   * 子行为类型
   */
  enum subType {
    PV = 1001,
    UV = 1002,
    PageDwellTime = 1003,
    PageAccessDepth = 1004,
    ClickBehavior = 2001,
    PageSkipBehavior = 3001,
    RoutingSkipBehavior = 4001,
  }
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
type InterfaceIndicator = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 指标类型
   */
  mainType: InterfaceIndicator.mainType;
  /**
   * 子指标类型
   */
  subType: InterfaceIndicator.subType;
  /**
   * 开始时间
   */
  startTime: number;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 用户ID
   */
  userID: string;
  /**
   * 状态编码
   */
  statusCode: number;
  /**
   * 请求方法
   */
  method: string;
  /**
   * 接口耗时
   */
  duration: number;
  /**
   * 接口地址
   */
  url: string;
  /**
   * 接口数据
   */
  data: string;
};
declare namespace InterfaceIndicator {
  /**
   * 指标类型
   */
  enum mainType {
    Performance = 1,
    LoadIndicator = 2,
    DrawIndicator = 3,
    OperationIndicator = 4,
    InterfaceIndicator = 5,
    ResourceIndicator = 6,
  }
  /**
   * 子指标类型
   */
  enum subType {
    FirstPaint = 1001,
    FirstContentfulPaint = 1002,
    LargestContentfulPaint = 1003,
    LayoutShift = 1004,
    DOMContentLoaded = 2001,
    FullLoad = 2002,
    FirstScreenLoad = 3001,
    FramesPerSecond = 4001,
    RouterLoadTime = 4002,
    InterfaceIndicator = 5001,
    ResourceIndicator = 6001,
  }
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
type JavaScriptError = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 错误类型
   */
  mainType: JavaScriptError.mainType;
  /**
   * 子错误类型
   */
  subType: JavaScriptError.subType;
  /**
   * 错误时间
   */
  errorTime: number;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 用户ID
   */
  userID: string;
  /**
   * 文件路径
   */
  url: string;
  /**
   * 错误消息
   */
  msg: string;
  /**
   * 错误行号
   */
  line: number;
  /**
   * 错误列号
   */
  column: number;
  /**
   * 错误调用堆栈
   */
  stack: string;
};
declare namespace JavaScriptError {
  /**
   * 错误类型
   */
  enum mainType {
    ResourceError = 1,
    JavaScriptError = 2,
    PromiseError = 3,
    VueError = 4,
  }
  /**
   * 子错误类型
   */
  enum subType {
    ResourceError = 1001,
    JavaScriptError = 2001,
    PromiseError = 3001,
    VueError = 4001,
  }
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
type PageSkipBehavior = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 行为类型
   */
  mainType: PageSkipBehavior.mainType;
  /**
   * 子行为类型
   */
  subType: PageSkipBehavior.subType;
  /**
   * 开始时间
   */
  startTime: number;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 用户ID
   */
  userID: string;
  /**
   * 路由跳转起步位置
   */
  from: string;
  /**
   * 路由跳转目的位置
   */
  to: string;
};
declare namespace PageSkipBehavior {
  /**
   * 行为类型
   */
  enum mainType {
    BasicBehavior = 1,
    ClickBehavior = 2,
    PageSkipBehavior = 3,
    RoutingSkipBehavior = 4,
  }
  /**
   * 子行为类型
   */
  enum subType {
    PV = 1001,
    UV = 1002,
    PageDwellTime = 1003,
    PageAccessDepth = 1004,
    ClickBehavior = 2001,
    PageSkipBehavior = 3001,
    RoutingSkipBehavior = 4001,
  }
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
type PromiseError = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 错误类型
   */
  mainType: PromiseError.mainType;
  /**
   * 子错误类型
   */
  subType: PromiseError.subType;
  /**
   * 错误时间
   */
  errorTime: number;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 用户ID
   */
  userID: string;
  /**
   * 错误消息
   */
  msg: string;
  /**
   * 错误堆栈
   */
  stack: string;
};
declare namespace PromiseError {
  /**
   * 错误类型
   */
  enum mainType {
    ResourceError = 1,
    JavaScriptError = 2,
    PromiseError = 3,
    VueError = 4,
  }
  /**
   * 子错误类型
   */
  enum subType {
    ResourceError = 1001,
    JavaScriptError = 2001,
    PromiseError = 3001,
    VueError = 4001,
  }
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
type ResourceError = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 错误类型
   */
  mainType: ResourceError.mainType;
  /**
   * 子错误类型
   */
  subType: ResourceError.subType;
  /**
   * 错误时间
   */
  errorTime: number;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 用户ID
   */
  userID: string;
  /**
   * eg：js、css、img、audio
   */
  resourceType: string;
  /**
   * 页面结构
   */
  html: string;
  /**
   * 资源路径
   */
  path: string;
};
declare namespace ResourceError {
  /**
   * 错误类型
   */
  enum mainType {
    ResourceError = 1,
    JavaScriptError = 2,
    PromiseError = 3,
    VueError = 4,
  }
  /**
   * 子错误类型
   */
  enum subType {
    ResourceError = 1001,
    JavaScriptError = 2001,
    PromiseError = 3001,
    VueError = 4001,
  }
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
type ResourceIndicator = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 指标类型
   */
  mainType: ResourceIndicator.mainType;
  /**
   * 子指标类型
   */
  subType: ResourceIndicator.subType;
  /**
   * 开始时间
   */
  startTime: number;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 用户ID
   */
  userID: string;
  /**
   * 资源路径
   */
  url: string;
  /**
   * 加载耗时
   */
  duration: number;
  /**
   * DNS耗时
   */
  dns: number;
  /**
   * TCP耗时
   */
  tcp: number;
  /**
   * 重定向耗时
   */
  redirect: number;
  /**
   * 首字节时间
   */
  ttfb: number;
  /**
   * 请求协议
   */
  protocol: string;
  /**
   * 内容大小
   */
  bodySize: number;
  /**
   * 标头大小
   */
  headerSize: number;
  /**
   * 资源大小
   */
  resourceSize: number;
  /**
   * 命中缓存
   */
  isCache: boolean;
};
declare namespace ResourceIndicator {
  /**
   * 指标类型
   */
  enum mainType {
    Performance = 1,
    LoadIndicator = 2,
    DrawIndicator = 3,
    OperationIndicator = 4,
    InterfaceIndicator = 5,
    ResourceIndicator = 6,
  }
  /**
   * 子指标类型
   */
  enum subType {
    FirstPaint = 1001,
    FirstContentfulPaint = 1002,
    LargestContentfulPaint = 1003,
    LayoutShift = 1004,
    DOMContentLoaded = 2001,
    FullLoad = 2002,
    FirstScreenLoad = 3001,
    FramesPerSecond = 4001,
    RouterLoadTime = 4002,
    InterfaceIndicator = 5001,
    ResourceIndicator = 6001,
  }
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
type RoutingSkipBehavior = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 行为类型
   */
  mainType: RoutingSkipBehavior.mainType;
  /**
   * 子行为类型
   */
  subType: RoutingSkipBehavior.subType;
  /**
   * 开始时间
   */
  startTime: number;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 用户ID
   */
  userID: string;
  /**
   * 路由跳转起步位置
   */
  from: string;
  /**
   * 路由跳转目的位置
   */
  to: string;
  /**
   * 路径参数
   */
  params: string;
  /**
   * 查询参数
   */
  query: string;
};
declare namespace RoutingSkipBehavior {
  /**
   * 行为类型
   */
  enum mainType {
    BasicBehavior = 1,
    ClickBehavior = 2,
    PageSkipBehavior = 3,
    RoutingSkipBehavior = 4,
  }
  /**
   * 子行为类型
   */
  enum subType {
    PV = 1001,
    UV = 1002,
    PageDwellTime = 1003,
    PageAccessDepth = 1004,
    ClickBehavior = 2001,
    PageSkipBehavior = 3001,
    RoutingSkipBehavior = 4001,
  }
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
type VueError = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 错误类型
   */
  mainType: VueError.mainType;
  /**
   * 子错误类型
   */
  subType: VueError.subType;
  /**
   * 错误时间
   */
  errorTime: number;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 用户ID
   */
  userID: string;
  /**
   * 错误堆栈
   */
  stack: string;
};
declare namespace VueError {
  /**
   * 错误类型
   */
  enum mainType {
    ResourceError = 1,
    JavaScriptError = 2,
    PromiseError = 3,
    VueError = 4,
  }
  /**
   * 子错误类型
   */
  enum subType {
    ResourceError = 1001,
    JavaScriptError = 2001,
    PromiseError = 3001,
    VueError = 4001,
  }
}
declare class Service {
  readonly httpRequest: BaseHttpRequest;
  constructor(httpRequest: BaseHttpRequest);
  /**
   * 基础指标上传
   * @returns any 成功
   * @throws ApiError
   */
  postPerformancesBasicindicators({
    requestBody,
  }: {
    requestBody?: Array<BasicIndicator>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }>;
  /**
   * 基础指标查询
   * @returns any 成功
   * @throws ApiError
   */
  getPerformancesBasicindicators({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    size,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 页大小，eg：5
     */
    size?: number;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 基础指标列表
     */
    data: Array<{
      /**
       * 页面路径
       */
      pageUrl: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 用户列表
       */
      userList: Array<string>;
      /**
       * 影响页面数
       */
      pageCount: number;
      /**
       * 页面列表
       */
      pageList: Array<string>;
    }>;
  }>;
  /**
   * 接口指标上传
   * @returns any 成功
   * @throws ApiError
   */
  postPerformancesInterfaceindicators({
    requestBody,
  }: {
    requestBody?: Array<InterfaceIndicator>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }>;
  /**
   * 接口指标查询
   * @returns any 成功
   * @throws ApiError
   */
  getPerformancesInterfaceindicators({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    size,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 页大小，eg：5
     */
    size?: number;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 接口指标列表
     */
    data: Array<{
      /**
       * 接口路径
       */
      url: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 用户列表
       */
      userList: Array<string>;
      /**
       * 影响页面数
       */
      pageCount: number;
      /**
       * 页面列表
       */
      pageList: Array<string>;
    }>;
  }>;
  /**
   * 资源指标上传
   * @returns any 成功
   * @throws ApiError
   */
  postPerformancesResourceindicators({
    requestBody,
  }: {
    requestBody?: Array<ResourceIndicator>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }>;
  /**
   * 资源指标查询
   * @returns any 成功
   * @throws ApiError
   */
  getPerformancesResourceindicators({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    size,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 页大小，eg：5
     */
    size?: number;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 资源指标列表
     */
    data: Array<{
      /**
       * 资源路径
       */
      url: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 用户列表
       */
      userList: Array<string>;
      /**
       * 影响页面数
       */
      pageCount: number;
      /**
       * 页面列表
       */
      pageList: Array<string>;
    }>;
  }>;
  /**
   * 资源错误上传
   * @returns any 成功
   * @throws ApiError
   */
  postErrorsResourceerrors({
    requestBody,
  }: {
    requestBody?: Array<ResourceError>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }>;
  /**
   * 资源错误查询
   * @returns any 成功
   * @throws ApiError
   */
  getErrorsResourceerrors({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    size,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 页大小，eg：5
     */
    size?: number;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    data: Array<{
      /**
       * 资源路径
       */
      url: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 用户列表
       */
      userList: Array<string>;
      /**
       * 影响页面数
       */
      pageCount: number;
      /**
       * 页面列表
       */
      pageList: Array<string>;
    }>;
  }>;
  /**
   * 基础指标统计
   * @returns any 成功
   * @throws ApiError
   */
  getPerformancesBasicindicatorstatistics({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 基础指标统计列表
     */
    data: Array<
      Array<{
        /**
         * 日期时间
         */
        dateTime: string;
        /**
         * 统计总数
         */
        count: number;
        /**
         * 平均值
         */
        average: number;
        /**
         * 影响用户数
         */
        userCount: number;
        /**
         * 影响页面数
         */
        pageCount: number;
      }>
    >;
  }>;
  /**
   * 接口指标统计
   * 暂时只统计慢接口
   * @returns any 成功
   * @throws ApiError
   */
  getPerformancesInterfaceindicatorstatistics({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    url,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 接口路径
     */
    url?: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 接口指标统计列表
     */
    data: Array<
      Array<{
        /**
         * 日期时间
         */
        dateTime: string;
        /**
         * 统计总数
         */
        count: number;
        /**
         * 平均值
         */
        average: number;
        /**
         * 影响用户数
         */
        userCount: number;
        /**
         * 影响页面数
         */
        pageCount: number;
      }>
    >;
  }>;
  /**
   * 资源指标统计
   * 暂时只统计慢资源
   * @returns any 成功
   * @throws ApiError
   */
  getPerformancesResourceindicatorstatistics({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 资源指标统计列表
     */
    data: Array<{
      /**
       * 日期时间
       */
      dateTime: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 影响页面数
       */
      pageCount: number;
    }>;
  }>;
  /**
   * 资源错误统计
   * @returns any 成功
   * @throws ApiError
   */
  getErrorsResourceerrorstatistics({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    url,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 资源路径
     */
    url?: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 资源错误统计列表
     */
    data: Array<{
      /**
       * 日期时间
       */
      dateTime: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 影响页面数
       */
      pageCount: number;
    }>;
  }>;
  /**
   * JavaScript错误上传
   * @returns any 成功
   * @throws ApiError
   */
  postErrorsJavascripterrors({
    requestBody,
  }: {
    requestBody?: Array<JavaScriptError>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }>;
  /**
   * JavaScript错误查询
   * @returns any 成功
   * @throws ApiError
   */
  getErrorsJavascripterrors({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    size,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 页大小，eg：5
     */
    size?: number;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    data: Array<{
      /**
       * 文件路径
       */
      url: string;
      /**
       * 错误消息
       */
      msg: string;
      /**
       * 错误行号
       */
      line: number;
      /**
       * 错误列号
       */
      column: number;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 用户列表
       */
      userList: Array<string>;
      /**
       * 影响页面数
       */
      pageCount: number;
      /**
       * 页面列表
       */
      pageList: Array<string>;
    }>;
  }>;
  /**
   * Promise错误上传
   * @returns any 成功
   * @throws ApiError
   */
  postErrorsPromiseerrors({
    requestBody,
  }: {
    requestBody?: Array<PromiseError>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }>;
  /**
   * Promise错误查询
   * @returns any 成功
   * @throws ApiError
   */
  getErrorsPromiseerrors({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    size,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 页大小，eg：5
     */
    size?: number;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    data: Array<{
      /**
       * 错误消息
       */
      msg: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 用户列表
       */
      userList: Array<string>;
      /**
       * 影响页面数
       */
      pageCount: number;
      /**
       * 页面列表
       */
      pageList: Array<string>;
    }>;
  }>;
  /**
   * Vue错误上传
   * @returns any 成功
   * @throws ApiError
   */
  postErrorsVueerrors({
    requestBody,
  }: {
    requestBody?: Array<VueError>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }>;
  /**
   * Vue错误查询
   * @returns any 成功
   * @throws ApiError
   */
  getErrorsVueerrors({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    size,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 页大小，eg：5
     */
    size?: number;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    data: {
      /**
       * Vue错误列表
       */
      items: Array<VueError>;
      /**
       * 总条数
       */
      totalCount: number;
    };
  }>;
  /**
   * JavaScript错误统计
   * @returns any 成功
   * @throws ApiError
   */
  getErrorsJavascripterrorstatistics({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    url,
    msg,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 文件地址
     */
    url?: string;
    /**
     * 错误信息
     */
    msg?: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * JS错误统计列表
     */
    data: Array<{
      /**
       * 日期时间
       */
      dateTime: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 影响页面数
       */
      pageCount: number;
    }>;
  }>;
  /**
   * Promise错误统计
   * @returns any 成功
   * @throws ApiError
   */
  getErrorsPromiseerrorstatistics({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    msg,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 错误消息
     */
    msg?: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * Promise错误统计列表
     */
    data: Array<{
      /**
       * 日期时间
       */
      dateTime: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 影响页面数
       */
      pageCount: number;
    }>;
  }>;
  /**
   * 基础行为上传
   * @returns any 成功
   * @throws ApiError
   */
  postBehaviorsBasicbehaviors({
    requestBody,
  }: {
    requestBody?: Array<BasicBehavior>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }>;
  /**
   * 基础行为查询
   * @returns any 成功
   * @throws ApiError
   */
  getBehaviorsBasicbehaviors({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    size,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 页大小，eg：5
     */
    size?: number;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    data: Array<{
      /**
       * 页面路径
       */
      pageUrl: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 用户列表
       */
      userList: Array<string>;
      /**
       * 影响页面数
       */
      pageCount: number;
      /**
       * 页面列表
       */
      pageList: Array<string>;
    }>;
  }>;
  /**
   * Vue错误统计
   * @returns any 成功
   * @throws ApiError
   */
  getErrorsVueerrorstatistics({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * Vue错误统计列表
     */
    data: Array<{
      /**
       * 日期时间
       */
      dateTime: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 影响页面数
       */
      pageCount: number;
    }>;
  }>;
  /**
   * 点击行为上传
   * @returns any 成功
   * @throws ApiError
   */
  postBehaviorsClickbehaviors({
    requestBody,
  }: {
    requestBody?: Array<ClickBehavior>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }>;
  /**
   * 点击行为查询
   * @returns any 成功
   * @throws ApiError
   */
  getBehaviorsClickbehaviors({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    size,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 页大小，eg：5
     */
    size?: number;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    data: Array<{
      /**
       * 点击目标
       */
      target: string;
      /**
       * 对象文本
       */
      inner: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 用户列表
       */
      userList: Array<string>;
      /**
       * 影响页面数
       */
      pageCount: number;
      /**
       * 页面列表
       */
      pageList: Array<string>;
    }>;
  }>;
  /**
   * 页面跳转行为上传
   * @returns any 成功
   * @throws ApiError
   */
  postBehaviorsPageskipbehaviors({
    requestBody,
  }: {
    requestBody?: Array<PageSkipBehavior>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }>;
  /**
   * 页面跳转行为查询
   * @returns any 成功
   * @throws ApiError
   */
  getBehaviorsPageskipbehaviors({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    size,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 页大小，eg：5
     */
    size?: number;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    data: Array<{
      /**
       * 起始页面
       */
      from: string;
      /**
       * 跳转页面
       */
      to: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 用户列表
       */
      userList: Array<string>;
      /**
       * 影响页面数
       */
      pageCount: number;
      /**
       * 页面列表
       */
      pageList: Array<string>;
    }>;
  }>;
  /**
   * 路由跳转行为上传
   * @returns any 成功
   * @throws ApiError
   */
  postBehaviorsRoutingskipbehaviors({
    requestBody,
  }: {
    requestBody?: Array<RoutingSkipBehavior>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }>;
  /**
   * 路由跳转行为查询
   * @returns any 成功
   * @throws ApiError
   */
  getBehaviorsRoutingskipbehaviors({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    size,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 页大小，eg：5
     */
    size?: number;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    data: Array<{
      /**
       * 起始页面
       */
      from: string;
      /**
       * 跳转页面
       */
      to: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 用户列表
       */
      userList: Array<string>;
      /**
       * 影响页面数
       */
      pageCount: number;
      /**
       * 页面列表
       */
      pageList: Array<string>;
    }>;
  }>;
  /**
   * 基础行为统计
   * @returns any 成功
   * @throws ApiError
   */
  getBehaviorsBasicbehaviorstatistics({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 基础行为统计列表
     */
    data: Array<{
      /**
       * 日期时间
       */
      dateTime: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 影响页面数
       */
      pageCount: number;
    }>;
  }>;
  /**
   * 接口错误统计
   * @returns any 成功
   * @throws ApiError
   */
  getErrorsInterfaceerrorstatistics({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    url,
    statusCode,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 接口请求路径
     */
    url?: string;
    /**
     * 错误状态码，eg：500，400
     */
    statusCode?: number;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 接口错误统计列表
     */
    data: Array<{
      /**
       * 日期时间
       */
      dateTime: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 影响页面数
       */
      pageCount: number;
    }>;
  }>;
  /**
   * 接口错误查询
   * @returns any 成功
   * @throws ApiError
   */
  getErrorsInterfaceerrors({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    size,
    statusCode,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 页大小，eg：5
     */
    size?: number;
    /**
     * 状态码，eg：400
     */
    statusCode?: number;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    data: Array<{
      /**
       * 接口路径
       */
      url: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 用户列表
       */
      userList: Array<string>;
      /**
       * 影响页面数
       */
      pageCount: number;
      /**
       * 页面列表
       */
      pageList: Array<string>;
    }>;
  }>;
  /**
   * 用户行为列表
   * 查询指定用户的行为列表
   * @returns any 成功
   * @throws ApiError
   */
  getBehaviorsUseraction({
    appId,
    userId,
    startTime,
    endTime,
  }: {
    /**
     * 应用appid
     */
    appId: string;
    /**
     * 用户id
     */
    userId: string;
    /**
     * 开始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Array<string>;
  }>;
}
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
declare class BeaApiClient {
  readonly service: Service;
  readonly request: BaseHttpRequest;
  constructor(
    config?: Partial<OpenAPIConfig>,
    HttpRequest?: HttpRequestConstructor
  );
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
type ApiResult = {
  readonly url: string;
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly body: any;
};
declare class ApiError extends Error {
  readonly url: string;
  readonly status: number;
  readonly statusText: string;
  readonly body: any;
  readonly request: ApiRequestOptions;
  constructor(request: ApiRequestOptions, response: ApiResult, message: string);
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
declare const $BasicBehavior: {
  readonly properties: {
    readonly appId: {
      readonly type: "string";
      readonly description: "\u5E94\u7528ID";
      readonly isRequired: true;
    };
    readonly mainType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly subType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly startTime: {
      readonly type: "number";
      readonly description: "\u5F00\u59CB\u65F6\u95F4";
      readonly isRequired: true;
    };
    readonly pageUrl: {
      readonly type: "string";
      readonly description: "\u9875\u9762\u8DEF\u5F84";
      readonly isRequired: true;
    };
    readonly userID: {
      readonly type: "string";
      readonly description: "\u7528\u6237ID";
      readonly isRequired: true;
    };
    readonly value: {
      readonly type: "number";
      readonly description: "\u6307\u6807\u6570\u503C";
      readonly isRequired: true;
    };
  };
};
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
declare const $BasicIndicator: {
  readonly properties: {
    readonly appId: {
      readonly type: "string";
      readonly description: "\u5E94\u7528ID";
      readonly isRequired: true;
    };
    readonly mainType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly subType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly startTime: {
      readonly type: "number";
      readonly description: "\u5F00\u59CB\u65F6\u95F4";
      readonly isRequired: true;
    };
    readonly pageUrl: {
      readonly type: "string";
      readonly description: "\u9875\u9762\u8DEF\u5F84";
      readonly isRequired: true;
    };
    readonly userID: {
      readonly type: "string";
      readonly description: "\u7528\u6237ID";
      readonly isRequired: true;
    };
    readonly value: {
      readonly type: "number";
      readonly description: "\u6307\u6807\u6570\u503C";
      readonly isRequired: true;
    };
  };
};
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
declare const $ClickBehavior: {
  readonly properties: {
    readonly appId: {
      readonly type: "string";
      readonly description: "\u5E94\u7528ID";
      readonly isRequired: true;
    };
    readonly mainType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly subType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly startTime: {
      readonly type: "number";
      readonly description: "\u5F00\u59CB\u65F6\u95F4";
      readonly isRequired: true;
    };
    readonly pageUrl: {
      readonly type: "string";
      readonly description: "\u9875\u9762\u8DEF\u5F84";
      readonly isRequired: true;
    };
    readonly userID: {
      readonly type: "string";
      readonly description: "\u7528\u6237ID";
      readonly isRequired: true;
    };
    readonly left: {
      readonly type: "number";
      readonly description: "\u70B9\u51FB\u4F4D\u7F6E\u8DDD\u79BB\u9875\u9762\u5DE6\u7AEF\u8DDD\u79BB";
      readonly isRequired: true;
    };
    readonly top: {
      readonly type: "number";
      readonly description: "\u70B9\u51FB\u4F4D\u7F6E\u8DDD\u79BB\u9875\u9762\u9876\u7AEF\u8DDD\u79BB";
      readonly isRequired: true;
    };
    readonly target: {
      readonly type: "string";
      readonly description: "\u70B9\u51FB\u5BF9\u8C61";
      readonly isRequired: true;
    };
    readonly html: {
      readonly type: "string";
      readonly description: "\u9875\u9762\u7ED3\u6784";
      readonly isRequired: true;
    };
    readonly inner: {
      readonly type: "string";
      readonly description: "\u5185\u90E8\u6587\u672C";
      readonly isRequired: true;
    };
  };
};
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
declare const $InterfaceIndicator: {
  readonly properties: {
    readonly appId: {
      readonly type: "string";
      readonly description: "\u5E94\u7528ID";
      readonly isRequired: true;
    };
    readonly mainType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly subType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly startTime: {
      readonly type: "number";
      readonly description: "\u5F00\u59CB\u65F6\u95F4";
      readonly isRequired: true;
    };
    readonly pageUrl: {
      readonly type: "string";
      readonly description: "\u9875\u9762\u8DEF\u5F84";
      readonly isRequired: true;
    };
    readonly userID: {
      readonly type: "string";
      readonly description: "\u7528\u6237ID";
      readonly isRequired: true;
    };
    readonly statusCode: {
      readonly type: "number";
      readonly description: "\u72B6\u6001\u7F16\u7801";
      readonly isRequired: true;
    };
    readonly method: {
      readonly type: "string";
      readonly description: "\u8BF7\u6C42\u65B9\u6CD5";
      readonly isRequired: true;
    };
    readonly duration: {
      readonly type: "number";
      readonly description: "\u63A5\u53E3\u8017\u65F6";
      readonly isRequired: true;
    };
    readonly url: {
      readonly type: "string";
      readonly description: "\u63A5\u53E3\u5730\u5740";
      readonly isRequired: true;
    };
    readonly data: {
      readonly type: "string";
      readonly description: "\u63A5\u53E3\u6570\u636E";
      readonly isRequired: true;
    };
  };
};
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
declare const $JavaScriptError: {
  readonly properties: {
    readonly appId: {
      readonly type: "string";
      readonly description: "\u5E94\u7528ID";
      readonly isRequired: true;
    };
    readonly mainType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly subType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly errorTime: {
      readonly type: "number";
      readonly description: "\u9519\u8BEF\u65F6\u95F4";
      readonly isRequired: true;
    };
    readonly pageUrl: {
      readonly type: "string";
      readonly description: "\u9875\u9762\u8DEF\u5F84";
      readonly isRequired: true;
    };
    readonly userID: {
      readonly type: "string";
      readonly description: "\u7528\u6237ID";
      readonly isRequired: true;
    };
    readonly url: {
      readonly type: "string";
      readonly description: "\u6587\u4EF6\u8DEF\u5F84";
      readonly isRequired: true;
    };
    readonly msg: {
      readonly type: "string";
      readonly description: "\u9519\u8BEF\u6D88\u606F";
      readonly isRequired: true;
    };
    readonly line: {
      readonly type: "number";
      readonly description: "\u9519\u8BEF\u884C\u53F7";
      readonly isRequired: true;
    };
    readonly column: {
      readonly type: "number";
      readonly description: "\u9519\u8BEF\u5217\u53F7";
      readonly isRequired: true;
    };
    readonly stack: {
      readonly type: "string";
      readonly description: "\u9519\u8BEF\u8C03\u7528\u5806\u6808";
      readonly isRequired: true;
    };
  };
};
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
declare const $PageSkipBehavior: {
  readonly properties: {
    readonly appId: {
      readonly type: "string";
      readonly description: "\u5E94\u7528ID";
      readonly isRequired: true;
    };
    readonly mainType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly subType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly startTime: {
      readonly type: "number";
      readonly description: "\u5F00\u59CB\u65F6\u95F4";
      readonly isRequired: true;
    };
    readonly pageUrl: {
      readonly type: "string";
      readonly description: "\u9875\u9762\u8DEF\u5F84";
      readonly isRequired: true;
    };
    readonly userID: {
      readonly type: "string";
      readonly description: "\u7528\u6237ID";
      readonly isRequired: true;
    };
    readonly from: {
      readonly type: "string";
      readonly description: "\u8DEF\u7531\u8DF3\u8F6C\u8D77\u6B65\u4F4D\u7F6E";
      readonly isRequired: true;
    };
    readonly to: {
      readonly type: "string";
      readonly description: "\u8DEF\u7531\u8DF3\u8F6C\u76EE\u7684\u4F4D\u7F6E";
      readonly isRequired: true;
    };
  };
};
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
declare const $PromiseError: {
  readonly properties: {
    readonly appId: {
      readonly type: "string";
      readonly description: "\u5E94\u7528ID";
      readonly isRequired: true;
    };
    readonly mainType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly subType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly errorTime: {
      readonly type: "number";
      readonly description: "\u9519\u8BEF\u65F6\u95F4";
      readonly isRequired: true;
    };
    readonly pageUrl: {
      readonly type: "string";
      readonly description: "\u9875\u9762\u8DEF\u5F84";
      readonly isRequired: true;
    };
    readonly userID: {
      readonly type: "string";
      readonly description: "\u7528\u6237ID";
      readonly isRequired: true;
    };
    readonly msg: {
      readonly type: "string";
      readonly description: "\u9519\u8BEF\u6D88\u606F";
      readonly isRequired: true;
    };
    readonly stack: {
      readonly type: "string";
      readonly description: "\u9519\u8BEF\u5806\u6808";
      readonly isRequired: true;
    };
  };
};
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
declare const $ResourceError: {
  readonly properties: {
    readonly appId: {
      readonly type: "string";
      readonly description: "\u5E94\u7528ID";
      readonly isRequired: true;
    };
    readonly mainType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly subType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly errorTime: {
      readonly type: "number";
      readonly description: "\u9519\u8BEF\u65F6\u95F4";
      readonly isRequired: true;
    };
    readonly pageUrl: {
      readonly type: "string";
      readonly description: "\u9875\u9762\u8DEF\u5F84";
      readonly isRequired: true;
    };
    readonly userID: {
      readonly type: "string";
      readonly description: "\u7528\u6237ID";
      readonly isRequired: true;
    };
    readonly resourceType: {
      readonly type: "string";
      readonly description: "eg\uFF1Ajs\u3001css\u3001img\u3001audio";
      readonly isRequired: true;
    };
    readonly html: {
      readonly type: "string";
      readonly description: "\u9875\u9762\u7ED3\u6784";
      readonly isRequired: true;
    };
    readonly path: {
      readonly type: "string";
      readonly description: "\u8D44\u6E90\u8DEF\u5F84";
      readonly isRequired: true;
    };
  };
};
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
declare const $ResourceIndicator: {
  readonly properties: {
    readonly appId: {
      readonly type: "string";
      readonly description: "\u5E94\u7528ID";
      readonly isRequired: true;
    };
    readonly mainType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly subType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly startTime: {
      readonly type: "number";
      readonly description: "\u5F00\u59CB\u65F6\u95F4";
      readonly isRequired: true;
    };
    readonly pageUrl: {
      readonly type: "string";
      readonly description: "\u9875\u9762\u8DEF\u5F84";
      readonly isRequired: true;
    };
    readonly userID: {
      readonly type: "string";
      readonly description: "\u7528\u6237ID";
      readonly isRequired: true;
    };
    readonly url: {
      readonly type: "string";
      readonly description: "\u8D44\u6E90\u8DEF\u5F84";
      readonly isRequired: true;
    };
    readonly duration: {
      readonly type: "number";
      readonly description: "\u52A0\u8F7D\u8017\u65F6";
      readonly isRequired: true;
    };
    readonly dns: {
      readonly type: "number";
      readonly description: "DNS\u8017\u65F6";
      readonly isRequired: true;
    };
    readonly tcp: {
      readonly type: "number";
      readonly description: "TCP\u8017\u65F6";
      readonly isRequired: true;
    };
    readonly redirect: {
      readonly type: "number";
      readonly description: "\u91CD\u5B9A\u5411\u8017\u65F6";
      readonly isRequired: true;
    };
    readonly ttfb: {
      readonly type: "number";
      readonly description: "\u9996\u5B57\u8282\u65F6\u95F4";
      readonly isRequired: true;
    };
    readonly protocol: {
      readonly type: "string";
      readonly description: "\u8BF7\u6C42\u534F\u8BAE";
      readonly isRequired: true;
    };
    readonly bodySize: {
      readonly type: "number";
      readonly description: "\u5185\u5BB9\u5927\u5C0F";
      readonly isRequired: true;
    };
    readonly headerSize: {
      readonly type: "number";
      readonly description: "\u6807\u5934\u5927\u5C0F";
      readonly isRequired: true;
    };
    readonly resourceSize: {
      readonly type: "number";
      readonly description: "\u8D44\u6E90\u5927\u5C0F";
      readonly isRequired: true;
    };
    readonly isCache: {
      readonly type: "boolean";
      readonly description: "\u547D\u4E2D\u7F13\u5B58";
      readonly isRequired: true;
    };
  };
};
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
declare const $RoutingSkipBehavior: {
  readonly properties: {
    readonly appId: {
      readonly type: "string";
      readonly description: "\u5E94\u7528ID";
      readonly isRequired: true;
    };
    readonly mainType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly subType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly startTime: {
      readonly type: "number";
      readonly description: "\u5F00\u59CB\u65F6\u95F4";
      readonly isRequired: true;
    };
    readonly pageUrl: {
      readonly type: "string";
      readonly description: "\u9875\u9762\u8DEF\u5F84";
      readonly isRequired: true;
    };
    readonly userID: {
      readonly type: "string";
      readonly description: "\u7528\u6237ID";
      readonly isRequired: true;
    };
    readonly from: {
      readonly type: "string";
      readonly description: "\u8DEF\u7531\u8DF3\u8F6C\u8D77\u6B65\u4F4D\u7F6E";
      readonly isRequired: true;
    };
    readonly to: {
      readonly type: "string";
      readonly description: "\u8DEF\u7531\u8DF3\u8F6C\u76EE\u7684\u4F4D\u7F6E";
      readonly isRequired: true;
    };
    readonly params: {
      readonly type: "string";
      readonly description: "\u8DEF\u5F84\u53C2\u6570";
      readonly isRequired: true;
    };
    readonly query: {
      readonly type: "string";
      readonly description: "\u67E5\u8BE2\u53C2\u6570";
      readonly isRequired: true;
    };
  };
};
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
declare const $VueError: {
  readonly properties: {
    readonly appId: {
      readonly type: "string";
      readonly description: "\u5E94\u7528ID";
      readonly isRequired: true;
    };
    readonly mainType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly subType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly errorTime: {
      readonly type: "number";
      readonly description: "\u9519\u8BEF\u65F6\u95F4";
      readonly isRequired: true;
    };
    readonly pageUrl: {
      readonly type: "string";
      readonly description: "\u9875\u9762\u8DEF\u5F84";
      readonly isRequired: true;
    };
    readonly userID: {
      readonly type: "string";
      readonly description: "\u7528\u6237ID";
      readonly isRequired: true;
    };
    readonly stack: {
      readonly type: "string";
      readonly description: "\u9519\u8BEF\u5806\u6808";
      readonly isRequired: true;
    };
  };
};
export {
  BeaApiClient,
  ApiError,
  BaseHttpRequest,
  CancelablePromise,
  CancelError,
  OpenAPI,
  BasicBehavior,
  BasicIndicator,
  ClickBehavior,
  InterfaceIndicator,
  JavaScriptError,
  PageSkipBehavior,
  PromiseError,
  ResourceError,
  ResourceIndicator,
  RoutingSkipBehavior,
  VueError,
  $BasicBehavior,
  $BasicIndicator,
  $ClickBehavior,
  $InterfaceIndicator,
  $JavaScriptError,
  $PageSkipBehavior,
  $PromiseError,
  $ResourceError,
  $ResourceIndicator,
  $RoutingSkipBehavior,
  $VueError,
  Service,
};
export type { OpenAPIConfig };
