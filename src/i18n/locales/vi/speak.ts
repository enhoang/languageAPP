const speak = {
  listen: 'Nghe mẫu',
  sayIt: 'Nói thử',
  listening: 'Đang nghe… hãy nói ngay',
  stop: 'Dừng',
  heard: 'Máy nghe được:',
  error: {
    'no-speech': 'Không nghe thấy gì. Hãy nói to, rõ hơn và thử lại.',
    'not-allowed': 'Chưa được phép dùng micro. Hãy cho phép micro trong trình duyệt, hoặc dùng cách tự kiểm tra bên dưới.',
    network: 'Dịch vụ nhận dạng giọng nói cần kết nối mạng. Hãy kiểm tra mạng, hoặc dùng cách tự kiểm tra bên dưới.',
    unsupported: 'Trình duyệt này không hỗ trợ nhận dạng giọng nói.',
    other: 'Không nhận dạng được giọng nói. Hãy thử lại hoặc dùng cách tự kiểm tra.',
  },
  note: 'Nhận dạng giọng nói của trình duyệt chỉ là gợi ý gần đúng (so khớp chữ máy nghe được với câu mẫu), không phải điểm phát âm, và không được lưu vào kết quả học. Bạn có thể tự đổi mức đánh giá.',
  unsupported: 'Trình duyệt này không có nhận dạng giọng nói. Hãy nghe mẫu, đọc to theo rồi tự đánh giá.',
  manual: 'Tự kiểm tra: nghe mẫu → đọc to theo → so sánh bằng tai rồi tự chọn mức.',
  /** pronunciation levels, worst → best */
  level: {
    none: 'Không giống',
    retry: 'Phát âm lại',
    improve: 'Cần cải thiện',
    good: 'Tốt',
  },
  /** short advice after speech recognition */
  levelHint: {
    none: 'máy nghe ra một câu khác hẳn. Nghe lại mẫu rồi nói chậm, rõ từng âm.',
    retry: 'mới giống một phần. Nghe mẫu thêm lần nữa và nói lại.',
    improve: 'gần đúng rồi, còn vài âm chưa rõ. Chú ý các âm khác với mẫu.',
    good: 'máy nghe gần đúng như mẫu.',
  },
  rate: 'Đánh giá:',
  /** progress of the self-check */
  progress: 'Đã nói tốt: {{done}}/{{total}}',
};

export default speak;
