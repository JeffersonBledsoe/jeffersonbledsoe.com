---
title: 'Keeping my mac organised with homebrew'
---

I use [homebrew](https://brew.sh/) to keep track of everything that goes on my mac. Desktop applications are handled by [homebrew-cask](https://github.com/Homebrew/homebrew-cask), drivers are handled by [homebrew-cask-drivers](https://github.com/Homebrew/homebrew-cask-drivers) and fonts are handled by [homebrew-cask-fonts](https://github.com/Homebrew/homebrew-cask-fonts). The homebrew community are pretty welcoming to new casks if you find software that isn't included and there's [documentation for adding new casks](https://docs.brew.sh/Adding-Software-to-Homebrew) available.

It's inevitable that some software won't be available outside of the mac app store though, or maybe you've already got a good library there. [`mas`](https://formulae.brew.sh/formula/mas) is the solution, allowing you to install App Store apps directly through homebrew.

To keep all this backed up, I manually run `brew bundle dump` occasionally to produce a `Brewfile` which lists everything I have installed. I then upload this to cloud storage. If I ever need to restore from a backup, I can run `brew bundle` from the same directory the `Brewfile` is in and brew will install everything again. I've also used `Brewfile`s to define dependencies for some projects!

When it comes to uninstalling, `brew uninstall --cask --zap` will not only remove the app, but also clean up any files leftover. This solves one of my biggest pain points with the mac.
