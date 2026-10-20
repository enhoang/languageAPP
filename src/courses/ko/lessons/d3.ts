import type { Gloss, LText } from '../../../types';
import { MATCH_PROMPT, arrangeWith, choice, listen, typeIt, wordsOf, type DayContent } from '../../helpers';

const L = (vi: string, en: string, zh: string): LText => ({ vi, en, zh });
const G = (vi: string, en: string): Gloss => ({ vi, en });
const arrange = arrangeWith(' ');
const LV = 'TOPIK I · 1';

const EXPR_IDS = ['ne', 'aniyo', 'gamsahamnida', 'mianhamnida', 'gwaenchanayo'];
const NUM_IDS = ['num-il', 'num-i', 'num-sam', 'num-sa', 'num-o', 'num-yuk', 'num-chil', 'num-pal', 'num-gu', 'num-sip'];

const words = wordsOf('ko-d3', 1, [
  {
    id: 'ne', text: '네', pron: 'ne', vi: 'vâng, dạ', en: 'yes', type: 'interjection', topic: 'basics', level: LV,
    notes: L(
      'Câu trả lời lịch sự cho "có/đúng". 예 (ye) trang trọng hơn một chút. 네 còn dùng như "dạ" khi được gọi tên.',
      'The polite "yes". 예 (ye) is a little more formal. 네 is also said when someone calls your name, like "yes?".',
      '礼貌地表示“是、对”。예 (ye) 稍正式一些。被人叫名字时也可以回答“네”。',
    ),
    ex: ['네, 맞아요.', 'Vâng, đúng rồi.', "Yes, that's right.", 'Ne, majayo.'],
  },
  {
    id: 'aniyo', text: '아니요', pron: 'aniyo', vi: 'không (trả lời)', en: 'no', type: 'interjection', topic: 'basics', level: LV,
    notes: L(
      'Câu trả lời lịch sự cho "không". Nói nhanh nghe gần như 아뇨 (anyo).',
      'The polite "no". In fast speech it often sounds like 아뇨 (anyo).',
      '礼貌地表示“不是、不”。说得快时听起来像“아뇨 (anyo)”。',
    ),
    ex: ['아니요, 괜찮아요.', 'Không, không sao đâu ạ.', "No, it's all right.", 'Aniyo, gwaenchanayo.'],
  },
  {
    id: 'gamsahamnida', text: '감사합니다', pron: 'gamsahamnida', spoken: '[감사함니다]', vi: 'cảm ơn (trang trọng)', en: 'thank you (formal)',
    type: 'phrase', topic: 'basics', level: LV,
    notes: L(
      '감사 là từ Hán Hàn "cảm tạ". Batchim ㅂ đứng trước ㄴ đọc thành ㅁ: [감사함니다]. Cách nói thân mật hơn: 고마워요.',
      '감사 is the Sino-Korean word for "gratitude" (Vietnamese "cảm tạ"). Final ㅂ before ㄴ is said ㅁ: [감사함니다]. A softer everyday form is 고마워요.',
      '감사 是汉字词“感谢”。收音 ㅂ 在 ㄴ 前读成 ㅁ：[감사함니다]。比较随和的说法是“고마워요”。',
    ),
    ex: ['선생님, 감사합니다.', 'Em cảm ơn thầy/cô ạ.', 'Thank you, teacher.', 'Seonsaengnim, gamsahamnida.'],
  },
  {
    id: 'mianhamnida', text: '미안합니다', pron: 'mianhamnida', spoken: '[미안함니다]', vi: 'xin lỗi', en: "I'm sorry",
    type: 'phrase', topic: 'basics', level: LV,
    notes: L(
      'Dùng khi mình có lỗi. Trang trọng hơn nữa: 죄송합니다 [죄송함니다]. Cũng có biến âm mũi ㅂ → ㅁ.',
      'Used when you did something wrong. Even more formal: 죄송합니다 [죄송함니다]. Same nasalization ㅂ → ㅁ.',
      '自己有错时使用。更正式的说法是“죄송합니다 [죄송함니다]”。同样有鼻音化 ㅂ → ㅁ。',
    ),
    ex: ['늦어서 미안합니다.', 'Xin lỗi vì tôi đến muộn.', "I'm sorry I'm late.", 'Neujeoseo mianhamnida.'],
  },
  {
    id: 'gwaenchanayo', text: '괜찮아요', pron: 'gwaenchanayo', spoken: '[괜차나요]', vi: 'không sao, ổn', en: "it's okay; I'm fine",
    type: 'phrase', topic: 'basics', level: LV,
    notes: L(
      'Batchim kép ㄶ: ㅎ câm, ㄴ nối sang âm sau → [괜차나요]. Dùng để đáp lời xin lỗi, từ chối lịch sự hoặc hỏi "ổn không?" (괜찮아요? lên giọng).',
      'Double final ㄶ: the ㅎ is silent and ㄴ links to the next syllable → [괜차나요]. Use it to answer an apology, to politely decline, or to ask "Are you OK?" (괜찮아요? with rising pitch).',
      '双收音 ㄶ：ㅎ 不发音，ㄴ 连到后一个音节 → [괜차나요]。用于回应道歉、礼貌地拒绝，或用升调问“你没事吧？”（괜찮아요?）。',
    ),
    ex: ['괜찮아요? — 네, 괜찮아요.', 'Bạn có sao không? — Vâng, tôi không sao.', 'Are you okay? — Yes, I am fine.', 'Gwaenchanayo? — Ne, gwaenchanayo.'],
  },
  {
    id: 'num-il', text: '일', pron: 'il', vi: 'một (số Hán Hàn)', en: 'one (Sino-Korean)', type: 'number', topic: 'numbers', level: LV,
    notes: L('Hán Việt: nhất (一).', 'Sino-Vietnamese: nhất (一).', '汉字：一。'),
    ex: ['일 더하기 이는 삼이에요.', 'Một cộng hai là ba.', 'One plus two is three.', 'il deohagi ineun samieyo.'],
  },
  {
    id: 'num-i', text: '이', pron: 'i', vi: 'hai (số Hán Hàn)', en: 'two (Sino-Korean)', type: 'number', topic: 'numbers', level: LV,
    notes: L('Hán Việt: nhị (二).', 'Sino-Vietnamese: nhị (二).', '汉字：二。'),
    ex: ['이 더하기 이는 사예요.', 'Hai cộng hai là bốn.', 'Two plus two is four.', 'i deohagi ineun sayeyo.'],
  },
  {
    id: 'num-sam', text: '삼', pron: 'sam', vi: 'ba (số Hán Hàn)', en: 'three (Sino-Korean)', type: 'number', topic: 'numbers', level: LV,
    notes: L('Hán Việt: tam (三). Batchim ㅁ đọc [m] như "tam".', 'Sino-Vietnamese: tam (三). Final ㅁ is [m], as in "tam".', '汉字：三。收音 ㅁ 读 [m]。'),
    ex: ['삼 더하기 삼은 육이에요.', 'Ba cộng ba là sáu.', 'Three plus three is six.', 'sam deohagi sameun yugieyo.'],
  },
  {
    id: 'num-sa', text: '사', pron: 'sa', vi: 'bốn (số Hán Hàn)', en: 'four (Sino-Korean)', type: 'number', topic: 'numbers', level: LV,
    notes: L(
      'Hán Việt: tứ (四). Đồng âm với 死 "chết", nên nhiều tòa nhà ghi tầng 4 là F.',
      'Sino-Vietnamese: tứ (四). It sounds like 死 "death", so many buildings label the 4th floor "F".',
      '汉字：四。与“死”同音，所以很多大楼把四楼标为 F。',
    ),
    ex: ['사 빼기 일은 삼이에요.', 'Bốn trừ một là ba.', 'Four minus one is three.', 'sa ppaegi ireun samieyo.'],
  },
  {
    id: 'num-o', text: '오', pron: 'o', vi: 'năm (số Hán Hàn)', en: 'five (Sino-Korean)', type: 'number', topic: 'numbers', level: LV,
    notes: L('Hán Việt: ngũ (五).', 'Sino-Vietnamese: ngũ (五).', '汉字：五。'),
    ex: ['오 더하기 오는 십이에요.', 'Năm cộng năm là mười.', 'Five plus five is ten.', 'o deohagi oneun sibieyo.'],
  },
  {
    id: 'num-yuk', text: '육', pron: 'yuk', vi: 'sáu (số Hán Hàn)', en: 'six (Sino-Korean)', type: 'number', topic: 'numbers', level: LV,
    notes: L('Hán Việt: lục (六). Batchim ㄱ đọc [k] tắc, như "-c" trong "lục".', 'Sino-Vietnamese: lục (六). Final ㄱ is an unreleased [k], like Vietnamese final "-c".', '汉字：六。收音 ㄱ 是不爆破的 [k]。'),
    ex: ['육 더하기 일은 칠이에요.', 'Sáu cộng một là bảy.', 'Six plus one is seven.', 'yuk deohagi ireun chirieyo.'],
  },
  {
    id: 'num-chil', text: '칠', pron: 'chil', vi: 'bảy (số Hán Hàn)', en: 'seven (Sino-Korean)', type: 'number', topic: 'numbers', level: LV,
    notes: L('Hán Việt: thất (七).', 'Sino-Vietnamese: thất (七).', '汉字：七。'),
    ex: ['칠 더하기 일은 팔이에요.', 'Bảy cộng một là tám.', 'Seven plus one is eight.', 'chil deohagi ireun parieyo.'],
  },
  {
    id: 'num-pal', text: '팔', pron: 'pal', vi: 'tám (số Hán Hàn)', en: 'eight (Sino-Korean)', type: 'number', topic: 'numbers', level: LV,
    notes: L('Hán Việt: bát (八). 팔 còn có nghĩa "cánh tay".', 'Sino-Vietnamese: bát (八). 팔 also means "arm".', '汉字：八。팔 还有“胳膊”的意思。'),
    ex: ['팔 더하기 일은 구예요.', 'Tám cộng một là chín.', 'Eight plus one is nine.', 'pal deohagi ireun guyeyo.'],
  },
  {
    id: 'num-gu', text: '구', pron: 'gu', vi: 'chín (số Hán Hàn)', en: 'nine (Sino-Korean)', type: 'number', topic: 'numbers', level: LV,
    notes: L('Hán Việt: cửu (九).', 'Sino-Vietnamese: cửu (九).', '汉字：九。'),
    ex: ['구 더하기 일은 십이에요.', 'Chín cộng một là mười.', 'Nine plus one is ten.', 'gu deohagi ireun sibieyo.'],
  },
  {
    id: 'num-sip', text: '십', pron: 'sip', vi: 'mười (số Hán Hàn)', en: 'ten (Sino-Korean)', type: 'number', topic: 'numbers', level: LV,
    notes: L(
      'Hán Việt: thập (十). Ghép số: 십일 (11) [시빌], 이십 (20), 구십구 (99).',
      'Sino-Vietnamese: thập (十). Build numbers: 십일 (11) [시빌], 이십 (20), 구십구 (99).',
      '汉字：十。组合：십일 (11) [시빌]、이십 (20)、구십구 (99)。',
    ),
    ex: ['십 빼기 오는 오예요.', 'Mười trừ năm là năm.', 'Ten minus five is five.', 'sip ppaegi oneun oyeyo.'],
  },
]);

export const D3: DayContent = {
  lesson: {
    id: 'ko-d3', day: 3, stage: 1, minutes: 25, prerequisites: ['ko-d2'],
    title: L('Patchim & câu nói hằng ngày', 'Batchim & everyday expressions', '收音和日常用语'),
    subtitle: L(
      '7 âm cuối · nối âm 한국어 [한구거] · 감사합니다 [감사함니다] · số 일–십',
      '7 final sounds · linking 한국어 [한구거] · 감사합니다 [감사함니다] · numbers 일–십',
      '7 个收音代表音 · 连音 한국어 [한구거] · 감사합니다 [감사함니다] · 数字 일–십',
    ),
    objectives: [
      L('Hiểu patchim (받침) là gì và đọc đúng 7 âm cuối đại diện.', 'Understand what batchim (받침) is and pronounce its 7 representative final sounds.', '理解什么是收音（받침），读准 7 个代表音。'),
      L('Áp dụng nối âm (연음): 한국어 → [한구거].', 'Apply linking (연음): 한국어 → [한구거].', '掌握连音（연음）：한국어 → [한구거]。'),
      L('Áp dụng biến âm mũi (비음화): 감사합니다 → [감사함니다].', 'Apply nasalization (비음화): 감사합니다 → [감사함니다].', '掌握鼻音化（비음화）：감사합니다 → [감사함니다]。'),
      L('Nói 네, 아니요, 감사합니다, 미안합니다, 괜찮아요.', 'Say 네, 아니요, 감사합니다, 미안합니다, 괜찮아요.', '会说 네、아니요、감사합니다、미안합니다、괜찮아요。'),
      L('Đếm từ 1 đến 10 bằng số Hán Hàn: 일 이 삼 사 오 육 칠 팔 구 십.', 'Count 1–10 with Sino-Korean numbers: 일 이 삼 사 오 육 칠 팔 구 십.', '用汉字词数字从 1 数到 10：일 이 삼 사 오 육 칠 팔 구 십。'),
    ],
    intro: [
      L(
        'Một âm tiết tiếng Hàn có thể có thêm phụ âm ở dưới cùng, gọi là 받침 (batchim, "patchim" – "phần đỡ ở dưới"): 한 = ㅎ + ㅏ + ㄴ, 국 = ㄱ + ㅜ + ㄱ.',
        'A Korean syllable block can have an extra consonant at the bottom, called 받침 (batchim, "the support underneath"): 한 = ㅎ + ㅏ + ㄴ, 국 = ㄱ + ㅜ + ㄱ.',
        '韩语音节下方可以再加一个辅音，叫做收音 받침（意思是“垫在下面的”）：한 = ㅎ + ㅏ + ㄴ，국 = ㄱ + ㅜ + ㄱ。',
      ),
      L(
        'Tin vui cho người Việt: tiếng Việt cũng có âm cuối -c, -n, -t, -m, -p, -ng và cũng đọc "tắc", không bật hơi. Vì vậy 각, 갑, 갇 nghe rất giống "các", "gáp", "gát".',
        'Good news for Vietnamese speakers: Vietnamese also has the finals -c, -n, -t, -m, -p, -ng, and they are also unreleased. So 각, 갑, 갇 sound very much like Vietnamese "các", "gáp", "gát".',
        '对越南人来说是好消息：越南语也有 -c、-n、-t、-m、-p、-ng 这些韵尾，而且同样不爆破。所以 각、갑、갇 听起来很像越南语的“các”“gáp”“gát”。',
      ),
      L(
        'Khi đứng cạnh nhau, các âm tiết ảnh hưởng nhau: chữ viết giữ nguyên, nhưng cách đọc thay đổi. Hôm nay học hai quy tắc quan trọng nhất, rồi dùng chúng ngay với những câu nói lịch sự và các con số.',
        'When syllables meet, they influence each other: the spelling stays the same but the pronunciation changes. Today you learn the two most important rules and use them right away in polite expressions and numbers.',
        '音节相连时会互相影响：写法不变，读音会变。今天学习两条最重要的规则，并马上用在礼貌用语和数字上。',
      ),
    ],
    sections: [
      {
        kind: 'text',
        title: L('Patchim và 7 âm cuối đại diện', 'Batchim and the 7 representative final sounds', '收音和 7 个代表音'),
        body: [
          L(
            'Có nhiều phụ âm có thể làm patchim, nhưng khi đọc ở cuối âm tiết chỉ còn 7 âm: [k] [n] [t] [l] [m] [p] [ng].',
            'Many consonants can be written as batchim, but at the end of a syllable they are pronounced as only 7 sounds: [k] [n] [t] [l] [m] [p] [ng].',
            '很多辅音都能做收音，但在音节末尾只读成 7 个音：[k] [n] [t] [l] [m] [p] [ng]。',
          ),
          L(
            'ㄱ ㅋ ㄲ → [k] (như "-c"/"-ch") · ㄴ → [n] · ㄷ ㅅ ㅆ ㅈ ㅊ ㅌ ㅎ → [t] (như "-t") · ㄹ → [l] · ㅁ → [m] · ㅂ ㅍ → [p] (như "-p") · ㅇ → [ng] (như "-ng").',
            'ㄱ ㅋ ㄲ → [k] (like Vietnamese "-c") · ㄴ → [n] · ㄷ ㅅ ㅆ ㅈ ㅊ ㅌ ㅎ → [t] (like "-t") · ㄹ → [l] · ㅁ → [m] · ㅂ ㅍ → [p] (like "-p") · ㅇ → [ng] (like "-ng").',
            'ㄱ ㅋ ㄲ → [k] · ㄴ → [n] · ㄷ ㅅ ㅆ ㅈ ㅊ ㅌ ㅎ → [t] · ㄹ → [l] · ㅁ → [m] · ㅂ ㅍ → [p] · ㅇ → [ng]。',
          ),
          L(
            'Âm cuối [k] [t] [p] là âm tắc: miệng đóng lại rồi dừng, không bật hơi, không thêm nguyên âm. Đọc 책 là "chéc" ngắn gọn, không phải "chéc-cơ".',
            'Final [k] [t] [p] are unreleased: close the mouth and stop — no puff of air, no extra vowel. 책 is a short "chaek", never "chae-keu".',
            '收音 [k] [t] [p] 是不爆破音：口型闭合后停住，不送气，也不加元音。책 读得短促，不要读成“chae-keu”。',
          ),
          L(
            'ㄹ cuối âm tiết đọc [l]: đầu lưỡi chạm nhẹ lợi trên và giữ ở đó (물 "mul"). Tiếng Việt không có âm cuối này, nên đừng bỏ nó đi.',
            'Final ㄹ is [l]: the tip of the tongue touches the ridge behind the upper teeth and stays there (물 "mul"). Vietnamese has no such final, so be careful not to drop it.',
            '收音 ㄹ 读 [l]：舌尖轻贴上齿龈并保持不动（물 “mul”）。越南语没有这个韵尾，注意不要丢掉。',
          ),
        ],
      },
      {
        kind: 'sounds',
        title: L('7 âm cuối qua từ thật', 'The 7 final sounds in real words', '用真实词语练 7 个收音'),
        intro: L('Bấm để nghe. Chú ý miệng dừng ở âm cuối.', 'Tap to listen. Notice how the mouth stops on the final sound.', '点击收听，注意口型停在收音上。'),
        items: [
          { label: 'ㄱ → [k]', text: '책', pron: 'chaek', vi: 'sách', en: 'book' },
          { label: 'ㄴ → [n]', text: '산', pron: 'san', vi: 'núi', en: 'mountain' },
          { label: 'ㄷ → [t]', text: '옷', pron: 'ot', vi: 'quần áo', en: 'clothes', note: L('ㅅ cuối đọc [t]: 옷 [옫].', 'Final ㅅ is said [t]: 옷 [옫].', '收音 ㅅ 读 [t]：옷 [옫]。') },
          { label: 'ㄹ → [l]', text: '물', pron: 'mul', vi: 'nước', en: 'water' },
          { label: 'ㅁ → [m]', text: '밤', pron: 'bam', vi: 'ban đêm', en: 'night' },
          { label: 'ㅂ → [p]', text: '밥', pron: 'bap', vi: 'cơm', en: 'cooked rice' },
          { label: 'ㅇ → [ng]', text: '강', pron: 'gang', vi: 'sông', en: 'river' },
        ],
      },
      {
        kind: 'sounds',
        title: L('Viết khác, đọc giống', 'Spelled differently, said the same', '写法不同，读音相同'),
        intro: L(
          'Các patchim trong cùng một nhóm đọc như nhau. Ngoặc vuông [ ] là cách đọc thật.',
          'Batchim of the same group sound the same. Square brackets [ ] show the real pronunciation.',
          '同一组的收音读音相同。方括号 [ ] 表示实际读音。',
        ),
        items: [
          { label: 'ㅌ → [t]', text: '밭', pron: 'bat', vi: 'ruộng, vườn', en: 'field', note: L('밭 [받]', '밭 [받]', '밭 [받]') },
          { label: 'ㅈ → [t]', text: '낮', pron: 'nat', vi: 'ban ngày', en: 'daytime', note: L('낮 [낟]', '낮 [낟]', '낮 [낟]') },
          { label: 'ㅊ → [t]', text: '꽃', pron: 'kkot', vi: 'hoa', en: 'flower', note: L('꽃 [꼳]', '꽃 [꼳]', '꽃 [꼳]') },
          { label: 'ㅋ → [k]', text: '부엌', pron: 'bueok', vi: 'nhà bếp', en: 'kitchen', note: L('부엌 [부억]', '부엌 [부억]', '부엌 [부억]') },
          { label: 'ㅍ → [p]', text: '앞', pron: 'ap', vi: 'phía trước', en: 'front', note: L('앞 [압]', '앞 [압]', '앞 [압]') },
        ],
      },
      {
        kind: 'text',
        title: L('Quy tắc 1 — Nối âm (연음)', 'Rule 1 — Linking (연음)', '规则一：连音（연음）'),
        body: [
          L(
            'Khi patchim đứng trước một âm tiết bắt đầu bằng ㅇ câm (tức là bắt đầu bằng nguyên âm), patchim "chuyển sang" làm phụ âm đầu của âm tiết sau.',
            'When a batchim is followed by a syllable starting with the silent ㅇ (that is, with a vowel), the batchim moves over and becomes the first consonant of the next syllable.',
            '收音后面接以不发音的 ㅇ 开头（即以元音开头）的音节时，收音移到后一个音节，作为它的声母来读。',
          ),
          L(
            '한국어 → [한구거] (tiếng Hàn) · 음악 → [으막] (âm nhạc) · 발음 → [바름] (phát âm) · 십일 → [시빌] (11) · 삼이에요 → [사미에요].',
            '한국어 → [한구거] (Korean language) · 음악 → [으막] (music) · 발음 → [바름] (pronunciation) · 십일 → [시빌] (11) · 삼이에요 → [사미에요].',
            '한국어 → [한구거]（韩语）· 음악 → [으막]（音乐）· 발음 → [바름]（发音）· 십일 → [시빌]（11）· 삼이에요 → [사미에요]。',
          ),
          L(
            'Patchim ㅇ không chuyển: 고양이 vẫn đọc [고양이]. Patchim ㅎ trước nguyên âm thì câm: 괜찮아요 → [괜차나요], 좋아요 → [조아요].',
            'Batchim ㅇ does not move: 고양이 stays [고양이]. Batchim ㅎ before a vowel goes silent: 괜찮아요 → [괜차나요], 좋아요 → [조아요].',
            '收音 ㅇ 不移动：고양이 仍读 [고양이]。收音 ㅎ 在元音前不发音：괜찮아요 → [괜차나요]，좋아요 → [조아요]。',
          ),
          L(
            'Giống tiếng Việt khi nói nhanh "một ít" nghe như "mộ tít". Trong tiếng Hàn việc nối âm là bắt buộc.',
            'It is like fast Vietnamese "một ít" sounding like "mộ tít" (or English "an apple" → "a-napple") — except that in Korean linking is required.',
            '就像越南语快读“một ít”听起来像“mộ tít”，只不过在韩语里连音是必须的。',
          ),
        ],
      },
      {
        kind: 'text',
        title: L('Quy tắc 2 — Biến âm mũi (비음화)', 'Rule 2 — Nasalization (비음화)', '规则二：鼻音化（비음화）'),
        body: [
          L(
            'Patchim đọc [p] [t] [k] đứng trước ㄴ hoặc ㅁ sẽ biến thành âm mũi tương ứng: [p] → [m], [t] → [n], [k] → [ng].',
            'A batchim pronounced [p] [t] [k] that comes before ㄴ or ㅁ turns into the matching nasal: [p] → [m], [t] → [n], [k] → [ng].',
            '读作 [p] [t] [k] 的收音在 ㄴ 或 ㅁ 前面，会变成相应的鼻音：[p] → [m]，[t] → [n]，[k] → [ng]。',
          ),
          L(
            'ㅂ → ㅁ: 감사합니다 → [감사함니다], 미안합니다 → [미안함니다], 십만 → [심만] (100.000).',
            'ㅂ → ㅁ: 감사합니다 → [감사함니다], 미안합니다 → [미안함니다], 십만 → [심만] (100,000).',
            'ㅂ → ㅁ：감사합니다 → [감사함니다]，미안합니다 → [미안함니다]，십만 → [심만]（十万）。',
          ),
          L(
            'ㄱ → ㅇ: 한국말 → [한궁말] (tiếng Hàn), 국물 → [궁물] (nước canh). ㄷ/ㅅ → ㄴ: 옛날 → [옌날] (ngày xưa).',
            'ㄱ → ㅇ: 한국말 → [한궁말] (Korean language), 국물 → [궁물] (soup broth). ㄷ/ㅅ → ㄴ: 옛날 → [옌날] (the old days).',
            'ㄱ → ㅇ：한국말 → [한궁말]（韩国话），국물 → [궁물]（汤）。ㄷ/ㅅ → ㄴ：옛날 → [옌날]（从前）。',
          ),
          L(
            'Mọi câu kết thúc bằng -ㅂ니다 / -습니다 (văn phong trang trọng) đều đọc [-ㅁ니다]: 합니다 [함니다], 습니다 [씀니다].',
            'Every sentence ending in -ㅂ니다 / -습니다 (the formal style) is said [-ㅁ니다]: 합니다 [함니다], 습니다 [씀니다].',
            '所有以 -ㅂ니다 / -습니다 结尾的句子（正式语体）都读成 [-ㅁ니다]：합니다 [함니다]，습니다 [씀니다]。',
          ),
        ],
      },
      { kind: 'words', title: L('Câu nói hằng ngày', 'Everyday expressions', '日常用语'), wordIds: EXPR_IDS },
      {
        kind: 'examples',
        title: L('Hội thoại ngắn', 'Mini dialogues', '小对话'),
        examples: [
          { text: '미안합니다. — 괜찮아요.', pron: 'Mianhamnida. — Gwaenchanayo.', vi: 'Xin lỗi. — Không sao đâu.', en: "I'm sorry. — That's okay." },
          { text: '커피 괜찮아요? — 네, 감사합니다.', pron: 'Keopi gwaenchanayo? — Ne, gamsahamnida.', vi: 'Cà phê được không? — Vâng, cảm ơn ạ.', en: 'Is coffee okay? — Yes, thank you.' },
          { text: '우유 괜찮아요? — 아니요, 괜찮아요.', pron: 'Uyu gwaenchanayo? — Aniyo, gwaenchanayo.', vi: 'Sữa nhé? — Không, thôi ạ (cảm ơn).', en: 'Some milk? — No, thanks, I\'m fine.' },
          { text: '감사합니다! — 아니요, 괜찮아요.', pron: 'Gamsahamnida! — Aniyo, gwaenchanayo.', vi: 'Cảm ơn ạ! — Không có gì đâu.', en: "Thank you! — Oh, it's nothing." },
        ],
      },
      {
        kind: 'sounds',
        title: L('Số Hán Hàn 1–10', 'Sino-Korean numbers 1–10', '汉字词数字 1–10'),
        intro: L(
          'Số Hán Hàn có gốc từ chữ Hán, nên rất gần âm Hán Việt: nhất, nhị, tam, tứ, ngũ, lục, thất, bát, cửu, thập. Dùng cho ngày tháng, tiền, số điện thoại, phút, số tầng.',
          'Sino-Korean numbers come from Chinese characters, so they are close to Sino-Vietnamese: nhất, nhị, tam, tứ, ngũ, lục, thất, bát, cửu, thập. They are used for dates, money, phone numbers, minutes and floors.',
          '汉字词数字来自汉字，读音和越南语汉越音很接近。用于日期、钱、电话号码、分钟、楼层等。',
        ),
        items: [
          { label: '1', text: '일', pron: 'il', note: L('Hán Việt: nhất', 'Sino-Vietnamese: nhất (一)', '汉字：一') },
          { label: '2', text: '이', pron: 'i', note: L('Hán Việt: nhị', 'Sino-Vietnamese: nhị (二)', '汉字：二') },
          { label: '3', text: '삼', pron: 'sam', note: L('Hán Việt: tam', 'Sino-Vietnamese: tam (三)', '汉字：三') },
          { label: '4', text: '사', pron: 'sa', note: L('Hán Việt: tứ', 'Sino-Vietnamese: tứ (四)', '汉字：四') },
          { label: '5', text: '오', pron: 'o', note: L('Hán Việt: ngũ', 'Sino-Vietnamese: ngũ (五)', '汉字：五') },
          { label: '6', text: '육', pron: 'yuk', note: L('Hán Việt: lục', 'Sino-Vietnamese: lục (六)', '汉字：六') },
          { label: '7', text: '칠', pron: 'chil', note: L('Hán Việt: thất', 'Sino-Vietnamese: thất (七)', '汉字：七') },
          { label: '8', text: '팔', pron: 'pal', note: L('Hán Việt: bát', 'Sino-Vietnamese: bát (八)', '汉字：八') },
          { label: '9', text: '구', pron: 'gu', note: L('Hán Việt: cửu', 'Sino-Vietnamese: cửu (九)', '汉字：九') },
          { label: '10', text: '십', pron: 'sip', note: L('Hán Việt: thập', 'Sino-Vietnamese: thập (十)', '汉字：十') },
        ],
      },
      { kind: 'words', title: L('Từ mới: số đếm', 'New words: numbers', '生词：数字'), wordIds: NUM_IDS },
      {
        kind: 'examples',
        title: L('Ghép số lớn hơn', 'Building bigger numbers', '组成更大的数字'),
        examples: [
          { text: '십일', pron: 'sibil', vi: 'mười một (11) — đọc [시빌]', en: 'eleven (11) — said [시빌]' },
          { text: '이십', pron: 'isip', vi: 'hai mươi (20)', en: 'twenty (20)' },
          { text: '삼십오', pron: 'samsibo', vi: 'ba mươi lăm (35) — đọc [삼시보]', en: 'thirty-five (35) — said [삼시보]' },
          { text: '구십구', pron: 'gusipgu', vi: 'chín mươi chín (99)', en: 'ninety-nine (99)' },
        ],
      },
      {
        kind: 'speak',
        title: L('Luyện nói', 'Speaking practice', '口语练习'),
        intro: L('Đọc theo cách đọc thật, không đọc theo từng chữ.', 'Say them the way they are really pronounced, not letter by letter.', '按实际读音说，不要逐字念。'),
        items: [
          { text: '감사합니다', pron: 'gamsahamnida', vi: 'cảm ơn', en: 'thank you' },
          { text: '미안합니다', pron: 'mianhamnida', vi: 'xin lỗi', en: "I'm sorry" },
          { text: '괜찮아요', pron: 'gwaenchanayo', vi: 'không sao', en: "it's okay" },
          { text: '한국어', pron: 'hangugeo', vi: 'tiếng Hàn', en: 'Korean (language)' },
          { text: '일, 이, 삼, 사, 오', pron: 'il, i, sam, sa, o', vi: '1, 2, 3, 4, 5', en: '1, 2, 3, 4, 5' },
          { text: '육, 칠, 팔, 구, 십', pron: 'yuk, chil, pal, gu, sip', vi: '6, 7, 8, 9, 10', en: '6, 7, 8, 9, 10' },
        ],
      },
      {
        kind: 'tip',
        title: L('Mẹo cho người Việt', 'Tip for Vietnamese speakers', '给越南学习者的小贴士'),
        body: L(
          'Phiên âm La-tinh (Revised Romanization) ghi theo cách đọc thật: 한국어 = hangugeo, 감사합니다 = gamsahamnida. Nhưng hãy tập đọc thẳng từ Hangul — đừng đọc chữ "eo" thành "e-ô"; ㅓ gần "ơ" tiếng Việt. Còn 사 (4) đọc "xa" nhẹ, không phải "sa" uốn lưỡi.',
          'Revised Romanization follows the real pronunciation: 한국어 = hangugeo, 감사합니다 = gamsahamnida. Still, practise reading straight from Hangul — the "eo" is one sound (close to Vietnamese "ơ"), and 사 (4) has a light, non-retroflex s like Vietnamese "x".',
          '罗马字按实际读音拼写：한국어 = hangugeo，감사합니다 = gamsahamnida。不过最好直接读韩文：“eo”是一个音（接近越南语的“ơ”），사 (4) 的 s 很轻，不卷舌。',
        ),
      },
    ],
    wordIds: [...EXPR_IDS, ...NUM_IDS],
    grammarIds: [],
    practice: [
      listen('ko-d3-p1', '삼', ['사', '삼', '십', '칠'], 1, { seq: [
        '삼 (sam) = 3. ', L('Patchim ㅁ: môi khép lại ở cuối, như "tam".', 'Batchim ㅁ: the lips close at the end, like Vietnamese "tam".', '收音 ㅁ：最后双唇闭合。'),
      ] }, { skill: 'pronunciation', targetOptions: true, wordIds: ['num-sam'] }),
      choice('ko-d3-p2', 'pronunciation', L('한국어 thực tế được đọc thế nào?', 'How is 한국어 really pronounced?', '한국어 实际怎么读？'),
        ['[한국어]', '[한구거]', '[항구거]', '[한구커]'], 1,
        L(
          'Nối âm: patchim ㄱ của 국 chuyển sang âm tiết 어 → [한구거] (hangugeo).',
          'Linking: the batchim ㄱ of 국 moves onto 어 → [한구거] (hangugeo).',
          '连音：국 的收音 ㄱ 移到 어 上 → [한구거]（hangugeo）。',
        ), { text: '한국어', targetOptions: true }),
      choice('ko-d3-p3', 'pronunciation', L('감사합니다 thực tế được đọc thế nào?', 'How is 감사합니다 really pronounced?', '감사합니다 实际怎么读？'),
        ['[감사합니다]', '[감사한니다]', '[감사함니다]', '[감사아니다]'], 2,
        L(
          'Biến âm mũi: ㅂ đứng trước ㄴ → ㅁ. 합니다 → [함니다].',
          'Nasalization: ㅂ before ㄴ → ㅁ. 합니다 → [함니다].',
          '鼻音化：ㅂ 在 ㄴ 前 → ㅁ。합니다 → [함니다]。',
        ), { text: '감사합니다', audio: '감사합니다', targetOptions: true, wordIds: ['gamsahamnida'] }),
      choice('ko-d3-p4', 'pronunciation', L('Patchim ㅅ trong 옷 (quần áo) được đọc là âm gì?', 'What sound is the batchim ㅅ in 옷 (clothes)?', '옷（衣服）的收音 ㅅ 读什么音？'),
        ['[s]', '[t]', '[k]', '[n]'], 1,
        L(
          'ㄷ ㅅ ㅆ ㅈ ㅊ ㅌ ㅎ ở cuối âm tiết đều đọc [t]: 옷 [옫], như "-t" trong "ót".',
          'ㄷ ㅅ ㅆ ㅈ ㅊ ㅌ ㅎ at the end of a syllable are all [t]: 옷 [옫], like Vietnamese final "-t".',
          'ㄷ ㅅ ㅆ ㅈ ㅊ ㅌ ㅎ 在音节末尾都读 [t]：옷 [옫]。',
        ), { text: '옷', audio: '옷' }),
      { id: 'ko-d3-p5', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: '네', pron: 'ne', vi: 'vâng, dạ', en: 'yes' },
        { text: '아니요', pron: 'aniyo', vi: 'không (trả lời)', en: 'no' },
        { text: '감사합니다', pron: 'gamsahamnida', vi: 'cảm ơn (trang trọng)', en: 'thank you (formal)' },
        { text: '미안합니다', pron: 'mianhamnida', vi: 'xin lỗi', en: "I'm sorry" },
      ], explanation: { seq: [
        '네 = ', G('vâng', 'yes'), ' · 아니요 = ', G('không', 'no'),
        ' · 감사합니다 = ', G('cảm ơn', 'thank you'), ' · 미안합니다 = ', G('xin lỗi', "I'm sorry"), '.',
      ] }, wordIds: ['ne', 'aniyo', 'gamsahamnida', 'mianhamnida'] },
      choice('ko-d3-p6', 'vocabulary', L('Ai đó nói "미안합니다". Bạn đáp thế nào cho tự nhiên?', 'Someone says "미안합니다". What is the natural reply?', '别人说“미안합니다”，你怎么回答最自然？'),
        ['감사합니다', '괜찮아요', '미안합니다', '아니요'], 1,
        L(
          '괜찮아요 = "không sao đâu" — câu đáp quen thuộc nhất khi ai đó xin lỗi.',
          '괜찮아요 = "it\'s okay" — the usual reply when someone apologises.',
          '괜찮아요 =“没关系”——别人道歉时最常用的回答。',
        ), { targetOptions: true, wordIds: ['gwaenchanayo', 'mianhamnida'] }),
      typeIt('ko-d3-p7', 'hangul', { k: 'ex.write.hangul', p: { meaning: G('ba (số Hán Hàn)', 'three (Sino-Korean)') } }, ['삼'],
        L('3 = 삼 (ㅅ + ㅏ + ㅁ). Hán Việt "tam".', '3 = 삼 (ㅅ + ㅏ + ㅁ). Sino-Vietnamese "tam".', '3 = 삼（ㅅ + ㅏ + ㅁ），汉字“三”。'),
        { audio: '삼', wordIds: ['num-sam'] }),
      arrange('ko-d3-p8', G('Một cộng hai là ba.', 'One plus two is three.'), ['일', '더하기', '이는', '삼이에요'],
        { seq: [
          '일 (1) + 더하기 (', G('cộng', 'plus'), ') + 이는 (2 ', L('— chủ đề', '— topic', '——话题'), ') + 삼이에요 (', G('là 3', 'is 3'), '). ',
          L('삼이에요 đọc [사미에요] nhờ nối âm.', '삼이에요 is said [사미에요] because of linking.', '삼이에요 因连音读作 [사미에요]。'),
        ] }, ['num-il', 'num-i', 'num-sam']),
    ],
    quiz: [
      listen('ko-d3-q1', '칠', ['팔', '칠', '일', '십'], 1, { seq: [
        '칠 (chil) = 7. ', L('Hán Việt "thất". Patchim ㄹ đọc [l].', 'Sino-Vietnamese "thất". Batchim ㄹ is [l].', '汉字“七”，收音 ㄹ 读 [l]。'),
      ] }, { skill: 'listening', targetOptions: true, wordIds: ['num-chil'] }),
      choice('ko-d3-q2', 'vocabulary', L('Số 6 trong tiếng Hàn (số Hán Hàn) là gì?', 'What is 6 in Korean (Sino-Korean)?', '韩语汉字词数字 6 怎么说？'),
        ['육', '오', '구', '사'], 0,
        L('6 = 육 (yuk), giống Hán Việt "lục". 오 = 5, 구 = 9, 사 = 4.', '6 = 육 (yuk), like Sino-Vietnamese "lục". 오 = 5, 구 = 9, 사 = 4.', '6 = 육（yuk），汉字“六”。오 = 5，구 = 9，사 = 4。'),
        { targetOptions: true, wordIds: ['num-yuk'] }),
      choice('ko-d3-q3', 'pronunciation', L('음악 (âm nhạc) thực tế được đọc thế nào?', 'How is 음악 (music) really pronounced?', '음악（音乐）实际怎么读？'),
        ['[음악]', '[음막]', '[으막]', '[으낙]'], 2,
        L('Nối âm: patchim ㅁ chuyển sang 악 → [으막] (eumak).', 'Linking: batchim ㅁ moves onto 악 → [으막] (eumak).', '连音：收音 ㅁ 移到 악 上 → [으막]（eumak）。'),
        { text: '음악', audio: '음악', targetOptions: true }),
      choice('ko-d3-q4', 'pronunciation', L('한국말 (tiếng Hàn) thực tế được đọc thế nào?', 'How is 한국말 (Korean language) really pronounced?', '한국말（韩国话）实际怎么读？'),
        ['[한국말]', '[한구말]', '[항국말]', '[한궁말]'], 3,
        L('Biến âm mũi: ㄱ đứng trước ㅁ → ㅇ. 국말 → [궁말].', 'Nasalization: ㄱ before ㅁ → ㅇ. 국말 → [궁말].', '鼻音化：ㄱ 在 ㅁ 前 → ㅇ。국말 → [궁말]。'),
        { text: '한국말', audio: '한국말', targetOptions: true }),
      listen('ko-d3-q5', '괜찮아요', [G('Cảm ơn', 'Thank you'), G('Xin lỗi', 'Sorry'), G('Không sao', "It's okay"), G('Vâng', 'Yes')], 2,
        { seq: ['괜찮아요 [괜차나요] = ', G('không sao, ổn', "it's okay; I'm fine"), '.'] }, { wordIds: ['gwaenchanayo'] }),
      typeIt('ko-d3-q6', 'hangul', { k: 'ex.write.hangul', p: { meaning: G('vâng, dạ', 'yes') } }, ['네', '예'],
        L('"Vâng" = 네 (ㄴ + ㅔ). 예 cũng đúng, trang trọng hơn.', '"Yes" = 네 (ㄴ + ㅔ). 예 is also correct and a bit more formal.', '“是”= 네（ㄴ + ㅔ）。예 也对，更正式一些。'),
        { audio: '네', wordIds: ['ne'] }),
      { id: 'ko-d3-q7', kind: 'match', skill: 'vocabulary', prompt: MATCH_PROMPT, pairs: [
        { text: '일', pron: 'il', vi: 'một', en: 'one' },
        { text: '사', pron: 'sa', vi: 'bốn', en: 'four' },
        { text: '팔', pron: 'pal', vi: 'tám', en: 'eight' },
        { text: '십', pron: 'sip', vi: 'mười', en: 'ten' },
      ], explanation: L(
        '일 = 1 (Hán Việt: nhất) · 사 = 4 (tứ) · 팔 = 8 (bát) · 십 = 10 (thập).',
        '일 = 1 (Sino-Vietnamese nhất) · 사 = 4 (tứ) · 팔 = 8 (bát) · 십 = 10 (thập).',
        '일 = 1（一）· 사 = 4（四）· 팔 = 8（八）· 십 = 10（十）。',
      ), wordIds: ['num-il', 'num-sa', 'num-pal', 'num-sip'] },
      arrange('ko-d3-q8', G('Hai cộng hai là bốn.', 'Two plus two is four.'), ['이', '더하기', '이는', '사예요'],
        { seq: [
          '이 (2) + 더하기 (', G('cộng', 'plus'), ') + 이는 (2) + 사예요 (', G('là 4', 'is 4'), ').',
        ] }, ['num-i', 'num-sa']),
      choice('ko-d3-q9', 'pronunciation', L('Patchim ㅂ trong 밥 (cơm) giống âm cuối nào của tiếng Việt?', 'Which Vietnamese final is the batchim ㅂ in 밥 (cooked rice) like?', '밥（米饭）的收音 ㅂ 像越南语的哪个韵尾？'),
        [L('-p (như "đạp")', '-p (as in Vietnamese "đạp")', '-p（如越南语“đạp”）'), L('-m (như "đậm")', '-m (as in Vietnamese "đậm")', '-m（如“đậm”）'), L('-b bật hơi', 'a released "b" sound', '爆破的 b'), L('-t (như "đạt")', '-t (as in Vietnamese "đạt")', '-t（如“đạt”）')], 0,
        L('ㅂ ㅍ cuối âm tiết đọc [p] tắc, môi khép và dừng: 밥 [bap], như "-p" trong tiếng Việt.', 'Final ㅂ ㅍ are an unreleased [p]: the lips close and stop. 밥 [bap], like Vietnamese final "-p".', '收音 ㅂ ㅍ 读不爆破的 [p]：双唇闭合后停住。밥 [bap]。'),
        { text: '밥', audio: '밥' }),
    ],
    summary: [
      L('Patchim chỉ có 7 âm cuối: [k] [n] [t] [l] [m] [p] [ng]; [k] [t] [p] tắc như tiếng Việt.', 'Batchim have only 7 final sounds: [k] [n] [t] [l] [m] [p] [ng]; [k] [t] [p] are unreleased, as in Vietnamese.', '收音只有 7 个音：[k] [n] [t] [l] [m] [p] [ng]；[k] [t] [p] 不爆破。'),
      L('Nối âm: patchim + nguyên âm → chuyển sang: 한국어 [한구거], 괜찮아요 [괜차나요].', 'Linking: batchim + vowel → it moves over: 한국어 [한구거], 괜찮아요 [괜차나요].', '连音：收音 + 元音 → 移到后面：한국어 [한구거]，괜찮아요 [괜차나요]。'),
      L('Biến âm mũi: [p t k] + ㄴ/ㅁ → [m n ng]: 감사합니다 [감사함니다], 한국말 [한궁말].', 'Nasalization: [p t k] + ㄴ/ㅁ → [m n ng]: 감사합니다 [감사함니다], 한국말 [한궁말].', '鼻音化：[p t k] + ㄴ/ㅁ → [m n ng]：감사합니다 [감사함니다]，한국말 [한궁말]。'),
      L('Câu nói: 네, 아니요, 감사합니다, 미안합니다, 괜찮아요.', 'Expressions: 네, 아니요, 감사합니다, 미안합니다, 괜찮아요.', '用语：네、아니요、감사합니다、미안합니다、괜찮아요。'),
      L('Số Hán Hàn: 일 이 삼 사 오 육 칠 팔 구 십 — gần âm Hán Việt nhất, nhị, tam…', 'Sino-Korean numbers: 일 이 삼 사 오 육 칠 팔 구 십 — close to Sino-Vietnamese nhất, nhị, tam…', '汉字词数字：일 이 삼 사 오 육 칠 팔 구 십。'),
    ],
  },
  words,
  grammar: [],
};
