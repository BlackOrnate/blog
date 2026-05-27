#### 目录

- [1. 概述](#1__2)
- [2. Java 技术体系](#2_Java__23)

## 1. 概述

- Java
  - 一门编程语言
  - 一个由一系列计算机软件和规范组成的技术体系
    - 提供了完整的用于软件开发和跨平台部署的支持环境
    - 广泛应用于
      - 嵌入式系统、
      - 移动终端
      - 企业服务器
      - 大型机
      - 等
  - 优点
    - 拥有一门结构严谨、面向对象的编程语言
    - 摆脱了硬件平台的束缚，实现了 “一次编写，到处运行” 的思想
    - 提供了一种相对安全的内存管理和访问机制
    - 实现了热点代码检测和运行时编译及优化，使得 Java 应用能随着运行时间的增长而获得更高的性能
    - 有一套完善的应用程序接口，还有无数来自商业机构和开源社区的第三方类库来帮助用户实现各种各样的功能

## 2. Java 技术体系

- JCP（Java Community Process，Java 社区）所定义的 Java 技术体系包括以下几个组成部分

  - Java 程序设计语言
  - 各种硬件平台上的 Java 虚拟机实现
  - Class 文件格式
  - Java 类库 API
  - 来自商业机构和开源社区的第三方 Java 类库
- 按照各个组成部分的功能进行划分

  - JDK（Java Development Kit）

    - Java 程序设计语言
    - Java 虚拟机
    - Java 类库
    - JDK 是用于支持 Java 程序开发的最小环境
  - JRE（Java Runtime Environment）

    - Java 类库 API 中的 Java SE API 子集
    - Java 虚拟机
    - JRE 是支持 Java 程序运行的标准环境

  ![Java 技术体系所包括的内容](https://i-blog.csdnimg.cn/blog_migrate/006301c096d73884cc63958cfeb53868.webp?x-image-process=image/format,png#pic_center)
- 按照技术所服务的领域来划分，或者按照技术关注的重点业务进行划分

  - Java Card
    - 支持 Java 小程序（Applets）运行在小内存设备（智能卡）上的平台
  - Java ME（Micro Edition）
    - 支持 Java 程序运行在移动终端（手机、PDA）上的平台
    - 对 Java API 有所精简
    - 加入了移动终端的针对性支持
    - **Android（主要使用 Java 开发）不属于 Java ME**
  - Java SE（Standard Edition）
    - 支持面向桌面级应用（Windows 下的应用程序）的 Java 平台
    - 提供了完整的 Java 核心 API
  - Java EE（Enterprise Edition）
    - 支持使用多层架构的企业应用（ERP、MIS、CRM应用）的 Java 平台
    - 提供 Java SE API，还对其做了大量有针对性的扩充，并提供了相关的部署支持