---
description: Fediverse, Bluesky 和 Nostr 理论问题阐述.
editLink: true
layout: doc
navbar: true
sidebar: true
aside: true
---

# 为什么是 Nostr? {#why-nostr}

::: info
本文不再介绍有关中心化与去中心化的区别及意义.
:::

## 前言 {#introduction}

多年之前, 笔者第一次感受到被中心化平台裹挟的痛苦, 自己的数据不再是自己的, 辛苦写下的笔记像是被一场大火烧了一样无影无踪. 平台就像房东一样, 自己始终是在他们的屋檐下, 作为用户不能不低头.

我尝试了很多 "去中心化" 的社交媒体, 由于我开始使用的是 Mastodon 实例, 因为其莫名其妙的限制和功能缺失, 导致我对 {联邦宇宙|Fediverse} 的初始印象很差. 为什么要像 Twitter 一样将我的账号绑定在域名上? 为什么一个人要为了所谓社区守则实则小群体的群规而辛辛苦苦去融入各种奇形怪状的小群体才能争取到我说话甚至我账号数据得以保留的权利?

此时就一定会有人跳出来说: 不服气你可以自己建服务器.

这就是现状, 为什么不去自托管呢? 因为个人托管所谓*联邦式*社交网络实例实际是在助长*小群体*, 且是在浪费不必要的资源. 并且我不想成为「土皇帝」, 笔者当然也有自己的小群体, 只不过不会拿出来和其他小群体放在一起以寻求认同感.

所以我甚至可以说, 如今的 Fediverse 其实也和 {X|Twitter} 也很相似:

1. 随心所欲的私人平台, 一切规则由那个*他*制定, 审判也是由小团体决定.
2. 依附在「炫酷」域名身上才能获得的用户账号.
3. 高深莫测的用户协议和隐私协议, 我的账号和账号数据到底属不属于我?
4. 归于私人后就无法脱离实质为「富人」施舍的**公益及慈善性质服务**, 我到底是用户还是只是获得了一个临时座位而能被随时驱逐的过客?
5. 无法在账户失效后请求通用数据副本, 无法主动**彻底迁移**数据, 无法使用数据副本移植数据.
6. 巨头占据用户生态, 无法仅靠用户重建网络, 硬分支也无济于事. 服务器运行维护的开销超乎用户的想象, 其支出与用户收益极端不成正比.
7. 用户内容的搜索只在本服务器内有效.
8. 抗审查和言论自由建立在「{关键意见领袖|KOL}」的潜规则之下.
9. 不存在人与人之间的对等连接, 互联规则由服务器决定.
10. 大量联邦的拥有者和核心群体都很「神秘」, 话题很小众很具有争议性, 不费尽心血献殷勤难以高攀, 联邦式的对等互联实际上是政治外交工程.

最大的区别可能是 *X* 无法被自托管, 所谓联邦就和给 Mastodon 做兼容应用一样, 对着一个表面开放的 API 颠来倒去而已. 我很抗拒, 但我也不想浪费时间和精力在它上面, 我更关心我的具体的朋友们的状态. 所以现在我几乎所有的类似于上面的社交媒体都有多个账号, 为的就是以防哪天我再也无法主动联系到我的朋友, 令人感慨.

好了, 为了避免一部分人断章取义悄悄截图去像营销号发短视频那样转发, 美名其曰「不丢💩」, 接下来的内容将会对三个协议为代表的现状给出解释.

我从 Fediverse 开始,  然后和 Nostr 一起尝试了 Bluesky. 最后还是选择了 Nostr, 通过协议桥和我的部分 Fediverse 朋友直接跨网交流. Nostr 不及 Bluesky 一样精雕细琢, 但起码我这个新人从一开始就能看明白它的协议原理, 并具有我认可的经济生态. 这里将为读者大致介绍这些协议和社交媒体, 并在其中回答「为什么是 Nostr?」这个问题.

## Fediverse 的分裂 {#fediverse}

你也许听说过甚至使用过了以下的产品:

1. Mastodon
2. Misskey
3. Pleroma
4. ...

它们都是「Fediverse」的核心协议 ActivityPub 的实现, 但现实情况是什么? 是 Mastodon 事实上主导了 Fediverse 的用户生态, 它成了事实上的 ActivityPub 的「标准」, 其他的协议实现必须要首先考虑与 Mastodon 进行兼容, 否则就会与这个社交网络里面最多的用户群体发生脱离的危险. 然而它的开发进度**极度**地迟缓, 因为它带有沉重的历史包袱, 加上与开发无关的周边事务让 *Mastodon GmbH* 的开发更加迟缓, GitHub 源代码仓库已经堆积了 159 页超过 4000 个未被解决的议题.

它们有公认的最大的来自左翼的资金资助以及社会声望, 开发进度却是所有中最慢的那一批. 一个{引用|Quote}消息的功能从它发布到现在都没有实现, 大多数 Mastodon 忠实用户和被捆绑在一起积重难返的实例管理员对这个问题只能解释为 Mastodon 对 Twitter 的「重新思考」而带来的 "保护原始消息发布者".

但是不要忘记, 原版的 Mastodon 就是对 Twitter 的复刻. 这件事本身无可厚非, 因为 Twitter 就是最成功的社交媒体, 只要对它一比一复刻, 就能获得不错的用户体验, 人人都在研究 Twitter 人人都在复刻他的 UI/UX. 最重要的是这样做可以显著降低用户上手门槛, 然后去重新思考设计和改进 Twitter 的体验, 让其更加适合具体的社区. 但 Mastodon 对这个功能思考了马上就有九年了(如果今年 10 月 5 日还是没有发布的话).

除了最基本的 UI 复刻, Mastodon 强行带来了 Twitter 的单条推文最多 4 张图限制, 带来了只有「赞」没有其他回应的默认设定. 但是 Twitter 的引用消息一直是最基础的功能, 它恰好不去复刻. 现在是 2025 年 4 月份, 距离上一次追踪到关于它的这个功能的开发进度是在 2024 年 4 月 20 日:

> <https://oisaur.com/@renchap/112299860209222424>

如今 Twitter 已经不再叫 Twitter, 但它还是没有把这个 Twitter 原本就有的功能做出来.

来看看 Mastodon {首席技术官|CTO} *Renaud Chaput* 是怎么计划的:

> Mastodon CTO *Renaud Chaput* 在跟进中确认, 如果引用帖子是使用 Mastodon 提议之外的另一种实现方式发布的, 那么 Mastodon 将不会显示这些帖子. 这就意味着, 在实践中即使 Mastodon 增加了对引用的支持, 它也不会显示 Misskey 发表的引用文章, 除非 Misskey 也实施了 Mastodon 提议的引用文章新系统.  
> —— [Fediverse Report \#105 – The Fediverse Report](https://fediversereport.com/fediverse-report-105/)

和 Fediverse 进行互联的协议桥(包括 Nostr 的 Mostr)也将会变成那个不得不做出选择的软件, 真正的协议层 ActivityPub 当然没有强制要求这么做. 而如今所谓 "支持 Fediverse 互联" 的其他社交媒体软件其实只能叫做 "最低限度兼容与 Mastodon 服务器的有限交互".

以上只是现实的 Mastodon 的开发问题, 而 ActivityPub 的协议规范除了被置若罔闻也暴露出根源问题:

1. 用户最重要的标识与域名绑定, 无法被移植, 转移实例和失去域名控制权后用户身份将丢失.
2. 用户个体要么融入一个联邦, 要么自己成为联邦, 而运行一个完整的服务器进行参与联邦是痛苦且繁琐的, 如果是微型实例, 那大量资源将只会被用于维护联邦而不是社交本身.
3. 没有被实例主动{订阅|Sub}的站外用户将无法有效将消息发送进入服务器, 然而实例服务器还是要接受全局提及, 否则互联就成了空谈. 这使得联邦实际上不允许和其他网络进行对等互联, 除非服务器相互主动订阅, 就和 RSS 一样. 发现信息在 Fediverse 上变成了「先有鸡还是先有蛋」的问题.

类似的问题还有很多, 感兴趣的读者可以阅读下面这篇文章进一步了解:

> [Mastodon Exit Interview | Rob’s Posts](https://v.cx/2025/04/mastodon-exit-interview)

## Bluesky 大教堂 {#bluesky}

Bluesky 是对联邦式社交网络的全新设计, 它们也将自己的网络命名为「{联邦|Federation}」. 它是 2019 年从 Twitter 中分支出来的去中心化社交研究计划, 如今变为了现实.

这是使用了现代架构设计的新联邦网络, 由 *Bluesky, PBC.* 领导开发, 这个公司也托管着规模最大的生产实例 *bsky.app*, 当人们在称呼 *Bluesky* 的时候其实都是在叫这个公司基于也是由它们领导开发的底层协议 *AT Protocol* 之上构建的这个社交产品.

Bluesky 的网络结构可以简化为一个打标签的机器「标签机」, 过滤标签的机器「消息机」和存储数据的机器「数据荚」. 它们使用 *AT Protocol* 协议通讯, 应用开发者在消息机的产出上为用户显示这些过滤后的消息.

由于早期邀请制注册, 再加上本身也领导底层协议开发在内的上述网络核心组件的开发, 这使得 Bluesky 到现在都是一个高度中心化的网络. 这家公司托管了规模最大的消息机, 数据荚和使用人数最多的客户端, 所有的网络消息为了这些最大规模的用户都要经过 Bluesky 的这些组件. 虽然自始至终从项目立项到内测再到公开注册都是以「去中心化」自称, 但目前的 Bluesky 是一个事实上的中心化社交网络, 如果需要寻找一个合适比喻对象, 那就是黄金时代的 Twitter. Bluesky 的协议是开放的, 实现是开源的, 应用开发也是自由的, 但所有的这一切都要经过 Bluesky 来宣传和吸引受众.

真的没有人想过重建一个 Bluesky 网络独立于它们运行吗? 目前还真的没有. 即使是基于 Bluesky 现有的开源软件和组件去重新部署, 也没有人去做. 一个个体能够触到的极限是托管个人数据的数据荚和消息机的表层. 而这个网络中最重要的其实是消息机底层的负责汇集整个网络消息的「中继器」, 这是计算任务最为密集, 资源开销最大的场景, 目前没有任何一个个人或者新公司敢去尝试重新实现和部署它.

一个个体如果真的极尽追求「自托管」, 那么能够负担得起且真的重要的组件只有: 数据荚. 但是, 数据荚也需要 Bluesky 的团队批准才能加入到和它们网络进行联邦, 然后上文提到的中继器才会从个人数据荚中订阅获取消息, 消息才能真正地进入这个「联邦」网络, **大部分用户也还是只会用 Bluesky 官方提供的应用程序参与网络**.

不幸的是, 即使真的托管了自己的数据, 要想被其他 Buesky 用户发现自己的消息也还需要经过 Bluesky 官方应用的许可. 在 Bluesky 的应用里, 用户可以自由地过滤自己的消息, 创建自己的消息视图, 只看自己真正喜欢的, 这一切都建立在 Bluesky 强大的消息过滤能力, 消息从数据荚流到中继器后被打上标签后索引, 应用从中继器中获取消息还要经过官方应用内置的{审查|Censorship}系统过滤然后才能到达用户面前被用户进一步过滤. 这部分存在于消息机和应用之间的审查被称为「{审核|Moderation}」, 只要使用了 Bluesky 官方应用(包括网页和原生客户端)就会被强制过滤.

这可以被视作是 Bluesky 为了公司能够在法律框架下全世界推广产品的一种预防手段, 这些强制审查手段被解释为社区守则, 目前已经被知晓的审查除了全球用户通用的 [moderation.bsky.app](https://bsky.app/profile/moderation.bsky.app) 还有:

|序号|地区|账号|
|:-:|:-|:-|
|1| 巴西| [moderation-br.bsky.app](https://bsky.app/profile/moderation-br.bsky.app)|
|2| 德国| [moderation-de.bsky.app](https://bsky.app/profile/moderation-de.bsky.app)|
|3| 土耳其| [moderation-tr.bsky.app](https://bsky.app/profile/moderation-tr.bsky.app)|
|4| 日本| [moderation-jp.bsky.app](https://bsky.app/profile/moderation-jp.bsky.app)|
|5| 英国| [moderation-uk.bsky.app](https://bsky.app/profile/moderation-uk.bsky.app)|
|6| 俄罗斯| [moderation-ru.bsky.app](https://bsky.app/profile/moderation-ru.bsky.app)|
|7| 西班牙| [moderation-es.bsky.app](https://bsky.app/profile/moderation-es.bsky.app)|
|8| 欧盟| [moderation-eu.bsky.app](https://bsky.app/profile/moderation-eu.bsky.app)|
|9| 巴基斯坦| [moderation-pk.bsky.app](https://bsky.app/profile/moderation-pk.bsky.app)|
|10| 印度| [moderation-in.bsky.app](https://bsky.app/profile/moderation-in.bsky.app)|
|11| 澳大利亚| [moderation-au.bsky.app](https://bsky.app/profile/moderation-au.bsky.app)|

这个列表只会越来越长, 越来越精细. 如果一个用户需要绕开这些自动化审核账户的标记审查, 需要去主动使用第三方客户端或者改变网络位置. 但是对于被标记的消息发布者来说, 在 Bluesky 上 "被隐身" 将会是悄无声息, 连自己都难以察觉, 而与这个实质上的中心化网络对抗那将是毫无胜算的, 这就是「{影子禁令|Shadowban}」.

2025 年 4 月 16 日, 也就是上周. 土耳其要求 Bluesky **删除**一些账户, Bluesky 照做了, 但其实它们实行的是上文提到的影子禁令, 只是将这些账户的消息从土耳其地区使用官方客户端用户的眼前悄悄隐藏了.

> <https://bsky.app/profile/nekorug.moe/post/3lmwxxlq3ts2d>

这种本应该被去中心化网络特性抵消的中心化审查手段却有效地在一个被叫做 Bluesky 的去中心化网络上实现了, 因为本该去中心化的它却成了这个网络最大的中心, 几乎就是单一节点, 比 Fediverse 中的 Mastodon.social 还要巨大. Bluesky 的去中心化已经变成了它需要主动去努力的事情了, 如今的它只能被称为一个「可去中心化的中心化社交网络」.

---

回到 AT Protocol 身上, 它作为一个与 Bluesky 一同强势开发的协议, 相比现如今分崩离析的 ActivityPub 来说带来了以下特性:

1. 实现了真正去中心化的可移植的身份标签, 也就是 DID[^1].
2. 真实有效的消息过滤能力, 用户能够在官方框架之下实现最大化地消息审核, 同时消息发布者也有更强的控制自己的消息的展示方式的能力, 这一切都是使用了元数据标签实现的.
3. 实现了可移植的用户数据, 通过数据荚的迁移, 用户能够彻底控制自己的数据, 而不是依赖于其他组件的服务器管理员.
4. 适应于现代技术的经过深思熟虑和实践的底层架构, 扩展能力和效率足够强大.

## Nostr 市集 {#nostr}

Nostr 是一个完全由 Web 2.0 时代的技术也就是 WebSocket 之上建立的应用层协议. 后来才得到了 Twitter 前董事兼任 Bluesky 前董事的{杰克·多西|Jack Dorsey}的资助, 而这笔资助全部是比特币, 然后导致了如今 Nostr 上盛行的比特币文化. 但如果不是对 Web 3.0 时代的比特币文化做过了解的人, 也许会把如今加密货币多如牛毛的现状和比特币文化做混淆. 实际上在最老派或者说传统的比特币开发者眼里, 只有比特币才是所谓 Web 3.0 的真正正统, 他们将其他加密货币称之为「{垃圾币|Shitcoin}」, 这也充分体现了技术自由之下的状态, 这被称为「{比特币至上主义|Bitcoin Maximalism}」.

Nostr 仿佛找到了开源社交与现实现状冲突的解决办法, 也就是如今大多数的开源开发在渴望科技巨头和政治组织资金资助的现状, 又或者这些开源产品也必须要作为一个商业化产品去尝试, 然而这在资源雄厚的科技巨头的产品面前变得脆弱无比, 导致只能无数遍强调「开源」和「自由」才能赢取用户的同情心. 开源的社交技术要么沦为于小众爱好者的玩物, 要么沦为社交巨头的赎罪券, 只要不去主动压制甚至还能贡献资源(施舍一些从大众社交逃离的用户)那就算是科技巨头拥有良好品德, 这对吗?

Nostr 实际上也很难彻底逃离这种状况, 因为杰克给的这笔钱不是无限的, 而开源和现实冲突的现状已经很久没有改变过. Nostr 需要使用这笔被赠予的巨款在资金耗尽之前建立起内循环经济生态, 否则也要直面残酷的市场竞争, 要么去贩卖「自由」赎罪券, 要么去讨好小众爱好者成为无法走到大众面前的技术, 然后才能让项目继续发展. 于是 Nostr 拿着这笔资金, 建立了自己的「市集」, 而这个集市上所有的买卖都使用比特币完成. 生态的建设由爱好者驱动, 然后在自己生态内获取真实用户支持, 而在 Nostr 里面最高等级的支持就是支付一笔比特币消费, 这被称之为「{价值对等|Value4Value}」.

这在其他的类似产品身上的表现为发行自己的加密货币, 企图让所有人可以参与真实的投资和赚取收益, 然而这最终大多都被批为 "割韭菜", 于是没有投资经验和无法预估风险的普通人只记住了 *KOL* 们对这个产品和 "割韭菜" 这个词的关联.

### 开源经济哲学 {#opensource-economic-philosophy}

开源软件运动中广为人知的著作《{大教堂与市集|The Cathedral and the Bazaar}》除了阐述两种开发模式的区别, 并未对 "开源运动与现实世界的物质资源冲突" 提出真正有效的解决方案. 书中所设想的出路, 恰恰构成了今天开源现状的写照:

1. 开发者通过在开源项目中建立声誉, 以此获得职业机会; 
2. 鼓励商业公司参与开源, 提供支持.

然而, 这种模式最终导向的是一种**职业驱动的开源**: 大量开发者参与开源, 是为了进入商业公司; 而公司支持开源的方式, 就是简单地送钱. 如此一来, 似乎形成了一个闭环.

但这个闭环是安全的吗? 并非如此. 最终, 开源项目往往被商业公司牵着鼻子走 —— 这些公司将开源技术「合理使用」为自身商业解决方案的一部分, 从中攫取最大收益; 而真正写出代码的个人开发者, 只获得象征性的回报. 当一些项目尝试反击时, 开源社区内部反而先指责他们 "背离了自由精神".

Redis 是近年最典型的 "受害者" 之一, 除了它还有 ElasticSearch, MongoDB, Grafana 和 Sentry. 这些名字相信只要是对前沿技术有了解的开发者, 都会如雷贯耳.

何谓自由? 只有活得下去的人, 才有资格谈论自由. 那些衣食无忧的人, 无权对饥寒交迫的开发者的选择说三道四. 在这个「自由软件」构筑的幻象背后, 是无数饱受贫困困扰的开发者奉献一生的身影. 我们, 真的看见他们了吗? 我们作为 "开源爱好者" 和开发者是否是在别人的道德标准之下对这些穷困者进行批判?

Nostr 给出了它的回答: 借助比特币建立起自己的内循环经济模式, 设立基金会筹集比特币生态中的真实资金然后去直接资助开发者.

无法否认, 一定会有人 "闻币失色", 但是自己却说不出来为什么. 可以证明的是, 上文说的基金会 *OpenSats* 正在资助更多的开源开发者而并不局限于比特币生态.

比如 WireGuard 的开发者{杰森·多南费尔德|Jason Donenfeld}:

> [Long-Term Support For Jason Donenfeld](https://opensats.org/blog/jason-donenfeld-lts-grant)

Fediverse 著名前端应用 Soapbox 的开发者 *Alex Gleason*:

> [Long-Term Support For Alex Gleason](https://opensats.org/blog/alex-gleason-receives-lts-grant)

AOSP 项目的分支 GrapheneOS:

> [GrapheneOS - OpenSats](https://opensats.org/projects/grapheneos)

以上只是最为典型的开发者和项目, 而 *Alex Gleason* 已经将自己的项目完全改造并投入到 Nostr 中的开发了, 更多的长期支持的开发者可以在这里看到:

> [lts - OpenSats](https://opensats.org/tags/lts)

> [Project Showcase - OpenSats](https://opensats.org/projects/showcase)

一开头提到的那笔被赠予的巨款, Nostr 的核心创始人和开发者 *fiatjaf* 也公开了自己的资助报告:

> [The fiatjaf Nostr fund](https://habla.news/a/naddr1qvzqqqr4gupzqwlsccluhy6xxsr6l9a9uhhxf75g85g8a709tprjcn4e42h053vaqyd8wumn8ghj7mr0vd4kymmc9enxjct5dfskvtnrdakj7qg6waehxw309ac8junpd45kgtnxd9shg6npvchxxmmd9uqqsenyxejxxvehvv4fz6ul)

当然我也可以在这里阴谋论似地假设, 是因为比特币浪费了太多电力还汇集了最多的「脏钱」, 这个所谓比特币生态才开始贩卖「赎罪券」. 真的吗? 风险投资, 政治投资和私募资金真的就比特币干净? 而至于电力浪费导致的环境问题, 那只能假设是拥有私人飞机的富豪还恰好是开源开发者才会提出的担忧. 并且要记住, 这是比特币, 不是 *Shitcoin*.

同样的, 我也非常欢迎那些 "讨厌比特币乃至一切加密货币的开发者" 加入 Nostr, 因为现在比特币浓度高到可以吓跑人了, 我虽不是极度怨恨一切加密货币包括比特币的人, 但我们这些普通人类也需要 "反击", 去打造一些*币圈味*不那么浓的 Nostr 小玩意, 所以 Nostr!moe 就诞生了, 现在 Nostr!moe 被我和我的社区成员们用来看新闻, 不含比特币和 *Shitcoin* 的中文的新闻:

> <https://nostr.moe/?r=wss://relay.stream/&r=wss://news-zh-node2.relay.stream/>

### KISS 协议设计 {#kiss-in-nostr}

Nostr 只有一个标准议定是{强制性|Mandatory}的, 也就是 "NIP-01: 基础协议流描述":

> [nips/01.md at master · nostr-protocol/nips](https://github.com/nostr-protocol/nips/blob/master/01.md)

我相信只要是对计算机网络稍微有了解的人读完它的协议流程描述就会懂了: 这就是个简单到只用 WebSocket 发一堆 JSON 的协议, 甚至简单到愚蠢.

"简单到愚蠢" 这恰好这就是现世大量开源基础设施遵守的 {Keep It Simple, Stupid|KISS} 原则. 这个原则的目的是为了让系统越简单就越易于理解, 维护和扩展. 并且, Nostr 是用 JSON 描述的纯文本协议, 这意味着开发者甚至能使用 [websocat](https://github.com/vi/websocat) 这样的原始 WebSocket 工具就能实现协议流程.

让我们现在就试试, 使用任何 WebSocket 工具或者库打开一个连接:

```bash
websocat wss://relay.nostr.moe
```

发起一个请求:

```json
["REQ","nak",{"kinds":[1],"limit":1}]
```

如果不出意外, 你的终端上的状态类似这样:

```bash
$ websocat wss://relay.nostr.moe
["AUTH", "ba1c7f51-9c0e-4e02-bc41-6953c8fc25e3"]
["REQ","nak",{"kinds":[1],"limit":1}]
["EVENT","nak",{"tags":[["client","Nostr.moe Pro","31990:97eafcb1b8438d56d2a3309c6faf08ae61be618a65c87b6a295549ea773ac29d:1743731289"],["nonce","19339","16"]],"content":"三款二次元手游（崩坏：星穹铁道、重返未来：1999 与绝区零） - 举头三尺有神鱼\nhttps://www.yvesx.com/archives/3-gacha-mobile-games-honkai-star-rail-reverse-1999-and-zenless-zone-zero","sig":"a8fbcd638be819db7704de1fa6523af1aa3af5b46aa4023fb3dce42f9aa9d1ec209e9e3913e17eaedd8898ecb8d69baf739a74bff4933a436db10e43395bc9ae","id":"000067cdd6481315ea01331b3a9a282255d63f3901aa41328c46b6d816a0b336","pubkey":"3b70689a51122b4f58f63593b1be3d7fd72bc00fae973bb40f2fb74dc1e351eb","created_at":1745424898,"kind":1}]
["EOSE","nak"]
```

格式化一下响应的消息主体:

```json
{
  "tags": [
    [
      "client",
      "Nostr.moe Pro",
      "31990:97eafcb1b8438d56d2a3309c6faf08ae61be618a65c87b6a295549ea773ac29d:1743731289"
    ],
    [
      "nonce",
      "19339",
      "16"
    ]
  ],
  "content": "三款二次元手游（崩坏：星穹铁道、重返未来：1999 与绝区零） - 举头三尺有神鱼\nhttps://www.yvesx.com/archives/3-gacha-mobile-games-honkai-star-rail-reverse-1999-and-zenless-zone-zero",
  "sig": "a8fbcd638be819db7704de1fa6523af1aa3af5b46aa4023fb3dce42f9aa9d1ec209e9e3913e17eaedd8898ecb8d69baf739a74bff4933a436db10e43395bc9ae",
  "id": "000067cdd6481315ea01331b3a9a282255d63f3901aa41328c46b6d816a0b336",
  "pubkey": "3b70689a51122b4f58f63593b1be3d7fd72bc00fae973bb40f2fb74dc1e351eb",
  "created_at": 1745424898,
  "kind": 1
```

这是笔者最近发送的一条阅读记录.

好了, 我们到这里就完成一次获取消息的通讯了, 没有什么复杂的. 如果你想知道各种 JSON 控制消息是如何书写的, 那么你可以借助一下 nak 这个工具帮你更直观地理解:

> [fiatjaf/nak](https://github.com/fiatjaf/nak) (GitHub)

而如果你真的想听笔者说 Nostr 的「坏话」, 那可以去看看我**两年前写的**博客文章:

> [为什么我不推荐 Nostr 和 Fediverse? | CXPLAY World](https://blog.cxplay.org/works/why-dont-i-recommend-use-nostr-and-fediverse/)

## 后话 {#postscript}

所以, 我选择了愚蠢而简单的 Nostr, 它尚且有一个我能理解和认同的经济哲学. 但我只是一个普通人, 一个普通的 "开源爱好者", 选择它只是因为同类对手的底层原理和状况超出我的理解范围.

这些协议并不仅仅是用来社交, 而是能够基于社会化的人类社区构建一个完整生态. Fediverse 已经步入了分崩离析的地步, Bluesky 已经成了事实上的中心化网络牢不可破, 而 Nostr 又是被 "比特币疯子" 最先到达的蛮荒之地. 我选择了, 在 Nostr 拓荒成立普通人的小社区, 这就够了.

但其实, 如果是向往黄金年代 Twitter 的开放式中心化社交网络而不是别人强加的「自由」和「开源」营销的人, 其实我更推荐去 Bluesky, 因为它就是 Twitter 精神的继任者, 并且还带来了去中心化的可能.

## 注释 {#footnote}

[^1]: [Decentralized identifier - Wikipedia](https://en.wikipedia.org/wiki/Decentralized_identifier)
