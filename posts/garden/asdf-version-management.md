---
title: 'ASDF Version management'
---

I recently came across [asdf](https://asdf-vm.com/). This tool is essentially a single replacement for `pyenv`, `rbenv` and `nvm`. It uses a plugin system to support various tools, programming languages and runtimes. It uses a `.tool-versions` file to determine what you need installing, but it is also capable of using your existing version files by setting the `legacy_version_file` option: <https://asdf-vm.com/manage/configuration.html#legacy-version-file>.
