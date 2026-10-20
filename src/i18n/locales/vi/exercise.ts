// Exercise runner and answer inputs (components/exercises).
const exercise = {
  progress: 'Câu {{current}} / {{total}}',
  empty: 'Không có câu hỏi nào.',
  correct: 'Chính xác!',
  incorrect: 'Chưa đúng',
  correctAnswer: 'Đáp án đúng: ',
  yourAnswer: 'Bạn trả lời: ',
  matchHelp: 'Chọn một từ bên trái, rồi chọn nghĩa bên phải. Bấm lại vào từ đã nối để bỏ nối.',
  arrangePlaceholder: 'Bấm vào các từ bên dưới theo đúng thứ tự…',
  placeholder: {
    pinyin: 'Ví dụ: nǐ hǎo hoặc ni3 hao3',
    hanzi: 'Gõ chữ Hán…',
    spelling: 'Gõ từ bạn nghe được…',
    hangul: 'Gõ bằng Hangul…',
  },
  help: {
    pinyin: 'Gõ dấu thanh (ā á ǎ à) hoặc số sau mỗi âm tiết (1–4). Thanh nhẹ không cần số. ü có thể gõ là v.',
    hanzi: 'Dùng bộ gõ tiếng Trung (gõ pinyin rồi chọn chữ) hoặc bảng chữ gợi ý.',
    spelling: 'Bấm nút loa để nghe lại (có thể nghe chậm). Không phân biệt chữ hoa, chữ thường.',
    hangul: 'Dùng bộ gõ tiếng Hàn (bàn phím 2-Set Korean) hoặc bảng chữ Hangul gợi ý.',
  },
  showPalette: {
    hanzi: 'Chưa có bộ gõ tiếng Trung? Hiện bảng chữ gợi ý',
    hangul: 'Chưa có bộ gõ tiếng Hàn? Hiện bảng chữ Hangul gợi ý',
  },
  hidePalette: 'Ẩn bảng chữ gợi ý',
  deleteLast: 'Xóa ký tự cuối',
  /** {{name}}: Pinyin, IPA, Romanization… */
  showPron: 'Hiện {{name}}',
};

export default exercise;
