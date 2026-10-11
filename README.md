# Tarnished's Ledger – setup guide

An Elden Ring 100% checklist that installs on your phone like an app and works offline.

## What's in this folder

| File | What it does |
|---|---|
| `index.html` | The whole app: page, styling, code and all 3,029 checklist entries |
| `manifest.webmanifest` | Gives the app its name, icon and full-screen mode when installed |
| `sw.js` | The service worker: saves the app on your phone so it opens without internet |
| `icons/` | App icons for Android, iPhone and the browser tab |

Keep all of these together. The app needs to be on a real web address (https) for installing and offline mode to work. Opening `index.html` straight from your computer works for testing, but it won't install or work offline that way.

---

## Step 1 – Put it online for free with GitHub Pages

1. Make a free account at **github.com**.
2. Click **+** (top right) → **New repository**.
   - Name it something like `ledger`.
   - Set it to **Public**, then click **Create repository**.
3. On the new repository page, click **uploading an existing file**.
4. Drag in **everything from this folder**: `index.html`, `manifest.webmanifest`, `sw.js`, `README.md` and the whole `icons` folder. Click **Commit changes**.
5. Go to **Settings** → **Pages** (left menu).
   - Under **Source**, choose **Deploy from a branch**.
   - Choose branch **main** and folder **/ (root)**, then click **Save**.
6. Wait about a minute and refresh. Your link appears at the top, like
   `https://YOUR-NAME.github.io/ledger/`

**Easier alternative: Netlify Drop.** Go to **app.netlify.com/drop**, drag this whole folder onto the page and you get a link straight away. Make a free account so the site doesn't expire.

## Step 2 – Install it on your phone

Open your link on your phone, then:

- **Android (Chrome):** tap **Install app** when the banner appears, or **⋮ menu → Install app** (it may say **Add to Home screen**).
- **iPhone (Safari only):** tap **Share** (square with an arrow) → **Add to Home Screen** → **Add**.

The Ledger icon appears on your home screen. It opens full-screen and works in airplane mode after the first launch.

## Your progress

- Ticks are saved **on that phone**, inside the app.
- Use **Save backup file** and **Load backup file** at the bottom of the Overview page to back up or to move progress to another device.
- **Careful:** deleting the app or clearing the browser's site data erases your ticks unless you have a backup.

## Updating the app later

If you edit `index.html` (in VS Code, for example):

1. Open `sw.js` and change `ledger-v1` to `ledger-v2` (then `v3` and so on each time).
2. Upload both changed files to GitHub again (same upload steps, it replaces the old ones).
3. Open the app twice. The first launch downloads the update and the second one shows it.

Your ticks are kept when you update.

## Testing on your computer

Installing and offline mode only work on a real web address. To test locally with them working:

- In VS Code, install the **Live Server** extension → right-click `index.html` → **Open with Live Server**.

## Background music

The music is original and generated live in the browser with the Web Audio API (a drone, choir-like pad, harp notes and bells in D minor). There are no audio files and nothing from the game's soundtrack. It starts only when you tap **Music**, because browsers block sound until you interact with the page.

## Credits

Checklist data and item icons come from the Roundtable Guides community checklists (roundtablehold.net, GPL-3.0). Item stats and descriptions come from the open Elden Ring API by Deliton Junior (github.com/deliton/eldenring-api, MIT). The DLC boss list is from Samurai Gamers. This is a fan project, not affiliated with FromSoftware or Bandai Namco.
