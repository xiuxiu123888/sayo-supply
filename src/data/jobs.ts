export type JobPosting = {
  slug: string;
  title: string;
  location: string;
  nature: string;
  headcount: string;
  gender: string;
  salary: string;
  validUntil: string;
  experience: string;
  education: string;
  language: string;
  description: string[];
  requirements: string[];
};

/** 招聘岗位（仅中文） */
export const jobs: JobPosting[] = [
  {
    slug: 'intl-logistics-sales',
    title: '国际物流销售',
    location: '全球',
    nature: '综合物流/大洋快运/拼箱部/运达人',
    headcount: '数名',
    gender: '不限制',
    salary: '面谈',
    validUntil: '长期有效',
    experience: '1年以上',
    education: '大专以上',
    language: '英语/俄语',
    description: [
      '结合公司资源，寻找潜在客户，通过电话，网络，拜访，展会等方式开拓俄罗斯，欧洲，中亚五国的市场并促成交易；',
      '根据客户需求，为客户设计并提供优质的国际物流解决方案，通过商务谈判促成客户达成合作；',
      '负责执行公司的业务计划和完成销售额指标。',
    ],
    requirements: [
      '专科及以上学历，专业不限；',
      '性格外向、表达能力强，具有较强的沟通能力及交际技巧，具有亲和力；',
      '有责任心，能承受较大的工作压力；',
      '同行物流公司1.5年及以上工作经验，英语或俄语沟通流畅。',
    ],
  },
];

export function getJobBySlug(slug: string): JobPosting | undefined {
  return jobs.find((job) => job.slug === slug);
}
