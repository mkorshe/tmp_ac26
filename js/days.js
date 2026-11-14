/* «23 пари» · адвент-календар 2026 · вміст днів українською та англійською.
   Довжини хромосом і положення центромер: збірка GRCh38; кількість генів: округлені оцінки Ensembl/GENCODE.
   Дні 1–5 розгорнуті повністю: інтерактивні графіки (js/viz.js), порада дня за генотипом або групою, джерела.
   Позначка {n} у тексті — посилання на n-те джерело зі списку refs цього дня. Дні 6–24 мають заголовок і тезу. */
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
          { k: "Для всіх", s: "будь-який генотип", t: "Листова зелень, бобові та цитрусові щодня: фолат із їжі потрібен за будь-якого генотипу.", f: "Споживання фолієвої кислоти важить для рівня фолату в крові більше, ніж варіант MTHFR.{5}" },
          { k: "Генотип TT", s: "дві копії варіанта", t: "Порада не змінюється: достатньо фолату з їжею. Замінювати фолієву кислоту іншими формами фолату через варіант не потрібно.", f: "За даними CDC, люди з варіантом MTHFR засвоюють усі форми фолату, включно з фолієвою кислотою.{5}" },
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
          { k: "Everyone", s: "any genotype", t: "Leafy greens, legumes and citrus fruit every day: folate from food is needed whatever your genotype.", f: "Folic acid intake matters more for blood folate than an MTHFR variant does.{5}" },
          { k: "TT genotype", s: "two copies of the variant", t: "The advice does not change: enough folate from food. There is no need to swap folic acid for other forms of folate because of the variant.", f: "According to the CDC, people with an MTHFR variant can process all types of folate, including folic acid.{5}" },
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
        role: "LCT кодує лактазу, фермент, що розщеплює молочний цукор. Регуляторний варіант приблизно за 14 тисяч пар нуклеотидів від гена, у сусідньому MCM6, пов’язаний зі збереженням активності лактази в дорослому віці.{4}",
        known: "У європейських вибірках цей варіант трапляється приблизно на кожній другій хромосомі, а на півночі Європи значно частіше.{5} Достатньо однієї копії: активність лактази знижується лише в тих, хто не має жодної.{4}",
        not: "Генотип не вимірює, як ви переносите молоко. Більшість людей із мальабсорбцією лактози не має клінічної непереносимості, а чимало тих, хто вважає себе непереносним, лактозу засвоює.{8} Симптоми оцінює лікар, а не ДНК-звіт.",
        tip: [
          { k: "Для всіх", s: "будь-який генотип", t: "Не відмовляйтеся від молочного без потреби: це джерело кальцію та вітаміну D.", f: "Люди, які уникають молочного через справжню чи уявну непереносимість, часто отримують замало кальцію й вітаміну D. Здебільшого виключати молочне повністю не потрібно.{8}" },
          { k: "Варіанта немає", s: "активність лактази знижується", t: "Починайте з порції до склянки молока за раз і орієнтуйтеся на самопочуття.", f: "12–15 г лактози (приблизно склянка молока) добре переносить більшість дорослих із непереносимістю чи мальабсорбцією лактози: висновок огляду 36 рандомізованих досліджень.{7}" },
          { k: "Є хоча б одна копія", s: "лактаза лишається активною", t: "Обмежувати молочне через лактозу зазвичай немає підстав. Якщо симптоми все ж є, обговоріть їх із лікарем: причина може бути іншою.", f: "Варіант повністю збігався з біохімічно підтвердженою активністю лактази у фінських родинах і у вибірці з 236 людей із чотирьох популяцій.{4}" }
        ]
      },
      en: {
        title: "Milk and a trace of evolution",
        intro: "The second largest: 242 million base pairs.{1} In the great apes its place is taken by two separate chromosomes. In our ancestors they fused, which is why humans have 23 pairs and chimpanzees 24.{2}{3}",
        role: "LCT encodes lactase, the enzyme that breaks down milk sugar. A regulatory variant about 14 thousand base pairs from the gene, in the neighbouring MCM6, is linked to lactase staying active in adulthood.{4}",
        known: "In European samples the variant is found on roughly every second chromosome, and far more often in northern Europe.{5} One copy is enough: lactase activity declines only in people who have none.{4}",
        not: "Genotype does not measure how you tolerate milk. Most people with lactose malabsorption do not have clinical lactose intolerance, and many who think they are intolerant digest lactose well.{8} Symptoms are assessed by a doctor, not a DNA report.",
        tip: [
          { k: "Everyone", s: "any genotype", t: "Do not give up dairy without need: it is a source of calcium and vitamin D.", f: "People who avoid dairy because of real or perceived intolerance often get too little calcium and vitamin D. In most cases there is no need to cut dairy out completely.{8}" },
          { k: "No variant", s: "lactase activity declines", t: "Start with up to a glass of milk at a time and go by how you feel.", f: "12–15 g of lactose (about a glass of milk) is well tolerated by most adults with lactose intolerance or malabsorption: the finding of a review of 36 randomised studies.{7}" },
          { k: "At least one copy", s: "lactase stays active", t: "There is usually no reason to limit dairy because of lactose. If you still have symptoms, discuss them with a doctor: the cause may be something else.", f: "The variant matched biochemically verified lactase activity completely in Finnish families and in a sample of 236 people from four populations.{4}" }
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

    /* ---------- Дні 6–24: заголовок і теза ---------- */
    { d: 6, chr: "6", len: 170.81, cen: 59.8, genes: 1050, gene: "HLA", band: "6p21.3", pos: 31.0,
      uk: { title: "Імунний штрихкод", hook: "Найрізноманітніша ділянка геному. Комплекс HLA визначає, які фрагменти мікробів імунна система показує своїм клітинам, і з ним пов’язано більше ознак, ніж із будь-якою іншою ділянкою." },
      en: { title: "The immune barcode", hook: "The most diverse region of the genome. The HLA complex determines which fragments of microbes the immune system displays to its own cells, and more traits are linked to it than to any other region." } },
    { d: 7, chr: "7", len: 159.35, cen: 60.1, genes: 990, gene: "TAS2R38", band: "7q34", pos: 141.97,
      uk: { title: "Чому броколі гірка не всім", hook: "Рецептор гіркого смаку. Поширені варіанти гена ділять людей на тих, хто гостро відчуває гіркоту певних сполук, зокрема тих, що є в броколі й капусті, і тих, хто її майже не помічає." },
      en: { title: "Why broccoli isn’t bitter to everyone", hook: "A bitter taste receptor. Common variants of the gene divide people into those who sharply taste certain bitter compounds, such as those in broccoli and cabbage, and those who barely notice them." } },
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
      uk: { title: "Тиск і витривалість", hook: "Ангіотензинперетворювальний фермент регулює тонус судин. Наприкінці 1990-х його поліморфізм I/D став першим «спортивним» геном і добре пояснює відмінності в рівні ферменту в крові." },
      en: { title: "Blood pressure and endurance", hook: "Angiotensin-converting enzyme regulates vascular tone. At the end of the 1990s its I/D polymorphism became the first “sports” gene, and it explains differences in blood levels of the enzyme well." } },
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
      uk: { title: "Найменша, але не найпростіша", hook: "Найменша з нумерованих хромосом: близько 230 генів. Серед них CBS, фермент, що перетворює гомоцистеїн на цистатіонін: це другий шлях його знешкодження поряд із фолатзалежним, у якому працює MTHFR із першої хромосоми. Окремих широко вивчених варіантів на 21-й порівняно небагато: її маркери здебільшого працюють у складі полігенних оцінок." },
      en: { title: "The smallest, but not the simplest", hook: "The smallest of the numbered chromosomes: about 230 genes. Among them is CBS, an enzyme that converts homocysteine into cystathionine, the second route for clearing it alongside the folate-dependent one that involves MTHFR on chromosome 1. Chromosome 21 has comparatively few widely studied individual variants: its markers mostly work as part of polygenic scores." } },
    { d: 22, chr: "22", len: 50.82, cen: 15.0, genes: 490, gene: "COMT", band: "22q11.21", pos: 19.96,
      uk: { title: "Дофамін під контролем", hook: "Фермент COMT розщеплює дофамін у лобовій корі. Варіант Val158Met помітно змінює його активність і десятиліттями залишається одним із найбільш досліджуваних варіантів у роботах про увагу та стрес, хоча ефекти на поведінку виявилися скромними." },
      en: { title: "Dopamine under control", hook: "The COMT enzyme breaks down dopamine in the frontal cortex. The Val158Met variant changes its activity noticeably and has for decades been one of the most studied variants in research on attention and stress, although its effects on behaviour have proved modest." } },
    { d: 23, chr: "X", chr2: "Y", len: 156.04, cen: 60.6, len2: 57.23, cen2: 10.4, genes: 840, gene: "AR", band: "Xq12", pos: 67.55,
      uk: { title: "X і Y: пара, яка буває різною", hook: "На X-хромосомі близько 840 генів, що кодують білки, серед них AR, рецептор андрогенів, пов’язаний із чоловічим типом облисіння. У жінок одна з двох X у кожній клітині неактивна, тож організм є мозаїкою. Y — хромосома з найменшою кількістю генів, серед яких SRY, що запускає розвиток за чоловічим типом." },
      en: { title: "X and Y: the pair that can differ", hook: "The X chromosome carries about 840 protein-coding genes, among them AR, the androgen receptor linked to male-pattern hair loss. In women, one of the two X chromosomes in each cell is inactive, so the body is a mosaic. Y carries the fewest genes of any chromosome, among them SRY, the gene that sets off male-typical development." } },
    { d: 24, chr: "MT", len: 0.016569, cen: 0, genes: 37, gene: { uk: "мтДНК", en: "mtDNA" }, band: { uk: "кільцева молекула", en: "circular molecule" }, pos: 0, bonus: true,
      uk: { title: "Поза каріотипом: мітохондріальна ДНК", hook: "Бонусний день. Тридцять сім генів у кільцевій молекулі на 16 569 пар нуклеотидів, яка передається по материнській лінії й працює в енергетичних станціях клітини." },
      en: { title: "Beyond the karyotype: mitochondrial DNA", hook: "Bonus day. Thirty-seven genes in a circular molecule of 16,569 base pairs, passed down the maternal line and at work in the cell’s power stations." } }
  ];

  /* Джерела до тез днів 6–24: номер дня → список [опис, PubMed ID] */
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
    23: [["Hillmer et al., Am J Hum Genet, 2005", 15902657], ["Migeon, JAMA, 2006", 16551715], ["Koopman et al., Nature, 1991", 2030730], ["Ross et al., Nature, 2005", 15772651], ["Carrel & Willard, Nature, 2005", 15772666], ["Sinclair et al., Nature, 1990", 1695712], ["Skaletsky et al., Nature, 2003", 12815422], ["Rhie et al., Nature, 2023", 37612512]],
    24: [["Anderson et al., Nature, 1981", 7219534], ["Taanman, Biochim Biophys Acta, 1999", 10076021], ["Giles et al., Proc Natl Acad Sci U S A, 1980", 6256757]]
  };
  DAYS.forEach((d) => { if (MORE[d.d]) d.refs = MORE[d.d].map((r) => [r[0], PM(r[1])]); });

  window.ADVENT_DAYS = DAYS;
})();
