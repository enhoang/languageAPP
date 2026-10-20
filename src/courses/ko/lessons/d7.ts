import type { Gloss, LText, SoundItem } from '../../../types';
import { arrangeWith, choice, listen, MATCH_PROMPT, typeIt } from '../../helpers';
import type { DayContent } from '../../helpers';

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });
const G = (vi: string, en: string): Gloss => ({ vi, en });
const arrange = arrangeWith(' ');

const FILL = (sentence: string, meaning: Gloss) => ({ seq: [sentence, ' (', meaning, ')'] });
const SAYS = (line: string) => ({ seq: [line, ' — ', L('Câu này đọc thực tế là:', 'How is it actually pronounced?', '实际怎么读？')] });

const plain = L('âm thường', 'plain', '松音');
const asp = L('âm bật hơi', 'aspirated', '送气音');
const tense = L('âm căng', 'tense', '紧音');
const triplet = (items: [string, string][]): SoundItem[] =>
  items.map(([text, pron], i) => ({ label: text, text, pron, note: [plain, asp, tense][i] }));

export const D7: DayContent = {
  lesson: {
    id: 'ko-d7', day: 7, stage: 1, minutes: 30, prerequisites: ['ko-d6'],
    title: L('Ôn tập và kiểm tra tuần 1', 'Week 1 review and test', '第一周复习与测验'),
    subtitle: L(
      'Hangul · batchim và nối âm · chào hỏi · 은/는 이/가 을/를 · -아요/어요 · câu hỏi',
      'Hangul · batchim and linking · greetings · 은/는 이/가 을/를 · -아요/어요 · questions',
      '韩文字母 · 收音与连音 · 问候 · 은/는 이/가 을/를 · -아요/어요 · 疑问句',
    ),
    objectives: [
      L('Đọc trôi chảy các khối chữ Hangul và phân biệt âm thường / bật hơi / căng.', 'Read Hangul syllable blocks fluently and tell plain / aspirated / tense sounds apart.', '流利地读韩文音节块，分清松音 / 送气音 / 紧音。'),
      L('Áp dụng quy tắc batchim, nối âm và mũi hóa khi đọc.', 'Apply the batchim, linking and nasalization rules when reading.', '朗读时运用收音、连音和鼻音化规则。'),
      L('Dùng đúng 은/는, 이/가, 을/를 và đuôi -아요/어요.', 'Use 은/는, 이/가, 을/를 and the -아요/어요 ending correctly.', '正确使用 은/는、이/가、을/를 和 -아요/어요 语尾。'),
      L('Hiểu và tham gia một đoạn hội thoại làm quen ngắn.', 'Understand and take part in a short getting-to-know-you dialogue.', '听懂并参与一段简短的相识对话。'),
    ],
    intro: [
      L(
        'Chúc mừng bạn đã đi hết tuần đầu tiên! Trong 6 ngày bạn đã học đọc Hangul, chào hỏi, tự giới thiệu, nói "ai làm gì" và đặt câu hỏi.',
        'Congratulations on finishing your first week! In 6 days you have learned to read Hangul, greet people, introduce yourself, say who does what, and ask questions.',
        '恭喜你完成了第一周！六天里你学会了读韩文、打招呼、自我介绍、说“谁做什么”以及提问。',
      ),
      L(
        'Hôm nay không có từ mới. Hãy đọc lại từng phần ôn tập, đọc hội thoại, luyện nói rồi làm bài kiểm tra tổng hợp. Câu nào sai, hãy quay lại ngày tương ứng để xem lại.',
        'There are no new words today. Go through each review section, read the dialogue, practise speaking, then take the comprehensive test. If you miss something, go back to that day and review it.',
        '今天没有生词。请逐一看复习部分，读对话，练习口语，然后做综合测验。哪道题错了，就回到对应的那一天复习。',
      ),
    ],
    sections: [
      {
        kind: 'text',
        title: L('1. Đọc Hangul', '1. Reading Hangul', '1. 读韩文'),
        body: [
          L(
            'Mỗi khối chữ = phụ âm đầu + nguyên âm (+ phụ âm cuối). Không có phụ âm đầu thì viết ㅇ câm: 아, 오, 우. Nguyên âm dọc (ㅏ ㅓ ㅣ) viết bên phải: 가; nguyên âm ngang (ㅗ ㅜ ㅡ) viết bên dưới: 고.',
            'Each block = initial consonant + vowel (+ final consonant). With no initial sound, write the silent ㅇ: 아, 오, 우. Vertical vowels (ㅏ ㅓ ㅣ) go on the right: 가; horizontal vowels (ㅗ ㅜ ㅡ) go underneath: 고.',
            '每个音节块 = 初声 + 元音（+ 收音）。没有初声时写不发音的 ㅇ：아、오、우。竖元音（ㅏ ㅓ ㅣ）写在右边：가；横元音（ㅗ ㅜ ㅡ）写在下面：고。',
          ),
          L(
            'Ba nhóm phụ âm: thường (ㄱ ㄷ ㅂ ㅈ), bật hơi (ㅋ ㅌ ㅍ ㅊ — bật mạnh một luồng hơi), căng (ㄲ ㄸ ㅃ ㅉ — căng cổ họng, không có hơi, gần giống "c, t, p" trong tiếng Việt).',
            'Three consonant series: plain (ㄱ ㄷ ㅂ ㅈ), aspirated (ㅋ ㅌ ㅍ ㅊ — a strong puff of air), tense (ㄲ ㄸ ㅃ ㅉ — tight throat, no air, close to Vietnamese "c, t, p").',
            '三组辅音：松音（ㄱ ㄷ ㅂ ㅈ）、送气音（ㅋ ㅌ ㅍ ㅊ——有一股强气流）、紧音（ㄲ ㄸ ㅃ ㅉ——喉咙绷紧、不送气，接近越南语的 “c, t, p”）。',
          ),
        ],
      },
      {
        kind: 'sounds',
        title: L('Nghe lại: thường – bật hơi – căng', 'Listen again: plain – aspirated – tense', '再听一遍：松音—送气音—紧音'),
        intro: L('Bấm từng âm, nghe và nhắc lại theo hàng.', 'Tap each sound, listen and repeat row by row.', '点每个音，逐行听并跟读。'),
        items: [
          ...triplet([['가', 'ga'], ['카', 'ka'], ['까', 'kka']]),
          ...triplet([['다', 'da'], ['타', 'ta'], ['따', 'tta']]),
          ...triplet([['바', 'ba'], ['파', 'pa'], ['빠', 'ppa']]),
          ...triplet([['자', 'ja'], ['차', 'cha'], ['짜', 'jja']]),
        ],
      },
      {
        kind: 'text',
        title: L('2. Batchim và nối âm', '2. Batchim and linking', '2. 收音与连音'),
        body: [
          L(
            'Phụ âm cuối (batchim) chỉ có 7 âm: [ㄱ] [ㄴ] [ㄷ] [ㄹ] [ㅁ] [ㅂ] [ㅇ]. Ví dụ ㅅ, ㅆ, ㅈ ở cuối đều đọc [ㄷ]: 있다 [읻따].',
            'A final consonant (batchim) has only 7 sounds: [ㄱ] [ㄴ] [ㄷ] [ㄹ] [ㅁ] [ㅂ] [ㅇ]. For example ㅅ, ㅆ, ㅈ at the end all sound [ㄷ]: 있다 [읻따].',
            '收音只有 7 个音：[ㄱ] [ㄴ] [ㄷ] [ㄹ] [ㅁ] [ㅂ] [ㅇ]。比如 ㅅ、ㅆ、ㅈ 在音节末尾都读 [ㄷ]：있다 [읻따]。',
          ),
          L(
            'Nối âm (연음): batchim + âm tiết bắt đầu bằng ㅇ → batchim chuyển sang âm tiết sau: 한국어 [한구거], 먹어요 [머거요], 밥을 [바블], 있어요 [이써요].',
            'Linking (연음): batchim + a syllable starting with ㅇ → the batchim moves to the next syllable: 한국어 [한구거], 먹어요 [머거요], 밥을 [바블], 있어요 [이써요].',
            '连音（연음）：收音 + 以 ㅇ 开头的音节 → 收音移到后一个音节：한국어 [한구거]，먹어요 [머거요]，밥을 [바블]，있어요 [이써요]。',
          ),
          L(
            'Mũi hóa: ㅂ trước ㄴ/ㅁ đọc thành [ㅁ]: 감사합니다 [감사함니다], 반갑습니다 [반갑씀니다]. ㅎ giữa hai nguyên âm gần như câm: 좋아요 [조아요].',
            'Nasalization: ㅂ before ㄴ/ㅁ becomes [ㅁ]: 감사합니다 [감사함니다], 반갑습니다 [반갑씀니다]. ㅎ between vowels is almost silent: 좋아요 [조아요].',
            '鼻音化：ㅂ 在 ㄴ/ㅁ 前读 [ㅁ]：감사합니다 [감사함니다]，반갑습니다 [반갑씀니다]。ㅎ 在两个元音之间几乎不发音：좋아요 [조아요]。',
          ),
        ],
      },
      {
        kind: 'examples',
        title: L('3. Chào hỏi và câu giao tiếp', '3. Greetings and everyday expressions', '3. 问候与日常用语'),
        examples: [
          { text: '안녕하세요?', pron: 'Annyeonghaseyo?', vi: 'Xin chào.', en: 'Hello.' },
          { text: '처음 뵙겠습니다.', pron: 'Cheoeum boepgetseumnida.', vi: 'Rất hân hạnh được gặp lần đầu.', en: 'How do you do?' },
          { text: '만나서 반갑습니다.', pron: 'Mannaseo bangapseumnida.', vi: 'Rất vui được gặp bạn.', en: 'Nice to meet you.' },
          { text: '감사합니다.', pron: 'Gamsahamnida.', vi: 'Cảm ơn.', en: 'Thank you.' },
          { text: '안녕히 가세요.', pron: 'Annyeonghi gaseyo.', vi: 'Tạm biệt (nói với người ra về).', en: 'Goodbye (to someone leaving).' },
          { text: '안녕히 계세요.', pron: 'Annyeonghi gyeseyo.', vi: 'Tạm biệt (nói với người ở lại).', en: 'Goodbye (to someone staying).' },
        ],
      },
      {
        kind: 'text',
        title: L('4. Tiểu từ: 은/는 · 이/가 · 을/를', '4. Particles: 은/는 · 이/가 · 을/를', '4. 助词：은/는 · 이/가 · 을/를'),
        body: [
          L(
            'Sau phụ âm (có batchim) dùng dạng đầu: 은, 이, 을 — 선생님은, 선생님이, 밥을. Sau nguyên âm dùng dạng sau: 는, 가, 를 — 저는, 아이가, 커피를.',
            'After a consonant (batchim) use the first form: 은, 이, 을 — 선생님은, 선생님이, 밥을. After a vowel use the second: 는, 가, 를 — 저는, 아이가, 커피를.',
            '辅音（有收音）后用前一个形式：은、이、을——선생님은、선생님이、밥을。元音后用后一个：는、가、를——저는、아이가、커피를。',
          ),
          L(
            '은/는 = chủ đề ("còn … thì"); 이/가 = chủ ngữ, thông tin mới, và đi với 있어요/없어요; 을/를 = tân ngữ (ăn gì, uống gì).',
            '은/는 = topic ("as for …"); 이/가 = subject, new information, and with 있어요/없어요; 을/를 = object (eat what, drink what).',
            '은/는 = 话题（“至于……”）；이/가 = 主语、新信息，并和 있어요/없어요 连用；을/를 = 宾语（吃什么、喝什么）。',
          ),
          L(
            'Câu "là": N이에요 (sau phụ âm: 학생이에요) / N예요 (sau nguyên âm: 민수예요).',
            '"To be": N이에요 (after a consonant: 학생이에요) / N예요 (after a vowel: 민수예요).',
            '“是”：N이에요（辅音后：학생이에요）/ N예요（元音后：민수예요）。',
          ),
        ],
      },
      { kind: 'grammar', grammarId: 'ko-g-ayo' },
      { kind: 'grammar', grammarId: 'ko-g-question' },
      {
        kind: 'examples',
        title: L('5. Bài đọc: Lan và Minsu', '5. Reading: Lan and Minsu', '5. 阅读：兰和民秀'),
        examples: [
          { text: '민수: 안녕하세요! 저는 김민수예요. 이름이 뭐예요?', pron: 'Minsu: Annyeonghaseyo! Jeoneun Gim Minsuyeyo. Ireumi mwoyeyo?', vi: 'Minsu: Xin chào! Tôi là Kim Minsu. Bạn tên là gì?', en: 'Minsu: Hello! I’m Kim Minsu. What’s your name?' },
          { text: '란: 안녕하세요! 제 이름은 란이에요. 베트남 사람이에요.', pron: 'Ran: Annyeonghaseyo! Je ireumeun Ranieyo. Beteunam saramieyo.', vi: 'Lan: Xin chào! Tên tôi là Lan. Tôi là người Việt Nam.', en: 'Lan: Hello! My name is Lan. I’m Vietnamese.' },
          { text: '민수: 만나서 반갑습니다. 란 씨는 학생이에요?', pron: 'Minsu: Mannaseo bangapseumnida. Ran ssineun haksaengieyo?', vi: 'Minsu: Rất vui được gặp bạn. Lan là sinh viên à?', en: 'Minsu: Nice to meet you. Are you a student, Lan?' },
          { text: '란: 네, 학생이에요. 한국어를 공부해요.', pron: 'Ran: Ne, haksaengieyo. Hangugeoreul gongbuhaeyo.', vi: 'Lan: Vâng, tôi là sinh viên. Tôi học tiếng Hàn.', en: 'Lan: Yes, I’m a student. I study Korean.' },
          { text: '민수: 지금 뭐 해요?', pron: 'Minsu: Jigeum mwo haeyo?', vi: 'Minsu: Bây giờ bạn đang làm gì?', en: 'Minsu: What are you doing now?' },
          { text: '란: 커피를 마셔요. 민수 씨도 커피를 좋아해요?', pron: 'Ran: Keopireul masyeoyo. Minsu ssido keopireul joahaeyo?', vi: 'Lan: Tôi đang uống cà phê. Minsu cũng thích cà phê chứ?', en: 'Lan: I’m drinking coffee. Do you like coffee too, Minsu?' },
          { text: '민수: 아니요, 저는 우유를 좋아해요.', pron: 'Minsu: Aniyo, jeoneun uyureul joahaeyo.', vi: 'Minsu: Không, tôi thích sữa.', en: 'Minsu: No, I like milk.' },
        ],
      },
      {
        kind: 'speak',
        title: L('Luyện nói: vai Lan', 'Speaking practice: play Lan', '口语练习：扮演兰'),
        intro: L(
          'Đọc to các câu của Lan, thay tên và thông tin bằng của bạn nếu muốn.',
          'Read Lan’s lines aloud — swap in your own name and details if you like.',
          '大声读兰的台词，也可以换成你自己的名字和信息。',
        ),
        items: [
          { text: '안녕하세요! 제 이름은 란이에요.', pron: 'Annyeonghaseyo! Je ireumeun Ranieyo.', vi: 'Xin chào! Tên tôi là Lan.', en: 'Hello! My name is Lan.' },
          { text: '베트남 사람이에요.', pron: 'Beteunam saramieyo.', vi: 'Tôi là người Việt Nam.', en: 'I’m Vietnamese.' },
          { text: '한국어를 공부해요.', pron: 'Hangugeoreul gongbuhaeyo.', vi: 'Tôi học tiếng Hàn.', en: 'I study Korean.' },
          { text: '커피를 좋아해요?', pron: 'Keopireul joahaeyo?', vi: 'Bạn thích cà phê không?', en: 'Do you like coffee?' },
          { text: '감사합니다. 안녕히 계세요!', pron: 'Gamsahamnida. Annyeonghi gyeseyo!', vi: 'Cảm ơn. Tạm biệt nhé!', en: 'Thank you. Goodbye!' },
        ],
      },
      {
        kind: 'tip',
        title: L('Mẹo ôn tập', 'Review tip', '复习小贴士'),
        body: L(
          'Mỗi ngày dành 5 phút đọc to một đoạn hội thoại và tự đặt 3 câu "ai – cái gì – làm gì" về bản thân: 저는 커피를 마셔요, 저는 한국어를 공부해요… Lặp lại thường xuyên giúp tiểu từ và đuôi -요 trở thành phản xạ.',
          'Spend 5 minutes a day reading a dialogue aloud and making 3 "who – what – does" sentences about yourself: 저는 커피를 마셔요, 저는 한국어를 공부해요… Regular repetition turns particles and the -요 ending into reflexes.',
          '每天花 5 分钟大声读一段对话，并用“谁—什么—做”造 3 个关于自己的句子：저는 커피를 마셔요，저는 한국어를 공부해요……经常重复，助词和 -요 语尾就会变成条件反射。',
        ),
      },
    ],
    wordIds: [],
    grammarIds: [],
    practice: [
      choice('ko-d7-p1', 'pronunciation', L('Đọc chữ Hangul và chọn phiên âm đúng:', 'Read the Hangul and choose the right romanization:', '读韩文，选择正确的罗马字：'),
        ['namu', 'nabu', 'mamu', 'namo'], 0,
        L('나무 = ㄴ+ㅏ, ㅁ+ㅜ → na-mu (cái cây).', '나무 = ㄴ+ㅏ, ㅁ+ㅜ → na-mu (tree).', '나무 = ㄴ+ㅏ、ㅁ+ㅜ → na-mu（树）。'),
        { text: '나무', audio: '나무' }),
      choice('ko-d7-p2', 'pronunciation', SAYS('먹어요'),
        ['[머거요]', '[먹거요]', '[머커요]', '[멍어요]'], 0,
        L('Nối âm: batchim ㄱ chuyển sang âm tiết bắt đầu bằng ㅇ → [머거요].', 'Linking: the batchim ㄱ moves onto the ㅇ syllable → [머거요].', '连音：收音 ㄱ 移到以 ㅇ 开头的音节 → [머거요]。'),
        { targetOptions: true, audio: '먹어요', wordIds: ['meokda'] }),
      choice('ko-d7-p3', 'grammar', FILL('저는 우유＿ 마셔요.', G('Tôi uống sữa.', 'I drink milk.')),
        ['를', '을', '는', '가'], 0,
        L('우유 là tân ngữ, kết thúc bằng nguyên âm → 를.', '우유 is the object and ends in a vowel → 를.', '우유 是宾语，以元音结尾 → 를。'),
        { targetOptions: true, grammarId: 'ko-g-object', wordIds: ['masida'] }),
      choice('ko-d7-p4', 'grammar', FILL('이름이 ＿예요?', G('Bạn tên là gì?', 'What’s your name?')),
        ['뭐', '누구', '어디', '언제'], 0,
        L('Hỏi tên → 뭐 (cái gì): 이름이 뭐예요?', 'Asking a name → 뭐 (what): 이름이 뭐예요?', '问名字 → 뭐（什么）：이름이 뭐예요？'),
        { targetOptions: true, grammarId: 'ko-g-question', wordIds: ['mwo'] }),
      listen('ko-d7-p5', '만나서 반갑습니다.',
        [G('Rất vui được gặp bạn.', 'Nice to meet you.'), G('Cảm ơn.', 'Thank you.'), G('Xin lỗi.', 'I’m sorry.'), G('Tạm biệt.', 'Goodbye.')], 0,
        { seq: ['만나서 반갑습니다 [반갑씀니다] = ', G('Rất vui được gặp bạn.', 'Nice to meet you.')] }),
      arrange('ko-d7-p6', G('Tôi học tiếng Hàn.', 'I study Korean.'), ['저는', '한국어를', '공부해요'],
        L('Chủ ngữ + tân ngữ + động từ: 저는 한국어를 공부해요.', 'Subject + object + verb: 저는 한국어를 공부해요.', '主语 + 宾语 + 动词：저는 한국어를 공부해요。'),
        ['gongbuhada']),
      typeIt('ko-d7-p7', 'hangul', { k: 'ex.write.hangul', p: { meaning: G('sữa', 'milk') } }, ['우유'],
        L('우유 (uyu): hai âm tiết chỉ có ㅇ câm + nguyên âm ㅜ, ㅠ.', '우유 (uyu): two syllables, each a silent ㅇ + the vowel ㅜ or ㅠ.', '우유（uyu）：两个音节，都是不发音的 ㅇ + 元音 ㅜ、ㅠ。'),
        { audio: '우유' }),
    ],
    quiz: [
      listen('ko-d7-q1', '까', ['가', '카', '까', '타'], 2,
        L('까 (kka): âm căng — không bật hơi, căng cổ họng.', '까 (kka): tense — no puff of air, tight throat.', '까（kka）：紧音——不送气，喉咙绷紧。'),
        { skill: 'pronunciation', targetOptions: true }),
      choice('ko-d7-q2', 'pronunciation', SAYS('한국어'),
        ['[한구거]', '[한국어]', '[항구거]', '[한구커]'], 0,
        L('Nối âm: ㄱ của 국 chuyển sang 어 → [한구거].', 'Linking: the ㄱ of 국 moves onto 어 → [한구거].', '连音：국 的 ㄱ 移到 어 上 → [한구거]。'),
        { targetOptions: true, audio: '한국어' }),
      choice('ko-d7-q3', 'pronunciation', SAYS('감사합니다'),
        ['[감사함니다]', '[감사합니다]', '[감사학니다]', '[감사한니다]'], 0,
        L('Mũi hóa: ㅂ trước ㄴ đọc thành [ㅁ] → [감사함니다].', 'Nasalization: ㅂ before ㄴ becomes [ㅁ] → [감사함니다].', '鼻音化：ㅂ 在 ㄴ 前读 [ㅁ] → [감사함니다]。'),
        { targetOptions: true, audio: '감사합니다' }),
      choice('ko-d7-q4', 'reading', L('Bạn ra về, còn chủ nhà ở lại. Bạn nói:', 'You are leaving and your host is staying. You say:', '你要离开，主人留下。你说：'),
        ['안녕히 계세요.', '안녕히 가세요.', '처음 뵙겠습니다.', '미안합니다.'], 0,
        L('계세요 = "ở lại" (kính ngữ của 있다) → nói với người ở lại. 가세요 nói với người ra đi.', '계세요 = "stay" (honorific of 있다) → said to the person staying. 가세요 is said to the person leaving.', '계세요 =“留下”（있다 的敬语）→ 对留下的人说。가세요 对离开的人说。'),
        { targetOptions: true }),
      choice('ko-d7-q5', 'grammar', FILL('저＿ 베트남 사람이에요.', G('Tôi là người Việt Nam.', 'I’m Vietnamese.')),
        ['는', '은', '를', '이'], 0,
        L('Chủ đề + 은/는; 저 kết thúc bằng nguyên âm → 저는.', 'Topic + 은/는; 저 ends in a vowel → 저는.', '话题 + 은/는；저 以元音结尾 → 저는。'),
        { targetOptions: true }),
      choice('ko-d7-q6', 'grammar', FILL('저는 민수＿.', G('Tôi là Minsu.', 'I’m Minsu.')),
        ['예요', '이에요', '있어요', '가요'], 0,
        L('민수 kết thúc bằng nguyên âm → 예요. (Sau phụ âm mới dùng 이에요: 란이에요.)', '민수 ends in a vowel → 예요. (이에요 follows a consonant: 란이에요.)', '민수 以元音结尾 → 예요。（辅音后才用 이에요：란이에요。）'),
        { targetOptions: true }),
      choice('ko-d7-q7', 'grammar', L('Áp dụng quy tắc -아요/어요: 보다 (xem) →', 'Apply the -아요/어요 rule: 보다 (to see) →', '运用 -아요/어요 规则：보다（看）→'),
        ['봐요', '보어요', '보요', '버요'], 0,
        L('보- có ㅗ → + 아요; ㅗ + ㅏ gộp thành ㅘ: 봐요 (giống 오다 → 와요).', '보- has ㅗ → + 아요; ㅗ + ㅏ merge into ㅘ: 봐요 (like 오다 → 와요).', '보- 的元音是 ㅗ → + 아요；ㅗ + ㅏ 合成 ㅘ：봐요（和 오다 → 와요 一样）。'),
        { targetOptions: true, grammarId: 'ko-g-ayo', wordIds: ['oda'] }),
      arrange('ko-d7-q8', G('Lan uống cà phê.', 'Lan drinks coffee.'), ['란 씨는', '커피를', '마셔요'],
        L('란 씨는 (chủ đề) + 커피를 (tân ngữ) + 마셔요 (động từ).', '란 씨는 (topic) + 커피를 (object) + 마셔요 (verb).', '란 씨는（话题）+ 커피를（宾语）+ 마셔요（动词）。'),
        ['masida']),
      choice('ko-d7-q9', 'reading', L('Đọc lời của Lan. Lan học gì?', 'Read Lan’s lines. What does Lan study?', '读兰的话。兰学什么？'),
        [L('Tiếng Hàn', 'Korean', '韩语'), L('Tiếng Việt', 'Vietnamese', '越南语'), L('Tiếng Anh', 'English', '英语'), L('Tiếng Trung', 'Chinese', '汉语')], 0,
        L('한국어를 공부해요 = Tôi học tiếng Hàn.', '한국어를 공부해요 = I study Korean.', '한국어를 공부해요 = 我学韩语。'),
        { text: '제 이름은 란이에요. 베트남 사람이에요. 한국어를 공부해요.', pron: 'Je ireumeun Ranieyo. Beteunam saramieyo. Hangugeoreul gongbuhaeyo.', wordIds: ['gongbuhada'] }),
      choice('ko-d7-q10', 'reading', L('Minsu thích gì?', 'What does Minsu like?', '民秀喜欢什么？'),
        [L('Sữa', 'Milk', '牛奶'), L('Cà phê', 'Coffee', '咖啡'), L('Cơm', 'Rice', '米饭'), L('Thịt', 'Meat', '肉')], 0,
        L('아니요, 저는 우유를 좋아해요 = Không, tôi thích sữa.', '아니요, 저는 우유를 좋아해요 = No, I like milk.', '아니요, 저는 우유를 좋아해요 = 不，我喜欢牛奶。'),
        { text: '란: 민수 씨도 커피를 좋아해요?\n민수: 아니요, 저는 우유를 좋아해요.', pron: 'Ran: Minsu ssido keopireul joahaeyo? / Minsu: Aniyo, jeoneun uyureul joahaeyo.', wordIds: ['joahada'] }),
      listen('ko-d7-q11', '지금 시간 있어요?',
        [G('Bây giờ bạn có thời gian không?', 'Do you have time now?'), G('Bây giờ bạn đi đâu?', 'Where are you going now?'), G('Bây giờ bạn ăn gì?', 'What are you eating now?'), G('Bạn có bạn không?', 'Do you have friends?')], 0,
        { seq: ['지금 시간 있어요? = ', G('Bây giờ bạn có thời gian không?', 'Do you have time now?')] },
        { wordIds: ['jigeum', 'sigan', 'itda'] }),
      typeIt('ko-d7-q12', 'hangul', { k: 'ex.write.hangul', p: { meaning: G('cảm ơn (trang trọng)', 'thank you (formal)') } }, ['감사합니다'],
        L('감사합니다 viết với 합, đọc [감사함니다].', '감사합니다 is written with 합 and said [감사함니다].', '감사합니다 写作 합，读作 [감사함니다]。'),
        { audio: '감사합니다' }),
      { id: 'ko-d7-q13', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: '먹다', pron: 'meokda', vi: 'ăn', en: 'to eat' },
        { text: '있다', pron: 'itda', vi: 'có, ở', en: 'to have, to be there' },
        { text: '친구', pron: 'chingu', vi: 'bạn, bạn bè', en: 'friend' },
        { text: '우리', pron: 'uri', vi: 'chúng tôi, chúng ta', en: 'we, us' },
      ], explanation: '먹다 meokda · 있다 itda · 친구 chingu · 우리 uri.', wordIds: ['meokda', 'itda', 'chingu', 'uri'] },
      choice('ko-d7-q14', 'reading', { seq: ['뭐 드세요? — ', L('Chọn câu trả lời phù hợp', 'Choose the right reply', '选择合适的回答')] },
        ['우유 마셔요.', '우유 드세요.', '네, 우유가 누구예요?', '우유를 가요.'], 0,
        L('Trả lời về mình không dùng kính ngữ: 우유 마셔요.', 'Answer about yourself without the honorific: 우유 마셔요.', '回答自己的事不用敬语：우유 마셔요。'),
        { targetOptions: true, grammarId: 'ko-g-question', wordIds: ['masida'] }),
    ],
    summary: [
      L('Hangul: khối chữ = phụ âm đầu + nguyên âm (+ batchim); ba nhóm phụ âm thường / bật hơi / căng.', 'Hangul: block = initial + vowel (+ batchim); three series plain / aspirated / tense.', '韩文：音节块 = 初声 + 元音（+ 收音）；三组辅音：松音 / 送气音 / 紧音。'),
      L('Đọc đúng: batchim 7 âm, nối âm (한국어 [한구거]), mũi hóa (감사합니다 [감사함니다]).', 'Say it right: 7 batchim sounds, linking (한국어 [한구거]), nasalization (감사합니다 [감사함니다]).', '读对：收音 7 个音、连音（한국어 [한구거]）、鼻音化（감사합니다 [감사함니다]）。'),
      L('Câu: Chủ ngữ은/는·이/가 + Tân ngữ을/를 + Động từ-아요/어요/해요.', 'Sentence: Subject은/는·이/가 + Object을/를 + Verb-아요/어요/해요.', '句子：主语은/는·이/가 + 宾语을/를 + 动词-아요/어요/해요。'),
      L('Câu hỏi: lên giọng -요?, từ để hỏi 뭐/어디/누구/언제, kính ngữ -세요? với người lớn.', 'Questions: rising -요?, question words 뭐/어디/누구/언제, honorific -세요? with elders.', '疑问句：-요？升调，疑问词 뭐/어디/누구/언제，对长辈用敬语 -세요？。'),
    ],
  },
  words: [],
  grammar: [],
};
