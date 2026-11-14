/* «23 пари» · повні тексти днів 6–24: вступ про хромосому, ген дня, що відомо, чого це не означає, порада дня.
   Доповнює js/days.js; позначка {n} — n-те джерело дня (нові джерела додаються після наявних). */
(function () {
  const DAYS = window.ADVENT_DAYS;
  if (!DAYS) return;
  const FULL = {
 "6": {
  "refs": [
   [
    "Schuppan et al., Gastroenterology, 2009",
    "https://pubmed.ncbi.nlm.nih.gov/19766641/"
   ],
   [
    "Karell et al., Hum Immunol, 2003",
    "https://pubmed.ncbi.nlm.nih.gov/12651074/"
   ],
   [
    "Hadithi et al., Ann Intern Med, 2007",
    "https://pubmed.ncbi.nlm.nih.gov/17785484/"
   ],
   [
    "Liu et al., N Engl J Med, 2014",
    "https://pubmed.ncbi.nlm.nih.gov/24988556/"
   ],
   [
    "Lebwohl et al., Lancet, 2018",
    "https://pubmed.ncbi.nlm.nih.gov/28760445/"
   ],
   [
    "Lebwohl et al., BMJ, 2017",
    "https://pubmed.ncbi.nlm.nih.gov/28465308/"
   ],
   [
    "Megiorni et al., Hum Immunol, 2009",
    "https://pubmed.ncbi.nlm.nih.gov/19027045/"
   ],
   [
    "Singh et al., Am J Gastroenterol, 2015",
    "https://pubmed.ncbi.nlm.nih.gov/26416192/"
   ],
   [
    "Leffler et al., Gut, 2013",
    "https://pubmed.ncbi.nlm.nih.gov/22619366/"
   ],
   [
    {
     "uk": "Ensembl, збірка геному GRCh38: хромосома 6",
     "en": "Ensembl, GRCh38 genome assembly: chromosome 6"
    },
    "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=6"
   ]
  ],
  "uk": {
   "intro": "171 мільйон пар нуклеотидів і близько 1 050 генів.{13} Тут же гени обміну заліза, ліпопротеїну(a) та рецептора естрогену.",
   "role": "HLA — це не один ген, а група генів головного комплексу гістосумісності.{3} Їхні білки показують імунним клітинам фрагменти білків, зокрема мікробних, і так допомагають відрізняти своє від чужого.{2}{3}",
   "known": "Целіакія — одна з найповніше вивчених хвороб, пов’язаних з HLA.{4} Серед 1 008 європейців із целіакією варіанти HLA-DQ2 або DQ8 мали всі, крім 61, а зовсім без «половинки» DQ2 було лише четверо.{5} У дослідженні 463 пацієнтів, направлених на біопсію, негативний результат HLA-типування виключав целіакію.{6}",
   "not": "Мати DQ2 чи DQ8 — не діагноз: серед дітей з однією копією DQ2 целіакія до п’яти років розвинулася в 3%, із двома копіями в 11%.{7} Діагноз ставлять за антитілами в крові та біопсією слизової кишки, а не за генотипом.{8}",
   "tip": [
    {
     "k": "Для всіх",
     "s": "будь-який генотип",
     "t": "Не відмовляйтеся від глютену без діагнозу: разом із ним із раціону часто зникають цільнозернові продукти.",
     "f": "За 26 років спостереження за 64 714 жінками і 45 303 чоловіками без целіакії споживання глютену не було пов’язане з ризиком ішемічної хвороби серця. Уникання глютену може зменшити споживання корисних цільнозернових.{9}"
    },
    {
     "k": "Є DQ2 або DQ8",
     "s": "генотип",
     "t": "Порада не змінюється: без симптомів і діагнозу безглютенова дієта не потрібна. Генотип лише показує, що целіакія можлива.",
     "f": "Навіть у групі найвищого ризику, з DQ2 і DQ8 водночас, целіакію мав 1 із 7, а без варіантів ризику 1 із 2 518: розрахунок за даними 437 хворих дітей і 551 людини контрольної групи за поширеності 1 на 100.{10}"
    },
    {
     "k": "Целіакія в родині",
     "s": "група ризику",
     "t": "Обговоріть обстеження з лікарем. До аналізів не прибирайте глютен із раціону: без нього результат може бути хибно негативним.",
     "f": "Целіакію мали 7,5% із 10 252 родичів першого ступеня, найчастіше сестри й доньки хворих (1 із 7 та 1 із 8).{11} У дорослих із целіакією на безглютеновій дієті антитіла помітно зростали лише на 28-й день після повернення глютену.{12}"
    }
   ],
   "tipNote": "Дані про глютен і серце спостережні: вони показують зв’язок, а не доведену причину."
  },
  "en": {
   "intro": "171 million base pairs and about 1,050 genes.{13} Also here: genes for iron metabolism, lipoprotein(a) and the oestrogen receptor.",
   "role": "HLA is not a single gene but a group of genes in the major histocompatibility complex.{3} Their proteins display fragments of proteins, including microbial ones, to immune cells and so help to tell self from non-self.{2}{3}",
   "known": "Coeliac disease is one of the best-understood HLA-linked disorders.{4} Among 1,008 Europeans with coeliac disease, all but 61 carried the HLA-DQ2 or DQ8 variants, and only four lacked even one “half” of DQ2.{5} In a study of 463 patients referred for biopsy, a negative HLA typing result ruled coeliac disease out.{6}",
   "not": "Carrying DQ2 or DQ8 is not a diagnosis: among children with one copy of DQ2, coeliac disease developed by the age of five in 3%, and with two copies in 11%.{7} The diagnosis is made from blood antibodies and a biopsy of the gut lining, not from genotype.{8}",
   "tip": [
    {
     "k": "Everyone",
     "s": "any genotype",
     "t": "Do not give up gluten without a diagnosis: whole grains often leave the diet along with it.",
     "f": "Over 26 years of follow-up of 64,714 women and 45,303 men without coeliac disease, gluten intake was not linked to the risk of coronary heart disease. Avoiding gluten may reduce the intake of beneficial whole grains.{9}"
    },
    {
     "k": "DQ2 or DQ8 present",
     "s": "genotype",
     "t": "The advice does not change: without symptoms and a diagnosis, a gluten-free diet is not needed. The genotype only shows that coeliac disease is possible.",
     "f": "Even in the highest-risk group, with both DQ2 and DQ8, 1 person in 7 had coeliac disease, and with no risk variants 1 in 2,518: a calculation from 437 affected children and 551 controls, assuming a prevalence of 1 in 100.{10}"
    },
    {
     "k": "Coeliac in the family",
     "s": "risk group",
     "t": "Discuss testing with a doctor. Do not cut gluten out of your diet before the tests: without it the result may be falsely negative.",
     "f": "Coeliac disease was found in 7.5% of 10,252 first-degree relatives, most often sisters and daughters (1 in 7 and 1 in 8).{11} In adults with coeliac disease on a gluten-free diet, antibodies rose markedly only by day 28 of a return to gluten.{12}"
    }
   ],
   "tipNote": "The data on gluten and the heart are observational: they show an association, not a proven cause."
  }
 },
 "7": {
  "refs": [
   [
    "Duffy et al., Chemosens Percept, 2010",
    "https://pubmed.ncbi.nlm.nih.gov/21157576/"
   ],
   [
    "Gorovic et al., Scand J Clin Lab Invest, 2011",
    "https://pubmed.ncbi.nlm.nih.gov/21338274/"
   ],
   [
    "Meng et al., J Nutr, 2023",
    "https://pubmed.ncbi.nlm.nih.gov/37716607/"
   ],
   [
    "Zhang et al., Am J Clin Nutr, 2011",
    "https://pubmed.ncbi.nlm.nih.gov/21593509/"
   ],
   [
    "Fisher et al., J Acad Nutr Diet, 2012",
    "https://pubmed.ncbi.nlm.nih.gov/22741167/"
   ],
   [
    "Mohd Nor et al., Appetite, 2021",
    "https://pubmed.ncbi.nlm.nih.gov/33049340/"
   ],
   [
    {
     "uk": "Ensembl, збірка геному GRCh38: хромосома 7",
     "en": "Ensembl, GRCh38 genome assembly: chromosome 7"
    },
    "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=7"
   ]
  ],
  "uk": {
   "intro": "159 мільйонів пар нуклеотидів і близько 990 генів.{10} Тут також гени глюкози натще, лептину й апетиту та щільності кісток.",
   "role": "TAS2R38 кодує один із рецепторів гіркого смаку родини TAS2R.{1} Він реагує на сполуки з хімічною групою N-C=S: фенілтіокарбамід (ФТК), пропілтіоурацил і споріднений із ними гойтрин із капустяних овочів.{2}{3}",
   "known": "Два поширені варіанти гена називають PAV («чутливий») і AVI («нечутливий»): люди з двома копіями AVI відчувають гіркоту пропілтіоурацилу слабше, ніж носії хоча б однієї копії PAV.{3}{4} Для ФТК варіанти гена пояснюють 55–85% відмінностей у чутливості між людьми.{1} Для гойтрину цей показник лише близько 16%: рецептор PAV реагує на нього слабко, а рецептор AVI не реагує зовсім.{3}",
   "not": "Генотип не визначає, скільки овочів ви їсте. У данському дослідженні 500 людей варіанти TAS2R38 не були пов’язані зі споживанням капустяних,{5} а серед 26 090 канадців різниця у споживанні овочів між людьми з «чутливими» та «нечутливими» варіантами була мінімальною.{6}",
   "tip": [
    {
     "k": "Для всіх",
     "s": "будь-який генотип",
     "t": "Їжте овочі щодня, зокрема капустяні: броколі, білоголову й цвітну капусту.",
     "f": "Серед 134 796 дорослих у Шанхаї ті, хто їв найбільше капустяних овочів, мали на 22% нижчий ризик смерті за час спостереження, ніж ті, хто їв найменше.{7}"
    },
    {
     "k": "Чутливі до гіркого",
     "s": "зазвичай носії варіанта PAV",
     "t": "Не викреслюйте гіркі овочі, а пом’якшуйте смак: подавайте їх із соусом чи заправкою.",
     "f": "Дошкільнята, чутливі до гіркого, з’їдали на 80% більше сирої броколі із заправкою, ніж без неї. На дітей, нечутливих до гіркого, заправка не впливала.{8}"
    },
    {
     "k": "Дитина не їсть овочі",
     "s": "життєва ситуація",
     "t": "Пропонуйте той самий овоч знову й знову маленькими порціями: звикання працює за будь-якої чутливості до гіркого.",
     "f": "172 дитини 3–5 років десять днів поспіль куштували пюре з ріпи. Споживання й уподобання зросли, а генотип TAS2R38 і чутливість до гіркого на результат не вплинули.{9}"
    }
   ],
   "tipNote": "Дані про овочі й смертність спостережні, а дослідження з дітьми невеликі: це зв’язок, а не доведена причина."
  },
  "en": {
   "intro": "159 million base pairs and about 990 genes.{10} Also here: genes for fasting glucose, leptin and appetite, and bone density.",
   "role": "TAS2R38 encodes one of the bitter taste receptors of the TAS2R family.{1} It responds to compounds containing the N-C=S chemical group: phenylthiocarbamide (PTC), propylthiouracil and the related goitrin found in brassica vegetables.{2}{3}",
   "known": "The two common variants of the gene are called PAV (“sensitive”) and AVI (“insensitive”): people with two copies of AVI taste the bitterness of propylthiouracil less strongly than carriers of at least one PAV copy.{3}{4} For PTC, variants of the gene explain 55–85% of the differences in sensitivity between people.{1} For goitrin the figure is only about 16%: the PAV receptor responds to it weakly, and the AVI receptor not at all.{3}",
   "not": "Genotype does not determine how many vegetables you eat. In a Danish study of 500 people, TAS2R38 variants were not linked to brassica intake,{5} and among 26,090 Canadians the difference in vegetable intake between people with “sensitive” and “insensitive” variants was minimal.{6}",
   "tip": [
    {
     "k": "Everyone",
     "s": "any genotype",
     "t": "Eat vegetables every day, brassicas included: broccoli, cabbage and cauliflower.",
     "f": "Among 134,796 adults in Shanghai, those who ate the most brassica vegetables had a 22% lower risk of death during follow-up than those who ate the least.{7}"
    },
    {
     "k": "Sensitive to bitterness",
     "s": "usually PAV variant carriers",
     "t": "Do not strike bitter vegetables off the menu; soften the taste instead: serve them with a sauce or dressing.",
     "f": "Preschool children sensitive to bitterness ate 80% more raw broccoli with a dressing than plain. For children insensitive to bitterness, the dressing made no difference.{8}"
    },
    {
     "k": "Child refuses vegetables",
     "s": "life situation",
     "t": "Offer the same vegetable again and again in small portions: familiarity works whatever the sensitivity to bitterness.",
     "f": "172 children aged 3–5 tasted turnip purée ten days in a row. Intake and liking rose, and neither TAS2R38 genotype nor sensitivity to bitterness affected the result.{9}"
    }
   ],
   "tipNote": "The data on vegetables and mortality are observational, and the studies in children are small: this is an association, not a proven cause."
  }
 },
 "8": {
  "refs": [
   [
    "Rip et al., Arterioscler Thromb Vasc Biol, 2006",
    "https://pubmed.ncbi.nlm.nih.gov/16574898/"
   ],
   [
    "Sagoo et al., Am J Epidemiol, 2008",
    "https://pubmed.ncbi.nlm.nih.gov/18922999/"
   ],
   [
    "Seip et al., Am J Physiol, 1995",
    "https://pubmed.ncbi.nlm.nih.gov/7864098/"
   ],
   [
    "Haslam et al., J Am Heart Assoc, 2020",
    "https://pubmed.ncbi.nlm.nih.gov/32098600/"
   ],
   [
    "Sentí et al., Hum Genet, 2001",
    "https://pubmed.ncbi.nlm.nih.gov/11702219/"
   ],
   [
    {
     "uk": "Ensembl, збірка геному GRCh38: хромосома 8",
     "en": "Ensembl, GRCh38 genome assembly: chromosome 8"
    },
    "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=8"
   ]
  ],
  "uk": {
   "intro": "145 мільйонів пар нуклеотидів і близько 680 генів.{9} Серед них гени обміну глікогену, ліполізу, альдостерону й артеріального тиску.",
   "role": "LPL кодує ліпопротеїнліпазу: фермент, що розщеплює тригліцериди хіломікронів і ліпопротеїнів дуже низької щільності в крові.{1} Вивільнені жирні кислоти йдуть у жирову тканину на зберігання або в скелетні м’язи й серце, де їх спалюють чи запасають.{2}",
   "known": "Близько 20% людей мають варіант S447X, з яким фермент працює активніше.{4} У метааналізі 89 досліджень його носії мали дещо сприятливіший ліпідний профіль і на 16% нижчі шанси ішемічної хвороби серця.{5} Рідкісні мутації, що пошкоджують ген, знайшли в 0,40% із 46 891 людини: тригліцериди в них були в середньому на 19,6 мг/дл вищі.{3}",
   "not": "Жоден із цих варіантів не є діагнозом: поширені зсувають рівень ліпідів лише помірно.{5} Скільки у вас тригліцеридів, показує аналіз крові, а не генотип.",
   "tip": [
    {
     "k": "Для всіх",
     "s": "будь-який генотип",
     "t": "Рухайтеся регулярно: тренування підвищують активність ліпопротеїнліпази в м’язах і знижують тригліцериди.",
     "f": "У 32 малорухливих чоловіків 5–13 днів тренувань поспіль підвищили активність ліпопротеїнліпази в м’язах на 35%, а тригліцериди знизилися зі 172 до 127 мг/дл.{6}"
    },
    {
     "k": "Підвищені тригліцериди",
     "s": "група ризику",
     "t": "Замініть солодкі напої водою чи несолодким чаєм. Цільові рівні й лікування обговоріть із лікарем.",
     "f": "У Фремінгемському дослідженні ті, хто роками пив понад порцію солодких напоїв на день, мали в 1,52 раза вищий ризик високих тригліцеридів, ніж ті, хто пив їх рідше ніж раз на місяць.{7}"
    },
    {
     "k": "Варіант HindIII",
     "s": "генотип LPL",
     "t": "Порада не змінюється: рух пов’язаний із кращим ліпідним профілем за будь-якого генотипу HindIII. Куріння варто кинути всім.",
     "f": "Серед 520 чоловіків зв’язок активності з нижчими тригліцеридами й вищим ЛПВЩ-холестерином був однаковим за різних генотипів поліморфізму HindIII гена LPL. Найгірший профіль мали малорухливі курці з одним із них, у фізично активних він був помітно кращим.{8}"
    }
   ],
   "tipNote": "Це невеликі та спостережні дослідження: вони показують зв’язок, а не особистий прогноз."
  },
  "en": {
   "intro": "145 million base pairs and about 680 genes.{9} Among them are genes for glycogen metabolism, lipolysis, and aldosterone and blood pressure.",
   "role": "LPL encodes lipoprotein lipase, the enzyme that breaks down the triglycerides of chylomicrons and very-low-density lipoproteins in the blood.{1} The released fatty acids go into fat tissue for storage, or into skeletal muscle and the heart, where they are burned or stored.{2}",
   "known": "About 20% of people carry the S447X variant, with which the enzyme works more actively.{4} In a meta-analysis of 89 studies, its carriers had a modestly more favourable lipid profile and 16% lower odds of coronary heart disease.{5} Rare mutations that damage the gene were found in 0.40% of 46,891 people: their triglycerides were on average 19.6 mg/dL higher.{3}",
   "not": "None of these variants is a diagnosis: the common ones shift lipid levels only modestly.{5} How high your triglycerides are is shown by a blood test, not by genotype.",
   "tip": [
    {
     "k": "Everyone",
     "s": "any genotype",
     "t": "Move regularly: training raises lipoprotein lipase activity in muscle and lowers triglycerides.",
     "f": "In 32 sedentary men, 5–13 consecutive days of exercise raised lipoprotein lipase activity in muscle by 35%, and triglycerides fell from 172 to 127 mg/dL.{6}"
    },
    {
     "k": "Raised triglycerides",
     "s": "risk group",
     "t": "Swap sugary drinks for water or unsweetened tea. Discuss target levels and treatment with a doctor.",
     "f": "In the Framingham Heart Study, people who for years drank more than one serving of sugary drinks a day had a 1.52-fold higher risk of high triglycerides than those who drank them less than once a month.{7}"
    },
    {
     "k": "HindIII variant",
     "s": "LPL genotype",
     "t": "The advice does not change: activity is linked to a better lipid profile whatever the HindIII genotype. Quitting smoking is worthwhile for everyone.",
     "f": "Among 520 men, the link between activity and lower triglycerides and higher HDL cholesterol was the same across genotypes of the LPL HindIII polymorphism. Sedentary smokers with one of them had the worst profile; in physically active ones it was considerably better.{8}"
    }
   ],
   "tipNote": "These are small and observational studies: they show an association, not a personal forecast."
  }
 },
 "9": {
  "refs": [
   [
    "Patenaude et al., Nat Struct Biol, 2002",
    "https://pubmed.ncbi.nlm.nih.gov/12198488/"
   ],
   [
    "Dentali et al., Semin Thromb Hemost, 2012",
    "https://pubmed.ncbi.nlm.nih.gov/22740183/"
   ],
   [
    "He et al., Arterioscler Thromb Vasc Biol, 2012",
    "https://pubmed.ncbi.nlm.nih.gov/22895671/"
   ],
   [
    "Cusack et al., Am J Clin Nutr, 2013",
    "https://pubmed.ncbi.nlm.nih.gov/23697707/"
   ],
   [
    "Wang et al., J Nutr, 2018",
    "https://pubmed.ncbi.nlm.nih.gov/29659952/"
   ],
   [
    "Healy et al., J R Soc Med, 2010",
    "https://pubmed.ncbi.nlm.nih.gov/21037335/"
   ],
   [
    "Chandra et al., Ann Intern Med, 2009",
    "https://pubmed.ncbi.nlm.nih.gov/19581633/"
   ],
   [
    {
     "uk": "Ensembl, збірка геному GRCh38: хромосома 9",
     "en": "Ensembl, GRCh38 genome assembly: chromosome 9"
    },
    "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=9"
   ]
  ],
  "uk": {
   "intro": "138 мільйонів пар нуклеотидів і близько 780 генів.{12} Тут же гени ЛПВЩ-холестерину, щитоподібної залози, сухожиль і зв’язок.",
   "role": "ABO кодує фермент глікозилтрансферазу: він перетворює вуглеводну молекулу-основу, антиген H, на антиген A або B.{1}{5} Варіант A приєднує до неї N-ацетилгалактозамін, варіант B приєднує галактозу, а варіант O дає неактивний білок, і антиген H лишається без змін.{1}{5}",
   "known": "Група крові пов’язана зі згортанням: люди з групою O мають нижчі рівні фактора фон Віллебранда й фактора VIII, ніж решта.{2}{6} У метааналізі 38 досліджень (10 305 випадків венозної тромбоемболії) групи A, B та AB траплялися серед хворих частіше: відношення шансів 2,09.{6} Для ішемічної хвороби серця різниця менша: ризик вищий в 1,11 раза.{7}",
   "not": "Група крові — не діагноз і не прогноз: це статистичний зв’язок у великих групах людей, а не висновок про конкретну людину.{6}{7} Раціон вона теж не визначає: систематичний огляд не знайшов жодного дослідження, яке підтвердило б користь «дієт за групою крові».{8}",
   "tip": [
    {
     "k": "Для всіх",
     "s": "будь-яка група крові",
     "t": "Обирайте раціон за його якістю, а не за групою крові.",
     "f": "У 973 дорослих із надмірною масою тіла суворіше дотримання «дієт за групою крові» було пов’язане зі зниженням ІМТ і обводу талії, але збіг дієти зі справжньою групою нічого не змінював: генотип ABO на ефект не впливав.{9}"
    },
    {
     "k": "Група A, B або AB",
     "s": "будь-яка група, крім O",
     "t": "Порада та сама, що й для групи O: рух, здорова маса тіла, без куріння. Про тромбози у вас чи в родині розкажіть лікареві.",
     "f": "У двох когортах (62 073 жінки й 27 428 чоловіків, понад 20 років спостереження) ризик ішемічної хвороби серця за груп A, B та AB був вищий у 1,06, 1,15 та 1,23 раза, ніж за групи O.{7}"
    },
    {
     "k": "Довго сидите",
     "s": "робота або дорога",
     "t": "Не сидіть годинами без перерви: щонайменше раз на дві години вставайте й проходьтеся. Це стосується будь-якої групи крові.",
     "f": "Сидіння від 10 годин на добу з проміжками від 2 годин без вставання було пов’язане з вищими у 2,8 раза шансами венозної тромбоемболії.{10} У мандрівників ризик зростав на 18% із кожними 2 годинами дороги.{11}"
    }
   ],
   "tipNote": "Це спостережні дані: вони показують зв’язок у великих групах, а не доведену причину."
  },
  "en": {
   "intro": "138 million base pairs and about 780 genes.{12} Also here: genes for HDL cholesterol, the thyroid, and tendons and ligaments.",
   "role": "ABO encodes a glycosyltransferase enzyme: it converts a carbohydrate base molecule, the H antigen, into the A or B antigen.{1}{5} The A variant attaches N-acetylgalactosamine to it, the B variant attaches galactose, and the O variant gives an inactive protein, so the H antigen stays unchanged.{1}{5}",
   "known": "Blood group is linked to clotting: people with group O have lower levels of von Willebrand factor and factor VIII than everyone else.{2}{6} In a meta-analysis of 38 studies (10,305 cases of venous thromboembolism), groups A, B and AB were more common among patients: an odds ratio of 2.09.{6} For coronary heart disease the difference is smaller: a 1.11-fold higher risk.{7}",
   "not": "Blood group is not a diagnosis or a forecast: this is a statistical association in large groups of people, not a conclusion about any one person.{6}{7} Nor does it dictate your diet: a systematic review found no study confirming a benefit of “blood type diets”.{8}",
   "tip": [
    {
     "k": "Everyone",
     "s": "any blood group",
     "t": "Choose a diet for its quality, not for your blood group.",
     "f": "In 973 overweight adults, closer adherence to “blood type diets” was linked to reductions in BMI and waist circumference, but matching the diet to the person’s actual group changed nothing: ABO genotype did not affect the result.{9}"
    },
    {
     "k": "Group A, B or AB",
     "s": "any group except O",
     "t": "The advice is the same as for group O: stay active, keep a healthy weight, do not smoke. Tell your doctor about any clots in you or your family.",
     "f": "In two cohorts (62,073 women and 27,428 men, more than 20 years of follow-up), the risk of coronary heart disease with groups A, B and AB was 1.06, 1.15 and 1.23 times higher than with group O.{7}"
    },
    {
     "k": "Long hours sitting",
     "s": "at work or on the road",
     "t": "Do not sit for hours without a break: get up and walk about at least once every two hours. This applies to any blood group.",
     "f": "Sitting for 10 hours or more a day, with stretches of 2 hours or more without getting up, was linked to 2.8-fold higher odds of venous thromboembolism.{10} In travellers the risk rose by 18% with every 2 hours of travel.{11}"
    }
   ],
   "tipNote": "These are observational data: they show an association in large groups, not a proven cause."
  }
 },
 "10": {
  "refs": [
   [
    "Florez et al., N Engl J Med, 2006",
    "https://pubmed.ncbi.nlm.nih.gov/16855264/"
   ],
   [
    "Jeon et al., Diabetes Care, 2007",
    "https://pubmed.ncbi.nlm.nih.gov/17327354/"
   ],
   [
    "Wang et al., Diabetologia, 2007",
    "https://pubmed.ncbi.nlm.nih.gov/17437080/"
   ],
   [
    "Li et al., Lancet, 2008",
    "https://pubmed.ncbi.nlm.nih.gov/18502303/"
   ],
   [
    {
     "uk": "Ensembl, збірка геному GRCh38: хромосома 10",
     "en": "Ensembl, GRCh38 genome assembly: chromosome 10"
    },
    "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=10"
   ]
  ],
  "uk": {
   "intro": "134 мільйони пар нуклеотидів і близько 730 генів.{8} Тут також гени всмоктування вітаміну B12, довжини теломер і вікової макулярної дегенерації.",
   "role": "TCF7L2 кодує транскрипційний фактор сигнального шляху Wnt: білок, що керує зчитуванням інших генів.{1} В острівцях підшлункової залози від нього залежать вироблення, дозрівання та секреція інсуліну.{2}",
   "known": "Варіант ризику, який позначають DG10S478, поширений: у дослідженні, що відкрило цей зв’язок, одну його копію мали 38% людей, дві копії 7%.{1} Ризик діабету 2 типу в них був вищий в 1,45 та 2,41 раза відповідно.{1} Сусідній варіант rs7903146 пов’язаний зі слабшою секрецією інсуліну, а не з гіршою чутливістю тканин до нього.{3}{4}",
   "not": "Це не діагноз: варіант зсуває ймовірність, але не визначає, чи розвинеться діабет.{1}{4} Чи є порушення обміну глюкози, показує аналіз крові, а не генотип.",
   "tip": [
    {
     "k": "Для всіх",
     "s": "будь-який генотип",
     "t": "Швидка ходьба щонайменше 2,5 години на тиждень: простий спосіб знизити ризик діабету 2 типу.",
     "f": "В огляді 10 когортних досліджень (301 221 учасник) регулярна помірна активність була пов’язана з нижчим на 31% ризиком діабету 2 типу, а регулярна швидка ходьба, зазвичай від 2,5 години на тиждень, із нижчим на 30%.{5}"
    },
    {
     "k": "Генотип TT",
     "s": "варіант rs7903146, дві копії",
     "t": "Порада та сама, і вона працює: у програмах зміни способу життя різниця в ризику між генотипами майже зникала.",
     "f": "У Програмі профілактики діабету люди з генотипом TT (варіант rs7903146) мали в 1,81 раза вищий ризик діабету в групі плацебо і в 1,15 раза в групі зміни способу життя.{4} У фінському дослідженні (сусідній варіант rs12255372): у 2,85 раза в контрольній групі й без зв’язку в групі втручання.{6}"
    },
    {
     "k": "Предіабет",
     "s": "порушена толерантність до глюкози",
     "t": "Зміна харчування й більше руху діють довго. План і контрольні аналізи узгодьте з лікарем.",
     "f": "У китайському дослідженні 577 дорослих із порушеною толерантністю до глюкози шість років зміни способу життя знизили захворюваність на діабет на 51%, а за 20 років спостереження вона була на 43% нижчою.{7}"
    }
   ],
   "tipNote": "У Програмі профілактики діабету різниця в ефекті між генотипами не досягла статистичної значущості, а дані про ходьбу спостережні."
  },
  "en": {
   "intro": "134 million base pairs and about 730 genes.{8} Also here: genes for vitamin B12 absorption, telomere length and age-related macular degeneration.",
   "role": "TCF7L2 encodes a transcription factor of the Wnt signalling pathway: a protein that controls the reading of other genes.{1} In the islets of the pancreas, the production, processing and secretion of insulin depend on it.{2}",
   "known": "The risk variant, known as DG10S478, is common: in the study that discovered the link, 38% of people carried one copy and 7% two copies.{1} Their risk of type 2 diabetes was 1.45 and 2.41 times higher respectively.{1} The neighbouring variant rs7903146 is linked to weaker insulin secretion, not to poorer tissue sensitivity to insulin.{3}{4}",
   "not": "This is not a diagnosis: the variant shifts the probability but does not determine whether diabetes will develop.{1}{4} Whether glucose metabolism is impaired is shown by a blood test, not by genotype.",
   "tip": [
    {
     "k": "Everyone",
     "s": "any genotype",
     "t": "Brisk walking for at least 2.5 hours a week: a simple way to lower the risk of type 2 diabetes.",
     "f": "In a review of 10 cohort studies (301,221 participants), regular moderate activity was linked to a 31% lower risk of type 2 diabetes, and regular brisk walking, typically 2.5 hours a week or more, to a 30% lower risk.{5}"
    },
    {
     "k": "TT genotype",
     "s": "rs7903146 variant, two copies",
     "t": "The advice is the same, and it works: in lifestyle programmes the difference in risk between genotypes almost disappeared.",
     "f": "In the Diabetes Prevention Program, people with the TT genotype (rs7903146 variant) had a 1.81-fold higher risk of diabetes on placebo and a 1.15-fold higher risk with lifestyle change.{4} In the Finnish study (the neighbouring rs12255372 variant): 2.85-fold in the control group and no link in the intervention group.{6}"
    },
    {
     "k": "Prediabetes",
     "s": "impaired glucose tolerance",
     "t": "Changing your diet and moving more has a lasting effect. Agree the plan and follow-up tests with a doctor.",
     "f": "In a Chinese study of 577 adults with impaired glucose tolerance, six years of lifestyle change cut the incidence of diabetes by 51%, and over 20 years of follow-up it remained 43% lower.{7}"
    }
   ],
   "tipNote": "In the Diabetes Prevention Program the difference in effect between genotypes did not reach statistical significance, and the walking data are observational."
  }
 },
 "11": {
  "refs": [
   [
    "Momma et al., Br J Sports Med, 2022",
    "https://pubmed.ncbi.nlm.nih.gov/35228201/"
   ],
   [
    "Clarkson et al., J Appl Physiol, 2005",
    "https://pubmed.ncbi.nlm.nih.gov/15718405/"
   ],
   [
    "Peterson et al., Ageing Res Rev, 2010",
    "https://pubmed.ncbi.nlm.nih.gov/20385254/"
   ],
   [
    {
     "uk": "Ensembl, збірка геному GRCh38: хромосома 11",
     "en": "Ensembl, GRCh38 genome assembly: chromosome 11"
    },
    "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=11"
   ]
  ],
  "uk": {
   "intro": "135 мільйонів пар нуклеотидів і близько 1 300 генів, серед яких гени синтезу вітаміну D, обміну омега-3 й омега-6 жирних кислот і пігментації.{8} Тут зібрано й понад 40% усіх генів нюхових рецепторів людини.{3}",
   "role": "ACTN3 кодує α-актинін-3, білок скелетних м’язів, що зв’язує актин.{1} Він працює лише у швидких волокнах, які розвивають силу на великій швидкості.{1}",
   "known": "Поширений варіант R577X обриває синтез білка: людина з двома його копіями не має α-актиніну-3 зовсім.{1} В елітних спринтерів робочий варіант гена трапляється помітно частіше, ніж у контрольній групі,{1} і метааналіз підтвердив це для європейців.{2} Водночас у загальній популяції генотип не був пов’язаний із силою кисті: дані 7 672 чоловіків і 7 839 жінок.{2}",
   "not": "Відсутність α-актиніну-3 не є хворобою: імовірно, його роботу бере на себе споріднений білок α-актинін-2.{1} Генотип не передбачає спортивних результатів: у дослідженні силових тренувань він пояснив близько 2% приросту сили в жінок, а в чоловіків зв’язку не знайшли.{6}",
   "tip": [
    {
     "k": "Для всіх",
     "s": "будь-який генотип",
     "t": "Додайте силові вправи: навіть 30–60 хвилин на тиждень пов’язані з нижчим ризиком хвороб.",
     "f": "У метааналізі 16 когортних досліджень силові тренування були пов’язані з нижчим на 10–17% ризиком смерті з будь-якої причини, серцево-судинних хвороб і діабету. Найбільший ефект щодо смертності припадав на 30–60 хвилин на тиждень.{5}"
    },
    {
     "k": "Генотип XX",
     "s": "дві копії варіанта R577X",
     "t": "Порада не змінюється: силові тренування працюють і без α-актиніну-3. Обирати вид спорту за генотипом не варто.",
     "f": "Після 12 тижнів силових тренувань руки (247 чоловіків і 355 жінок) генотип пояснював близько 2% приросту сили в жінок, а в чоловіків зв’язку не знайшли. Жінки з генотипом XX додали навіть більше, ніж жінки з двома робочими копіями гена.{6}"
    },
    {
     "k": "Після 50 років",
     "s": "вікова група",
     "t": "Не відкладайте силові вправи через вік: м’язи відповідають на навантаження і після 50. Якщо є хронічні хвороби, програму обговоріть із лікарем.",
     "f": "Метааналіз 47 досліджень із 1 079 учасниками від 50 років: силові тренування підвищували силу на 24–33% залежно від вправи, а інтенсивніші програми давали більший приріст.{7}"
    }
   ],
   "tipNote": "Дані про силові вправи й ризик хвороб спостережні: вони показують зв’язок, а не доведену причину."
  },
  "en": {
   "intro": "135 million base pairs and about 1,300 genes, among them genes for vitamin D synthesis, omega-3 and omega-6 fatty acid metabolism and pigmentation.{8} More than 40% of all human olfactory receptor genes are gathered here too.{3}",
   "role": "ACTN3 encodes α-actinin-3, an actin-binding protein of skeletal muscle.{1} It works only in fast-twitch fibres, which generate force at high velocity.{1}",
   "known": "The common R577X variant cuts protein synthesis short: a person with two copies has no α-actinin-3 at all.{1} In elite sprinters the working version of the gene is markedly more frequent than in controls,{1} and a meta-analysis confirmed this for Europeans.{2} Yet in the general population the genotype was not linked to grip strength: data from 7,672 men and 7,839 women.{2}",
   "not": "Lacking α-actinin-3 is not a disease: the related protein α-actinin-2 probably takes over its job.{1} Genotype does not predict athletic results: in a strength-training study it explained about 2% of the strength gain in women, and no link was found in men.{6}",
   "tip": [
    {
     "k": "Everyone",
     "s": "any genotype",
     "t": "Add strength exercises: even 30–60 minutes a week are linked to a lower risk of disease.",
     "f": "In a meta-analysis of 16 cohort studies, muscle-strengthening activities were linked to a 10–17% lower risk of death from any cause, cardiovascular disease and diabetes. The largest effect on mortality came at 30–60 minutes a week.{5}"
    },
    {
     "k": "XX genotype",
     "s": "two copies of the R577X variant",
     "t": "The advice does not change: strength training works without α-actinin-3 too. There is no point in choosing a sport by genotype.",
     "f": "After 12 weeks of arm strength training (247 men and 355 women), genotype explained about 2% of the strength gain in women, and no link was found in men. Women with the XX genotype gained even more than women with two working copies of the gene.{6}"
    },
    {
     "k": "After 50",
     "s": "age group",
     "t": "Do not put off strength exercises because of age: muscles respond to load after 50 as well. If you have chronic conditions, discuss the programme with a doctor.",
     "f": "A meta-analysis of 47 studies with 1,079 participants aged 50 and over: resistance training raised strength by 24–33% depending on the exercise, and higher-intensity programmes brought greater gains.{7}"
    }
   ],
   "tipNote": "The data on strength exercise and disease risk are observational: they show an association, not a proven cause."
  }
 },
 "12": {
  "refs": [
   [
    "Chen et al., PLoS Med, 2008",
    "https://pubmed.ncbi.nlm.nih.gov/18318597/"
   ],
   [
    "GBD 2016 Alcohol Collaborators, Lancet, 2018",
    "https://pubmed.ncbi.nlm.nih.gov/30146330/"
   ],
   [
    "Jung et al., Alcohol Clin Exp Res, 2014",
    "https://pubmed.ncbi.nlm.nih.gov/24256516/"
   ],
   [
    "Millwood et al., Lancet, 2019",
    "https://pubmed.ncbi.nlm.nih.gov/30955975/"
   ],
   [
    {
     "uk": "Ensembl, збірка геному GRCh38: хромосома 12",
     "en": "Ensembl, GRCh38 genome assembly: chromosome 12"
    },
    "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=12"
   ]
  ],
  "uk": {
   "intro": "133 мільйони пар нуклеотидів і близько 1 030 генів: від рецептора вітаміну D та фактора росту IGF-1 до ділянки, пов’язаної з менопаузою.{7}",
   "role": "ALDH2 кодує мітохондріальну альдегіддегідрогеназу, один із найважливіших ферментів обміну алкоголю.{1} Вона знешкоджує ацетальдегід, проміжний продукт розпаду етанолу, переважно в печінці.{2}",
   "known": "Варіант ALDH2*504Lys, який ще називають ALDH2*2, діє вже в одній копії: вона різко знижує активність ферменту, а дві копії прибирають її зовсім.{1} Після алкоголю в носіїв накопичується ацетальдегід: червоніє обличчя, частішає серцебиття, з’являються нудота й головний біль.{2} Тому люди з двома копіями п’ють значно менше, і в метааналізі систолічний тиск у чоловіків без варіанта був на 7,44 мм рт. ст. вищий, ніж у них.{3}",
   "not": "Варіант ALDH2*2 не показує, скільки людина п’є і чи є в неї проблеми зі здоров’ям: він лише змінює реакцію на алкоголь.{2} А його відсутність, як майже в усіх за межами Східної Азії, не робить алкоголь безпечним: рівень споживання з найменшою шкодою для здоров’я дорівнює нулю.{1}{4}",
   "tip": [
    {
     "k": "Для всіх",
     "s": "будь-який генотип",
     "t": "Що менше алкоголю, то краще для здоров’я.",
     "f": "Аналіз даних 195 країн за 1990–2016 роки: рівень споживання алкоголю, за якого шкода для здоров’я найменша, дорівнював нулю стандартних порцій (по 10 г чистого спирту) на тиждень.{4}"
    },
    {
     "k": "Є варіант ALDH2*2",
     "s": "обличчя червоніє від алкоголю",
     "t": "Рум’янець означає, що ацетальдегід накопичується. Це вагома причина пити якомога менше або не пити зовсім; підвищений тиск обговоріть із лікарем.",
     "f": "У дослідженні 1 763 чоловіків шанси гіпертензії зростали вже від понад 4 порцій на тиждень у тих, хто червоніє від алкоголю (у 2,23 раза), і лише від понад 8 порцій у тих, хто не червоніє (в 1,61 раза).{5}"
    },
    {
     "k": "Немає ALDH2*2",
     "s": "обличчя не червоніє",
     "t": "Алкоголь від цього не безпечніший. Порада та сама: що менше, то краще.",
     "f": "У китайському дослідженні з генетичними даними 161 498 людей помірне споживання не захищало від інсульту: у чоловіків його ризик зростав у 1,27–1,58 раза на кожні 280 г алкоголю на тиждень.{6}"
    }
   ],
   "tipNote": "Це дані спостережних і генетичних досліджень великих груп: вони не є особистим прогнозом."
  },
  "en": {
   "intro": "133 million base pairs and about 1,030 genes: from the vitamin D receptor and the growth factor IGF-1 to a region linked to the menopause.{7}",
   "role": "ALDH2 encodes mitochondrial aldehyde dehydrogenase, one of the most important enzymes in alcohol metabolism.{1} It clears acetaldehyde, an intermediate product of ethanol breakdown, mainly in the liver.{2}",
   "known": "The ALDH2*504Lys variant, also known as ALDH2*2, acts even in a single copy: one copy sharply reduces enzyme activity and two abolish it.{1} After alcohol, acetaldehyde builds up in carriers: the face flushes, the heart beats faster, and nausea and headache follow.{2} People with two copies therefore drink far less, and in a meta-analysis men without the variant had systolic blood pressure 7.44 mmHg higher than they did.{3}",
   "not": "The ALDH2*2 variant does not show how much a person drinks or whether they have health problems: it only changes the reaction to alcohol.{2} And its absence, as in almost everyone outside East Asia, does not make alcohol safe: the level of consumption that minimises harm to health is zero.{1}{4}",
   "tip": [
    {
     "k": "Everyone",
     "s": "any genotype",
     "t": "The less alcohol, the better for your health.",
     "f": "An analysis of data from 195 countries for 1990–2016: the level of alcohol consumption that minimised harm to health was zero standard drinks (10 g of pure alcohol each) a week.{4}"
    },
    {
     "k": "ALDH2*2 variant",
     "s": "the face flushes after alcohol",
     "t": "A flush means acetaldehyde is building up. It is a strong reason to drink as little as possible or not at all; discuss raised blood pressure with a doctor.",
     "f": "In a study of 1,763 men, the odds of hypertension rose from more than 4 drinks a week in those who flush after alcohol (2.23-fold) and only from more than 8 drinks in those who do not (1.61-fold).{5}"
    },
    {
     "k": "No ALDH2*2",
     "s": "the face does not flush",
     "t": "That does not make alcohol any safer. The advice is the same: the less, the better.",
     "f": "In a Chinese study with genetic data on 161,498 people, moderate drinking did not protect against stroke: in men its risk rose 1.27–1.58-fold for every 280 g of alcohol a week.{6}"
    }
   ],
   "tipNote": "These are data from observational and genetic studies of large groups: they are not a personal forecast."
  }
 },
 "13": {
  "refs": [
   [
    "Dunham et al., Nature, 2004",
    "https://pubmed.ncbi.nlm.nih.gov/15057823/"
   ],
   [
    "Mengel-From et al., J Gerontol A Biol Sci Med Sci, 2016",
    "https://pubmed.ncbi.nlm.nih.gov/26405063/"
   ],
   [
    "de Vries et al., Neurobiol Aging, 2017",
    "https://pubmed.ncbi.nlm.nih.gov/28431289/"
   ],
   [
    "Corrêa et al., Sci Rep, 2022",
    "https://pubmed.ncbi.nlm.nih.gov/36266389/"
   ],
   [
    "Pavik et al., Nephrol Dial Transplant, 2013",
    "https://pubmed.ncbi.nlm.nih.gov/23129826/"
   ],
   [
    {
     "uk": "Ensembl, збірка геному GRCh38: хромосома 13",
     "en": "Ensembl, GRCh38 genome assembly: chromosome 13"
    },
    "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=13"
   ]
  ],
  "uk": {
   "intro": "114 мільйонів пар нуклеотидів і близько 320 генів, серед яких ген, пов’язаний із прееклампсією.{10} Густина генів тут одна з найнижчих серед хромосом людини.{5}",
   "role": "KL кодує білок Klotho: його мембранна форма зв’язує фактор росту фібробластів 23, а розчинна циркулює в крові{1} й діє як гормон.{4} У мишей, яким прибрали Klotho в нирках, зростали рівні фосфатів, кальцію й активної форми вітаміну D.{1}",
   "known": "Алель KL-VS об’єднує шість варіантів, які завжди трапляються разом; два з них змінюють амінокислоти в білку.{2} Людей із двома копіями KL-VS серед літніх виявилося менше, ніж очікували, у трьох популяціях (сукупне відношення шансів 2,59).{2} Натомість носії однієї копії мали вищий рівень Klotho в крові й кращі результати когнітивних тестів.{3}",
   "not": "KL-VS не є прогнозом довголіття чи гостроти розуму: пізніші дослідження дали суперечливі результати.{6}{7} В абердинській когорті 1936 року народження носії однієї копії жили не довше, а менше, ніж люди без варіанта.{7}",
   "tip": [
    {
     "k": "Для всіх",
     "s": "будь-який генотип",
     "t": "Тренуйтеся регулярно й не кидайте: рівень Klotho в крові зростає після щонайменше 12 тижнів занять.",
     "f": "Метааналіз 12 публікацій із 621 учасником віком 30–65 років: після тренувань тривалістю від 12 тижнів концентрація Klotho в крові помітно зростала.{8}"
    },
    {
     "k": "Генотип KL-VS",
     "s": "одна або дві копії",
     "t": "Окремої поради для носіїв немає: зв’язок варіанта з довголіттям і когнітивними функціями підтвердили не всі дослідження.",
     "f": "Серед 1 480 данців віком 92–100 років носії однієї копії KL-VS мали гірші, а не кращі когнітивні показники, ніж люди без варіанта.{6}"
    },
    {
     "k": "Хвороба нирок",
     "s": "група ризику",
     "t": "За хронічної хвороби нирок Klotho знижується вже на ранніх стадіях. Харчування й навантаження узгодьте з лікарем.",
     "f": "Нирки є головним джерелом Klotho в крові.{1} У 87 пацієнтів із хронічною хворобою нирок його рівень падав на 3,2 пг/мл на кожен 1 мл/хв/1,73 м² зниження швидкості клубочкової фільтрації.{9}"
    }
   ],
   "tipNote": "Вищий рівень Klotho після тренувань означає зміну показника крові, а не доведене продовження життя."
  },
  "en": {
   "intro": "114 million base pairs and about 320 genes, among them a gene linked to pre-eclampsia.{10} Its gene density is one of the lowest among human chromosomes.{5}",
   "role": "KL encodes the Klotho protein: its membrane-bound form binds fibroblast growth factor 23, while the soluble form circulates in the blood{1} and acts as a hormone.{4} In mice with Klotho removed from the kidneys, levels of phosphate, calcium and the active form of vitamin D rose.{1}",
   "known": "The KL-VS allele combines six variants that always occur together; two of them change amino acids in the protein.{2} People with two copies of KL-VS were under-represented among the elderly in three populations (combined odds ratio 2.59).{2} Carriers of one copy, by contrast, had higher Klotho in the blood and better cognitive test results.{3}",
   "not": "KL-VS is not a forecast of longevity or mental sharpness: later studies gave conflicting results.{6}{7} In the Aberdeen Birth Cohort of 1936, carriers of one copy lived not longer but shorter than people without the variant.{7}",
   "tip": [
    {
     "k": "Everyone",
     "s": "any genotype",
     "t": "Train regularly and keep it up: Klotho in the blood rises after at least 12 weeks of exercise.",
     "f": "A meta-analysis of 12 reports with 621 participants aged 30–65: after exercise training lasting at least 12 weeks, the concentration of Klotho in the blood rose significantly.{8}"
    },
    {
     "k": "KL-VS genotype",
     "s": "one or two copies",
     "t": "There is no separate advice for carriers: not every study confirmed the variant’s link to longevity and cognitive function.",
     "f": "Among 1,480 Danes aged 92–100, carriers of one copy of KL-VS had poorer, not better, cognitive function than people without the variant.{6}"
    },
    {
     "k": "Kidney disease",
     "s": "risk group",
     "t": "In chronic kidney disease Klotho declines from the early stages. Agree your diet and exercise with a doctor.",
     "f": "The kidneys are the main source of Klotho in the blood.{1} In 87 patients with chronic kidney disease its level fell by 3.2 pg/mL for each 1 mL/min/1.73 m² decline in glomerular filtration rate.{9}"
    }
   ],
   "tipNote": "A higher Klotho level after training is a change in a blood marker, not a proven extension of life."
  }
 },
 "14": {
  "refs": [
   [
    "Wouters et al., Thyroid, 2017",
    "https://pubmed.ncbi.nlm.nih.gov/27786042/"
   ],
   [
    "Panicker et al., J Clin Endocrinol Metab, 2009",
    "https://pubmed.ncbi.nlm.nih.gov/19190113/"
   ],
   [
    "Garmendia Madariaga et al., J Clin Endocrinol Metab, 2014",
    "https://pubmed.ncbi.nlm.nih.gov/24423323/"
   ],
   [
    "Zimmermann, Endocr Rev, 2009",
    "https://pubmed.ncbi.nlm.nih.gov/19460960/"
   ],
   [
    {
     "uk": "Ensembl, збірка геному GRCh38: хромосома 14",
     "en": "Ensembl, GRCh38 genome assembly: chromosome 14"
    },
    "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=14"
   ]
  ],
  "uk": {
   "intro": "107 мільйонів пар нуклеотидів і близько 820 генів: від гена фолатного циклу й білка-переносника кортизолу до ділянки, пов’язаної з внутрішньоочним тиском.{8}",
   "role": "DIO2 кодує дейодиназу 2 типу, фермент, що містить селен.{1} Вона перетворює тироксин (Т4) на активний трийодтиронін (Т3) просто у тканинах і так підлаштовує кількість гормону під потреби кожної з них.{1}",
   "known": "Дві копії поширеного варіанта Thr92Ala має приблизно кожна дев’ята людина: 10,7% у популяційній когорті LifeLines.{4} У дослідженні 552 людей, які приймали тироксин, носії двох копій мали дещо гірше психологічне самопочуття, хоча рівень гормонів у крові не відрізнявся.{5} Більша робота цього не підтвердила: у когорті з 12 625 учасників варіант не був пов’язаний ні з гормонами щитоподібної залози, ні з якістю життя, ні з когнітивними функціями.{4}",
   "not": "Варіант Thr92Ala не означає хвороби щитоподібної залози: з рівнем ТТГ і гормонів у крові він не пов’язаний.{4}{5} Роботу залози показує аналіз крові, а не генотип: у Європі недіагностований гіпотиреоз мають у середньому 4,94% людей.{6}",
   "tip": [
    {
     "k": "Для всіх",
     "s": "будь-який генотип",
     "t": "Замініть звичайну сіль йодованою, не збільшуючи її кількості: йод потрібен для синтезу гормонів щитоподібної залози.",
     "f": "За оцінкою 2009 року, близько 50% Європи лишалося в зоні легкого йододефіциту. Загальне йодування солі вважають головним способом контролювати його в більшості країн.{7}"
    },
    {
     "k": "Генотип Ala/Ala",
     "s": "дві копії варіанта",
     "t": "Порада не змінюється. Окремих правил харчування чи способу життя для носіїв варіанта немає.",
     "f": "У когорті LifeLines із 12 625 учасників варіант не був пов’язаний з якістю життя чи когнітивними функціями, а в 4 479 людей із виміряними гормонами не був пов’язаний і з рівнем ТТГ, вільних Т4 і Т3.{4}"
    },
    {
     "k": "Приймаєте тироксин",
     "s": "замісна терапія",
     "t": "Не змінюйте лікування через варіант DIO2. Якщо симптоми лишаються попри нормальні аналізи, обговоріть це з лікарем.",
     "f": "Дослідження 552 пацієнтів пов’язало варіант із гіршим самопочуттям на тироксині, але автори зазначили, що результат потребує відтворення.{5} Серед 364 людей на замісній терапії в іншій когорті зв’язку не знайшли.{4}"
    }
   ]
  },
  "en": {
   "intro": "107 million base pairs and about 820 genes: from a folate-cycle gene and the cortisol-carrying protein to a region linked to intraocular pressure.{8}",
   "role": "DIO2 encodes type 2 deiodinase, a selenium-containing enzyme.{1} It converts thyroxine (T4) into active triiodothyronine (T3) right in the tissues, tuning the amount of hormone to the needs of each one.{1}",
   "known": "About one person in nine carries two copies of the common Thr92Ala variant: 10.7% in the population-based LifeLines cohort.{4} In a study of 552 people taking thyroxine, carriers of two copies had slightly poorer psychological well-being, although blood hormone levels did not differ.{5} A larger study did not confirm this: in a cohort of 12,625 participants the variant was not linked to thyroid hormones, quality of life or cognitive function.{4}",
   "not": "The Thr92Ala variant does not mean thyroid disease: it is not linked to TSH or hormone levels in the blood.{4}{5} Thyroid function is shown by a blood test, not by genotype: in Europe an average of 4.94% of people have undiagnosed hypothyroidism.{6}",
   "tip": [
    {
     "k": "Everyone",
     "s": "any genotype",
     "t": "Swap ordinary salt for iodised salt without using more of it: iodine is needed to make thyroid hormones.",
     "f": "According to a 2009 estimate, about 50% of Europe remained mildly iodine deficient. Universal salt iodisation is regarded as the main way to control deficiency in most countries.{7}"
    },
    {
     "k": "Ala/Ala genotype",
     "s": "two copies of the variant",
     "t": "The advice does not change. There are no separate diet or lifestyle rules for carriers of the variant.",
     "f": "In the LifeLines cohort of 12,625 participants the variant was not linked to quality of life or cognitive function, nor, in the 4,479 people with hormone data, to TSH, free T4 or free T3 levels.{4}"
    },
    {
     "k": "Taking thyroxine",
     "s": "replacement therapy",
     "t": "Do not change your treatment because of a DIO2 variant. If symptoms persist despite normal test results, discuss this with a doctor.",
     "f": "A study of 552 patients linked the variant to poorer well-being on thyroxine, but the authors noted that the result requires replication.{5} Among 364 people on replacement therapy in another cohort, no link was found.{4}"
    }
   ]
  }
 },
 "15": {
  "refs": [
   [
    "Zhou & Hyppönen, Am J Clin Nutr, 2019",
    "https://pubmed.ncbi.nlm.nih.gov/30838377/"
   ],
   [
    "Wikoff et al., Food Chem Toxicol, 2017",
    "https://pubmed.ncbi.nlm.nih.gov/28438661/"
   ],
   [
    "Drake et al., J Clin Sleep Med, 2013",
    "https://pubmed.ncbi.nlm.nih.gov/24235903/"
   ],
   [
    "Faber & Fuhr, Clin Pharmacol Ther, 2004",
    "https://pubmed.ncbi.nlm.nih.gov/15289794/"
   ],
   [
    {
     "uk": "Ensembl, збірка геному GRCh38: хромосома 15",
     "en": "Ensembl, GRCh38 genome assembly: chromosome 15"
    },
    "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=15"
   ]
  ],
  "uk": {
   "intro": "102 мільйони пар нуклеотидів і близько 610 генів: від пігментації шкіри й ароматази, що утворює естрогени, до генів, пов’язаних із нікотиновою залежністю.{9}",
   "role": "CYP1A2 кодує фермент родини цитохромів P450.{2} Він переробляє 95% спожитого кофеїну{1} і бере участь у метаболізмі низки ліків.{4}",
   "known": "Поширений варіант у першому інтроні гена (заміна C на A в позиції 734), імовірно, визначає, наскільки фермент пришвидшується під дією тютюнового диму: серед 236 людей різниця між генотипами проявилася лише в курців.{4} У дослідженні 4 028 жителів Коста-Рики чотири й більше чашок кави на день були пов’язані з вищими в 1,64 раза шансами інфаркту тільки в носіїв «повільного» алеля CYP1A2*1F.{2} Але серед 347 077 учасників UK Biobank генотип CYP1A2 не змінював зв’язку кави із серцево-судинними хворобами.{5}",
   "not": "Генотип не визначає «вашу» норму кави: на швидкість переробки кофеїну впливають також вік, стать і гормони, куріння, ожиріння, харчування і хвороби печінки.{1} Сам варіант не був пов’язаний із серцево-судинними хворобами.{5}",
   "tip": [
    {
     "k": "Для всіх",
     "s": "здорові дорослі",
     "t": "До 400 мг кофеїну на день; під час вагітності менше, межу обговоріть із лікарем. Остання кава щонайменше за 6 годин до сну.",
     "f": "Огляд 381 дослідження не пов’язав із небажаними ефектами до 400 мг кофеїну на день у здорових дорослих і до 300 мг у вагітних.{6} Водночас 400 мг навіть за 6 годин до сну помітно порушували сон.{7}"
    },
    {
     "k": "Алель CYP1A2*1F",
     "s": "«повільний» варіант",
     "t": "Порада та сама: помірність. Окремої межі для носіїв варіанта дослідження надійно не встановили.",
     "f": "Серед 347 077 учасників UK Biobank понад 6 чашок кави на день були пов’язані з вищими на 22% шансами серцево-судинних хвороб, ніж 1–2 чашки, і генотип CYP1A2 цього не змінював.{5}"
    },
    {
     "k": "Кидаєте курити",
     "s": "життєва ситуація",
     "t": "Звична кількість кави може діяти сильніше: за потреби зменште її. Якщо приймаєте ліки, скажіть лікареві, що кинули курити.",
     "f": "Куріння посилює активність CYP1A2. У 12 людей, які викурювали щонайменше 20 сигарет на день, після відмови від куріння кліренс кофеїну знизився на 36,1%.{8}"
    }
   ],
   "tipNote": "Дані про каву й серцево-судинні хвороби спостережні: вони показують зв’язок, а не доведену причину."
  },
  "en": {
   "intro": "102 million base pairs and about 610 genes: from skin pigmentation and aromatase, which makes oestrogens, to genes linked to nicotine dependence.{9}",
   "role": "CYP1A2 encodes an enzyme of the cytochrome P450 family.{2} It processes 95% of ingested caffeine{1} and takes part in the metabolism of a number of medicines.{4}",
   "known": "A common variant in the first intron of the gene (a C-to-A change at position 734) probably determines how far the enzyme speeds up under tobacco smoke: among 236 people the difference between genotypes showed only in smokers.{4} In a study of 4,028 people in Costa Rica, four or more cups of coffee a day were linked to 1.64-fold higher odds of a heart attack only in carriers of the “slow” CYP1A2*1F allele.{2} But among 347,077 UK Biobank participants, CYP1A2 genotype did not change the link between coffee and cardiovascular disease.{5}",
   "not": "Genotype does not set “your” coffee limit: the speed of caffeine processing also depends on age, sex and hormones, smoking, obesity, diet and liver disease.{1} The variant itself was not linked to cardiovascular disease.{5}",
   "tip": [
    {
     "k": "Everyone",
     "s": "healthy adults",
     "t": "Up to 400 mg of caffeine a day; less during pregnancy, and discuss the limit with a doctor. The last coffee at least 6 hours before bed.",
     "f": "A review of 381 studies did not link up to 400 mg of caffeine a day in healthy adults, or up to 300 mg in pregnant women, to adverse effects.{6} Yet 400 mg taken even 6 hours before bedtime disrupted sleep significantly.{7}"
    },
    {
     "k": "CYP1A2*1F allele",
     "s": "the “slow” variant",
     "t": "The advice is the same: moderation. Studies have not reliably established a separate limit for carriers of the variant.",
     "f": "Among 347,077 UK Biobank participants, more than 6 cups of coffee a day were linked to 22% higher odds of cardiovascular disease than 1–2 cups, and CYP1A2 genotype did not change this.{5}"
    },
    {
     "k": "Quitting smoking",
     "s": "life situation",
     "t": "Your usual amount of coffee may hit harder: cut down if you need to. If you take medicines, tell your doctor that you have stopped smoking.",
     "f": "Smoking induces CYP1A2 activity. In 12 people who smoked at least 20 cigarettes a day, caffeine clearance fell by 36.1% after they stopped.{8}"
    }
   ],
   "tipNote": "The data on coffee and cardiovascular disease are observational: they show an association, not a proven cause."
  }
 },
 "16": {
  "refs": [
   [
    "Hughes et al., Ann Intern Med, 2013",
    "https://pubmed.ncbi.nlm.nih.gov/23732711/"
   ],
   [
    "Flanagan et al., J Invest Dermatol, 2001",
    "https://pubmed.ncbi.nlm.nih.gov/11710950/"
   ],
   [
    "Healy et al., Lancet, 2000",
    "https://pubmed.ncbi.nlm.nih.gov/10744096/"
   ],
   [
    {
     "uk": "Ensembl, збірка геному GRCh38: хромосома 16",
     "en": "Ensembl, GRCh38 genome assembly: chromosome 16"
    },
    "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=16"
   ],
   [
    "Smith et al., J Invest Dermatol, 1998",
    "https://pubmed.ncbi.nlm.nih.gov/9665397/"
   ]
  ],
  "uk": {
   "intro": "90 мільйонів пар нуклеотидів і близько 870 генів, серед яких гени апетиту й маси тіла, ЛПВЩ-холестерину та навіть типу вушної сірки.{9}",
   "role": "MC1R кодує рецептор на меланоцитах, клітинах, що виробляють пігмент.{1} Через нього меланоцитстимулювальний гормон посилює синтез чорного еумеланіну, який захищає шкіру від ультрафіолету; рудий феомеланін, навпаки, може сприяти її пошкодженню.{1}",
   "known": "Варіантів MC1R відомо багато; з рудим волоссям пов’язали насамперед три: Arg151Cys, Arg160Trp і Asp294His.{10} Варіанти MC1R знайшли в понад 80% людей із рудим волоссям або світлою шкірою, яка погано засмагає, і менш ніж у 20% людей із каштановим чи чорним волоссям.{1} З одним варіантом ризик веснянок утричі вищий, із двома — в 11 разів, незалежно від типу шкіри й кольору волосся.{2}",
   "not": "Це не діагноз: варіанти MC1R мали й люди з темним волоссям, а серед тих, хто добре засмагає, їх знаходили менш ніж у 4%.{1} І навпаки, темне волосся не означає, що варіанта немає: у людей без рудого волосся ступінь засмаги теж залежав від кількості варіантів гена.{8}",
   "tip": [
    {
     "k": "Для всіх",
     "s": "будь-який генотип",
     "t": "Користуйтеся сонцезахисним засобом широкого спектра щодня, а не лише на пляжі, і не допускайте сонячних опіків.",
     "f": "У рандомізованому дослідженні за участю 903 дорослих шкіра тих, хто наносив сонцезахисний засіб щодня, за 4,5 року постаріла на 24% менше, ніж у тих, хто користувався ним на власний розсуд.{6}"
    },
    {
     "k": "Руде волосся",
     "s": "зазвичай два варіанти MC1R",
     "t": "Порада та сама, але запас менший: не чекайте, доки шкіра почервоніє. Після порогової дози вона реагує на сонце сильніше.",
     "f": "У досліді з 20 рудими й 20 нерудими людьми мінімальна доза ультрафіолету, що спричиняє почервоніння, не відрізнялася (44 і 40 мДж/см²), але за більших доз шкіра рудих червоніла інтенсивніше. Два варіанти MC1R мали 89% рудих, чий ген прочитали.{7}"
    },
    {
     "k": "Один варіант MC1R",
     "s": "волосся може бути темним",
     "t": "Орієнтуйтеся на те, як шкіра засмагає, а не на колір волосся. Якщо засмага береться погано, захищайтеся так само ретельно, як руді.",
     "f": "Варіанти MC1R мали менш ніж 20% людей із каштановим чи чорним волоссям.{1} У людей без рудого волосся ступінь засмаги після повторного перебування на сонці залежав від кількості варіантів: носії одного були посередині.{8}"
    }
   ],
   "tipNote": "Дані про варіанти MC1R і реакцію шкіри на сонце показують зв’язок у групах людей, а не особистий прогноз."
  },
  "en": {
   "intro": "90 million base pairs and about 870 genes, among them genes for appetite and body weight, HDL cholesterol and even earwax type.{9}",
   "role": "MC1R encodes a receptor on melanocytes, the cells that make pigment.{1} Through it, melanocyte-stimulating hormone boosts the production of black eumelanin, which protects the skin from ultraviolet light; red phaeomelanin, by contrast, may add to the damage.{1}",
   "known": "Many MC1R variants are known; three in particular have been linked to red hair: Arg151Cys, Arg160Trp and Asp294His.{10} MC1R variants were found in over 80% of people with red hair or fair skin that tans poorly, and in fewer than 20% of people with brown or black hair.{1} With one variant the risk of freckles is three times higher, with two it is 11 times higher, regardless of skin type and hair colour.{2}",
   "not": "This is not a diagnosis: people with dark hair carried MC1R variants too, and among those who tan well they were found in fewer than 4%.{1} Conversely, dark hair does not mean there is no variant: in people without red hair, the degree of tanning also depended on the number of variants of the gene.{8}",
   "tip": [
    {
     "k": "Everyone",
     "s": "any genotype",
     "t": "Use a broad-spectrum sunscreen every day, not only on the beach, and avoid getting sunburnt.",
     "f": "In a randomised trial of 903 adults, the skin of those who applied sunscreen daily aged 24% less over 4.5 years than the skin of those who used it at their own discretion.{6}"
    },
    {
     "k": "Red hair",
     "s": "usually two MC1R variants",
     "t": "The advice is the same, but the margin is smaller: do not wait until the skin turns red. Past the threshold dose it reacts to the sun more strongly.",
     "f": "In an experiment with 20 red-haired and 20 other people, the minimal ultraviolet dose that causes redness did not differ (44 and 40 mJ/cm²), but at higher doses redheads’ skin reddened more intensely. 89% of the redheads sequenced had two MC1R variants.{7}"
    },
    {
     "k": "One MC1R variant",
     "s": "hair may be dark",
     "t": "Go by how your skin tans, not by your hair colour. If it tans poorly, protect it as carefully as redheads do.",
     "f": "Fewer than 20% of people with brown or black hair carried MC1R variants.{1} In people without red hair, the degree of tanning after repeated sun exposure depended on the number of variants: carriers of one were in between.{8}"
    }
   ],
   "tipNote": "The data on MC1R variants and the skin’s response to the sun show an association in groups of people, not a personal forecast."
  }
 },
 "17": {
  "refs": [
   [
    "Ma et al., PLoS One, 2013",
    "https://pubmed.ncbi.nlm.nih.gov/23358679/"
   ],
   [
    "Rankinen et al., J Appl Physiol, 2000 (GENATHLETE)",
    "https://pubmed.ncbi.nlm.nih.gov/10797114/"
   ],
   [
    "Cornelissen & Smart, J Am Heart Assoc, 2013",
    "https://pubmed.ncbi.nlm.nih.gov/23525435/"
   ],
   [
    "He et al., BMJ, 2013",
    "https://pubmed.ncbi.nlm.nih.gov/23558162/"
   ],
   [
    "Rankinen et al., J Appl Physiol, 2000 (HERITAGE)",
    "https://pubmed.ncbi.nlm.nih.gov/10710400/"
   ],
   [
    {
     "uk": "Ensembl, збірка геному GRCh38: хромосома 17",
     "en": "Ensembl, GRCh38 genome assembly: chromosome 17"
    },
    "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=17"
   ]
  ],
  "uk": {
   "intro": "83 мільйони пар нуклеотидів і близько 1 200 генів, серед яких гени, пов’язані з кістками та сполучною тканиною, рівнем тестостерону й астмою.{9}",
   "role": "ACE кодує ангіотензинперетворювальний фермент.{3} Він перетворює ангіотензин I на ангіотензин II, що звужує судини, і руйнує брадикінін, який їх розширює, тому відіграє ключову роль у регуляції тонусу судин.{3}",
   "known": "Поліморфізм I/D — це наявність (I) чи відсутність (D) у гені фрагмента завдовжки близько 250 пар нуклеотидів; він пояснює 47% відмінностей у рівні ферменту в крові.{1} Алель I пов’язують із витривалістю, алель D із силою та потужністю.{2} У метааналізі генотип II був пов’язаний із результатами у видах спорту на витривалість: відношення шансів 1,35.{4}",
   "not": "Генотип ACE не прогнозує спортивних результатів: серед 192 чоловіків, елітних спортсменів у видах на витривалість, алель I траплявся не частіше, ніж серед 189 чоловіків, які не тренуються.{5} Результат у спорті складається з багатьох генів, тренувань і умов, тож один варіант його не визначає.",
   "tip": [
    {
     "k": "Для всіх",
     "s": "будь-який генотип",
     "t": "Рухайтеся регулярно: аеробні навантаження на кшталт ходьби, бігу, велосипеда чи плавання знижують артеріальний тиск.",
     "f": "Метааналіз 93 рандомізованих досліджень (5 223 учасники): тренування на витривалість знижували систолічний тиск у середньому на 3,5 мм рт. ст., а діастолічний на 2,5 мм рт. ст.{6}"
    },
    {
     "k": "Підвищений тиск",
     "s": "група ризику",
     "t": "Менше солі й регулярні аеробні тренування. Це доповнює призначене лікування, а не замінює його: план обговоріть із лікарем.",
     "f": "У людей із гіпертензією тренування на витривалість знижували тиск на 8,3/5,2 мм рт. ст.,{6} а помірне обмеження солі на 5,4/2,8 мм рт. ст.: метааналіз 34 досліджень.{7}"
    },
    {
     "k": "Генотип II, ID чи DD",
     "s": "поліморфізм ACE",
     "t": "Окремої поради немає: добирати вид спорту чи навантаження за генотипом ACE підстав немає. Тренуватися варто за будь-якого генотипу.",
     "f": "У дослідженні HERITAGE 724 людини 20 тижнів тренувалися за однаковою програмою. Із 216 перевірених зв’язків із генотипом ACE значущими виявилися лише 11, і великої ролі гена у витривалості автори не побачили.{8}"
    }
   ]
  },
  "en": {
   "intro": "83 million base pairs and about 1,200 genes, among them genes linked to bones and connective tissue, testosterone levels and asthma.{9}",
   "role": "ACE encodes angiotensin-converting enzyme.{3} It converts angiotensin I into angiotensin II, which narrows blood vessels, and breaks down bradykinin, which widens them, so it plays a key role in regulating vascular tone.{3}",
   "known": "The I/D polymorphism is the presence (I) or absence (D) of a fragment about 250 base pairs long in the gene; it explains 47% of the variation in blood levels of the enzyme.{1} The I allele is linked to endurance, the D allele to strength and power.{2} In a meta-analysis the II genotype was associated with performance in endurance sports: odds ratio 1.35.{4}",
   "not": "ACE genotype does not predict sporting results: among 192 elite male endurance athletes the I allele was no more common than among 189 sedentary men.{5} Sporting results come from many genes, training and circumstances, so a single variant does not decide them.",
   "tip": [
    {
     "k": "Everyone",
     "s": "any genotype",
     "t": "Move regularly: aerobic exercise such as walking, running, cycling or swimming lowers blood pressure.",
     "f": "A meta-analysis of 93 randomised trials (5,223 participants): endurance training lowered systolic blood pressure by 3.5 mm Hg on average and diastolic by 2.5 mm Hg.{6}"
    },
    {
     "k": "Raised blood pressure",
     "s": "risk group",
     "t": "Less salt and regular aerobic training. This adds to prescribed treatment and does not replace it: discuss the plan with a doctor.",
     "f": "In people with hypertension, endurance training lowered blood pressure by 8.3/5.2 mm Hg,{6} and a modest cut in salt by 5.4/2.8 mm Hg: a meta-analysis of 34 trials.{7}"
    },
    {
     "k": "II, ID or DD genotype",
     "s": "ACE polymorphism",
     "t": "There is no separate advice: nothing supports choosing a sport or a training load by ACE genotype. Training is worthwhile whatever the genotype.",
     "f": "In the HERITAGE study, 724 people trained for 20 weeks on the same programme. Of 216 associations tested with ACE genotype only 11 were significant, and the authors saw no major role for the gene in endurance.{8}"
    }
   ]
  }
 },
 "18": {
  "refs": [
   [
    "Li et al., PLoS Med, 2010",
    "https://pubmed.ncbi.nlm.nih.gov/20824172/"
   ],
   [
    "Qi et al., N Engl J Med, 2012",
    "https://pubmed.ncbi.nlm.nih.gov/22998338/"
   ],
   [
    "Robinson et al., Am J Clin Nutr, 2014",
    "https://pubmed.ncbi.nlm.nih.gov/24847856/"
   ],
   [
    {
     "uk": "Ensembl, збірка геному GRCh38: хромосома 18",
     "en": "Ensembl, GRCh38 genome assembly: chromosome 18"
    },
    "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=18"
   ]
  ],
  "uk": {
   "intro": "80 мільйонів пар нуклеотидів і близько 270 генів; окрім MC4R, тут є ділянка, пов’язана з харчовою алергією.{8}",
   "role": "MC4R кодує рецептор меланокортину 4, один із п’яти рецепторів меланокортинової системи.{4} Він працює в мозку, зокрема в гіпоталамусі: його активація зменшує споживання їжі та підвищує витрати енергії.{1}",
   "known": "Поширений варіант rs17782313 за 188 тисяч пар нуклеотидів від гена пов’язаний з ІМТ у понад 77 тисяч дорослих і дітей.{2} У дослідженні 5 724 жінок носійки цього варіанта споживали більше енергії та жирів, а їхній ІМТ за десять років зріс на 0,2 кг/м² більше.{3}",
   "not": "Варіант rs17782313 біля MC4R — не діагноз: кожна його копія зсуває ІМТ дорослих лише на 0,05 стандартного відхилення.{2} Маса тіла залежить і від способу життя: фізична активність пов’язана зі слабшим на 40% впливом генетичної схильності до ожиріння.{5}",
   "tip": [
    {
     "k": "Для всіх",
     "s": "будь-який генотип",
     "t": "Їжте повільніше: так легше з’їсти менше й не залишитися голодним.",
     "f": "Метааналіз 22 експериментальних досліджень: за повільнішого темпу їжі люди споживали менше енергії, а відчуття голоду наприкінці їжі й протягом 3,5 години після неї не відрізнялося.{7}"
    },
    {
     "k": "Варіант rs17782313",
     "s": "біля MC4R: одна чи дві копії",
     "t": "Окремої поради немає, але загальна важить не менше: регулярний рух пов’язаний зі слабшим впливом генетичної схильності на масу тіла.",
     "f": "Серед 20 430 людей кожен алель, що підвищує ІМТ (рахували 12 ділянок геному), відповідав +592 г маси тіла в малоактивних і +379 г в активних, якщо рахувати для зросту 1,70 м.{5}"
    },
    {
     "k": "Солодкі напої щодня",
     "s": "звичка, яку можна змінити",
     "t": "Замініть солодкі напої водою чи несолодким чаєм: що більше таких напоїв, то сильніше виявляється генетична схильність до ожиріння.",
     "f": "Серед 11 357 учасників двох когорт кожні 10 алелів ризику відповідали ІМТ, вищому на 1,00 кг/м² у тих, хто пив солодкі напої рідше ніж раз на місяць, і на 1,78 кг/м² у тих, хто пив їх щодня.{6}"
    }
   ],
   "tipNote": "Дані про рух і солодкі напої спостережні: вони показують зв’язок, а не доведену причину."
  },
  "en": {
   "intro": "80 million base pairs and about 270 genes; besides MC4R, there is a region here linked to food allergy.{8}",
   "role": "MC4R encodes the melanocortin 4 receptor, one of the five receptors of the melanocortin system.{4} It works in the brain, notably in the hypothalamus: its activation reduces food intake and raises energy expenditure.{1}",
   "known": "The common variant rs17782313, 188 thousand base pairs from the gene, is linked to BMI in more than 77,000 adults and children.{2} In a study of 5,724 women, carriers of this variant consumed more energy and fat, and their BMI rose by 0.2 kg/m² more over ten years.{3}",
   "not": "The rs17782313 variant near MC4R is not a diagnosis: each copy shifts adult BMI by only 0.05 of a standard deviation.{2} Body weight also depends on lifestyle: physical activity is linked to a 40% weaker effect of genetic predisposition to obesity.{5}",
   "tip": [
    {
     "k": "Everyone",
     "s": "any genotype",
     "t": "Eat more slowly: it makes it easier to eat less without staying hungry.",
     "f": "A meta-analysis of 22 experimental studies: at a slower eating rate people consumed less energy, while hunger at the end of the meal and for up to 3.5 hours afterwards did not differ.{7}"
    },
    {
     "k": "rs17782313 variant",
     "s": "near MC4R: one or two copies",
     "t": "There is no separate advice, but the general one matters just as much: regular activity is linked to a weaker effect of genetic predisposition on body weight.",
     "f": "Among 20,430 people, each BMI-increasing allele (12 regions of the genome were counted) corresponded to +592 g of body weight in inactive people and +379 g in active ones, calculated for a height of 1.70 m.{5}"
    },
    {
     "k": "Sugary drinks daily",
     "s": "a habit that can be changed",
     "t": "Swap sugary drinks for water or unsweetened tea: the more such drinks, the more strongly genetic predisposition to obesity shows.",
     "f": "Among 11,357 participants in two cohorts, every 10 risk alleles corresponded to a BMI higher by 1.00 kg/m² in those who had sugary drinks less than once a month, and by 1.78 kg/m² in those who had them daily.{6}"
    }
   ],
   "tipNote": "The data on activity and sugary drinks are observational: they show an association, not a proven cause."
  }
 },
 "19": {
  "refs": [
   [
    "Nordgren et al., Emerg Infect Dis, 2010",
    "https://pubmed.ncbi.nlm.nih.gov/20031047/"
   ],
   [
    "Ejemot-Nwadiaro et al., Cochrane Database Syst Rev, 2021",
    "https://pubmed.ncbi.nlm.nih.gov/33539552/"
   ],
   [
    "Pawlak et al., Nutr Rev, 2013",
    "https://pubmed.ncbi.nlm.nih.gov/23356638/"
   ],
   [
    {
     "uk": "Ensembl, збірка геному GRCh38: хромосома 19",
     "en": "Ensembl, GRCh38 genome assembly: chromosome 19"
    },
    "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=19"
   ]
  ],
  "uk": {
   "intro": "58,6 мільйона пар нуклеотидів і близько 1 470 генів, серед яких гени ліпідного обміну, обміну вітаміну K та жиру печінки.{9} Щільність генів тут найвища серед усіх хромосом людини, більш ніж удвічі вища за середню в геномі.{1}",
   "role": "FUT2 кодує фермент фукозилтрансферазу, що створює антиген H у слині та на слизових оболонках.{2} Від нього залежить, чи з’являються там розчинні антигени груп крові A, B і H: людей, у яких вони є, називають секреторами.{5}",
   "known": "Приблизно 20% людей мають дві копії неробочого варіанта FUT2, який позначають W143X: це несекретори.{5} У шведському дослідженні серед 53 людей, які захворіли під час спалахів норовірусу, не було жодного несекретора.{2} Алель G варіанта rs492602, тісно зчеплений із W143X, пов’язаний із вищим рівнем вітаміну B12 у плазмі: дослідження за участю 2 717 жінок.{3}",
   "not": "Несекретор не є невразливим до всіх норовірусів: під час спалаху, спричиненого іншим типом вірусу, несекретори хворіли так само часто, як секретори.{6} А зв’язок із вітаміном B12 і мікробіомом описує середні відмінності між групами людей і не показує вашого рівня вітаміну.{3}{4}",
   "tip": [
    {
     "k": "Для всіх",
     "s": "будь-який генотип",
     "t": "Мийте руки з милом перед їжею та після туалету: це простий захист від кишкових інфекцій.",
     "f": "Кокрейнівський огляд 29 рандомізованих досліджень: заохочення до миття рук запобігає приблизно третині епізодів діареї в дитячих садках і школах країн із високим доходом і приблизно чверті в громадах країн із низьким і середнім доходом.{7}"
    },
    {
     "k": "Несекретор",
     "s": "дві копії варіанта W143X",
     "t": "Порада не змінюється: стійкість стосується лише частини норовірусів, тому гігієна рук потрібна так само, як усім.",
     "f": "Під час харчового спалаху норовірусу типу GI.3 у Швеції захворіли 33 з 83 людей (40%), і несекретори хворіли так само часто, як секретори.{6}"
    },
    {
     "k": "Рослинний раціон",
     "s": "вегетаріанці та вегани",
     "t": "Подбайте про надійне джерело вітаміну B12, хоч би яким був генотип FUT2. Рівень вітаміну та спосіб його поповнення обговоріть із лікарем.",
     "f": "Огляд 18 публікацій: дефіцит B12 знаходили у 62% вагітних вегетаріанок, у 21–41% підлітків і в 11–90% людей старшого віку; у веганів частіше, ніж у вегетаріанців.{8}"
    }
   ],
   "tipNote": "Дані про несекреторів і вітамін B12 спостережні: вони показують зв’язок, а не доведену причину."
  },
  "en": {
   "intro": "58.6 million base pairs and about 1,470 genes, among them genes for lipid metabolism, vitamin K metabolism and liver fat.{9} Gene density here is the highest of all human chromosomes, more than double the genome-wide average.{1}",
   "role": "FUT2 encodes a fucosyltransferase, an enzyme that makes the H antigen in saliva and on mucous membranes.{2} It determines whether the soluble blood group antigens A, B and H appear there: people who have them are called secretors.{5}",
   "known": "About 20% of people carry two copies of a non-working FUT2 variant known as W143X: they are non-secretors.{5} In a Swedish study, not one of the 53 people who fell ill during norovirus outbreaks was a non-secretor.{2} The G allele of the rs492602 variant, tightly linked to W143X, is associated with higher plasma vitamin B12: a study of 2,717 women.{3}",
   "not": "A non-secretor is not immune to all noroviruses: in an outbreak caused by a different type of the virus, non-secretors fell ill as often as secretors.{6} And the link with vitamin B12 and the microbiome describes average differences between groups of people; it does not show your own vitamin level.{3}{4}",
   "tip": [
    {
     "k": "Everyone",
     "s": "any genotype",
     "t": "Wash your hands with soap before eating and after using the toilet: a simple defence against gut infections.",
     "f": "A Cochrane review of 29 randomised trials: hand-washing promotion prevents about a third of diarrhoea episodes in day-care centres and schools in high-income countries and about a quarter in communities in low- and middle-income countries.{7}"
    },
    {
     "k": "Non-secretor",
     "s": "two copies of the W143X variant",
     "t": "The advice does not change: the resistance covers only some noroviruses, so hand hygiene matters just as it does for everyone.",
     "f": "In a foodborne outbreak of GI.3 norovirus in Sweden, 33 of 83 people (40%) fell ill, and non-secretors were as likely to become ill as secretors.{6}"
    },
    {
     "k": "Plant-based diet",
     "s": "vegetarians and vegans",
     "t": "Make sure you have a reliable source of vitamin B12, whatever your FUT2 genotype. Discuss your level and how to top it up with a doctor.",
     "f": "A review of 18 publications: B12 deficiency was found in 62% of pregnant vegetarian women, 21–41% of adolescents and 11–90% of older people; more often in vegans than in vegetarians.{8}"
    }
   ],
   "tipNote": "The data on non-secretors and vitamin B12 are observational: they show an association, not a proven cause."
  }
 },
 "20": {
  "refs": [
   [
    "Evangelou et al., Arthritis Rheum, 2009",
    "https://pubmed.ncbi.nlm.nih.gov/19479880/"
   ],
   [
    "Alentorn-Geli et al., J Orthop Sports Phys Ther, 2017",
    "https://pubmed.ncbi.nlm.nih.gov/28504066/"
   ],
   [
    "Felson et al., Ann Intern Med, 1992",
    "https://pubmed.ncbi.nlm.nih.gov/1543306/"
   ],
   [
    "Fransen et al., Br J Sports Med, 2015",
    "https://pubmed.ncbi.nlm.nih.gov/26405113/"
   ],
   [
    {
     "uk": "Ensembl, збірка геному GRCh38: хромосома 20",
     "en": "Ensembl, GRCh38 genome assembly: chromosome 20"
    },
    "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=20"
   ]
  ],
  "uk": {
   "intro": "64 мільйони пар нуклеотидів і близько 540 генів, серед яких гени пігментації, глибини сну, обміну вітаміну D та довжини теломер.{9}",
   "role": "GDF5 кодує фактор росту й диференціації 5, сигнальний білок із родини кісткових морфогенетичних білків.{1} Він потрібний для розвитку хряща й для того, щоб суглоб утворився в належному місці.{1}",
   "known": "Поширений варіант +104T/C (rs143383) у регуляторній ділянці гена знижує його активність і пов’язаний з остеоартритом кульшового та колінного суглобів.{2} У метааналізі за участю понад 13 тисяч людей кожна копія цього варіанта підвищувала шанси остеоартриту коліна в 1,15 раза.{5} Варіанти цієї ж ділянки пов’язані зі зростом: ефект становить у середньому 0,44 см.{3}",
   "not": "Це не діагноз: остеоартрит — полігенне захворювання,{2} а зв’язок цього варіанта стабільно відтворюється в різних популяціях лише для колінного суглоба.{5} До того ж гаплотип, пов’язаний із вищою схильністю до артриту, має високу частоту в багатьох популяціях.{4}",
   "tip": [
    {
     "k": "Для всіх",
     "s": "будь-який генотип",
     "t": "Рухайтеся регулярно й помірно: і сидячий спосіб життя, і багаторічний біг високої інтенсивності пов’язані з частішим остеоартритом.",
     "f": "Метааналіз за участю 114 829 людей: остеоартрит кульшового чи колінного суглоба мали 3,5% бігунів-аматорів, 10,2% людей, які не бігають, і 13,3% бігунів елітного рівня.{6}"
    },
    {
     "k": "Варіант +104T/C",
     "s": "ген GDF5: одна чи дві копії",
     "t": "Порада не змінюється: внесок варіанта малий, а масу тіла можна змінити. Її зниження пов’язане з нижчим ризиком остеоартриту коліна.",
     "f": "Кожна копія варіанта підвищувала шанси остеоартриту коліна в 1,15 раза.{5} У жінок, які за 10 років знизили ІМТ на 2 одиниці чи більше (приблизно 5,1 кг), шанси симптомного остеоартриту коліна були більш ніж удвічі нижчі.{7}"
    },
    {
     "k": "Біль у колінах",
     "s": "остеоартрит коліна",
     "t": "Не уникайте руху: лікувальні вправи зменшують біль і поліпшують функцію суглоба. Програму вправ обговоріть із лікарем.",
     "f": "Кокрейнівський огляд: у 44 рандомізованих дослідженнях вправи зменшували біль при остеоартриті коліна на 12 пунктів зі 100 і поліпшували функцію на 10 пунктів; користь зберігалася ще 2–6 місяців.{8}"
    }
   ],
   "tipNote": "Дані про біг і масу тіла спостережні: вони показують зв’язок, а не доведену причину."
  },
  "en": {
   "intro": "64 million base pairs and about 540 genes, among them genes for pigmentation, sleep depth, vitamin D metabolism and telomere length.{9}",
   "role": "GDF5 encodes growth/differentiation factor 5, a signalling protein of the bone morphogenetic protein family.{1} It is needed for cartilage to develop and for a joint to form in the right place.{1}",
   "known": "The common variant +104T/C (rs143383) in the gene’s regulatory region lowers its activity and is linked to osteoarthritis of the hip and knee.{2} In a meta-analysis of more than 13,000 people, each copy of this variant raised the odds of knee osteoarthritis 1.15-fold.{5} Variants in the same region are linked to height: the effect averages 0.44 cm.{3}",
   "not": "This is not a diagnosis: osteoarthritis is a polygenic disease,{2} and the link with this variant is consistent across populations only for the knee.{5} What is more, the haplotype linked to a higher likelihood of arthritis is very frequent in many populations.{4}",
   "tip": [
    {
     "k": "Everyone",
     "s": "any genotype",
     "t": "Move regularly and in moderation: both a sedentary lifestyle and many years of high-intensity running are linked to more osteoarthritis.",
     "f": "A meta-analysis of 114,829 people: hip or knee osteoarthritis was found in 3.5% of recreational runners, 10.2% of non-runners and 13.3% of elite-level runners.{6}"
    },
    {
     "k": "+104T/C variant",
     "s": "GDF5 gene: one or two copies",
     "t": "The advice does not change: the variant’s contribution is small, while body weight can be changed. Losing weight is linked to a lower risk of knee osteoarthritis.",
     "f": "Each copy of the variant raised the odds of knee osteoarthritis 1.15-fold.{5} In women who lowered their BMI by 2 units or more over 10 years (about 5.1 kg), the odds of symptomatic knee osteoarthritis were more than halved.{7}"
    },
    {
     "k": "Knee pain",
     "s": "knee osteoarthritis",
     "t": "Do not avoid movement: therapeutic exercise reduces pain and improves joint function. Discuss an exercise programme with a doctor.",
     "f": "A Cochrane review: in 44 randomised trials, exercise reduced pain in knee osteoarthritis by 12 points out of 100 and improved function by 10 points; the benefit lasted a further 2–6 months.{8}"
    }
   ],
   "tipNote": "The data on running and body weight are observational: they show an association, not a proven cause."
  }
 },
 "21": {
  "refs": [
   [
    "van Meurs et al., Am J Clin Nutr, 2013",
    "https://pubmed.ncbi.nlm.nih.gov/23824729/"
   ],
   [
    "Clarke et al., Arch Intern Med, 2010",
    "https://pubmed.ncbi.nlm.nih.gov/20937919/"
   ],
   [
    "Refsum et al., J Nutr, 2006",
    "https://pubmed.ncbi.nlm.nih.gov/16702348/"
   ],
   [
    "Obersby et al., Br J Nutr, 2013",
    "https://pubmed.ncbi.nlm.nih.gov/23298782/"
   ],
   [
    {
     "uk": "Ensembl, збірка геному GRCh38: хромосома 21",
     "en": "Ensembl, GRCh38 genome assembly: chromosome 21"
    },
    "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=21"
   ]
  ],
  "uk": {
   "intro": "46,7 мільйона пар нуклеотидів і близько 230 генів.{8} Це найменша з нумерованих хромосом людини.{1} Її довге плече прочитали 2000 року: 33,5 мільйона пар нуклеотидів із покриттям 99,7%.{1}",
   "role": "CBS кодує фермент цистатіонін-бета-синтазу.{2} Він перетворює гомоцистеїн на цистатіонін і потребує активної форми вітаміну B6: це другий шлях знешкодження гомоцистеїну поряд із фолатзалежним, у якому працює MTHFR.{3}",
   "known": "Поширені варіанти діють слабо: у метааналізі 44 147 людей європейського походження з рівнем гомоцистеїну пов’язали 13 ділянок геному, серед них і CBS.{4} Разом вони пояснили лише 5,9% його мінливості.{4}",
   "not": "Поширені варіанти біля CBS не є діагнозом і не вимірюють ризик для серця: генетична оцінка, пов’язана з вищим гомоцистеїном, не була пов’язана з ішемічною хворобою серця.{4} А у восьми рандомізованих дослідженнях із 37 485 учасниками зниження гомоцистеїну на 25% фолієвою кислотою не зменшило кількості серцево-судинних подій.{5}",
   "tip": [
    {
     "k": "Для всіх",
     "s": "будь-який генотип",
     "t": "Листова зелень, бобові, продукти з вітаміном B12 і регулярний рух: із цими звичками пов’язаний нижчий рівень гомоцистеїну.",
     "f": "У дослідженні понад 18 000 жителів Норвегії нижчий гомоцистеїн був пов’язаний із фізичною активністю та добрим статусом фолату й B12, а вищий із курінням і споживанням кави.{6}"
    },
    {
     "k": "Висока генетична оцінка",
     "s": "варіанти 13 ділянок геному",
     "t": "Порада не змінюється: харчування і рух ті самі за будь-якого генотипу. Рівень гомоцистеїну показує аналіз крові, а не ДНК.",
     "f": "Люди з 10% найвищих генетичних оцінок мали гомоцистеїн у середньому на 3 мкмоль/л вищий, ніж люди з 10% найнижчих, але з ішемічною хворобою серця оцінка пов’язана не була (відношення шансів 1,01).{4}"
    },
    {
     "k": "Рослинне харчування",
     "s": "вегетаріанці й вегани",
     "t": "Подбайте про надійне джерело вітаміну B12 у раціоні й обговоріть із лікарем, чи варто перевірити його рівень.",
     "f": "В огляді 17 досліджень (3 230 учасників) лише два не виявили у веганів вищого гомоцистеїну та нижчого вітаміну B12, ніж у людей зі змішаним харчуванням.{7}"
    }
   ],
   "tipNote": "Це спостережні дані: вони показують зв’язок, а не доведену причину."
  },
  "en": {
   "intro": "46.7 million base pairs and about 230 genes.{8} It is the smallest of the numbered human chromosomes.{1} Its long arm was sequenced in 2000: 33.5 million base pairs at 99.7% coverage.{1}",
   "role": "CBS encodes the enzyme cystathionine beta-synthase.{2} It converts homocysteine into cystathionine and needs the active form of vitamin B6: this is the second route for clearing homocysteine, alongside the folate-dependent one that involves MTHFR.{3}",
   "known": "Common variants act weakly: in a meta-analysis of 44,147 people of European ancestry, 13 regions of the genome were linked to homocysteine levels, CBS among them.{4} Together they explained only 5.9% of its variation.{4}",
   "not": "Common variants near CBS are not a diagnosis and do not measure risk to the heart: a genetic score linked to higher homocysteine was not associated with coronary artery disease.{4} And in eight randomised trials with 37,485 participants, lowering homocysteine by 25% with folic acid did not reduce the number of cardiovascular events.{5}",
   "tip": [
    {
     "k": "Everyone",
     "s": "any genotype",
     "t": "Leafy greens, legumes, foods with vitamin B12 and regular movement: these habits are linked to lower homocysteine.",
     "f": "In a study of more than 18,000 people in Norway, lower homocysteine was linked to physical activity and good folate and B12 status, and higher homocysteine to smoking and coffee consumption.{6}"
    },
    {
     "k": "High genetic score",
     "s": "variants in 13 regions of the genome",
     "t": "The advice does not change: diet and movement are the same whatever the genotype. A blood test, not DNA, shows your homocysteine level.",
     "f": "People in the top 10% of genetic scores had homocysteine on average 3 μmol/L higher than those in the bottom 10%, yet the score was not linked to coronary artery disease (odds ratio 1.01).{4}"
    },
    {
     "k": "Plant-based diet",
     "s": "vegetarians and vegans",
     "t": "Make sure your diet has a reliable source of vitamin B12, and discuss with a doctor whether your level is worth checking.",
     "f": "In a review of 17 studies (3,230 participants), only two did not find higher homocysteine and lower vitamin B12 in vegans than in omnivores.{7}"
    }
   ],
   "tipNote": "These are observational data: they show an association, not a proven cause."
  }
 },
 "22": {
  "refs": [
   [
    "Smith et al., Psychosom Med, 2010",
    "https://pubmed.ncbi.nlm.nih.gov/20223924/"
   ],
   [
    "Lowe et al., Neurosci Biobehav Rev, 2017",
    "https://pubmed.ncbi.nlm.nih.gov/28757454/"
   ],
   [
    {
     "uk": "Ensembl, збірка геному GRCh38: хромосома 22",
     "en": "Ensembl, GRCh38 genome assembly: chromosome 22"
    },
    "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=22"
   ]
  ],
  "uk": {
   "intro": "50,8 мільйона пар нуклеотидів і близько 490 генів, серед яких гени, пов’язані з дією кофеїну на сон, транспортом вітаміну B12 і статусом заліза.{8}",
   "role": "COMT кодує фермент катехол-О-метилтрансферазу, що інактивує катехоламіни.{2} У префронтальній корі мозку це ключовий фермент виведення дофаміну.{1}",
   "known": "Заміна валіну на метіонін у позиції 158 білка (Val158Met) пов’язана з різницею в активності ферменту в 3–4 рази.{2} Систематичний огляд 255 досліджень дофамінових генів підтвердив, що цей варіант помітно впливає на активність, кількість і стабільність ферменту.{5} Проте з пам’яттю й виконавчими функціями він майже не пов’язаний: такий висновок метааналізу шести когнітивних показників.{3}",
   "not": "Генотип за варіантом Val158Met не вимірює ні пам’яті, ні виконавчих функцій: у метааналізі ранні яскраві результати слабшали з кожною новою публікацією, і знайшлися ознаки публікаційного упередження.{3} Це не діагноз і не опис характеру.",
   "tip": [
    {
     "k": "Для всіх",
     "s": "будь-який генотип",
     "t": "Регулярні аеробні тренування: вони дають невелике, але підтверджене в дослідженнях покращення уваги й виконавчих функцій.",
     "f": "У 29 рандомізованих дослідженнях (2 049 учасників) аеробні тренування дещо покращували увагу та швидкість обробки інформації (розмір ефекту g = 0,158), виконавчі функції (g = 0,123) і пам’ять (g = 0,128).{6}"
    },
    {
     "k": "Генотип Val158Met",
     "s": "Val/Val, Val/Met, Met/Met",
     "t": "Окремої поради немає: зв’язок варіанта з когнітивними функціями виявився слабким або відсутнім. Діють ті самі звички.",
     "f": "У метааналізі зв’язку генотипу з більшістю когнітивних показників не знайшли, а для IQ ефект був дуже малим: d = 0,06.{3}"
    },
    {
     "k": "Недосип",
     "s": "життєва ситуація",
     "t": "Не економте на сні: обмеження сну помітно погіршує стійку увагу й виконавчі функції.",
     "f": "У метааналізі 61 дослідження обмеження сну погіршувало когнітивні функції загалом (розмір ефекту g = −0,383), зокрема стійку увагу (g = −0,409) і виконавчі функції (g = −0,324).{7}"
    }
   ]
  },
  "en": {
   "intro": "50.8 million base pairs and about 490 genes, among them genes linked to the effect of caffeine on sleep, vitamin B12 transport and iron status.{8}",
   "role": "COMT encodes the enzyme catechol-O-methyltransferase, which inactivates catecholamines.{2} In the prefrontal cortex of the brain it is a key enzyme in the elimination of dopamine.{1}",
   "known": "The substitution of methionine for valine at position 158 of the protein (Val158Met) is linked to a three- to four-fold difference in enzyme activity.{2} A systematic review of 255 studies of dopamine genes confirmed that the variant markedly affects the enzyme’s activity, abundance and stability.{5} Yet it has little if any link to memory and executive function: that is the conclusion of a meta-analysis of six cognitive measures.{3}",
   "not": "Val158Met genotype measures neither memory nor executive function: in the meta-analysis, striking early results faded with each later publication, and there were signs of publication bias.{3} It is not a diagnosis and not a description of character.",
   "tip": [
    {
     "k": "Everyone",
     "s": "any genotype",
     "t": "Regular aerobic exercise: it brings a small but trial-confirmed improvement in attention and executive function.",
     "f": "In 29 randomised trials (2,049 participants), aerobic training modestly improved attention and processing speed (effect size g = 0.158), executive function (g = 0.123) and memory (g = 0.128).{6}"
    },
    {
     "k": "Val158Met genotype",
     "s": "Val/Val, Val/Met, Met/Met",
     "t": "There is no separate advice: the variant’s link with cognitive function proved weak or absent. The same habits apply.",
     "f": "The meta-analysis found no association between genotype and most cognitive measures, and for IQ the effect was very small: d = 0.06.{3}"
    },
    {
     "k": "Short of sleep",
     "s": "life situation",
     "t": "Do not skimp on sleep: sleep restriction noticeably impairs sustained attention and executive function.",
     "f": "In a meta-analysis of 61 studies, sleep restriction impaired cognitive function overall (effect size g = −0.383), including sustained attention (g = −0.409) and executive function (g = −0.324).{7}"
    }
   ]
  }
 },
 "23": {
  "refs": [
   [
    "Davey & Grossmann, Clin Biochem Rev, 2016",
    "https://pubmed.ncbi.nlm.nih.gov/27057074/"
   ],
   [
    "Rhodes et al., Dermatol Surg, 1998",
    "https://pubmed.ncbi.nlm.nih.gov/9865198/"
   ],
   [
    "Hagenaars et al., PLoS Genet, 2017",
    "https://pubmed.ncbi.nlm.nih.gov/28196072/"
   ],
   [
    "Su & Chen, Arch Dermatol, 2007",
    "https://pubmed.ncbi.nlm.nih.gov/18025364/"
   ],
   [
    "Trieu & Eslick, Int J Cardiol, 2014",
    "https://pubmed.ncbi.nlm.nih.gov/25150481/"
   ],
   [
    {
     "uk": "Ensembl, збірка геному GRCh38: хромосома Y",
     "en": "Ensembl, GRCh38 genome assembly: chromosome Y"
    },
    "https://www.ensembl.org/Homo_sapiens/Location/Chromosome?r=Y"
   ]
  ],
  "uk": {
   "intro": "X-хромосома має 156 мільйонів пар нуклеотидів і близько 840 генів, що кодують білки, а Y у референсній збірці налічує 57 мільйонів пар нуклеотидів.{9}{15} У жінок одна з двох X у кожній клітині здебільшого неактивна,{2}{5} а на Y є SRY, ген, що запускає розвиток за чоловічим типом.{3}{6}",
   "role": "AR кодує рецептор андрогенів: білок, через який діють тестостерон і дигідротестостерон.{10} Зв’язавши гормон, він регулює зчитування генів-мішеней у багатьох тканинах тіла.{10}",
   "known": "Облисіння за чоловічим типом — найпоширеніша форма втрати волосся:{1} серед чоловіків 18–49 років помірну або значну втрату волосся мали 42%.{11} Мінливість гена AR є головною передумовою його раннього початку, з етіологічною часткою 0,46; імовірним джерелом ефекту автори назвали повтор GGN у першому екзоні гена.{1} Проте ознака полігенна: у понад 52 000 чоловіків із UK Biobank із сильним облисінням пов’язали понад 250 незалежних ділянок геному.{12}",
   "not": "Повтор GGN у гені AR сам не визначає, чи буде облисіння: із цією ознакою пов’язано понад 250 ділянок геному.{12} І хоча X-хромосому син отримує від матері,{1} справа не лише в материнській лінії: імовірність облисіння вища й тоді, коли воно є в родичів по батькові.{13}",
   "tip": [
    {
     "k": "Для всіх",
     "s": "будь-який генотип",
     "t": "Не куріть: куріння пов’язане з вираженішим облисінням за чоловічим типом.",
     "f": "Серед 740 чоловіків віком 40–91 рік курці мали в 1,77 раза вищі шанси помірного чи сильного облисіння, а ті, хто викурював 20 і більше сигарет на день, у 2,34 раза.{13}"
    },
    {
     "k": "Виражене облисіння",
     "s": "група ризику",
     "t": "Не пропускайте звичайні перевірки тиску, глюкози й ліпідів: облисіння пов’язане з вищим серцево-судинним ризиком. Обговоріть це з лікарем.",
     "f": "У метааналізі 31 дослідження (29 254 учасники з облисінням) воно було пов’язане з ішемічною хворобою серця (відношення шансів 1,22) і метаболічним синдромом (4,49); що сильніше облисіння, то вищим був ризик хвороби серця.{14}"
    },
    {
     "k": "Повтор GGN в AR",
     "s": "генотип",
     "t": "Окремої поради немає: генотип не змінює того, що варто робити. Якщо втрата волосся турбує, обговоріть можливості з дерматологом.",
     "f": "Модель, побудована лише на поширених варіантах, розрізняла чоловіків без облисіння і з сильним облисінням із чутливістю 74% і специфічністю 69%: прогноз далекий від безпомилкового.{12}"
    }
   ],
   "tipNote": "Це спостережні дані: вони показують зв’язок, а не доведену причину."
  },
  "en": {
   "intro": "The X chromosome has 156 million base pairs and about 840 protein-coding genes, and Y has 57 million base pairs in the reference assembly.{9}{15} In women, one of the two X chromosomes in each cell is largely inactive,{2}{5} while Y carries SRY, the gene that sets off male-typical development.{3}{6}",
   "role": "AR encodes the androgen receptor: the protein through which testosterone and dihydrotestosterone act.{10} Once it has bound the hormone, it regulates the reading of target genes in many tissues of the body.{10}",
   "known": "Male-pattern baldness is the most common form of hair loss:{1} among men aged 18–49, 42% had moderate to extensive hair loss.{11} Variation in the AR gene is the main prerequisite for its early onset, with an aetiological fraction of 0.46; the authors named the GGN repeat in the gene’s first exon as the likely source of the effect.{1} Yet the trait is polygenic: in more than 52,000 men from UK Biobank, over 250 independent regions of the genome were linked to severe hair loss.{12}",
   "not": "The GGN repeat in AR does not by itself decide whether hair loss will occur: more than 250 regions of the genome are linked to this trait.{12} And although a son gets his X chromosome from his mother,{1} the maternal line is not the whole story: hair loss is also more likely when relatives on the father’s side have it.{13}",
   "tip": [
    {
     "k": "Everyone",
     "s": "any genotype",
     "t": "Do not smoke: smoking is linked to more pronounced male-pattern hair loss.",
     "f": "Among 740 men aged 40–91, smokers had 1.77 times the odds of moderate or severe hair loss, and those smoking 20 or more cigarettes a day had 2.34 times the odds.{13}"
    },
    {
     "k": "Marked hair loss",
     "s": "risk group",
     "t": "Do not skip routine checks of blood pressure, glucose and lipids: hair loss is linked to higher cardiovascular risk. Discuss it with a doctor.",
     "f": "In a meta-analysis of 31 studies (29,254 participants with hair loss), it was linked to coronary heart disease (odds ratio 1.22) and metabolic syndrome (4.49); the more severe the hair loss, the higher the risk of heart disease.{14}"
    },
    {
     "k": "GGN repeat in AR",
     "s": "genotype",
     "t": "There is no separate advice: genotype does not change what is worth doing. If hair loss bothers you, discuss the options with a dermatologist.",
     "f": "A model built on common variants alone told men with no hair loss from men with severe hair loss with a sensitivity of 74% and a specificity of 69%: the prediction is far from error-free.{12}"
    }
   ],
   "tipNote": "These are observational data: they show an association, not a proven cause."
  }
 },
 "24": {
  "refs": [
   [
    "Picca et al., Exp Gerontol, 2023",
    "https://pubmed.ncbi.nlm.nih.gov/37172915/"
   ],
   [
    "Rath et al., Nucleic Acids Res, 2021",
    "https://pubmed.ncbi.nlm.nih.gov/33174596/"
   ],
   [
    "Mølmen et al., Sports Med, 2025",
    "https://pubmed.ncbi.nlm.nih.gov/39390310/"
   ],
   [
    "Short et al., Proc Natl Acad Sci U S A, 2005",
    "https://pubmed.ncbi.nlm.nih.gov/15800038/"
   ]
  ],
  "uk": {
   "intro": "Не хромосома, а окрема кільцева молекула в мітохондріях: 16 569 пар нуклеотидів і 37 генів.{1}{2} До каріотипу вона не входить, тому це бонусний день.",
   "role": "Мітохондріальна ДНК (мтДНК) кодує 13 білків, 22 транспортні РНК і 2 рибосомні РНК.{1}{2} Усі 13 білків є субодиницями системи окисного фосфорилювання, яка постачає клітині енергію.{2}",
   "known": "МтДНК передається лише по материнській лінії:{2} у родині з 33 людей у трьох поколіннях діти щоразу мали материнський варіант.{3} У кожній клітині вона присутня в сотнях і тисячах копій.{4}",
   "not": "Варіант у мтДНК сам по собі не є діагнозом. І робота мітохондрій залежить не лише від неї: каталог мітохондріальних білків налічує 1 136 генів людини, і 99% цих білків закодовано в ядерному геномі.{5}",
   "tip": [
    {
     "k": "Для всіх",
     "s": "будь-який вік, будь-яка стать",
     "t": "Регулярні тренування на витривалість або інтервальні: у відповідь на них у м’язах стає більше мітохондрій.",
     "f": "В огляді з даними 5 973 учасників вміст мітохондрій у м’язах зростав на 23% після тренувань на витривалість і на 27% після високоінтенсивних.{6}"
    },
    {
     "k": "Старший вік",
     "s": "вікові зміни",
     "t": "Починати не пізно: тренування збільшують вміст мітохондрій у м’язах у будь-якому віці. Навантаження узгодьте з лікарем.",
     "f": "У 146 здорових людей віком 18–89 років кількість мтДНК у м’язах і вироблення АТФ мітохондріями знижувалися з віком.{7} Приріст мітохондрій від тренувань від віку не залежав.{6}"
    },
    {
     "k": "Мало руху",
     "s": "життєва ситуація",
     "t": "Почніть із регулярності: частіші заняття дають більший приріст мітохондрій, ніж рідкісні.",
     "f": "У тому самому огляді частіші тренування давали більший приріст вмісту мітохондрій у м’язах.{6}"
    }
   ],
   "tipNote": "Це узагальнені дані досліджень тренувань: вони показують середній ефект у групах, а не особистий прогноз."
  },
  "en": {
   "intro": "Not a chromosome but a separate circular molecule inside mitochondria: 16,569 base pairs and 37 genes.{1}{2} It is not part of the karyotype, which is why this is a bonus day.",
   "role": "Mitochondrial DNA (mtDNA) encodes 13 proteins, 22 transfer RNAs and 2 ribosomal RNAs.{1}{2} All 13 proteins are subunits of the oxidative phosphorylation system, which supplies the cell with energy.{2}",
   "known": "mtDNA is passed down only through the maternal line:{2} in a family of 33 people over three generations, the children always had the mother’s variant.{3} Each cell holds hundreds to thousands of copies.{4}",
   "not": "A variant in mtDNA is not in itself a diagnosis. And how mitochondria work depends on more than mtDNA: the catalogue of mitochondrial proteins lists 1,136 human genes, and 99% of those proteins are encoded in the nuclear genome.{5}",
   "tip": [
    {
     "k": "Everyone",
     "s": "any age and sex",
     "t": "Regular endurance or interval training: in response, muscles build more mitochondria.",
     "f": "In a review with data from 5,973 participants, mitochondrial content in muscle rose by 23% after endurance training and by 27% after high-intensity training.{6}"
    },
    {
     "k": "Older age",
     "s": "age-related change",
     "t": "It is not too late to start: training raises mitochondrial content in muscle at any age. Agree the load with a doctor.",
     "f": "In 146 healthy people aged 18–89, the amount of mtDNA in muscle and mitochondrial ATP production declined with age.{7} The gain in mitochondria from training did not depend on age.{6}"
    },
    {
     "k": "Little movement",
     "s": "life situation",
     "t": "Start with regularity: more frequent sessions give a bigger gain in mitochondria than occasional ones.",
     "f": "In the same review, more frequent training gave a bigger gain in muscle mitochondrial content.{6}"
    }
   ],
   "tipNote": "These are pooled data from training studies: they show the average effect in groups, not a personal forecast."
  }
 }
};
  DAYS.forEach((d) => {
    const f = FULL[d.d];
    if (!f) return;
    d.refs = (d.refs || []).concat(f.refs);
    Object.assign(d.uk, f.uk);
    Object.assign(d.en, f.en);
    d.ready = true;
    (d.viz || []).forEach((v) => { if (v.after === "hook") v.after = "known"; });
  });
})();
