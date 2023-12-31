+++
title = "2023 End-of-Year Projects Update"
author = "TheBossMagnus"
description = "Retrospective on the 2023, featuring announcements, updates and some behind the scene"
date = "2023-12-31"
+++

<div style="display: flex; justify-content: space-between;">
    <div style="width: 50%; padding-right: 10px;">
        Greetings, everyone! It's been a bit since my last blog post, but I'm back with some exciting updates. First and foremost, a heartfelt thank you to each one of you who has supported me on this journey. When I started sharing my mods on Modrinth, I never imagined hitting nearly 17k downloads in just one year!
    </div>
    <div style="width: 33%;">
        {{< figure src="/images/2023-retrospective/image.png"       alt="Modinth dashboard showing 16.7k downloads and 35       followers" position="center" caption="Modinth     dashboard showing 16.7k downloads and 35 followers"       captionPosition="center" >}}
    </div>
</div>

## What's New
### Thunder
I'm thrilled to announce the release of Thunder version 1.0.0! With this update, Thunder now supports snapshots, approximately 2 days after their initial release by Mojang. To improve project maintainability and reduce bugs, I've removed certain experimental mods with marginal optimizations. Thanks to [ModernFix](https://modrinth.com/mod/modernfix) and [Sodium 0.5](https://modrinth.com/mod/sodium/version/mc1.20.1-0.5.0), Thunder has seen notable performance enhancements. For a more user-friendly experience, I've also changed the versioning scheme and the changelog format using a Python tool I created.

## Storm: A New Pack
Keeping my promise, I've introduced a new modpack called Storm, fulfilling the desire for a "plus" version with Optifine features. It's been in open-beta on Modrinth for a few days, supporting versions 1.20.1, 1.20.2, and 1.20.4 on Fabric. Maintaining the same optimization layer as Thunder, Storm adds the majority of Optifine features, including connected glass and dynamic lights. You can find it [here](https://modrinth.com/modpack/storm).
{{< figure src="/images/2023-retrospective/image2.png" alt="The download page for Storm" position="center" caption="The download page for Storm" captionPosition="center" >}}

## Other Quick Updates
* I've recently released a tool for automatically generating changelogs for Thunder and Storm. For those interested, it's available on [GitHub](https://github.com/TheBossMagnus/ModpackChangelogger). Developing it has been a great opportunity for me to learn Python, and I've had a lot of fun with it.
* The old website theme (hugo-termianl) has been discontinued. Now, as you can see, I'm using hugo-coder, which, in my humble opinion, looks even better.
* Due to the unfortunate presence of Fracturizer (a malware affecting the Minecraft modding community), I've taken steps to strengthen security measures. Firstly, I've begun signing my Git commits with a [GPG key](https://thebossmagnus.github.io/TheBossMagnus_public.txt). Additionally, I've changed all the more sensitive emails, passwords, and tokens and will continue to do so regularly.
* Since December, I've become a moderator on the Fabulously Optimized Discord server, another amazing Minecraft modpack. Big thanks to Robotker and the rest of the staff for their trust!

In conclusion, it's been a wild ride of new developments and cool challenges. A big thank you for sticking around and being awesome. Happy New Year! 🎉