
![图怪兽_15dc7d359d9ec85052a0dd264bb585bb_94678.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a33ced78178d4c8e86fa8d13d147e7c6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=900&h=383&s=275894&e=png&b=fdc62e)

### 背景

由于公司规范原因，网络上将开发环境的网络隔绝开，开发环境中的网络只能访问白名单的，域名或者IP地址，目的是限制员工上网的范围，从而达到保护公司的财产安全的目的。在现代软件开发中，随着前端项目的不断增多，对于代码管理和依赖管理的需求也在不断增长。在某些情况下，你可能希望将前端依赖项存储在私有化的仓库中，以确保代码的安全性、可靠性和可控性。本文将介绍如何使用 `Nexus Repository Manager` 来搭建前端的私有化仓库，以满足这些需求。

### 前端依赖管理的挑战

前端开发通常依赖于众多的第三方库和包。这些依赖项可能包括 `JavaScript` 库、`CSS`框架、图标集和其他资源。通常情况下，前端开发人员使用包管理器（如`npm`、`Yarn`或`pnpm`）来安装和管理这些依赖项。然而，当涉及到私有或定制的前端依赖项时，传统的包管理器可能无法满足需求。

以下是一些前端依赖管理面临的挑战（在开发的过程中一步步发现的）：

1.  **私有依赖项**：某些项目可能需要使用私有或定制的前端库，这些库不应该公开发布在公共的包存储库中。
2.  **版本控制**：为了确保代码的稳定性，前端项目通常需要使用特定版本的依赖项。在使用公共包管理器时，依赖项的版本可能会频繁更改，从而引发潜在的问题。
3.  **安全性**：确保依赖项的安全性至关重要。需要能够监控依赖项的漏洞，并及时应对这些漏洞。
4.  **离线支持**：在某些情况下，前端项目需要在没有互联网连接的情况下工作。因此，需要一种方式来管理离线依赖项。

Nexus Repository Manager 是一个功能强大的仓库管理器，可以帮助解决上述问题，并搭建前端的私有化仓库。

### 搭建过程

#### 步骤1：安装Nexus Repository Manager

首先，需要安装Nexus Repository Manager。Nexus有两个版本可供选择：Nexus Repository OSS（免费开源版本）和Nexus Repository Pro（商业版本）。您可以根据自己的需求选择其中一个版本进行安装。

要安装Nexus Repository OSS，请按照以下步骤进行操作：

1.  前往 `Nexus` 官方网站（[https://www.sonatype.com/nexus/repository-oss）下载最新版本的Nexus](https://www.sonatype.com/nexus/repository-oss%EF%BC%89%E4%B8%8B%E8%BD%BD%E6%9C%80%E6%96%B0%E7%89%88%E6%9C%AC%E7%9A%84Nexus) Repository OSS。
2.  解压下载的文件。
3.  运行Nexus Repository Manager，您可以使用以下命令：

```bash
cd nexus-x.x.x/bin
./nexus run
```

其中，`x.x.x`是 Nexus 的版本号。

4.  在浏览器中访问`http://localhost:8081`以打开Nexus的Web界面。 默认是8081 端口号


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f0d01cd440a45a3be7fe27a679cc4ad~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=931&s=62019&e=png&b=fbfbfb)

#### 步骤2：配置Nexus Repository Manager

Nexus Repository Manager安装成功后，需要进行一些配置，以便搭建前端的私有化仓库。


#### 创建一个仓库

1.  登录Nexus的Web界面（默认用户名和密码是admin/admin123）。
2.  转到 “Repositories”（仓库）选项卡。


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c397978356045d3b9e7649b9d84ecb4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=931&s=147663&e=png&b=f6f6f6)

3.  单击“Create Repository”（创建仓库）按钮。
4.  选择“npm (proxy)”（npm代理）作为仓库类型。您可以选择其他适用于前端的仓库类型，如“npm (hosted)”（npm主机）或“npm (group)”（npm组）。


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4183d279bac743db879110de1a45ac92~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=931&s=125824&e=png&b=f7f7f7)

5.  配置仓库的名称、URL和其他设置，然后单击“Create”（创建）按钮。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/baadc6d5a4f7404e995f2fa2c62f09d6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=931&s=111332&e=png&b=f8f8f8)

6. 特别提醒  这里使用是否开启允许部署和更新项目
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45982ebfb5d14ac2ad65ea6d9f5a7065~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=931&s=119822&e=png&b=f8f8f8)

这里看用户的项目需求来选择即可

#### 配置前端项目

现在，您需要将前端项目配置为使用 `Nexus Repository Manager` 作为依赖项的源。

1. 在`package.json`文件中，将Nexus Repository Manager的URL添加为npm的注册表源。示例：

这里 `localhost` 是举例，建议后面部署到内网上，直接使用域名或者IP地址
```json
"publishConfig": {
  "registry": "http://localhost:8081/repository/npm-proxy/"
},
```

2. 确保项目的依赖项正确指定了版本号，以确保版本的可控性。

#### 步骤3：使用私有化仓库

现在，可以开始使用私有化仓库来管理前端依赖项。

1.  使用包管理器（如npm或Yarn）安装项目的依赖项。当您运行`npm install`或`yarn install`时，它们将从Nexus Repository Manager 下载依赖项。


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dca5b3e6e9574c31b103c58dfa1818e4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=931&s=141942&e=png&b=f6f6f6)

```bash
yarn config set registry http://localhost:8081/repository/npm-group/
```

上面就是需要设置下载依赖的地址了，不同包管理工具都需要设置的一次。

2.  确保前端项目中可以成功构建和运行，而不受外部依赖项的影响。

#### 步骤4：监控和维护

一旦您的前端项目开始使用私有化仓库，您需要定期监控和维护它，以确保依赖项的安全性和稳定性。您可以使用`Nexus Repository Manager` 提供的工具来监控漏洞、版本更新和仓库的状态。


### 总结

通过使用Nexus Repository Manager，您可以搭建一个稳定、安全、可控的前端私有化仓库，以满足前端依赖管理的需求。这使您能够更好地管理私有依赖项、确保代码的可维护性和安全性，以及满足特定项目的需求。

最后，搭建前端的私有化仓库是一个投资于项目可维护性和安全性的重要步骤。通过合理配置Nexus Repository Manager，您可以为前端项目提供一个可靠的依赖管理解决方案，确保项目的成功交付和运行。希望本文提供的步骤和建议对您在实施私有化仓库方面有所帮助。蟹蟹

### 参考文章

https://developer.mozilla.org/  
https://www.sonatype.com/products/sonatype-nexus-repository  


