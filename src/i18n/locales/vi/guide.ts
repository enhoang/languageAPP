// How-to page (pages/Guide.tsx). <b>…</b> marks bold text.
const guide = {
  title: 'Hướng dẫn sử dụng',
  courses: {
    title: 'Chọn ngôn ngữ để học',
    /** {{names}} = "Tiếng Trung, Tiếng Anh, Tiếng Hàn" */
    choose: 'Ứng dụng có ba khóa học: {{names}}. Lần đầu mở ứng dụng, hãy chọn một ngôn ngữ — mỗi khóa có lộ trình, từ vựng, phát âm và bài kiểm tra riêng.',
    switch: 'Đổi ngôn ngữ học bất cứ lúc nào bằng nút “Đang học” trên thanh điều hướng (hoặc trang Tất cả ngôn ngữ).',
    separate: 'Tiến độ, lịch ôn và lỗi sai của mỗi ngôn ngữ được lưu riêng, nên đổi qua lại không làm mất gì. Chuỗi ngày học và mục tiêu thời gian hằng ngày cộng chung mọi ngôn ngữ.',
  },
  language: {
    title: 'Ngôn ngữ giao diện và ngôn ngữ đang học',
    interface: 'Ngôn ngữ giao diện (nút 🌐: Tiếng Việt, English, 简体中文) là ngôn ngữ của nút bấm và lời giải thích.',
    studied: 'Ngôn ngữ đang học (nút “Đang học”) là ngôn ngữ của bài học. Hai lựa chọn độc lập: ví dụ giao diện tiếng Việt khi học tiếng Hàn. Đổi giao diện không ảnh hưởng đến tiến độ.',
    support: 'Khi giao diện là tiếng Trung, hoặc trùng với ngôn ngữ đang học (giao diện English khi học tiếng Anh), bạn chọn xem nghĩa và bản dịch bằng tiếng Việt hoặc tiếng Anh trong Cài đặt.',
  },
  daily: {
    title: 'Học mỗi ngày như thế nào?',
    step1: 'Mở <b>{{home}}</b> và bấm nút hành động chính — ứng dụng luôn gợi ý việc nên làm tiếp theo.',
    step2: 'Ôn các từ đến hạn trước (Luyện tập → Ôn tập đến hạn).',
    step3: 'Học bài của ngày: Mục tiêu → Bài học → Luyện tập → Kiểm tra → Tổng kết. Đạt ≥ {{pct}}% bài kiểm tra để mở bài tiếp theo.',
    step4: 'Cuối buổi, làm lại các câu sai (Luyện tập → Ôn lỗi sai).',
    breaks: 'Nghỉ vài ngày cũng không sao: bạn tiếp tục đúng từ chỗ đã dừng, các từ đến hạn sẽ chờ bạn ôn.',
  },
  pron: {
    title: 'Cách đọc: pinyin, IPA, romanization',
    zh: 'Tiếng Trung: pinyin ghi cách đọc chữ Hán, kèm dấu thanh điệu.',
    en: 'Tiếng Anh: phiên âm IPA (ví dụ /ˈtiːtʃər/) cho biết cách đọc vì chữ viết và âm thường khác nhau. Chọn giọng Mỹ hoặc Anh trong Cài đặt.',
    ko: 'Tiếng Hàn: romanization (chữ La-tinh) chỉ là trợ giúp ban đầu; hãy tập đọc Hangul càng sớm càng tốt. Cách đọc thật khác chữ viết được ghi trong ngoặc vuông, ví dụ [한구거].',
    toggle: 'Cài đặt → “Luôn hiện cách đọc”: tắt đi để luyện đọc chữ viết; khi cần vẫn bấm hiện được.',
  },
  speaking: {
    title: 'Luyện nói',
    with: 'Nếu trình duyệt có nhận dạng giọng nói, bấm micro và nói: ứng dụng cho biết nó nghe được gì. Đây chỉ là gợi ý gần đúng, không phải điểm phát âm.',
    without: 'Nếu không có (hoặc bạn không muốn bật micro), vẫn luyện được: nghe mẫu, nói theo, rồi tự đánh giá.',
    hint: 'Nghe chậm, nói to và rõ, lặp lại vài lần — so sánh với giọng mẫu quan trọng hơn kết quả nhận dạng.',
  },
  typing: {
    title: 'Gõ chữ trong bài tập',
    pinyin: 'Pinyin: gõ dấu (nǐ hǎo) hoặc số sau mỗi âm tiết (ni3 hao3). Thanh nhẹ không cần số. ü gõ là v (lv4 = lǜ). Không phân biệt hoa thường, khoảng trắng.',
    hanzi: 'Chữ Hán: cài bộ gõ “Chinese Simplified – Pinyin” của hệ điều hành, gõ pinyin không dấu rồi chọn chữ. Nếu chưa có bộ gõ, bấm “bảng chữ gợi ý” dưới ô nhập.',
    spelling: 'Tiếng Anh: gõ đúng chính tả; không phân biệt hoa thường, dấu câu và khoảng trắng thừa.',
    hangul: 'Tiếng Hàn: cài bàn phím tiếng Hàn (2-Set Korean) của hệ điều hành, hoặc dùng bảng âm tiết Hangul hiện dưới ô nhập.',
  },
  data: {
    title: 'Dữ liệu của bạn',
    body: 'Tiến độ của mọi ngôn ngữ lưu trong localStorage của trình duyệt, không gửi đi đâu và không cần tài khoản. Dữ liệu thuộc về trình duyệt và thiết bị đang dùng: mở trên máy khác sẽ là tiến độ trống. Dùng Cài đặt → Xuất dữ liệu để sao lưu và Khôi phục để chuyển sang thiết bị khác.',
  },
  limits: {
    title: 'Giới hạn hiện tại',
    audio: 'Âm thanh dùng giọng đọc có sẵn của trình duyệt; chất lượng phụ thuộc thiết bị và giọng đã cài. Một số chữ hoặc âm đơn lẻ có thể được đọc chưa tự nhiên.',
    noScoring: 'Không chấm điểm phát âm (nhận dạng giọng nói chỉ là gợi ý gần đúng) và không nhận dạng chữ viết tay / thứ tự nét.',
    lessons_one: 'Bản hiện tại có đầy đủ {{count}} ngày học đầu tiên cho mỗi ngôn ngữ; các bài tiếp theo hiển thị trong lộ trình là “Sắp có”.',
    lessons_other: 'Bản hiện tại có đầy đủ {{count}} ngày học đầu tiên cho mỗi ngôn ngữ; các bài tiếp theo hiển thị trong lộ trình là “Sắp có”.',
    framework: 'Lộ trình được sắp xếp theo các khung HSK, CEFR và TOPIK cho người mới bắt đầu nhưng chưa được đối chiếu chính thức với giáo trình hay kỳ thi.',
  },
};

export default guide;
