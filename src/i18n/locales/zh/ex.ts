import type vi from '../vi/ex';
import type { Messages } from '../../messages';

const ex: Messages<typeof vi> = {
  listenChoose: '听录音，选择正确答案',
  matchMeaning: '把词语和意思连起来',
  typePinyinOf: '输入“{{meaning}}”的拼音（可以用声调符号 mǎ，也可以用数字 ma3）',
  arrange: '连词成句：“{{meaning}}”',
  chooseMeaning: '选择正确的意思',
  meansExplain: '{{word}} 的意思是“{{meaning}}”。',
  chooseWord: '选出意思是“{{meaning}}”的词',
  isWordExplain: '“{{meaning}}”是 {{word}}。',
  listenWord: '听录音，选出你听到的词',
  heardExplain: '你听到的是：{{word}}——“{{meaning}}”。',
  listenMeaning: '听录音，选择正确的意思',
  typePinyinWord: '输入拼音（声调符号或数字）——“{{meaning}}”',
  readsAs: '{{text}} 读作 {{pron}}。',
  write: {
    hanzi: '输入“{{meaning}}”（{{pron}}）的汉字',
    spelling: '听录音，拼写意思是“{{meaning}}”的单词',
    hangul: '听录音，用韩文字母输入意思是“{{meaning}}”的词',
  },
  writtenAs: '“{{meaning}}”写作 {{text}}。',
  fillBlank: '选词填空——“{{meaning}}”',
  sentenceExplain: '{{sentence}} — {{meaning}}',
  readSentence: '阅读句子，选择正确的意思',
  listenSentence: '听句子，选择正确的意思',
  listenTone: '听录音，选择正确的声调',
  toneExplain: '{{text}} 读作 {{pron}}（第{{tone}}声）——“{{meaning}}”。',
  listenContrast: '听录音，选择正确的音（{{pair}}）',
  contrastExplain: '{{word}}——“{{meaning}}”。{{note}}',
  toneHint: '字母对了，但声调错了或没有标声调。',
  spellingHint: '差一点——再检查一下拼写。',
};

export default ex;
