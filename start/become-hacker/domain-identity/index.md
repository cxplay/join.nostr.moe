---
description: 设置自己的域名为 Nostr 域名身份标识(NIP-05).
editLink: true
layout: doc
navbar: true
sidebar: true
aside: true
---

# 设置域名身份标识 {#setup-domain-identity}

Nostr 的用户身份由公钥标识, 换来了大量的优势特性, 比如: 完全去中心化, 全局唯一, 可移植和抗审查等特性. 但这是牺牲了人类可读性换来的, 也就是说 Nostr 的公钥标识对人类完全不友好. 为了切实存在的人类「可读」需求需要做出妥协, 所以 Nostr 有了允许将公钥「{映射|Map}」到域名的议定 "**NIP-05: 将 Nostr 密钥映射到基于 DNS 的互联网标识符**".

> [nips/05.md at master · nostr-protocol/nips](https://github.com/nostr-protocol/nips/blob/master/05.md)

这个议定允许使用类似 `user@example.com` 形式的标识符作为公钥的**别名**, 应用需要使用 DNS 和 HTTP 去查找其中的用户公钥, 然后将其转换为机器或应用内运算所需要的关键参数.

一些中继为了防止垃圾消息也会验证用户的元数据中的域名标识是否存在且有效, 比如 Nostr 的 Fediverse 协议桥 Mostr.pub 就要求用户通过协议桥之前必须将用户资料元数据首先广播到 Mostr.pub, 且需要包含有效的域名标识, 否则后续的用户签署的事件将无法进入这个中继, 这可以一定程度上抑制垃圾消息的跨网传播.

本篇将教导读者如何简单地将自己的域名设置为自己的身份标识, 除此之外还涉及 NIP-46 议定带来的扩展属性. 要注意, 包括本议定在内的 NIP-46 扩展属性都是**可选**的议定, 这意味着 Nostr 应用没有实现使用域名标识来作为用户的身份标识使用的责任, 公钥始终是 Nostr 用户的永久唯一身份标识, 域名标识仅仅只是可被选择支持的一种公钥标识的别名而已.

## nostr.json {#nostr-json-file}

如果读过了 NIP-05 议定的文档内容, 那么就会知道认证是如何实现的: **通过检查域名所属路径下的 `/.well-known/nostr.json` 的 JSON 结构查找到标签对应的公钥关系.**

比如检查一下 Nostr.moe 社区的标识认证文件:

```bash
curl https://nostr.moe/.well-known/nostr.json
```

得到结果:

```json
{
  "names": {
    "admin": "97eafcb1b8438d56d2a3309c6faf08ae61be618a65c87b6a295549ea773ac29d",
    "cxplay": "434f97993627f1e61f14eeaf60caa8cfdcec10a592caff8250c825252d548c15",
    "xtao": "32faf94b469aa90acf4b583df764c814efe1bae60fd3fc21b07de58713ae1187",
    "jixun": "90e3b53acc128f797efff8f285695aca03b2778ff10d601e41453fa46e947dd6"
  },
  "relays": {
    "97eafcb1b8438d56d2a3309c6faf08ae61be618a65c87b6a295549ea773ac29d": [
      "wss://relay.nostr.moe"
    ],
    "434f97993627f1e61f14eeaf60caa8cfdcec10a592caff8250c825252d548c15": [
      "wss://relay.cxplay.org"
    ]
  }
}
```

所以, 如果需要将一个**十六进制公钥** `xxxxx` 映射到域名 `user@example.com` 之上, 就只需要编写:

```json
{
  "names": {
    "user": "xxxxx"
  }
}
```

如果想要直接声明将根域名设置为标识, 比如实现 `@example.com` 的效果, 那么只需要将 name 设置下划线 `_` 即可:

::: info
实际的的显示效果需要取决于客户端.
:::

```json
{
  "names": {
    "_": "xxxxx"
  }
}
```

`relays` 是一个对象, 声明了公钥对应的元数据查询所须中继的偏好, 并不是必须的. 如果你想要设置, 那么就写为:

```json
{
  "names": {
    "user": "xxxxx"
  },
  "relays": {
    "xxxxx": [
      "wss://relay.damus.io"
    ]
  }
}
```

需要将 `wss://relay.damus.io` 所在的数组设置为确保能发现你的一个或者多个中继.

然后, 将编写好的 JSON 文件放入域名的 Web 服务器中, 确保它能够在 `/.well-known/nostr.json` 路径下被访问到即可.

## NIP-46 扩展 {#nip-46-extended}

:::tip
如果你不使用远程签名器, 或者你的应用不支持, 那么没有必要设置.
:::

NIP-46 的附录实现了让 Nostr 应用可以通过 NIP-05 标识查找到连接服务器中继去连接到远程签名器, 这个过程的用户体验就像是使用了 `user@example.com` 作为账户去登录一样, 十分经典.

> [Announcing remote-signer metadata - nips/46.md at master · nostr-protocol/nips](https://github.com/nostr-protocol/nips/blob/master/46.md#announcing-remote-signer-metadata)

这只需要在 `nostr.json` 文件中添加一个名为 `nip46` 对象即可:

```json
{
  "names": {
    "user": "xxxxx"
  },
  "relays": {
    "xxxxx": [
      "wss://relay.damus.io"
    ]
  },
  "nip46": {
    "relays": [
      "wss://relay.example.com"
    ],
    "nostrconnect_url": "https://remote-signer-domain.example/<nostrconnect>"
  }
}
```

其中的 `nostrconnect_url` 并不是必须的, 如果你的远程签名器并没有这样的接受 `nostrconnect` 传入的端点那么就不需要设置.

## 注意事项 {#notes}

### CORS {#browser-cors}

Nostr 网络有大量的 Web 客户端, 所以对于这个 `nostr.json` 文件一定要设置 `Access-Control-Allow-Origin` 标头以防止这些 Web 客户端由于浏览器的 CORS 策略限制导致无法访问到资源, 进而导致标识验证失败.

```text
Access-Control-Allow-Origin: *
```

### 重定向 {#http-redirect}

NIP-05 议定明确要求客户端不得跟随重定向, 所以 NIP-05 服务器也不能使用 301 和 302 在内的状态码实现标识代托管.

并且, 几乎所有的客户端会默认使用 HTTPS 协议去查询, 这也使得 NIP-05 标识服务器必须支持 HTTPS, 再加上上文的条件, 客户端查询从 HTTP 重定向到 HTTPS 也是不允许的.

### 大量标识托管 {#large-scale-identity-hosting}

如果一个域名需要承载的用户标识数量开始超过单个纯静态 JSON 分发所能承受的范围, 为了更好地管理, 查询和验证速度, 应该在 Web 服务器实现接受客户端发起的查询参数去选择性回应最小标识文件. 在议定中, 当前客户端不论 NIP-05 服务器是否支持动态参数查询, 都始终会使用如下的 URL 格式去获取标识关系:

```bash
curl https://example.com/.well-known/nostr.json?name=user
```

如上的 URL 预期应该只返回用户标识 `user@example.com` 的公钥关系对象和其他扩展, 本文主体章节描述的做法仅适用于**个人**或**小型社区**使用.
