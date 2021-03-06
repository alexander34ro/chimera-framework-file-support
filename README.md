<h1 align="center">Chimera-Framework Affinity Update (xchimera)</h1>

<br />
<div align="center">
  <strong>Language Agnostic Framework for Stand-alone and Distributed Computing</strong>
</div>
<br />

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![codecov](https://codecov.io/gh/goFrendiAsgard/chimera-framework/branch/master/graph/badge.svg)](https://codecov.io/gh/goFrendiAsgard/chimera-framework)
<a href="https://gitter.im/chimera-framework?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"><img src="https://badges.gitter.im/Join Chat.svg" alt="Gitter"></a>

### Updated version of the Chimera Framework for use in orchestrating the Affinity Platform

**Enhanced with support for image/video streaming**

Chimera-Framework is a language agnostic framework for standalone and distributed computing. Chimera-Framework is written in `Node.Js`. As a component based software engineering framework, Chimera-Framework allows you to orchestrate several components to achieve a greater goal. The components can be written in any programming language. Even an executable binary file can also serve as component.

You can use [CHIML](https://github.com/goFrendiAsgard/chimera-framework/wiki/CHIML) in order to orchestrate the process. CHIML is a superset of YAML which is also a superset of JSON.

# How it looks like

```yaml
# hi.chiml
ins: name
out: output
do:
  - |date -> today
  - |("Hi ", name, " today is ", today) -> {$.concat} -> output
```

```bash
gofrendi@asgard:~$ date
Mon Feb  5 22:10:37 WIB 2018

gofrendi@asgard:~$ xchimera hi.chiml Naomi
Hi Naomi today is Mon Feb  5 22:10:37 WIB 2018
```

# Getting Started

1. Make sure you already have `Node.Js` and `npm` installed. If you don't have them installed yet, you can invoke:

   ```bash
   sudo apt-get install nodejs npm
   ```

2. Install *xchimera* by invoking:

   ```bash
   npm link
   ```

3. Visit the Chimera [wiki](https://github.com/goFrendiAsgard/chimera-framework/wiki/) for more information.

# Examples

* [Stand alone computing](https://github.com/goFrendiAsgard/chimera-framework/wiki/Getting-Started#stand-alone-computing)
* [Distributed computing](https://github.com/goFrendiAsgard/chimera-framework/wiki/Getting-Started#distributed-computing)

# License
Chimera-Framework is released under the MIT License.

# Citation
If you publish any article related to the Affinity Platform, please cite our paper on [https://dl.acm.org/doi/10.1145/3410530.3414371](https://dl.acm.org/doi/10.1145/3410530.3414371)

If you publish any article related to Chimera-Framework, please cite their paper on [http://ieeexplore.ieee.org/document/8320654/](http://ieeexplore.ieee.org/document/8320654/)