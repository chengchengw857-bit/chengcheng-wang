export interface Herb {
  id: string;
  name: {
    zh: string;
    en: string;
    pt: string;
  };
  image: string;
  properties: {
    nature: string;
    meridians: string[];
    functions: string[];
  };
  usage: string;
  sideEffects: string[];
  contraindications: string[];
}

export const herbs: Herb[] = [
  {
    id: 'huangqi',
    name: { zh: '黄芪', en: 'Astragalus', pt: 'Astragalus' },
    image: 'https://picsum.photos/seed/huangqi/400/300',
    properties: {
      nature: '甘，微温',
      meridians: ['脾', '肺'],
      functions: ['补气升阳', '固表止汗', '利水消肿']
    },
    usage: '煎服，15-30g。',
    sideEffects: ['口干', '便秘'],
    contraindications: ['表实邪盛', '气滞湿阻', '阴虚阳亢者禁用']
  },
  {
    id: 'danggui',
    name: { zh: '当归', en: 'Angelica Sinensis', pt: 'Angelica Sinensis' },
    image: 'https://picsum.photos/seed/danggui/400/300',
    properties: {
      nature: '甘、辛，温',
      meridians: ['肝', '心', '脾'],
      functions: ['补血活血', '调经止痛', '润肠通便']
    },
    usage: '煎服，6-15g。',
    sideEffects: ['腹泻', '腹痛'],
    contraindications: ['湿阻中满', '大便溏泄者慎用']
  }
];
