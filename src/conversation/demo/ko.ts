import type { DemoScript, Pron, ReplyChip, Suggestion } from '../types';

/**
 * Korean demo scripts (prewritten scenario practice).
 * pron.romanization = Revised Romanization of the ACTUAL pronunciation (tensification is not shown in RR);
 * pron.spoken = actual pronunciation in Hangul, given only when it differs from the spelling.
 * Vietnamese notes use "patchim", English notes use "batchim" (same as the course data).
 */

const p = (romanization: string, spoken?: string, vi?: string, en?: string): Pron => ({
  romanization,
  ...(spoken ? { spoken } : {}),
  ...(vi && en ? { note: { vi, en } } : {}),
  source: 'script',
});

const r = (text: string, vi: string, en: string): ReplyChip => ({ text, translation: { vi, en } });

const turn = (text: string, vi: string, en: string, pron: Pron, replies: ReplyChip[]) => ({
  partner: { text, translation: { vi, en }, pron },
  replies,
});

const s = (
  level: Suggestion['level'],
  text: string,
  pron: Pron,
  meaning: [string, string],
  example: string,
  exampleTranslation: [string, string],
): Suggestion => ({
  level,
  text,
  pron,
  meaning: { vi: meaning[0], en: meaning[1] },
  example,
  exampleTranslation: { vi: exampleTranslation[0], en: exampleTranslation[1] },
});

export const DEMO_KO: DemoScript[] = [
  // ───────────────────────────── greetings ─────────────────────────────
  {
    id: 'ko-greetings',
    lang: 'ko',
    scenario: 'greetings',
    level: 'beginner',
    intro: {
      scenario: {
        vi: 'Bạn đến một buổi giao lưu ngôn ngữ ở Seoul và gặp Minsu, một người Hàn lần đầu gặp mặt.',
        en: 'You are at a language exchange meetup in Seoul and meet Minsu, a Korean you have never met before.',
        zh: '你在首尔参加一个语言交换聚会，第一次见到韩国人民秀。',
      },
      role: {
        vi: 'Bạn là người học tiếng Hàn. Hãy chào hỏi, giới thiệu tên, quốc tịch, công việc, kể một chút về bản thân và hẹn gặp lại.',
        en: 'You are a Korean learner. Greet Minsu, say your name, nationality and what you do, talk a little about yourself and agree to meet again.',
        zh: '你是学韩语的人。请打招呼，介绍自己的名字、国籍和职业，聊聊自己，并约好下次再见。',
      },
    },
    turns: [
      turn(
        '안녕하세요! 저는 민수예요. 이름이 뭐예요?',
        'Xin chào! Tôi là Minsu. Bạn tên là gì?',
        "Hello! I'm Minsu. What's your name?",
        p(
          'Annyeonghaseyo! Jeoneun Minsuyeyo. Ireumi mwoyeyo?',
          '[안녕하세요! 저는 민수예요. 이르미 뭐예요?]',
          'Nối âm (연음): 이름이 → [이르미], patchim ㅁ chuyển sang âm tiết sau.',
          'Liaison (연음): 이름이 → [이르미], the batchim ㅁ moves to the next syllable.',
        ),
        [
          r('안녕하세요! 저는 린이에요.', 'Xin chào! Tôi là Linh.', "Hello! I'm Linh."),
          r('안녕하세요, 민수 씨! 제 이름은 린이에요.', 'Chào anh Minsu! Tên tôi là Linh.', 'Hello, Minsu! My name is Linh.'),
          r('안녕하세요. 저는 린이에요. 만나서 반가워요.', 'Xin chào. Tôi là Linh. Rất vui được gặp anh.', "Hello. I'm Linh. Nice to meet you."),
        ],
      ),
      turn(
        '만나서 반가워요. 어느 나라 사람이에요?',
        'Rất vui được gặp bạn. Bạn là người nước nào?',
        'Nice to meet you. Which country are you from?',
        p(
          'Mannaseo bangawoyo. Eoneu nara saramieyo?',
          '[만나서 반가워요. 어느 나라 사라미에요?]',
          'Nối âm (연음): 사람이에요 → [사라미에요].',
          'Liaison (연음): 사람이에요 → [사라미에요].',
        ),
        [
          r('저는 베트남 사람이에요.', 'Tôi là người Việt Nam.', "I'm Vietnamese."),
          r('베트남에서 왔어요.', 'Tôi đến từ Việt Nam.', 'I came from Vietnam.'),
          r('저도 반가워요. 저는 베트남 사람이에요. 하노이에서 왔어요.', 'Tôi cũng rất vui. Tôi là người Việt Nam, đến từ Hà Nội.', "Nice to meet you too. I'm Vietnamese. I'm from Hanoi."),
        ],
      ),
      turn(
        '아, 그래요? 한국어를 정말 잘해요! 얼마나 공부했어요?',
        'À, vậy à? Bạn nói tiếng Hàn giỏi thật đấy! Bạn đã học bao lâu rồi?',
        'Oh, really? Your Korean is really good! How long have you studied it?',
        p(
          'A, geuraeyo? Hangugeoreul jeongmal jalhaeyo! Eolmana gongbuhaesseoyo?',
          '[아, 그래요? 한구거를 정말 잘해요! 얼마나 공부해써요?]',
          'Nối âm (연음): 한국어를 → [한구거를]; 했어요 → [해써요] (patchim ㅆ chuyển sang âm tiết sau).',
          'Liaison (연음): 한국어를 → [한구거를]; 했어요 → [해써요] (the batchim ㅆ moves to the next syllable).',
        ),
        [
          r('감사합니다. 육 개월 공부했어요.', 'Cảm ơn anh. Tôi học được sáu tháng.', "Thank you. I've studied for six months."),
          r('아니에요. 일 년쯤 공부했어요.', 'Đâu có. Tôi học khoảng một năm rồi.', "Not really. I've studied for about a year."),
          r('아직 잘 못해요. 삼 개월 공부했어요.', 'Tôi vẫn chưa giỏi đâu. Tôi mới học ba tháng.', "I'm not good yet. I've studied for three months."),
        ],
      ),
      turn(
        '대단해요! 지금 학생이에요? 아니면 일해요?',
        'Giỏi quá! Bây giờ bạn là sinh viên hay đi làm?',
        'Impressive! Are you a student now, or do you work?',
        p(
          'Daedanhaeyo! Jigeum haksaengieyo? Animyeon ilhaeyo?',
          '[대단해요! 지금 학쌩이에요? 아니면 일해요?]',
          'Căng hóa (경음화): sau patchim ㄱ, ㅅ đọc thành [ㅆ]: 학생 → [학쌩].',
          'Tensification (경음화): after batchim ㄱ, ㅅ becomes [ㅆ]: 학생 → [학쌩].',
        ),
        [
          r('저는 대학생이에요.', 'Tôi là sinh viên đại học.', "I'm a university student."),
          r('저는 회사원이에요.', 'Tôi là nhân viên văn phòng.', "I'm an office worker."),
          r('저는 대학생이에요. 한국어를 전공해요.', 'Tôi là sinh viên. Tôi học chuyên ngành tiếng Hàn.', "I'm a university student. I major in Korean."),
        ],
      ),
      turn(
        '아, 그래요? 주말에는 보통 뭐 해요?',
        'À, vậy à? Cuối tuần bạn thường làm gì?',
        'Oh, really? What do you usually do on weekends?',
        p(
          'A, geuraeyo? Jumareneun botong mwo haeyo?',
          '[아, 그래요? 주마레는 보통 뭐 해요?]',
          'Nối âm (연음): 주말에는 → [주마레는].',
          'Liaison (연음): 주말에는 → [주마레는].',
        ),
        [
          r('친구를 만나요.', 'Tôi gặp bạn bè.', 'I meet my friends.'),
          r('집에서 쉬어요. 가끔 영화를 봐요.', 'Tôi nghỉ ở nhà. Thỉnh thoảng tôi xem phim.', 'I rest at home. Sometimes I watch movies.'),
          r('한국 드라마를 봐요. 그리고 요리를 해요.', 'Tôi xem phim truyền hình Hàn Quốc. Và tôi nấu ăn.', 'I watch Korean dramas. And I cook.'),
        ],
      ),
      turn(
        '좋네요. 우리 다음에 같이 커피 마셔요!',
        'Hay quá. Lần sau mình cùng đi uống cà phê nhé!',
        "Sounds nice. Let's have coffee together next time!",
        p(
          'Jonneyo. Uri daeume gachi keopi masyeoyo!',
          '[존네요. 우리 다으메 가치 커피 마셔요!]',
          'Patchim ㅎ trước ㄴ đọc thành [ㄴ] (비음화): 좋네요 → [존네요]; vòm hóa (구개음화): 같이 → [가치]; nối âm: 다음에 → [다으메].',
          'Batchim ㅎ before ㄴ is read [ㄴ] (nasalization 비음화): 좋네요 → [존네요]; palatalization (구개음화): 같이 → [가치]; liaison: 다음에 → [다으메].',
        ),
        [
          r('네, 좋아요!', 'Vâng, được đó!', 'Yes, sounds good!'),
          r('좋아요! 연락할게요.', 'Được đó! Tôi sẽ liên lạc nhé.', "Great! I'll get in touch."),
          r('네, 좋아요! 다음 주 어때요?', 'Vâng, hay quá! Tuần sau thì sao?', 'Yes, great! How about next week?'),
        ],
      ),
      turn(
        '좋아요! 그럼 나중에 연락할게요. 오늘 만나서 정말 반가웠어요.',
        'Được! Vậy lát nữa mình liên lạc nhé. Hôm nay gặp bạn thật sự rất vui.',
        "Great! I'll contact you later, then. It was really nice meeting you today.",
        p(
          'Joayo! Geureom najunge yeollakalgeyo. Oneul mannaseo jeongmal bangawosseoyo.',
          '[조아요! 그럼 나중에 열라칼께요. 오늘 만나서 정말 반가워써요.]',
          'Lược ㅎ: 좋아요 → [조아요]; lưu âm hóa (유음화): 연락 → [열락]; bật hơi hóa (격음화) ㄱ+ㅎ → [ㅋ]: 락할 → [라칼]; căng hóa: -ㄹ게요 → [ㄹ께요].',
          'ㅎ is silent: 좋아요 → [조아요]; lateralization (유음화): 연락 → [열락]; aspiration (격음화) ㄱ+ㅎ → [ㅋ]: 락할 → [라칼]; tensification: -ㄹ게요 → [ㄹ께요].',
        ),
        [
          r('저도 반가웠어요. 안녕히 가세요!', 'Tôi cũng rất vui. Tạm biệt anh!', 'It was nice meeting you too. Goodbye!'),
          r('네, 연락 주세요. 안녕히 가세요!', 'Vâng, nhớ liên lạc nhé. Tạm biệt!', 'Yes, please get in touch. Goodbye!'),
          r('감사합니다. 또 만나요!', 'Cảm ơn anh. Hẹn gặp lại!', 'Thank you. See you again!'),
        ],
      ),
    ],
    suggestions: [
      s('word', '안녕하세요', p('annyeonghaseyo'), ['xin chào', 'hello'], '안녕하세요! 저는 린이에요.', ['Xin chào! Tôi là Linh.', "Hello! I'm Linh."]),
      s('word', '이름', p('ireum'), ['tên', 'name'], '제 이름은 린이에요.', ['Tên tôi là Linh.', 'My name is Linh.']),
      s('word', '나라', p('nara'), ['đất nước', 'country'], '어느 나라 사람이에요?', ['Bạn là người nước nào?', 'Which country are you from?']),
      s('word', '학생', p('haksaeng', '[학쌩]', 'Căng hóa (경음화): sau patchim ㄱ, ㅅ → [ㅆ].', 'Tensification (경음화): after batchim ㄱ, ㅅ → [ㅆ].'), ['học sinh, sinh viên', 'student'], '저는 대학생이에요.', ['Tôi là sinh viên đại học.', "I'm a university student."]),
      s('word', '회사원', p('hoesawon'), ['nhân viên công ty', 'office worker'], '저는 회사원이에요.', ['Tôi là nhân viên công ty.', "I'm an office worker."]),
      s('word', '친구', p('chingu'), ['bạn, bạn bè', 'friend'], '한국 친구가 많아요?', ['Bạn có nhiều bạn người Hàn không?', 'Do you have many Korean friends?']),
      s('phrase', '만나서 반가워요', p('mannaseo bangawoyo'), ['rất vui được gặp bạn', 'nice to meet you'], '저는 린이에요. 만나서 반가워요.', ['Tôi là Linh. Rất vui được gặp bạn.', "I'm Linh. Nice to meet you."]),
      s('phrase', '처음 뵙겠습니다', p('cheoeum boepgetseumnida', '[처음 뵙껟씀니다]', 'Căng hóa (경음화): 뵙겠 → [뵙껟], 겠습 → [겓씀]; mũi hóa (비음화): ㅂ+ㄴ → [ㅁㄴ]: 습니다 → [씀니다].', 'Tensification (경음화): 뵙겠 → [뵙껟], 겠습 → [겓씀]; nasalization (비음화): ㅂ+ㄴ → [ㅁㄴ]: 습니다 → [씀니다].'), ['hân hạnh được gặp (lần đầu, trang trọng)', 'how do you do (first meeting, formal)'], '처음 뵙겠습니다. 저는 응우옌 린입니다.', ['Hân hạnh được gặp anh. Tôi là Nguyễn Linh.', 'How do you do? I am Nguyen Linh.']),
      s('phrase', '이름이 뭐예요?', p('ireumi mwoyeyo?', '[이르미 뭐예요?]', 'Nối âm (연음): 이름이 → [이르미].', 'Liaison (연음): 이름이 → [이르미].'), ['bạn tên là gì?', "what's your name?"], '안녕하세요! 이름이 뭐예요?', ['Xin chào! Bạn tên là gì?', "Hello! What's your name?"]),
      s('phrase', '어느 나라 사람이에요?', p('eoneu nara saramieyo?', '[어느 나라 사라미에요?]', 'Nối âm (연음): 사람이에요 → [사라미에요].', 'Liaison (연음): 사람이에요 → [사라미에요].'), ['bạn là người nước nào?', 'which country are you from?'], '린 씨는 어느 나라 사람이에요?', ['Linh là người nước nào?', 'Which country are you from, Linh?']),
      s('phrase', '안녕히 가세요', p('annyeonghi gaseyo'), ['tạm biệt (nói với người ra về)', 'goodbye (said to someone who is leaving)'], '오늘 즐거웠어요. 안녕히 가세요!', ['Hôm nay vui lắm. Tạm biệt!', 'I had a great time today. Goodbye!']),
      s('sentence', '저는 베트남 사람이에요.', p('Jeoneun beteunam saramieyo.', '[저는 베트남 사라미에요.]', 'Nối âm (연음): 사람이에요 → [사라미에요].', 'Liaison (연음): 사람이에요 → [사라미에요].'), ['Tôi là người Việt Nam.', "I'm Vietnamese."], '저는 베트남 사람이에요. 하노이에서 왔어요.', ['Tôi là người Việt Nam. Tôi đến từ Hà Nội.', "I'm Vietnamese. I'm from Hanoi."]),
      s('sentence', '한국어를 공부하고 있어요.', p('Hangugeoreul gongbuhago isseoyo.', '[한구거를 공부하고 이써요.]', 'Nối âm (연음): 한국어를 → [한구거를], 있어요 → [이써요].', 'Liaison (연음): 한국어를 → [한구거를], 있어요 → [이써요].'), ['Tôi đang học tiếng Hàn.', "I'm studying Korean."], '요즘 대학교에서 한국어를 공부하고 있어요.', ['Dạo này tôi đang học tiếng Hàn ở trường đại học.', "These days I'm studying Korean at university."]),
      s('sentence', '다음에 또 만나요.', p('Daeume tto mannayo.', '[다으메 또 만나요.]', 'Nối âm (연음): 다음에 → [다으메].', 'Liaison (연음): 다음에 → [다으메].'), ['Hẹn gặp lại lần sau.', "Let's meet again next time."], '오늘 반가웠어요. 다음에 또 만나요!', ['Hôm nay rất vui được gặp bạn. Hẹn gặp lại nhé!', 'It was nice meeting you today. See you again!']),
      s('sentence', '잘 부탁드립니다.', p('Jal butakdeurimnida.', '[잘 부탁뜨림니다.]', 'Căng hóa (경음화): sau patchim ㄱ, ㄷ → [ㄸ]: 부탁드 → [부탁뜨]; mũi hóa (비음화): 립니다 → [림니다].', 'Tensification (경음화): after batchim ㄱ, ㄷ → [ㄸ]: 부탁드 → [부탁뜨]; nasalization (비음화): 립니다 → [림니다].'), ['Mong được giúp đỡ (lời chào lịch sự khi mới quen).', 'I look forward to getting along with you (polite set phrase when meeting).'], '처음 뵙겠습니다. 앞으로 잘 부탁드립니다.', ['Hân hạnh được gặp anh. Từ nay mong anh giúp đỡ.', 'How do you do? I look forward to working with you.']),
    ],
  },

  // ───────────────────────────── daily ─────────────────────────────
  {
    id: 'ko-daily',
    lang: 'ko',
    scenario: 'daily',
    level: 'beginner',
    intro: {
      scenario: {
        vi: 'Buổi tối bạn về đến nhà. Người bạn cùng phòng người Hàn hỏi han về một ngày của bạn.',
        en: 'You come home in the evening. Your Korean roommate asks how your day went.',
        zh: '晚上你回到家，你的韩国室友问你今天过得怎么样。',
      },
      role: {
        vi: 'Bạn là người ở chung phòng. Hãy kể về một ngày của bạn: mấy giờ dậy, ăn gì, làm gì buổi trưa và buổi tối, mấy giờ đi ngủ.',
        en: 'You are the roommate. Talk about your day: when you got up, what you ate, what you did at lunch and in the evening, and when you go to bed.',
        zh: '你是室友。请聊聊你的一天：几点起床、吃了什么、中午和晚上做什么、几点睡觉。',
      },
    },
    turns: [
      turn(
        '왔어요? 오늘 하루 어땠어요?',
        'Về rồi à? Hôm nay của bạn thế nào?',
        "You're back? How was your day?",
        p(
          'Wasseoyo? Oneul haru eottaesseoyo?',
          '[와써요? 오늘 하루 어때써요?]',
          'Nối âm (연음): patchim ㅆ chuyển sang âm tiết sau: 왔어요 → [와써요], 어땠어요 → [어때써요].',
          'Liaison (연음): the batchim ㅆ moves to the next syllable: 왔어요 → [와써요], 어땠어요 → [어때써요].',
        ),
        [
          r('좀 피곤했어요.', 'Hơi mệt.', 'I was a bit tired.'),
          r('좋았어요! 오늘 수업이 재미있었어요.', 'Tốt lắm! Hôm nay buổi học rất thú vị.', 'It was good! Class was fun today.'),
          r('바빴어요. 일이 많았어요.', 'Bận lắm. Nhiều việc quá.', 'It was busy. I had a lot of work.'),
        ],
      ),
      turn(
        '그래요? 오늘 몇 시에 일어났어요?',
        'Vậy à? Hôm nay bạn dậy lúc mấy giờ?',
        'Really? What time did you get up today?',
        p(
          'Geuraeyo? Oneul myeot sie ireonasseoyo?',
          '[그래요? 오늘 멷 씨에 이러나써요?]',
          'Patchim ㅊ của 몇 đọc [ㄷ], rồi 시 bị căng hóa (경음화) → [멷 씨]; nối âm: 일어났어요 → [이러나써요].',
          'The batchim ㅊ of 몇 is read [ㄷ], then 시 is tensified (경음화) → [멷 씨]; liaison: 일어났어요 → [이러나써요].',
        ),
        [
          r('일곱 시에 일어났어요.', 'Tôi dậy lúc bảy giờ.', 'I got up at seven.'),
          r('여섯 시 반에 일어났어요. 너무 일찍 일어났어요.', 'Tôi dậy lúc sáu rưỡi. Dậy sớm quá.', 'I got up at six thirty. Way too early.'),
          r('늦게 일어났어요. 아홉 시에 일어났어요.', 'Tôi dậy muộn. Chín giờ mới dậy.', 'I got up late. I got up at nine.'),
        ],
      ),
      turn(
        '아침은 먹었어요?',
        'Bạn đã ăn sáng chưa?',
        'Did you have breakfast?',
        p(
          'Achimeun meogeosseoyo?',
          '[아치믄 머거써요?]',
          'Nối âm (연음): 아침은 → [아치믄], 먹었어요 → [머거써요].',
          'Liaison (연음): 아침은 → [아치믄], 먹었어요 → [머거써요].',
        ),
        [
          r('네, 빵하고 우유를 먹었어요.', 'Rồi, tôi ăn bánh mì với sữa.', 'Yes, I had bread and milk.'),
          r('아니요, 시간이 없어서 못 먹었어요.', 'Chưa, không có thời gian nên tôi không ăn được.', "No, I didn't have time, so I couldn't eat."),
          r('네, 집에서 밥을 먹었어요.', 'Rồi, tôi ăn cơm ở nhà.', 'Yes, I ate at home.'),
        ],
      ),
      turn(
        '저는 오늘 회사에서 회의가 많았어요. 점심에는 뭐 했어요?',
        'Hôm nay tôi có nhiều cuộc họp ở công ty. Buổi trưa bạn đã làm gì?',
        'I had lots of meetings at work today. What did you do at lunchtime?',
        p(
          'Jeoneun oneul hoesaeseo hoeuiga manasseoyo. Jeomsimeneun mwo haesseoyo?',
          '[저는 오늘 회사에서 회의가 마나써요. 점시메는 뭐 해써요?]',
          'Lược ㅎ (ㅎ 탈락): 많았어요 → [마나써요]; nối âm: 점심에는 → [점시메는], 했어요 → [해써요]. 회의 cũng hay đọc [회이].',
          'ㅎ is silent (ㅎ 탈락): 많았어요 → [마나써요]; liaison: 점심에는 → [점시메는], 했어요 → [해써요]. 회의 is also often said [회이].',
        ),
        [
          r('친구하고 같이 밥을 먹었어요.', 'Tôi ăn trưa cùng bạn.', 'I had lunch with a friend.'),
          r('도서관에서 공부했어요.', 'Tôi học ở thư viện.', 'I studied at the library.'),
          r('학교 식당에서 김밥을 먹었어요.', 'Tôi ăn kimbap ở căng tin trường.', 'I had kimbap at the school cafeteria.'),
        ],
      ),
      turn(
        '저녁에는 보통 뭐 해요?',
        'Buổi tối bạn thường làm gì?',
        'What do you usually do in the evening?',
        p(
          'Jeonyeogeneun botong mwo haeyo?',
          '[저녀게는 보통 뭐 해요?]',
          'Nối âm (연음): 저녁에는 → [저녀게는].',
          'Liaison (연음): 저녁에는 → [저녀게는].',
        ),
        [
          r('운동을 해요.', 'Tôi tập thể dục.', 'I work out.'),
          r('집에서 요리하고 텔레비전을 봐요.', 'Tôi nấu ăn ở nhà rồi xem ti vi.', 'I cook at home and watch TV.'),
          r('한국어 숙제를 해요.', 'Tôi làm bài tập tiếng Hàn.', 'I do my Korean homework.'),
        ],
      ),
      turn(
        '부지런하네요! 오늘은 몇 시에 자요?',
        'Chăm chỉ ghê! Hôm nay mấy giờ bạn ngủ?',
        'How diligent! What time are you going to bed tonight?',
        p(
          'Bujireonhaneyo! Oneureun myeot sie jayo?',
          '[부지런하네요! 오느른 멷 씨에 자요?]',
          'Nối âm (연음): 오늘은 → [오느른]; 몇 시 → [멷 씨] (căng hóa 경음화).',
          'Liaison (연음): 오늘은 → [오느른]; 몇 시 → [멷 씨] (tensification 경음화).',
        ),
        [
          r('열한 시쯤 자요.', 'Khoảng mười một giờ tôi ngủ.', 'I go to bed around eleven.'),
          r('열두 시에 자요. 내일 일찍 일어나야 해요.', 'Mười hai giờ tôi ngủ. Mai tôi phải dậy sớm.', 'I go to bed at twelve. I have to get up early tomorrow.'),
          r('피곤해서 일찍 잘 거예요.', 'Mệt nên tôi sẽ ngủ sớm.', "I'm tired, so I'll go to bed early."),
        ],
      ),
      turn(
        '그래요. 오늘 수고 많았어요. 잘 자요!',
        'Ừ. Hôm nay bạn vất vả rồi. Ngủ ngon nhé!',
        'Okay. You worked hard today. Sleep well!',
        p(
          'Geuraeyo. Oneul sugo manasseoyo. Jal jayo!',
          '[그래요. 오늘 수고 마나써요. 잘 자요!]',
          'Lược ㅎ (ㅎ 탈락) và nối âm: 많았어요 → [마나써요].',
          'ㅎ is silent (ㅎ 탈락) plus liaison: 많았어요 → [마나써요].',
        ),
        [
          r('고마워요. 잘 자요!', 'Cảm ơn nhé. Ngủ ngon!', 'Thanks. Sleep well!'),
          r('네, 내일 봐요!', 'Ừ, mai gặp nhé!', 'Yes, see you tomorrow!'),
          r('고마워요. 안녕히 주무세요.', 'Cảm ơn. Chúc ngủ ngon.', 'Thank you. Good night.'),
        ],
      ),
    ],
    suggestions: [
      s('word', '일어나다', p('ireonada', '[이러나다]', 'Nối âm (연음): 일어 → [이러].', 'Liaison (연음): 일어 → [이러].'), ['thức dậy', 'to get up, to wake up'], '저는 매일 일곱 시에 일어나요.', ['Ngày nào tôi cũng dậy lúc bảy giờ.', 'I get up at seven every day.']),
      s('word', '아침', p('achim'), ['buổi sáng; bữa sáng', 'morning; breakfast'], '아침을 먹었어요?', ['Bạn ăn sáng chưa?', 'Did you have breakfast?']),
      s('word', '점심', p('jeomsim'), ['buổi trưa; bữa trưa', 'noon; lunch'], '점심에 김밥을 먹었어요.', ['Buổi trưa tôi ăn kimbap.', 'I had kimbap for lunch.']),
      s('word', '저녁', p('jeonyeok'), ['buổi tối; bữa tối', 'evening; dinner'], '저녁에 운동을 해요.', ['Buổi tối tôi tập thể dục.', 'I work out in the evening.']),
      s('word', '피곤하다', p('pigonhada'), ['mệt', 'to be tired'], '오늘은 정말 피곤해요.', ['Hôm nay tôi mệt thật.', "I'm really tired today."]),
      s('word', '보통', p('botong'), ['thường, thông thường', 'usually'], '주말에는 보통 집에서 쉬어요.', ['Cuối tuần tôi thường nghỉ ở nhà.', 'I usually rest at home on weekends.']),
      s('phrase', '몇 시에', p('myeot sie', '[멷 씨에]', 'Patchim ㅊ đọc [ㄷ], 시 căng hóa (경음화) → [씨].', 'The batchim ㅊ is read [ㄷ] and 시 is tensified (경음화) → [씨].'), ['lúc mấy giờ', 'at what time'], '몇 시에 일어났어요?', ['Bạn dậy lúc mấy giờ?', 'What time did you get up?']),
      s('phrase', '오늘 하루 어땠어요?', p('oneul haru eottaesseoyo?', '[오늘 하루 어때써요?]', 'Nối âm (연음): 어땠어요 → [어때써요].', 'Liaison (연음): 어땠어요 → [어때써요].'), ['hôm nay của bạn thế nào?', 'how was your day?'], '오늘 하루 어땠어요? 많이 바빴어요?', ['Hôm nay thế nào? Bận lắm không?', 'How was your day? Were you very busy?']),
      s('phrase', '아침을 먹다', p('achimeul meokda', '[아치믈 먹따]', 'Nối âm: 아침을 → [아치믈]; căng hóa (경음화): 먹다 → [먹따].', 'Liaison: 아침을 → [아치믈]; tensification (경음화): 먹다 → [먹따].'), ['ăn sáng', 'to have breakfast'], '오늘은 늦게 일어나서 아침을 못 먹었어요.', ['Hôm nay tôi dậy muộn nên không ăn sáng được.', "I got up late today, so I couldn't have breakfast."]),
      s('phrase', '수고했어요', p('sugohaesseoyo', '[수고해써요]', 'Nối âm (연음): 했어요 → [해써요].', 'Liaison (연음): 했어요 → [해써요].'), ['bạn vất vả rồi (khen ai đã làm việc chăm chỉ)', 'you worked hard / good job'], '오늘 하루 수고했어요!', ['Hôm nay bạn vất vả rồi!', 'You worked hard today!']),
      s('phrase', '잘 자요', p('jal jayo'), ['ngủ ngon', 'sleep well, good night'], '내일 봐요. 잘 자요!', ['Mai gặp nhé. Ngủ ngon!', 'See you tomorrow. Sleep well!']),
      s('sentence', '저는 보통 일곱 시에 일어나요.', p('Jeoneun botong ilgop sie ireonayo.', '[저는 보통 일곱 씨에 이러나요.]', 'Căng hóa (경음화): sau patchim ㅂ, 시 → [씨]; nối âm: 일어나요 → [이러나요].', 'Tensification (경음화): after batchim ㅂ, 시 → [씨]; liaison: 일어나요 → [이러나요].'), ['Tôi thường dậy lúc bảy giờ.', 'I usually get up at seven.'], '저는 보통 일곱 시에 일어나요. 그리고 샤워를 해요.', ['Tôi thường dậy lúc bảy giờ. Rồi tôi đi tắm.', 'I usually get up at seven. Then I take a shower.']),
      s('sentence', '오늘은 좀 피곤해요.', p('Oneureun jom pigonhaeyo.', '[오느른 좀 피곤해요.]', 'Nối âm (연음): 오늘은 → [오느른].', 'Liaison (연음): 오늘은 → [오느른].'), ['Hôm nay tôi hơi mệt.', "I'm a bit tired today."], '오늘은 좀 피곤해요. 일이 많았어요.', ['Hôm nay tôi hơi mệt. Nhiều việc quá.', "I'm a bit tired today. I had a lot of work."]),
      s('sentence', '저녁에 운동을 해요.', p('Jeonyeoge undongeul haeyo.', '[저녀게 운동을 해요.]', 'Nối âm (연음): 저녁에 → [저녀게].', 'Liaison (연음): 저녁에 → [저녀게].'), ['Buổi tối tôi tập thể dục.', 'I work out in the evening.'], '저녁에 운동을 해요. 보통 한 시간쯤 해요.', ['Buổi tối tôi tập thể dục. Thường tập khoảng một tiếng.', 'I work out in the evening, usually for about an hour.']),
      s('sentence', '주말에 친구를 만나요.', p('Jumare chingureul mannayo.', '[주마레 친구를 만나요.]', 'Nối âm (연음): 주말에 → [주마레].', 'Liaison (연음): 주말에 → [주마레].'), ['Cuối tuần tôi gặp bạn bè.', 'I meet friends on the weekend.'], '주말에 친구를 만나요. 같이 영화를 봐요.', ['Cuối tuần tôi gặp bạn. Chúng tôi cùng xem phim.', 'I meet a friend on the weekend. We watch a movie together.']),
    ],
  },

  // ───────────────────────────── shopping ─────────────────────────────
  {
    id: 'ko-shopping',
    lang: 'ko',
    scenario: 'shopping',
    level: 'beginner',
    intro: {
      scenario: {
        vi: 'Bạn vào một cửa hàng quần áo ở Myeongdong để mua một chiếc áo phông.',
        en: 'You walk into a clothing shop in Myeongdong to buy a T-shirt.',
        zh: '你走进明洞的一家服装店，想买一件T恤。',
      },
      role: {
        vi: 'Bạn là khách hàng. Hãy hỏi giá, hỏi màu và cỡ, mặc thử, rồi chọn cách thanh toán và mua áo.',
        en: 'You are the customer. Ask the price, colours and sizes, try it on, then choose how to pay and buy it.',
        zh: '你是顾客。请询问价格、颜色和尺码，试穿，然后选择付款方式并买下。',
      },
    },
    turns: [
      turn(
        '어서 오세요! 뭐 찾으세요?',
        'Xin mời vào! Quý khách tìm gì ạ?',
        'Welcome! What are you looking for?',
        p(
          'Eoseo oseyo! Mwo chajeuseyo?',
          '[어서 오세요! 뭐 차즈세요?]',
          'Nối âm (연음): 찾으세요 → [차즈세요].',
          'Liaison (연음): 찾으세요 → [차즈세요].',
        ),
        [
          r('티셔츠를 찾아요.', 'Tôi tìm áo phông.', "I'm looking for a T-shirt."),
          r('그냥 좀 볼게요.', 'Tôi xem qua một chút thôi.', "I'm just looking."),
          r('여름에 입을 티셔츠 있어요?', 'Có áo phông mặc mùa hè không ạ?', 'Do you have T-shirts for summer?'),
        ],
      ),
      turn(
        '네, 천천히 보세요. 이 티셔츠는 어떠세요? 요즘 인기가 많아요.',
        'Vâng, quý khách cứ xem thong thả. Chiếc áo phông này thì sao ạ? Dạo này bán chạy lắm.',
        'Sure, take your time. How about this T-shirt? It is very popular these days.',
        p(
          'Ne, cheoncheonhi boseyo. I tisyeocheuneun eotteoseyo? Yojeum ingiga manayo.',
          '[네, 천천히 보세요. 이 티셔츠는 어떠세요? 요즘 인끼가 마나요.]',
          'Căng hóa (경음화): 인기 → [인끼]; lược ㅎ: 많아요 → [마나요].',
          'Tensification (경음화): 인기 → [인끼]; ㅎ is silent: 많아요 → [마나요].',
        ),
        [
          r('예뻐요! 얼마예요?', 'Đẹp quá! Bao nhiêu tiền ạ?', "It's pretty! How much is it?"),
          r('색이 예쁘네요. 이거 얼마예요?', 'Màu đẹp quá. Cái này bao nhiêu ạ?', 'Nice colour. How much is this?'),
          r('좋아요. 이거 얼마예요?', 'Được đấy. Cái này bao nhiêu ạ?', 'I like it. How much is this?'),
        ],
      ),
      turn(
        '원래 이만 오천 원인데, 지금 세일해서 이만 원이에요.',
        'Giá gốc là 25.000 won, nhưng bây giờ đang giảm giá nên còn 20.000 won ạ.',
        "It's normally 25,000 won, but it's on sale now, so it's 20,000 won.",
        p(
          'Wollae iman ocheon woninde, jigeum seilhaeseo iman wonieyo.',
          '[월래 이만 오천 워닌데, 지금 세일해서 이만 워니에요.]',
          'Lưu âm hóa (유음화): ㄴ+ㄹ → [ㄹㄹ]: 원래 → [월래]; nối âm: 원인데 → [워닌데], 원이에요 → [워니에요].',
          'Lateralization (유음화): ㄴ+ㄹ → [ㄹㄹ]: 원래 → [월래]; liaison: 원인데 → [워닌데], 원이에요 → [워니에요].',
        ),
        [
          r('다른 색도 있어요?', 'Có màu khác không ạ?', 'Do you have other colours?'),
          r('입어 봐도 돼요?', 'Tôi mặc thử được không ạ?', 'Can I try it on?'),
          r('예쁘네요. 다른 색도 보여 주세요.', 'Đẹp quá. Cho tôi xem cả màu khác nữa.', "It's pretty. Please show me other colours too."),
        ],
      ),
      turn(
        '네, 물론이죠. 검은색하고 흰색도 있어요. 사이즈는 뭐 입으세요?',
        'Vâng, tất nhiên rồi. Còn có màu đen và màu trắng nữa. Quý khách mặc cỡ nào ạ?',
        'Yes, of course. We also have black and white. What size do you wear?',
        p(
          'Ne, mullonijyo. Geomeunsaekago huinsaekdo isseoyo. Saijeuneun mwo ibeuseyo?',
          '[네, 물로니죠. 거믄새카고 힌색또 이써요. 사이즈는 뭐 이브세요?]',
          'Nối âm: 물론이죠 → [물로니죠], 검은 → [거믄], 입으세요 → [이브세요]; bật hơi hóa (격음화) ㄱ+ㅎ → [ㅋ]: 색하고 → [새카고]; 흰 đọc [힌]; căng hóa: 색도 → [색또].',
          'Liaison: 물론이죠 → [물로니죠], 검은 → [거믄], 입으세요 → [이브세요]; aspiration (격음화) ㄱ+ㅎ → [ㅋ]: 색하고 → [새카고]; 흰 is read [힌]; tensification: 색도 → [색또].',
        ),
        [
          r('M 사이즈 주세요.', 'Cho tôi cỡ M.', 'Size M, please.'),
          r('보통 L 사이즈 입어요. 검은색으로 주세요.', 'Tôi thường mặc cỡ L. Cho tôi màu đen.', 'I usually wear L. The black one, please.'),
          r('흰색 M 사이즈 있어요?', 'Có màu trắng cỡ M không ạ?', 'Do you have it in white, size M?'),
        ],
      ),
      turn(
        '여기 있어요. 탈의실은 저쪽이에요.',
        'Đây ạ. Phòng thử đồ ở đằng kia.',
        'Here you are. The fitting room is over there.',
        p(
          'Yeogi isseoyo. Taruisireun jeojjogieyo.',
          '[여기 이써요. 타리시른 저쪼기에요.]',
          'Nối âm (연음): 있어요 → [이써요], 탈의실은 → [타리시른], 저쪽이에요 → [저쪼기에요]; 의 trong 탈의실 thường đọc [이].',
          'Liaison (연음): 있어요 → [이써요], 탈의실은 → [타리시른], 저쪽이에요 → [저쪼기에요]; 의 in 탈의실 is usually read [이].',
        ),
        [
          r('감사합니다.', 'Cảm ơn ạ.', 'Thank you.'),
          r('네, 입어 볼게요.', 'Vâng, tôi mặc thử nhé.', "Okay, I'll try it on."),
          r('감사합니다. 금방 나올게요.', 'Cảm ơn ạ. Tôi ra ngay.', "Thank you. I'll be right out."),
        ],
      ),
      turn(
        '어떠세요? 잘 맞으세요?',
        'Thế nào ạ? Có vừa không ạ?',
        'How is it? Does it fit well?',
        p(
          'Eotteoseyo? Jal majeuseyo?',
          '[어떠세요? 잘 마즈세요?]',
          'Nối âm (연음): 맞으세요 → [마즈세요].',
          'Liaison (연음): 맞으세요 → [마즈세요].',
        ),
        [
          r('딱 맞아요. 이걸로 할게요.', 'Vừa khít. Tôi lấy cái này.', "It fits perfectly. I'll take this one."),
          r('좋아요. 이거 살게요.', 'Được ạ. Tôi mua cái này.', "It's good. I'll buy it."),
          r('네, 예뻐요. 이걸로 주세요.', 'Vâng, đẹp lắm. Cho tôi cái này.', "Yes, it's pretty. I'll take this one, please."),
        ],
      ),
      turn(
        '감사합니다. 카드로 하시겠어요, 현금으로 하시겠어요?',
        'Cảm ơn quý khách. Quý khách thanh toán bằng thẻ hay tiền mặt ạ?',
        'Thank you. Will you pay by card or in cash?',
        p(
          'Gamsahamnida. Kadeuro hasigesseoyo, hyeongeumeuro hasigesseoyo?',
          '[감사함니다. 카드로 하시게써요, 현그므로 하시게써요?]',
          'Mũi hóa (비음화): 합니다 → [함니다]; nối âm: 하시겠어요 → [하시게써요], 현금으로 → [현그므로].',
          'Nasalization (비음화): 합니다 → [함니다]; liaison: 하시겠어요 → [하시게써요], 현금으로 → [현그므로].',
        ),
        [
          r('카드로 할게요.', 'Tôi trả bằng thẻ.', "I'll pay by card."),
          r('현금으로 할게요.', 'Tôi trả tiền mặt.', "I'll pay in cash."),
          r('카드로 할게요. 봉투도 하나 주세요.', 'Tôi trả bằng thẻ. Cho tôi thêm một cái túi nhé.', "I'll pay by card. And a bag, please."),
        ],
      ),
      turn(
        '네, 여기 영수증이에요. 감사합니다. 또 오세요!',
        'Vâng, hóa đơn của quý khách đây ạ. Cảm ơn quý khách. Hẹn gặp lại!',
        'Here is your receipt. Thank you. Please come again!',
        p(
          'Ne, yeogi yeongsujeungieyo. Gamsahamnida. Tto oseyo!',
          '[네, 여기 영수증이에요. 감사함니다. 또 오세요!]',
          'Mũi hóa (비음화): 합니다 → [함니다].',
          'Nasalization (비음화): 합니다 → [함니다].',
        ),
        [
          r('감사합니다. 안녕히 계세요!', 'Cảm ơn ạ. Chào chị!', 'Thank you. Goodbye!'),
          r('네, 수고하세요!', 'Vâng, chị làm việc vui vẻ nhé!', 'Okay, have a good day at work!'),
        ],
      ),
    ],
    suggestions: [
      s('word', '얼마', p('eolma'), ['bao nhiêu (tiền)', 'how much'], '이 가방은 얼마예요?', ['Cái túi này bao nhiêu tiền?', 'How much is this bag?']),
      s('word', '색', p('saek'), ['màu', 'colour'], '다른 색도 있어요?', ['Có màu khác không?', 'Do you have other colours?']),
      s('word', '사이즈', p('saijeu'), ['cỡ, size', 'size'], '사이즈가 좀 커요.', ['Cỡ này hơi rộng.', 'The size is a bit big.']),
      s('word', '입다', p('ipda', '[입따]', 'Căng hóa (경음화): sau patchim ㅂ, ㄷ → [ㄸ].', 'Tensification (경음화): after batchim ㅂ, ㄷ → [ㄸ].'), ['mặc (quần áo)', 'to wear, to put on (clothes)'], '이거 입어 봐도 돼요?', ['Tôi mặc thử cái này được không?', 'Can I try this on?']),
      s('word', '비싸다', p('bissada'), ['đắt', 'to be expensive'], '이 코트는 좀 비싸요.', ['Cái áo khoác này hơi đắt.', 'This coat is a bit expensive.']),
      s('word', '영수증', p('yeongsujeung'), ['hóa đơn', 'receipt'], '영수증 주세요.', ['Cho tôi hóa đơn.', 'The receipt, please.']),
      s('phrase', '이거 얼마예요?', p('igeo eolmayeyo?'), ['cái này bao nhiêu tiền?', 'how much is this?'], '저기요, 이거 얼마예요?', ['Chị ơi, cái này bao nhiêu tiền?', 'Excuse me, how much is this?']),
      s('phrase', '입어 봐도 돼요?', p('ibeo bwado dwaeyo?', '[이버 봐도 돼요?]', 'Nối âm (연음): 입어 → [이버].', 'Liaison (연음): 입어 → [이버].'), ['tôi mặc thử được không?', 'can I try it on?'], '이 바지 입어 봐도 돼요?', ['Tôi mặc thử cái quần này được không?', 'Can I try on these trousers?']),
      s('phrase', '다른 색도 있어요?', p('dareun saekdo isseoyo?', '[다른 색또 이써요?]', 'Căng hóa (경음화): 색도 → [색또]; nối âm: 있어요 → [이써요].', 'Tensification (경음화): 색도 → [색또]; liaison: 있어요 → [이써요].'), ['có màu khác không?', 'do you have other colours?'], '예쁘네요. 다른 색도 있어요?', ['Đẹp quá. Có màu khác không?', 'It is pretty. Do you have other colours?']),
      s('phrase', '깎아 주세요', p('kkakka juseyo', '[까까 주세요]', 'Nối âm (연음): patchim ㄲ chuyển sang âm tiết sau: 깎아 → [까까].', 'Liaison (연음): the batchim ㄲ moves to the next syllable: 깎아 → [까까].'), ['bớt cho tôi đi (mặc cả, thường ở chợ)', 'please give me a discount (bargaining, mostly at markets)'], '좀 비싸요. 조금만 깎아 주세요.', ['Hơi đắt. Bớt cho tôi một chút đi.', "It's a bit expensive. Please knock a little off."]),
      s('phrase', '이걸로 할게요', p('igeollo halgeyo', '[이걸로 할께요]', 'Căng hóa (경음화): -ㄹ게요 → [ㄹ께요].', 'Tensification (경음화): -ㄹ게요 → [ㄹ께요].'), ['tôi lấy cái này', "I'll take this one"], '흰색이 예쁘네요. 이걸로 할게요.', ['Màu trắng đẹp quá. Tôi lấy cái này.', "The white one is pretty. I'll take this one."]),
      s('sentence', '좀 더 싼 거 있어요?', p('Jom deo ssan geo isseoyo?', '[좀 더 싼 거 이써요?]', 'Nối âm (연음): 있어요 → [이써요].', 'Liaison (연음): 있어요 → [이써요].'), ['Có cái nào rẻ hơn không?', 'Do you have anything cheaper?'], '이건 좀 비싸네요. 좀 더 싼 거 있어요?', ['Cái này hơi đắt. Có cái nào rẻ hơn không?', "This one's a bit pricey. Do you have anything cheaper?"]),
      s('sentence', '한 사이즈 큰 거 있어요?', p('Han saijeu keun geo isseoyo?', '[한 사이즈 큰 거 이써요?]', 'Nối âm (연음): 있어요 → [이써요].', 'Liaison (연음): 있어요 → [이써요].'), ['Có cỡ lớn hơn một số không?', 'Do you have it one size up?'], '조금 작아요. 한 사이즈 큰 거 있어요?', ['Hơi chật. Có cỡ lớn hơn một số không?', "It's a little small. Do you have it one size up?"]),
      s('sentence', '카드로 계산할게요.', p('Kadeuro gyesanhalgeyo.', '[카드로 계산할께요.]', 'Căng hóa (경음화): -ㄹ게요 → [ㄹ께요]. 계 trong 계산 cũng hay được đọc [게].', 'Tensification (경음화): -ㄹ게요 → [ㄹ께요]. 계 in 계산 is also often said [게].'), ['Tôi thanh toán bằng thẻ.', "I'll pay by card."], '이걸로 할게요. 카드로 계산할게요.', ['Tôi lấy cái này. Tôi thanh toán bằng thẻ.', "I'll take this one. I'll pay by card."]),
      s('sentence', '그냥 구경하고 있어요.', p('Geunyang gugyeonghago isseoyo.', '[그냥 구경하고 이써요.]', 'Nối âm (연음): 있어요 → [이써요].', 'Liaison (연음): 있어요 → [이써요].'), ['Tôi chỉ xem thôi.', "I'm just looking."], '괜찮아요. 그냥 구경하고 있어요.', ['Không sao ạ. Tôi chỉ xem thôi.', "It's okay. I'm just looking."]),
    ],
  },

  // ───────────────────────────── food ─────────────────────────────
  {
    id: 'ko-food',
    lang: 'ko',
    scenario: 'food',
    level: 'beginner',
    intro: {
      scenario: {
        vi: 'Bạn vào một quán ăn Hàn Quốc vào giờ trưa. Nhân viên đón bạn, đưa thực đơn và nhận món.',
        en: 'You go into a Korean restaurant at lunchtime. A server greets you, brings the menu and takes your order.',
        zh: '午饭时间你走进一家韩国餐厅。服务员接待你、给你菜单并为你点菜。',
      },
      role: {
        vi: 'Bạn là khách. Hãy nói số người, gọi món ăn và đồ uống, cho biết bạn ăn cay được không, rồi khen món ăn và thanh toán.',
        en: 'You are the customer. Say how many people you are, order food and a drink, say whether you can eat spicy food, then compliment the meal and pay.',
        zh: '你是客人。请说明人数，点菜和饮料，说你能不能吃辣，然后称赞饭菜并结账。',
      },
    },
    turns: [
      turn(
        '어서 오세요! 몇 분이세요?',
        'Xin mời vào! Quý khách đi mấy người ạ?',
        'Welcome! How many people?',
        p(
          'Eoseo oseyo! Myeot buniseyo?',
          '[어서 오세요! 멷 뿌니세요?]',
          'Patchim ㅊ của 몇 đọc [ㄷ], ㅂ sau nó bị căng hóa (경음화) → [ㅃ]; nối âm: 분이세요 → [뿌니세요].',
          'The batchim ㅊ of 몇 is read [ㄷ] and the following ㅂ is tensified (경음화) → [ㅃ]; liaison: 분이세요 → [뿌니세요].',
        ),
        [
          r('한 명이에요.', 'Một người ạ.', 'Just one.'),
          r('두 명이에요.', 'Hai người ạ.', 'Two people.'),
          r('혼자예요.', 'Tôi đi một mình.', "I'm alone."),
        ],
      ),
      turn(
        '이쪽으로 앉으세요. 여기 메뉴판이에요.',
        'Mời ngồi bên này ạ. Thực đơn đây ạ.',
        'Please sit over here. Here is the menu.',
        p(
          'Ijjogeuro anjeuseyo. Yeogi menyupanieyo.',
          '[이쪼그로 안즈세요. 여기 메뉴파니에요.]',
          'Nối âm (연음): 이쪽으로 → [이쪼그로], 메뉴판이에요 → [메뉴파니에요]; patchim kép ㄵ trước nguyên âm: ㄴ ở lại, ㅈ chuyển sang: 앉으세요 → [안즈세요].',
          'Liaison (연음): 이쪽으로 → [이쪼그로], 메뉴판이에요 → [메뉴파니에요]; double batchim ㄵ before a vowel: ㄴ stays, ㅈ moves over: 앉으세요 → [안즈세요].',
        ),
        [
          r('감사합니다.', 'Cảm ơn ạ.', 'Thank you.'),
          r('네, 고마워요.', 'Vâng, cảm ơn.', 'Okay, thanks.'),
          r('감사합니다. 물 좀 주세요.', 'Cảm ơn ạ. Cho tôi xin ít nước.', 'Thank you. Some water, please.'),
        ],
      ),
      turn(
        '주문하시겠어요?',
        'Quý khách gọi món chưa ạ?',
        'Are you ready to order?',
        p(
          'Jumunhasigesseoyo?',
          '[주문하시게써요?]',
          'Nối âm (연음): 하시겠어요 → [하시게써요].',
          'Liaison (연음): 하시겠어요 → [하시게써요].',
        ),
        [
          r('비빔밥 하나 주세요.', 'Cho tôi một bát bibimbap.', 'One bibimbap, please.'),
          r('김치찌개 하나 주세요.', 'Cho tôi một canh kimchi.', 'One kimchi stew, please.'),
          r('불고기 이 인분 주세요.', 'Cho tôi hai suất bulgogi.', 'Two servings of bulgogi, please.'),
        ],
      ),
      turn(
        '네, 알겠습니다. 음료는 뭐 드릴까요?',
        'Vâng, tôi biết rồi ạ. Quý khách dùng đồ uống gì ạ?',
        'Certainly. What would you like to drink?',
        p(
          'Ne, algetseumnida. Eumnyoneun mwo deurilkkayo?',
          '[네, 알겓씀니다. 음뇨는 뭐 드릴까요?]',
          'Căng hóa + mũi hóa: 겠습니다 → [겓씀니다]; mũi hóa (비음화): ㄹ sau ㅁ đọc [ㄴ]: 음료 → [음뇨].',
          'Tensification + nasalization: 겠습니다 → [겓씀니다]; nasalization (비음화): ㄹ after ㅁ is read [ㄴ]: 음료 → [음뇨].',
        ),
        [
          r('콜라 하나 주세요.', 'Cho tôi một lon cô-ca.', 'A Coke, please.'),
          r('물이면 돼요.', 'Nước lọc là được rồi.', 'Water is fine.'),
          r('사이다 하나 주세요.', 'Cho tôi một lon nước ngọt có ga (sprite).', 'A lemon-lime soda, please.'),
        ],
      ),
      turn(
        '혹시 매운 음식 괜찮으세요?',
        'Quý khách có ăn cay được không ạ?',
        'By any chance, are you okay with spicy food?',
        p(
          'Hoksi maeun eumsik gwaenchaneuseyo?',
          '[혹씨 매운 음식 괜차느세요?]',
          'Căng hóa (경음화): 혹시 → [혹씨]; patchim kép ㄶ trước nguyên âm: ㅎ câm, ㄴ chuyển sang: 괜찮으세요 → [괜차느세요].',
          'Tensification (경음화): 혹시 → [혹씨]; double batchim ㄶ before a vowel: ㅎ is silent and ㄴ moves over: 괜찮으세요 → [괜차느세요].',
        ),
        [
          r('네, 매운 거 좋아해요.', 'Vâng, tôi thích đồ cay.', 'Yes, I like spicy food.'),
          r('조금 매운 건 괜찮아요.', 'Cay một chút thì không sao.', 'A little spicy is okay.'),
          r('아니요, 안 맵게 해 주세요.', 'Không ạ, làm không cay giúp tôi nhé.', 'No, please make it not spicy.'),
        ],
      ),
      turn(
        '알겠습니다. 음식은 금방 나와요. 잠시만 기다려 주세요.',
        'Vâng ạ. Món ăn sẽ ra ngay. Xin quý khách chờ một chút.',
        'Got it. Your food will be out soon. Please wait a moment.',
        p(
          'Algetseumnida. Eumsigeun geumbang nawayo. Jamsiman gidaryeo juseyo.',
          '[알겓씀니다. 음시근 금방 나와요. 잠시만 기다려 주세요.]',
          'Căng hóa + mũi hóa: 겠습니다 → [겓씀니다]; nối âm: 음식은 → [음시근].',
          'Tensification + nasalization: 겠습니다 → [겓씀니다]; liaison: 음식은 → [음시근].',
        ),
        [
          r('네, 감사합니다.', 'Vâng, cảm ơn ạ.', 'Okay, thank you.'),
          r('네, 알겠어요.', 'Vâng, tôi biết rồi.', 'Okay, got it.'),
          r('감사합니다. 앞접시도 하나 주세요.', 'Cảm ơn ạ. Cho tôi thêm một cái đĩa nhỏ nữa.', 'Thank you. Could I also have a small plate?'),
        ],
      ),
      turn(
        '맛있게 드셨어요?',
        'Quý khách ăn có ngon miệng không ạ?',
        'Did you enjoy your meal?',
        p(
          'Masitge deusyeosseoyo?',
          '[마싣께 드셔써요?]',
          'Patchim ㅆ đọc [ㄷ] và ㄱ sau nó căng hóa (경음화): 맛있게 → [마싣께]; nối âm: 드셨어요 → [드셔써요].',
          'The batchim ㅆ is read [ㄷ] and the following ㄱ is tensified (경음화): 맛있게 → [마싣께]; liaison: 드셨어요 → [드셔써요].',
        ),
        [
          r('네, 정말 맛있었어요!', 'Vâng, ngon thật sự!', 'Yes, it was really delicious!'),
          r('네, 잘 먹었습니다. 계산해 주세요.', 'Vâng, tôi ăn ngon lắm. Tính tiền giúp tôi.', 'Yes, thank you for the meal. The bill, please.'),
          r('아주 맛있었어요. 계산은 어디에서 해요?', 'Ngon lắm ạ. Thanh toán ở đâu vậy?', 'It was very good. Where do I pay?'),
        ],
      ),
      turn(
        '감사합니다. 모두 이만 원입니다. 또 오세요!',
        'Cảm ơn quý khách. Tổng cộng là 20.000 won ạ. Hẹn gặp lại!',
        "Thank you. That's 20,000 won in total. Please come again!",
        p(
          'Gamsahamnida. Modu iman wonimnida. Tto oseyo!',
          '[감사함니다. 모두 이만 워님니다. 또 오세요!]',
          'Mũi hóa (비음화): 합니다 → [함니다], 입니다 → [임니다]; nối âm: 원입니다 → [워님니다].',
          'Nasalization (비음화): 합니다 → [함니다], 입니다 → [임니다]; liaison: 원입니다 → [워님니다].',
        ),
        [
          r('카드로 할게요. 잘 먹었습니다!', 'Tôi trả bằng thẻ. Cảm ơn vì bữa ăn ngon!', "I'll pay by card. Thank you for the meal!"),
          r('여기요. 잘 먹었습니다!', 'Gửi chị. Món ăn ngon lắm ạ!', 'Here you are. Thank you for the meal!'),
          r('감사합니다. 안녕히 계세요!', 'Cảm ơn ạ. Chào chị!', 'Thank you. Goodbye!'),
        ],
      ),
    ],
    suggestions: [
      s('word', '메뉴판', p('menyupan'), ['thực đơn', 'menu'], '메뉴판 좀 주세요.', ['Cho tôi xem thực đơn.', 'Could I have the menu, please?']),
      s('word', '주문', p('jumun'), ['việc gọi món, đặt hàng', 'order'], '저기요, 주문할게요!', ['Anh ơi, tôi gọi món!', "Excuse me, I'd like to order!"]),
      s('word', '물', p('mul'), ['nước', 'water'], '물 좀 더 주세요.', ['Cho tôi thêm ít nước.', 'Some more water, please.']),
      s('word', '맵다', p('maepda', '[맵따]', 'Căng hóa (경음화): sau patchim ㅂ, ㄷ → [ㄸ].', 'Tensification (경음화): after batchim ㅂ, ㄷ → [ㄸ].'), ['cay', 'to be spicy'], '이거 많이 매워요?', ['Món này cay lắm không?', 'Is this very spicy?']),
      s('word', '맛있다', p('masitda', '[마싣따]', 'Patchim ㅆ đọc [ㄷ], ㄷ sau nó căng hóa (경음화). Cách đọc [마딛따] cũng đúng chuẩn.', 'The batchim ㅆ is read [ㄷ] and the next ㄷ is tensified (경음화). [마딛따] is also standard.'), ['ngon', 'to be delicious'], '이 김치찌개 정말 맛있어요!', ['Món canh kimchi này ngon thật!', 'This kimchi stew is really delicious!']),
      s('word', '계산', p('gyesan'), ['tính tiền, thanh toán', 'paying the bill'], '계산은 어디에서 해요?', ['Thanh toán ở đâu ạ?', 'Where do I pay?']),
      s('phrase', '하나 주세요', p('hana juseyo'), ['cho tôi một cái / một phần', 'one, please'], '김밥 하나 주세요.', ['Cho tôi một cuộn kimbap.', 'One kimbap, please.']),
      s('phrase', '저기요!', p('jeogiyo!'), ['anh/chị ơi! (gọi nhân viên)', 'excuse me! (to call a server)'], '저기요! 여기 주문할게요.', ['Anh ơi! Bàn này gọi món.', "Excuse me! We'd like to order."]),
      s('phrase', '물 좀 주세요', p('mul jom juseyo'), ['cho tôi xin ít nước', 'some water, please'], '저기요, 물 좀 주세요.', ['Anh ơi, cho tôi xin ít nước.', 'Excuse me, some water, please.']),
      s('phrase', '덜 맵게 해 주세요', p('deol maepge hae juseyo', '[덜 맵께 해 주세요]', 'Căng hóa (경음화): sau patchim ㅂ, ㄱ → [ㄲ]: 맵게 → [맵께].', 'Tensification (경음화): after batchim ㅂ, ㄱ → [ㄲ]: 맵게 → [맵께].'), ['làm bớt cay giúp tôi', 'please make it less spicy'], '떡볶이 덜 맵게 해 주세요.', ['Làm món tteokbokki bớt cay giúp tôi.', 'Please make the tteokbokki less spicy.']),
      s('phrase', '잘 먹었습니다', p('jal meogeotseumnida', '[잘 머걷씀니다]', 'Nối âm: 먹었 → [머걷]; patchim ㅆ đọc [ㄷ], ㅅ sau nó căng hóa → [씀]; mũi hóa: 습니다 → [씀니다].', 'Liaison: 먹었 → [머걷]; the batchim ㅆ is read [ㄷ] and the next ㅅ is tensified → [씀]; nasalization: 습니다 → [씀니다].'), ['cảm ơn vì bữa ăn (nói sau khi ăn xong)', 'thank you for the meal (said after eating)'], '정말 맛있었어요. 잘 먹었습니다!', ['Ngon thật sự. Cảm ơn vì bữa ăn!', 'It was really delicious. Thank you for the meal!']),
      s('sentence', '뭐가 제일 맛있어요?', p('Mwoga jeil masisseoyo?', '[뭐가 제일 마시써요?]', 'Nối âm (연음): 맛있어요 → [마시써요]. Cách đọc [마디써요] cũng đúng chuẩn.', 'Liaison (연음): 맛있어요 → [마시써요]. [마디써요] is also standard.'), ['Món nào ngon nhất ạ?', "What's the best dish here?"], '여기 처음 왔어요. 뭐가 제일 맛있어요?', ['Tôi mới đến đây lần đầu. Món nào ngon nhất ạ?', "It's my first time here. What's the best dish?"]),
      s('sentence', '저는 고기를 안 먹어요.', p('Jeoneun gogireul an meogeoyo.', '[저는 고기를 안 머거요.]', 'Nối âm (연음): 먹어요 → [머거요].', 'Liaison (연음): 먹어요 → [머거요].'), ['Tôi không ăn thịt.', "I don't eat meat."], '저는 고기를 안 먹어요. 고기 없는 메뉴도 있어요?', ['Tôi không ăn thịt. Có món nào không có thịt không?', "I don't eat meat. Do you have any dishes without meat?"]),
      s('sentence', '남은 거 포장해 주세요.', p('Nameun geo pojanghae juseyo.', '[나믄 거 포장해 주세요.]', 'Nối âm (연음): 남은 → [나믄].', 'Liaison (연음): 남은 → [나믄].'), ['Gói phần còn lại giúp tôi.', 'Please wrap up the leftovers for me.'], '다 못 먹었어요. 남은 거 포장해 주세요.', ['Tôi ăn không hết. Gói phần còn lại giúp tôi.', "I couldn't finish it. Please wrap up the rest."]),
      s('sentence', '여기 계산해 주세요.', p('Yeogi gyesanhae juseyo.', undefined, '계 trong 계산 thường được đọc [게] trong lời nói hằng ngày.', '계 in 계산 is usually said [게] in everyday speech.'), ['Tính tiền giúp tôi.', 'The bill, please.'], '잘 먹었습니다. 여기 계산해 주세요.', ['Cảm ơn, ăn ngon lắm. Tính tiền giúp tôi.', 'Thank you for the meal. The bill, please.']),
    ],
  },

  // ───────────────────────────── travel ─────────────────────────────
  {
    id: 'ko-travel',
    lang: 'ko',
    scenario: 'travel',
    level: 'elementary',
    intro: {
      scenario: {
        vi: 'Bạn đang du lịch Seoul và ghé quầy thông tin du lịch để hỏi đường đến cung Gyeongbok.',
        en: 'You are travelling in Seoul and stop at a tourist information centre to ask how to get to Gyeongbokgung Palace.',
        zh: '你在首尔旅游，到旅游咨询处询问去景福宫怎么走。',
      },
      role: {
        vi: 'Bạn là khách du lịch. Hãy hỏi cách đi, mất bao lâu, mua thẻ giao thông ở đâu và xin gợi ý chỗ tham quan gần đó.',
        en: 'You are a tourist. Ask how to get there, how long it takes, where to buy a transport card, and for nearby places worth visiting.',
        zh: '你是游客。请询问怎么去、要多长时间、在哪里买交通卡，并请对方推荐附近值得去的地方。',
      },
    },
    turns: [
      turn(
        '안녕하세요. 관광 안내소입니다. 무엇을 도와드릴까요?',
        'Xin chào. Đây là quầy thông tin du lịch. Tôi có thể giúp gì cho bạn?',
        'Hello. This is the tourist information centre. How can I help you?',
        p(
          'Annyeonghaseyo. Gwangwang annaesoimnida. Mueoseul dowadeurilkkayo?',
          '[안녕하세요. 관광 안내소임니다. 무어슬 도와드릴까요?]',
          'Mũi hóa (비음화): 입니다 → [임니다]; nối âm: 무엇을 → [무어슬].',
          'Nasalization (비음화): 입니다 → [임니다]; liaison: 무엇을 → [무어슬].',
        ),
        [
          r('경복궁에 가고 싶어요.', 'Tôi muốn đi cung Gyeongbok.', 'I want to go to Gyeongbokgung Palace.'),
          r('안녕하세요. 경복궁에 어떻게 가요?', 'Xin chào. Đi cung Gyeongbok thế nào ạ?', 'Hello. How do I get to Gyeongbokgung Palace?'),
          r('경복궁까지 가는 길을 알려 주세요.', 'Xin chỉ cho tôi đường đến cung Gyeongbok.', 'Please tell me the way to Gyeongbokgung Palace.'),
        ],
      ),
      turn(
        '경복궁이요? 지하철 3호선을 타고 경복궁역에서 내리세요.',
        'Cung Gyeongbok à? Bạn đi tàu điện ngầm tuyến số 3 rồi xuống ở ga Gyeongbokgung nhé.',
        'Gyeongbokgung? Take subway Line 3 and get off at Gyeongbokgung Station.',
        p(
          'Gyeongbokgungiyo? Jihacheol samhoseoneul tago gyeongbokgungnyeogeseo naeriseyo.',
          '[경복꿍이요? 지하철 삼호서늘 타고 경복꿍녀게서 내리세요.]',
          'Căng hóa (경음화): 경복궁 → [경복꿍]; thêm ㄴ (ㄴ 첨가): 궁 + 역 → [궁녁]; nối âm: 3호선을 (삼호선을) → [삼호서늘], 역에서 → [녀게서].',
          'Tensification (경음화): 경복궁 → [경복꿍]; ㄴ-insertion (ㄴ 첨가): 궁 + 역 → [궁녁]; liaison: 3호선을 (삼호선을) → [삼호서늘], 역에서 → [녀게서].',
        ),
        [
          r('여기에서 얼마나 걸려요?', 'Từ đây đi mất bao lâu ạ?', 'How long does it take from here?'),
          r('지하철역은 어디에 있어요?', 'Ga tàu điện ngầm ở đâu ạ?', 'Where is the subway station?'),
          r('감사합니다. 시간이 얼마나 걸려요?', 'Cảm ơn ạ. Mất bao nhiêu thời gian ạ?', 'Thank you. How long does it take?'),
        ],
      ),
      turn(
        '지하철역은 이 길로 쭉 가면 오른쪽에 있어요. 경복궁까지는 이십 분쯤 걸려요.',
        'Ga tàu điện ngầm thì bạn cứ đi thẳng đường này, nó ở bên phải. Đến cung Gyeongbok mất khoảng hai mươi phút.',
        "For the subway station, go straight down this street and it's on the right. It takes about twenty minutes to Gyeongbokgung.",
        p(
          'Jihacheollyeogeun i gillo jjuk gamyeon oreunjjoge isseoyo. Gyeongbokgungkkajineun isip bunjjeum geollyeoyo.',
          '[지하철려근 이 길로 쭉 가면 오른쪼게 이써요. 경복꿍까지는 이십 뿐쯤 걸려요.]',
          'Thêm ㄴ (ㄴ 첨가) rồi lưu âm hóa (유음화): 지하철 + 역 → [지하철력]; căng hóa: 경복궁 → [경복꿍], 이십 분 → [이십 뿐]; nối âm: 오른쪽에 → [오른쪼게].',
          'ㄴ-insertion (ㄴ 첨가) then lateralization (유음화): 지하철 + 역 → [지하철력]; tensification: 경복궁 → [경복꿍], 이십 분 → [이십 뿐]; liaison: 오른쪽에 → [오른쪼게].',
        ),
        [
          r('네, 알겠습니다. 감사합니다.', 'Vâng, tôi hiểu rồi. Cảm ơn ạ.', 'Okay, I understand. Thank you.'),
          r('이십 분이요? 생각보다 가깝네요.', 'Hai mươi phút ạ? Gần hơn tôi nghĩ.', 'Twenty minutes? That is closer than I thought.'),
          r('그럼 지하철로 갈게요.', 'Vậy tôi sẽ đi bằng tàu điện ngầm.', "Then I'll go by subway."),
        ],
      ),
      turn(
        '교통카드는 있으세요?',
        'Bạn có thẻ giao thông chưa?',
        'Do you have a transport card?',
        p(
          'Gyotongkadeuneun isseuseyo?',
          '[교통카드는 이쓰세요?]',
          'Nối âm (연음): 있으세요 → [이쓰세요].',
          'Liaison (연음): 있으세요 → [이쓰세요].',
        ),
        [
          r('아니요, 없어요. 어디에서 사요?', 'Chưa, tôi không có. Mua ở đâu ạ?', "No, I don't. Where can I buy one?"),
          r('네, 있어요.', 'Vâng, tôi có rồi.', 'Yes, I do.'),
          r('아니요. 편의점에서 살 수 있어요?', 'Chưa ạ. Mua ở cửa hàng tiện lợi được không ạ?', "No. Can I buy one at a convenience store?"),
        ],
      ),
      turn(
        '교통카드는 편의점이나 역에서 살 수 있어요. 충전도 거기에서 하면 돼요.',
        'Thẻ giao thông có thể mua ở cửa hàng tiện lợi hoặc ở ga. Nạp tiền cũng làm ở đó là được.',
        'You can buy a transport card at a convenience store or at the station. You can top it up there too.',
        p(
          'Gyotongkadeuneun pyeonuijeomina yeogeseo sal su isseoyo. Chungjeondo geogieseo hamyeon dwaeyo.',
          '[교통카드는 펴니저미나 여게서 살 쑤 이써요. 충전도 거기에서 하면 돼요.]',
          'Nối âm: 편의점이나 → [펴니저미나] (의 đọc [이]), 역에서 → [여게서]; căng hóa (경음화) sau -ㄹ: 살 수 → [살 쑤].',
          'Liaison: 편의점이나 → [펴니저미나] (의 is read [이]), 역에서 → [여게서]; tensification (경음화) after -ㄹ: 살 수 → [살 쑤].',
        ),
        [
          r('알겠어요. 그리고 근처에 맛집도 있어요?', 'Tôi biết rồi. Còn gần đó có quán ăn ngon không ạ?', 'Got it. And are there any good restaurants nearby?'),
          r('감사합니다. 경복궁 근처에 볼 만한 곳이 있어요?', 'Cảm ơn ạ. Gần cung Gyeongbok có chỗ nào đáng xem không?', 'Thank you. Is there anything worth seeing near Gyeongbokgung?'),
          r('고마워요. 그 근처에서 추천할 만한 곳이 있어요?', 'Cảm ơn. Quanh đó có chỗ nào bạn gợi ý không?', 'Thanks. Is there anywhere around there you would recommend?'),
        ],
      ),
      turn(
        '경복궁 옆에 북촌 한옥마을이 있어요. 걸어서 십오 분쯤 걸려요. 맛집도 많으니까 한번 가 보세요.',
        'Cạnh cung Gyeongbok có làng nhà truyền thống Bukchon. Đi bộ mất khoảng mười lăm phút. Ở đó cũng có nhiều quán ngon, bạn thử ghé xem nhé.',
        'Next to Gyeongbokgung there is Bukchon Hanok Village. It is about a fifteen-minute walk. There are lots of good restaurants too, so give it a try.',
        p(
          'Gyeongbokgung yeope Bukchon hanongmaeuri isseoyo. Georeoseo sibo bunjjeum geollyeoyo. Matjipdo maneunikka hanbeon ga boseyo.',
          '[경복꿍 여페 북촌 하농마으리 이써요. 거러서 시보 분쯤 걸려요. 맏찝또 마느니까 한번 가 보세요.]',
          'Nối âm: 옆에 → [여페], 걸어서 → [거러서]; nối âm + mũi hóa (비음화): 한옥마을 → [하농마을]; căng hóa: 맛집도 → [맏찝또]; lược ㅎ: 많으니까 → [마느니까].',
          'Liaison: 옆에 → [여페], 걸어서 → [거러서]; liaison + nasalization (비음화): 한옥마을 → [하농마을]; tensification: 맛집도 → [맏찝또]; ㅎ is silent: 많으니까 → [마느니까].',
        ),
        [
          r('좋네요! 꼭 가 볼게요.', 'Hay quá! Nhất định tôi sẽ đến.', "Sounds great! I'll definitely go."),
          r('감사합니다. 지도에 표시해 주실 수 있어요?', 'Cảm ơn ạ. Bạn đánh dấu trên bản đồ giúp tôi được không?', 'Thank you. Could you mark it on the map for me?'),
          r('한옥마을이요? 재미있겠네요.', 'Làng hanok ạ? Chắc là thú vị lắm.', 'A hanok village? That sounds fun.'),
        ],
      ),
      turn(
        '네, 여기 지도도 가져가세요. 즐거운 여행 되세요!',
        'Vâng, bạn cầm theo tấm bản đồ này nhé. Chúc bạn chuyến đi vui vẻ!',
        'Sure, take this map with you too. Have a great trip!',
        p('Ne, yeogi jidodo gajyeogaseyo. Jeulgeoun yeohaeng doeseyo!'),
        [
          r('정말 감사합니다!', 'Thật sự cảm ơn bạn!', 'Thank you so much!'),
          r('친절하게 알려 주셔서 감사합니다.', 'Cảm ơn bạn đã chỉ dẫn tận tình.', 'Thank you for explaining so kindly.'),
          r('감사합니다. 좋은 하루 보내세요!', 'Cảm ơn ạ. Chúc bạn một ngày tốt lành!', 'Thank you. Have a nice day!'),
        ],
      ),
    ],
    suggestions: [
      s('word', '지하철', p('jihacheol'), ['tàu điện ngầm', 'subway'], '지하철로 가면 빨라요.', ['Đi tàu điện ngầm thì nhanh.', "It's faster by subway."]),
      s('word', '역', p('yeok'), ['ga, nhà ga', 'station'], '가장 가까운 역이 어디예요?', ['Ga gần nhất ở đâu ạ?', 'Where is the nearest station?']),
      s('word', '지도', p('jido'), ['bản đồ', 'map'], '지도 좀 보여 주세요.', ['Cho tôi xem bản đồ một chút.', 'Please show me the map.']),
      s('word', '오른쪽', p('oreunjjok'), ['bên phải', 'right side'], '은행은 오른쪽에 있어요.', ['Ngân hàng ở bên phải.', 'The bank is on the right.']),
      s('word', '왼쪽', p('oenjjok'), ['bên trái', 'left side'], '저기에서 왼쪽으로 가세요.', ['Đến đằng kia thì rẽ trái.', 'Turn left over there.']),
      s('word', '근처', p('geuncheo'), ['gần đây, xung quanh', 'nearby, vicinity'], '이 근처에 편의점 있어요?', ['Gần đây có cửa hàng tiện lợi không?', 'Is there a convenience store nearby?']),
      s('phrase', '어떻게 가요?', p('eotteoke gayo?', '[어떠케 가요?]', 'Bật hơi hóa (격음화): ㅎ + ㄱ → [ㅋ]: 어떻게 → [어떠케].', 'Aspiration (격음화): ㅎ + ㄱ → [ㅋ]: 어떻게 → [어떠케].'), ['đi thế nào?', 'how do I get there?'], '명동에 어떻게 가요?', ['Đi Myeongdong thế nào ạ?', 'How do I get to Myeongdong?']),
      s('phrase', '얼마나 걸려요?', p('eolmana geollyeoyo?'), ['mất bao lâu?', 'how long does it take?'], '여기에서 공항까지 얼마나 걸려요?', ['Từ đây đến sân bay mất bao lâu?', 'How long does it take from here to the airport?']),
      s('phrase', '여기에서 가까워요?', p('yeogieseo gakkawoyo?'), ['có gần đây không?', 'is it close to here?'], '경복궁이 여기에서 가까워요?', ['Cung Gyeongbok có gần đây không?', 'Is Gyeongbokgung close to here?']),
      s('phrase', '길을 잃었어요', p('gireul ireosseoyo', '[기를 이러써요]', 'Nối âm: 길을 → [기를]; patchim kép ㅀ trước nguyên âm: ㅎ câm, ㄹ chuyển sang: 잃었어요 → [이러써요].', 'Liaison: 길을 → [기를]; double batchim ㅀ before a vowel: ㅎ is silent and ㄹ moves over: 잃었어요 → [이러써요].'), ['tôi bị lạc đường', "I'm lost"], '죄송한데요, 길을 잃었어요. 좀 도와주세요.', ['Xin lỗi, tôi bị lạc đường. Giúp tôi với.', "Excuse me, I'm lost. Could you help me?"]),
      s('phrase', '사진 좀 찍어 주세요', p('sajin jom jjigeo juseyo', '[사진 좀 찌거 주세요]', 'Nối âm (연음): 찍어 → [찌거].', 'Liaison (연음): 찍어 → [찌거].'), ['chụp ảnh giúp tôi với', 'please take a photo (of me/us)'], '저기요, 사진 좀 찍어 주세요.', ['Anh ơi, chụp ảnh giúp tôi với.', 'Excuse me, could you take a photo of us?']),
      s('sentence', '화장실이 어디에 있어요?', p('Hwajangsiri eodie isseoyo?', '[화장시리 어디에 이써요?]', 'Nối âm (연음): 화장실이 → [화장시리], 있어요 → [이써요].', 'Liaison (연음): 화장실이 → [화장시리], 있어요 → [이써요].'), ['Nhà vệ sinh ở đâu ạ?', 'Where is the restroom?'], '실례합니다. 화장실이 어디에 있어요?', ['Xin lỗi. Nhà vệ sinh ở đâu ạ?', 'Excuse me. Where is the restroom?']),
      s('sentence', '표를 어디에서 사요?', p('Pyoreul eodieseo sayo?'), ['Mua vé ở đâu ạ?', 'Where do I buy a ticket?'], '부산 가는 기차표를 어디에서 사요?', ['Vé tàu đi Busan mua ở đâu ạ?', 'Where do I buy a train ticket to Busan?']),
      s('sentence', '여기에서 걸어서 갈 수 있어요?', p('Yeogieseo georeoseo gal su isseoyo?', '[여기에서 거러서 갈 쑤 이써요?]', 'Nối âm: 걸어서 → [거러서], 있어요 → [이써요]; căng hóa (경음화) sau -ㄹ: 갈 수 → [갈 쑤].', 'Liaison: 걸어서 → [거러서], 있어요 → [이써요]; tensification (경음화) after -ㄹ: 갈 수 → [갈 쑤].'), ['Từ đây đi bộ được không?', 'Can I walk there from here?'], '남산타워까지 여기에서 걸어서 갈 수 있어요?', ['Từ đây đi bộ đến tháp Namsan được không?', 'Can I walk to Namsan Tower from here?']),
      s('sentence', '이 버스 명동에 가요?', p('I beoseu Myeongdonge gayo?'), ['Xe buýt này có đi Myeongdong không?', 'Does this bus go to Myeongdong?'], '실례지만, 이 버스 명동에 가요?', ['Xin lỗi, xe buýt này có đi Myeongdong không ạ?', 'Excuse me, does this bus go to Myeongdong?']),
    ],
  },

  // ───────────────────────────── hobbies ─────────────────────────────
  {
    id: 'ko-hobbies',
    lang: 'ko',
    scenario: 'hobbies',
    level: 'elementary',
    intro: {
      scenario: {
        vi: 'Bạn ngồi cà phê với một người bạn Hàn Quốc và hai người nói chuyện về sở thích.',
        en: 'You are at a café with a Korean friend, chatting about hobbies.',
        zh: '你和一位韩国朋友在咖啡馆聊兴趣爱好。',
      },
      role: {
        vi: 'Bạn là người bạn. Hãy kể sở thích của mình, bắt đầu từ khi nào, vì sao thích, hỏi về sở thích của bạn kia và nhận lời rủ đi chơi.',
        en: 'You are the friend. Talk about your hobby, when you started and why you like it, show interest in your friend’s hobby and accept the invitation to go out.',
        zh: '你是朋友。请谈谈你的爱好、什么时候开始的、为什么喜欢，对朋友的爱好表示兴趣，并接受一起出去玩的邀请。',
      },
    },
    turns: [
      turn(
        '요즘 시간 있을 때 뭐 해요?',
        'Dạo này lúc rảnh bạn làm gì?',
        'What do you do in your free time these days?',
        p(
          'Yojeum sigan isseul ttae mwo haeyo?',
          '[요즘 시간 이쓸 때 뭐 해요?]',
          'Nối âm (연음): 있을 → [이쓸].',
          'Liaison (연음): 있을 → [이쓸].',
        ),
        [
          r('음악을 들어요.', 'Tôi nghe nhạc.', 'I listen to music.'),
          r('저는 요리하는 걸 좋아해요.', 'Tôi thích nấu ăn.', 'I like cooking.'),
          r('주말마다 등산을 해요.', 'Cuối tuần nào tôi cũng đi leo núi.', 'I go hiking every weekend.'),
        ],
      ),
      turn(
        '와, 좋네요! 그 취미는 언제 시작했어요?',
        'Ồ, hay quá! Bạn bắt đầu sở thích đó từ khi nào?',
        'Oh, nice! When did you start that hobby?',
        p(
          'Wa, jonneyo! Geu chwimineun eonje sijakaesseoyo?',
          '[와, 존네요! 그 취미는 언제 시자캐써요?]',
          'Patchim ㅎ trước ㄴ đọc [ㄴ] (비음화): 좋네요 → [존네요]; bật hơi hóa (격음화) ㄱ+ㅎ → [ㅋ]: 시작했어요 → [시자캐써요].',
          'Batchim ㅎ before ㄴ is read [ㄴ] (nasalization 비음화): 좋네요 → [존네요]; aspiration (격음화) ㄱ+ㅎ → [ㅋ]: 시작했어요 → [시자캐써요].',
        ),
        [
          r('고등학교 때 시작했어요.', 'Tôi bắt đầu từ hồi cấp ba.', 'I started in high school.'),
          r('이 년 전에 시작했어요.', 'Tôi bắt đầu từ hai năm trước.', 'I started two years ago.'),
          r('한국에 와서 시작했어요.', 'Tôi bắt đầu sau khi sang Hàn Quốc.', 'I started after coming to Korea.'),
        ],
      ),
      turn(
        '그래요? 어떤 점이 제일 좋아요?',
        'Vậy à? Bạn thích nhất điểm nào ở nó?',
        'Really? What do you like most about it?',
        p(
          'Geuraeyo? Eotteon jeomi jeil joayo?',
          '[그래요? 어떤 저미 제일 조아요?]',
          'Nối âm (연음): 점이 → [저미]; lược ㅎ: 좋아요 → [조아요].',
          'Liaison (연음): 점이 → [저미]; ㅎ is silent: 좋아요 → [조아요].',
        ),
        [
          r('스트레스가 풀려요.', 'Tôi thấy hết căng thẳng.', 'It relieves my stress.'),
          r('마음이 편해져요.', 'Tâm trạng tôi thoải mái hơn.', 'It makes me feel at ease.'),
          r('새로운 사람들을 만날 수 있어서 좋아요.', 'Tôi thích vì được gặp những người mới.', 'I like that I can meet new people.'),
        ],
      ),
      turn(
        '저는 요즘 사진 찍는 걸 좋아해요. 주말마다 카메라를 들고 공원에 가요.',
        'Dạo này tôi thích chụp ảnh. Cuối tuần nào tôi cũng mang máy ảnh ra công viên.',
        'These days I like taking photos. Every weekend I take my camera to the park.',
        p(
          'Jeoneun yojeum sajin jjingneun geol joahaeyo. Jumalmada kamerareul deulgo gongwone gayo.',
          '[저는 요즘 사진 찡는 걸 조아해요. 주말마다 카메라를 들고 공워네 가요.]',
          'Mũi hóa (비음화): ㄱ + ㄴ → [ㅇㄴ]: 찍는 → [찡는]; lược ㅎ: 좋아해요 → [조아해요]; nối âm: 공원에 → [공워네].',
          'Nasalization (비음화): ㄱ + ㄴ → [ㅇㄴ]: 찍는 → [찡는]; ㅎ is silent: 좋아해요 → [조아해요]; liaison: 공원에 → [공워네].',
        ),
        [
          r('멋있네요! 어떤 사진을 찍어요?', 'Hay thế! Bạn chụp ảnh gì?', 'Cool! What kind of photos do you take?'),
          r('와, 저도 사진에 관심이 있어요.', 'Ồ, tôi cũng quan tâm đến chụp ảnh.', "Wow, I'm interested in photography too."),
          r('사진을 보고 싶어요!', 'Tôi muốn xem ảnh của bạn!', "I'd love to see your photos!"),
        ],
      ),
      turn(
        '주로 꽃이나 하늘 사진을 찍어요. 이거 보세요. 지난주에 찍었어요.',
        'Tôi chủ yếu chụp hoa hoặc bầu trời. Xem này. Tôi chụp tuần trước đấy.',
        'I mostly take photos of flowers or the sky. Look at this. I took it last week.',
        p(
          'Juro kkochina haneul sajineul jjigeoyo. Igeo boseyo. Jinanjue jjigeosseoyo.',
          '[주로 꼬치나 하늘 사지늘 찌거요. 이거 보세요. 지난주에 찌거써요.]',
          'Nối âm (연음): 꽃이나 → [꼬치나], 사진을 → [사지늘], 찍어요 → [찌거요], 찍었어요 → [찌거써요].',
          'Liaison (연음): 꽃이나 → [꼬치나], 사진을 → [사지늘], 찍어요 → [찌거요], 찍었어요 → [찌거써요].',
        ),
        [
          r('와, 정말 예뻐요!', 'Ồ, đẹp thật!', 'Wow, it is really beautiful!'),
          r('사진을 정말 잘 찍네요.', 'Bạn chụp ảnh giỏi thật đấy.', 'You take really good photos.'),
          r('진짜 멋있어요. 저도 배우고 싶어요.', 'Đẹp thật. Tôi cũng muốn học.', "It's amazing. I'd like to learn too."),
        ],
      ),
      turn(
        '고마워요. 그럼 다음 주말에 같이 사진 찍으러 갈래요?',
        'Cảm ơn nhé. Vậy cuối tuần sau mình cùng đi chụp ảnh không?',
        'Thanks. Then do you want to go take photos together next weekend?',
        p(
          'Gomawoyo. Geureom daeum jumare gachi sajin jjigeureo gallaeyo?',
          '[고마워요. 그럼 다음 주마레 가치 사진 찌그러 갈래요?]',
          'Vòm hóa (구개음화): 같이 → [가치]; nối âm: 주말에 → [주마레], 찍으러 → [찌그러].',
          'Palatalization (구개음화): 같이 → [가치]; liaison: 주말에 → [주마레], 찍으러 → [찌그러].',
        ),
        [
          r('좋아요! 같이 가요.', 'Được đấy! Cùng đi nhé.', "Sure! Let's go together."),
          r('네, 좋아요. 몇 시에 만날까요?', 'Ừ, hay đấy. Mấy giờ mình gặp nhau?', 'Yes, great. What time shall we meet?'),
          r('좋아요. 저는 토요일이 괜찮아요.', 'Được đó. Tôi rảnh thứ Bảy.', 'Sounds good. Saturday works for me.'),
        ],
      ),
      turn(
        '그럼 토요일 오전 열 시에 한강 공원에서 만나요. 그때 봐요!',
        'Vậy mười giờ sáng thứ Bảy mình gặp nhau ở công viên sông Hàn nhé. Hẹn gặp lúc đó!',
        "Then let's meet at Hangang Park at 10 a.m. on Saturday. See you then!",
        p(
          'Geureom toyoil ojeon yeol sie Hangang gongwoneseo mannayo. Geuttae bwayo!',
          '[그럼 토요일 오전 열 씨에 한강 공워네서 만나요. 그때 봐요!]',
          'Căng hóa (경음화): 열 시 → [열 씨]; nối âm: 공원에서 → [공워네서].',
          'Tensification (경음화): 열 시 → [열 씨]; liaison: 공원에서 → [공워네서].',
        ),
        [
          r('네, 토요일에 봐요!', 'Ừ, thứ Bảy gặp nhé!', 'Okay, see you on Saturday!'),
          r('좋아요. 카메라 가져갈게요!', 'Được. Tôi sẽ mang máy ảnh theo!', "Great. I'll bring a camera!"),
          r('기대돼요. 그때 봐요!', 'Háo hức quá. Hẹn gặp lúc đó!', "I'm looking forward to it. See you then!"),
        ],
      ),
    ],
    suggestions: [
      s('word', '취미', p('chwimi'), ['sở thích', 'hobby'], '제 취미는 요리예요.', ['Sở thích của tôi là nấu ăn.', 'My hobby is cooking.']),
      s('word', '음악', p('eumak'), ['âm nhạc', 'music'], '저는 음악 듣는 걸 좋아해요.', ['Tôi thích nghe nhạc.', 'I like listening to music.']),
      s('word', '영화', p('yeonghwa'), ['phim (điện ảnh)', 'movie'], '주말에 영화를 봤어요.', ['Cuối tuần tôi đã xem phim.', 'I watched a movie on the weekend.']),
      s('word', '사진', p('sajin'), ['ảnh, bức ảnh', 'photo'], '여행할 때 사진을 많이 찍어요.', ['Khi đi du lịch tôi chụp nhiều ảnh.', 'I take a lot of photos when I travel.']),
      s('word', '등산', p('deungsan'), ['leo núi', 'hiking'], '한국 사람들은 등산을 좋아해요.', ['Người Hàn thích leo núi.', 'Koreans like hiking.']),
      s('word', '요리', p('yori'), ['nấu ăn; món ăn', 'cooking; dish'], '요즘 한국 요리를 배우고 있어요.', ['Dạo này tôi đang học nấu món Hàn.', "These days I'm learning Korean cooking."]),
      s('phrase', '취미가 뭐예요?', p('chwimiga mwoyeyo?'), ['sở thích của bạn là gì?', "what's your hobby?"], '민수 씨는 취미가 뭐예요?', ['Sở thích của Minsu là gì?', "Minsu, what's your hobby?"]),
      s('phrase', '노래하는 걸 좋아해요', p('noraehaneun geol joahaeyo', '[노래하는 걸 조아해요]', 'Lược ㅎ (ㅎ 탈락): 좋아해요 → [조아해요]. Mẫu: động từ + -는 걸 좋아해요 = thích làm gì.', 'ㅎ is silent (ㅎ 탈락): 좋아해요 → [조아해요]. Pattern: verb + -는 걸 좋아해요 = I like doing ….'), ['tôi thích hát', 'I like singing'], '저는 노래하는 걸 좋아해요. 노래방에 자주 가요.', ['Tôi thích hát. Tôi hay đi karaoke.', 'I like singing. I often go to karaoke.']),
      s('phrase', '시간 있을 때', p('sigan isseul ttae', '[시간 이쓸 때]', 'Nối âm (연음): 있을 → [이쓸].', 'Liaison (연음): 있을 → [이쓸].'), ['lúc rảnh, khi có thời gian', 'when I have time'], '시간 있을 때 책을 읽어요.', ['Lúc rảnh tôi đọc sách.', 'I read books when I have time.']),
      s('phrase', '관심이 있어요', p('gwansimi isseoyo', '[관시미 이써요]', 'Nối âm (연음): 관심이 → [관시미], 있어요 → [이써요].', 'Liaison (연음): 관심이 → [관시미], 있어요 → [이써요].'), ['tôi quan tâm, có hứng thú', "I'm interested"], '저는 한국 역사에 관심이 있어요.', ['Tôi quan tâm đến lịch sử Hàn Quốc.', "I'm interested in Korean history."]),
      s('phrase', '스트레스가 풀려요', p('seuteureseuga pullyeoyo'), ['hết căng thẳng, xả stress', 'it relieves stress'], '운동을 하면 스트레스가 풀려요.', ['Tập thể dục thì tôi hết căng thẳng.', 'Working out relieves my stress.']),
      s('sentence', '저는 주말마다 등산을 가요.', p('Jeoneun jumalmada deungsaneul gayo.', '[저는 주말마다 등사늘 가요.]', 'Nối âm (연음): 등산을 → [등사늘].', 'Liaison (연음): 등산을 → [등사늘].'), ['Cuối tuần nào tôi cũng đi leo núi.', 'I go hiking every weekend.'], '저는 주말마다 등산을 가요. 산이 정말 좋아요.', ['Cuối tuần nào tôi cũng đi leo núi. Tôi rất thích núi.', 'I go hiking every weekend. I really love the mountains.']),
      s('sentence', '요즘 기타를 배우고 있어요.', p('Yojeum gitareul baeugo isseoyo.', '[요즘 기타를 배우고 이써요.]', 'Nối âm (연음): 있어요 → [이써요].', 'Liaison (연음): 있어요 → [이써요].'), ['Dạo này tôi đang học guitar.', "These days I'm learning the guitar."], '요즘 기타를 배우고 있어요. 아직 잘 못 쳐요.', ['Dạo này tôi đang học guitar. Tôi chơi vẫn chưa giỏi.', "I'm learning the guitar these days. I can't play well yet."]),
      s('sentence', '같이 영화 보러 갈래요?', p('Gachi yeonghwa boreo gallaeyo?', '[가치 영화 보러 갈래요?]', 'Vòm hóa (구개음화): 같이 → [가치].', 'Palatalization (구개음화): 같이 → [가치].'), ['Cùng đi xem phim không?', 'Do you want to go see a movie together?'], '이번 주말에 같이 영화 보러 갈래요?', ['Cuối tuần này cùng đi xem phim không?', 'Do you want to go see a movie together this weekend?']),
      s('sentence', '케이팝을 자주 들어요.', p('Keipabeul jaju deureoyo.', '[케이파블 자주 드러요.]', 'Nối âm (연음): 케이팝을 → [케이파블], 들어요 → [드러요].', 'Liaison (연음): 케이팝을 → [케이파블], 들어요 → [드러요].'), ['Tôi hay nghe K-pop.', 'I often listen to K-pop.'], '출퇴근할 때 케이팝을 자주 들어요.', ['Lúc đi làm và tan làm tôi hay nghe K-pop.', 'I often listen to K-pop on my commute.']),
    ],
  },

  // ───────────────────────────── work ─────────────────────────────
  {
    id: 'ko-work',
    lang: 'ko',
    scenario: 'work',
    level: 'elementary',
    intro: {
      scenario: {
        vi: 'Hôm nay là ngày đầu tiên bạn đi làm ở một công ty Hàn Quốc. Trưởng nhóm đón bạn và giới thiệu văn phòng.',
        en: 'It is your first day at a Korean company. The team leader welcomes you and shows you around the office.',
        zh: '今天是你在一家韩国公司上班的第一天。组长来迎接你，并带你熟悉办公室。',
      },
      role: {
        vi: 'Bạn là nhân viên mới. Hãy chào hỏi lịch sự (dùng đuôi -ㅂ니다 khi thích hợp), hỏi về giờ nghỉ trưa, cuộc họp và tài liệu.',
        en: 'You are the new employee. Greet politely (use -ㅂ니다 endings where natural) and ask about lunch break, meetings and documents.',
        zh: '你是新员工。请礼貌地打招呼（适当时用 -ㅂ니다 结尾），并询问午休时间、会议和资料。',
      },
    },
    turns: [
      turn(
        '안녕하세요. 오늘부터 같이 일하게 된 분이시죠? 저는 마케팅팀 팀장입니다.',
        'Xin chào. Bạn là người bắt đầu làm việc cùng chúng tôi từ hôm nay phải không? Tôi là trưởng nhóm Marketing.',
        "Hello. You're the one joining us from today, right? I'm the leader of the marketing team.",
        p(
          'Annyeonghaseyo. Oneulbuteo gachi ilhage doen bunisijyo? Jeoneun maketingtim timjangimnida.',
          '[안녕하세요. 오늘부터 가치 일하게 된 부니시죠? 저는 마케팅팀 팀장임니다.]',
          'Vòm hóa (구개음화): 같이 → [가치]; nối âm: 분이시죠 → [부니시죠]; mũi hóa (비음화): 입니다 → [임니다].',
          'Palatalization (구개음화): 같이 → [가치]; liaison: 분이시죠 → [부니시죠]; nasalization (비음화): 입니다 → [임니다].',
        ),
        [
          r('네, 안녕하세요. 오늘부터 일하게 된 린입니다.', 'Vâng, xin chào. Tôi là Linh, bắt đầu làm việc từ hôm nay.', "Yes, hello. I'm Linh, starting work today."),
          r('네, 맞습니다. 잘 부탁드립니다.', 'Vâng, đúng ạ. Mong anh giúp đỡ.', "Yes, that's right. I look forward to working with you."),
          r('처음 뵙겠습니다. 응우옌 린입니다. 잘 부탁드립니다.', 'Hân hạnh được gặp anh. Tôi là Nguyễn Linh. Mong anh giúp đỡ.', 'How do you do? I am Nguyen Linh. I look forward to working with you.'),
        ],
      ),
      turn(
        '반갑습니다. 먼저 사무실을 안내해 드릴게요. 여기가 앞으로 쓰실 자리예요.',
        'Rất vui được gặp bạn. Trước tiên tôi sẽ dẫn bạn đi xem văn phòng. Đây là chỗ ngồi bạn sẽ dùng từ nay.',
        "Nice to meet you. First, let me show you around the office. This is the desk you'll be using.",
        p(
          'Bangapseumnida. Meonjeo samusireul annaehae deurilgeyo. Yeogiga apeuro sseusil jariyeyo.',
          '[반갑씀니다. 먼저 사무시를 안내해 드릴께요. 여기가 아프로 쓰실 자리예요.]',
          'Căng hóa + mũi hóa: 반갑습니다 → [반갑씀니다]; nối âm: 사무실을 → [사무시를], 앞으로 → [아프로]; căng hóa: -ㄹ게요 → [ㄹ께요].',
          'Tensification + nasalization: 반갑습니다 → [반갑씀니다]; liaison: 사무실을 → [사무시를], 앞으로 → [아프로]; tensification: -ㄹ게요 → [ㄹ께요].',
        ),
        [
          r('네, 감사합니다.', 'Vâng, cảm ơn anh.', 'Okay, thank you.'),
          r('감사합니다. 자리가 좋네요.', 'Cảm ơn anh. Chỗ ngồi đẹp quá.', 'Thank you. It is a nice spot.'),
          r('와, 창문 옆이네요. 감사합니다.', 'Ồ, cạnh cửa sổ luôn. Cảm ơn anh.', "Oh, it's by the window. Thank you."),
        ],
      ),
      turn(
        '컴퓨터 비밀번호는 이 종이에 있어요. 혹시 모르는 게 있으면 언제든지 물어보세요.',
        'Mật khẩu máy tính ở trong tờ giấy này. Nếu có gì chưa biết thì cứ hỏi tôi bất cứ lúc nào nhé.',
        "The computer password is on this sheet of paper. If there's anything you don't know, feel free to ask any time.",
        p(
          'Keompyuteo bimilbeonhoneun i jongie isseoyo. Hoksi moreuneun ge isseumyeon eonjedeunji mureoboseyo.',
          '[컴퓨터 비밀번호는 이 종이에 이써요. 혹씨 모르는 게 이쓰면 언제든지 무러보세요.]',
          'Căng hóa (경음화): 혹시 → [혹씨]; nối âm: 있어요 → [이써요], 있으면 → [이쓰면], 물어보세요 → [무러보세요].',
          'Tensification (경음화): 혹시 → [혹씨]; liaison: 있어요 → [이써요], 있으면 → [이쓰면], 물어보세요 → [무러보세요].',
        ),
        [
          r('네, 알겠습니다. 감사합니다.', 'Vâng, tôi hiểu rồi. Cảm ơn anh.', 'Okay, I understand. Thank you.'),
          r('감사합니다. 그럼 점심시간은 몇 시예요?', 'Cảm ơn anh. Vậy giờ nghỉ trưa là mấy giờ ạ?', 'Thank you. So what time is the lunch break?'),
          r('네. 혹시 회의는 언제 있어요?', 'Vâng. Cho tôi hỏi khi nào có cuộc họp ạ?', 'Okay. By the way, when is the meeting?'),
        ],
      ),
      turn(
        '오늘 오후 두 시에 팀 회의가 있어요. 점심시간은 열두 시부터 한 시까지예요.',
        'Chiều nay lúc hai giờ có họp nhóm. Giờ nghỉ trưa là từ mười hai giờ đến một giờ.',
        'There is a team meeting at two this afternoon. Lunch break is from twelve to one.',
        p(
          'Oneul ohu du sie tim hoeuiga isseoyo. Jeomsimsiganeun yeoldu sibuteo han sikkajiyeyo.',
          '[오늘 오후 두 시에 팀 회의가 이써요. 점심씨가는 열두 시부터 한 시까지예요.]',
          'Căng hóa trong từ ghép (경음화): 점심시간 → [점심씨간]; nối âm: 시간은 → [시가는], 있어요 → [이써요]. 회의 cũng hay đọc [회이].',
          'Tensification in a compound (경음화): 점심시간 → [점심씨간]; liaison: 시간은 → [시가는], 있어요 → [이써요]. 회의 is also often said [회이].',
        ),
        [
          r('네, 알겠습니다.', 'Vâng, tôi hiểu rồi.', 'Okay, I see.'),
          r('알겠습니다. 회의 전에 준비할 게 있어요?', 'Vâng ạ. Trước cuộc họp tôi có cần chuẩn bị gì không?', 'I see. Is there anything I should prepare before the meeting?'),
          r('회의 자료는 어디에서 볼 수 있어요?', 'Tài liệu họp tôi có thể xem ở đâu ạ?', 'Where can I see the meeting materials?'),
        ],
      ),
      turn(
        '회의 자료는 메일로 보내 드릴게요. 미리 한번 읽어 보세요.',
        'Tài liệu họp tôi sẽ gửi qua email cho bạn. Bạn đọc trước một lượt nhé.',
        "I'll send you the meeting materials by email. Have a read through them beforehand.",
        p(
          'Hoeui jaryoneun meillo bonae deurilgeyo. Miri hanbeon ilgeo boseyo.',
          '[회의 자료는 메일로 보내 드릴께요. 미리 한번 일거 보세요.]',
          'Căng hóa (경음화): -ㄹ게요 → [ㄹ께요]; patchim kép ㄺ trước nguyên âm: ㄹ ở lại, ㄱ chuyển sang: 읽어 → [일거].',
          'Tensification (경음화): -ㄹ게요 → [ㄹ께요]; double batchim ㄺ before a vowel: ㄹ stays, ㄱ moves over: 읽어 → [일거].',
        ),
        [
          r('네, 확인하겠습니다.', 'Vâng, tôi sẽ kiểm tra.', "Okay, I'll check it."),
          r('감사합니다. 미리 읽어 보겠습니다.', 'Cảm ơn anh. Tôi sẽ đọc trước.', "Thank you. I'll read them in advance."),
          r('알겠습니다. 모르는 부분은 여쭤봐도 될까요?', 'Vâng ạ. Phần nào chưa hiểu tôi hỏi anh được không ạ?', 'Understood. May I ask you about anything I don’t understand?'),
        ],
      ),
      turn(
        '좋아요. 첫날이라 긴장되죠? 천천히 적응하면 돼요.',
        'Tốt lắm. Ngày đầu nên hồi hộp lắm nhỉ? Cứ từ từ làm quen là được.',
        "Good. It's your first day, so you must be nervous, right? Just take your time getting used to things.",
        p(
          'Joayo. Cheonnarira ginjangdoejyo? Cheoncheonhi jeogeunghamyeon dwaeyo.',
          '[조아요. 천나리라 긴장되죠? 천천히 저긍하면 돼요.]',
          'Lược ㅎ: 좋아요 → [조아요]; patchim ㅅ đọc [ㄷ] rồi mũi hóa (비음화) trước ㄴ: 첫날 → [천날]; nối âm: 날이라 → [나리라], 적응 → [저긍].',
          'ㅎ is silent: 좋아요 → [조아요]; the batchim ㅅ is read [ㄷ], then nasalized (비음화) before ㄴ: 첫날 → [천날]; liaison: 날이라 → [나리라], 적응 → [저긍].',
        ),
        [
          r('네, 조금 긴장돼요.', 'Vâng, tôi hơi hồi hộp.', "Yes, I'm a little nervous."),
          r('감사합니다. 열심히 하겠습니다.', 'Cảm ơn anh. Tôi sẽ cố gắng hết sức.', 'Thank you. I will do my best.'),
          r('네, 조금요. 그래도 기대돼요.', 'Vâng, một chút ạ. Nhưng tôi cũng háo hức lắm.', "Yes, a little. But I'm excited too."),
        ],
      ),
      turn(
        '그럼 이따가 회의 때 봬요. 오늘 하루 잘 부탁해요!',
        'Vậy lát nữa gặp nhau ở cuộc họp nhé. Hôm nay mong bạn làm tốt!',
        "Then I'll see you at the meeting later. Looking forward to working with you today!",
        p(
          'Geureom ittaga hoeui ttae bwaeyo. Oneul haru jal butakaeyo!',
          '[그럼 이따가 회의 때 봬요. 오늘 하루 잘 부타캐요!]',
          'Bật hơi hóa (격음화) ㄱ + ㅎ → [ㅋ]: 부탁해요 → [부타캐요]. 회의 cũng hay đọc [회이].',
          'Aspiration (격음화) ㄱ + ㅎ → [ㅋ]: 부탁해요 → [부타캐요]. 회의 is also often said [회이].',
        ),
        [
          r('네, 이따 뵙겠습니다.', 'Vâng, lát nữa gặp anh ạ.', 'Yes, see you later.'),
          r('감사합니다. 잘 부탁드립니다!', 'Cảm ơn anh. Mong anh giúp đỡ!', 'Thank you. I look forward to working with you!'),
          r('네, 이따가 봬요!', 'Vâng, lát nữa gặp ạ!', 'Okay, see you later!'),
        ],
      ),
    ],
    suggestions: [
      s('word', '회사', p('hoesa'), ['công ty', 'company'], '회사가 집에서 가까워요.', ['Công ty gần nhà tôi.', 'The company is close to my home.']),
      s('word', '회의', p('hoeui', '[회의/회이]', '의 ở âm tiết không đứng đầu có thể đọc [이]: 회의 → [회이] (cả hai đều chuẩn).', '의 in a non-initial syllable may be read [이]: 회의 → [회이] (both are standard).'), ['cuộc họp', 'meeting'], '오후에 회의가 있어요.', ['Buổi chiều có cuộc họp.', 'There is a meeting in the afternoon.']),
      s('word', '사무실', p('samusil'), ['văn phòng', 'office'], '사무실은 삼 층에 있어요.', ['Văn phòng ở tầng ba.', 'The office is on the third floor.']),
      s('word', '동료', p('dongnyo', '[동뇨]', 'Mũi hóa (비음화): ㄹ sau ㅇ đọc [ㄴ]: 동료 → [동뇨].', 'Nasalization (비음화): ㄹ after ㅇ is read [ㄴ]: 동료 → [동뇨].'), ['đồng nghiệp', 'colleague'], '동료들이 정말 친절해요.', ['Đồng nghiệp rất thân thiện.', 'My colleagues are really kind.']),
      s('word', '출근', p('chulgeun'), ['đi làm (đến chỗ làm)', 'going to work, arriving at work'], '보통 아홉 시까지 출근해요.', ['Tôi thường đến công ty trước chín giờ.', 'I usually get to work by nine.']),
      s('word', '퇴근', p('toegeun'), ['tan làm', 'leaving work'], '오늘은 여섯 시에 퇴근해요.', ['Hôm nay tôi tan làm lúc sáu giờ.', 'I leave work at six today.']),
      s('phrase', '수고하셨습니다', p('sugohasyeotseumnida', '[수고하셛씀니다]', 'Patchim ㅆ đọc [ㄷ], ㅅ sau nó căng hóa (경음화) → [씀]; mũi hóa (비음화): 습니다 → [씀니다].', 'The batchim ㅆ is read [ㄷ] and the next ㅅ is tensified (경음화) → [씀]; nasalization (비음화): 습니다 → [씀니다].'), ['anh/chị vất vả rồi (lời chào cuối ngày làm việc)', 'thank you for your hard work (said at the end of the workday)'], '오늘 하루 수고하셨습니다.', ['Hôm nay anh chị vất vả rồi.', 'Thank you for your hard work today.']),
      s('phrase', '확인하겠습니다', p('hwaginhagetseumnida', '[화긴하겓씀니다]', 'Nối âm: 확인 → [화긴]; căng hóa + mũi hóa: 겠습니다 → [겓씀니다].', 'Liaison: 확인 → [화긴]; tensification + nasalization: 겠습니다 → [겓씀니다].'), ['tôi sẽ kiểm tra', "I'll check"], '메일 확인하겠습니다.', ['Tôi sẽ kiểm tra email.', "I'll check the email."]),
      s('phrase', '메일로 보내 드릴게요', p('meillo bonae deurilgeyo', '[메일로 보내 드릴께요]', 'Căng hóa (경음화): -ㄹ게요 → [ㄹ께요].', 'Tensification (경음화): -ㄹ게요 → [ㄹ께요].'), ['tôi sẽ gửi qua email cho anh/chị', "I'll send it to you by email"], '자료는 메일로 보내 드릴게요.', ['Tài liệu tôi sẽ gửi qua email cho anh.', "I'll send you the documents by email."]),
      s('phrase', '잠깐 시간 괜찮으세요?', p('jamkkan sigan gwaenchaneuseyo?', '[잠깐 시간 괜차느세요?]', 'Patchim kép ㄶ trước nguyên âm: ㅎ câm, ㄴ chuyển sang: 괜찮으세요 → [괜차느세요].', 'Double batchim ㄶ before a vowel: ㅎ is silent and ㄴ moves over: 괜찮으세요 → [괜차느세요].'), ['anh/chị có rảnh một chút không?', 'do you have a moment?'], '팀장님, 잠깐 시간 괜찮으세요?', ['Trưởng nhóm ơi, anh có rảnh một chút không ạ?', 'Excuse me, do you have a moment?']),
      s('phrase', '먼저 퇴근하겠습니다', p('meonjeo toegeunhagetseumnida', '[먼저 퇴근하겓씀니다]', 'Căng hóa + mũi hóa: 겠습니다 → [겓씀니다].', 'Tensification + nasalization: 겠습니다 → [겓씀니다].'), ['tôi xin phép về trước', "I'll be leaving first (polite)"], '오늘 일은 다 끝났어요. 먼저 퇴근하겠습니다.', ['Việc hôm nay xong hết rồi. Tôi xin phép về trước.', "I've finished today's work. I'll be heading out first."]),
      s('sentence', '오늘부터 일하게 된 린입니다.', p('Oneulbuteo ilhage doen Rinimnida.', '[오늘부터 일하게 된 리님니다.]', 'Nối âm + mũi hóa (비음화): 린입니다 → [리님니다].', 'Liaison + nasalization (비음화): 린입니다 → [리님니다].'), ['Tôi là Linh, bắt đầu làm việc từ hôm nay.', "I'm Linh, and I start work today."], '안녕하세요. 오늘부터 일하게 된 린입니다. 잘 부탁드립니다.', ['Xin chào. Tôi là Linh, bắt đầu làm việc từ hôm nay. Mong mọi người giúp đỡ.', "Hello. I'm Linh, and I start work today. I look forward to working with you."]),
      s('sentence', '이 부분을 잘 모르겠습니다.', p('I bubuneul jal moreugetseumnida.', '[이 부부늘 잘 모르겓씀니다.]', 'Nối âm: 부분을 → [부부늘]; căng hóa + mũi hóa: 겠습니다 → [겓씀니다].', 'Liaison: 부분을 → [부부늘]; tensification + nasalization: 겠습니다 → [겓씀니다].'), ['Phần này tôi chưa hiểu rõ.', "I don't quite understand this part."], '죄송한데요, 이 부분을 잘 모르겠습니다.', ['Xin lỗi, phần này tôi chưa hiểu rõ.', "Sorry, I don't quite understand this part."]),
      s('sentence', '회의는 몇 시에 시작해요?', p('Hoeuineun myeot sie sijakaeyo?', '[회의는 멷 씨에 시자캐요?]', 'Căng hóa: 몇 시 → [멷 씨]; bật hơi hóa (격음화) ㄱ + ㅎ → [ㅋ]: 시작해요 → [시자캐요].', 'Tensification: 몇 시 → [멷 씨]; aspiration (격음화) ㄱ + ㅎ → [ㅋ]: 시작해요 → [시자캐요].'), ['Cuộc họp bắt đầu lúc mấy giờ?', 'What time does the meeting start?'], '팀장님, 회의는 몇 시에 시작해요?', ['Trưởng nhóm ơi, cuộc họp bắt đầu lúc mấy giờ ạ?', 'What time does the meeting start?']),
      s('sentence', '내일까지 끝내겠습니다.', p('Naeilkkaji kkeunnaegetseumnida.', '[내일까지 끈내겓씀니다.]', 'Patchim ㅌ đọc [ㄷ] rồi mũi hóa (비음화) trước ㄴ: 끝내 → [끈내]; căng hóa + mũi hóa: 겠습니다 → [겓씀니다].', 'The batchim ㅌ is read [ㄷ], then nasalized (비음화) before ㄴ: 끝내 → [끈내]; tensification + nasalization: 겠습니다 → [겓씀니다].'), ['Tôi sẽ làm xong trước ngày mai.', "I'll finish it by tomorrow."], '보고서는 내일까지 끝내겠습니다.', ['Tôi sẽ hoàn thành báo cáo trước ngày mai.', "I'll finish the report by tomorrow."]),
    ],
  },

  // ───────────────────────────── interview ─────────────────────────────
  {
    id: 'ko-interview',
    lang: 'ko',
    scenario: 'interview',
    level: 'elementary',
    intro: {
      scenario: {
        vi: 'Bạn đi phỏng vấn xin việc ở một công ty Hàn Quốc. Người phỏng vấn hỏi một số câu đơn giản.',
        en: 'You are at a job interview at a Korean company. The interviewer asks some simple questions.',
        zh: '你在一家韩国公司参加求职面试，面试官问了一些简单的问题。',
      },
      role: {
        vi: 'Bạn là ứng viên. Hãy tự giới thiệu, nói lý do ứng tuyển, điểm mạnh, ngoại ngữ và thời gian có thể bắt đầu, dùng đuôi trang trọng -ㅂ니다/-습니다.',
        en: 'You are the candidate. Introduce yourself and talk about why you applied, your strengths, languages and when you can start, using formal -ㅂ니다/-습니다 endings.',
        zh: '你是应聘者。请做自我介绍，说明应聘理由、优点、会说的语言以及何时可以入职，使用正式的 -ㅂ니다/-습니다 结尾。',
      },
    },
    turns: [
      turn(
        '안녕하세요. 이쪽에 앉으세요. 간단하게 자기소개 부탁드립니다.',
        'Xin chào. Mời bạn ngồi đây. Bạn hãy giới thiệu ngắn gọn về bản thân.',
        'Hello. Please have a seat here. Please briefly introduce yourself.',
        p(
          'Annyeonghaseyo. Ijjoge anjeuseyo. Gandanhage jagisogae butakdeurimnida.',
          '[안녕하세요. 이쪼게 안즈세요. 간단하게 자기소개 부탁뜨림니다.]',
          'Nối âm: 이쪽에 → [이쪼게], 앉으세요 → [안즈세요]; căng hóa (경음화): 부탁드 → [부탁뜨]; mũi hóa (비음화): 립니다 → [림니다].',
          'Liaison: 이쪽에 → [이쪼게], 앉으세요 → [안즈세요]; tensification (경음화): 부탁드 → [부탁뜨]; nasalization (비음화): 립니다 → [림니다].',
        ),
        [
          r('안녕하십니까. 저는 응우옌 린입니다. 베트남에서 왔습니다.', 'Xin chào. Tôi là Nguyễn Linh. Tôi đến từ Việt Nam.', 'Good afternoon. I am Nguyen Linh. I am from Vietnam.'),
          r('안녕하십니까. 린이라고 합니다. 대학교에서 경영학을 전공했습니다.', 'Xin chào. Tôi tên là Linh. Tôi học chuyên ngành quản trị kinh doanh ở đại học.', 'Good afternoon. My name is Linh. I majored in business administration at university.'),
          r('안녕하십니까. 저는 린입니다. 이 년 동안 호텔에서 일했습니다.', 'Xin chào. Tôi là Linh. Tôi đã làm việc ở khách sạn hai năm.', 'Good afternoon. I am Linh. I worked at a hotel for two years.'),
        ],
      ),
      turn(
        '네, 반갑습니다. 저희 회사에 지원하신 이유가 무엇입니까?',
        'Vâng, rất vui được gặp bạn. Lý do bạn ứng tuyển vào công ty chúng tôi là gì?',
        'Nice to meet you. Why did you apply to our company?',
        p(
          'Ne, bangapseumnida. Jeohui hoesae jiwonhasin iyuga mueosimnikka?',
          '[네, 반갑씀니다. 저히 회사에 지원하신 이유가 무어심니까?]',
          'Căng hóa + mũi hóa: 반갑습니다 → [반갑씀니다]; 희 trong 저희 đọc [히]; nối âm + mũi hóa: 무엇입니까 → [무어심니까].',
          'Tensification + nasalization: 반갑습니다 → [반갑씀니다]; 희 in 저희 is read [히]; liaison + nasalization: 무엇입니까 → [무어심니까].',
        ),
        [
          r('한국 회사에서 일하고 싶었습니다.', 'Tôi đã muốn làm việc ở một công ty Hàn Quốc.', 'I wanted to work at a Korean company.'),
          r('이 회사 제품을 좋아해서 지원했습니다.', 'Tôi ứng tuyển vì thích sản phẩm của công ty.', "I applied because I like this company's products."),
          r('한국어와 베트남어를 모두 활용할 수 있어서 지원했습니다.', 'Tôi ứng tuyển vì có thể sử dụng cả tiếng Hàn và tiếng Việt.', 'I applied because I can make use of both Korean and Vietnamese.'),
        ],
      ),
      turn(
        '네. 그럼 장점이 무엇이라고 생각하십니까?',
        'Vâng. Vậy bạn nghĩ điểm mạnh của mình là gì?',
        'I see. Then what do you think your strengths are?',
        p(
          'Ne. Geureom jangjeomi mueosirago saenggakasimnikka?',
          '[네. 그럼 장쩌미 무어시라고 생가카심니까?]',
          'Căng hóa (경음화): 장점 → [장쩜]; nối âm: 장점이 → [장쩌미], 무엇이라고 → [무어시라고]; bật hơi hóa (격음화) ㄱ + ㅎ → [ㅋ]: 생각하 → [생가카]; mũi hóa: 십니까 → [심니까].',
          'Tensification (경음화): 장점 → [장쩜]; liaison: 장점이 → [장쩌미], 무엇이라고 → [무어시라고]; aspiration (격음화) ㄱ + ㅎ → [ㅋ]: 생각하 → [생가카]; nasalization: 십니까 → [심니까].',
        ),
        [
          r('저는 책임감이 강합니다.', 'Tôi có tinh thần trách nhiệm cao.', 'I have a strong sense of responsibility.'),
          r('성실하고 꼼꼼합니다.', 'Tôi chăm chỉ và cẩn thận.', 'I am hard-working and meticulous.'),
          r('새로운 것을 빨리 배웁니다. 그리고 사람들과 잘 지냅니다.', 'Tôi học cái mới nhanh. Và tôi hòa đồng với mọi người.', 'I learn new things quickly. And I get along well with people.'),
        ],
      ),
      turn(
        '한국어 외에 할 수 있는 언어가 있습니까?',
        'Ngoài tiếng Hàn, bạn còn biết ngôn ngữ nào khác không?',
        'Besides Korean, are there other languages you can speak?',
        p(
          'Hangugeo oee hal su inneun eoneoga itseumnikka?',
          '[한구거 외에 할 쑤 인는 어너가 읻씀니까?]',
          'Nối âm: 한국어 → [한구거], 언어가 → [어너가]; căng hóa (경음화) sau -ㄹ: 할 수 → [할 쑤]; mũi hóa (비음화): 있는 → [인는]; 있습니까 → [읻씀니까].',
          'Liaison: 한국어 → [한구거], 언어가 → [어너가]; tensification (경음화) after -ㄹ: 할 수 → [할 쑤]; nasalization (비음화): 있는 → [인는]; 있습니까 → [읻씀니까].',
        ),
        [
          r('네, 영어를 할 수 있습니다.', 'Vâng, tôi nói được tiếng Anh.', 'Yes, I can speak English.'),
          r('베트남어가 모국어이고, 영어도 조금 합니다.', 'Tiếng Việt là tiếng mẹ đẻ của tôi, tôi cũng nói được một chút tiếng Anh.', 'Vietnamese is my native language, and I also speak a little English.'),
          r('네, 영어와 중국어를 할 수 있습니다.', 'Vâng, tôi nói được tiếng Anh và tiếng Trung.', 'Yes, I can speak English and Chinese.'),
        ],
      ),
      turn(
        '알겠습니다. 언제부터 일할 수 있습니까?',
        'Tôi hiểu rồi. Bạn có thể bắt đầu làm việc từ khi nào?',
        'I see. When can you start working?',
        p(
          'Algetseumnida. Eonjebuteo ilhal su itseumnikka?',
          '[알겓씀니다. 언제부터 일할 쑤 읻씀니까?]',
          'Căng hóa + mũi hóa: 겠습니다 → [겓씀니다], 있습니까 → [읻씀니까]; căng hóa sau -ㄹ: 일할 수 → [일할 쑤].',
          'Tensification + nasalization: 겠습니다 → [겓씀니다], 있습니까 → [읻씀니까]; tensification after -ㄹ: 일할 수 → [일할 쑤].',
        ),
        [
          r('다음 주부터 일할 수 있습니다.', 'Tôi có thể làm từ tuần sau.', 'I can start next week.'),
          r('바로 시작할 수 있습니다.', 'Tôi có thể bắt đầu ngay.', 'I can start right away.'),
          r('다음 달 초부터 가능합니다.', 'Tôi có thể bắt đầu từ đầu tháng sau.', 'I am available from the beginning of next month.'),
        ],
      ),
      turn(
        '마지막으로 궁금한 점이 있으시면 말씀해 주세요.',
        'Cuối cùng, nếu bạn có thắc mắc gì thì cứ hỏi nhé.',
        'Lastly, if you have any questions, please go ahead.',
        p(
          'Majimageuro gunggeumhan jeomi isseusimyeon malsseumhae juseyo.',
          '[마지마그로 궁금한 저미 이쓰시면 말씀해 주세요.]',
          'Nối âm (연음): 마지막으로 → [마지마그로], 점이 → [저미], 있으시면 → [이쓰시면].',
          'Liaison (연음): 마지막으로 → [마지마그로], 점이 → [저미], 있으시면 → [이쓰시면].',
        ),
        [
          r('근무 시간은 어떻게 됩니까?', 'Giờ làm việc như thế nào ạ?', 'What are the working hours?'),
          r('결과는 언제 알 수 있습니까?', 'Khi nào tôi biết kết quả ạ?', 'When will I know the result?'),
          r('특별히 없습니다. 감사합니다.', 'Tôi không có câu hỏi gì đặc biệt. Cảm ơn ạ.', 'Nothing in particular. Thank you.'),
        ],
      ),
      turn(
        '네, 결과와 자세한 근무 조건은 다음 주에 이메일로 알려 드리겠습니다. 오늘 수고하셨습니다.',
        'Vâng, kết quả và điều kiện làm việc chi tiết chúng tôi sẽ báo qua email vào tuần sau. Hôm nay bạn vất vả rồi.',
        "We'll let you know the result and the detailed working conditions by email next week. Thank you for coming today.",
        p(
          'Ne, gyeolgwawa jasehan geunmu jogeoneun daeum jue imeillo allyeo deurigetseumnida. Oneul sugohasyeotseumnida.',
          '[네, 결과와 자세한 근무 조꺼는 다음 주에 이메일로 알려 드리겓씀니다. 오늘 수고하셛씀니다.]',
          'Căng hóa (경음화): 조건 → [조껀], nối âm → [조꺼는]; căng hóa + mũi hóa: 겠습니다 → [겓씀니다], 셨습니다 → [셛씀니다].',
          'Tensification (경음화): 조건 → [조껀], with liaison → [조꺼는]; tensification + nasalization: 겠습니다 → [겓씀니다], 셨습니다 → [셛씀니다].',
        ),
        [
          r('감사합니다. 좋은 하루 보내십시오.', 'Cảm ơn ạ. Chúc anh/chị một ngày tốt lành.', 'Thank you. Have a good day.'),
          r('오늘 시간 내 주셔서 감사합니다.', 'Cảm ơn anh/chị đã dành thời gian hôm nay.', 'Thank you for your time today.'),
          r('감사합니다. 연락 기다리겠습니다.', 'Cảm ơn ạ. Tôi sẽ chờ tin.', 'Thank you. I will wait to hear from you.'),
        ],
      ),
    ],
    suggestions: [
      s('word', '면접', p('myeonjeop'), ['phỏng vấn', 'interview'], '내일 회사 면접이 있어요.', ['Mai tôi có buổi phỏng vấn ở công ty.', 'I have a job interview tomorrow.']),
      s('word', '경력', p('gyeongnyeok', '[경녁]', 'Mũi hóa (비음화): ㄹ sau ㅇ đọc [ㄴ]: 경력 → [경녁].', 'Nasalization (비음화): ㄹ after ㅇ is read [ㄴ]: 경력 → [경녁].'), ['kinh nghiệm làm việc', 'work experience, career'], '관련 경력이 있습니까?', ['Bạn có kinh nghiệm liên quan không?', 'Do you have relevant experience?']),
      s('word', '장점', p('jangjeom', '[장쩜]', 'Căng hóa (경음화) trong từ Hán Hàn: 장점 → [장쩜].', 'Tensification (경음화) in this Sino-Korean word: 장점 → [장쩜].'), ['điểm mạnh, ưu điểm', 'strength, merit'], '제 장점은 성실함입니다.', ['Điểm mạnh của tôi là sự chăm chỉ.', 'My strength is that I am hard-working.']),
      s('word', '단점', p('danjeom', '[단쩜]', 'Căng hóa (경음화): 단점 → [단쩜].', 'Tensification (경음화): 단점 → [단쩜].'), ['điểm yếu, nhược điểm', 'weakness'], '제 단점은 조금 급한 성격입니다.', ['Điểm yếu của tôi là tính hơi nóng vội.', 'My weakness is that I am a little impatient.']),
      s('word', '지원하다', p('jiwonhada'), ['ứng tuyển', 'to apply (for a job)'], '저는 영업팀에 지원했습니다.', ['Tôi đã ứng tuyển vào nhóm kinh doanh.', 'I applied to the sales team.']),
      s('word', '전공', p('jeongong'), ['chuyên ngành', 'major (field of study)'], '전공이 무엇입니까?', ['Chuyên ngành của bạn là gì?', 'What was your major?']),
      s('phrase', '린이라고 합니다', p('Rinirago hamnida', '[리니라고 함니다]', 'Nối âm: 린이라고 → [리니라고]; mũi hóa (비음화): 합니다 → [함니다].', 'Liaison: 린이라고 → [리니라고]; nasalization (비음화): 합니다 → [함니다].'), ['tôi tên là Linh (trang trọng)', 'my name is Linh (formal)'], '안녕하십니까. 응우옌 린이라고 합니다.', ['Xin chào. Tôi tên là Nguyễn Linh.', 'Good afternoon. My name is Nguyen Linh.']),
      s('phrase', '자기소개를 하겠습니다', p('jagisogaereul hagetseumnida', '[자기소개를 하겓씀니다]', 'Căng hóa + mũi hóa: 겠습니다 → [겓씀니다].', 'Tensification + nasalization: 겠습니다 → [겓씀니다].'), ['tôi xin tự giới thiệu', 'let me introduce myself'], '지금부터 자기소개를 하겠습니다.', ['Sau đây tôi xin tự giới thiệu.', 'I will now introduce myself.']),
      s('phrase', '열심히 하겠습니다', p('yeolsimhi hagetseumnida', '[열씸히 하겓씀니다]', 'Căng hóa (경음화): 열심히 → [열씸히]; 겠습니다 → [겓씀니다].', 'Tensification (경음화): 열심히 → [열씸히]; 겠습니다 → [겓씀니다].'), ['tôi sẽ cố gắng hết sức', 'I will do my best'], '뽑아 주시면 열심히 하겠습니다.', ['Nếu được tuyển, tôi sẽ cố gắng hết sức.', 'If you hire me, I will do my best.']),
      s('phrase', '할 수 있습니다', p('hal su itseumnida', '[할 쑤 읻씀니다]', 'Căng hóa sau -ㄹ: 할 수 → [할 쑤]; patchim ㅆ đọc [ㄷ], ㅅ sau nó căng → [읻씀니다].', 'Tensification after -ㄹ: 할 수 → [할 쑤]; the batchim ㅆ is read [ㄷ] and the next ㅅ is tensified → [읻씀니다].'), ['tôi có thể (làm được)', 'I can (do it)'], '저는 영어와 한국어를 할 수 있습니다.', ['Tôi có thể nói tiếng Anh và tiếng Hàn.', 'I can speak English and Korean.']),
      s('phrase', '다시 한번 말씀해 주시겠습니까?', p('dasi hanbeon malsseumhae jusigetseumnikka?', '[다시 한번 말씀해 주시겓씀니까?]', 'Căng hóa + mũi hóa: 겠습니까 → [겓씀니까].', 'Tensification + nasalization: 겠습니까 → [겓씀니까].'), ['anh/chị có thể nói lại một lần nữa không ạ?', 'could you say that once more, please?'], '죄송합니다. 다시 한번 말씀해 주시겠습니까?', ['Xin lỗi. Anh/chị có thể nói lại một lần nữa không ạ?', 'I am sorry. Could you say that once more, please?']),
      s('sentence', '저는 대학교에서 경영학을 전공했습니다.', p('Jeoneun daehakgyoeseo gyeongyeonghageul jeongonghaetseumnida.', '[저는 대학꾜에서 경영하글 전공핻씀니다.]', 'Căng hóa: 대학교 → [대학꾜]; nối âm: 경영학을 → [경영하글]; 했습니다 → [핻씀니다].', 'Tensification: 대학교 → [대학꾜]; liaison: 경영학을 → [경영하글]; 했습니다 → [핻씀니다].'), ['Tôi học chuyên ngành quản trị kinh doanh ở đại học.', 'I majored in business administration at university.'], '저는 하노이에 있는 대학교에서 경영학을 전공했습니다.', ['Tôi học chuyên ngành quản trị kinh doanh ở một trường đại học tại Hà Nội.', 'I majored in business administration at a university in Hanoi.']),
      s('sentence', '저는 이 년 동안 호텔에서 일했습니다.', p('Jeoneun i nyeon dongan hotereseo ilhaetseumnida.', '[저는 이 년 동안 호테레서 일핻씀니다.]', 'Nối âm: 호텔에서 → [호테레서]; patchim ㅆ đọc [ㄷ], ㅅ sau nó căng: 했습니다 → [핻씀니다].', 'Liaison: 호텔에서 → [호테레서]; the batchim ㅆ is read [ㄷ] and the next ㅅ is tensified: 했습니다 → [핻씀니다].'), ['Tôi đã làm việc ở khách sạn hai năm.', 'I worked at a hotel for two years.'], '저는 이 년 동안 호텔에서 일했습니다. 그래서 손님 응대를 잘합니다.', ['Tôi đã làm ở khách sạn hai năm, nên tôi giỏi tiếp khách.', 'I worked at a hotel for two years, so I am good with customers.']),
      s('sentence', '이 회사에서 꼭 일하고 싶습니다.', p('I hoesaeseo kkok ilhago sipseumnida.', '[이 회사에서 꼭 일하고 십씀니다.]', 'Patchim ㅍ đọc [ㅂ], ㅅ sau nó căng hóa (경음화); mũi hóa: 싶습니다 → [십씀니다].', 'The batchim ㅍ is read [ㅂ] and the next ㅅ is tensified (경음화); nasalization: 싶습니다 → [십씀니다].'), ['Tôi rất muốn được làm việc ở công ty này.', 'I really want to work at this company.'], '이 회사에서 꼭 일하고 싶습니다. 기회를 주시면 감사하겠습니다.', ['Tôi rất muốn làm việc ở công ty này. Nếu được trao cơ hội tôi sẽ rất biết ơn.', 'I really want to work at this company. I would be grateful for the opportunity.']),
      s('sentence', '기회를 주시면 열심히 하겠습니다.', p('Gihoereul jusimyeon yeolsimhi hagetseumnida.', '[기회를 주시면 열씸히 하겓씀니다.]', 'Căng hóa (경음화): 열심히 → [열씸히]; căng hóa + mũi hóa: 겠습니다 → [겓씀니다].', 'Tensification (경음화): 열심히 → [열씸히]; tensification + nasalization: 겠습니다 → [겓씀니다].'), ['Nếu được trao cơ hội, tôi sẽ cố gắng hết sức.', 'If you give me the chance, I will work hard.'], '감사합니다. 기회를 주시면 열심히 하겠습니다.', ['Cảm ơn ạ. Nếu được trao cơ hội, tôi sẽ cố gắng hết sức.', 'Thank you. If you give me the chance, I will work hard.']),
    ],
  },
];
