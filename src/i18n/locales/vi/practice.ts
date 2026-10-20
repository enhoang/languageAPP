// Practice page (pages/Practice.tsx).
const practice = {
  title: 'Luyện tập',
  subtitle_one: 'Mỗi lượt {{count}} câu (theo thời lượng buổi học trong Cài đặt). Kết quả cập nhật lịch ôn tập của từng từ.',
  subtitle_other: 'Mỗi lượt {{count}} câu (theo thời lượng buổi học trong Cài đặt). Kết quả cập nhật lịch ôn tập của từng từ.',
  modes: {
    review: { title: 'Ôn tập đến hạn', detail: 'Lặp lại ngắt quãng: từ bị quên được ưu tiên' },
    mistakes: { title: 'Ôn lỗi sai', detail: 'Làm lại các câu từng trả lời sai' },
    mixed: { title: 'Hỗn hợp', detail: 'Trộn nhiều dạng bài' },
    meaning: {
      zh: { title: 'Trung → Việt', detail: 'Xem chữ Hán, chọn nghĩa' },
      en: { title: 'Anh → Việt', detail: 'Xem từ tiếng Anh, chọn nghĩa' },
      ko: { title: 'Hàn → Việt', detail: 'Xem từ viết bằng Hangul, chọn nghĩa' },
    },
    reverse: {
      zh: { title: 'Việt → Trung', detail: 'Xem nghĩa, chọn chữ Hán' },
      en: { title: 'Việt → Anh', detail: 'Xem nghĩa, chọn từ tiếng Anh' },
      ko: { title: 'Việt → Hàn', detail: 'Xem nghĩa, chọn từ tiếng Hàn' },
    },
    listen: { title: 'Nghe và chọn', detail: 'Nghe từ, chọn từ hoặc nghĩa' },
    fill: { title: 'Điền từ', detail: 'Chọn từ còn thiếu trong câu' },
    /** Chinese only */
    pron: { title: 'Gõ pinyin', detail: 'Nhìn chữ Hán, gõ pinyin có thanh điệu' },
    write: {
      zh: { title: 'Viết chữ Hán', detail: 'Dùng bộ gõ hoặc bảng chữ gợi ý' },
      en: { title: 'Chính tả', detail: 'Nghe từ và viết đúng chính tả' },
      ko: { title: 'Gõ Hangul', detail: 'Nghe từ và gõ bằng Hangul (bộ gõ hoặc bảng chữ gợi ý)' },
    },
  },
  due_one: '{{count}} đến hạn',
  due_other: '{{count}} đến hạn',
  backToModes: 'Các chế độ luyện tập',
  newRound: 'Luyện lượt mới',
  changeMode: 'Đổi chế độ',
  wordSource: 'Nguồn từ',
  source: {
    all: 'Từ đã mở ({{n}})',
    favorite: '★ Yêu thích',
    difficult: '⚑ Từ khó',
  },
  availableDue_one: '{{count}} từ đến hạn ôn tập.',
  availableDue_other: '{{count}} từ đến hạn ôn tập.',
  availableMistakes_one: '{{count}} câu sai chưa sửa.',
  availableMistakes_other: '{{count}} câu sai chưa sửa.',
  availableSource_one: '{{count}} từ trong nguồn đã chọn.',
  availableSource_other: '{{count}} từ trong nguồn đã chọn.',
  roundSize_one: 'Lượt này gồm {{count}} câu.',
  roundSize_other: 'Lượt này gồm {{count}} câu.',
  noneDue: 'Tuyệt vời — hôm nay không có từ nào đến hạn ôn tập.',
  learnFirst: 'Hãy học bài đầu tiên để có từ vựng.',
  reviewExtra: 'Ôn thêm các từ đã học',
  goToPath: 'Đến lộ trình học',
  noMistakes: 'Không có câu sai nào cần sửa. 👏',
  emptySource: 'Chưa có từ nào trong nguồn này.',
  markWordsHint: 'Đánh dấu từ trong trang Từ vựng.',
};

export default practice;
