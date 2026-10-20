import type vi from '../vi/guide';
import type { Messages } from '../../messages';

const guide: Messages<typeof vi> = {
  title: 'How to use the app',
  courses: {
    title: 'Choosing a language to study',
    choose: 'The app has three courses: {{names}}. The first time you open it, pick a language — each course has its own path, vocabulary, pronunciation and tests.',
    switch: 'Switch the language you study at any time with the “Studying” button in the navigation (or the All languages page).',
    separate: 'Progress, review schedules and mistakes are saved separately for each language, so switching back and forth never loses anything. Your day streak and daily time goal add up every language.',
  },
  language: {
    title: 'Interface language vs. the language you study',
    interface: 'The interface language (🌐 button: Tiếng Việt, English, 简体中文) is the language of buttons and explanations.',
    studied: 'The language you study (“Studying” button) is the language of the lessons. The two are independent: for example, a Vietnamese interface while learning Korean. Changing the interface never affects progress.',
    support: 'When the interface is Chinese, or the same as the language you study (English interface while learning English), choose in Settings whether meanings and translations are shown in Vietnamese or English.',
  },
  daily: {
    title: 'How should I study each day?',
    step1: 'Open <b>{{home}}</b> and press the main action button — the app always suggests what to do next.',
    step2: 'Review due words first (Practice → Due reviews).',
    step3: 'Study the day’s lesson: Objectives → Lesson → Practice → Quiz → Summary. Score ≥ {{pct}}% on the quiz to unlock the next lesson.',
    step4: 'At the end of the session, redo the questions you got wrong (Practice → Review mistakes).',
    breaks: 'Taking a few days off is fine: you continue right where you left off, and due words will wait for you.',
  },
  pron: {
    title: 'Pronunciation aids: pinyin, IPA, romanization',
    zh: 'Chinese: pinyin spells out how characters are read, with tone marks.',
    en: 'English: IPA transcriptions (e.g. /ˈtiːtʃər/) show the pronunciation, since spelling and sound often differ. Choose a US or UK accent in Settings.',
    ko: 'Korean: romanization (Latin letters) is only a starting aid; learn to read Hangul as early as you can. When the real pronunciation differs from the spelling, it is shown in brackets, e.g. [한구거].',
    toggle: 'Settings → “Always show pronunciation”: turn it off to practise reading the script; you can still reveal it when needed.',
  },
  speaking: {
    title: 'Speaking practice',
    with: 'If your browser has speech recognition, press the microphone and speak: the app shows what it heard. It is only a rough hint, not a pronunciation score.',
    without: 'Without it (or if you would rather not use the microphone) you can still practise: listen to the model, say it, then check yourself.',
    hint: 'Listen slowly, speak clearly and repeat a few times — comparing yourself with the model voice matters more than the recognition result.',
  },
  typing: {
    title: 'Typing in exercises',
    pinyin: 'Pinyin: type tone marks (nǐ hǎo) or a number after each syllable (ni3 hao3). The neutral tone needs no number. Type ü as v (lv4 = lǜ). Case and spaces don’t matter.',
    hanzi: 'Characters: install your system’s “Chinese Simplified – Pinyin” keyboard, type pinyin without tones and pick the character. No Chinese keyboard? Open the character palette below the input box.',
    spelling: 'English: type the correct spelling; case, punctuation and extra spaces don’t matter.',
    hangul: 'Korean: install your system’s Korean keyboard (2-Set Korean), or use the Hangul syllable palette below the input box.',
  },
  data: {
    title: 'Your data',
    body: 'Progress for every language is saved in your browser’s localStorage — nothing is sent anywhere and no account is needed. The data belongs to this browser and device: on another device you will start with empty progress. Use Settings → Export data to back up, and Restore to move to another device.',
  },
  limits: {
    title: 'Current limitations',
    audio: 'Audio uses your browser’s built-in voices, so quality depends on the device and the voices installed. Some single characters or sounds may not sound natural.',
    noScoring: 'Pronunciation is not scored (speech recognition is only a rough hint), and handwriting / stroke order is not recognized.',
    lessons_one: 'This version includes the first {{count}} day of lessons in full for each language; later lessons appear on the learning path as “Coming soon”.',
    lessons_other: 'This version includes the first {{count}} days of lessons in full for each language; later lessons appear on the learning path as “Coming soon”.',
    framework: 'The paths follow the HSK, CEFR and TOPIK frameworks for beginners but have not been officially aligned with their syllabuses or exams.',
  },
};

export default guide;
