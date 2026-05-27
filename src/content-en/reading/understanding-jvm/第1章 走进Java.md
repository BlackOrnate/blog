#### Catalog

- [1. Overview](#1__2)
- [2. Java Technology System](#2_Java__23)

## 1. Overview

- Java
  - A programming language
  - A body of technology consisting of a set of computer software and specifications
    - Provides a complete support environment for software development and cross-platform deployment.
    - Widely used in
      - Embedded systems,
      - Mobile terminals
      - Enterprise servers
      - Mainframe
      - etc.
  - Advantages
    - A well-structured, object-oriented programming language.
    - Getting rid of the constraints of hardware platforms, realizing the idea of "write once, run everywhere".
    - Provides a relatively safe memory management and access mechanism.
    - Implemented hotspot code detection and runtime compilation and optimization, so that Java applications can get higher performance with the growth of runtime.
    - There is a comprehensive set of APIs and countless third-party libraries from commercial organizations and the open source community to help users implement a wide range of functionality.

## 2. The Java Technology Architecture

- The Java technology architecture, as defined by the JCP (Java Community Process), consists of the following components

  - The Java programming language
  - Java virtual machine implementations on various hardware platforms
  - Class file format
  - Java Class Library API
  - Third-party Java class libraries from commercial organizations and the open source community
- Segmented by the function of each component

  - JDK (Java Development Kit)

    - Java programming language
    - Java Virtual Machine
    - Java class libraries
    - JDK is the minimum environment to support the development of Java programs.
  - JRE (Java Runtime Environment)

    - A subset of the Java SE APIs in the Java Class Library APIs
    - Java Virtual Machine
    - JRE is the standard environment for running Java programs.

  ! [What the Java technology system consists of](https://i-blog.csdnimg.cn/blog_migrate/006301c096d73884cc63958cfeb53868.webp?x-image-process=image/format,png#pic _center)
- By the domain served by the technology, or by the business focus of the technology

  - Java Card
    - A platform that supports Java applets running on small memory devices (smart cards).
  - Java ME (Micro Edition)
    - A platform that supports Java programs running on mobile terminals (cell phones, PDAs).
    - Streamlining of the Java API
    - Mobile device-specific support has been added.
    - **Android (developed mainly in Java) is not part of Java ME**.
  - Java SE (Standard Edition)
    - Supports the Java platform for desktop-oriented applications (applications on Windows).
    - Java SE (Standard Edition) A Java platform that supports desktop-oriented applications (applications under Windows)
  - Java EE (Enterprise Edition)
    - Java platform for enterprise applications (ERP, MIS, CRM applications) using a multi-tier architecture.
    - Provides the Java SE API, but also made a lot of targeted expansion, and provides related deployment support.