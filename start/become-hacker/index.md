---
description: 像黑客一样生成密钥对.
editLink: true
layout: doc
navbar: true
sidebar: true
aside: true
---

# 高级密钥生成指南 {#advanced-key-generation-guide}

密钥对的生成是加入 Nostr 网络的第一步, 快速加入指南提供的方法足以应对大部分情况. 但如果你认为使用隐私模式下的网页工具并不够安全, 或者不够专业, 不够「黑客」. 那么本篇将指导你使用其他方式生成密钥, 本篇将涉及 NIP-19 议定和 NIP-49 议定.

> [nips/19.md at master · nostr-protocol/nips](https://github.com/nostr-protocol/nips/blob/master/19.md)

> [nips/49.md at master · nostr-protocol/nips](https://github.com/nostr-protocol/nips/blob/master/49.md)

:::info
本文将在 Debian 12 (x86) 操作系统和 Bash 环境下演示.
:::

## 安装命令行工具 {#install-cli-tool}

使用 Nostr 调试工具 nak 可以在任何现代计算机系统中以命令行模式操作密钥.

> [fiatjaf/nak: a command line tool for doing all things nostr](https://github.com/fiatjaf/nak)

启动一个虚拟机, 作为操作密钥的临时环境.

进入 Bash, 安装 nak:

```bash:no-line-numbers
curl -L https://github.com/fiatjaf/nak/releases/download/v0.13.2/nak-v0.13.2-linux-amd64 -o nak
```

添加执行权限:

```bash:no-line-numbers
chmod +x ./nak
```

启动 nak 查看应用是否完整:

```bash:no-line-numbers
❯ ./nak
NAME:
   nak - the nostr army knife command-line tool

USAGE:
   nak [global options] [command [command options]]

VERSION:
   v0.13.2

COMMANDS:
   event    generates an encoded event and either prints it or sends it to a set of relays
   req      generates encoded REQ messages and optionally use them to talk to relays
   fetch    fetches events related to the given nip19 or nip05 code from the included relay hints or the author's outbox relays.
   count    generates encoded COUNT messages and optionally use them to talk to relays
   decode   decodes nip19, nip21, nip05 or hex entities
   encode   encodes notes and other stuff to nip19 entities
   key      operations on secret keys: generate, derive, encrypt, decrypt
   verify   checks the hash and signature of an event given through stdin
   relay    gets the relay information document for the given relay, as JSON -- or allows usage of the relay management API.
   bunker   starts a nip46 signer daemon with the given --sec key
   serve    starts an in-memory relay for testing purposes
   blossom  an army knife for blossom things
   encrypt  encrypts a string with nip44 (or nip04 if specified using a flag) and returns the resulting ciphertext as base64
   decrypt  decrypts a base64 nip44 ciphertext (or nip04 if specified using a flag) and returns the resulting plaintext
   outbox   manage outbox relay hints database
   wallet   displays the current wallet balance
   mcp      pander to the AI gods
   curl     calls curl but with a nip98 header
   dvm      deal with nip90 data-vending-machine things (experimental)
   fs       mount a FUSE filesystem that exposes Nostr events as files.
   help, h  Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --quiet, -q    do not print logs and info messages to stderr, use -qq to also not print anything to stdout (default: false)
   --verbose, -v  print more stuff than normally (default: false)
   --help, -h     show help
   --version      prints the version (default: false
```

如果启动 nak 得到如上的 Bash 输出, 那么说明已经将这个命令行工具安装到本地了. 但还没有添加到操作系统 PATH 中, 因为我们只需要临时用一下就行了.

:::tip
nak 本身的运行不需要任何网络, 密钥操作也不需要网络, 你可以以任何喜欢的方式安装到你的操作系统中.
:::

## 私钥操作 {#private-key-operation}

Nostr 私钥有三种形式:

1. **十六进制私钥**: 常用于机器内计算传递为机密参数.
2. **nsec 私钥**: 带有固定的 `nsec1` 起始字符, 便于人类识别的私钥形式.
3. **ncryptsec 私钥**: 带有固定前缀 `ncryptsec1` 的对称加密版本私钥, 用于在普通安全环境下传递私钥.

### 十六进制 {#hex-private-key}

使用 nak 查看 key 命令的帮助手册:

```bash:no-line-numbers{9}
❯ ./nak key --help
NAME:
   nak key - operations on secret keys: generate, derive, encrypt, decrypt

USAGE:
   nak key [command [command options]]

COMMANDS:
   generate  generates a secret key 
   public    computes a public key from a secret key
   encrypt   encrypts a secret key and prints an ncryptsec code
   decrypt   takes an ncrypsec and a password and decrypts it into an nsec
   combine   combines two or more pubkeys using musig2

OPTIONS:
   --help, -h  show help
```

生成一个私钥:

```bash:no-line-numbers
❯ ./nak key generate
xxxxx
```

`nak key generate` 命令是直接生成一个十六进制的裸私钥, 得到它之后, 我们还需要继续保存编码和加密后的两种私钥以供未来使用.

### nsec {#nsec-private-key}

使用 nak 的 encode 命令继续操作:

```bash:no-line-numbers
❯ ./nak encode --help
NAME:
   nak encode - encodes notes and other stuff to nip19 entities

USAGE:
   nak encode [command [command options]]

DESCRIPTION:
   example usage:
       nak encode npub <pubkey-hex>
       nak encode nprofile <pubkey-hex>
       nak encode nprofile --relay <relay-url> <pubkey-hex>
       nak encode nevent <event-id>
       nak encode nevent --author <pubkey-hex> --relay <relay-url> --relay <other-relay> <event-id>
       nak encode nsec <privkey-hex>

COMMANDS:
   npub      encode a hex public key into bech32 'npub' format
   nsec      encode a hex private key into bech32 'nsec' format
   nprofile  generate profile codes with attached relay information
   nevent    generate event codes with optionally attached relay information
   naddr     generate codes for addressable events

OPTIONS:
   --help, -h  show help
```

编码十六进制私钥为 nsec:

```bash:no-line-numbers
❯ ./nak encode nsec xxxxx
nsec1xxxxx
```

### ncryptsec {#ncryptsec-private-key}

而私钥的 ncryptsec 加密则是 nak key 的一个操作选项:

```bash:no-line-numbers
❯ ./nak key encrypt --help
NAME:
   nak key encrypt - encrypts a secret key and prints an ncryptsec code

USAGE:
   nak key encrypt [command [command options]] <secret> <password>

DESCRIPTION:
   uses the nip49 standard.

OPTIONS:
   --logn value  the bigger the number the harder it will be to bruteforce the password (default: 16)
   --help, -h    show help

GLOBAL OPTIONS:
   --quiet, -q    do not print logs and info messages to stderr, use -qq to also not print anything to stdout (default: false)
   --verbose, -v  print more stuff than normally (default: false)
   --version      prints the version (default: false)
```

使用密码 `1234` 加密**十六进制私钥**为 ncryptsec:

```bash:no-line-numbers
❯ ./nak key encrypt xxxxx 1234
ncryptsec1xxxxx
```

### 直接生成 ncryptsec {#generate-ncryptsec-directly}

如果不想让各种形式的私钥重复暴露, 可以一步到位生成 ncryptsec, 日后有需要用到十六进制和 nsec 私钥的地方才进行解码.

使用管道符连接, 一行命令生成一个使用 `1234` 加密的 ncryptsec:

```bash:no-line-numbers
❯ nak key generate | nak key encrypt 1234
ncryptsec1xxxxx
```

从 ncryptsec 解码到十六进制私钥:

```bash:no-line-numbers
❯ nak key decrypt ncryptsec1xxxxx
type the password to decrypt your secret key:
```

nak 会提示你输入你的加密密码, 你也可以直接选择在 ncryptsec 的后面传入密码.

从 ncryptsec 解码再编码到 nsec 私钥:

```bash:no-line-numbers
❯ nak key decrypt ncryptsec1xxxxx | nak encode nsec
type the password to decrypt your secret key:
```

同样的, nak 也会提示你输入密码, 也可以直接传入密码.

## 公钥派生 {#public-key-derivation}

Nostr 的公钥从私钥中产生, 这个过程也称为「{派生|Derivation}」, 描述了私钥对于公钥的关系.

上文我们得到了各种形式的私钥, 现在我们需要使用私钥来派生公钥, 然后继续将公钥编码成各种形式. 本节涉及到的公钥形式有:

1. **十六进制公钥**: 便于机器识别和相对利于传递的公钥形式.
2. **npub 公钥**:  便于人类识别的公钥形式, 带有固定的 `npub1` 前缀.
3. **nprofile 公钥**: 可以嵌入中继服务器作为语境信息的公钥, 便于应用发现用户, 带有固定的 `nprofile1` 前缀.

:::info
本节涉及私钥部分则仅使用 ncryptsec 私钥进行操作
:::

### 十六进制 {#hex-public-key}

通常来说, 十六进制的公钥是很不常用的, 因为私钥签署的每一个事件都会包含 pubkey 字段, 其中就是私钥派生的公钥. 不过为了以防不时之需, 我们还是能直接用私钥生成十六进制公钥.

使用 nak 从 ncryptsec 私钥派生十六进制公钥:

```bash:no-line-numbers
❯ nak key decrypt ncryptsec1xxxxx | nak key public
type the password to decrypt your secret key: ****
xxxxx
```

### npub {#npub-public-key}

使用 nak 从 ncryptsec 私钥派生公钥并编码为 npub:

```bash:no-line-numbers
❯ nak key decrypt ncryptsec1xxxxx | nak key public | nak encode npub
type the password to decrypt your secret key: ****
npub1xxxxx
```

### nprofile {#nprofile-public-key}

**使用十六进制公钥**, 嵌入中继信息再编码为 nprofile:

```bash:no-line-numbers
❯ nak encode nprofile xxxxx --relay wss://relay.nostr.moe
nprofile1xxxxx
```

如果想要嵌入多个中继则传入多个 `--relay` 即可:

```bash:no-line-numbers
❯ nak encode nprofile xxxxx --relay wss://relay.nostr.moe --relay wss://relay.damus.io
nprofile1xxxxx
```

## 实用工具 {#utilities}

- **在浏览器内随时操作 NIP-19 编码的浏览器扩展**: [TsukemonoGit/nake](https://github.com/TsukemonoGit/nake) (GitHub)
- **Nostr 公钥挖掘**: [grunch/rana](https://github.com/grunch/rana)
