---
description: Nostr!moe 社区为社区成员提供的 Nostr 相关设施一览.
editLink: true
layout: doc
navbar: true
sidebar: false
aside: true
---

# 社区设施

::: warning
社区基础设施只会优先提供给社区成员使用, 我们不会保证我的的服务在整个 Nostr 网络中都广泛可用, 这是基于我们有限的计算资源而做出的选择. 因此社区管理员和社区设施管理员保有将这些设施限定为仅社区和社区成员访问的权利, 并且会定期监测使用状况并抗击滥用者.
:::

Nostr!moe 提供一系列 Nostr 基础设施以组成社区, 并将其提供给社区成员使用, 以此强化社区的活力并为社区成员提供便利地参与 Nostr 网络的途径.

你可以通过下方或者本站页脚中的运行状态页查看这些设施的在线状态:

> <https://status.nostr.moe>

## 门户

- **客户端**:
  1. **常规版**: `https://nostr.moe`
    > 基于 Nostr Web 客户端 Jumble 定制的社区客户端, 以简洁实用为主, 适合新手.
  2. **专业版**: `https://pro.nostr.moe`
    > 基于 Nostr Web 客户端 noStrudel 定制的社区客户端, 以全能和专业化 Nostr 协议调试为特色, 适合专业用户.
- **社区文档**: `https://join.nostr.moe`
  > 提供社区引导和指南的知识库及文档库, 也用做外部链接 Nostr!moe 的着陆页.

## 中继

- **社区中继**: `wss://relay.nostr.moe`
  > 用于保存社区人类成员的消息而设置的中继, 使用事件公钥白名单, 支持全文搜索.
- **资讯中继**:
  1. **中文新闻 - 主节点**: `wss://relay.stream`
    > 用于保存社区自动化资讯中的 "中文新闻" 类目而设置的中继, 使用事件公钥白名单, 支持全文搜索.
  2. **中文新闻 - 子节点**: `wss://news-zh-node2.relay.stream`
    > 同上, 备用节点.
- **影子中继**: `wss://shadow.relay.stream`
  > 用于 NIP-46 设施的[专用中继](/start/become-hacker/remote-signer/#shadow-relay), 只允许 `kind:24133` 事件进入且只会短暂保存.
- **开发沙盒中继**: `wss://dev.relay.stream`
  > 用于社区开发用途的 Nostr 中继沙盒, 数据库会在一段时间后自动销毁.

## 组件

- **NoAuth**: `https://noauth.nostr.moe`
  > 社区管理员提供的自托管版本 [nsec.app](https://github.com/nostrband/noauth), 作为托管式远程签名器提供给社区成员.
