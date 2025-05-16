---
description: Nostr 常用操作.
editLink: true
layout: doc
navbar: true
sidebar: true
aside: true
---

# 常用操作 {#common-operations}

Nostr 是基于 JSON 事件的网络, 所有的操作都是一个 JSON 或者对 JSON 中的一个字段的 "增删查改", 所谓 "Nostr 事件" 就是对这些 JSON 的新建, 引用与覆盖.

## 提及与引用 {#mention-and-quote}

Nostr 对用户的提及使用 `p` 标签实现, 引用使用 `q` 标签实现, 但是人类用户不可能总是手动书写 JSON, 于是客户端(User-Agent)承担起了解析 Nostr 用户输入为 Nostr 事件的责任, 所以用户也就不再需要直接用这些标签. 现在的 Nostr 客户端中, 如果用户需要在一个帖子中提及一个用户则需要使用 "`nostr:` + `指针`" 的形式指示客户端, 然后客户端会去解析其中的原始十六进制公钥或者 ID 使其成为 JSON 事件中的 `p` 和 `q` 标签.

但如果是对一个 Nostr 事件的引用, 不同的客户端就会有不同的表现, 有的客户端会解析其中的事件 ID 然后找到对应的事件 JSON, 读取其中的 `pubkey` 字段将其作为 `p` 标签来实现引用并提及事件作者, 而一些客户端就只会解析对公钥指针的提及, 而不会解析事件的引用中的作者并去提及.

::: tip
公钥和事件指针需要是 [NIP-19](https://github.com/nostr-protocol/nips/blob/master/19.md) 编码后的实体, 这是 `nostr:` URI scheme 即 [NIP-21](https://github.com/nostr-protocol/nips/blob/master/21.md) 中要求的.
:::

比如以下的两个字串符都是指向同一个用户的 URI:

- `nostr:npub1jl40evdcgwx4d54rxzwxltcg4esmucv2vhy8k63f24y75ae6c2wsdmuk5w`
- `nostr:nprofile1qqsf06hukxuy8r2k623np8r04uy2ucd7vx9xtjrmdg542j02wuav98gxrakl3`

而要引用一个已经存在的 Nostr 事件则是:

- `nostr:note1haxtpa8zhk8zcxvhy27ffay8urmzq5pyupasez67zjrj38ay2cush40cq9`
- `nostr:nevent1qqst7n9s7n3tmr3vrxtj90y57jr7pa3q2qjwq7cv3d0pfpegn7j9vwg0ffnqc`

上方两类中的两种指针的效果是相同的, 只不过两类示例的第二种即 `nprofile1` 和 `nevent1` 能够嵌入对客户端有价值的中继语境信息, 可以帮助客户端进行用户和事件发现, 如果后面的一种指针没有包含中继语境信息那么实际上也和前一种没有任何区别.

---

一个引用已有事件的新笔记示例:

```text
而 URL 到底区不区分大小写也已经是统一不了的问题了.
nostr:nevent1qvzqqqqqqypzpvv5kxn3muystl650mgctd4g5x6gjuxnxez3axalqj37dhdz5svjqyshwumn8ghj7mn9waej67ng94hx7er9xgh8yetvv9ujuum5wfjkzmf0qyfhwumn8ghj7un9d3shjtnnw3ex2ctd9uqzp90vrucux5xdqp27787k2phd6zj7rralcrd43yku4nr4h0t2nnzay706d6
```

```json
{
  "tags": [
    [
      "q",
      "95ec1f31c350cd0055ef1fd6506edd0a5e18fbfc0db5892dcacc75bbd6a9cc5d",
      "wss://news-zh-node2.relay.stream/",
      "b194b1a71df0905ff547ed185b6a8a1b48970d336451e9bbf04a3e6dda2a4192"
    ],
    [
      "client",
      "Nostr.moe Pro",
      "31990:97eafcb1b8438d56d2a3309c6faf08ae61be618a65c87b6a295549ea773ac29d:1743731289"
    ]
  ],
  "content": "而 URL 到底区不区分大小写也已经是统一不了的问题了.\nnostr:nevent1qvzqqqqqqypzpvv5kxn3muystl650mgctd4g5x6gjuxnxez3axalqj37dhdz5svjqyshwumn8ghj7mn9waej67ng94hx7er9xgh8yetvv9ujuum5wfjkzmf0qyfhwumn8ghj7un9d3shjtnnw3ex2ctd9uqzp90vrucux5xdqp27787k2phd6zj7rralcrd43yku4nr4h0t2nnzay706d6",
  "sig": "7467dd9a00fcef3e44813bc955bcc0e3d09a89620969f7b3facead2bdceebc4f6eb8b40ef74bea2319c8060ade94e8eb9d3f23b3d5387f707d4a95f769f6e7c5",
  "id": "9003a31d26c141b527855149ef18da342927cf0056f3f8b3cfea6b23373ee65d",
  "pubkey": "434f97993627f1e61f14eeaf60caa8cfdcec10a592caff8250c825252d548c15",
  "created_at": 1745652173,
  "kind": 1
}
```

---

一个提及用户的事件示例:

```text
I'm using strfry to set up NIP-46 dedicated relay for my friends, can I refer your relay.nsec.app configuration file? nostr:npub1xdtducdnjerex88gkg2qk2atsdlqsyxqaag4h05jmcpyspqt30wscmntxy
```

```json
{
  "tags": [
    [
      "p",
      "3356de61b39647931ce8b2140b2bab837e0810c0ef515bbe92de0248040b8bdd"
    ],
    [
      "client",
      "Nostr.moe Pro",
      "31990:97eafcb1b8438d56d2a3309c6faf08ae61be618a65c87b6a295549ea773ac29d:1743731289"
    ]
  ],
  "content": "I'm using strfry to set up NIP-46 dedicated relay for my friends, can I refer your relay.nsec.app configuration file? nostr:npub1xdtducdnjerex88gkg2qk2atsdlqsyxqaag4h05jmcpyspqt30wscmntxy ",
  "sig": "ca9d96bc94e30ce0b58abe15618c623cf56deb6bb1a750e84ba4b232da9a46d6f9a30d415e673374ff61f0e27cd25d2ce7ebd775652696e37e8ab9ec4cb0f658",
  "id": "0480ffc5d8dd617e16c0fd882faf0ae83db5a461d5643ca3748dacb24904bb7e",
  "pubkey": "434f97993627f1e61f14eeaf60caa8cfdcec10a592caff8250c825252d548c15",
  "created_at": 1746163678,
  "kind": 1
}
```

---

常用的与 `nostr:` scheme 组合的实体指针一览:

| 指针前缀    | 用途                                                         | 示例                                                         |
| ----------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `npub1`     | 指向用户(公钥).                                              | `nostr:npub1jl40evdcgwx4d54rxzwxltcg4esmucv2vhy8k63f24y75ae6c2wsdmuk5w` |
| `nprofile1` | 指向用户, 可以包含内联的中继提示.                            | `nostr:nprofile1qqsf06hukxuy8r2k623np8r04uy2ucd7vx9xtjrmdg542j02wuav98gxrakl3` |
| `note1`     | 指向一个 `kind:1` 短文本笔记 (Nostr 最基础的用户事件).       | `nostr:note1haxtpa8zhk8zcxvhy27ffay8urmzq5pyupasez67zjrj38ay2cush40cq9` |
| `nevent1`   | 指向任何一个具体的 Nostr 事件, 可以包含内联的中继提示.       | `nostr:nevent1qqst7n9s7n3tmr3vrxtj90y57jr7pa3q2qjwq7cv3d0pfpegn7j9vwg0ffnqc` |
| `naddr1`    | 指向一个「{可替换\|replaceable}」的「{可寻址事件\|addressable event}」, 通常是[长篇文章](https://github.com/nostr-protocol/nips/blob/master/23.md). | `nostr:naddr1qvzqqqr4gupzqs60j7vnvfl3uc03fm40vr923n7uasg2tyk2l7p9pjp9y5k4frq4qq3xzttxv4mj6mn0w3jhxtt0dckhyct5d9hxwttfd3k82um5wfshg6t0dc3zwguy` |

## 删除 {#deletion}

Nostr 的删除就如 GPG 密钥吊销一样, 是对旧密钥的引用. 相似的, 在 Nostr 上实现删除就是使用 `kind:5` 事件在标签中引用目标事件, 同时只有事件的作者签署的删除事件才能对已有的事件起到有效的删除声明作用.

下面是一个删除事件示例:

```json
{
  "kind": 5,
  "id": "1ba1d90db4588e0cf753100a4f61301384565af394242605e876564d0c6ce8f3",
  "pubkey": "434f97993627f1e61f14eeaf60caa8cfdcec10a592caff8250c825252d548c15",
  "created_at": 1745672602,
  "tags": [
    [
      "e",
      "6e06cafc148825a3bc24480fa18da662e6361bdc2edf6e9c557c969603d62367"
    ],
    [
      "k",
      "1"
    ],
    [
      "alt",
      "Deletion event"
    ]
  ],
  "content": "",
  "sig": "1caee9d13a05642dffe5c32dfef9a1bd53e6bf0f2c498f112a54abcb1589918a90f5fbd3881bc5cfe6a2d62e993e11e225b6888fe9651bb33b43c242e0b1b2ab"
}
```

对于不可替换的非寻址事件, 只有其中的 `e` 和 `k` 标签是必须的. 一个删除事件可以包含多个 `e` 和 `k` 标签, 这意味着用户可以一次性声明删除多个事件.

---

使用 [nak](/start/become-hacker/#install-cli-tool) 生成一个对事件 ID 为 `b498f6a9724b874bdc43645be4d8937588acb0d7a579b44d6a1ced366ca3f4ab` 的常规 `kind:1` 事件的删除引用事件:

```bash
nak event \
	-k 5
	--tag k=1
	--tag e=b498f6a9724b874bdc43645be4d8937588acb0d7a579b44d6a1ced366ca3f4ab \
	-c 错别字 \
	--prompt-sec
```

```bash
{
  "kind": 5,
  "id": "8e37cad3c3d13a7c9193a37a9f1bbb843e06c7522d687f1ae4fa614b4bcda4cf",
  "pubkey": "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
  "created_at": 1747230217,
  "tags": [
    [
      "k",
      "1"
    ],
    [
      "e",
      "b498f6a9724b874bdc43645be4d8937588acb0d7a579b44d6a1ced366ca3f4ab"
    ]
  ],
  "content": "错别字",
  "sig": "840e03411fc974a09c9f40c3ffd81d967f787fefedd2abd0884e1ca6eb12e06f59f206e153596fbd854277514e577b1b723cc05f169608eb21ec49e0af1a94d3"

```

---

使用 nak 生成一个对寻址标签 ID 为 `nostr-event-example` 的 `kind:30023` (长篇文章) 事件的删除引用事件:

::: tip
完整的可寻址标签 `a` 的组成形式为 `<事件类型>:<作者公钥>:<ID>`, 这定义在 [NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md#tags) 中.
:::

```bash
nak event \
	-k 5 \
	--tag k=30023 \
	--tag a=30023:79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798:nostr-event-example \
	-c 就是要删
	--prompt-sec
```

```json
{
  "kind": 5,
  "id": "56282a628c2fa082f686c202e9096fb911b55f20223d15cdc4801c27f4371daa",
  "pubkey": "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
  "created_at": 1747230526,
  "tags": [
    [
      "k",
      "30023"
    ],
    [
      "a",
      "30023:79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798:nostr-event-example"
    ]
  ],
  "content": "就是要删",
  "sig": "37ca52f99fd62083c4b89426ab97dd187769d7b9da053ea5055cfc43f8d3f75b4bced9369637b4fb9cddc82bda8111cccfdb2b938bc780ec8fc1b7ab28f4f03d"
}

```

---

与联邦式社交网络不同, Nostr 的删除由于其完全分布式的特性并不能真正有效地起作用, 因为这里也没有一个协调删除事件的相对中心化的机构, 而几乎所有的 Nostr 事件一旦发布之后就能在全网传播. 所以得到删除事件之后, 我们就需要尽可能地将该事件广播到全网任何「欲删除事件可能会到达的中继」中.

最佳的删除做法应当是在欲删除事件发布后立刻执行删除, 这段窗口期越短, 删除效果就会越好, 因为欲删除的事件还没有传播到无法预测到的中继中.

另外, 由于删除事件基本完全依赖于中继(即服务端)一侧的处理, 中继接收到删除事件后不仅要删除已经存在于数据库中的事件, 还要预防这个事件未来再次进入, 甚至对于本来就不存在欲删除事件的中继也会接收到对应引用到的删除事件, 这就导致无法在删除事件到达的时候立即计算该删除事件是否与欲删除事件的作者是同一个, 因此这是一个相对于简单地保存事件来说更加复杂的业务逻辑, 所以会有一小部分的中继软件实施删除实践也会出现不一样的行为, 最后导致删除的效果也不尽相同, 有的中继甚至因此选择不支持删除.
