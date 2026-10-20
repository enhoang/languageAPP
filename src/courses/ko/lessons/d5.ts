import type { Gloss, LText } from '../../../types';
import { arrangeWith, choice, listen, MATCH_PROMPT, typeIt, wordsOf } from '../../helpers';
import type { DayContent } from '../../helpers';

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });
const G = (vi: string, en: string): Gloss => ({ vi, en });
const arrange = arrangeWith(' ');

// Breakdown roles
const TOPIC = L('Chủ đề (+ 은/는)', 'Topic (+ 은/는)', '主题（+ 은/는）');
const SUBJ = L('Chủ ngữ (+ 이/가)', 'Subject (+ 이/가)', '主语（+ 이/가）');
const OBJ = L('Tân ngữ (+ 을/를)', 'Object (+ 을/를)', '宾语（+ 을/를）');
const VERB = L('Động từ (cuối câu)', 'Verb (at the end)', '动词（句末）');
const STEM = L('Gốc động từ', 'Verb stem', '动词词干');
const ENDING = L('Đuôi lịch sự', 'Polite ending', '礼貌语尾');

const WHICH_CORRECT = L('Câu nào đúng?', 'Which sentence is correct?', '哪个句子是正确的？');
const FILL = (sentence: string, meaning: Gloss) => ({ seq: [sentence, ' (', meaning, ')'] });
const polite = (verb: string): LText => L(`Dạng lịch sự (-요) của ${verb} là:`, `The polite (-요) form of ${verb} is:`, `${verb} 的礼貌形（-요）是：`);

const WORD_IDS = ['na', 'uri', 'i-saram', 'geu-saram', 'jeo-saram', 'gada', 'oda', 'meokda', 'masida', 'joahada', 'gongbuhada', 'bap'];

export const D5: DayContent = {
  lesson: {
    id: 'ko-d5', day: 5, stage: 1, minutes: 25, prerequisites: ['ko-d4'],
    title: L(
      'Đại từ và câu đơn giản: Ai làm gì?',
      'Pronouns and simple sentences: who does what?',
      '代词和简单句：谁做什么？',
    ),
    subtitle: L(
      '저/나, 우리, 이·그·저 사람 · 이/가 · 을/를 · S-O-V · -아요/어요',
      '저/나, 우리, 이·그·저 사람 · 이/가 · 을/를 · S-O-V · -아요/어요',
      '저/나、우리、이·그·저 사람 · 이/가 · 을/를 · 主-宾-谓 · -아요/어요',
    ),
    objectives: [
      L('Dùng đại từ 저/나, 우리 và 이/그/저 사람.', 'Use the pronouns 저/나, 우리 and 이/그/저 사람.', '使用代词 저/나、우리 和 이/그/저 사람。'),
      L('Đánh dấu chủ ngữ bằng 이/가 và tân ngữ bằng 을/를.', 'Mark the subject with 이/가 and the object with 을/를.', '用 이/가 标记主语，用 을/를 标记宾语。'),
      L('Đặt câu theo trật tự Chủ ngữ – Tân ngữ – Động từ (động từ đứng cuối).', 'Build sentences in Subject – Object – Verb order (the verb comes last).', '按“主语—宾语—动词”的语序造句（动词放在句末）。'),
      L('Chia động từ ở thì hiện tại lịch sự -아요/어요/해요.', 'Conjugate verbs in the present polite form -아요/어요/해요.', '把动词变成现在时礼貌形 -아요/어요/해요。'),
    ],
    intro: [
      L(
        'Hôm qua bạn đã nói "Tôi là…" với 이에요/예요. Hôm nay bạn sẽ nói được câu có hành động: "Tôi ăn cơm", "Tôi thích cà phê", "Chúng tôi học tiếng Hàn".',
        'Yesterday you said "I am…" with 이에요/예요. Today you will make sentences with actions: "I eat rice", "I like coffee", "We study Korean".',
        '昨天你用 이에요/예요 说了“我是……”。今天你将学会说有动作的句子：“我吃饭”“我喜欢咖啡”“我们学韩语”。',
      ),
      L(
        'Khác lớn nhất với tiếng Việt: động từ luôn đứng CUỐI câu. Tiếng Việt nói "Tôi ăn cơm", tiếng Hàn nói "Tôi cơm ăn": 저는 밥을 먹어요.',
        'The biggest difference from Vietnamese (and English): the verb always comes LAST. Vietnamese says "Tôi ăn cơm" (I eat rice); Korean says "I rice eat": 저는 밥을 먹어요.',
        '和越南语（以及汉语）最大的不同：动词总是放在句子的最后。越南语说 “Tôi ăn cơm”（我吃饭），韩语说“我饭吃”：저는 밥을 먹어요。',
      ),
      L(
        'Vì động từ ở cuối, tiếng Hàn dùng các tiểu từ nhỏ gắn sau danh từ để cho biết ai làm (이/가, 은/는) và làm gì (을/를).',
        'Because the verb is at the end, Korean attaches small particles to nouns to show who acts (이/가, 은/는) and what is acted on (을/를).',
        '因为动词在句末，韩语在名词后面加上小小的助词，表示谁做（이/가、은/는）和做什么（을/를）。',
      ),
    ],
    sections: [
      {
        kind: 'text',
        title: L('Đại từ: tôi, chúng tôi, người này / người đó / người kia', 'Pronouns: I, we, this / that / that person over there', '代词：我、我们、这个人 / 那个人 / 那边那个人'),
        body: [
          L(
            '저 = tôi (khiêm tốn, lịch sự) — dùng với người lạ, người lớn tuổi, thầy cô. 나 = tôi/tớ (thân mật) — dùng với bạn thân, người nhỏ tuổi hơn. Khi nói đuôi lịch sự -요, hãy dùng 저.',
            '저 = I (humble, polite) — with strangers, older people and teachers. 나 = I (casual) — with close friends and younger people. When you speak with the polite -요 ending, use 저.',
            '저 = 我（谦虚、礼貌）——对陌生人、长辈、老师用。나 = 我（随便）——对好朋友、比自己小的人用。说礼貌语尾 -요 时，请用 저。',
          ),
          L(
            '우리 = chúng tôi / chúng ta. Người Hàn còn dùng 우리 với nghĩa "của chúng tôi" rất tự nhiên: 우리 엄마 (mẹ tôi), 우리 나라 (nước tôi).',
            '우리 = we / us. Koreans also use 우리 very naturally to mean "our": 우리 엄마 (my mum, lit. "our mum"), 우리 나라 (my country).',
            '우리 = 我们。韩国人还很自然地用 우리 表示“我们的”：우리 엄마（我妈妈），우리 나라（我国）。',
          ),
          L(
            '이 / 그 / 저 giống "này / đó / kia" trong tiếng Việt, nhưng đứng TRƯỚC danh từ: 이 사람 (người này, gần người nói), 그 사람 (người đó, gần người nghe hoặc người đã nhắc đến), 저 사람 (người kia, xa cả hai).',
            '이 / 그 / 저 are like Vietnamese "này / đó / kia" (this / that / that over there), and they go BEFORE the noun: 이 사람 (this person, near the speaker), 그 사람 (that person, near the listener or already mentioned), 저 사람 (that person over there, far from both).',
            '이 / 그 / 저 相当于越南语的 “này / đó / kia”（这 / 那 / 那边），放在名词前面：이 사람（这个人，离说话人近），그 사람（那个人，离听话人近或前面提到过），저 사람（那边那个人，离两人都远）。',
          ),
          L(
            'Chú ý: 저 trong 저 사람 (kia) khác với 저 (tôi). Nhìn ngữ cảnh: 저는… = tôi thì…, 저 사람은… = người kia thì…',
            'Careful: 저 in 저 사람 ("that … over there") is not 저 ("I"). Context tells: 저는… = as for me…, 저 사람은… = as for that person over there…',
            '注意：저 사람 里的 저（那边）和表示“我”的 저 不一样。看上下文：저는…… = 我……，저 사람은…… = 那边那个人……',
          ),
        ],
      },
      { kind: 'words', title: L('Từ mới', 'New words', '生词'), wordIds: WORD_IDS },
      {
        kind: 'text',
        title: L('Tiểu từ chủ ngữ 이/가', 'The subject particle 이/가', '主格助词 이/가'),
        body: [
          L(
            '이/가 gắn sau danh từ làm chủ ngữ (ai/cái gì làm hành động). Danh từ kết thúc bằng phụ âm (có batchim) + 이: 선생님이, 사람이. Kết thúc bằng nguyên âm + 가: 아이가, 아빠가.',
            '이/가 attaches to the noun that is the subject (who or what does the action). Noun ending in a consonant (with batchim) + 이: 선생님이, 사람이. Ending in a vowel + 가: 아이가, 아빠가.',
            '이/가 加在作主语的名词后面（谁或什么做动作）。名词以辅音结尾（有收音）+ 이：선생님이、사람이；以元音结尾 + 가：아이가、아빠가。',
          ),
          L(
            '은/는 (Ngày 4) cũng đứng sau chủ ngữ nhưng mang nghĩa "còn … thì", giới thiệu chủ đề. 이/가 nhấn vào "chính ai" làm việc đó, hay dùng khi giới thiệu thông tin mới: 선생님이 와요 (Thầy giáo đến kìa).',
            '은/는 (Day 4) also follows the subject but means "as for …" and sets the topic. 이/가 points at exactly who does it and is often used for new information: 선생님이 와요 (The teacher is coming).',
            '은/는（第4天）也放在主语后面，但表示“至于……”，用来提出话题。이/가 强调“正是谁”做这件事，常用于引出新信息：선생님이 와요（老师来了）。',
          ),
          L(
            'Đặc biệt: 저 + 가 → 제가, 나 + 가 → 내가. Không nói 저가, 나가.',
            'Special forms: 저 + 가 → 제가, 나 + 가 → 내가. Never 저가 or 나가.',
            '特殊形式：저 + 가 → 제가，나 + 가 → 내가。不说 저가、나가。',
          ),
        ],
      },
      { kind: 'grammar', grammarId: 'ko-g-object' },
      { kind: 'grammar', grammarId: 'ko-g-ayo' },
      {
        kind: 'examples',
        title: L('Câu mẫu: ai làm gì?', 'Example sentences: who does what?', '例句：谁做什么？'),
        examples: [
          { text: '저는 밥을 먹어요.', pron: 'Jeoneun babeul meogeoyo.', vi: 'Tôi ăn cơm.', en: 'I eat rice.' },
          { text: '저는 커피를 좋아해요.', pron: 'Jeoneun keopireul joahaeyo.', vi: 'Tôi thích cà phê.', en: 'I like coffee.' },
          { text: '우리는 한국어를 공부해요.', pron: 'Urineun hangugeoreul gongbuhaeyo.', vi: 'Chúng tôi học tiếng Hàn.', en: 'We study Korean.' },
          { text: '아이가 우유를 마셔요.', pron: 'Aiga uyureul masyeoyo.', vi: 'Đứa trẻ uống sữa.', en: 'The child drinks milk.' },
          { text: '선생님이 와요.', pron: 'Seonsaengnimi wayo.', vi: 'Thầy giáo đến.', en: 'The teacher is coming.' },
          { text: '그 사람은 한국에 가요.', pron: 'Geu sarameun hanguge gayo.', vi: 'Người đó đi Hàn Quốc.', en: 'That person is going to Korea.' },
        ],
      },
      {
        kind: 'speak',
        title: L('Luyện nói', 'Speaking practice', '口语练习'),
        intro: L(
          'Đọc to từng câu. Chú ý nối âm: 밥을 đọc [바블], 먹어요 đọc [머거요], 좋아해요 đọc [조아해요].',
          'Read each sentence aloud. Mind the linking: 밥을 sounds [바블], 먹어요 sounds [머거요], 좋아해요 sounds [조아해요].',
          '大声读每个句子。注意连音：밥을 读 [바블]，먹어요 读 [머거요]，좋아해요 读 [조아해요]。',
        ),
        items: [
          { text: '저는 밥을 먹어요.', pron: 'Jeoneun babeul meogeoyo.', vi: 'Tôi ăn cơm.', en: 'I eat rice.' },
          { text: '저는 우유를 마셔요.', pron: 'Jeoneun uyureul masyeoyo.', vi: 'Tôi uống sữa.', en: 'I drink milk.' },
          { text: '우리는 커피를 좋아해요.', pron: 'Urineun keopireul joahaeyo.', vi: 'Chúng tôi thích cà phê.', en: 'We like coffee.' },
          { text: '저 사람은 학생이에요.', pron: 'Jeo sarameun haksaengieyo.', vi: 'Người kia là học sinh.', en: 'That person over there is a student.' },
        ],
      },
      {
        kind: 'tip',
        title: L('Mẹo: "động từ để dành cuối cùng"', 'Tip: "save the verb for last"', '小贴士：“动词留到最后”'),
        body: L(
          'Khi dịch từ tiếng Việt, hãy nói chủ ngữ, rồi tân ngữ, rồi mới đến động từ: "Tôi / cà phê / thích" → 저는 / 커피를 / 좋아해요. Nhờ có tiểu từ, ngay cả khi đảo chủ ngữ và tân ngữ người Hàn vẫn hiểu, nhưng động từ thì luôn ở cuối.',
          'When translating, say the subject, then the object, and only then the verb: "I / coffee / like" → 저는 / 커피를 / 좋아해요. Thanks to the particles, Koreans still understand if subject and object swap places — but the verb always stays at the end.',
          '从越南语或汉语翻译时，先说主语，再说宾语，最后才说动词：“我 / 咖啡 / 喜欢” → 저는 / 커피를 / 좋아해요。因为有助词，主语和宾语换位置韩国人也能听懂，但动词一定在最后。',
        ),
      },
    ],
    wordIds: WORD_IDS,
    grammarIds: ['ko-g-object', 'ko-g-ayo'],
    practice: [
      choice('ko-d5-p1', 'grammar', FILL('저는 커피＿ 좋아해요.', G('Tôi thích cà phê.', 'I like coffee.')),
        ['를', '을', '가', '는'], 0,
        L('커피 kết thúc bằng nguyên âm → 를 (tân ngữ).', '커피 ends in a vowel → 를 (object).', '커피 以元音结尾 → 를（宾语）。'),
        { targetOptions: true, grammarId: 'ko-g-object', wordIds: ['joahada'] }),
      choice('ko-d5-p2', 'grammar', FILL('저는 밥＿ 먹어요.', G('Tôi ăn cơm.', 'I eat rice.')),
        ['을', '를', '이', '은'], 0,
        L('밥 có batchim ㅂ → 을 (tân ngữ).', '밥 ends in the batchim ㅂ → 을 (object).', '밥 有收音 ㅂ → 을（宾语）。'),
        { targetOptions: true, grammarId: 'ko-g-object', wordIds: ['bap', 'meokda'] }),
      choice('ko-d5-p3', 'grammar', FILL('아이＿ 우유를 마셔요.', G('Đứa trẻ uống sữa.', 'The child drinks milk.')),
        ['가', '이', '를', '을'], 0,
        L('아이 là chủ ngữ, kết thúc bằng nguyên âm → 가.', '아이 is the subject and ends in a vowel → 가.', '아이 是主语，以元音结尾 → 가。'),
        { targetOptions: true, wordIds: ['masida'] }),
      choice('ko-d5-p4', 'grammar', polite('마시다'),
        ['마셔요', '마사요', '마시해요', '마셔해요'], 0,
        L('마시- có nguyên âm ㅣ (không phải ㅏ/ㅗ) → 마시 + 어요 = 마셔요 (ㅣ + ㅓ gộp thành ㅕ).', '마시- has the vowel ㅣ (not ㅏ/ㅗ) → 마시 + 어요 = 마셔요 (ㅣ + ㅓ merge into ㅕ).', '마시- 的元音是 ㅣ（不是 ㅏ/ㅗ）→ 마시 + 어요 = 마셔요（ㅣ + ㅓ 合成 ㅕ）。'),
        { targetOptions: true, grammarId: 'ko-g-ayo', wordIds: ['masida'] }),
      arrange('ko-d5-p5', G('Tôi ăn cơm.', 'I eat rice.'), ['저는', '밥을', '먹어요'],
        L('Chủ ngữ (저는) + tân ngữ (밥을) + động từ (먹어요) ở cuối.', 'Subject (저는) + object (밥을) + verb (먹어요) at the end.', '主语（저는）+ 宾语（밥을）+ 动词（먹어요）放在最后。'),
        ['bap', 'meokda']),
      { id: 'ko-d5-p6', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: '가다', pron: 'gada', vi: 'đi', en: 'to go' },
        { text: '먹다', pron: 'meokda', vi: 'ăn', en: 'to eat' },
        { text: '마시다', pron: 'masida', vi: 'uống', en: 'to drink' },
        { text: '좋아하다', pron: 'joahada', vi: 'thích', en: 'to like' },
      ], explanation: '가다 gada · 먹다 meokda · 마시다 masida · 좋아하다 joahada.', wordIds: ['gada', 'meokda', 'masida', 'joahada'] },
      listen('ko-d5-p7', '먹어요', ['먹어요', '마셔요', '와요', '가요'], 0,
        L('먹어요 [머거요] = ăn (lịch sự). ㄱ nối sang âm tiết sau.', '먹어요 [머거요] = eat (polite). The ㄱ links to the next syllable.', '먹어요 [머거요] = 吃（礼貌形）。ㄱ 连到下一个音节。'),
        { targetOptions: true, skill: 'listening', wordIds: ['meokda'] }),
      typeIt('ko-d5-p8', 'hangul', { k: 'ex.write.hangul', p: { meaning: G('đi (lịch sự)', 'go (polite)') } }, ['가요'],
        L('가다 → 가 + 아요 → 가요 (hai ㅏ gộp làm một).', '가다 → 가 + 아요 → 가요 (the two ㅏ merge).', '가다 → 가 + 아요 → 가요（两个 ㅏ 合成一个）。'),
        { audio: '가요', grammarId: 'ko-g-ayo', wordIds: ['gada'] }),
    ],
    quiz: [
      choice('ko-d5-q1', 'grammar', polite('공부하다'),
        ['공부해요', '공부하요', '공부하어요', '공부어요'], 0,
        L('Mọi động từ -하다 → -해요: 공부하다 → 공부해요.', 'Every -하다 verb → -해요: 공부하다 → 공부해요.', '所有 -하다 动词 → -해요：공부하다 → 공부해요。'),
        { targetOptions: true, grammarId: 'ko-g-ayo', wordIds: ['gongbuhada'] }),
      choice('ko-d5-q2', 'grammar', polite('오다'),
        ['와요', '오아요', '오요', '와어요'], 0,
        L('오- có nguyên âm ㅗ → + 아요; ㅗ + ㅏ gộp thành ㅘ: 와요.', '오- has the vowel ㅗ → + 아요; ㅗ + ㅏ merge into ㅘ: 와요.', '오- 的元音是 ㅗ → + 아요；ㅗ + ㅏ 合成 ㅘ：와요。'),
        { targetOptions: true, grammarId: 'ko-g-ayo', wordIds: ['oda'] }),
      arrange('ko-d5-q3', G('Chúng tôi học tiếng Hàn.', 'We study Korean.'), ['우리는', '한국어를', '공부해요'],
        L('우리는 (chủ ngữ) + 한국어를 (tân ngữ) + 공부해요 (động từ).', '우리는 (subject) + 한국어를 (object) + 공부해요 (verb).', '우리는（主语）+ 한국어를（宾语）+ 공부해요（动词）。'),
        ['uri', 'gongbuhada']),
      choice('ko-d5-q4', 'grammar', WHICH_CORRECT,
        ['저는 우유를 마셔요.', '저는 마셔요 우유를.', '저는 우유가 마셔요.', '저는 우유를 마시요.'], 0,
        L('Động từ ở cuối, tân ngữ dùng 을/를, và 마시다 → 마셔요.', 'Verb at the end, object with 을/를, and 마시다 → 마셔요.', '动词放在最后，宾语用 을/를，마시다 → 마셔요。'),
        { targetOptions: true, grammarId: 'ko-g-object', wordIds: ['masida'] }),
      listen('ko-d5-q5', '선생님이 와요.',
        [G('Thầy giáo đến.', 'The teacher is coming.'), G('Thầy giáo đi.', 'The teacher is going.'), G('Học sinh đến.', 'The student is coming.'), G('Thầy giáo ăn cơm.', 'The teacher eats rice.')], 0,
        { seq: ['선생님이 와요 = ', G('Thầy giáo đến.', 'The teacher is coming.')] },
        { wordIds: ['oda'] }),
      typeIt('ko-d5-q6', 'hangul', { k: 'ex.write.hangul', p: { meaning: G('ăn (lịch sự)', 'eat (polite)') } }, ['먹어요'],
        L('먹- có nguyên âm ㅓ → 먹 + 어요 = 먹어요 (đọc [머거요]).', '먹- has the vowel ㅓ → 먹 + 어요 = 먹어요 (said [머거요]).', '먹- 的元音是 ㅓ → 먹 + 어요 = 먹어요（读 [머거요]）。'),
        { audio: '먹어요', grammarId: 'ko-g-ayo', wordIds: ['meokda'] }),
      choice('ko-d5-q7', 'grammar', L('나 + 이/가 thành:', '나 + 이/가 becomes:', '나 + 이/가 变成：'),
        ['내가', '나가', '나이', '내이'], 0,
        L('Dạng đặc biệt: 나 + 가 → 내가 (và 저 + 가 → 제가).', 'Special form: 나 + 가 → 내가 (and 저 + 가 → 제가).', '特殊形式：나 + 가 → 내가（저 + 가 → 제가）。'),
        { targetOptions: true, wordIds: ['na'] }),
      choice('ko-d5-q8', 'reading', { k: 'ex.readSentence' },
        [G('Người đó thích sữa.', 'That person likes milk.'), G('Người này thích sữa.', 'This person likes milk.'), G('Người đó uống sữa.', 'That person drinks milk.'), G('Tôi thích sữa.', 'I like milk.')], 0,
        L('그 사람 = người đó, 우유를 = sữa (tân ngữ), 좋아해요 = thích.', '그 사람 = that person, 우유를 = milk (object), 좋아해요 = likes.', '그 사람 = 那个人，우유를 = 牛奶（宾语），좋아해요 = 喜欢。'),
        { text: '그 사람은 우유를 좋아해요.', pron: 'Geu sarameun uyureul joahaeyo.', wordIds: ['geu-saram', 'joahada'] }),
      { id: 'ko-d5-q9', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: '우리', pron: 'uri', vi: 'chúng tôi, chúng ta', en: 'we, us' },
        { text: '이 사람', pron: 'i saram', vi: 'người này', en: 'this person' },
        { text: '저 사람', pron: 'jeo saram', vi: 'người kia', en: 'that person over there' },
        { text: '밥', pron: 'bap', vi: 'cơm, bữa ăn', en: 'rice, meal' },
      ], explanation: '우리 uri · 이 사람 i saram · 저 사람 jeo saram · 밥 bap.', wordIds: ['uri', 'i-saram', 'jeo-saram', 'bap'] },
    ],
    summary: [
      L('저 (lịch sự) / 나 (thân mật) = tôi; 우리 = chúng tôi; 이·그·저 사람 = người này·đó·kia.', '저 (polite) / 나 (casual) = I; 우리 = we; 이·그·저 사람 = this·that·that person over there.', '저（礼貌）/ 나（随便）= 我；우리 = 我们；이·그·저 사람 = 这个人·那个人·那边那个人。'),
      L('Chủ ngữ + 이/가 (hoặc 은/는), tân ngữ + 을/를. Phụ âm cuối → 이/을, nguyên âm cuối → 가/를.', 'Subject + 이/가 (or 은/는), object + 을/를. After a consonant → 이/을, after a vowel → 가/를.', '主语 + 이/가（或 은/는），宾语 + 을/를。辅音结尾 → 이/을，元音结尾 → 가/를。'),
      L('Trật tự: Chủ ngữ – Tân ngữ – Động từ. Động từ luôn ở cuối.', 'Word order: Subject – Object – Verb. The verb is always last.', '语序：主语—宾语—动词。动词总在最后。'),
      L('-아요/어요: ㅏ/ㅗ → 아요 (가요, 와요), khác → 어요 (먹어요, 마셔요), 하다 → 해요 (좋아해요, 공부해요).', '-아요/어요: ㅏ/ㅗ → 아요 (가요, 와요), others → 어요 (먹어요, 마셔요), 하다 → 해요 (좋아해요, 공부해요).', '-아요/어요：ㅏ/ㅗ → 아요（가요、와요），其他 → 어요（먹어요、마셔요），하다 → 해요（좋아해요、공부해요）。'),
    ],
  },
  words: wordsOf('ko-d5', 1, [
    { id: 'na', text: '나', pron: 'na', vi: 'tôi, tớ (thân mật)', en: 'I, me (casual)', type: 'pronoun', topic: 'people', level: 'TOPIK I · 1',
      notes: L('Dùng với bạn bè thân và người nhỏ tuổi hơn; đi với lối nói thân mật (bỏ -요). 나 + 가 → 내가.', 'Used with close friends and younger people, together with casual speech (no -요). 나 + 가 → 내가.', '对好朋友和比自己小的人用，搭配非敬语（去掉 -요）。나 + 가 → 내가。'),
      ex: ['나는 우유를 마셔.', 'Tớ uống sữa. (thân mật)', 'I drink milk. (casual)', 'Naneun uyureul masyeo.'] },
    { id: 'uri', text: '우리', pron: 'uri', vi: 'chúng tôi, chúng ta', en: 'we, us', type: 'pronoun', topic: 'people', level: 'TOPIK I · 1',
      notes: L('Cũng có nghĩa "của chúng tôi": 우리 엄마 = mẹ tôi.', 'Also means "our": 우리 엄마 = my mum.', '也表示“我们的”：우리 엄마 = 我妈妈。'),
      ex: ['우리는 한국어를 공부해요.', 'Chúng tôi học tiếng Hàn.', 'We study Korean.', 'Urineun hangugeoreul gongbuhaeyo.'] },
    { id: 'i-saram', text: '이 사람', pron: 'i saram', vi: 'người này', en: 'this person', type: 'pronoun', topic: 'people', level: 'TOPIK I · 1',
      ex: ['이 사람은 선생님이에요.', 'Người này là giáo viên.', 'This person is a teacher.', 'I sarameun seonsaengnimieyo.'] },
    { id: 'geu-saram', text: '그 사람', pron: 'geu saram', vi: 'người đó, anh ấy, chị ấy', en: 'that person (he, she)', type: 'pronoun', topic: 'people', level: 'TOPIK I · 1',
      notes: L('Thường dùng như "anh ấy / cô ấy" khi nói về người đã nhắc đến.', 'Often used like "he / she" for someone already mentioned.', '谈到前面提过的人时，常用作“他 / 她”。'),
      ex: ['그 사람이 커피를 마셔요.', 'Người đó uống cà phê.', 'That person drinks coffee.', 'Geu sarami keopireul masyeoyo.'] },
    { id: 'jeo-saram', text: '저 사람', pron: 'jeo saram', vi: 'người kia', en: 'that person over there', type: 'pronoun', topic: 'people', level: 'TOPIK I · 1',
      notes: L('저 ở đây là "kia", không phải "tôi".', 'Here 저 means "over there", not "I".', '这里的 저 是“那边的”，不是“我”。'),
      ex: ['저 사람은 베트남 사람이에요.', 'Người kia là người Việt Nam.', 'That person over there is Vietnamese.', 'Jeo sarameun beteunam saramieyo.'] },
    { id: 'gada', text: '가다', pron: 'gada', vi: 'đi', en: 'to go', type: 'verb', topic: 'daily', level: 'TOPIK I · 1',
      notes: L('Lịch sự: 가요. Nơi đến + 에: 한국에 가요.', 'Polite: 가요. Destination + 에: 한국에 가요.', '礼貌形：가요。目的地 + 에：한국에 가요。'),
      ex: ['저는 한국에 가요.', 'Tôi đi Hàn Quốc.', 'I am going to Korea.', 'Jeoneun hanguge gayo.'] },
    { id: 'oda', text: '오다', pron: 'oda', vi: 'đến, tới', en: 'to come', type: 'verb', topic: 'daily', level: 'TOPIK I · 1',
      notes: L('Lịch sự: 와요 (ㅗ + ㅏ = ㅘ).', 'Polite: 와요 (ㅗ + ㅏ = ㅘ).', '礼貌形：와요（ㅗ + ㅏ = ㅘ）。'),
      ex: ['선생님이 와요.', 'Thầy giáo đến.', 'The teacher is coming.', 'Seonsaengnimi wayo.'] },
    { id: 'meokda', text: '먹다', pron: 'meokda', spoken: '[먹따]', vi: 'ăn', en: 'to eat', type: 'verb', topic: 'food', level: 'TOPIK I · 1',
      notes: L('Lịch sự: 먹어요 [머거요].', 'Polite: 먹어요 [머거요].', '礼貌形：먹어요 [머거요]。'),
      ex: ['저는 밥을 먹어요.', 'Tôi ăn cơm.', 'I eat rice.', 'Jeoneun babeul meogeoyo.'] },
    { id: 'masida', text: '마시다', pron: 'masida', vi: 'uống', en: 'to drink', type: 'verb', topic: 'food', level: 'TOPIK I · 1',
      notes: L('Lịch sự: 마셔요 (ㅣ + ㅓ = ㅕ).', 'Polite: 마셔요 (ㅣ + ㅓ = ㅕ).', '礼貌形：마셔요（ㅣ + ㅓ = ㅕ）。'),
      ex: ['아이가 우유를 마셔요.', 'Đứa trẻ uống sữa.', 'The child drinks milk.', 'Aiga uyureul masyeoyo.'] },
    { id: 'joahada', text: '좋아하다', pron: 'joahada', spoken: '[조아하다]', vi: 'thích', en: 'to like', type: 'verb', topic: 'feelings', level: 'TOPIK I · 1',
      notes: L('ㅎ giữa hai nguyên âm gần như câm: [조아하다]. Lịch sự: 좋아해요. Thứ được thích + 을/를.', 'ㅎ between vowels is almost silent: [조아하다]. Polite: 좋아해요. The thing liked takes 을/를.', '两个元音之间的 ㅎ 几乎不发音：[조아하다]。礼貌形：좋아해요。喜欢的对象 + 을/를。'),
      ex: ['저는 커피를 좋아해요.', 'Tôi thích cà phê.', 'I like coffee.', 'Jeoneun keopireul joahaeyo.'] },
    { id: 'gongbuhada', text: '공부하다', pron: 'gongbuhada', vi: 'học, học bài', en: 'to study', type: 'verb', topic: 'school', level: 'TOPIK I · 1',
      notes: L('공부 (công phu → việc học) + 하다 (làm). Lịch sự: 공부해요.', '공부 (study, from Sino-Korean 工夫) + 하다 (do). Polite: 공부해요.', '공부（工夫，学习）+ 하다（做）。礼貌形：공부해요。'),
      ex: ['학생이 공부해요.', 'Học sinh học bài.', 'The student is studying.', 'Haksaengi gongbuhaeyo.'] },
    { id: 'bap', text: '밥', pron: 'bap', vi: 'cơm, bữa ăn', en: 'rice, meal', type: 'noun', topic: 'food', level: 'TOPIK I · 1',
      notes: L('Có batchim → đi với 을/이: 밥을, 밥이.', 'Ends in a batchim → takes 을/이: 밥을, 밥이.', '有收音 → 用 을/이：밥을、밥이。'),
      ex: ['우리는 밥을 먹어요.', 'Chúng tôi ăn cơm.', 'We eat rice.', 'Urineun babeul meogeoyo.'] },
  ]),
  grammar: [
    {
      id: 'ko-g-object',
      lessonId: 'ko-d5',
      title: L('Tiểu từ tân ngữ 을/를 và trật tự S-O-V', 'Object particle 을/를 and S-O-V word order', '宾格助词 을/를 与“主—宾—谓”语序'),
      pattern: L('Chủ ngữ + 은/는 (이/가) + Tân ngữ + 을/를 + Động từ', 'Subject + 은/는 (이/가) + Object + 을/를 + Verb', '主语 + 은/는（이/가）+ 宾语 + 을/를 + 动词'),
      meaning: [
        L(
          '을/를 gắn sau danh từ chịu tác động của hành động (ăn GÌ, uống GÌ, thích GÌ).',
          '을/를 attaches to the noun the action is done to (eat WHAT, drink WHAT, like WHAT).',
          '을/를 加在动作对象的名词后面（吃什么、喝什么、喜欢什么）。',
        ),
        L(
          'Danh từ kết thúc bằng nguyên âm + 를: 커피를, 우유를, 한국어를. Danh từ kết thúc bằng phụ âm (có batchim) + 을: 밥을, 물을.',
          'Noun ending in a vowel + 를: 커피를, 우유를, 한국어를. Noun ending in a consonant (batchim) + 을: 밥을, 물을.',
          '以元音结尾的名词 + 를：커피를、우유를、한국어를。以辅音（收音）结尾的名词 + 을：밥을、물을。',
        ),
        L(
          'Động từ luôn đứng cuối câu: Chủ ngữ – Tân ngữ – Động từ. Đây là trật tự ngược với tiếng Việt (Chủ ngữ – Động từ – Tân ngữ).',
          'The verb always comes at the end: Subject – Object – Verb. This is the reverse of Vietnamese and English (Subject – Verb – Object).',
          '动词总在句末：主语—宾语—动词。这和越南语、汉语的“主—谓—宾”相反。',
        ),
        L(
          'Trong văn nói, 을/를 đôi khi được lược bỏ (밥 먹어요), nhưng người mới học nên luôn dùng.',
          'In speech 을/를 is sometimes dropped (밥 먹어요), but beginners should always use it.',
          '口语中 을/를 有时会省略（밥 먹어요），但初学者最好一直加上。',
        ),
      ],
      breakdown: [
        [ { text: '저는', role: TOPIC }, { text: '밥을', role: OBJ }, { text: '먹어요', role: VERB } ],
        [ { text: '아이가', role: SUBJ }, { text: '우유를', role: OBJ }, { text: '마셔요', role: VERB } ],
      ],
      examples: [
        { text: '저는 커피를 마셔요.', pron: 'Jeoneun keopireul masyeoyo.', vi: 'Tôi uống cà phê.', en: 'I drink coffee.' },
        { text: '아빠가 고기를 먹어요.', pron: 'Appaga gogireul meogeoyo.', vi: 'Bố ăn thịt.', en: 'Dad eats meat.' },
        { text: '우리는 밥을 좋아해요.', pron: 'Urineun babeul joahaeyo.', vi: 'Chúng tôi thích cơm.', en: 'We like rice.' },
        { text: '학생이 한국어를 공부해요.', pron: 'Haksaengi hangugeoreul gongbuhaeyo.', vi: 'Học sinh học tiếng Hàn.', en: 'The student studies Korean.' },
      ],
      mistakes: [
        { wrong: '저는 먹어요 밥을.', right: '저는 밥을 먹어요.',
          why: L('Động từ phải đứng cuối câu.', 'The verb must come at the end.', '动词必须放在句末。') },
        { wrong: '저는 커피을 좋아해요.', right: '저는 커피를 좋아해요.',
          why: L('커피 kết thúc bằng nguyên âm nên dùng 를, không dùng 을.', '커피 ends in a vowel, so it takes 를, not 을.', '커피 以元音结尾，所以用 를，不用 을。') },
        { wrong: '저는 커피가 마셔요.', right: '저는 커피를 마셔요.',
          why: L('Cà phê là thứ bị uống (tân ngữ) → 을/를, không phải 이/가.', 'Coffee is what is drunk (the object) → 을/를, not 이/가.', '咖啡是被喝的东西（宾语）→ 用 을/를，不用 이/가。') },
      ],
      exercises: [
        choice('ko-g-object-1', 'grammar', FILL('저는 고기＿ 먹어요.', G('Tôi ăn thịt.', 'I eat meat.')),
          ['를', '을', '가', '이'], 0,
          L('고기 kết thúc bằng nguyên âm → 를.', '고기 ends in a vowel → 를.', '고기 以元音结尾 → 를。'),
          { targetOptions: true, grammarId: 'ko-g-object', wordIds: ['meokda'] }),
        arrange('ko-g-object-2', G('Bố uống cà phê.', 'Dad drinks coffee.'), ['아빠가', '커피를', '마셔요'],
          L('Chủ ngữ + 가, tân ngữ + 를, động từ cuối câu.', 'Subject + 가, object + 를, verb last.', '主语 + 가，宾语 + 를，动词在最后。'),
          ['masida']),
        choice('ko-g-object-3', 'grammar', WHICH_CORRECT,
          ['우리는 한국어를 공부해요.', '우리는 공부해요 한국어를.', '우리는 한국어을 공부해요.', '우리는 한국어가 공부해요.'], 0,
          L('Tân ngữ 한국어 + 를 (nguyên âm), động từ ở cuối.', 'Object 한국어 + 를 (vowel ending), verb at the end.', '宾语 한국어 + 를（元音结尾），动词放在最后。'),
          { targetOptions: true, grammarId: 'ko-g-object', wordIds: ['gongbuhada'] }),
      ],
    },
    {
      id: 'ko-g-ayo',
      lessonId: 'ko-d5',
      title: L('Đuôi hiện tại lịch sự -아요 / -어요 / -해요', 'Present polite ending -아요 / -어요 / -해요', '现在时礼貌语尾 -아요 / -어요 / -해요'),
      pattern: L('Gốc động từ (bỏ 다) + 아요 / 어요 · 하다 → 해요', 'Verb stem (drop 다) + 아요 / 어요 · 하다 → 해요', '动词词干（去掉 다）+ 아요 / 어요 · 하다 → 해요'),
      meaning: [
        L(
          'Động từ tiếng Hàn trong từ điển kết thúc bằng 다 (가다, 먹다). Bỏ 다 để lấy gốc, rồi thêm đuôi. Đuôi -아요/어요 là lối nói lịch sự hằng ngày (해요체), dùng cho cả hiện tại, câu hỏi và lời rủ.',
          'Korean verbs in the dictionary end in 다 (가다, 먹다). Drop 다 to get the stem, then add an ending. -아요/어요 is the everyday polite style (해요체), used for statements, questions and suggestions in the present.',
          '韩语动词的词典形以 다 结尾（가다、먹다）。去掉 다 得到词干，再加语尾。-아요/어요 是日常礼貌体（해요체），用于现在时的陈述、疑问和提议。',
        ),
        L(
          'Quy tắc: nguyên âm cuối của gốc là ㅏ hoặc ㅗ → + 아요 (가요, 와요, 좋아요). Nguyên âm khác (ㅓ, ㅜ, ㅡ, ㅣ…) → + 어요 (먹어요, 마셔요). Gốc có 하 → 해요 (좋아해요, 공부해요).',
          'Rule: if the last vowel of the stem is ㅏ or ㅗ → + 아요 (가요, 와요, 좋아요). Any other vowel (ㅓ, ㅜ, ㅡ, ㅣ…) → + 어요 (먹어요, 마셔요). 하 stems → 해요 (좋아해요, 공부해요).',
          '规则：词干最后的元音是 ㅏ 或 ㅗ → + 아요（가요、와요、좋아요）；其他元音（ㅓ、ㅜ、ㅡ、ㅣ……）→ + 어요（먹어요、마셔요）；하 词干 → 해요（좋아해요、공부해요）。',
        ),
        L(
          'Gốc kết thúc bằng nguyên âm thì gộp lại: 가 + 아요 → 가요, 오 + 아요 → 와요, 마시 + 어요 → 마셔요, 배우 + 어요 → 배워요.',
          'When the stem ends in a vowel, the vowels merge: 가 + 아요 → 가요, 오 + 아요 → 와요, 마시 + 어요 → 마셔요, 배우 + 어요 → 배워요.',
          '词干以元音结尾时元音合并：가 + 아요 → 가요，오 + 아요 → 와요，마시 + 어요 → 마셔요，배우 + 어요 → 배워요。',
        ),
        L(
          'Động từ không đổi theo ngôi: 저는 가요, 우리는 가요, 그 사람은 가요 — giống tiếng Việt.',
          'The verb does not change for person: 저는 가요, 우리는 가요, 그 사람은 가요 — just like Vietnamese.',
          '动词不随人称变化：저는 가요、우리는 가요、그 사람은 가요——和越南语、汉语一样。',
        ),
      ],
      breakdown: [
        [ { text: '먹', role: STEM }, { text: '어요', role: ENDING } ],
        [ { text: '가', role: STEM }, { text: '(아)요', role: ENDING } ],
        [ { text: '공부', role: L('Danh từ "việc học"', 'Noun "study"', '名词“学习”') }, { text: '해요', role: L('하다 đổi thành 해요', '하다 becomes 해요', '하다 变成 해요') } ],
      ],
      examples: [
        { text: '저는 지금 가요.', pron: 'Jeoneun jigeum gayo.', vi: 'Tôi đi bây giờ đây.', en: 'I’m going now.' },
        { text: '아빠가 와요.', pron: 'Appaga wayo.', vi: 'Bố đến.', en: 'Dad is coming.' },
        { text: '그 사람은 고기를 먹어요.', pron: 'Geu sarameun gogireul meogeoyo.', vi: 'Người đó ăn thịt.', en: 'That person eats meat.' },
        { text: '저는 우유를 좋아해요.', pron: 'Jeoneun uyureul joahaeyo.', vi: 'Tôi thích sữa.', en: 'I like milk.' },
      ],
      mistakes: [
        { wrong: '먹아요', right: '먹어요',
          why: L('Nguyên âm của 먹 là ㅓ (không phải ㅏ/ㅗ) → 어요.', 'The vowel of 먹 is ㅓ (not ㅏ/ㅗ) → 어요.', '먹 的元音是 ㅓ（不是 ㅏ/ㅗ）→ 어요。') },
        { wrong: '공부하요', right: '공부해요',
          why: L('하다 luôn thành 해요.', '하다 always becomes 해요.', '하다 一律变成 해요。') },
        { wrong: '가아요', right: '가요',
          why: L('가 + 아요: hai ㅏ gộp làm một → 가요.', '가 + 아요: the two ㅏ merge → 가요.', '가 + 아요：两个 ㅏ 合成一个 → 가요。') },
      ],
      exercises: [
        choice('ko-g-ayo-1', 'grammar', polite('먹다'),
          ['먹어요', '먹아요', '먹해요', '머요'], 0,
          L('먹 (ㅓ) + 어요 = 먹어요.', '먹 (ㅓ) + 어요 = 먹어요.', '먹（ㅓ）+ 어요 = 먹어요。'),
          { targetOptions: true, grammarId: 'ko-g-ayo', wordIds: ['meokda'] }),
        choice('ko-g-ayo-2', 'grammar', polite('좋아하다'),
          ['좋아해요', '좋아하요', '좋아어요', '좋아하어요'], 0,
          L('-하다 → -해요: 좋아해요 [조아해요].', '-하다 → -해요: 좋아해요 [조아해요].', '-하다 → -해요：좋아해요 [조아해요]。'),
          { targetOptions: true, grammarId: 'ko-g-ayo', wordIds: ['joahada'] }),
        typeIt('ko-g-ayo-3', 'hangul', { k: 'ex.write.hangul', p: { meaning: G('uống (lịch sự)', 'drink (polite)') } }, ['마셔요'],
          L('마시 + 어요 → 마셔요.', '마시 + 어요 → 마셔요.', '마시 + 어요 → 마셔요。'),
          { audio: '마셔요', grammarId: 'ko-g-ayo', wordIds: ['masida'] }),
      ],
    },
  ],
};
