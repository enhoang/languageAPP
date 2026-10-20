const speak = {
  listen: 'Nghe mẫu',
  sayIt: 'Nói thử',
  listening: 'Đang nghe… hãy nói ngay',
  stop: 'Dừng',
  heard: 'Máy nghe được:',
  close: 'Nghe khá giống',
  noMatch: 'Chưa khớp — hãy thử lại hoặc tự so sánh bằng tai',
  error: {
    'no-speech': 'Không nghe thấy gì. Hãy nói to, rõ hơn và thử lại.',
    'not-allowed': 'Chưa được phép dùng micro. Hãy cho phép micro trong trình duyệt, hoặc dùng cách tự kiểm tra bên dưới.',
    network: 'Dịch vụ nhận dạng giọng nói cần kết nối mạng. Hãy kiểm tra mạng, hoặc dùng cách tự kiểm tra bên dưới.',
    unsupported: 'Trình duyệt này không hỗ trợ nhận dạng giọng nói.',
    other: 'Không nhận dạng được giọng nói. Hãy thử lại hoặc dùng cách tự kiểm tra.',
  },
  note: 'Nhận dạng giọng nói của trình duyệt chỉ là gợi ý gần đúng, không phải điểm phát âm, và không được lưu vào kết quả học.',
  unsupported: 'Trình duyệt này không có nhận dạng giọng nói. Hãy nghe mẫu, đọc to theo rồi tự đánh giá.',
  manual: 'Tự kiểm tra: nghe mẫu → đọc to theo → so sánh bằng tai.',
  good: 'Tôi đã nói tốt',
  again: 'Luyện lại',
  goodDone: 'Tốt lắm!',
  againDone: 'Nghe lại mẫu và thử thêm vài lần nhé.',
  /** progress of the self-check */
  progress: 'Đã nói tốt: {{done}}/{{total}}',
};

export default speak;
