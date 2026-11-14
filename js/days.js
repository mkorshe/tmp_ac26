/* «23 пари» · адвент-календар 2026 · вміст днів українською та англійською.
   Довжини хромосом і положення центромер: збірка GRCh38; кількість генів: округлені оцінки Ensembl/GENCODE.
   Дні 1–5 розгорнуті повністю: інтерактивні графіки (js/viz.js), порада дня за генотипом або групою, джерела.
   Позначка {n} у тексті — посилання на n-те джерело зі списку refs цього дня. Дні 6–24 мають заголовок, тезу з джерелами та один інтерактивний елемент. */
(function () {
  const PM = (id) => "https://pubmed.ncbi.nlm.nih.gov/" + id + "/";
  const ENS = (c) => [{ uk: "Ensembl, збірка геному GRCh38: хромосома " + c, en: "Ensembl, GRCh38 genome assembly: chromosome " + c }, "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=" + c];
  const G1000 = [{ uk: "Auton et al., Nature, 2015 (проєкт «1000 геномів», фаза 3)", en: "Auton et al., Nature, 2015 (1000 Genomes Project, phase 3)" }, PM(26432245)];

  const DAYS = [
    {
      d: 1, chr: "1", len: 248.96, cen: 123.4, genes: 2050, gene: "MTHFR", band: "1p36.22", pos: 11.8, ready: true,
      viz: [{ id: "folate", after: "known" }],
      refs: [
        ENS("1"),
        ["Frosst et al., Nature Genetics, 1995", PM(7647779)],
        ["Tsang et al., American Journal of Clinical Nutrition, 2015", PM(25788000)],
        G1000,
        ["CDC, MTHFR Gene Variant and Folic Acid Facts, 2026", "https://www.cdc.gov/folic-acid/data-research/mthfr/index.html"],
        ["Hickey et al., Genetics in Medicine, 2013 (ACMG Practice Guideline)", PM(23288205)]
      ],
      uk: {
        title: "Фолатний цикл і найвідоміший міф",
        intro: "Найбільша хромосома людини: майже 249 мільйонів пар нуклеотидів, близько 8% усієї ДНК клітини і приблизно дві тисячі генів, що кодують білки.{1}",
        role: "MTHFR кодує фермент метилентетрагідрофолатредуктазу. Він перетворює фолат на форму, потрібну для переробки гомоцистеїну на метіонін.{2}",
        known: "Поширений варіант C677T робить фермент менш стабільним.{2} Дві його копії має приблизно кожен восьмий європеєць.{4} За однакового споживання фолієвої кислоти рівень фолату в крові таких людей у середньому лише на 16% нижчий.{3}{5}",
        not: "Це не діагноз і не привід змінювати форму чи дозу фолату.{5} Американська колегія медичної генетики дійшла висновку, що клінічна користь тестування MTHFR мінімальна.{6}",
        tip: [
          { k: "Для всіх", s: "будь-який генотип", t: "Листова зелень, бобові та цитрусові щодня: фолат із їжі потрібен за будь-якого генотипу.", f: "Споживання фолієвої кислоти важить для рівня фолату в крові більше, ніж варіант C677T.{5}" },
          { k: "Генотип TT", s: "дві копії варіанта C677T", t: "Порада не змінюється: достатньо фолату з їжею. Замінювати фолієву кислоту іншими формами фолату через варіант не потрібно.", f: "За даними CDC, люди з варіантом MTHFR засвоюють усі форми фолату, включно з фолієвою кислотою.{5}" },
          { k: "Планування вагітності", s: "жінки, які можуть завагітніти", t: "400 мкг фолієвої кислоти щодня: рекомендація однакова для всіх, незалежно від варіанта MTHFR.", f: "Така доза підвищує рівень фолату в крові за будь-якого генотипу. Більшу дозу може порадити лише лікар.{5}" }
        ]
      },
      en: {
        title: "The folate cycle and the best-known myth",
        intro: "The largest human chromosome: almost 249 million base pairs, about 8% of all the DNA in a cell and roughly two thousand protein-coding genes.{1}",
        role: "MTHFR encodes the enzyme methylenetetrahydrofolate reductase. It converts folate into the form needed to turn homocysteine into methionine.{2}",
        known: "The common C677T variant makes the enzyme less stable.{2} About one in eight Europeans carries two copies.{4} At the same folic acid intake, their blood folate is on average only 16% lower.{3}{5}",
        not: "This is not a diagnosis and not a reason to change the form or dose of folate.{5} The American College of Medical Genetics concluded that MTHFR testing has minimal clinical utility.{6}",
        tip: [
          { k: "Everyone", s: "any genotype", t: "Leafy greens, legumes and citrus fruit every day: folate from food is needed whatever your genotype.", f: "Folic acid intake matters more for blood folate than the C677T variant does.{5}" },
          { k: "TT genotype", s: "two copies of the C677T variant", t: "The advice does not change: enough folate from food. There is no need to swap folic acid for other forms of folate because of the variant.", f: "According to the CDC, people with an MTHFR variant can process all types of folate, including folic acid.{5}" },
          { k: "Planning a pregnancy", s: "women who could become pregnant", t: "400 mcg of folic acid a day: the recommendation is the same for everyone, regardless of MTHFR variant.", f: "That amount raises blood folate whatever the genotype. Only a doctor may advise a higher dose.{5}" }
        ]
      }
    },
    {
      d: 2, chr: "2", len: 242.19, cen: 93.9, genes: 1300, gene: "LCT", band: "2q21.3", pos: 135.85, ready: true,
      viz: [{ id: "fusion", after: "intro" }, { id: "lactase", after: "known" }],
      refs: [
        ENS("2"),
        ["IJdo et al., PNAS, 1991", PM(1924367)],
        ["Hillier et al., Nature, 2005", PM(15815621)],
        ["Enattah et al., Nature Genetics, 2002", PM(11788828)],
        G1000,
        ["Tishkoff et al., Nature Genetics, 2007", PM(17159977)],
        ["Shaukat et al., Annals of Internal Medicine, 2010", PM(20404262)],
        ["Suchy et al., NIH Consensus Development Conference Statement, 2010", PM(20186234)]
      ],
      uk: {
        title: "Молоко і слід еволюції",
        intro: "Друга за розміром: 242 мільйони пар нуклеотидів.{1} У людиноподібних мавп на її місці дві окремі хромосоми. У наших предків вони злилися, тому в людини 23 пари, а в шимпанзе 24.{2}{3}",
        role: "LCT кодує лактазу, фермент, що розщеплює молочний цукор. Регуляторний варіант C/T−13910 приблизно за 14 тисяч пар нуклеотидів від гена, у сусідньому MCM6, пов’язаний зі збереженням активності лактази в дорослому віці.{4}",
        known: "У європейських вибірках його алель T трапляється приблизно на кожній другій хромосомі, а на півночі Європи значно частіше.{5} Достатньо однієї копії: активність лактази знижується лише в тих, хто не має жодної.{4}",
        not: "Генотип не вимірює, як ви переносите молоко. Більшість людей із мальабсорбцією лактози не має клінічної непереносимості, а чимало тих, хто вважає себе непереносним, лактозу засвоює.{8} Симптоми оцінює лікар, а не ДНК-звіт.",
        tip: [
          { k: "Для всіх", s: "будь-який генотип", t: "Не відмовляйтеся від молочного без потреби: це джерело кальцію та вітаміну D.", f: "Люди, які уникають молочного через справжню чи уявну непереносимість, часто отримують замало кальцію й вітаміну D. Здебільшого виключати молочне повністю не потрібно.{8}" },
          { k: "Генотип C/C", s: "без алеля T: активність лактази нижча", t: "Починайте з порції до склянки молока за раз і орієнтуйтеся на самопочуття.", f: "12–15 г лактози (приблизно склянка молока) добре переносить більшість дорослих із непереносимістю чи мальабсорбцією лактози: висновок огляду 36 рандомізованих досліджень.{7}" },
          { k: "Є алель T", s: "одна чи дві копії: лактаза активна", t: "Обмежувати молочне через лактозу зазвичай немає підстав. Якщо симптоми все ж є, обговоріть їх із лікарем: причина може бути іншою.", f: "Варіант C/T−13910 повністю збігався з біохімічно підтвердженою активністю лактази у фінських родинах і у вибірці з 236 людей із чотирьох популяцій.{4}" }
        ]
      },
      en: {
        title: "Milk and a trace of evolution",
        intro: "The second largest: 242 million base pairs.{1} In the great apes its place is taken by two separate chromosomes. In our ancestors they fused, which is why humans have 23 pairs and chimpanzees 24.{2}{3}",
        role: "LCT encodes lactase, the enzyme that breaks down milk sugar. The regulatory variant C/T−13910, about 14 thousand base pairs from the gene in the neighbouring MCM6, is linked to lactase staying active in adulthood.{4}",
        known: "In European samples its T allele is found on roughly every second chromosome, and far more often in northern Europe.{5} One copy is enough: lactase activity declines only in people who have none.{4}",
        not: "Genotype does not measure how you tolerate milk. Most people with lactose malabsorption do not have clinical lactose intolerance, and many who think they are intolerant digest lactose well.{8} Symptoms are assessed by a doctor, not a DNA report.",
        tip: [
          { k: "Everyone", s: "any genotype", t: "Do not give up dairy without need: it is a source of calcium and vitamin D.", f: "People who avoid dairy because of real or perceived intolerance often get too little calcium and vitamin D. In most cases there is no need to cut dairy out completely.{8}" },
          { k: "C/C genotype", s: "no T allele: lactase activity declines", t: "Start with up to a glass of milk at a time and go by how you feel.", f: "12–15 g of lactose (about a glass of milk) is well tolerated by most adults with lactose intolerance or malabsorption: the finding of a review of 36 randomised studies.{7}" },
          { k: "T allele present", s: "one or two copies: lactase stays active", t: "There is usually no reason to limit dairy because of lactose. If you still have symptoms, discuss them with a doctor: the cause may be something else.", f: "The C/T−13910 variant matched biochemically verified lactase activity completely in Finnish families and in a sample of 236 people from four populations.{4}" }
        ]
      }
    },
    {
      d: 3, chr: "3", len: 198.3, cen: 90.9, genes: 1080, gene: "PPARG", band: "3p25.2", pos: 12.35, ready: true,
      viz: [{ id: "dpp", after: "known" }],
      refs: [
        ENS("3"),
        ["Tontonoz & Spiegelman, Annual Review of Biochemistry, 2008", PM(18518822)],
        ["Altshuler et al., Nature Genetics, 2000", PM(10973253)],
        ["Knowler et al., New England Journal of Medicine, 2002", PM(11832527)],
        ["Florez et al., Journal of Clinical Endocrinology & Metabolism, 2007", PM(17213274)]
      ],
      uk: {
        title: "Диригент жирової тканини",
        intro: "198 мільйонів пар нуклеотидів і близько 1 080 генів, серед яких гени обміну заліза, кальцію та довжини теломер.{1}",
        role: "PPARG кодує ядерний рецептор PPARγ. Він керує дозріванням жирових клітин, а його активація підвищує чутливість тканин до інсуліну.{2}",
        known: "Варіант Pro12Ala став першою поширеною генетичною асоціацією з діабетом 2 типу, яку вдалося надійно відтворити. Поширений алель Pro є на 85% хромосом і пов’язаний зі скромним, у 1,25 раза, підвищенням ризику.{3}",
        not: "Ефект одного варіанта малий: він не визначає, чи виникне порушення обміну глюкози.{3}{5} Рівень глюкози показує лише аналіз крові.",
        tip: [
          { k: "Для всіх", s: "будь-який генотип", t: "Регулярний рух і контроль маси тіла: основа профілактики діабету 2 типу.", f: "У Програмі профілактики діабету зміна способу життя знизила захворюваність на 58%, а метформін на 31%.{4}" },
          { k: "Генотип Pro/Pro", s: "найпоширеніший", t: "Порада та сама, і працює вона не гірше: користь від зміни способу життя не залежала від генотипу.", f: "Серед 3 548 учасників програми люди з генотипом Pro/Pro мали дещо вищий ризик діабету (у 1,24 раза, на межі статистичної значущості), але втручання діяли однаково за будь-якого генотипу.{5}" },
          { k: "Підвищена глюкоза", s: "група ризику", t: "Орієнтири програми: мінус 7% маси тіла і щонайменше 150 хвилин руху на тиждень. План варто узгодити з лікарем.", f: "Щоб запобігти одному випадку діабету за три роки, у програмі зміни способу життя мали взяти участь 6,9 людини.{4}" }
        ]
      },
      en: {
        title: "The conductor of fat tissue",
        intro: "198 million base pairs and about 1,080 genes, among them genes for iron and calcium metabolism and telomere length.{1}",
        role: "PPARG encodes the nuclear receptor PPARγ. It governs the maturation of fat cells, and its activation improves the sensitivity of tissues to insulin.{2}",
        known: "The Pro12Ala variant was the first common genetic association with type 2 diabetes to be reliably replicated. The common Pro allele sits on 85% of chromosomes and is linked to a modest, 1.25-fold, increase in risk.{3}",
        not: "The effect of a single variant is small: it does not determine whether glucose metabolism will be impaired.{3}{5} Only a blood test shows your glucose level.",
        tip: [
          { k: "Everyone", s: "any genotype", t: "Regular movement and weight control: the basis of type 2 diabetes prevention.", f: "In the Diabetes Prevention Program, lifestyle change cut incidence by 58% and metformin by 31%.{4}" },
          { k: "Pro/Pro genotype", s: "the most common", t: "The advice is the same and works just as well: the benefit of lifestyle change did not depend on genotype.", f: "Among 3,548 participants, people with the Pro/Pro genotype had a slightly higher risk of diabetes (1.24-fold, of borderline statistical significance), but the interventions worked equally well whatever the genotype.{5}" },
          { k: "Raised glucose", s: "risk group", t: "The programme’s targets: 7% weight loss and at least 150 minutes of activity a week. Agree the plan with a doctor.", f: "To prevent one case of diabetes over three years, 6.9 people had to take part in the lifestyle programme.{4}" }
        ]
      }
    },
    {
      d: 4, chr: "4", len: 190.21, cen: 50.0, genes: 750, gene: "CLOCK", band: "4q12", pos: 55.44, ready: true,
      viz: [{ id: "clock", after: "role" }],
      refs: [
        ENS("4"),
        ["Takahashi, Nature Reviews Genetics, 2017", PM(27990019)],
        [{ uk: "Нобелівська асамблея, повідомлення про премію з фізіології або медицини, 2017", en: "Nobel Assembly, press release on the Prize in Physiology or Medicine, 2017" }, "https://www.nobelprize.org/prizes/medicine/2017/press-release/"],
        ["Katzenberg et al., Sleep, 1998", PM(9779516)],
        ["Robilliard et al., Journal of Sleep Research, 2002", PM(12464098)],
        ["Jones et al., Nature Communications, 2019", PM(30696823)],
        ["Czeisler et al., Science, 1999", PM(10381883)],
        ["Zhang et al., PNAS, 2014", PM(25349387)],
        ["Watson et al., Sleep, 2015", PM(26039963)],
        ["Wright et al., Current Biology, 2013", PM(23910656)],
        ["Khalsa et al., Journal of Physiology, 2003", PM(12717008)]
      ],
      uk: {
        title: "Шестерня внутрішнього годинника",
        intro: "190 мільйонів пар нуклеотидів і близько 750 генів. Тут же гени транспорту вітаміну D, обміну сечової кислоти й алкоголю.{1}",
        role: "CLOCK кодує білок, який разом із партнером BMAL1 запускає добовий цикл активності генів майже в кожній клітині.{2} За розкриття молекулярного механізму циркадних ритмів у 2017 році присуджено Нобелівську премію.{3}",
        known: "У дослідженні 1998 року носії варіанта 3111C мали зсув бажаного часу сну й активності на 10–44 хвилини в бік вечора.{4} Пізніша робота цього зв’язку не підтвердила,{5} і сьогодні хронотип розглядають як полігенну ознаку: у дослідженні 697 828 людей із ним пов’язали 351 ділянку геному.{6}",
        not: "Один варіант не робить людину «совою». Світло зсуває годинник сильніше: за природного освітлення він синхронізується із сонцем.{10}",
        tip: [
          { k: "Для всіх", s: "будь-який хронотип", t: "Спіть щонайменше 7 годин на добу.", f: "Така рекомендація спільного консенсусу Американської академії медицини сну й Товариства дослідження сну для здорових дорослих.{9}" },
          { k: "Вечірній тип", s: "«сова»", t: "Більше денного світла вранці й менше штучного після заходу сонця: так годинник зсувається на раніший час.", f: "За умов лише природного освітлення внутрішній годинник найбільше зсувався на раніший час саме в людей вечірнього типу.{10}" },
          { k: "Варіант 3111C", s: "генотип", t: "Окремої поради для носіїв немає: зв’язок варіанта з вечірнім типом підтвердили не всі дослідження. Діють ті самі сигнали світла.", f: "Яскраве світло після мінімуму температури тіла, тобто вранці, зсуває годинник на раніший час, а перед ним, увечері й уночі, на пізніший.{11}" }
        ]
      },
      en: {
        title: "A cog in the inner clock",
        intro: "190 million base pairs and about 750 genes. Also here: genes for vitamin D transport and for uric acid and alcohol metabolism.{1}",
        role: "CLOCK encodes a protein that, together with its partner BMAL1, drives the daily cycle of gene activity in almost every cell.{2} The 2017 Nobel Prize was awarded for uncovering the molecular mechanism of circadian rhythms.{3}",
        known: "In a 1998 study, carriers of the 3111C variant had their preferred sleep and activity times shifted 10–44 minutes towards the evening.{4} A later study did not confirm the link,{5} and chronotype is now seen as a polygenic trait: a study of 697,828 people tied it to 351 regions of the genome.{6}",
        not: "A single variant does not make someone an “owl”. Light shifts the clock more strongly: under natural light it synchronises with the sun.{10}",
        tip: [
          { k: "Everyone", s: "any chronotype", t: "Sleep at least 7 hours a night.", f: "This is the joint consensus recommendation of the American Academy of Sleep Medicine and the Sleep Research Society for healthy adults.{9}" },
          { k: "Evening type", s: "an “owl”", t: "More daylight in the morning and less artificial light after sunset: this moves the clock earlier.", f: "Under natural light alone, the inner clock moved earlier most of all in people of the evening type.{10}" },
          { k: "3111C variant", s: "genotype", t: "There is no separate advice for carriers: not every study confirmed the link between the variant and the evening type. The same light signals apply.", f: "Bright light after the body-temperature minimum, that is in the morning, moves the clock earlier; before it, in the evening and at night, it moves the clock later.{11}" }
        ]
      }
    },
    {
      d: 5, chr: "5", len: 181.54, cen: 48.8, genes: 880, gene: "TERT", band: "5p15.33", pos: 1.29, ready: true,
      viz: [{ id: "telomere", after: "role" }],
      refs: [
        ENS("5"),
        ["Nakamura et al., Science, 1997", PM(9252327)],
        [{ uk: "Нобелівська асамблея, повідомлення про премію з фізіології або медицини, 2009", en: "Nobel Assembly, press release on the Prize in Physiology or Medicine, 2009" }, "https://www.nobelprize.org/prizes/medicine/2009/press-release/"],
        ["Codd et al., Nature Genetics, 2021", PM(34611362)],
        ["Haycock et al., JAMA Oncology, 2017", PM(28241208)],
        ["Valdes et al., Lancet, 2005", PM(16112303)],
        ["Cherkas et al., Archives of Internal Medicine, 2008", PM(18227361)],
        ["Allsopp et al., PNAS, 1992", PM(1438199)],
        ["Moyzis et al., PNAS, 1988", PM(3413114)]
      ],
      uk: {
        title: "Фермент, що береже кінці хромосом",
        intro: "181,5 мільйона пар нуклеотидів і близько 880 генів: від пігментації та рецептора кортизолу до алергічної відповіді.{1}",
        role: "TERT кодує каталітичну частину теломерази.{2} Цей фермент добудовує теломери: захисні повтори на кінцях хромосом, які коротшають із кожним поділом клітини. За відкриття теломер і теломерази присуджено Нобелівську премію 2009 року.{3}",
        known: "У дослідженні 472 174 учасників UK Biobank довжину теломер лейкоцитів пов’язали зі 197 варіантами у 138 ділянках геному, серед яких і TERT.{4}",
        not: "Генетично асоційована довжина теломер — не виміряний біологічний вік. І довші теломери не є «кращими» за всіх обставин: генетично довші теломери пов’язані з вищою ймовірністю низки новоутворень.{5}",
        tip: [
          { k: "Для всіх", s: "будь-який генотип", t: "Рухайтеся у вільний час: активніший спосіб життя пов’язаний із довшими теломерами.", f: "Серед 2 401 близнюка в найактивніших людей теломери лейкоцитів були на 200 нуклеотидів довші, ніж у найменш активних.{7}" },
          { k: "Курці", s: "група ризику", t: "Відмова від куріння зупиняє лік пачко-років, із якими пов’язане додаткове вкорочення теломер.", f: "Кожен пачко-рік куріння відповідав додатковим 5 парам нуклеотидів втраченої довжини теломер: залежність від дози.{6}" },
          { k: "Ожиріння", s: "група ризику", t: "Підтримуйте здорову масу тіла: вона пов’язана з довшими теломерами.", f: "У жінок з ожирінням теломери лейкоцитів були на 240 пар нуклеотидів коротші, ніж у струнких; з віком вони коротшали в середньому на 27 пар на рік.{6}" }
        ],
        tipNote: "Це спостережні дані: вони показують зв’язок, а не доведену причину."
      },
      en: {
        title: "The enzyme that guards chromosome ends",
        intro: "181.5 million base pairs and about 880 genes: from pigmentation and the cortisol receptor to the allergic response.{1}",
        role: "TERT encodes the catalytic part of telomerase.{2} This enzyme rebuilds telomeres: protective repeats at the ends of chromosomes that shorten with every cell division. The 2009 Nobel Prize was awarded for the discovery of telomeres and telomerase.{3}",
        known: "In a study of 472,174 UK Biobank participants, leukocyte telomere length was linked to 197 variants in 138 regions of the genome, TERT among them.{4}",
        not: "Genetically associated telomere length is not a measured biological age. And longer telomeres are not “better” in every respect: genetically longer telomeres are linked to a higher likelihood of a number of neoplasms.{5}",
        tip: [
          { k: "Everyone", s: "any genotype", t: "Be active in your free time: a more active lifestyle is linked to longer telomeres.", f: "Among 2,401 twins, the most active people had leukocyte telomeres 200 nucleotides longer than the least active.{7}" },
          { k: "Smokers", s: "risk group", t: "Quitting stops the count of pack-years, which are linked to extra telomere shortening.", f: "Each pack-year smoked was equivalent to an additional 5 base pairs of telomere length lost: a dose-dependent relation.{6}" },
          { k: "Obesity", s: "risk group", t: "Keep a healthy body weight: it is linked to longer telomeres.", f: "In women with obesity, leukocyte telomeres were 240 base pairs shorter than in lean women; with age they shortened by an average of 27 base pairs a year.{6}" }
        ],
        tipNote: "These are observational data: they show an association, not a proven cause."
      }
    },

    /* ---------- Дні 6–24: теза з джерелами біля фактів та один інтерактивний елемент ---------- */
    { d: 6, chr: "6", len: 170.81, cen: 59.8, genes: 1050, gene: "HLA", band: "6p21.3", pos: 31.0,
      viz: [{ id: "flip", after: "hook",
        uk: { title: "Три запитання про HLA", cards: [
          { q: "Що роблять білки HLA?", a: "Показують імунним клітинам фрагменти мікробів. Від них залежить стійкість до інфекцій.{2}" },
          { q: "Чому «штрихкод»?", a: "Це найбільш поліморфна ділянка геному людини: варіантів тут більше, ніж деінде.{3}" },
          { q: "До чого тут здоров’я?", a: "З генами цієї ділянки пов’язано більше захворювань, ніж із будь-якою іншою ділянкою геному.{1}" }] },
        en: { title: "Three questions about HLA", cards: [
          { q: "What do HLA proteins do?", a: "They show fragments of microbes to immune cells. Resistance to infection depends on them.{2}" },
          { q: "Why a “barcode”?", a: "It is the most polymorphic region of the human genome: there are more variants here than anywhere else.{3}" },
          { q: "What has it to do with health?", a: "More diseases are linked to the genes of this region than to any other region of the genome.{1}" }] } }],
      uk: { title: "Імунний штрихкод", hook: "Найрізноманітніша ділянка геному.{3} Комплекс HLA визначає, які фрагменти мікробів імунна система показує своїм клітинам,{2} і з ним пов’язано більше ознак, ніж із будь-якою іншою ділянкою.{1}" },
      en: { title: "The immune barcode", hook: "The most diverse region of the genome.{3} The HLA complex determines which fragments of microbes the immune system displays to its own cells,{2} and more traits are linked to it than to any other region.{1}" } },
    { d: 7, chr: "7", len: 159.35, cen: 60.1, genes: 990, gene: "TAS2R38", band: "7q34", pos: 141.97,
      viz: [{ id: "bars3d", after: "hook",
        uk: { title: "Скільки пояснює один ген", sub: "Частка відмінностей між людьми у відчутті гіркоти, яку пояснюють варіанти TAS2R38. Натисніть на стовпчик.", pick: 1, items: [
          { k: "лабораторна|сполука ФТК", v: 70, t: "55–85%", n: "Для фенілтіокарбаміду, на якому відкрили ген, його варіанти пояснюють 55–85% відмінностей у чутливості.{1}" },
          { k: "гіркота|капустяних", v: 16, t: "16%", n: "Для гойтрину, гіркої сполуки капустяних овочів, ті самі варіанти пояснюють лише близько 16% відмінностей.{3}" }] },
        en: { title: "How much one gene explains", sub: "The share of differences between people in tasting bitterness that TAS2R38 variants explain. Click a column.", pick: 1, items: [
          { k: "lab compound|PTC", v: 70, t: "55–85%", n: "For phenylthiocarbamide, the compound the gene was discovered with, its variants explain 55–85% of the differences in sensitivity.{1}" },
          { k: "bitterness|of brassicas", v: 16, t: "16%", n: "For goitrin, a bitter compound in brassica vegetables, the same variants explain only about 16% of the differences.{3}" }] } }],
      uk: { title: "Чому броколі гірка не всім", hook: "Рецептор гіркого смаку.{1} Поширені варіанти гена ділять людей на тих, хто гостро відчуває гіркоту певних сполук, зокрема тих, що є в броколі й капусті, і тих, хто її майже не помічає.{2}{3}" },
      en: { title: "Why broccoli isn’t bitter to everyone", hook: "A bitter taste receptor.{1} Common variants of the gene divide people into those who sharply taste certain bitter compounds, such as those in broccoli and cabbage, and those who barely notice them.{2}{3}" } },
    { d: 8, chr: "8", len: 145.14, cen: 45.2, genes: 680, gene: "LPL", band: "8p21.3", pos: 19.96,
      viz: [{ id: "flip", after: "hook",
        uk: { title: "Три запитання про LPL", cards: [
          { q: "Що розщеплює LPL?", a: "Тригліцериди хіломікронів і ліпопротеїнів дуже низької щільності, які циркулюють у крові.{1}" },
          { q: "Куди йдуть жирні кислоти?", a: "У жирову тканину на зберігання або в скелетні м’язи й серце, де їх окислюють чи запасають.{2}" },
          { q: "Чому ген «класичний»?", a: "Рідкісні й поширені варіанти LPL пов’язані з рівнем тригліцеридів у дослідженні близько 300 тисяч людей.{3}" }] },
        en: { title: "Three questions about LPL", cards: [
          { q: "What does LPL break down?", a: "The triglycerides of chylomicrons and very-low-density lipoproteins circulating in the blood.{1}" },
          { q: "Where do the fatty acids go?", a: "Into fat tissue for storage, or into skeletal muscle and the heart, where they are burned or stored.{2}" },
          { q: "Why is the gene a “classic”?", a: "Rare and common LPL variants are linked to triglyceride levels in a study of about 300,000 people.{3}" }] } }],
      uk: { title: "Воротар тригліцеридів", hook: "Ліпопротеїнліпаза розщеплює тригліцериди крові, щоб жирні кислоти потрапили у м’язи та жирову тканину.{1}{2} Один із класичних генів ліпідного профілю.{3}" },
      en: { title: "The gatekeeper of triglycerides", hook: "Lipoprotein lipase breaks down triglycerides in the blood so that fatty acids can reach muscle and fat tissue.{1}{2} One of the classic genes of the lipid profile.{3}" } },
    { d: 9, chr: "9", len: 138.39, cen: 43.0, genes: 780, gene: "ABO", band: "9q34.2", pos: 133.25,
      viz: [{ id: "picker", after: "hook",
        uk: { title: "Складіть групу крові", sub: "Оберіть по одному варіанту гена від кожного з батьків.", rows: ["Від матері", "Від батька"], out: "група крові", n: {
          A: "Група A виходить із двох варіантів A або з пари A і O: варіант O втратив одну літеру ДНК і дає неактивний білок.{1}",
          B: "Група B виходить із двох варіантів B або з пари B і O. Варіант B відрізняється від A кількома замінами.{1}",
          AB: "Варіанти A і B працюють одночасно, тому група AB.{1}",
          O: "Два варіанти O, обидва дають неактивний білок: група O.{1}" } },
        en: { title: "Build a blood group", sub: "Pick one variant of the gene from each parent.", rows: ["From the mother", "From the father"], out: "blood group", n: {
          A: "Group A comes from two A variants or from A paired with O: the O variant has lost one letter of DNA and gives an inactive protein.{1}",
          B: "Group B comes from two B variants or from B paired with O. The B variant differs from A by a few substitutions.{1}",
          AB: "The A and B variants work at the same time, so the group is AB.{1}",
          O: "Two O variants, both giving an inactive protein: group O.{1}" } } }],
      uk: { title: "Група крові", hook: "Один ген, три основні варіанти, чотири групи крові.{1} Система AB0 відкрита на початку XX століття{4} і досі з’являється в повногеномних дослідженнях: від згортання крові{2} до обміну заліза.{3}" },
      en: { title: "Blood group", hook: "One gene, three main variants, four blood groups.{1} The ABO system was discovered in the early 20th century{4} and still turns up in genome-wide studies: from blood clotting{2} to iron metabolism.{3}" } },
    { d: 10, chr: "10", len: 133.8, cen: 39.8, genes: 730, gene: "TCF7L2", band: "10q25.2", pos: 113.0,
      viz: [{ id: "bars3d", after: "hook",
        uk: { title: "Ризик за кількістю копій варіанта DG10S478", sub: "Відносний ризик діабету 2 типу в дослідженні, яке відкрило цей зв’язок. Натисніть на стовпчик.", items: [
          { k: "жодної копії", v: 1, t: "×1", n: "Точка відліку: люди без варіанта.{1}" },
          { k: "одна копія", v: 1.45, t: "×1,45", n: "З однією копією ризик у 1,45 раза вищий.{1}" },
          { k: "дві копії", v: 2.41, t: "×2,41", n: "З двома копіями ризик у 2,41 раза вищий. На рівні популяції з варіантом пов’язують 21% випадків.{1}" }] },
        en: { title: "Risk by number of copies of the DG10S478 variant", sub: "Relative risk of type 2 diabetes in the study that discovered the link. Click a column.", items: [
          { k: "no copies", v: 1, t: "×1", n: "The reference point: people without the variant.{1}" },
          { k: "one copy", v: 1.45, t: "×1.45", n: "With one copy the risk is 1.45 times higher.{1}" },
          { k: "two copies", v: 2.41, t: "×2.41", n: "With two copies the risk is 2.41 times higher. At population level, 21% of cases are attributed to the variant.{1}" }] } }],
      uk: { title: "Найсильніший поширений сигнал глюкози", hook: "Варіант у TCF7L2 — найвпливовіша з поширених генетичних асоціацій із діабетом 2 типу.{1}{2} Ген бере участь у секреції інсуліну.{3}" },
      en: { title: "The strongest common glucose signal", hook: "A variant in TCF7L2 is the most influential common genetic association with type 2 diabetes.{1}{2} The gene is involved in insulin secretion.{3}" } },
    { d: 11, chr: "11", len: 135.09, cen: 53.4, genes: 1300, gene: "ACTN3", band: "11q13.2", pos: 66.56,
      viz: [{ id: "share", after: "hook",
        uk: { title: "Скільки людей живе без цього білка", groups: [
          { k: "Європейці", p: 18, t: "18%", l: "здорових людей європейського походження не мають α-актиніну-3", n: "Жодних проявів хвороби в них не знайшли. В усьому світі таких людей понад мільярд.{1}{4}" }] },
        en: { title: "How many people live without this protein", groups: [
          { k: "Europeans", p: 18, t: "18%", l: "of healthy people of European ancestry lack α-actinin-3", n: "No signs of disease were found in them. Worldwide there are more than a billion such people.{1}{4}" }] } }],
      uk: { title: "Білок швидких волокон", hook: "Приблизно кожен п’ятий європеєць не має α-актиніну-3, білка швидких м’язових волокон.{1} На здоров’я це не впливає, а серед елітних спринтерів такий генотип рідкість.{1}{2} Одна з найбагатших на відомі гени хромосом.{3}" },
      en: { title: "The fast-fibre protein", hook: "About one in five Europeans lacks α-actinin-3, a protein of fast muscle fibres.{1} It has no effect on health, yet this genotype is rare among elite sprinters.{1}{2} One of the chromosomes richest in well-known genes.{3}" } },
    { d: 12, chr: "12", len: 133.28, cen: 35.5, genes: 1030, gene: "ALDH2", band: "12q24.12", pos: 111.8,
      viz: [{ id: "share", after: "hook",
        uk: { title: "Де поширений варіант ALDH2*2", groups: [
          { k: "Східна Азія", p: 40, t: "35–45%", l: "людей мають знижену активність ALDH2", n: "Після алкоголю в них накопичується ацетальдегід, і обличчя червоніє.{2}" },
          { k: "Решта світу", p: 0, t: "≈ 0", l: "варіант майже не трапляється", n: "За даними про 80 691 людину з 366 популяцій, варіант майже відсутній усюди, крім Східної Азії.{1}" }] },
        en: { title: "Where the ALDH2*2 variant is common", groups: [
          { k: "East Asia", p: 40, t: "35–45%", l: "of people have reduced ALDH2 activity", n: "After alcohol, acetaldehyde builds up in them and the face flushes.{2}" },
          { k: "Rest of the world", p: 0, t: "≈ 0", l: "the variant is almost never found", n: "Data on 80,691 people from 366 populations show the variant is essentially absent everywhere except East Asia.{1}" }] } }],
      uk: { title: "Рум’янець після келиха", hook: "Варіант ALDH2 сповільнює знешкодження ацетальдегіду, продукту розпаду алкоголю.{2} Він поширений у Східній Азії й майже не трапляється в європейців.{1}" },
      en: { title: "A flush after a glass", hook: "The ALDH2 variant slows the clearance of acetaldehyde, a breakdown product of alcohol.{2} It is common in East Asia and almost absent in Europeans.{1}" } },
    { d: 13, chr: "13", len: 114.36, cen: 17.7, genes: 320, gene: "KL", band: "13q13.1", pos: 33.05,
      viz: [{ id: "flip", after: "hook",
        uk: { title: "Три запитання про Klotho", cards: [
          { q: "Де виробляється Klotho?", a: "Переважно в нирках: коли ген прибирали в нефронах мишей, рівень Klotho в крові падав приблизно на 80%.{1}" },
          { q: "Чому його називають гормоном?", a: "Білок Klotho циркулює в крові й діє як гормон.{4}" },
          { q: "Що таке KL-VS?", a: "Варіант гена, який пов’язали з довголіттям{2} і з кращими результатами когнітивних тестів у носіїв однієї копії.{3}" }] },
        en: { title: "Three questions about Klotho", cards: [
          { q: "Where is Klotho made?", a: "Mainly in the kidneys: when the gene was removed from mouse nephrons, Klotho in the blood fell by about 80%.{1}" },
          { q: "Why is it called a hormone?", a: "The Klotho protein circulates in the blood and acts as a hormone.{4}" },
          { q: "What is KL-VS?", a: "A variant of the gene that has been linked to longevity{2} and to better cognitive test results in carriers of one copy.{3}" }] } }],
      uk: { title: "Klotho: гормон, названий на честь богині долі", hook: "Klotho виробляється переважно в нирках і бере участь в обміні фосфатів та вітаміну D.{1} Варіант KL-VS у дослідженнях пов’язують із довголіттям{2} і когнітивними функціями.{3}" },
      en: { title: "Klotho: a hormone named after a goddess of fate", hook: "Klotho is produced mainly in the kidneys and takes part in phosphate and vitamin D metabolism.{1} In studies, the KL-VS variant has been linked to longevity{2} and cognitive function.{3}" } },
    { d: 14, chr: "14", len: 107.04, cen: 17.2, genes: 820, gene: "DIO2", band: "14q31.1", pos: 80.2,
      viz: [{ id: "flip", after: "hook",
        uk: { title: "Три запитання про DIO2", cards: [
          { q: "Т4 чи Т3?", a: "Дейодиназа 2 типу перетворює тироксин (Т4) на активний Т3 просто в тканинах, де він потрібен.{1}" },
          { q: "Хто сусід?", a: "Ген рецептора ТТГ розташований на тій самій хромосомі, у ділянці 14q31.{2}" },
          { q: "Чи пов’язані сусіди?", a: "Варіант Thr92Ala гена DIO2 і варіант D727E гена TSHR лежать в одній ділянці хромосоми й трапляються разом частіше, ніж випадково.{3}" }] },
        en: { title: "Three questions about DIO2", cards: [
          { q: "T4 or T3?", a: "Type 2 deiodinase converts thyroxine (T4) into active T3 right in the tissues where it is needed.{1}" },
          { q: "Who is the neighbour?", a: "The TSH receptor gene sits on the same chromosome, in region 14q31.{2}" },
          { q: "Are the neighbours linked?", a: "The Thr92Ala variant of DIO2 and the D727E variant of TSHR lie in the same region of the chromosome and occur together more often than by chance.{3}" }] } }],
      uk: { title: "Останній крок гормону щитоподібної залози", hook: "Дейодиназа 2 типу перетворює тироксин (Т4) на активний трийодтиронін (Т3) безпосередньо у тканинах.{1} Поруч на хромосомі розташований і ген рецептора ТТГ.{2}{3}" },
      en: { title: "The last step of thyroid hormone", hook: "Type 2 deiodinase converts thyroxine (T4) into active triiodothyronine (T3) directly in the tissues.{1} The TSH receptor gene sits nearby on the same chromosome.{2}{3}" } },
    { d: 15, chr: "15", len: 101.99, cen: 19.0, genes: 610, gene: "CYP1A2", band: "15q24.1", pos: 74.75,
      viz: [{ id: "share", after: "hook",
        uk: { title: "Кофеїн у цифрах", groups: [
          { k: "Кофеїн", s: "що з ним стається", p: 95, t: "95%", l: "спожитого кофеїну переробляє CYP1A2", n: "Через варіанти гена швидкість цієї переробки в різних людей дуже різна.{1}" },
          { k: "Люди", s: "хто має алель CYP1A2*1F", p: 54, t: "54%", l: "учасників контрольної групи мали «повільний» алель CYP1A2*1F", n: "Носіїв алеля CYP1A2*1F вважають повільними метаболізаторами кофеїну, решту швидкими.{2}" }] },
        en: { title: "Caffeine in numbers", groups: [
          { k: "Caffeine", s: "what happens to it", p: 95, t: "95%", l: "of ingested caffeine is processed by CYP1A2", n: "Because of gene variants, the speed of this processing differs widely between people.{1}" },
          { k: "People", s: "who has the CYP1A2*1F allele", p: 54, t: "54%", l: "of the control group carried the “slow” CYP1A2*1F allele", n: "Carriers of the CYP1A2*1F allele are classed as slow caffeine metabolisers, the rest as rapid.{2}" }] } }],
      uk: { title: "Кавовий фермент", hook: "CYP1A2 відповідає за основну частину метаболізму кофеїну в печінці.{1} Поширений варіант пов’язаний зі швидшою чи повільнішою його переробкою.{2}{4} На цій же хромосомі ділянка, найтісніше пов’язана з кольором очей.{3}" },
      en: { title: "The coffee enzyme", hook: "CYP1A2 handles most caffeine metabolism in the liver.{1} A common variant is linked to faster or slower processing.{2}{4} The same chromosome holds the region most tightly linked to eye colour.{3}" } },
    { d: 16, chr: "16", len: 90.34, cen: 36.8, genes: 870, gene: "MC1R", band: "16q24.3", pos: 89.92,
      viz: [{ id: "bars3d", after: "hook",
        uk: { title: "Варіанти MC1R і веснянки", sub: "Ризик веснянок порівняно з людьми без варіантів гена. Натисніть на стовпчик.", items: [
          { k: "без варіантів", v: 1, t: "×1", n: "Точка відліку: люди без варіантів MC1R.{2}" },
          { k: "один варіант", v: 3, t: "×3", n: "З одним варіантом ризик веснянок утричі вищий, незалежно від типу шкіри й кольору волосся.{2}" },
          { k: "два варіанти", v: 11, t: "×11", n: "З двома варіантами ризик в 11 разів вищий.{2}" }] },
        en: { title: "MC1R variants and freckles", sub: "Risk of freckles compared with people who have no variants of the gene. Click a column.", items: [
          { k: "no variants", v: 1, t: "×1", n: "The reference point: people without MC1R variants.{2}" },
          { k: "one variant", v: 3, t: "×3", n: "With one variant the risk of freckles is three times higher, regardless of skin type and hair colour.{2}" },
          { k: "two variants", v: 11, t: "×11", n: "With two variants the risk is 11 times higher.{2}" }] } }],
      uk: { title: "Рудий, веснянки й сонце", hook: "Рецептор меланокортину 1 визначає, який пігмент виробляють клітини шкіри.{1} Його варіанти пов’язані з рудим волоссям, веснянками й чутливістю до сонця.{1}{2} Тут же FTO, найвідоміший ген апетиту й маси тіла.{3}{4}{5}" },
      en: { title: "Red hair, freckles and the sun", hook: "The melanocortin 1 receptor determines which pigment skin cells make.{1} Its variants are linked to red hair, freckles and sun sensitivity.{1}{2} FTO, the best-known gene for appetite and body weight, is here too.{3}{4}{5}" } },
    { d: 17, chr: "17", len: 83.26, cen: 25.1, genes: 1200, gene: "ACE", band: "17q23.3", pos: 63.49,
      viz: [{ id: "share", after: "hook",
        uk: { title: "Скільки пояснює один поліморфізм", groups: [
          { k: "ACE", p: 47, t: "47%", l: "відмінностей у рівні ферменту в крові пояснює поліморфізм I/D", n: "Так показало дослідження, у якому цей поліморфізм відкрили.{1}" }] },
        en: { title: "How much one polymorphism explains", groups: [
          { k: "ACE", p: 47, t: "47%", l: "of the variation in blood levels of the enzyme is explained by the I/D polymorphism", n: "This was shown by the study that discovered the polymorphism.{1}" }] } }],
      uk: { title: "Тиск і витривалість", hook: "Ангіотензинперетворювальний фермент регулює тонус судин.{3} Наприкінці 1990-х його поліморфізм I/D став першим «спортивним» геном{2} і добре пояснює відмінності в рівні ферменту в крові.{1}" },
      en: { title: "Blood pressure and endurance", hook: "Angiotensin-converting enzyme regulates vascular tone.{3} At the end of the 1990s its I/D polymorphism became the first “sports” gene,{2} and it explains differences in blood levels of the enzyme well.{1}" } },
    { d: 18, chr: "18", len: 80.37, cen: 18.5, genes: 270, gene: "MC4R", band: "18q21.32", pos: 60.18,
      viz: [{ id: "flip", after: "hook",
        uk: { title: "Три запитання про MC4R", cards: [
          { q: "Що робить рецептор?", a: "Його активація зменшує споживання їжі: це і є сигнал «досить».{1}" },
          { q: "Де він працює?", a: "У гіпоталамусі: коли MC4R повертали в одне з його ядер, миші без цього гена переставали переїдати.{1}" },
          { q: "А в людей?", a: "Поширений варіант rs17782313 поруч із геном пов’язаний з ІМТ у понад 77 тисяч людей{2} і з вищим споживанням енергії та жирів.{3}" }] },
        en: { title: "Three questions about MC4R", cards: [
          { q: "What does the receptor do?", a: "Its activation reduces food intake: that is the “enough” signal.{1}" },
          { q: "Where does it work?", a: "In the hypothalamus: when MC4R was restored in one of its nuclei, mice lacking the gene stopped overeating.{1}" },
          { q: "And in people?", a: "The common variant rs17782313 near the gene is linked to BMI in more than 77,000 people{2} and to higher intakes of energy and fat.{3}" }] } }],
      uk: { title: "Сигнал ситості", hook: "Рецептор меланокортину 4 у гіпоталамусі передає сигнал «досить».{1} Поширені варіанти поруч із геном пов’язані з апетитом та індексом маси тіла.{2}{3} Родич MC1R із 16 грудня, але з іншою професією.{4}" },
      en: { title: "The satiety signal", hook: "The melanocortin 4 receptor in the hypothalamus passes on the “enough” signal.{1} Common variants near the gene are linked to appetite and body mass index.{2}{3} A relative of MC1R from 16 December, with a different job.{4}" } },
    { d: 19, chr: "19", len: 58.62, cen: 26.2, genes: 1470, gene: "FUT2", band: "19q13.33", pos: 48.7,
      viz: [{ id: "share", after: "hook",
        uk: { title: "Скільки серед нас несекреторів", groups: [
          { k: "FUT2", p: 20, t: "≈ 20%", l: "людей мають дві копії неробочого варіанта W143X: це несекретори", n: "У шведському дослідженні несекретори виявилися повністю стійкими до симптомної інфекції одним із норовірусів.{5}{2}" }] },
        en: { title: "How many of us are non-secretors", groups: [
          { k: "FUT2", p: 20, t: "≈ 20%", l: "of people carry two copies of the non-working W143X variant: they are non-secretors", n: "In a Swedish study, non-secretors proved completely resistant to symptomatic infection with one of the noroviruses.{5}{2}" }] } }],
      uk: { title: "Секретори і несекретори", hook: "Найщільніша хромосома: найбільше генів на одиницю довжини.{1} Приблизно кожен п’ятий європеєць — «несекретор»:{5} це пов’язано зі складом мікробіому,{4} рівнем вітаміну B12{3} і стійкістю до частини норовірусів.{2}" },
      en: { title: "Secretors and non-secretors", hook: "The densest chromosome: the most genes per unit of length.{1} About one in five Europeans is a “non-secretor”:{5} this is linked to microbiome composition,{4} vitamin B12 levels{3} and resistance to some noroviruses.{2}" } },
    { d: 20, chr: "20", len: 64.44, cen: 28.1, genes: 540, gene: "GDF5", band: "20q11.22", pos: 35.44,
      viz: [{ id: "flip", after: "hook",
        uk: { title: "Три запитання про GDF5", cards: [
          { q: "Що робить GDF5?", a: "Потрібний для розвитку хряща й для того, щоб суглоб утворився в правильному місці.{1}" },
          { q: "А зріст?", a: "Поширені варіанти цієї ділянки змінюють зріст у середньому на 0,44 см.{3}" },
          { q: "І суглоби?", a: "Варіант +104T/C у регуляторній ділянці гена, який знижує його активність, пов’язаний з остеоартритом кульшового й колінного суглобів.{2}" }] },
        en: { title: "Three questions about GDF5", cards: [
          { q: "What does GDF5 do?", a: "It is needed for cartilage to develop and for a joint to form in the right place.{1}" },
          { q: "And height?", a: "Common variants in this region shift height by 0.44 cm on average.{3}" },
          { q: "And joints?", a: "The +104T/C variant in the gene’s regulatory region, which lowers its activity, is linked to osteoarthritis of the hip and knee.{2}" }] } }],
      uk: { title: "Зріст і суглоби", hook: "Фактор росту GDF5 формує хрящ і суглоби.{1} Поширений варіант у його регуляторній ділянці пов’язаний водночас із трохи нижчим зростом{3} і вищою схильністю до остеоартриту.{2}{4}" },
      en: { title: "Height and joints", hook: "The growth factor GDF5 shapes cartilage and joints.{1} A common variant in its regulatory region is linked both to slightly shorter height{3} and to a higher likelihood of osteoarthritis.{2}{4}" } },
    { d: 21, chr: "21", len: 46.71, cen: 12.0, genes: 230, gene: "CBS", band: "21q22.3", pos: 43.05,
      viz: [{ id: "bars3d", after: "hook",
        uk: { title: "Що знайшли, коли прочитали 21-шу хромосому", sub: "Гени, описані в першій повній послідовності хромосоми 2000 року. Натисніть на стовпчик.", items: [
          { k: "відомі гени", v: 127, t: "127", n: "Стільки вже відомих генів знайшли в послідовності.{1}" },
          { k: "передбачені", v: 98, t: "98", n: "Ще 98 генів передбачили за послідовністю. Разом 225 на найменшій з автосом.{1}" }] },
        en: { title: "What was found when chromosome 21 was read", sub: "Genes described in the first complete sequence of the chromosome in 2000. Click a column.", items: [
          { k: "known genes", v: 127, t: "127", n: "That many already known genes were found in the sequence.{1}" },
          { k: "predicted", v: 98, t: "98", n: "Another 98 genes were predicted from the sequence. 225 in all on the smallest autosome.{1}" }] } }],
      uk: { title: "Найменша, але не найпростіша", hook: "Найменша з нумерованих хромосом: близько 230 генів.{1} Серед них CBS,{2} фермент, що перетворює гомоцистеїн на цистатіонін: це другий шлях його знешкодження поряд із фолатзалежним, у якому працює MTHFR із першої хромосоми.{3} Окремих широко вивчених варіантів на 21-й порівняно небагато: її маркери здебільшого працюють у складі полігенних оцінок." },
      en: { title: "The smallest, but not the simplest", hook: "The smallest of the numbered chromosomes: about 230 genes.{1} Among them is CBS,{2} an enzyme that converts homocysteine into cystathionine, the second route for clearing it alongside the folate-dependent one that involves MTHFR on chromosome 1.{3} Chromosome 21 has comparatively few widely studied individual variants: its markers mostly work as part of polygenic scores." } },
    { d: 22, chr: "22", len: 50.82, cen: 15.0, genes: 490, gene: "COMT", band: "22q11.21", pos: 19.96,
      viz: [{ id: "bars3d", after: "hook",
        uk: { title: "Одна заміна, різна активність", sub: "Відносна активність ферменту COMT залежно від варіанта. Натисніть на стовпчик.", items: [
          { k: "варіант Met", v: 1, t: "×1", n: "Форма з метіоніном: нижча активність ферменту, взята за одиницю.{2}" },
          { k: "варіант Val", v: 3.5, t: "×3–4", n: "Форма з валіном: активність у 3–4 рази вища.{2} Попри це, зв’язок із когнітивними функціями виявився слабким або відсутнім.{3}" }] },
        en: { title: "One substitution, different activity", sub: "Relative activity of the COMT enzyme by variant. Click a column.", items: [
          { k: "Met variant", v: 1, t: "×1", n: "The form with methionine: lower enzyme activity, taken as one.{2}" },
          { k: "Val variant", v: 3.5, t: "×3–4", n: "The form with valine: activity three to four times higher.{2} Even so, the link with cognitive function proved weak or absent.{3}" }] } }],
      uk: { title: "Дофамін під контролем", hook: "Фермент COMT розщеплює дофамін у лобовій корі.{1} Варіант Val158Met помітно змінює його активність{2}{5} і десятиліттями залишається одним із найбільш досліджуваних варіантів у роботах про увагу та стрес,{4} хоча ефекти на поведінку виявилися скромними.{3}" },
      en: { title: "Dopamine under control", hook: "The COMT enzyme breaks down dopamine in the frontal cortex.{1} The Val158Met variant changes its activity noticeably{2}{5} and has for decades been one of the most studied variants in research on attention and stress,{4} although its effects on behaviour have proved modest.{3}" } },
    { d: 23, chr: "X", chr2: "Y", len: 156.04, cen: 60.6, len2: 57.23, cen2: 10.4, genes: 840, gene: "AR", band: "Xq12", pos: 67.55,
      viz: [{ id: "bars3d", after: "hook",
        uk: { title: "X і Y у цифрах", sub: "Кількість генів, знайдених у послідовностях двох хромосом. Натисніть на стовпчик.", items: [
          { k: "X-хромосома", v: 1098, t: "1 098", n: "Стільки генів усіх типів описали в послідовності X-хромосоми 2005 року.{4}" },
          { k: "Y-хромосома", v: 78, t: "78", n: "Стільки генів, що кодують білки, має чоловіча частина Y: вони кодують лише 27 різних білків.{7}" }] },
        en: { title: "X and Y in numbers", sub: "The number of genes found in the sequences of the two chromosomes. Click a column.", items: [
          { k: "X chromosome", v: 1098, t: "1,098", n: "That many genes of all types were described in the X chromosome sequence in 2005.{4}" },
          { k: "Y chromosome", v: 78, t: "78", n: "That many protein-coding genes sit in the male-specific part of Y: they encode only 27 distinct proteins.{7}" }] } }],
      uk: { title: "X і Y: пара, яка буває різною", hook: "На X-хромосомі близько 840 генів, що кодують білки,{9} серед них AR, рецептор андрогенів, пов’язаний із чоловічим типом облисіння.{1} У жінок одна з двох X у кожній клітині неактивна, тож організм є мозаїкою.{2}{5} Y — хромосома з найменшою кількістю генів,{7} серед яких SRY, що запускає розвиток за чоловічим типом.{3}{6}" },
      en: { title: "X and Y: the pair that can differ", hook: "The X chromosome carries about 840 protein-coding genes,{9} among them AR, the androgen receptor linked to male-pattern hair loss.{1} In women, one of the two X chromosomes in each cell is inactive, so the body is a mosaic.{2}{5} Y carries the fewest genes of any chromosome,{7} among them SRY, the gene that sets off male-typical development.{3}{6}" } },
    { d: 24, chr: "MT", len: 0.016569, cen: 0, genes: 37, gene: { uk: "мтДНК", en: "mtDNA" }, band: { uk: "кільцева молекула", en: "circular molecule" }, pos: 0, bonus: true,
      viz: [{ id: "bars3d", after: "hook",
        uk: { title: "37 генів мітохондріальної ДНК", sub: "З чого складається найменший геном у нашому тілі. Натисніть на стовпчик.", pick: 0, items: [
          { k: "білки", v: 13, t: "13", n: "Тринадцять білків, усі вони є частинами системи, що виробляє енергію.{1}{2}" },
          { k: "транспортні|РНК", v: 22, t: "22", n: "Двадцять дві транспортні РНК потрібні, щоб ці білки зібрати.{1}" },
          { k: "рибосомні|РНК", v: 2, t: "2", n: "І ще дві рибосомні РНК.{1}" }] },
        en: { title: "The 37 genes of mitochondrial DNA", sub: "What the smallest genome in our body is made of. Click a column.", pick: 0, items: [
          { k: "proteins", v: 13, t: "13", n: "Thirteen proteins, all of them parts of the energy-producing system.{1}{2}" },
          { k: "transfer|RNAs", v: 22, t: "22", n: "Twenty-two transfer RNAs are needed to assemble those proteins.{1}" },
          { k: "ribosomal|RNAs", v: 2, t: "2", n: "And two ribosomal RNAs.{1}" }] } }],
      uk: { title: "Поза каріотипом: мітохондріальна ДНК", hook: "Бонусний день. Тридцять сім генів у кільцевій молекулі на 16 569 пар нуклеотидів,{1}{2} яка передається по материнській лінії{3} й працює в енергетичних станціях клітини.{2}" },
      en: { title: "Beyond the karyotype: mitochondrial DNA", hook: "Bonus day. Thirty-seven genes in a circular molecule of 16,569 base pairs,{1}{2} passed down the maternal line{3} and at work in the cell’s power stations.{2}" } }
  ];

  /* Джерела до тез днів 6–24: номер дня → список [опис, PubMed ID або повна адреса] */
  const MORE = {
    6: [["Horton et al., Nat Rev Genet, 2004", 15573121], ["Trowsdale & Knight, Annu Rev Genomics Hum Genet, 2013", 23875801], ["Choi et al., Clin Transplant Res, 2024", 39658458]],
    7: [["Kim et al., Science, 2003", 12595690], ["Bufe et al., Curr Biol, 2005", 15723792], ["Wooding et al., Chem Senses, 2010", 20551074]],
    8: [["Mead et al., J Mol Med, 2002", 12483461], ["Wang & Eckel, Am J Physiol Endocrinol Metab, 2009", 19318514], ["Khera et al., JAMA, 2017", 28267856]],
    9: [["Yamamoto et al., Nature, 1990", 2333095], ["Smith et al., Circulation, 2010", 20231535], ["Benyamin et al., Nat Commun, 2014", 25352340], ["Bodmer, Genetics, 2015", 25657345]],
    10: [["Grant et al., Nat Genet, 2006", 16415884], ["Zhou et al., Hum Mol Genet, 2014", 25015099], ["Lyssenko et al., J Clin Invest, 2007", 17671651]],
    11: [["Yang et al., Am J Hum Genet, 2003", 12879365], ["Alfred et al., Hum Mutat, 2011", 21542061], ["Taylor et al., Nature, 2006", 16554811], ["MacArthur et al., Nat Genet, 2007", 17828264]],
    12: [["Li et al., Ann Hum Genet, 2009", 19456322], ["Montel et al., Cancer Gene Ther, 2022", 34799722]],
    13: [["Lindberg et al., J Am Soc Nephrol, 2014", 24854271], ["Arking et al., Proc Natl Acad Sci U S A, 2002", 11792841], ["Dubal et al., Cell Rep, 2014", 24813892], ["Kurosu et al., Science, 2005", 16123266]],
    14: [["Celi et al., Eur J Endocrinol, 2000", 10913947], ["Rousseau-Merck et al., Genomics, 1990", 2249847], ["Chistiakov et al., Mol Genet Metab, 2004", 15542398]],
    15: [["Nehlig, Pharmacol Rev, 2018", 29514871], ["Cornelis et al., JAMA, 2006", 16522833], ["Kayser et al., Am J Hum Genet, 2008", 18252221], ["Sachse et al., Br J Clin Pharmacol, 1999", 10233211]],
    16: [["Valverde et al., Nat Genet, 1995", 7581459], ["Bastiaens et al., Hum Mol Genet, 2001", 11487574], ["Dina et al., Nat Genet, 2007", 17496892], ["Cecil et al., N Engl J Med, 2008", 19073975], ["Frayling et al., Science, 2007", 17434869]],
    17: [["Rigat et al., J Clin Invest, 1990", 1976655], ["Puthucheary et al., Sports Med, 2011", 21615186], ["Lopez-Sublet et al., Clin Biochem, 2018", 29928904]],
    18: [["Balthasar et al., Cell, 2005", 16269339], ["Loos et al., Nat Genet, 2008", 18454148], ["Qi et al., Hum Mol Genet, 2008", 18697794], ["Cone, Endocr Rev, 2006", 17077189]],
    19: [["Grimwood et al., Nature, 2004", 15057824], ["Thorven et al., J Virol, 2005", 16306606], ["Hazra et al., Nat Genet, 2008", 18776911], ["Rühlemann et al., Nat Genet, 2021", 33462482], ["Kelly et al., J Biol Chem, 1995", 7876235]],
    20: [["Storm & Kingsley, Dev Biol, 1999", 10208739], ["Miyamoto et al., Nat Genet, 2007", 17384641], ["Sanna et al., Nat Genet, 2008", 18193045], ["Capellini et al., Nat Genet, 2017", 28671685]],
    21: [["Hattori et al., Nature, 2000", 10830953], ["Münke et al., Am J Hum Genet, 1988", 2894761], ["Selhub, Annu Rev Nutr, 1999", 10448523]],
    22: [["Chen et al., Am J Hum Genet, 2004", 15457404], ["Lachman et al., Pharmacogenetics, 1996", 8807664], ["Barnett et al., Biol Psychiatry, 2008", 18339359], ["Zubieta et al., Science, 2003", 12595695], ["Tunbridge et al., Biol Psychiatry, 2019", 31303260]],
    23: [["Hillmer et al., Am J Hum Genet, 2005", 15902657], ["Migeon, JAMA, 2006", 16551715], ["Koopman et al., Nature, 1991", 2030730], ["Ross et al., Nature, 2005", 15772651], ["Carrel & Willard, Nature, 2005", 15772666], ["Sinclair et al., Nature, 1990", 1695712], ["Skaletsky et al., Nature, 2003", 12815422], ["Rhie et al., Nature, 2023", 37612512], [{ uk: "Ensembl, збірка геному GRCh38: хромосома X", en: "Ensembl, GRCh38 genome assembly: chromosome X" }, "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=X"]],
    24: [["Anderson et al., Nature, 1981", 7219534], ["Taanman, Biochim Biophys Acta, 1999", 10076021], ["Giles et al., Proc Natl Acad Sci U S A, 1980", 6256757]]
  };
  DAYS.forEach((d) => { if (MORE[d.d]) d.refs = MORE[d.d].map((r) => [r[0], typeof r[1] === "number" ? PM(r[1]) : r[1]]); });

  window.ADVENT_DAYS = DAYS;
})();
