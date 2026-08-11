// Dynamic Scene Resolver for 100 Legal Quiz Questions
// Provides 25+ unique visual atmospheres combining photographic editorial scenes and typographic legal posters

export const photoScenes = {
  'constitution': {
    image: '/legal-scenes/constitution.png',
    title: 'КОНСТИТУЦИЯ РК',
    latinWord: 'CONSTITUTIO',
    latinQuote: 'Salus populi suprema lex esto',
    symbol: '§',
    accent: '#C3A15C',
    gradient: 'linear-gradient(135deg, #F7F4ED 0%, #E8E2D6 40%, #C7D7E3 100%)',
    tag: 'ОСНОВНОЙ ЗАКОН',
  },
  'senate-chamber': {
    image: '/legal-scenes/senate-chamber.png',
    title: 'СЕНАТ ПАРЛАМЕНТА',
    latinWord: 'SENATUS',
    latinQuote: 'Potestas in populo, auctoritas in senatu',
    symbol: '⚜',
    accent: '#172637',
    gradient: 'linear-gradient(145deg, #F7F4ED 0%, #DCE5ED 50%, #91AABD 100%)',
    tag: 'ЗАКОНОДАТЕЛЬНАЯ ВЛАСТЬ',
  },
  'parliament': {
    image: '/legal-scenes/parliament.png',
    title: 'ПАРЛАМЕНТ РК',
    latinWord: 'PARLAMENTUM',
    latinQuote: 'Vox populi, vox Dei',
    symbol: '⚜',
    accent: '#C3A15C',
    gradient: 'linear-gradient(135deg, #F7F4ED 0%, #ECE8DF 45%, #C7D7E3 100%)',
    tag: 'ПРЕДСТАВИТЕЛЬНЫЙ ОРГАН',
  },
  'courtroom': {
    image: '/legal-scenes/courtroom.png',
    title: 'СУДЕБНАЯ ВЛАСТЬ',
    latinWord: 'IUSTITIA',
    latinQuote: 'Audiatur et altera pars',
    symbol: '⚖',
    accent: '#C3A15C',
    gradient: 'linear-gradient(135deg, #F7F4ED 0%, #ECE8DF 35%, #C7D7E3 75%, #172637 100%)',
    tag: 'ПРАВОСУДИЕ',
  },
  'bi-court': {
    image: '/legal-scenes/bi-court.png',
    title: 'СУД БИЕВ · ТРАДИЦИЯ ПРАВА',
    latinWord: 'TRADITIO',
    latinQuote: 'Тура биде туған жоқ',
    symbol: '⚖',
    accent: '#C3A15C',
    gradient: 'linear-gradient(135deg, #F7F4ED 0%, #ECE8DF 50%, #D9C58F 100%)',
    tag: 'ВЕЛИКИЕ БИИ КАЗАХСКИХ ЖУЗОВ',
  },
  'aifc-court': {
    image: '/legal-scenes/aifc-court.png',
    title: 'МФЦА · МЕЖДУНАРОДНЫЙ СУД',
    latinWord: 'ARBITRIUM',
    latinQuote: 'Pacta sunt servanda',
    symbol: '✧',
    accent: '#91AABD',
    gradient: 'linear-gradient(145deg, #F7F4ED 0%, #DDE8F0 50%, #91AABD 100%)',
    tag: 'МЕЖДУНАРОДНОЕ ПРАВО',
  },
  'advocate-desk': {
    image: '/legal-scenes/advocate-desk.png',
    title: 'ИНСТИТУТ АДВОКАТУРЫ',
    latinWord: 'ADVOCATIO',
    latinQuote: 'Nemo damnetur inauditus',
    symbol: '§',
    accent: '#C3A15C',
    gradient: 'linear-gradient(135deg, #F7F4ED 0%, #ECE8DF 40%, #D9C58F 100%)',
    tag: 'КВАЛИФИЦИРОВАННАЯ ЗАЩИТА',
  },
  'state-architecture': {
    image: '/legal-scenes/state-architecture.png',
    title: 'ГОСУДАРСТВЕННАЯ ВЛАСТЬ',
    latinWord: 'IMPERIUM',
    latinQuote: 'Salus rei publicae suprema lex',
    symbol: '⚜',
    accent: '#172637',
    gradient: 'linear-gradient(155deg, #F7F4ED 0%, #ECE8DF 30%, #C7D7E3 75%, #172637 100%)',
    tag: 'ГОСУДАРСТВЕННОЕ УСТРОЙСТВО',
  },
  'human-rights': {
    image: '/legal-scenes/human-rights.png',
    title: 'ПРАВА И СВОБОДЫ ЧЕЛОВЕКА',
    latinWord: 'LIBERTAS',
    latinQuote: 'Homines liberi et aequales nascuntur',
    symbol: '✦',
    accent: '#C3A15C',
    gradient: 'linear-gradient(135deg, #F7F4ED 0%, #D9C58F 30%, #C7D7E3 100%)',
    tag: 'ВЫСШАЯ ЦЕННОСТЬ',
  },
  'rights-protection': {
    image: '/legal-scenes/rights-protection.png',
    title: 'ОМБУДСМЕН И ЗАЩИТА ПРАВ',
    latinWord: 'TUTELA',
    latinQuote: 'Iustitia omnibus danda est',
    symbol: '⚖',
    accent: '#C3A15C',
    gradient: 'linear-gradient(145deg, #F7F4ED 0%, #C7D7E3 45%, #91AABD 100%)',
    tag: 'ПРАВОЗАЩИТНЫЙ ИНСТИТУТ',
  },
  'juvenile-justice': {
    image: '/legal-scenes/juvenile-justice.png',
    title: 'ЮВЕНАЛЬНАЯ ЮСТИЦИЯ',
    latinWord: 'IUVENTUS',
    latinQuote: 'In dubio pro reo',
    symbol: '✧',
    accent: '#C7D7E3',
    gradient: 'linear-gradient(160deg, #F7F4ED 0%, #ECE8DF 40%, #C7D7E3 100%)',
    tag: 'ЗАЩИТА ПРАВ РЕБЁНКА',
  },
  'civic-dialogue': {
    image: '/legal-scenes/civic-dialogue.png',
    title: 'ГРАЖДАНСКОЕ ОБЩЕСТВО',
    latinWord: 'CIVITAS',
    latinQuote: 'Civitas est constitutio quaedam',
    symbol: '✦',
    accent: '#91AABD',
    gradient: 'linear-gradient(160deg, #F7F4ED 0%, #ECE8DF 30%, #C7D7E3 100%)',
    tag: 'ОБЩЕСТВЕННЫЕ ИНСТИТУТЫ',
  },
  'mediation': {
    image: '/legal-scenes/mediation.png',
    title: 'МЕДИАЦИЯ И СОГЛАСИЕ',
    latinWord: 'MEDIATIO',
    latinQuote: 'Concordia parvae res crescunt',
    symbol: '⊕',
    accent: '#91AABD',
    gradient: 'linear-gradient(145deg, #F7F4ED 0%, #ECE8DF 50%, #C7D7E3 100%)',
    tag: 'ДОСУДЕБНОЕ УРЕГУЛИРОВАНИЕ',
  },
};

export const typographicScenes = {
  'typo-lex': {
    type: 'typographic',
    latinWord: 'LEX',
    title: 'ТЕОРИЯ ПРАВА',
    symbol: '§',
    latinQuote: 'Dura lex, sed lex',
    accent: '#91AABD',
    gradient: 'linear-gradient(135deg, #F7F4ED 0%, #ECE8DF 45%, #C7D7E3 100%)',
    tag: 'НОРМАТИВНОСТЬ И ЗАКОН',
    articles: ['Ст. 1', 'Ст. 4', 'Ст. 12'],
  },
  'typo-norma': {
    type: 'typographic',
    latinWord: 'NORMA',
    title: 'ПРАВОВЫЕ ОТНОШЕНИЯ',
    symbol: '⚖',
    latinQuote: 'Nemo censetur ignorare legem',
    accent: '#C3A15C',
    gradient: 'linear-gradient(160deg, #F7F4ED 0%, #E8E2D6 35%, #C7D7E3 80%)',
    tag: 'СУБЪЕКТ · ОБЪЕКТ · СОДЕРЖАНИЕ',
    articles: ['Ст. 14', 'Ст. 21'],
  },
  'typo-status': {
    type: 'typographic',
    latinWord: 'STATUS',
    title: 'ПРАВОСУБЪЕКТНОСТЬ',
    symbol: '§',
    latinQuote: 'Ius est ars boni et aequi',
    accent: '#91AABD',
    gradient: 'linear-gradient(145deg, #F7F4ED 0%, #DDE8F0 50%, #91AABD 100%)',
    tag: 'ПРАВОСПОСОБНОСТЬ · ДЕЕСПОСОБНОСТЬ',
    articles: ['Ст. 13', 'Ст. 15'],
  },
  'typo-cultura': {
    type: 'typographic',
    latinWord: 'CULTURA',
    title: 'ПРАВОВАЯ КУЛЬТУРА',
    symbol: '✧',
    latinQuote: 'Ignorantia iuris nocet',
    accent: '#C3A15C',
    gradient: 'linear-gradient(135deg, #F7F4ED 0%, #ECE8DF 55%, #D9C58F 100%)',
    tag: 'ТОЛКОВАНИЕ И ПРАВОСОЗНАНИЕ',
    articles: ['Ст. 39', 'Ст. 77'],
  },
  'typo-imperium': {
    type: 'typographic',
    latinWord: 'IMPERIUM',
    title: 'ФОРМА ГОСУДАРСТВА',
    symbol: '⚜',
    latinQuote: 'Regere imperio populos',
    accent: '#172637',
    gradient: 'linear-gradient(155deg, #F7F4ED 0%, #ECE8DF 30%, #C7D7E3 75%, #172637 100%)',
    tag: 'МОНАРХИЯ · РЕСПУБЛИКА · ФЕДЕРАЦИЯ',
    articles: ['Ст. 2', 'Ст. 91'],
  },
  'typo-iustitia': {
    type: 'typographic',
    latinWord: 'IUSTITIA',
    title: 'ПРИНЦИПЫ ПРАВОСУДИЯ',
    symbol: '⚖',
    latinQuote: 'Iustitia est fundamentum regnorum',
    accent: '#C3A15C',
    gradient: 'linear-gradient(135deg, #F7F4ED 0%, #ECE8DF 40%, #C7D7E3 80%, #172637 100%)',
    tag: 'ПРЕЗУМПЦИЯ НЕВИНОВНОСТИ',
    articles: ['Ст. 77', 'Ст. 78'],
  },
};

// Map each question to a specific scene for rich visual diversity
export function resolveQuestionScene(question, questionIndex) {
  const qId = question.id;
  const topic = question.topic || '';
  const text = question.question || '';
  const theme = question.theme || '';

  // 1. Biys Court (Specific historical Kazakh justice questions)
  if (qId === 91 || text.includes('биев') || text.includes('Толе би') || text.includes('Казыбек би')) {
    return { ...photoScenes['bi-court'], hasImage: true, layoutVariant: 'A' };
  }

  // 2. AIFC / Commercial Arbitration (Q43, Q95)
  if (qId === 95 || text.includes('МФЦА') || text.includes('арбитраж')) {
    return { ...photoScenes['aifc-court'], hasImage: true, layoutVariant: 'A' };
  }

  // 3. Advocate / Defense (Q57)
  if (qId === 57 || text.includes('адвокат')) {
    return { ...photoScenes['advocate-desk'], hasImage: true, layoutVariant: 'A' };
  }

  // 4. Senate & Majilis & Ancient Parliament (Q79, Q80, Q81, Q82)
  if (qId === 79 || qId === 80) {
    return { ...photoScenes['parliament'], hasImage: true, layoutVariant: 'A' };
  }
  if (qId === 81 || qId === 82) {
    return { ...photoScenes['senate-chamber'], hasImage: true, layoutVariant: 'B' };
  }

  // 5. Presidency & Akimats & Government (Q75, Q78, Q83, Q84, Q85, Q86, Q87)
  if (qId === 75 || qId === 78 || qId === 83) {
    return { ...photoScenes['state-architecture'], hasImage: true, layoutVariant: 'A' };
  }
  if (qId === 84 || qId === 85 || qId === 86 || qId === 87) {
    return { ...photoScenes['parliament'], hasImage: true, layoutVariant: 'B' };
  }

  // 6. Court system & Judges & Guarantee of Independence (Q88, Q89, Q90, Q92, Q93, Q94, Q96, Q97, Q98, Q99, Q100)
  if (theme === 'judiciary') {
    if (qId % 2 === 0) {
      return { ...photoScenes['courtroom'], hasImage: true, layoutVariant: 'A' };
    } else {
      return { ...photoScenes['aifc-court'], hasImage: true, layoutVariant: 'B' };
    }
  }

  // 7. Constitution of RK (Q30, Q72, Q73, Q74, Q76)
  if (theme === 'constitutional-law' || text.includes('Конституци')) {
    return { ...photoScenes['constitution'], hasImage: true, layoutVariant: qId % 2 === 0 ? 'A' : 'B' };
  }

  // 8. Human rights & International declarations (Q28, Q37, Q39, Q41, Q44, Q46, Q48, Q51)
  if (theme === 'human-rights') {
    return { ...photoScenes['human-rights'], hasImage: true, layoutVariant: qId % 2 === 0 ? 'A' : 'B' };
  }

  // 9. Rights protection & Ombudsman (Q47, Q49, Q53, Q56, Q58)
  if (theme === 'rights-protection' || text.includes('омбудсмен')) {
    return { ...photoScenes['rights-protection'], hasImage: true, layoutVariant: 'A' };
  }

  // 10. Juvenile justice & Child rights & Teacher status (Q52, Q55, Q59, Q60)
  if (theme === 'juvenile-justice' || text.includes('ювенал') || text.includes('педагог') || text.includes('инвалид') || text.includes('ограниченными возможностями')) {
    return { ...photoScenes['juvenile-justice'], hasImage: true, layoutVariant: 'A' };
  }

  // 11. Mediation & Conflict resolution (Q43, Q45, Q50, Q54)
  if (theme === 'legal-conflicts' || text.includes('медиаци')) {
    return { ...photoScenes['mediation'], hasImage: true, layoutVariant: 'A' };
  }

  // 12. Civic society & NGOs & Media (Q31, Q32, Q33, Q34, Q35, Q36, Q38, Q40, Q42)
  if (theme === 'civil-society' || text.includes('гражданск') || text.includes('НПО') || text.includes('СМИ')) {
    return { ...photoScenes['civic-dialogue'], hasImage: true, layoutVariant: qId % 2 === 0 ? 'A' : 'B' };
  }

  // 13. State Form (Q11, Q19, Q21, Q22, Q23, Q24, Q26)
  if (theme === 'state-form') {
    if (qId === 23 || qId === 24) {
      return { ...photoScenes['state-architecture'], hasImage: true, layoutVariant: 'A' };
    }
    return { ...typographicScenes['typo-imperium'], hasImage: false, layoutVariant: 'D' };
  }

  // 14. Rule of Law (Q25, Q27, Q29)
  if (theme === 'rule-of-law') {
    return { ...photoScenes['courtroom'], hasImage: true, layoutVariant: 'A' };
  }

  // 15. Legal Culture & Interpretation & Offenses (Q61, Q62, Q63, Q64, Q65, Q66, Q67, Q68, Q69, Q70, Q71)
  if (theme === 'legal-culture') {
    const typoKeys = ['typo-cultura', 'typo-lex', 'typo-iustitia'];
    const selectedTypo = typoKeys[qId % typoKeys.length];
    return { ...typographicScenes[selectedTypo], hasImage: false, layoutVariant: qId % 2 === 0 ? 'C' : 'D' };
  }

  // 16. Legal Relations / Legal Capacity (Q7, Q9, Q12, Q14, Q16)
  if (theme === 'legal-relations') {
    return { ...typographicScenes['typo-status'], hasImage: false, layoutVariant: qId % 2 === 0 ? 'C' : 'D' };
  }

  // 17. Legal Theory / Law Concept / Sources / Norms (Q1, Q2, Q3, Q4, Q5, Q6, Q8, Q10, Q13, Q15, Q17, Q18, Q20)
  if (theme === 'legal-theory' || theme === 'state-and-law') {
    const typoPool = ['typo-lex', 'typo-norma', 'typo-status', 'typo-imperium'];
    const selected = typoPool[qId % typoPool.length];
    return { ...typographicScenes[selected], hasImage: false, layoutVariant: qId % 2 === 0 ? 'C' : 'D' };
  }

  // Fallback default
  return { ...typographicScenes['typo-lex'], hasImage: false, layoutVariant: 'C' };
}
