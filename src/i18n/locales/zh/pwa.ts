import type vi from '../vi/pwa';
import type { Messages } from '../../messages';

const pwa: Messages<typeof vi> = {
  install: {
    button: '安装应用',
    short: '安装',
    bannerTitle: '把应用安装到本设备',
    bannerText: '从主屏幕快速打开，在独立窗口中运行，没有网络也能学习。',
    bannerIosText: 'iPhone/iPad：点击“分享”按钮，然后选择“添加到主屏幕”。',
    howTo: '查看安装方法',
    dismiss: '隐藏提醒',
    later: '以后再说',
    installed: '已安装——你正在使用已安装的应用。',
    installedNow: '安装完成！可以从主屏幕或应用列表打开。',
    accepted: '正在安装……',
    dismissed: '你关闭了安装对话框。随时可以在“设置”中重新安装。',
    noPrompt: '此浏览器不允许网页打开安装对话框。请按下面的说明通过浏览器菜单安装（如果浏览器支持）。',
    note: '应用直接从浏览器安装，无需下载 APK 或 EXE。安装方式和支持情况因浏览器和操作系统而异。',
    sameData: '已安装的应用与同一设备、同一浏览器中的网页共用学习数据。例外——iPhone/iPad：添加到主屏幕的应用有独立的存储，与 Safari 分开；请用“备份/恢复”转移进度。',
  },
  platforms: {
    title: '各设备的安装方法',
    detected: '适用于当前浏览器',
    ios: {
      name: 'iPhone / iPad（Safari）',
      steps: '用 Safari 打开网站 → 点击“分享”（带向上箭头的方框）→“添加到主屏幕”→“添加”。iOS 16.4 及以上，iPhone 上的 Chrome 和 Edge 的分享菜单中也有此项。',
    },
    android: {
      name: 'Android（Chrome、Edge、三星浏览器）',
      steps: '如果上方出现“安装应用”按钮就点击它；或打开浏览器菜单 ⋮ →“安装应用”/“添加到主屏幕”。',
    },
    desktop: {
      name: '电脑（Chrome、Edge）',
      steps: '点击上方的“安装应用”，或地址栏末尾的安装图标，或菜单 ⋮ →“将此网站作为应用安装”。',
    },
    safariMac: {
      name: 'Mac（Safari 17 及以上）',
      steps: '“文件”菜单 →“添加到程序坞”。',
    },
    firefox: {
      name: 'Firefox',
      steps: 'Android 版 Firefox：菜单 ⋮ →“安装”。电脑版 Firefox 不支持安装网页应用——请使用 Chrome、Edge 或 Safari。',
    },
  },
  offline: {
    banner: '你目前处于离线状态。课程、词汇、ISTQB 和学习进度仍可正常使用；AI 对话和部分语音服务需要联网。',
    backOnline: '网络已恢复。',
    readyTitle: '可以离线使用了',
    ready: '应用已保存，没有网络时也能使用。',
  },
  update: {
    title: '有新版本',
    text: '学习进度已自动保存。如果你正在做测试或对话，请先完成再更新——重新加载时，未完成的内容可能不会保留。',
    now: '立即更新',
    later: '以后再说',
    check: '检查更新',
    checking: '正在检查……',
    upToDate: '你使用的是最新版本。',
    unavailable: '无法检查（需要联网，或浏览器不支持 Service Worker）。',
  },
  chunk: {
    title: '无法加载这部分内容',
    text: '可能你正处于离线状态且这部分尚未保存，或者应用刚刚更新。你的学习进度不受影响。',
    reload: '重新加载应用',
  },
  settings: {
    title: '应用与离线',
    status: '状态',
    statusInstalled: '以已安装应用的方式运行',
    statusBrowser: '在浏览器中运行',
    statusOnline: '在线',
    statusOffline: '离线',
    swActive: '已保存，可离线使用',
    swNone: '尚未保存以供离线使用（需通过 HTTPS 打开网站并完整加载一次）',
    showReminder: '重新显示安装提醒',
    offlineTitle: '离线可用',
    offlineWorks: '全部中文、英语、韩语课程；词汇、语法、练习和测试；ISTQB 知识；预设对话（演示模式）；学习进度和收藏的词语。',
    offlineNeedsNet: '需要联网：AI 对话；Chrome/Edge 中的语音识别（音频会发送到在线服务）；部分浏览器的在线语音；下载新版本。',
    storageTitle: '数据存储',
    storageText: '进度只保存在本设备的浏览器中（无账号、不同步）。清除网站数据、卸载应用（视平台而定），或浏览器在空间不足时自动清理，都会导致数据丢失。请定期备份。',
    storageUsage: '已用 {{used}} / 约 {{quota}}',
    persisted: '已受保护，不会被自动清理',
    notPersisted: '未受保护：空间不足时浏览器可能会清除',
    persist: '申请持久存储',
    persistDenied: '浏览器尚未同意（通常在安装应用或经常使用后会同意）。',
    storageUnsupported: '浏览器未提供存储信息。',
    backupLink: '备份进度',
  },
};

export default pwa;
