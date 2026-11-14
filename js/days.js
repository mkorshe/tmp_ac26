/* «23 пари» · адвент-календар 2026 · вміст днів українською та англійською.
   Довжини хромосом і положення центромер: збірка GRCh38; кількість генів: округлені оцінки Ensembl/GENCODE.
   Дні 1–5 розгорнуті повністю й мають інтерактивні графіки (js/viz.js); дні 6–24 мають заголовок і тезу. */
window.ADVENT_DAYS = [
  {
    d: 1, chr: "1", len: 248.96, cen: 123.4, genes: 2050, gene: "MTHFR", band: "1p36.22", pos: 11.8, ready: true,
    viz: [{ id: "folate", after: "known" }],
    uk: {
      title: "Фолатний цикл і найвідоміший міф",
      intro: "Найбільша хромосома людини: майже 249 мільйонів пар нуклеотидів, близько 8% усієї ДНК клітини і приблизно дві тисячі генів, що кодують білки.",
      role: "MTHFR кодує фермент метилентетрагідрофолатредуктазу. Він перетворює фолат на форму, потрібну для переробки гомоцистеїну на метіонін.",
      known: "Поширений варіант C677T робить фермент менш стабільним. Дві його копії має приблизно кожен восьмий європеєць. За однакового споживання фолієвої кислоти рівень фолату в крові таких людей у середньому лише на 16% нижчий.",
      not: "Це не діагноз і не привід змінювати форму чи дозу фолату. Клінічних рекомендацій перевіряти MTHFR або коригувати споживання фолату за генотипом немає: раціон зазвичай важить більше, ніж генотип.",
      habit: "Листова зелень, бобові та цитрусові — джерела фолату за будь-якого генотипу.",
      habitFact: "Рекомендація CDC однакова для всіх: 400 мкг фолієвої кислоти щодня жінкам, які можуть завагітніти, незалежно від варіанта MTHFR.",
      sources: "Frosst et al., Nature Genetics, 1995; Tsang et al., American Journal of Clinical Nutrition, 2015; 1000 Genomes Project, фаза 3; CDC, MTHFR Gene Variant and Folic Acid Facts"
    },
    en: {
      title: "The folate cycle and the best-known myth",
      intro: "The largest human chromosome: almost 249 million base pairs, about 8% of all the DNA in a cell and roughly two thousand protein-coding genes.",
      role: "MTHFR encodes the enzyme methylenetetrahydrofolate reductase. It converts folate into the form needed to turn homocysteine into methionine.",
      known: "The common C677T variant makes the enzyme less stable. About one in eight Europeans carries two copies. At the same folic acid intake, their blood folate is on average only 16% lower.",
      not: "This is not a diagnosis and not a reason to change the form or dose of folate. There are no clinical recommendations to test MTHFR or to adjust folate intake by genotype: diet usually matters more than genotype.",
      habit: "Leafy greens, legumes and citrus fruit are sources of folate whatever your genotype.",
      habitFact: "The CDC recommendation is the same for everyone: 400 mcg of folic acid daily for women who could become pregnant, regardless of MTHFR variant.",
      sources: "Frosst et al., Nature Genetics, 1995; Tsang et al., American Journal of Clinical Nutrition, 2015; 1000 Genomes Project, phase 3; CDC, MTHFR Gene Variant and Folic Acid Facts"
    }
  },
  {
    d: 2, chr: "2", len: 242.19, cen: 93.9, genes: 1300, gene: "LCT", band: "2q21.3", pos: 135.85, ready: true,
    viz: [{ id: "fusion", after: "intro" }, { id: "lactase", after: "known" }],
    uk: {
      title: "Молоко і слід еволюції",
      intro: "Друга за розміром: 242 мільйони пар нуклеотидів. У людиноподібних мавп на її місці дві окремі хромосоми. У наших предків вони злилися, тому в людини 23 пари, а в шимпанзе 24.",
      role: "LCT кодує лактазу, фермент, що розщеплює молочний цукор. Регуляторний варіант у сусідньому гені MCM6 пов’язаний зі збереженням активності лактази в дорослому віці.",
      known: "У європейських вибірках цей варіант трапляється приблизно на кожній другій хромосомі, а на півночі Європи значно частіше. Достатньо однієї копії.",
      not: "Генотип не вимірює, як ви переносите молоко: самопочуття залежить від порції, продукту й мікробіому. Симптоми оцінює лікар, а не ДНК-звіт.",
      habit: "Ферментовані продукти (йогурт, кефір, витримані сири) містять менше лактози, ніж свіже молоко.",
      habitFact: "У склянці молока близько 12 г лактози. За висновком консенсусу NIH, більшість людей зі зниженою активністю лактази переносить таку порцію за один раз без симптомів або з мінімальними.",
      sources: "Enattah et al., Nature Genetics, 2002; IJdo et al., PNAS, 1991; Tishkoff et al., Nature Genetics, 2007; 1000 Genomes Project, фаза 3; NIH Consensus Development Conference on Lactose Intolerance, 2010"
    },
    en: {
      title: "Milk and a trace of evolution",
      intro: "The second largest: 242 million base pairs. In the great apes its place is taken by two separate chromosomes. In our ancestors they fused, which is why humans have 23 pairs and chimpanzees 24.",
      role: "LCT encodes lactase, the enzyme that breaks down milk sugar. A regulatory variant in the neighbouring MCM6 gene is linked to lactase staying active in adulthood.",
      known: "In European samples the variant is found on roughly every second chromosome, and far more often in northern Europe. One copy is enough.",
      not: "Genotype does not measure how you tolerate milk: how you feel depends on the portion, the product and the microbiome. Symptoms are assessed by a doctor, not a DNA report.",
      habit: "Fermented products (yoghurt, kefir, aged cheeses) contain less lactose than fresh milk.",
      habitFact: "A glass of milk holds about 12 g of lactose. According to the NIH consensus conference, most people with reduced lactase activity tolerate that amount in one sitting with no or minimal symptoms.",
      sources: "Enattah et al., Nature Genetics, 2002; IJdo et al., PNAS, 1991; Tishkoff et al., Nature Genetics, 2007; 1000 Genomes Project, phase 3; NIH Consensus Development Conference on Lactose Intolerance, 2010"
    }
  },
  {
    d: 3, chr: "3", len: 198.3, cen: 90.9, genes: 1080, gene: "PPARG", band: "3p25.2", pos: 12.35, ready: true,
    viz: [{ id: "dpp", after: "known" }],
    uk: {
      title: "Диригент жирової тканини",
      intro: "198 мільйонів пар нуклеотидів і близько 1 080 генів, серед яких гени обміну заліза, кальцію та довжини теломер.",
      role: "PPARG кодує ядерний рецептор PPARγ. Він керує дозріванням жирових клітин і чутливістю тканин до інсуліну.",
      known: "Варіант Pro12Ala став першою поширеною генетичною асоціацією з діабетом 2 типу, яку вдалося надійно відтворити. Поширений алель Pro є на 85% хромосом і пов’язаний зі скромним, у 1,25 раза, підвищенням ризику.",
      not: "Ефект одного варіанта малий: він не визначає, чи виникне порушення обміну глюкози. Рівень глюкози показує лише аналіз крові.",
      habit: "Рух, сон і маса тіла впливають на чутливість до інсуліну за будь-якого генотипу.",
      habitFact: "У програмі профілактики діабету, де взяли участь понад 3 000 людей із високим ризиком, зміна способу життя знизила захворюваність на діабет 2 типу на 58%.",
      sources: "Altshuler et al., Nature Genetics, 2000; Knowler et al., New England Journal of Medicine, 2002"
    },
    en: {
      title: "The conductor of fat tissue",
      intro: "198 million base pairs and about 1,080 genes, among them genes for iron and calcium metabolism and telomere length.",
      role: "PPARG encodes the nuclear receptor PPARγ. It governs the maturation of fat cells and how sensitive tissues are to insulin.",
      known: "The Pro12Ala variant was the first common genetic association with type 2 diabetes to be reliably replicated. The common Pro allele sits on 85% of chromosomes and is linked to a modest, 1.25-fold, increase in risk.",
      not: "The effect of a single variant is small: it does not determine whether glucose metabolism will be impaired. Only a blood test shows your glucose level.",
      habit: "Movement, sleep and body weight affect insulin sensitivity whatever your genotype.",
      habitFact: "In the Diabetes Prevention Program, which enrolled more than 3,000 people at high risk, lifestyle change cut the incidence of type 2 diabetes by 58%.",
      sources: "Altshuler et al., Nature Genetics, 2000; Knowler et al., New England Journal of Medicine, 2002"
    }
  },
  {
    d: 4, chr: "4", len: 190.21, cen: 50.0, genes: 750, gene: "CLOCK", band: "4q12", pos: 55.44, ready: true,
    viz: [{ id: "clock", after: "role" }],
    uk: {
      title: "Шестерня внутрішнього годинника",
      intro: "190 мільйонів пар нуклеотидів і близько 750 генів. Тут же гени транспорту вітаміну D, обміну сечової кислоти й алкоголю.",
      role: "CLOCK кодує білок, який разом із партнером BMAL1 запускає добовий цикл активності генів майже в кожній клітині. За розкриття молекулярного механізму циркадних ритмів у 2017 році присуджено Нобелівську премію.",
      known: "У дослідженні 1998 року носії варіанта 3111C мали зсув бажаного часу сну й активності на 10–44 хвилини в бік вечора. Пізніші роботи підтвердили це не всюди, і сьогодні хронотип розглядають як полігенну ознаку з сотнями сигналів.",
      not: "Один варіант не робить людину «совою». Світло, розклад і вік зсувають годинник сильніше.",
      habit: "Ранкове денне світло й стабільний час підйому — найдієвіші сигнали для внутрішнього годинника.",
      habitFact: "Дорослим радять спати щонайменше 7 годин на добу: такий висновок консенсусу Американської академії медицини сну.",
      sources: "Katzenberg et al., Sleep, 1998; Czeisler et al., Science, 1999; Zhang et al., PNAS, 2014; Watson et al., Sleep, 2015; Takahashi, Nature Reviews Genetics, 2017; Jones et al., Nature Communications, 2019"
    },
    en: {
      title: "A cog in the inner clock",
      intro: "190 million base pairs and about 750 genes. Also here: genes for vitamin D transport and for uric acid and alcohol metabolism.",
      role: "CLOCK encodes a protein that, together with its partner BMAL1, drives the daily cycle of gene activity in almost every cell. The 2017 Nobel Prize was awarded for uncovering the molecular mechanism of circadian rhythms.",
      known: "In a 1998 study, carriers of the 3111C variant had their preferred sleep and activity times shifted 10–44 minutes towards the evening. Later studies did not always confirm this, and chronotype is now seen as a polygenic trait with hundreds of signals.",
      not: "A single variant does not make someone an “owl”. Light, schedule and age shift the clock more strongly.",
      habit: "Morning daylight and a steady wake-up time are the most effective signals for the inner clock.",
      habitFact: "Adults are advised to sleep at least 7 hours a night: that is the consensus of the American Academy of Sleep Medicine.",
      sources: "Katzenberg et al., Sleep, 1998; Czeisler et al., Science, 1999; Zhang et al., PNAS, 2014; Watson et al., Sleep, 2015; Takahashi, Nature Reviews Genetics, 2017; Jones et al., Nature Communications, 2019"
    }
  },
  {
    d: 5, chr: "5", len: 181.54, cen: 48.8, genes: 880, gene: "TERT", band: "5p15.33", pos: 1.29, ready: true,
    viz: [{ id: "telomere", after: "role" }],
    uk: {
      title: "Фермент, що береже кінці хромосом",
      intro: "181,5 мільйона пар нуклеотидів і близько 880 генів: від пігментації та рецептора кортизолу до алергічної відповіді.",
      role: "TERT кодує каталітичну частину теломерази. Цей фермент добудовує теломери: захисні повтори на кінцях хромосом, які коротшають із кожним поділом клітини. За відкриття теломер і теломерази присуджено Нобелівську премію 2009 року.",
      known: "У дослідженні 472 174 учасників UK Biobank довжину теломер лейкоцитів пов’язали зі 197 варіантами у 138 ділянках геному, серед яких і TERT.",
      not: "Генетично асоційована довжина теломер — не виміряний біологічний вік. І довші теломери не є «кращими» за всіх обставин: їх пов’язують і з вищою схильністю до деяких новоутворень.",
      habit: "У спостережних дослідженнях куріння, хронічний стрес і брак сну пов’язані з коротшими теломерами.",
      habitFact: "У дослідженні 1 122 жінок теломери лейкоцитів коротшали в середньому на 27 пар нуклеотидів на рік, у жінок з ожирінням були на 240 пар коротші, а куріння давало дозозалежний ефект.",
      sources: "Allsopp et al., PNAS, 1992; Valdes et al., Lancet, 2005; Codd et al., Nature Genetics, 2021"
    },
    en: {
      title: "The enzyme that guards chromosome ends",
      intro: "181.5 million base pairs and about 880 genes: from pigmentation and the cortisol receptor to the allergic response.",
      role: "TERT encodes the catalytic part of telomerase. This enzyme rebuilds telomeres: protective repeats at the ends of chromosomes that shorten with every cell division. The 2009 Nobel Prize was awarded for the discovery of telomeres and telomerase.",
      known: "In a study of 472,174 UK Biobank participants, leukocyte telomere length was linked to 197 variants in 138 regions of the genome, TERT among them.",
      not: "Genetically associated telomere length is not a measured biological age. And longer telomeres are not “better” in every respect: they are also linked to a higher likelihood of some neoplasms.",
      habit: "In observational studies, smoking, chronic stress and lack of sleep are associated with shorter telomeres.",
      habitFact: "In a study of 1,122 women, leukocyte telomeres shortened by an average of 27 base pairs a year, were 240 base pairs shorter in women with obesity, and smoking showed a dose-dependent effect.",
      sources: "Allsopp et al., PNAS, 1992; Valdes et al., Lancet, 2005; Codd et al., Nature Genetics, 2021"
    }
  },

  /* ---------- Дні 6–24: заголовок і теза ---------- */
  { d: 6, chr: "6", len: 170.81, cen: 59.8, genes: 1050, gene: "HLA", band: "6p21.3", pos: 31.0,
    uk: { title: "Імунний штрихкод", hook: "Найрізноманітніша ділянка геному. Комплекс HLA визначає, які фрагменти мікробів імунна система показує своїм клітинам, і з ним пов’язано більше ознак, ніж із будь-якою іншою ділянкою." },
    en: { title: "The immune barcode", hook: "The most diverse region of the genome. The HLA complex determines which fragments of microbes the immune system displays to its own cells, and more traits are linked to it than to any other region." } },
  { d: 7, chr: "7", len: 159.35, cen: 60.1, genes: 990, gene: "TAS2R38", band: "7q34", pos: 141.97,
    uk: { title: "Чому броколі гірка не всім", hook: "Рецептор гіркого смаку. Поширені варіанти гена ділять людей на тих, хто гостро відчуває гіркоту, і тих, хто її майже не помічає." },
    en: { title: "Why broccoli isn’t bitter to everyone", hook: "A bitter taste receptor. Common variants of the gene divide people into those who taste bitterness sharply and those who barely notice it." } },
  { d: 8, chr: "8", len: 145.14, cen: 45.2, genes: 680, gene: "LPL", band: "8p21.3", pos: 19.96,
    uk: { title: "Воротар тригліцеридів", hook: "Ліпопротеїнліпаза розщеплює тригліцериди крові, щоб жирні кислоти потрапили у м’язи та жирову тканину. Один із класичних генів ліпідного профілю." },
    en: { title: "The gatekeeper of triglycerides", hook: "Lipoprotein lipase breaks down triglycerides in the blood so that fatty acids can reach muscle and fat tissue. One of the classic genes of the lipid profile." } },
  { d: 9, chr: "9", len: 138.39, cen: 43.0, genes: 780, gene: "ABO", band: "9q34.2", pos: 133.25,
    uk: { title: "Група крові", hook: "Один ген, три основні варіанти, чотири групи крові. Система AB0 відкрита на початку XX століття і досі з’являється в повногеномних дослідженнях: від згортання крові до обміну заліза." },
    en: { title: "Blood group", hook: "One gene, three main variants, four blood groups. The ABO system was discovered in the early 20th century and still turns up in genome-wide studies: from blood clotting to iron metabolism." } },
  { d: 10, chr: "10", len: 133.8, cen: 39.8, genes: 730, gene: "TCF7L2", band: "10q25.2", pos: 113.0,
    uk: { title: "Найсильніший поширений сигнал глюкози", hook: "Варіант у TCF7L2 — найвпливовіша з поширених генетичних асоціацій із діабетом 2 типу. Ген бере участь у секреції інсуліну." },
    en: { title: "The strongest common glucose signal", hook: "A variant in TCF7L2 is the most influential common genetic association with type 2 diabetes. The gene is involved in insulin secretion." } },
  { d: 11, chr: "11", len: 135.09, cen: 53.4, genes: 1300, gene: "ACTN3", band: "11q13.2", pos: 66.56,
    uk: { title: "Білок швидких волокон", hook: "Приблизно кожен п’ятий європеєць не має α-актиніну-3, білка швидких м’язових волокон. На здоров’я це не впливає, а серед елітних спринтерів такий генотип рідкість. Одна з найбагатших на відомі гени хромосом." },
    en: { title: "The fast-fibre protein", hook: "About one in five Europeans lacks α-actinin-3, a protein of fast muscle fibres. It has no effect on health, yet this genotype is rare among elite sprinters. One of the chromosomes richest in well-known genes." } },
  { d: 12, chr: "12", len: 133.28, cen: 35.5, genes: 1030, gene: "ALDH2", band: "12q24.12", pos: 111.8,
    uk: { title: "Рум’янець після келиха", hook: "Варіант ALDH2 сповільнює знешкодження ацетальдегіду, продукту розпаду алкоголю. Він поширений у Східній Азії й майже не трапляється в європейців." },
    en: { title: "A flush after a glass", hook: "The ALDH2 variant slows the clearance of acetaldehyde, a breakdown product of alcohol. It is common in East Asia and almost absent in Europeans." } },
  { d: 13, chr: "13", len: 114.36, cen: 17.7, genes: 320, gene: "KL", band: "13q13.1", pos: 33.05,
    uk: { title: "Klotho: гормон, названий на честь богині долі", hook: "Klotho виробляється переважно в нирках і бере участь в обміні фосфатів та вітаміну D. Варіант KL-VS у дослідженнях пов’язують із довголіттям і когнітивними функціями." },
    en: { title: "Klotho: a hormone named after a goddess of fate", hook: "Klotho is produced mainly in the kidneys and takes part in phosphate and vitamin D metabolism. In studies, the KL-VS variant has been linked to longevity and cognitive function." } },
  { d: 14, chr: "14", len: 107.04, cen: 17.2, genes: 820, gene: "DIO2", band: "14q31.1", pos: 80.2,
    uk: { title: "Останній крок гормону щитоподібної залози", hook: "Дейодиназа 2 типу перетворює тироксин (Т4) на активний трийодтиронін (Т3) безпосередньо у тканинах. Поруч на хромосомі розташований і ген рецептора ТТГ." },
    en: { title: "The last step of thyroid hormone", hook: "Type 2 deiodinase converts thyroxine (T4) into active triiodothyronine (T3) directly in the tissues. The TSH receptor gene sits nearby on the same chromosome." } },
  { d: 15, chr: "15", len: 101.99, cen: 19.0, genes: 610, gene: "CYP1A2", band: "15q24.1", pos: 74.75,
    uk: { title: "Кавовий фермент", hook: "CYP1A2 відповідає за основну частину метаболізму кофеїну в печінці. Поширений варіант пов’язаний зі швидшою чи повільнішою його переробкою. На цій же хромосомі ділянка, найтісніше пов’язана з кольором очей." },
    en: { title: "The coffee enzyme", hook: "CYP1A2 handles most caffeine metabolism in the liver. A common variant is linked to faster or slower processing. The same chromosome holds the region most tightly linked to eye colour." } },
  { d: 16, chr: "16", len: 90.34, cen: 36.8, genes: 870, gene: "MC1R", band: "16q24.3", pos: 89.92,
    uk: { title: "Рудий, веснянки й сонце", hook: "Рецептор меланокортину 1 визначає, який пігмент виробляють клітини шкіри. Його варіанти пов’язані з рудим волоссям, веснянками й чутливістю до сонця. Тут же FTO, найвідоміший ген апетиту й маси тіла." },
    en: { title: "Red hair, freckles and the sun", hook: "The melanocortin 1 receptor determines which pigment skin cells make. Its variants are linked to red hair, freckles and sun sensitivity. FTO, the best-known gene for appetite and body weight, is here too." } },
  { d: 17, chr: "17", len: 83.26, cen: 25.1, genes: 1200, gene: "ACE", band: "17q23.3", pos: 63.49,
    uk: { title: "Тиск і витривалість", hook: "Ангіотензинперетворювальний фермент регулює тонус судин. Його поліморфізм I/D у 1998 році став першим «спортивним» геном і добре пояснює відмінності в рівні ферменту в крові." },
    en: { title: "Blood pressure and endurance", hook: "Angiotensin-converting enzyme regulates vascular tone. In 1998 its I/D polymorphism became the first “sports” gene, and it explains differences in blood levels of the enzyme well." } },
  { d: 18, chr: "18", len: 80.37, cen: 18.5, genes: 270, gene: "MC4R", band: "18q21.32", pos: 60.18,
    uk: { title: "Сигнал ситості", hook: "Рецептор меланокортину 4 у гіпоталамусі передає сигнал «досить». Поширені варіанти поруч із геном пов’язані з апетитом та індексом маси тіла. Родич MC1R із 16 грудня, але з іншою професією." },
    en: { title: "The satiety signal", hook: "The melanocortin 4 receptor in the hypothalamus passes on the “enough” signal. Common variants near the gene are linked to appetite and body mass index. A relative of MC1R from 16 December, with a different job." } },
  { d: 19, chr: "19", len: 58.62, cen: 26.2, genes: 1470, gene: "FUT2", band: "19q13.33", pos: 48.7,
    uk: { title: "Секретори і несекретори", hook: "Найщільніша хромосома: найбільше генів на одиницю довжини. Приблизно кожен п’ятий європеєць — «несекретор»: це пов’язано зі складом мікробіому, рівнем вітаміну B12 і стійкістю до частини норовірусів." },
    en: { title: "Secretors and non-secretors", hook: "The densest chromosome: the most genes per unit of length. About one in five Europeans is a “non-secretor”: this is linked to microbiome composition, vitamin B12 levels and resistance to some noroviruses." } },
  { d: 20, chr: "20", len: 64.44, cen: 28.1, genes: 540, gene: "GDF5", band: "20q11.22", pos: 35.44,
    uk: { title: "Зріст і суглоби", hook: "Фактор росту GDF5 формує хрящ і суглоби. Поширений варіант у його регуляторній ділянці пов’язаний водночас із трохи нижчим зростом і вищою схильністю до остеоартриту." },
    en: { title: "Height and joints", hook: "The growth factor GDF5 shapes cartilage and joints. A common variant in its regulatory region is linked both to slightly shorter height and to a higher likelihood of osteoarthritis." } },
  { d: 21, chr: "21", len: 46.71, cen: 12.0, genes: 230, gene: "CBS", band: "21q22.3", pos: 43.05,
    uk: { title: "Найменша, але не найпростіша", hook: "Найменша з нумерованих хромосом: близько 230 генів. Серед них CBS, фермент, що перетворює гомоцистеїн далі шляхом, який починається з MTHFR на першій хромосомі. Окремих добре вивчених варіантів на 21-й небагато: її маркери працюють у складі полігенних оцінок." },
    en: { title: "The smallest, but not the simplest", hook: "The smallest of the numbered chromosomes: about 230 genes. Among them is CBS, an enzyme that carries homocysteine further along the pathway that begins with MTHFR on chromosome 1. Chromosome 21 has few well-studied individual variants: its markers work as part of polygenic scores." } },
  { d: 22, chr: "22", len: 50.82, cen: 15.0, genes: 490, gene: "COMT", band: "22q11.21", pos: 19.96,
    uk: { title: "Дофамін під контролем", hook: "Фермент COMT розщеплює дофамін у лобовій корі. Варіант Val158Met помітно змінює його активність і десятиліттями залишається найвідомішим геном у дослідженнях уваги та стресу, хоча ефекти на поведінку виявилися скромними." },
    en: { title: "Dopamine under control", hook: "The COMT enzyme breaks down dopamine in the frontal cortex. The Val158Met variant changes its activity noticeably and has for decades been the best-known gene in studies of attention and stress, although its effects on behaviour have proved modest." } },
  { d: 23, chr: "X", chr2: "Y", len: 156.04, cen: 60.6, len2: 57.23, cen2: 10.4, genes: 840, gene: "AR", band: "Xq12", pos: 67.55,
    uk: { title: "X і Y: пара, яка буває різною", hook: "На X-хромосомі близько 840 генів, серед них AR, рецептор андрогенів, пов’язаний із чоловічим типом облисіння. У жінок одна з двох X у кожній клітині неактивна, тож організм є мозаїкою. Y — найменша хромосома з геном SRY, що запускає розвиток за чоловічим типом." },
    en: { title: "X and Y: the pair that can differ", hook: "The X chromosome carries about 840 genes, among them AR, the androgen receptor linked to male-pattern hair loss. In women, one of the two X chromosomes in each cell is inactive, so the body is a mosaic. Y is the smallest chromosome, carrying SRY, the gene that sets off male-typical development." } },
  { d: 24, chr: "MT", len: 0.016569, cen: 0, genes: 37, gene: { uk: "мтДНК", en: "mtDNA" }, band: { uk: "кільцева молекула", en: "circular molecule" }, pos: 0, bonus: true,
    uk: { title: "Поза каріотипом: мітохондріальна ДНК", hook: "Бонусний день. Тридцять сім генів у кільцевій молекулі на 16 569 пар нуклеотидів, яка передається по материнській лінії й працює в енергетичних станціях клітини." },
    en: { title: "Beyond the karyotype: mitochondrial DNA", hook: "Bonus day. Thirty-seven genes in a circular molecule of 16,569 base pairs, passed down the maternal line and at work in the cell’s power stations." } }
];
