/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
type ApiRequestOptions = {
    readonly method: "GET" | "PUT" | "POST" | "DELETE" | "OPTIONS" | "HEAD" | "PATCH";
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
    constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void, onCancel: OnCancel) => void);
    then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null, onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null): Promise<T | TResult>;
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
type UserInfo = {
    /**
     * 用户ID
     */
    userID: string;
    /**
     * 用户名称
     */
    name: string;
    /**
     * 头像地址
     */
    avatar: string;
};
declare class Service {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * 新增联系人
     * @returns any 成功
     * @throws ApiError
     */
    postContacts({ requestBody }: {
        requestBody?: {
            /**
             * 用户名称
             */
            name: string;
            /**
             * 头像地址
             */
            avatar: string;
        };
    }): CancelablePromise<{
        /**
         * 成功编码
         */
        code: number;
        /**
         * 成功描述
         */
        msg: string;
    }>;
    /**
     * 查询所有联系人
     * @returns UserInfo 成功
     * @throws ApiError
     */
    getContacts({ size, page, current, where, fields, sort }: {
        /**
         * 单页数量
         */
        size?: number;
        /**
         * 当前页数
         */
        page?: number;
        /**
         * 联系人ID
         */
        current?: string;
        /**
         * 查询条件
         */
        where?: any[];
        /**
         * 查询字段
         */
        fields?: any[];
        /**
         * 排序方式
         */
        sort?: any[];
    }): CancelablePromise<Array<UserInfo>>;
    /**
     * 删除联系人
     * @returns any 成功
     * @throws ApiError
     */
    deleteContacts({ contactId }: {
        /**
         * 联系人ID
         */
        contactId: string;
    }): CancelablePromise<{
        /**
         * 成功编码
         */
        code: number;
        /**
         * 成功描述
         */
        msg: string;
    }>;
    /**
     * 修改联系人
     * @returns any 成功
     * @throws ApiError
     */
    putContacts({ contactId, requestBody }: {
        /**
         * 联系人ID
         */
        contactId: string;
        requestBody?: {
            /**
             * 用户名称
             */
            name: string;
            /**
             * 头像地址
             */
            avatar: string;
        };
    }): CancelablePromise<{
        /**
         * 成功编码
         */
        code: number;
        /**
         * 成功描述
         */
        msg: string;
    }>;
    /**
     * 查询联系人
     * @returns UserInfo 成功
     * @throws ApiError
     */
    getContacts1({ contactId, fields }: {
        contactId: string;
        /**
         * 查询字段，数组
         */
        fields?: any[];
    }): CancelablePromise<UserInfo>;
}
declare class DefaultService {
    readonly httpRequest: BaseHttpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * 用户登录
     * @returns any 成功
     * @throws ApiError
     */
    postLogin({ requestBody }: {
        requestBody?: {
            /**
             * 用户名称
             */
            username: string;
            /**
             * 登录密码
             */
            password: string;
        };
    }): CancelablePromise<{
        /**
         * 登陆令牌
         */
        token: string;
        /**
         * 用户信息
         */
        userInfo: UserInfo;
    }>;
    /**
     * 用户注册
     * @returns any 成功
     * @throws ApiError
     */
    postRegister({ requestBody }: {
        requestBody?: {
            /**
             * 用户名称
             */
            username: string;
            /**
             * 登录密码
             */
            password: string;
        };
    }): CancelablePromise<{
        /**
         * 登陆令牌
         */
        token: string;
        /**
         * 用户信息
         */
        userInfo: UserInfo;
    }>;
}
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
declare class BeaApiClient {
    readonly service: Service;
    readonly default: DefaultService;
    readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest?: HttpRequestConstructor);
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
type Message = {
    /**
     * 发送时间
     */
    dateTime: string;
    /**
     * 消息类型
     */
    msgType: Message.msgType;
    /**
     * 消息内容
     */
    content: string;
    /**
     * 已读状态
     */
    readied: boolean;
};
declare namespace Message {
    /**
     * 消息类型
     */
    enum msgType {
        Text = 1,
        Image = 2,
        Audio = 3,
        Video = 4,
        File = 5
    }
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
declare const $Message: {
    readonly properties: {
        readonly dateTime: {
            readonly type: "string";
            readonly description: "\u53D1\u9001\u65F6\u95F4";
            readonly isRequired: true;
        };
        readonly msgType: {
            readonly type: "Enum";
            readonly isRequired: true;
        };
        readonly content: {
            readonly type: "string";
            readonly description: "\u6D88\u606F\u5185\u5BB9";
            readonly isRequired: true;
        };
        readonly readied: {
            readonly type: "boolean";
            readonly description: "\u5DF2\u8BFB\u72B6\u6001";
            readonly isRequired: true;
        };
    };
};
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
declare const $UserInfo: {
    readonly properties: {
        readonly userID: {
            readonly type: "string";
            readonly description: "\u7528\u6237ID";
            readonly isRequired: true;
        };
        readonly name: {
            readonly type: "string";
            readonly description: "\u7528\u6237\u540D\u79F0";
            readonly isRequired: true;
        };
        readonly avatar: {
            readonly type: "string";
            readonly description: "\u5934\u50CF\u5730\u5740";
            readonly isRequired: true;
        };
    };
};
export { BeaApiClient, ApiError, BaseHttpRequest, CancelablePromise, CancelError, OpenAPI, Message, $Message, $UserInfo, Service, DefaultService };
export type { OpenAPIConfig, UserInfo };
