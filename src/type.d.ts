type JConfigType = {
  /** 监听端口 */
  listen: number;
  /** https监听端口 */
  httpsListen?: number;
  /** https密钥路径 */
  httpsKeyUrl?: string;
  /** https证书路径 */
  httpsCrtUrl?: string;
};
