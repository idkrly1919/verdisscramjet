<p align="center">
  <img src=".github/branding/logo.png" height="150px"></img>
</p>
<h1 align="center" id="readme-top">verdis.</h1>
<p align="center">
  <sup align="center"><i>/iˈTHirēəl/</i></sup><br>
<sub align="center"><i>/uh-thee-ree-uhl/</i></sub>
</p>
<p align="center">a sleek proxy with speed, design, and usability in mind. easy to deploy to any static host.</p>

<p align="center">

<img src="https://api.netlify.com/api/v1/badges/65c3ecb1-9c6f-4f3e-994b-3542cf5c9ebd/deploy-status" alt="Netlify Build Status">

</p>

## table of contents
- about
  - features
  - proxy support
  - customisation
  - roadmap
  - bug reporting
  - security reporting
- faq
- deployment
  - static hosts
    - deployment buttons
    - firebase instructions
    - github pages instructions
  - local deployment
  - development
- credits

## about
### features
- scramjet
- super fast speeds
- tab title cloaking
- icon cloaking
- about:blank cloaking
- server selection
- theming
- super customisable
- support for popular sites
- support for emulators

<sub> [(back to the top)](#readme-top)</sub>

### proxy support
- easyfun.gg (now.gg alternative)
- youtube/tiktok
- github
- geforce now (partial)
- emulatorjs
- vscode
- discord/guilded
- google services
- lots of other websites

<sub> [(back to the top)](#readme-top)</sub>

### customisation
a lot of things can be customised on this website, including the following

- favicon
- tab title
- colors
- wisp server
- bare server
- wisp or bare (toggle)
- panic link
- panic keybind
- adblock (on/off)

<sub> [(back to the top)](#readme-top)</sub>

### roadmap
1. add tabbing
2. add bookmarks
3. add auto cloaking
4. add support via netlify (on-site form)
5. get a domain (e.g. verdis.net)

more will be added soon.

<sub> [(back to the top)](#readme-top)</sub>

### reporting bugs
if you found a bug on the website, report it to us using the issues page. we have bug templates, so we request you use those. if your issue is not equipped with necessary info or is not clear (e.g. 'the website isnt working'), **we will ignore it.**

going the extra mile? open a pr if you have a patch for the bug. truly appreciated + you will be credited.

<sub> [(back to the top)](#readme-top)</sub>

### reporting security issues
same thing as above

<sub> [(back to the top)](#readme-top)</sub>

## faq
#### q: what do i do if it fails to load?
a: hard refresh (ctrl/cmd + shift + r) and try again. if the issue persists, please report it.

#### q: why doesn't this work on windows?
a: this is discussed in local deployment. it's because the build scripts only work on linux for some reason.

#### q: why is it so slow?
a: depends on your network and traffic. if lots of people are proxying things or your network is slow, it will take lots of time to load.

#### q: why do none of your websites work?
a: if you are using a site such as easyfun.gg, and it isn't working, that isn't our problem. go report it to them instead.

#### q: why won't cloudflare turnstile load?
a: it thinks you are a bot.

#### q: why is youtube blocking me?
a: it thinks you are a bot.

#### q: why can't i watch full youtube videos? this sucks.
a: this is because youtube still thinks you are a bot.

<sub>*this is a live document and is subject to change</sub>

<sub> [(back to the top)](#readme-top)</sub>

## deployment

### static hosts
you can deploy to any static host basically, including the following

- vercel (not recommended, some sites will break)
- cloudflare pages
- netlify (recommended)
- firebase
- github pages (not recommended, some sites will break)

you could also use the dedicated buttons below for deployments

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=github.com%2Ftenclips%2Fverdis&project-name=verdis-proxy&repository-name=verdis-proxy&demo-title=preview%20the%20website%20here&demo-description=a%20demo%20of%20this%20proxy&demo-url=https%3A%2F%2Fetherealproxy.netlify.app%2F&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Ftenclips%2Fverdis%2Frefs%2Fheads%2Fmaster%2F.github%2Fbranding%2Flogo.png%3Ftoken%3DGHSAT0AAAAAADJMSCMGTUNVM2X2UIB5P3JS2F3FAIQ)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/tenclips/verdis)

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/tenclips/verdis)

if you don't know how to deploy to firebase or github pages, follow the guides below.

#### firebase hosting

first, clone the repo by running
```bash
git clone https://github.com/tenclips/verdis
```

then install fb tools
```bash
pnpm i -g firebase-tools
```

now initialize a project with hosting (be sure to change project name in .firebaserc)

```bash
firebase init hosting
```
follow the steps in the cli setup and finally deploy

```bash
firebase deploy
```

#### github pages
first, either fork or clone this repo
```bash
git clone https://github.com/tenclips/verdis
```

if you cloned, initialize a repo on github by uploading it or using the initialize button in vscode source control.

now go to your repo page > settings > pages

there is a dropdown where you can select the deployment folder. select dist.

then hit deploy.

wait and you're done.

<sub> [(back to the top)](#readme-top)</sub>

### local deployment

> [!CAUTION]
> building with vite will fail 11 times out of 10 on windows systems. if you are locally deploying this, we strongly recommend using a unix based environment or an ide with a unix based environment (e.g. firebase studio, formerly project idx)

first, clone the repository by running this command
```bash
git clone https://github.com/tenclips/verdis
cd verdis
```

then install the dependencies using your package manager of choice
```bash
pnpm i
```

now build the files

```bash
pnpm run build
```

and finally run a server
```bash
pnpm start
```

<sub> [(back to the top)](#readme-top)</sub>

### development
now if you're tryna develop for this program, the process is similar

install the dependencies using your package manager
```bash
pnpm i
```

build the files
```bash
pnpm run build
```

and finally start a server
```bash
pnpm dev
```

<sub> [(back to the top)](#readme-top)</sub>

## credits
made with <3 by x8r

thank you to titanium network and mercury workshop for scramjet, libcurl, epoxy, wisp, and more.

and thank you to all the contributors.

<sub> [(back to the top)](#readme-top)</sub>

<sub><sup>alr have a nice day</sup></sub>