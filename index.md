---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Nostr!moe"
  text: "消息视图主导的社区"
  tagline: 由自由的分布式社交媒体协议 Nostr 驱动
  image:
    src: /logo-mini.svg
    alt: VitePress
  actions:
    - theme: brand
      text: 快速开始
      link: /start/
    - theme: alt
      text: 为什么是 Nostr?
      link: /start/why-nostr/

features:
  - title: 🌐分布式
    details: 最小单位细分到具体用户, 由社区提供核心节点, 成员选择提供附属节点. 网络重建难度低于 BitTorrent. 但生态依旧取决于人, 因为也会「死种」.
  - title: 🪪可移植身份
    details: 密钥对为基础的身份系统, 用户不再同服务器和域名绑定, 因此身份标识也不再人类可读.
  - title: 📂可移植内容
    details: 服务器不再默认互相通讯, 而是按需同步与获取用户内容, 内容默认共享, 全球镜像. 但也将导致声明式消息删除也需要覆盖全球才能起效, 和 GPG 密钥吊销类似.
  - title: 🤓新手不友好
    details: 安全责任完全转嫁给用户. 仅适合具有良好密钥管理和信息安全意识的「书呆子」, 和 GPG 一样反人类.
  - title: 💰经济环保
    details: 只需 512MB 内存即可运行核心服务器, 1GB 磁盘可存储 40 万条带全文索引的内容. 我的上帝, 实在是太环保了. 但我绝对不会告诉你这是纯文本, 因为发二进制需要用户自己负责.
  - title: 🙂抗审查
    details: 别激动, 只是用户才能真正声明删除自己的内容而已. 大多核心基础设施不提供匿名服务, 因为你应该也知道, 社交媒体的垃圾消息和网络滥用形势比内容审查还要严峻.
---
