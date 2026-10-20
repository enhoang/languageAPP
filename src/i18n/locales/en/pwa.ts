import type vi from '../vi/pwa';
import type { Messages } from '../../messages';

const pwa: Messages<typeof vi> = {
  install: {
    button: 'Install app',
    short: 'Install',
    bannerTitle: 'Install the app on this device',
    bannerText: 'Open it from your home screen, run it in its own window and study even without a connection.',
    bannerIosText: 'On iPhone/iPad: tap the Share button, then “Add to Home Screen”.',
    howTo: 'How to install',
    dismiss: 'Hide reminder',
    later: 'Later',
    installed: 'Installed — you are using the installed app.',
    installedNow: 'Installed! You can open the app from your home screen or app list.',
    accepted: 'Installing…',
    dismissed: 'You closed the install dialog. You can install any time from Settings.',
    noPrompt: 'This browser doesn’t let a website open the install dialog. Install it from the browser’s menu as shown below (if the browser supports it).',
    note: 'The app installs from the browser — no APK or EXE download. How installation works, and what is supported, varies by browser and operating system.',
    sameData: 'The installed app shares your learning data with the website in the same browser on this device. Exception — iPhone/iPad: an app added to the Home Screen has its own storage, separate from Safari; use Backup/Restore to move your progress.',
  },
  platforms: {
    title: 'Installation by device',
    detected: 'Fits this browser',
    ios: {
      name: 'iPhone / iPad (Safari)',
      steps: 'Open the site in Safari → tap Share (the square with an up arrow) → “Add to Home Screen” → “Add”. On iOS 16.4 and later, Chrome and Edge on iPhone also offer this in their Share menu.',
    },
    android: {
      name: 'Android (Chrome, Edge, Samsung Internet)',
      steps: 'Tap “Install app” above if it appears, or open the browser menu ⋮ → “Install app” / “Add to Home screen”.',
    },
    desktop: {
      name: 'Computer (Chrome, Edge)',
      steps: 'Click “Install app” above, the install icon at the end of the address bar, or menu ⋮ → “Install this site as an app”.',
    },
    safariMac: {
      name: 'Mac (Safari 17 or later)',
      steps: 'File menu → “Add to Dock”.',
    },
    firefox: {
      name: 'Firefox',
      steps: 'Firefox for Android: menu ⋮ → “Install”. Firefox on desktop does not install web apps — use Chrome, Edge or Safari.',
    },
  },
  offline: {
    banner: 'You are offline. Lessons, vocabulary, ISTQB and your progress still work; AI conversations and some speech services need a connection.',
    backOnline: 'You are back online.',
    readyTitle: 'Ready to work offline',
    ready: 'The app has been saved for use without a connection.',
  },
  update: {
    title: 'A new version is available',
    text: 'Your progress is saved automatically. If you are in the middle of a test or a conversation, finish it first — an unfinished one may not be kept when the page reloads.',
    now: 'Update now',
    later: 'Later',
    check: 'Check for updates',
    checking: 'Checking…',
    upToDate: 'You are using the latest version.',
    unavailable: 'Could not check (needs a connection, or the browser does not support service workers).',
  },
  chunk: {
    title: 'This part could not be loaded',
    text: 'You may be offline and this part has not been saved yet, or the app was just updated. Your learning progress is not affected.',
    reload: 'Reload the app',
  },
  settings: {
    title: 'App & offline',
    status: 'Status',
    statusInstalled: 'Running as an installed app',
    statusBrowser: 'Running in the browser',
    statusOnline: 'Online',
    statusOffline: 'Offline',
    swActive: 'Saved for offline use',
    swNone: 'Not saved for offline use yet (the site must be opened over HTTPS and load completely once)',
    showReminder: 'Show the install reminder again',
    offlineTitle: 'Works offline',
    offlineWorks: 'All Chinese, English and Korean lessons; vocabulary, grammar, practice and tests; ISTQB knowledge; prewritten conversations (demo mode); your progress and saved words.',
    offlineNeedsNet: 'Needs a connection: AI conversations; speech recognition in Chrome/Edge (audio is sent to an online service); online voices in some browsers; downloading new versions.',
    storageTitle: 'Data storage',
    storageText: 'Progress is stored only in this device’s browser (no account, no sync). It is lost if you clear the site’s data, uninstall the app (depending on the platform), or the browser evicts it when storage runs low. Make regular backups.',
    storageUsage: 'Using {{used}} of about {{quota}}',
    persisted: 'Protected from automatic clean-up',
    notPersisted: 'Not protected: the browser may clear it when storage runs low',
    persist: 'Request persistent storage',
    persistDenied: 'The browser has not agreed yet (it usually does once the app is installed or used often).',
    storageUnsupported: 'The browser does not report storage information.',
    backupLink: 'Back up progress',
  },
};

export default pwa;
