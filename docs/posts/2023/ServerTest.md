---
index: 2
icon: page
title: ServerTest
author: GIS-FSDE
date: 2023-12-15
category:
  - TEST
tags: []
sticky: false
footer: 这是测试显示的页脚
description: 内容描述
shortTitle: template
star: "111"
banner: https://qnimg.gisfsde.com/markdown/heros.jpg
image: https://qnimg.gisfsde.com/markdown/heros.jpg
article: false
---
# 一、测试环境
电信信创云

|对象|CPU|内存|系统盘|数据盘|
|----|----|----|----|----|
|数量|8|32|40|500|


## CPU
银河麒麟V10SP1
```bash
NAME="Kylin Linux Advanced Server"
VERSION="V10 (Tercel)"
ID="kylin"
VERSION_ID="V10"
PRETTY_NAME="Kylin Linux Advanced Server V10 (Tercel)"
ANSI_COLOR="0;31"
Linux version 4.19.90-23.8.v2101.ky10.x86_64 (KYLINSOFT@localhost.localdomain) (gcc version 7.3.0 (GCC)) #1

Architecture:                    x86_64
CPU op-mode(s):                  32-bit, 64-bit
Byte Order:                      Little Endian
Address sizes:                   48 bits physical, 48 bits virtual
CPU(s):                          8
On-line CPU(s) list:             0-7
Thread(s) per core:              1
Core(s) per socket:              8
Socket(s):                       1
NUMA node(s):                    1
Vendor ID:                       AuthenticAMD
CPU family:                      24
Model:                           1
Model name:                      Hygon C86 7280 32-core Processor
Stepping:                        1
CPU MHz:                         1999.999
BogoMIPS:                        3999.99
Virtualization:                  AMD-V
Hypervisor vendor:               KVM
Virtualization type:             full
NUMA node0 CPU(s):               0-7
Vulnerability Spec store bypass: Vulnerable
Vulnerability Spectre v1:        Mitigation; usercopy/swapgs barriers and __user pointer sanitization
Vulnerability Spectre v2:        Mitigation; Full AMD retpoline, STIBP disabled, RSB filling
```

## 内存	
```shell
              total        used        free      shared  buff/cache   available
Mem:           30Gi       228Mi       3.7Gi        12Gi        26Gi        17Gi
Swap:            0B          0B          0B
```

## 磁盘
```
Filesystem      Size  Used Avail Use% Mounted on
devtmpfs         16G     0   16G   0% /dev
tmpfs            16G     0   16G   0% /dev/shm
tmpfs            16G   25M   16G   1% /run
tmpfs            16G     0   16G   0% /sys/fs/cgroup
/dev/vda1        40G   17G   21G  45% /
tmpfs            16G     0   16G   0% /tmp
tmpfs           3.1G     0  3.1G   0% /run/user/0
tmpfs            12G   12G     0 100% /tmp/memory

```


# 二、测试内容

- [ ] GeoServer适配与压测
- [ ] 两类主流国产数据库（人大金仓、翰高）及其GIS插件适配与压测
- [ ] 程序适配与压测
- [ ] 程序中间件（Nginx、Redis）适配性测试
# 三、详细报告

## GeoServer适配与压测
## 两类主流国产数据库（人大金仓、翰高）及其GIS插件适配与压测
## 程序适配与压测
## 程序中间件（Nginx、Redis）适配性测试

