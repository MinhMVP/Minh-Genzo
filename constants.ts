
import { Lesson, Quiz, VocabularyItem } from './types';

export const GRADES = Array.from({ length: 12 }, (_, i) => i + 1);

export const GRAMMAR_TENSES: Record<string, Lesson> = {
  'HTD': {
    id: 'HTD',
    title: 'Thì Hiện Tại Đơn (Present Simple)',
    category: 'grammar',
    content: 'Dùng để diễn tả một sự thật hiển nhiên, một thói quen hoặc hành động lặp đi lặp lại.',
    formula: 'S + V(s/es) + O',
    usage: [
      'Diễn tả thói quen: I go to school every day.',
      'Sự thật hiển nhiên: The sun rises in the East.',
      'Lịch trình cố định: The train leaves at 8 AM.'
    ],
    examples: ['She likes apples.', 'They don’t play football on Sundays.', 'Does he work here?']
  },
  'HTTD': {
    id: 'HTTD',
    title: 'Thì Hiện Tại Tiếp Diễn (Present Continuous)',
    category: 'grammar',
    content: 'Diễn tả hành động đang xảy ra tại thời điểm nói hoặc xung quanh thời điểm nói.',
    formula: 'S + am/is/are + V-ing',
    usage: [
      'Hành động đang diễn ra: I am studying now.',
      'Hành động sắp xảy ra (có kế hoạch): We are meeting tomorrow.',
      'Sự phàn nàn (với always): You are always losing your keys!'
    ],
    examples: ['They are playing soccer.', 'She isn’t watching TV.', 'Are you listening?']
  },
  'HTHT': {
    id: 'HTHT',
    title: 'Thì Hiện Tại Hoàn Thành (Present Perfect)',
    category: 'grammar',
    content: 'Diễn tả hành động đã hoàn thành tính đến thời điểm hiện tại mà không đề cập tới thời điểm cụ thể.',
    formula: 'S + have/has + V3/ed',
    usage: [
      'Hành động vừa mới xảy ra: I have just finished my homework.',
      'Hành động lặp lại nhiều lần: We have seen this movie three times.',
      'Kinh nghiệm: I have never been to Paris.'
    ],
    examples: ['He has lived here for 10 years.', 'We haven’t met before.', 'Have you ever eaten sushi?']
  },
  'QKD': {
    id: 'QKD',
    title: 'Thì Quá Khứ Đơn (Past Simple)',
    category: 'grammar',
    content: 'Diễn tả hành động đã xảy ra và kết thúc trong quá khứ.',
    formula: 'S + V2/ed + O',
    usage: [
      'Hành động đã chấm dứt: I visited my grandma yesterday.',
      'Chuỗi hành động trong quá khứ: He stood up, took his coat and left.'
    ],
    examples: ['She went to the cinema last night.', 'They didn’t come to the party.', 'Did you see that?']
  },
  'QKTD': {
    id: 'QKTD',
    title: 'Thì Quá Khứ Tiếp Diễn (Past Continuous)',
    category: 'grammar',
    content: 'Diễn tả hành động đang xảy ra tại một thời điểm xác định trong quá khứ.',
    formula: 'S + was/were + V-ing',
    usage: [
      'Hành động đang diễn ra tại điểm thời gian: At 8 PM yesterday, I was reading.',
      'Hành động đang diễn ra thì hành động khác xen vào: I was cooking when the phone rang.'
    ],
    examples: ['They were sleeping when I arrived.', 'What were you doing at that time?']
  },
  'TLD': {
    id: 'TLD',
    title: 'Thì Tương Lai Đơn (Future Simple)',
    category: 'grammar',
    content: 'Diễn tả hành động sẽ xảy ra trong tương lai hoặc quyết định tại thời điểm nói.',
    formula: 'S + will + V-inf',
    usage: [
      'Quyết định ngay lúc nói: I will call you back.',
      'Dự đoán không căn cứ: I think it will rain tomorrow.',
      'Lời hứa: I will always love you.'
    ],
    examples: ['He will be 20 next month.', 'They won’t tell anyone.', 'Will you help me?']
  }
};

export const CHILL_PLAYLIST = [
  { id: '1', title: 'Lofi Girl - Study Beats', url: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=0' },
  { id: '2', title: 'Coffee Shop Ambience', url: 'https://www.youtube.com/embed/lP26UCnoZNA?autoplay=1&mute=0' },
  { id: '3', title: 'Rainy Night Lofi', url: 'https://www.youtube.com/embed/5yx6BWlEVcY?autoplay=1&mute=0' },
];

export const MOCK_VOCABULARY: Record<number, VocabularyItem[]> = {
  1: [
    { word: 'Apple', pronunciation: '/ˈæp.əl/', meaning: 'Quả táo', example: 'I like eating apples.' },
    { word: 'Banana', pronunciation: '/bəˈnɑː.nə/', meaning: 'Quả chuối', example: 'The monkey eats a banana.' },
    { word: 'Cat', pronunciation: '/kæt/', meaning: 'Con mèo', example: 'The cat is sleeping.' },
  ],
  6: [
    { word: 'Adventure', pronunciation: '/ədˈven.tʃər/', meaning: 'Cuộc phiêu lưu', example: 'Life is a big adventure.' },
    { word: 'Environment', pronunciation: '/ɪnˈvaɪ.rən.mənt/', meaning: 'Môi trường', example: 'We should protect the environment.' },
  ],
  12: [
    { word: 'Phenomenon', pronunciation: '/fəˈnɒm.ɪ.nən/', meaning: 'Hiện tượng', example: 'Global warming is a dangerous phenomenon.' },
    { word: 'Sustainable', pronunciation: '/səˈsteɪ.nə.bəl/', meaning: 'Bền vững', example: 'We need sustainable energy sources.' },
    { word: 'Diversity', pronunciation: '/daɪˈvɜː.sə.ti/', meaning: 'Sự đa dạng', example: 'Cultural diversity is important.' },
  ]
};

export const MOCK_QUIZZES: Quiz[] = [
  {
    id: 'q1',
    title: 'Kiểm tra Giữa Kỳ I - Lớp 12',
    grade: 12,
    type: 'midterm',
    questions: [
      {
        id: '1',
        question: 'She _____ to school every day.',
        options: ['go', 'goes', 'going', 'went'],
        correctAnswer: 1,
        explanation: 'Thì hiện tại đơn diễn tả thói quen hằng ngày, chủ ngữ "She" nên động từ thêm "es".'
      },
      {
        id: '2',
        question: 'If I _____ you, I would take that job.',
        options: ['am', 'was', 'were', 'be'],
        correctAnswer: 2,
        explanation: 'Câu điều kiện loại 2, dùng "were" cho tất cả các ngôi.'
      }
    ]
  },
  {
    id: 'q2',
    title: 'Ôn tập 12 Thì Cơ Bản',
    grade: 12,
    type: 'regular',
    questions: [
      {
        id: '3',
        question: 'I _____ (see) that movie three times this year.',
        options: ['saw', 'have seen', 'had seen', 'am seeing'],
        correctAnswer: 1,
        explanation: 'Dùng HTHT vì hành động lặp lại nhiều lần đến hiện tại.'
      }
    ]
  }
];
