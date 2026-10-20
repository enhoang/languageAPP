import type { Gloss, LText } from '../../../types';
import { arrangeWith, choice, listen, MATCH_PROMPT, typeIt, wordsOf } from '../../helpers';
import type { DayContent } from '../../helpers';

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });
const G = (vi: string, en: string): Gloss => ({ vi, en });
const arrange = arrangeWith(' ');

const QWORD = L('Từ để hỏi', 'Question word', '疑问词');
const VERB_Q = L('Động từ + -요? (lên giọng)', 'Verb + -요? (rising tone)', '动词 + -요？（升调）');
const HON = L('Động từ kính ngữ -세요?', 'Honorific verb -세요?', '敬语动词 -세요？');
const TOPIC = L('Chủ đề (+ 은/는)', 'Topic (+ 은/는)', '主题（+ 은/는）');
const SUBJ = L('Thứ có / không có (+ 이/가)', 'What exists or not (+ 이/가)', '有/没有的东西（+ 이/가）');
const EXIST = L('Có', 'Have / there is', '有');
const NOT_EXIST = L('Không có', 'Not have / there isn’t', '没有');

const WHICH_CORRECT = L('Câu nào đúng?', 'Which sentence is correct?', '哪个句子是正确的？');
const REPLY = (q: string, meaning: Gloss) => ({ seq: [q, ' — ', L('Chọn câu trả lời phù hợp', 'Choose the right reply', '选择合适的回答'), ' (', meaning, ')'] });
const FILL = (sentence: string, meaning: Gloss) => ({ seq: [sentence, ' (', meaning, ')'] });

const WORD_IDS = ['mwo', 'eodi', 'nugu', 'eonje', 'itda', 'eopda', 'chingu', 'jigeum', 'sigan'];

export const D6: DayContent = {
  lesson: {
    id: 'ko-d6', day: 6, stage: 1, minutes: 25, prerequisites: ['ko-d5'],
    title: L('Câu hỏi và hội thoại ngắn', 'Questions and short conversations', '疑问句和简短对话'),
    subtitle: L(
      '뭐 · 어디 · 누구 · 언제 · 있어요/없어요 · -요? · 네/아니요 · -세요?',
      '뭐 · 어디 · 누구 · 언제 · 있어요/없어요 · -요? · 네/아니요 · -세요?',
      '뭐 · 어디 · 누구 · 언제 · 있어요/없어요 · -요？ · 네/아니요 · -세요？',
    ),
    objectives: [
      L('Đặt câu hỏi có/không chỉ bằng cách lên giọng ở -요?', 'Ask yes/no questions just by raising your voice on -요?', '只用句末 -요？的升调就能提出是非问句。'),
      L('Dùng từ để hỏi 뭐, 어디, 누구, 언제.', 'Use the question words 뭐, 어디, 누구, 언제.', '使用疑问词 뭐、어디、누구、언제。'),
      L('Nói có / không có với 있어요 / 없어요.', 'Say "have / there is" and "don’t have / there isn’t" with 있어요 / 없어요.', '用 있어요 / 없어요 表达“有 / 没有”。'),
      L('Hỏi lịch sự người lớn bằng -세요? và trả lời 네 / 아니요.', 'Ask older people politely with -세요? and answer with 네 / 아니요.', '用 -세요？礼貌地问长辈，并用 네 / 아니요 回答。'),
    ],
    intro: [
      L(
        'Tin vui: trong tiếng Hàn, câu hỏi và câu trần thuật thường viết GIỐNG HỆT nhau. 가요. (Tôi đi.) → 가요? (Bạn đi à?). Chỉ cần lên giọng ở cuối câu.',
        'Good news: in Korean, a question and a statement are often written EXACTLY the same. 가요. (I’m going.) → 가요? (Are you going?). You just raise your voice at the end.',
        '好消息：韩语的疑问句和陈述句常常写法完全一样。가요。（我走。）→ 가요？（你走吗？）只要句尾升调就行。',
      ),
      L(
        'Từ để hỏi đứng đúng chỗ của thông tin cần hỏi, thường ngay trước động từ — giống tiếng Việt: "Bạn ăn GÌ?" = 뭐 먹어요?',
        'The question word sits where the missing information would be, usually right before the verb — just like Vietnamese "Bạn ăn GÌ?" (You eat WHAT?) = 뭐 먹어요?',
        '疑问词放在所问信息原来的位置，通常就在动词前面——和越南语、汉语一样：“你吃什么？”= 뭐 먹어요？',
      ),
      L(
        'Khi hỏi người lớn tuổi, thầy cô, khách, người Hàn dùng kính ngữ -세요: 어디 가세요? (Bác đi đâu ạ?). Khi trả lời về mình thì KHÔNG dùng -세요: 학교에 가요.',
        'When asking older people, teachers or customers, Koreans use the honorific -세요: 어디 가세요? (Where are you going, sir/madam?). When answering about yourself, do NOT use -세요: 학교에 가요.',
        '问长辈、老师、客人时，韩国人用敬语 -세요：어디 가세요？（您去哪儿？）。回答自己的事情时不用 -세요：학교에 가요。',
      ),
    ],
    sections: [
      { kind: 'grammar', grammarId: 'ko-g-question' },
      { kind: 'words', title: L('Từ mới', 'New words', '生词'), wordIds: WORD_IDS },
      {
        kind: 'text',
        title: L('Trả lời: 네 / 아니요', 'Answering: 네 / 아니요', '回答：네 / 아니요'),
        body: [
          L(
            '네 = vâng / dạ / có; 아니요 = không. Sau đó nhắc lại động từ: 커피 좋아해요? — 네, 좋아해요. / 아니요, 안 좋아해요.',
            '네 = yes; 아니요 = no. Then repeat the verb: 커피 좋아해요? — 네, 좋아해요. / 아니요, 안 좋아해요.',
            '네 = 是 / 对；아니요 = 不。然后重复动词：커피 좋아해요？——네, 좋아해요。/ 아니요, 안 좋아해요。',
          ),
          L(
            '안 + động từ = "không" (phủ định đơn giản): 안 가요 (không đi), 안 먹어요 (không ăn). Với 하다 ghép như 공부하다: 공부 안 해요.',
            '안 + verb = "not" (simple negative): 안 가요 (not going), 안 먹어요 (not eating). For compounds like 공부하다: 공부 안 해요.',
            '안 + 动词 = “不”（简单否定）：안 가요（不去），안 먹어요（不吃）。공부하다 这类复合词：공부 안 해요。',
          ),
          L(
            '네 cũng dùng để "dạ" khi nghe người khác nói, giống "dạ, vâng" của tiếng Việt — không nhất thiết là đồng ý.',
            '네 is also used to show you are listening, like Vietnamese "dạ, vâng" — it does not always mean you agree.',
            '네 也用来表示“我在听”，像越南语的 “dạ, vâng”——不一定表示同意。',
          ),
        ],
      },
      { kind: 'grammar', grammarId: 'ko-g-isseoyo' },
      {
        kind: 'examples',
        title: L('Hội thoại 1: Gặp thầy giáo', 'Dialogue 1: Meeting the teacher', '对话一：遇见老师'),
        examples: [
          { text: '선생님, 안녕하세요! 어디 가세요?', pron: 'Seonsaengnim, annyeonghaseyo! Eodi gaseyo?', vi: 'Em chào thầy ạ! Thầy đi đâu ạ?', en: 'Hello, teacher! Where are you going?' },
          { text: '학교에 가요. 란 씨는 뭐 해요?', pron: 'Hakgyoe gayo. Ran ssineun mwo haeyo?', vi: 'Thầy đến trường. Lan đang làm gì đấy?', en: 'I’m going to school. What are you doing, Lan?' },
          { text: '친구를 만나요.', pron: 'Chingureul mannayo.', vi: 'Em gặp bạn ạ.', en: 'I’m meeting a friend.' },
          { text: '친구가 누구예요?', pron: 'Chinguga nuguyeyo?', vi: 'Bạn em là ai thế?', en: 'Who is your friend?' },
          { text: '민수예요. 한국 사람이에요.', pron: 'Minsuyeyo. Hanguk saramieyo.', vi: 'Là Minsu ạ. Bạn ấy là người Hàn Quốc.', en: 'It’s Minsu. He’s Korean.' },
        ],
      },
      {
        kind: 'examples',
        title: L('Hội thoại 2: Ở quán cà phê', 'Dialogue 2: At the café', '对话二：在咖啡馆'),
        examples: [
          { text: '뭐 드세요?', pron: 'Mwo deuseyo?', vi: 'Quý khách dùng gì ạ?', en: 'What would you like?' },
          { text: '커피 있어요?', pron: 'Keopi isseoyo?', vi: 'Có cà phê không ạ?', en: 'Do you have coffee?' },
          { text: '네, 있어요.', pron: 'Ne, isseoyo.', vi: 'Dạ, có ạ.', en: 'Yes, we do.' },
          { text: '우유도 있어요?', pron: 'Uyudo isseoyo?', vi: 'Có cả sữa không ạ?', en: 'Do you have milk too?' },
          { text: '아니요, 우유는 없어요.', pron: 'Aniyo, uyuneun eopseoyo.', vi: 'Dạ không, sữa thì không có ạ.', en: 'No, we don’t have milk.' },
        ],
      },
      {
        kind: 'speak',
        title: L('Luyện nói: hỏi và đáp', 'Speaking practice: ask and answer', '口语练习：问与答'),
        intro: L(
          'Đọc câu hỏi lên giọng ở cuối (-요↗), câu trả lời xuống giọng (-요↘). Chú ý 있어요 đọc [이써요], 없어요 đọc [업써요].',
          'Read the questions with a rise at the end (-요↗) and the answers with a fall (-요↘). Note 있어요 sounds [이써요] and 없어요 sounds [업써요].',
          '问句句尾升调（-요↗），答句降调（-요↘）。注意 있어요 读 [이써요]，없어요 读 [업써요]。',
        ),
        items: [
          { text: '어디 가세요?', pron: 'Eodi gaseyo?', vi: 'Anh/chị đi đâu ạ?', en: 'Where are you going?' },
          { text: '뭐 먹어요?', pron: 'Mwo meogeoyo?', vi: 'Bạn ăn gì?', en: 'What are you eating?' },
          { text: '시간 있어요?', pron: 'Sigan isseoyo?', vi: 'Bạn có thời gian không?', en: 'Do you have time?' },
          { text: '아니요, 시간이 없어요.', pron: 'Aniyo, sigani eopseoyo.', vi: 'Không, tôi không có thời gian.', en: 'No, I don’t have time.' },
        ],
      },
      {
        kind: 'tip',
        title: L('Mẹo: 뭐 và 무엇', 'Tip: 뭐 and 무엇', '小贴士：뭐 和 무엇'),
        body: L(
          '뭐 là dạng nói của 무엇 (cái gì). Trong sách và câu trang trọng bạn sẽ gặp 무엇, nhưng khi nói chuyện hằng ngày người Hàn gần như luôn nói 뭐. Còn 누구 + 가 thành 누가: 누가 와요? (Ai đến thế?).',
          '뭐 is the spoken form of 무엇 (what). You will see 무엇 in books and formal speech, but in everyday conversation Koreans almost always say 뭐. Also, 누구 + 가 becomes 누가: 누가 와요? (Who is coming?).',
          '뭐 是 무엇（什么）的口语形式。书面语和正式场合会看到 무엇，但日常对话里韩国人几乎都说 뭐。另外，누구 + 가 变成 누가：누가 와요？（谁来了？）',
        ),
      },
    ],
    wordIds: WORD_IDS,
    grammarIds: ['ko-g-question', 'ko-g-isseoyo'],
    practice: [
      { id: 'ko-d6-p1', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: '뭐', pron: 'mwo', vi: 'cái gì, gì', en: 'what' },
        { text: '어디', pron: 'eodi', vi: 'ở đâu, đâu', en: 'where' },
        { text: '누구', pron: 'nugu', vi: 'ai', en: 'who' },
        { text: '언제', pron: 'eonje', vi: 'khi nào, bao giờ', en: 'when' },
      ], explanation: '뭐 mwo · 어디 eodi · 누구 nugu · 언제 eonje.', wordIds: ['mwo', 'eodi', 'nugu', 'eonje'] },
      choice('ko-d6-p2', 'grammar', FILL('＿ 가요?', G('Bạn đi đâu?', 'Where are you going?')),
        ['어디', '뭐', '누구', '언제'], 0,
        L('Hỏi nơi chốn → 어디 (ở đâu).', 'Asking about a place → 어디 (where).', '问地点 → 어디（哪里）。'),
        { targetOptions: true, grammarId: 'ko-g-question', wordIds: ['eodi'] }),
      choice('ko-d6-p3', 'grammar', FILL('시간＿ 없어요.', G('Tôi không có thời gian.', 'I don’t have time.')),
        ['이', '가', '을', '를'], 0,
        L('Thứ có/không có + 이/가. 시간 có batchim ㄴ → 이.', 'The thing you have or lack + 이/가. 시간 ends in ㄴ → 이.', '有/没有的东西 + 이/가。시간 有收音 ㄴ → 이。'),
        { targetOptions: true, grammarId: 'ko-g-isseoyo', wordIds: ['sigan', 'eopda'] }),
      choice('ko-d6-p4', 'reading', REPLY('커피 있어요?', G('Dạ không, không có ạ.', 'No, we don’t.')),
        ['아니요, 없어요.', '네, 없어요.', '아니요, 있어요.', '네, 와요.'], 0,
        L('Phủ định: 아니요 + 없어요 (không có).', 'Negative: 아니요 + 없어요 (there isn’t).', '否定：아니요 + 없어요（没有）。'),
        { targetOptions: true, wordIds: ['eopda'] }),
      listen('ko-d6-p5', '있어요', ['있어요', '없어요', '이에요', '와요'], 0,
        L('있어요 [이써요] = có. Batchim ㅆ nối sang âm tiết sau.', '있어요 [이써요] = there is / have. The ㅆ links to the next syllable.', '있어요 [이써요] = 有。收音 ㅆ 连到下一个音节。'),
        { targetOptions: true, wordIds: ['itda'] }),
      arrange('ko-d6-p6', G('Bạn ăn gì?', 'What are you eating?'), ['뭐', '먹어요?'],
        L('Từ để hỏi (뭐) đứng trước động từ (먹어요).', 'The question word (뭐) goes before the verb (먹어요).', '疑问词（뭐）放在动词（먹어요）前面。'),
        ['mwo', 'meokda']),
      choice('ko-d6-p7', 'grammar', L('Hỏi thầy giáo "Thầy đi đâu ạ?" một cách lịch sự:', 'Ask your teacher politely "Where are you going?":', '礼貌地问老师“您去哪儿？”：'),
        ['어디 가세요?', '어디 가?', '어디 가요.', '어디 가세요.'], 0,
        L('Với người lớn dùng kính ngữ -세요 và lên giọng: 어디 가세요?', 'With older people use honorific -세요 and a rising tone: 어디 가세요?', '对长辈用敬语 -세요 并用升调：어디 가세요？'),
        { targetOptions: true, grammarId: 'ko-g-question', wordIds: ['eodi', 'gada'] }),
      typeIt('ko-d6-p8', 'hangul', { k: 'ex.write.hangul', p: { meaning: G('ai', 'who') } }, ['누구'],
        L('누구 (nugu) = ai.', '누구 (nugu) = who.', '누구（nugu）= 谁。'),
        { audio: '누구', wordIds: ['nugu'] }),
    ],
    quiz: [
      choice('ko-d6-q1', 'grammar', FILL('저 사람은 ＿예요?', G('Người kia là ai?', 'Who is that person over there?')),
        ['누구', '어디', '언제', '뭐'], 0,
        L('Hỏi người → 누구: 누구예요?', 'Asking about a person → 누구: 누구예요?', '问人 → 누구：누구예요？'),
        { targetOptions: true, grammarId: 'ko-g-question', wordIds: ['nugu', 'jeo-saram'] }),
      choice('ko-d6-q2', 'reading', REPLY('어디 가세요?', G('Tôi đi Hàn Quốc.', 'I’m going to Korea.')),
        ['한국에 가요.', '한국에 가세요.', '네, 한국이에요.', '한국 사람이에요.'], 0,
        L('Trả lời về bản thân không dùng -세요: 한국에 가요.', 'When answering about yourself, don’t use -세요: 한국에 가요.', '回答自己的事情时不用 -세요：한국에 가요。'),
        { targetOptions: true, grammarId: 'ko-g-question', wordIds: ['gada'] }),
      listen('ko-d6-q3', '친구가 없어요.',
        [G('Tôi không có bạn.', 'I don’t have friends.'), G('Tôi có bạn.', 'I have a friend.'), G('Bạn tôi đến.', 'My friend is coming.'), G('Bạn tôi là ai?', 'Who is my friend?')], 0,
        { seq: ['친구가 없어요 [업써요] = ', G('Tôi không có bạn.', 'I don’t have friends.')] },
        { wordIds: ['chingu', 'eopda'] }),
      arrange('ko-d6-q4', G('Bây giờ bạn có thời gian không?', 'Do you have time now?'), ['지금', '시간', '있어요?'],
        L('지금 (bây giờ) + 시간 (thời gian) + 있어요? (có không?). Văn nói hay lược 이/가.', '지금 (now) + 시간 (time) + 있어요? (is there?). Speech often drops 이/가.', '지금（现在）+ 시간（时间）+ 있어요？（有吗？）。口语常省略 이/가。'),
        ['jigeum', 'sigan', 'itda'], ['지금 시간 있어요?', '시간 지금 있어요?']),
      choice('ko-d6-q5', 'grammar', WHICH_CORRECT,
        ['우유가 없어요.', '우유를 없어요.', '우유가 안 있어요.', '없어요 우유가.'], 0,
        L('있다/없다 đi với 이/가; "không có" là 없어요 (không nói 안 있어요).', '있다/없다 take 이/가; "there isn’t" is 없어요 (not 안 있어요).', '있다/없다 用 이/가；“没有”是 없어요（不说 안 있어요）。'),
        { targetOptions: true, grammarId: 'ko-g-isseoyo', wordIds: ['eopda'] }),
      choice('ko-d6-q6', 'vocabulary', { k: 'ex.chooseWord', p: { meaning: G('khi nào, bao giờ', 'when') } },
        ['언제', '어디', '누구', '지금'], 0,
        L('언제 (eonje) = khi nào: 언제 와요? (Khi nào bạn đến?)', '언제 (eonje) = when: 언제 와요? (When are you coming?)', '언제（eonje）= 什么时候：언제 와요？（你什么时候来？）'),
        { targetOptions: true, wordIds: ['eonje'] }),
      choice('ko-d6-q7', 'pronunciation', L('없어요 thực tế đọc là:', 'How is 없어요 actually pronounced?', '없어요 实际怎么读？'),
        ['[업써요]', '[어서요]', '[업서요]', '[어버요]'], 0,
        L('Batchim kép ㅄ: ㅂ ở lại, ㅅ nối sang và căng thành ㅆ → [업써요] eopseoyo.', 'Double batchim ㅄ: ㅂ stays, ㅅ links over and becomes tense ㅆ → [업써요] eopseoyo.', '双收音 ㅄ：ㅂ 留下，ㅅ 连到后面并变成紧音 ㅆ → [업써요] eopseoyo。'),
        { targetOptions: true, text: '없어요', audio: '없어요', wordIds: ['eopda'] }),
      typeIt('ko-d6-q8', 'hangul', { k: 'ex.write.hangul', p: { meaning: G('ở đâu, đâu', 'where') } }, ['어디'],
        L('어디 (eodi) = ở đâu.', '어디 (eodi) = where.', '어디（eodi）= 哪里。'),
        { audio: '어디', wordIds: ['eodi'] }),
      choice('ko-d6-q9', 'reading', REPLY('뭐 드세요?', G('Tôi uống cà phê.', 'I’ll have coffee.')),
        ['커피 마셔요.', '커피 드세요.', '네, 커피예요?', '커피가 누구예요?'], 0,
        L('뭐 드세요? = Anh/chị dùng gì? Trả lời về mình: 커피 마셔요 (không dùng 드세요).', '뭐 드세요? = What will you have? About yourself: 커피 마셔요 (not 드세요).', '뭐 드세요？= 您要吃/喝什么？说自己：커피 마셔요（不用 드세요）。'),
        { targetOptions: true, grammarId: 'ko-g-question', wordIds: ['mwo', 'masida'] }),
    ],
    summary: [
      L('Câu hỏi có/không = câu trần thuật + lên giọng: 가요? 있어요?', 'Yes/no question = statement + rising tone: 가요? 있어요?', '是非问句 = 陈述句 + 升调：가요？있어요？'),
      L('Từ để hỏi: 뭐 (gì), 어디 (đâu), 누구 (ai), 언제 (khi nào) — đứng trước động từ.', 'Question words: 뭐 (what), 어디 (where), 누구 (who), 언제 (when) — before the verb.', '疑问词：뭐（什么）、어디（哪里）、누구（谁）、언제（什么时候）——放在动词前。'),
      L('N이/가 있어요 = có N; N이/가 없어요 = không có N.', 'N이/가 있어요 = there is / I have N; N이/가 없어요 = there isn’t / I don’t have N.', 'N이/가 있어요 = 有 N；N이/가 없어요 = 没有 N。'),
      L('Hỏi người lớn: -세요? (가세요?, 드세요?). Trả lời về mình: -아요/어요 (가요, 마셔요). 네 / 아니요 + động từ.', 'Asking elders: -세요? (가세요?, 드세요?). About yourself: -아요/어요 (가요, 마셔요). 네 / 아니요 + verb.', '问长辈：-세요？（가세요？、드세요？）。说自己：-아요/어요（가요、마셔요）。네 / 아니요 + 动词。'),
    ],
  },
  words: wordsOf('ko-d6', 1, [
    { id: 'mwo', text: '뭐', pron: 'mwo', vi: 'cái gì, gì', en: 'what', type: 'pronoun', topic: 'questions', level: 'TOPIK I · 1',
      notes: L('Dạng nói của 무엇. 뭐 + 예요 → 뭐예요?', 'Spoken form of 무엇. 뭐 + 예요 → 뭐예요?', '무엇 的口语形式。뭐 + 예요 → 뭐예요？'),
      ex: ['뭐 먹어요?', 'Bạn ăn gì?', 'What are you eating?', 'Mwo meogeoyo?'] },
    { id: 'eodi', text: '어디', pron: 'eodi', vi: 'ở đâu, đâu', en: 'where', type: 'pronoun', topic: 'questions', level: 'TOPIK I · 1',
      ex: ['어디 가세요?', 'Anh/chị đi đâu ạ?', 'Where are you going?', 'Eodi gaseyo?'] },
    { id: 'nugu', text: '누구', pron: 'nugu', vi: 'ai', en: 'who', type: 'pronoun', topic: 'questions', level: 'TOPIK I · 1',
      notes: L('누구 + 가 → 누가: 누가 와요?', '누구 + 가 → 누가: 누가 와요?', '누구 + 가 → 누가：누가 와요？'),
      ex: ['저 사람은 누구예요?', 'Người kia là ai?', 'Who is that person over there?', 'Jeo sarameun nuguyeyo?'] },
    { id: 'eonje', text: '언제', pron: 'eonje', vi: 'khi nào, bao giờ', en: 'when', type: 'adverb', topic: 'questions', level: 'TOPIK I · 1',
      ex: ['언제 한국에 가요?', 'Khi nào bạn đi Hàn Quốc?', 'When are you going to Korea?', 'Eonje hanguge gayo?'] },
    { id: 'itda', text: '있다', pron: 'itda', spoken: '[읻따]', vi: 'có, ở', en: 'to have, to be there', type: 'verb', topic: 'basics', level: 'TOPIK I · 1',
      notes: L('Lịch sự: 있어요 [이써요]. Kính ngữ khi nói về người: 계세요.', 'Polite: 있어요 [이써요]. Honorific for people: 계세요.', '礼貌形：있어요 [이써요]。说人时的敬语：계세요。'),
      ex: ['시간 있어요?', 'Bạn có thời gian không?', 'Do you have time?', 'Sigan isseoyo?'] },
    { id: 'eopda', text: '없다', pron: 'eopda', spoken: '[업따]', vi: 'không có', en: 'to not have, to not be there', type: 'verb', topic: 'basics', level: 'TOPIK I · 1',
      notes: L('Lịch sự: 없어요 [업써요]. Đối lập với 있다.', 'Polite: 없어요 [업써요]. The opposite of 있다.', '礼貌形：없어요 [업써요]。与 있다 相对。'),
      ex: ['우유가 없어요.', 'Không có sữa.', 'There is no milk.', 'Uyuga eopseoyo.'] },
    { id: 'chingu', text: '친구', pron: 'chingu', vi: 'bạn, bạn bè', en: 'friend', type: 'noun', topic: 'people', level: 'TOPIK I · 1',
      ex: ['친구가 와요.', 'Bạn tôi đến.', 'My friend is coming.', 'Chinguga wayo.'] },
    { id: 'jigeum', text: '지금', pron: 'jigeum', vi: 'bây giờ', en: 'now', type: 'adverb', topic: 'time', level: 'TOPIK I · 1',
      ex: ['지금 뭐 해요?', 'Bây giờ bạn làm gì?', 'What are you doing now?', 'Jigeum mwo haeyo?'] },
    { id: 'sigan', text: '시간', pron: 'sigan', vi: 'thời gian, giờ', en: 'time', type: 'noun', topic: 'time', level: 'TOPIK I · 1',
      notes: L('Từ Hán: 時間 (thời gian).', 'Sino-Korean: 時間 (Vietnamese "thời gian").', '汉字词：時間（时间）。'),
      ex: ['저는 지금 시간이 없어요.', 'Bây giờ tôi không có thời gian.', 'I don’t have time now.', 'Jeoneun jigeum sigani eopseoyo.'] },
  ]),
  grammar: [
    {
      id: 'ko-g-question',
      lessonId: 'ko-d6',
      title: L('Câu hỏi: -요? và từ để hỏi', 'Questions: -요? and question words', '疑问句：-요？和疑问词'),
      pattern: L('(Từ để hỏi) + Động từ-아요/어요? · lịch sự với người trên: Động từ-세요?', '(Question word) + Verb-아요/어요? · to elders: Verb-세요?', '（疑问词）+ 动词-아요/어요？· 对长辈：动词-세요？'),
      meaning: [
        L(
          'Câu hỏi có/không: giữ nguyên câu, chỉ lên giọng ở -요: 커피 좋아해요? (Bạn thích cà phê không?). Không cần thêm từ như "không / à" của tiếng Việt.',
          'Yes/no questions: keep the sentence as it is and raise your voice on -요: 커피 좋아해요? (Do you like coffee?). No extra word like Vietnamese "không / à" is needed.',
          '是非问句：句子不变，只在 -요 上升调：커피 좋아해요？（你喜欢咖啡吗？）。不需要加像汉语“吗”那样的词。',
        ),
        L(
          'Câu hỏi có từ để hỏi: đặt 뭐 / 어디 / 누구 / 언제 vào chỗ thông tin cần hỏi, thường ngay trước động từ: 어디 가요? 언제 와요? Với 이에요/예요: 이름이 뭐예요? 누구예요?',
          'Questions with a question word: put 뭐 / 어디 / 누구 / 언제 where the missing information goes, usually just before the verb: 어디 가요? 언제 와요? With 이에요/예요: 이름이 뭐예요? 누구예요?',
          '特殊疑问句：把 뭐 / 어디 / 누구 / 언제 放在所问信息的位置，通常紧挨动词前：어디 가요？언제 와요？与 이에요/예요 连用：이름이 뭐예요？누구예요？',
        ),
        L(
          'Kính ngữ -세요: gốc kết thúc bằng nguyên âm + 세요 (가다 → 가세요, 오다 → 오세요, 하다 → 하세요). Một số động từ có từ kính ngữ riêng: 먹다 / 마시다 → 드세요, 있다 (người) → 계세요.',
          'Honorific -세요: vowel-final stem + 세요 (가다 → 가세요, 오다 → 오세요, 하다 → 하세요). Some verbs have their own honorific word: 먹다 / 마시다 → 드세요, 있다 (of people) → 계세요.',
          '敬语 -세요：元音结尾的词干 + 세요（가다 → 가세요，오다 → 오세요，하다 → 하세요）。有些动词有专门的敬语词：먹다 / 마시다 → 드세요，있다（指人）→ 계세요。',
        ),
        L(
          '-세요 dùng để tôn trọng NGƯỜI NGHE / người làm hành động. Không bao giờ dùng -세요 khi nói về chính mình.',
          '-세요 shows respect to the LISTENER / the person doing the action. Never use -세요 about yourself.',
          '-세요 用来尊敬听话人或动作的主体。说自己时绝对不用 -세요。',
        ),
      ],
      breakdown: [
        [ { text: '어디', role: QWORD }, { text: '가요?', role: VERB_Q } ],
        [ { text: '뭐', role: QWORD }, { text: '드세요?', role: HON } ],
        [ { text: '커피', role: L('Tân ngữ (lược 를)', 'Object (를 dropped)', '宾语（省略 를）') }, { text: '좋아해요?', role: VERB_Q } ],
      ],
      examples: [
        { text: '커피 좋아해요?', pron: 'Keopi joahaeyo?', vi: 'Bạn thích cà phê không?', en: 'Do you like coffee?' },
        { text: '언제 와요?', pron: 'Eonje wayo?', vi: 'Khi nào bạn đến?', en: 'When are you coming?' },
        { text: '선생님, 뭐 하세요?', pron: 'Seonsaengnim, mwo haseyo?', vi: 'Thầy đang làm gì ạ?', en: 'Teacher, what are you doing?' },
        { text: '누가 와요?', pron: 'Nuga wayo?', vi: 'Ai đến vậy?', en: 'Who is coming?' },
      ],
      mistakes: [
        { wrong: '저는 학교에 가세요.', right: '저는 학교에 가요.',
          why: L('-세요 là kính ngữ cho người khác, không dùng cho bản thân.', '-세요 honours someone else; never use it about yourself.', '-세요 是尊敬别人的，不能用在自己身上。') },
        { wrong: '가요 어디?', right: '어디 가요?',
          why: L('Động từ luôn ở cuối câu; từ để hỏi đứng trước động từ.', 'The verb always comes last; the question word goes before it.', '动词总在句末，疑问词放在动词前面。') },
        { wrong: '누구가 와요?', right: '누가 와요?',
          why: L('누구 + 가 rút gọn thành 누가.', '누구 + 가 contracts to 누가.', '누구 + 가 缩略成 누가。') },
      ],
      exercises: [
        choice('ko-g-question-1', 'grammar', FILL('＿ 와요?', G('Khi nào bạn đến?', 'When are you coming?')),
          ['언제', '누구', '뭐', '어디'], 0,
          L('Hỏi thời gian → 언제.', 'Asking about time → 언제.', '问时间 → 언제。'),
          { targetOptions: true, grammarId: 'ko-g-question', wordIds: ['eonje', 'oda'] }),
        choice('ko-g-question-2', 'grammar', L('Dạng kính ngữ của 먹다 khi mời người lớn:', 'The honorific form of 먹다 when offering to an elder:', '向长辈让食物时 먹다 的敬语形式：'),
          ['드세요', '먹어세요', '먹세요', '마셔세요'], 0,
          L('먹다 / 마시다 có từ kính ngữ riêng: 드시다 → 드세요.', '먹다 / 마시다 have a special honorific: 드시다 → 드세요.', '먹다 / 마시다 有专门的敬语：드시다 → 드세요。'),
          { targetOptions: true, grammarId: 'ko-g-question', wordIds: ['meokda'] }),
        arrange('ko-g-question-3', G('Anh/chị đi đâu ạ?', 'Where are you going?'), ['어디', '가세요?'],
          L('어디 + 가세요? (kính ngữ, lên giọng).', '어디 + 가세요? (honorific, rising tone).', '어디 + 가세요？（敬语，升调）。'),
          ['eodi', 'gada']),
      ],
    },
    {
      id: 'ko-g-isseoyo',
      lessonId: 'ko-d6',
      title: L('Có / không có: N이/가 있어요 / 없어요', 'Have / there is: N이/가 있어요 / 없어요', '有 / 没有：N이/가 있어요 / 없어요'),
      pattern: L('Danh từ + 이/가 + 있어요 / 없어요', 'Noun + 이/가 + 있어요 / 없어요', '名词 + 이/가 + 있어요 / 없어요'),
      meaning: [
        L(
          '있어요 = có (sở hữu: "tôi có…") hoặc tồn tại ("ở đây có…"). 없어요 = không có. Giống chữ "có" của tiếng Việt, một từ dùng cho cả hai nghĩa.',
          '있어요 = to have ("I have…") or to exist ("there is…"). 없어요 = not have / there isn’t. Like Vietnamese "có", one word covers both meanings.',
          '있어요 = 拥有（“我有……”）或存在（“这里有……”）。없어요 = 没有。和汉语的“有”一样，一个词两种意思。',
        ),
        L(
          'Thứ được "có" mang tiểu từ 이/가 (không phải 을/를): 시간이 있어요, 친구가 있어요. Văn nói hay lược tiểu từ: 시간 있어요?',
          'The thing you "have" takes 이/가 (not 을/를): 시간이 있어요, 친구가 있어요. In speech the particle is often dropped: 시간 있어요?',
          '“有”的东西用 이/가（不用 을/를）：시간이 있어요，친구가 있어요。口语常省略助词：시간 있어요？',
        ),
        L(
          'Phủ định của 있어요 là 없어요, không nói 안 있어요. Phát âm: 있어요 [이써요], 없어요 [업써요].',
          'The negative of 있어요 is 없어요 — never 안 있어요. Pronunciation: 있어요 [이써요], 없어요 [업써요].',
          '있어요 的否定是 없어요，不说 안 있어요。发音：있어요 [이써요]，없어요 [업써요]。',
        ),
      ],
      breakdown: [
        [ { text: '저는', role: TOPIC }, { text: '시간이', role: SUBJ }, { text: '있어요', role: EXIST } ],
        [ { text: '우유가', role: SUBJ }, { text: '없어요', role: NOT_EXIST } ],
      ],
      examples: [
        { text: '친구가 있어요.', pron: 'Chinguga isseoyo.', vi: 'Tôi có bạn.', en: 'I have a friend.' },
        { text: '커피가 없어요.', pron: 'Keopiga eopseoyo.', vi: 'Không có cà phê.', en: 'There’s no coffee.' },
        { text: '지금 시간이 있어요?', pron: 'Jigeum sigani isseoyo?', vi: 'Bây giờ bạn có rảnh không?', en: 'Are you free now?' },
        { text: '네, 있어요.', pron: 'Ne, isseoyo.', vi: 'Vâng, có.', en: 'Yes, I do.' },
      ],
      mistakes: [
        { wrong: '시간을 있어요.', right: '시간이 있어요.',
          why: L('있다/없다 đi với 이/가, không đi với 을/를.', '있다/없다 take 이/가, not 을/를.', '있다/없다 搭配 이/가，不搭配 을/를。') },
        { wrong: '안 있어요.', right: '없어요.',
          why: L('"Không có" đã có từ riêng: 없어요.', '"There isn’t" has its own word: 없어요.', '“没有”有专门的词：없어요。') },
        { wrong: '있어요 [이서요]', right: '있어요 [이써요]',
          why: L('ㅆ là phụ âm căng, nối sang âm sau vẫn căng: [이써요].', 'ㅆ is tense and stays tense when it links: [이써요].', 'ㅆ 是紧音，连到后面仍读紧音：[이써요]。') },
      ],
      exercises: [
        choice('ko-g-isseoyo-1', 'grammar', FILL('친구＿ 있어요.', G('Tôi có bạn.', 'I have a friend.')),
          ['가', '이', '를', '을'], 0,
          L('친구 kết thúc bằng nguyên âm → 가.', '친구 ends in a vowel → 가.', '친구 以元音结尾 → 가。'),
          { targetOptions: true, grammarId: 'ko-g-isseoyo', wordIds: ['chingu', 'itda'] }),
        choice('ko-g-isseoyo-2', 'reading', REPLY('시간 있어요?', G('Vâng, có.', 'Yes, I do.')),
          ['네, 있어요.', '네, 없어요.', '아니요, 있어요.', '네, 이에요.'], 0,
          L('Khẳng định: 네 + 있어요.', 'Positive: 네 + 있어요.', '肯定：네 + 있어요。'),
          { targetOptions: true, grammarId: 'ko-g-isseoyo', wordIds: ['itda', 'sigan'] }),
        typeIt('ko-g-isseoyo-3', 'hangul', { k: 'ex.write.hangul', p: { meaning: G('không có (lịch sự)', 'there isn’t (polite)') } }, ['없어요'],
          L('없다 → 없어요 [업써요].', '없다 → 없어요 [업써요].', '없다 → 없어요 [업써요]。'),
          { audio: '없어요', grammarId: 'ko-g-isseoyo', wordIds: ['eopda'] }),
      ],
    },
  ],
};
