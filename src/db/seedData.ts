import { db, Vocabulary } from './database';

// Sample data cho HSK 1 (50 từ đầu tiên)
const hsk1Words: Omit<Vocabulary, 'id' | 'createdAt'>[] = [
  { word: '一', pinyin: 'yī', meaning: 'một', hskLevel: 1, example: '一个人', examplePinyin: 'yī gè rén' },
  { word: '二', pinyin: 'èr', meaning: 'hai', hskLevel: 1, example: '二月', examplePinyin: 'èr yuè' },
  { word: '三', pinyin: 'sān', meaning: 'ba', hskLevel: 1, example: '三个', examplePinyin: 'sān gè' },
  { word: '四', pinyin: 'sì', meaning: 'bốn', hskLevel: 1, example: '四月', examplePinyin: 'sì yuè' },
  { word: '五', pinyin: 'wǔ', meaning: 'năm', hskLevel: 1, example: '五月', examplePinyin: 'wǔ yuè' },
  { word: '六', pinyin: 'liù', meaning: 'sáu', hskLevel: 1, example: '六月', examplePinyin: 'liù yuè' },
  { word: '七', pinyin: 'qī', meaning: 'bảy', hskLevel: 1, example: '七月', examplePinyin: 'qī yuè' },
  { word: '八', pinyin: 'bā', meaning: 'tám', hskLevel: 1, example: '八月', examplePinyin: 'bā yuè' },
  { word: '九', pinyin: 'jiǔ', meaning: 'chín', hskLevel: 1, example: '九月', examplePinyin: 'jiǔ yuè' },
  { word: '十', pinyin: 'shí', meaning: 'mười', hskLevel: 1, example: '十月', examplePinyin: 'shí yuè' },
  { word: '人', pinyin: 'rén', meaning: 'người', hskLevel: 1, example: '中国人', examplePinyin: 'zhōng guó rén', radicals: '人' },
  { word: '大', pinyin: 'dà', meaning: 'lớn, to', hskLevel: 1, example: '大学', examplePinyin: 'dà xué', radicals: '大' },
  { word: '小', pinyin: 'xiǎo', meaning: 'nhỏ, bé', hskLevel: 1, example: '小孩', examplePinyin: 'xiǎo hái', radicals: '小' },
  { word: '中', pinyin: 'zhōng', meaning: 'giữa, trung', hskLevel: 1, example: '中国', examplePinyin: 'zhōng guó', radicals: '丨' },
  { word: '国', pinyin: 'guó', meaning: 'nước, quốc gia', hskLevel: 1, example: '中国', examplePinyin: 'zhōng guó', radicals: '囗' },
  { word: '学', pinyin: 'xué', meaning: 'học', hskLevel: 1, example: '学习', examplePinyin: 'xué xí', radicals: '子' },
  { word: '生', pinyin: 'shēng', meaning: 'sinh, sống', hskLevel: 1, example: '学生', examplePinyin: 'xué shēng', radicals: '生' },
  { word: '好', pinyin: 'hǎo', meaning: 'tốt, hay', hskLevel: 1, example: '你好', examplePinyin: 'nǐ hǎo', radicals: '女' },
  { word: '我', pinyin: 'wǒ', meaning: 'tôi', hskLevel: 1, example: '我们', examplePinyin: 'wǒ men', radicals: '戈' },
  { word: '你', pinyin: 'nǐ', meaning: 'bạn', hskLevel: 1, example: '你好', examplePinyin: 'nǐ hǎo', radicals: '亻' },
  { word: '他', pinyin: 'tā', meaning: 'anh ấy, cô ấy', hskLevel: 1, example: '他们', examplePinyin: 'tā men', radicals: '亻' },
  { word: '她', pinyin: 'tā', meaning: 'cô ấy', hskLevel: 1, example: '她们', examplePinyin: 'tā men', radicals: '女' },
  { word: '是', pinyin: 'shì', meaning: 'là', hskLevel: 1, example: '我是学生', examplePinyin: 'wǒ shì xué shēng', radicals: '日' },
  { word: '有', pinyin: 'yǒu', meaning: 'có', hskLevel: 1, example: '有书', examplePinyin: 'yǒu shū', radicals: '月' },
  { word: '在', pinyin: 'zài', meaning: 'ở, tại', hskLevel: 1, example: '在家', examplePinyin: 'zài jiā', radicals: '土' },
  { word: '来', pinyin: 'lái', meaning: 'đến', hskLevel: 1, example: '来中国', examplePinyin: 'lái zhōng guó', radicals: '木' },
  { word: '去', pinyin: 'qù', meaning: 'đi', hskLevel: 1, example: '去学校', examplePinyin: 'qù xué xiào', radicals: '厶' },
  { word: '看', pinyin: 'kàn', meaning: 'xem, nhìn', hskLevel: 1, example: '看书', examplePinyin: 'kàn shū', radicals: '目' },
  { word: '听', pinyin: 'tīng', meaning: 'nghe', hskLevel: 1, example: '听音乐', examplePinyin: 'tīng yīn yuè', radicals: '口' },
  { word: '说', pinyin: 'shuō', meaning: 'nói', hskLevel: 1, example: '说中文', examplePinyin: 'shuō zhōng wén', radicals: '讠' },
  { word: '做', pinyin: 'zuò', meaning: 'làm', hskLevel: 1, example: '做作业', examplePinyin: 'zuò zuò yè', radicals: '亻' },
  { word: '吃', pinyin: 'chī', meaning: 'ăn', hskLevel: 1, example: '吃饭', examplePinyin: 'chī fàn', radicals: '口' },
  { word: '喝', pinyin: 'hē', meaning: 'uống', hskLevel: 1, example: '喝水', examplePinyin: 'hē shuǐ', radicals: '口' },
  { word: '买', pinyin: 'mǎi', meaning: 'mua', hskLevel: 1, example: '买东西', examplePinyin: 'mǎi dōng xī', radicals: '乛' },
  { word: '卖', pinyin: 'mài', meaning: 'bán', hskLevel: 1, example: '卖东西', examplePinyin: 'mài dōng xī', radicals: '十' },
  { word: '家', pinyin: 'jiā', meaning: 'nhà, gia đình', hskLevel: 1, example: '回家', examplePinyin: 'huí jiā', radicals: '宀' },
  { word: '学校', pinyin: 'xué xiào', meaning: 'trường học', hskLevel: 1, example: '去学校', examplePinyin: 'qù xué xiào' },
  { word: '老师', pinyin: 'lǎo shī', meaning: 'thầy cô giáo', hskLevel: 1, example: '我的老师', examplePinyin: 'wǒ de lǎo shī' },
  { word: '朋友', pinyin: 'péng yǒu', meaning: 'bạn bè', hskLevel: 1, example: '好朋友', examplePinyin: 'hǎo péng yǒu' },
  { word: '今天', pinyin: 'jīn tiān', meaning: 'hôm nay', hskLevel: 1, example: '今天天气好', examplePinyin: 'jīn tiān tiān qì hǎo' },
  { word: '明天', pinyin: 'míng tiān', meaning: 'ngày mai', hskLevel: 1, example: '明天见', examplePinyin: 'míng tiān jiàn' },
  { word: '昨天', pinyin: 'zuó tiān', meaning: 'hôm qua', hskLevel: 1, example: '昨天我去了学校', examplePinyin: 'zuó tiān wǒ qù le xué xiào' },
  { word: '年', pinyin: 'nián', meaning: 'năm', hskLevel: 1, example: '今年', examplePinyin: 'jīn nián', radicals: '干' },
  { word: '月', pinyin: 'yuè', meaning: 'tháng, mặt trăng', hskLevel: 1, example: '一月', examplePinyin: 'yī yuè', radicals: '月' },
  { word: '日', pinyin: 'rì', meaning: 'ngày, mặt trời', hskLevel: 1, example: '今日', examplePinyin: 'jīn rì', radicals: '日' },
  { word: '时', pinyin: 'shí', meaning: 'giờ, thời gian', hskLevel: 1, example: '时间', examplePinyin: 'shí jiān', radicals: '日' },
  { word: '分', pinyin: 'fēn', meaning: 'phút, phân', hskLevel: 1, example: '分钟', examplePinyin: 'fēn zhōng', radicals: '刀' },
  { word: '现在', pinyin: 'xiàn zài', meaning: 'bây giờ', hskLevel: 1, example: '现在几点', examplePinyin: 'xiàn zài jǐ diǎn' },
  { word: '钱', pinyin: 'qián', meaning: 'tiền', hskLevel: 1, example: '多少钱', examplePinyin: 'duō shǎo qián', radicals: '钅' },
  { word: '书', pinyin: 'shū', meaning: 'sách', hskLevel: 1, example: '看书', examplePinyin: 'kàn shū', radicals: '乛' },
  { word: '水', pinyin: 'shuǐ', meaning: 'nước', hskLevel: 1, example: '喝水', examplePinyin: 'hē shuǐ', radicals: '水' },
  { word: '茶', pinyin: 'chá', meaning: 'trà', hskLevel: 1, example: '喝茶', examplePinyin: 'hē chá', radicals: '艹' },
];

export async function seedDatabase() {
  try {
    const count = await db.vocabularies.count();
    if (count === 0) {
      const wordsWithTimestamp = hsk1Words.map(word => ({
        ...word,
        createdAt: Date.now()
      }));
      await db.vocabularies.bulkAdd(wordsWithTimestamp as Vocabulary[]);
      console.log('Database seeded with', wordsWithTimestamp.length, 'words');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

