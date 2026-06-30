import React, { useState } from "react";
import {
  ShieldAlert,
  CheckCircle2,
  Wallet,
  Sparkles,
  BookOpen,
  Phone,
  Mail,
  Globe,
  Users,
} from "lucide-react";

// ==========================================
// 数据字典
// ==========================================
const PROVINCE_DATA = {
  广东省: { president: 9119, first: 16558, second: 25699, innoA: 46000 },
  江苏省: { president: 6090, first: 8204, second: 18045, innoA: 36291 },
  山东省: { president: 6146, first: 12075, second: 22035, innoA: 36199 },
  四川省: { president: 6002, first: 10043, second: 22303, innoA: 42649 },
  河南省: { president: 10270, first: 20267, second: 40214, innoA: 80858 },
  湖北省: { president: 5134, first: 9186, second: 20256, innoA: 30544 },
  湖南省: { president: 6028, first: 8082, second: 18383, innoA: 38072},
  福建省: { president: 4056, first: 6516, second: 13081, innoA: 25177 },
  安徽省: { president: 6190, first: 12303, second: 20394, innoA: 45659 },
  江西省: { president: 5673, first: 12041, second: 20353, innoA: 34418 },
  浙江省: { president: 6108, first: 15393, second: 24152, innoA: 42828 },
  重庆市: { president: 3061, first: 5046, second: 12260, innoA: 28442 },
  北京市: { president: 3031, first: 6170, second: 8112, innoA: 12184 },
  河北省: { president: 7927, first: 15009, second: 25720, innoA: 48769 },
  上海市: { president: 3163, first: 6183, second: 8062, innoA: 10172 },
};

const ALL_PROVINCES = [
  "广东省",
  "江苏省",
  "山东省",
  "四川省",
  "河南省",
  "湖北省",
  "湖南省",
  "福建省",
  "安徽省",
  "江西省",
  "浙江省",
  "重庆市",
  "北京市",
  "河北省",
  "上海市",
];

const NO_CITY_PROVINCES = ["北京市", "上海市", "重庆市"];

const CITY_DATA = {
  广东省: [
    "广州市",
    "深圳市",
    "汕头市",
    "佛山市",
    "东莞市",
    "珠海市",
    "中山市",
    "惠州市",
    "江门市",
    "肇庆市",
    "揭阳市",
    "潮州市",
    "汕尾市",
    "湛江市",
    "茂名市",
    "阳江市",
    "韶关市",
    "清远市",
    "云浮市",
    "梅州市",
    "河源市",
    "其他城市",
  ],
  江苏省: [
    "南京市",
    "无锡市",
    "徐州市",
    "常州市",
    "苏州市",
    "南通市",
    "连云港市",
    "淮安市",
    "盐城市",
    "扬州市",
    "镇江市",
    "泰州市",
    "宿迁市",
    "其他城市",
  ],
  山东省: [
    "济南市",
    "青岛市",
    "淄博市",
    "枣庄市",
    "东营市",
    "烟台市",
    "潍坊市",
    "济宁市",
    "泰安市",
    "威海市",
    "日照市",
    "临沂市",
    "德州市",
    "聊城市",
    "滨州市",
    "菏泽市",
    "其他城市",
  ],
  四川省: [
    "成都市",
    "自贡市",
    "攀枝花市",
    "泸州市",
    "德阳市",
    "绵阳市",
    "广元市",
    "遂宁市",
    "内江市",
    "乐山市",
    "南充市",
    "眉山市",
    "宜宾市",
    "广安市",
    "达州市",
    "雅安市",
    "巴中市",
    "资阳市",
    "阿坝州",
    "甘孜州",
    "凉山州",
    "其他城市",
  ],
  河南省: [
    "郑州市",
    "开封市",
    "洛阳市",
    "平顶山市",
    "安阳市",
    "鹤壁市",
    "新乡市",
    "焦作市",
    "濮阳市",
    "许昌市",
    "漯河市",
    "三门峡市",
    "南阳市",
    "商丘市",
    "信阳市",
    "周口市",
    "驻马店市",
    "济源市",
    "其他城市",
  ],
  湖北省: [
    "武汉市",
    "黄石市",
    "十堰市",
    "宜昌市",
    "襄阳市",
    "鄂州市",
    "荆门市",
    "孝感市",
    "荆州市",
    "黄冈市",
    "咸宁市",
    "随州市",
    "恩施州",
    "仙桃市",
    "潜江市",
    "天门市",
    "神农架林区",
    "其他城市",
  ],
  湖南省: [
    "长沙市",
    "株洲市",
    "湘潭市",
    "衡阳市",
    "邵阳市",
    "岳阳市",
    "常德市",
    "张家界市",
    "益阳市",
    "郴州市",
    "永州市",
    "怀化市",
    "娄底市",
    "湘西州",
    "其他城市",
  ],
  福建省: [
    "福州市",
    "厦门市",
    "莆田市",
    "三明市",
    "泉州市",
    "漳州市",
    "南平市",
    "龙岩市",
    "宁德市",
    "其他城市",
  ],
  安徽省: [
    "合肥市",
    "芜湖市",
    "蚌埠市",
    "淮南市",
    "马鞍山市",
    "淮北市",
    "铜陵市",
    "安庆市",
    "黄山市",
    "滁州市",
    "阜阳市",
    "宿州市",
    "六安市",
    "亳州市",
    "池州市",
    "宣城市",
    "其他城市",
  ],
  江西省: [
    "南昌市",
    "景德镇市",
    "萍乡市",
    "九江市",
    "新余市",
    "鹰潭市",
    "赣州市",
    "吉安市",
    "宜春市",
    "抚州市",
    "上饶市",
    "其他城市",
  ],
  浙江省: [
    "杭州市",
    "宁波市",
    "温州市",
    "嘉兴市",
    "湖州市",
    "绍兴市",
    "金华市",
    "衢州市",
    "舟山市",
    "台州市",
    "丽水市",
    "其他城市",
  ],
  河北省: [
    "石家庄市",
    "唐山市",
    "秦皇岛市",
    "邯郸市",
    "邢台市",
    "保定市",
    "张家口市",
    "承德市",
    "沧州市",
    "廊坊市",
    "衡水市",
    "其他城市",
  ],
};

const App = () => {
  return (
    <div className="min-h-screen bg-[#f3f5f8] p-3 md:p-6 text-gray-800">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        body, button, select, input, textarea {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Source Han Sans CN", sans-serif !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
          text-rendering: optimizeLegibility !important;
        }

        #csb-display-watermark, 
        .csb-watermark,
        [id^="csb-"] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          z-index: -9999 !important;
        }
      `,
        }}
      />

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-[#003865]/10">
        {/* ========================================================= */}
        {/* GTIIT 官方风格页眉 */}
        {/* ========================================================= */}
        <div className="bg-[#002d54] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none select-none">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
            >
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                  />
                  <path
                    d="M 0 0 L 40 40"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 opacity-10 pointer-events-none w-72 h-72 hidden md:block">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              stroke="white"
              strokeWidth="1"
              className="w-full h-full"
              style={{
                animation: "spin 20s linear infinite",
              }}
            >
              <polygon points="50,5 90,75 10,75" />
              <polygon points="50,95 90,25 10,25" />
              <circle cx="50" cy="50" r="15" />
            </svg>
            <style
              dangerouslySetInnerHTML={{
                __html: `
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `,
              }}
            />
          </div>

          <div className="relative z-10 px-6 py-7 md:px-10 md:py-9 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#ee7b11] text-white p-2.5 rounded-xl shadow-lg shadow-black/20 flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    fill="currentColor"
                    opacity="0.9"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl md:text-2xl font-black tracking-wide text-white">
                    广东以色列理工学院
                  </h1>
                  <span className="text-xs bg-[#ee7b11] text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    GTIIT
                  </span>
                </div>
                <p className="text-[10px] md:text-xs text-blue-200/80 font-medium tracking-wider mt-0.5 uppercase">
                  Guangdong Technion - Israel Institute of Technology
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <p className="text-xs md:text-sm text-orange-300 font-semibold tracking-wide">
                    ★ 本科生新生奖学测算
                  </p>
                  <span className="text-[9px] text-blue-200/50 bg-white/10 px-1.5 py-0.5 rounded border border-white/5 font-mono">
                    更新至2026年最新政策
                  </span>
                </div>
              </div>
            </div>

            <div className="text-left md:text-right text-[11px] text-blue-200/60 leading-tight hidden sm:block max-w-xs">
              <p className="mt-0.5">标准学费: 10.5万/年 (不含住宿及其他杂费)</p>
            </div>
          </div>

          <div className="h-1.5 bg-gradient-to-r from-[#ee7b11] via-[#f4911e] to-[#ffd166] w-full"></div>
        </div>

        <div className="p-4 md:p-8">
          <CalculatorView />
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. 奖学金测算 (Interactive Calculator)
// ==========================================
const CalculatorView = () => {
  const [enrollment, setEnrollment] = useState(0);
  const [innovation, setInnovation] = useState(0);
  const [subject, setSubject] = useState(0);
  const [hasShantou, setHasShantou] = useState(false);
  const [special, setSpecial] = useState("none");

  const [calcProvince, setCalcProvince] = useState("广东省");
  const [calcCity, setCalcCity] = useState("广州市");
  const [calcRank, setCalcRank] = useState("");
  const [calcMath, setCalcMath] = useState("");
  const [calcEnglish, setCalcEnglish] = useState("");
  const [isTeKong, setIsTeKong] = useState("yes");
  const [calcSubject, setCalcSubject] = useState(0);
  const [applyInnovation, setApplyInnovation] = useState(false);

  const [evalMessage, setEvalMessage] = useState("");

  const getEnrollmentLabel = (val) => {
    if (val === 15) return "校长奖学金 (15万/年)";
    if (val === 10.5) return "一等奖学金 (10.5万/年)";
    if (val === 6) return "二等奖学金 (6万/年)";
    if (val === 4) return "三等奖学金 (4万/年)";
    return "";
  };

  const getInnovationLabel = (val) => {
    if (val === 8) return "创新潜质A类 (8万)";
    if (val === 5) return "创新潜质B类 (5万)";
    return "";
  };

  const getSubjectLabel = (val) => {
    if (val === 7.5) return "学科特长奖・国一 (7.5万/年)";
    if (val === 6.25) return "学科特长奖・国二 (6.25万/年)";
    if (val === 5) return "学科特长奖・国三 (5万/年)";
    if (val === 3.75) return "学科特长奖・省一 (3.75万/年)";
    if (val === 2.5) return "学科特长奖・省二 (2.5万/年)";
    if (val === 2) return "学科特长奖・省三 (2万/年)";
    return "";
  };

  const getSpecialLabel = (val) => {
    if (val === "changzhou") return "常州创新园专项奖学金 (1万)";
    if (val === "fanghui") return "“芳晖”湖南专项奖学金 (1万)";
    if (val === "huafeng") return "“华丰”潮州专项奖学金 (2万)";
    return "";
  };

  const handleEvaluate = () => {
    const rank = parseInt(calcRank);
    const math = parseInt(calcMath) || 0;
    const english = parseInt(calcEnglish) || 0;

    const limits = PROVINCE_DATA[calcProvince] || {
      president: -1,
      first: -1,
      second: -1,
      innoA: -1,
    };

    let newEnroll = 0;
    let newInno = 0;
    let newShantou = false;
    let newSpecial = "none";
    let unlocked = [];

    if (rank > 0 && !isNaN(rank)) {
      if (limits.president > 0 && rank <= limits.president) {
        newEnroll = 15;
        unlocked.push("校长奖学金");
      } else if (limits.first > 0 && rank <= limits.first) {
        newEnroll = 10.5;
        unlocked.push("一等奖学金");
      } else if (limits.second > 0 && rank <= limits.second) {
        newEnroll = 6;
        unlocked.push("二等奖学金");
      }
    }

    if (applyInnovation) {
      if (limits.innoA > 0 && rank <= limits.innoA) {
        newInno = 8;
        unlocked.push("创新潜质A类");
      } else if (isTeKong === "yes") {
        newInno = 5;
        unlocked.push("创新潜质B类");
      }
    }

    if (newEnroll === 0 && math + english >= 230) {
      newEnroll = 4;
      unlocked.push("三等奖学金");
    }

    if (
      calcProvince === "江苏省" &&
      calcCity === "常州市" &&
      isTeKong === "yes"
    ) {
      newSpecial = "changzhou";
      unlocked.push("常州创新园专项");
    } else if (calcProvince === "湖南省" && isTeKong === "yes") {
      newSpecial = "fanghui";
      unlocked.push("湖南芳晖专项");
    } else if (calcProvince === "广东省" && calcCity === "潮州市") {
      newSpecial = "huafeng";
      unlocked.push("潮州华丰专项");
    }

    if (calcProvince === "广东省" && calcCity === "汕头市") {
      newShantou = true;
      unlocked.push("汕头籍奖学金");
    }

    if (calcSubject > 0) {
      unlocked.push(getSubjectLabel(calcSubject));
    }

    setEnrollment(newEnroll);
    setInnovation(newInno);
    setSpecial(newSpecial);
    setHasShantou(newShantou);
    setSubject(calcSubject);

    if (unlocked.length > 0) {
      setEvalMessage(
        `🎉 评估完成！已为您匹配到首年奖项：【${unlocked.join(
          "】、【"
        )}】。请在右侧面板查看四年发放方案与进阶激励政策。`
      );
    } else {
      setEvalMessage("💡 评估完成。当前录取排名暂未获得入学奖项。");
    }
  };

  let activeEnrollmentValue = enrollment;
  let activeInnovation = innovation;
  let activeShantouValue = hasShantou ? 4 : 0;
  let activeSubjectValue = subject;

  const isShantouTripleWithSubject =
    hasShantou && enrollment === 4 && subject > 0;

  const isTripleConflict = enrollment === 4 && hasShantou && innovation > 0;

  if (isShantouTripleWithSubject) {
    activeEnrollmentValue = enrollment;
    activeSubjectValue = subject;
    activeInnovation = 0;
    activeShantouValue = 0;
  } else if (isTripleConflict) {
    activeEnrollmentValue = 0;
    activeInnovation = innovation;
    activeShantouValue = 4;
    activeSubjectValue = 0;
  } else {
    if (enrollment > 0 && enrollment !== 4) {
      activeInnovation = 0;
      activeShantouValue = 0;
    }
    if (enrollment === 4 && hasShantou) {
      activeEnrollmentValue = 0;
      activeShantouValue = 4;
    }
    const hasInnoEnrollConflict = enrollment > 0 && innovation > 0;
    if (hasInnoEnrollConflict) {
      activeInnovation = 0;
    }
  }

  if (activeInnovation > 0 && activeSubjectValue > 0) {
    activeInnovation = 0;
  }

  const isEnrollmentStriked = enrollment > 0 && activeEnrollmentValue === 0;
  const isShantouStriked = hasShantou && activeShantouValue === 0;
  const isInnovationStriked = innovation > 0 && activeInnovation === 0;
  const isSubjectStriked = subject > 0 && activeSubjectValue === 0;

  const innoDisabledByEnrollment =
    enrollment > 0 && innovation > 0 && activeInnovation === 0;
  const innoDisabledBySubject =
    subject > 0 &&
    innovation > 0 &&
    activeInnovation === 0 &&
    !innoDisabledByEnrollment;

  const rawActiveSum =
    activeEnrollmentValue +
    activeSubjectValue +
    activeInnovation +
    activeShantouValue;

  const derivedWarnings = [];
  const derivedErrors = [];

  if (isShantouTripleWithSubject) {
    derivedWarnings.push(
      "已为您自动触发最优发放组合，此时停用创新奖与汕头籍奖学金，以确保四年累计续发总金额最大化。"
    );
  }

  if (
    !isShantouTripleWithSubject &&
    enrollment > 0 &&
    innovation > 0 &&
    !isEnrollmentStriked &&
    isInnovationStriked
  ) {
    derivedWarnings.push(
      "【不可兼得】创新潜质奖不能与新生入学奖同时享受。系统已默认保留金额更高且可后续学年全额发放的新生入学奖学金。"
    );
  }
  if (activeSubjectValue > 0 && activeInnovation > 0) {
    derivedErrors.push(
      "【不可兼得】“学科特长奖学金”与“创新潜质奖学金”中仅能二选一，不可同时获得。"
    );
  }

  // 计算后续二至四学年发放方案（包含最高进阶激励）
  const getEnrollmentMaxRenew = (val) => {
    if (val === 15) return 15; // 校长奖学金最高续发 15万/年
    if (val === 10.5) return 10.5; // 一等奖学金最高续发 10.5万/年
    if (val === 6) return 10.5; // 二等奖学金后续在 GPA 绩点前 5% 阶段可进阶到 10.5万/年
    if (val === 4) return 10.5; // 三等奖学金后续在 GPA 绩点前 5% 阶段可进阶到 10.5万/年
    return 0;
  };

  // 1. 声明大一常规累计额度
  let y1_shantou_inno = 0;
  if (activeShantouValue > 0 && activeInnovation > 0) {
    y1_shantou_inno = Math.max(activeShantouValue, activeInnovation);
  } else {
    y1_shantou_inno = activeShantouValue + activeInnovation;
  }
  let y1_regular = activeEnrollmentValue + activeSubjectValue + y1_shantou_inno;
  if (y1_regular > 15) {
    y1_regular = 15;
  }

  // 2. 声明大二、三、四学年能达到的极高进阶限额
  const renewEnrollMax = getEnrollmentMaxRenew(activeEnrollmentValue);
  const renewSubject = activeSubjectValue;
  // 修正此处逻辑缺陷：汕头籍生源激励最高进阶至 10.5 万
  const renewShantou = activeShantouValue === 4 ? 10.5 : activeShantouValue;

  let renewTotalMax = renewEnrollMax + renewSubject + renewShantou;
  if (renewTotalMax > 15) {
    renewTotalMax = 15;
  }

  // 3. 声明特定生源地专项（单独一次性发放，不占大一抵扣池子）
  let specialVal = 0;
  if (special === "changzhou" || special === "fanghui") specialVal = 1;
  else if (special === "huafeng") specialVal = 2;

  // 4. 四年最高额度全盘求和
  const grand_max_total = y1_regular + specialVal + renewTotalMax * 3;

  // 5. 学费抵免实缴核算
  const t1 = Math.max(0, 10.5 - y1_regular);
  const t2 = Math.max(0, 10.5 - renewTotalMax);
  const t3 = Math.max(0, 10.5 - renewTotalMax);
  const t4 = Math.max(0, 10.5 - renewTotalMax);

  const currentResults = {
    y1: y1_regular,
    y1_special: specialVal,
    y2_max: renewTotalMax,
    total_max: grand_max_total,
    t1,
    t2,
    t3,
    t4,
  };

  // 声明续奖细则标准库
  const ALL_RENEW_RULES = [
    {
      name: "校长奖学金",
      tag: "入学奖",
      baseAmount: "15万",
      rules: [
        { gpa: "GPA ≥ 90", rank: "无", amount: "15" },
        { gpa: "GPA ≥ 80", rank: "无", amount: "10.5" },
      ],
    },
    {
      name: "一等奖学金",
      tag: "入学奖",
      baseAmount: "10.5万",
      rules: [{ gpa: "GPA ≥ 80", rank: "无", amount: "10.5" }],
    },
    {
      name: "二等奖学金",
      tag: "入学奖",
      baseAmount: "6万",
      rules: [
        { gpa: "GPA ≥ 90", rank: "本专业前 5%", amount: "10.5" },
        { gpa: "GPA ≥ 85", rank: "本专业前 10%", amount: "8.5" },
        { gpa: "GPA ≥ 80", rank: "无", amount: "6" },
      ],
    },
    {
      name: "三等奖学金",
      tag: "入学奖",
      baseAmount: "4万",
      rules: [
        { gpa: "GPA ≥ 90", rank: "本专业前 5%", amount: "10.5" },
        { gpa: "GPA ≥ 85", rank: "本专业前 10%", amount: "8.5" },
        { gpa: "GPA ≥ 85", rank: "本专业前 15%", amount: "5.5" },
        { gpa: "GPA ≥ 80", rank: "无", amount: "4" },
      ],
    },
    {
      name: "学科特长奖",
      tag: "特长奖",
      rules: [{ gpa: "GPA ≥ 80", rank: "无", amount: "首年等额" }],
    },
    {
      name: "地区政策",
      tag: "政策奖",
      rules: [
        { gpa: "GPA ≥ 90", rank: "本专业前 5%", amount: "10.5" },
        { gpa: "GPA ≥ 85", rank: "本专业前 10%", amount: "8.5" },
        { gpa: "GPA ≥ 85", rank: "本专业前 15%", amount: "5.5" },
        { gpa: "GPA ≥ 80", rank: "无", amount: "4" },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* ======================================= */}
        {/* 左侧：输入控制栏 */}
        {/* ======================================= */}
        <div className="w-full lg:w-5/12 flex flex-col gap-6">
          <div className="bg-[#002d54]/5 p-5 rounded-xl border border-[#002d54]/15 shadow-sm relative overflow-hidden">
            <h3 className="text-lg font-bold text-[#002d54] mb-5 border-b border-[#002d54]/10 pb-3 flex items-center gap-2">
              <Sparkles size={20} className="text-[#ee7b11]" />
              新生条件评估
            </h3>

            <div className="mb-5">
              <label className="block font-semibold text-[#002d54] mb-3 text-xs uppercase tracking-wider">
                📍 生源地与高考排位
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">
                    省份
                  </label>
                  <select
                    value={calcProvince}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCalcProvince(val);
                      if (!NO_CITY_PROVINCES.includes(val) && CITY_DATA[val]) {
                        setCalcCity(CITY_DATA[val][0]);
                      } else {
                        setCalcCity("");
                      }
                    }}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#002d54] outline-none text-sm font-medium text-slate-800"
                  >
                    {ALL_PROVINCES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {!NO_CITY_PROVINCES.includes(calcProvince) ? (
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">
                      地级市
                    </label>
                    <select
                      value={calcCity}
                      onChange={(e) => setCalcCity(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#002d54] outline-none text-sm text-slate-800"
                    >
                      {CITY_DATA[calcProvince]?.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="bg-slate-100/50 rounded-lg border border-dashed border-slate-200 p-2.5 flex items-center justify-center text-xs text-slate-400">
                    直辖市
                  </div>
                )}

                <div>
                  <label className="block text-xs text-slate-600 mb-1">
                    省理科/物理类排名
                  </label>
                  <input
                    type="number"
                    placeholder="如: 12000"
                    value={calcRank}
                    onChange={(e) => setCalcRank(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#002d54] outline-none text-sm font-semibold text-slate-800 placeholder-slate-300"
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="block font-semibold text-[#002d54] mb-3 text-xs uppercase tracking-wider">
                ✍️ 高考分数
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">
                    数学单科分
                  </label>
                  <input
                    type="number"
                    placeholder="分"
                    value={calcMath}
                    onChange={(e) => setCalcMath(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#002d54] outline-none text-sm text-slate-800 placeholder-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">
                    英语单科分
                  </label>
                  <input
                    type="number"
                    placeholder="分"
                    value={calcEnglish}
                    onChange={(e) => setCalcEnglish(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#002d54] outline-none text-sm text-slate-800 placeholder-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 font-semibold mb-1">
                    是否达到特控线
                  </label>
                  <div className="flex gap-1 h-[42px]">
                    <button
                      disabled
                      className="flex-1 text-xs rounded-lg border bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                    >
                      否
                    </button>
                    <button
                      disabled
                      className="flex-1 text-xs rounded-lg border bg-[#002d54] text-white border-[#002d54] font-bold shadow-sm cursor-not-allowed"
                    >
                      是
                    </button>
                  </div>
                  <p className="text-[10px] text-red-500 font-semibold mt-1.5 leading-tight">
                    ⚠️ 所有奖学金均需达到各省市特控线方可获得。
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#002d54]/10 my-4"></div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-5">
              <div className="md:col-span-4">
                <label className="block font-semibold text-[#002d54] mb-2 text-xs uppercase tracking-wider">
                  是否申请创新潜质奖
                </label>
                <div className="flex gap-1 h-[38px]">
                  <button
                    onClick={() => setApplyInnovation(false)}
                    disabled={calcSubject > 0}
                    className={`flex-1 text-xs rounded-lg border transition-all ${
                      calcSubject > 0
                        ? !applyInnovation
                          ? "bg-slate-200 text-slate-500 border-slate-300 cursor-not-allowed font-bold"
                          : "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
                        : !applyInnovation
                        ? "bg-[#002d54] text-white border-[#002d54] font-bold shadow-sm"
                        : "bg-white text-[#002d54] border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    未申请
                  </button>
                  <button
                    onClick={() => setApplyInnovation(true)}
                    disabled={calcSubject > 0}
                    className={`flex-1 text-xs rounded-lg border transition-all ${
                      calcSubject > 0
                        ? applyInnovation
                          ? "bg-slate-200 text-slate-500 border-slate-300 cursor-not-allowed font-bold"
                          : "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
                        : applyInnovation
                        ? "bg-[#002d54] text-white border-[#002d54] font-bold shadow-sm"
                        : "bg-white text-[#002d54] border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    已申请
                  </button>
                </div>
                {calcSubject > 0 && (
                  <p className="text-[10px] text-amber-600 font-semibold mt-1.5 leading-tight">
                    ℹ️ 学科特长奖不与创新潜质奖兼得，学科特长奖优先获得。
                  </p>
                )}
              </div>

              <div className="md:col-span-8">
                <label className="block font-semibold text-[#002d54] mb-2 text-xs uppercase tracking-wider">
                  🏆 学科特长奖 (全国中学生奥林匹克竞赛)
                </label>
                <div className="flex flex-wrap gap-1">
                  {[
                    { label: "无", value: 0 },
                    { label: "国一", value: 7.5 },
                    { label: "国二", value: 6.25 },
                    { label: "国三", value: 5 },
                    { label: "省一", value: 3.75 },
                    { label: "省二", value: 2.5 },
                    { label: "省三", value: 2 },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setCalcSubject(opt.value)}
                      className={`px-2.5 py-1.5 text-xs rounded-md border transition-all ${
                        calcSubject === opt.value
                          ? "bg-[#ee7b11] text-white border-[#ee7b11] shadow-sm font-bold"
                          : "bg-white text-[#ee7b11] border-orange-200 hover:bg-orange-50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleEvaluate}
              className="w-full py-3 bg-[#ee7b11] hover:bg-[#e06d09] text-[#ffffff] font-bold rounded-xl transition-all shadow-md flex justify-center items-center gap-2 text-sm tracking-wider"
            >
              一键智能匹配入学奖项
            </button>

            {evalMessage && (
              <div className="mt-3 p-3 bg-white/80 border border-orange-100 rounded-lg text-xs text-orange-950 shadow-inner font-medium">
                {evalMessage}
              </div>
            )}
          </div>
        </div>

        {/* ======================================= */}
        {/* 右侧：结算与展示栏 */}
        {/* ======================================= */}
        <div className="w-full lg:w-7/12 flex flex-col gap-5">
          <div className="bg-white border border-[#002d54]/10 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 bg-[#002d54]/5 border-b border-[#002d54]/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#002d54]" />
                <h3 className="font-bold text-[#002d54] text-sm tracking-wide">
                  匹配入学奖项 (首年学年)
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                根据入学条件核定
              </span>
            </div>

            <div className="p-4">
              <div className="flex flex-col gap-2">
                {enrollment === 0 &&
                  innovation === 0 &&
                  !hasShantou &&
                  special === "none" &&
                  subject === 0 && (
                    <div className="text-xs text-slate-400 italic bg-slate-50/50 p-4 rounded-lg text-center border border-dashed border-slate-200">
                      当前尚未匹配到首年入学奖项。请在左侧“新生条件评估”中填报并点击一键匹配，即可在右侧测算四年最高预计奖学金方案与进阶激励政策。
                    </div>
                  )}

                {enrollment > 0 && (
                  <div
                    className={`flex justify-between items-center px-3 py-2.5 rounded-lg border transition-all duration-300 ${
                      isEnrollmentStriked
                        ? "bg-slate-100 text-slate-400 border-slate-200 opacity-60 line-through"
                        : "bg-emerald-50 text-emerald-950 border-emerald-200 shadow-sm"
                    }`}
                  >
                    <span className="text-xs font-bold">
                      新生入学奖学金{" "}
                      {isShantouTripleWithSubject
                        ? "（已为您自动保留新生三等奖 + 学科特长奖最优组合）"
                        : isTripleConflict
                        ? "（触发兼得冲突）"
                        : enrollment === 4 && hasShantou
                        ? "（与汕头籍同时获得时三等奖停用）"
                        : ""}
                    </span>
                    <span
                      className={`text-xs font-extrabold px-2 py-1 rounded shadow-sm transition-all duration-300 ${
                        isEnrollmentStriked
                          ? "bg-slate-200 text-slate-400"
                          : "bg-white text-emerald-700"
                      }`}
                    >
                      {getEnrollmentLabel(enrollment)}
                    </span>
                  </div>
                )}

                {subject > 0 && (
                  <div
                    className={`flex justify-between items-center px-3 py-2.5 rounded-lg border transition-all duration-300 ${
                      isSubjectStriked
                        ? "bg-slate-100 text-slate-400 border-slate-200 opacity-60 line-through"
                        : "bg-amber-50 text-amber-950 border-amber-200 shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">学科特长奖学金</span>
                      {innovation > 0 && !isSubjectStriked && (
                        <span className="text-[10px] text-amber-700 font-medium mt-0.5">
                          💡
                          已自动执行优化方案：与创新潜质奖互斥，系统已优先保留可持续发放的学科特长奖
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded shadow-sm transition-all duration-300 ${
                        isSubjectStriked
                          ? "bg-slate-200 text-slate-400"
                          : "bg-white text-amber-600"
                      }`}
                    >
                      {getSubjectLabel(subject)}
                    </span>
                  </div>
                )}

                {innovation > 0 && (
                  <div
                    className={`flex justify-between items-center px-3 py-2.5 rounded-lg border transition-all duration-300 ${
                      isInnovationStriked
                        ? "bg-slate-100 text-slate-400 border-slate-200 opacity-60 line-through"
                        : "bg-slate-900 text-slate-50 border-slate-800 shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">
                        创新潜质奖学金 (首年一次性)
                      </span>
                      {innoDisabledByEnrollment && (
                        <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                          ⚠️ [兼得限制]
                          创新潜质奖与新生入学奖互斥，系统已优先保留新生入学奖
                        </span>
                      )}
                      {innoDisabledBySubject && (
                        <span className="text-[10px] text-slate-400 font-normal mt-0.5">
                          ⚠️
                          与学科特长奖互斥，系统已优先保留可持续领取的学科特长奖
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded shadow-sm transition-all duration-300 ${
                        isInnovationStriked
                          ? "bg-slate-200 text-slate-400"
                          : "bg-slate-900 text-orange-300"
                      }`}
                    >
                      {getInnovationLabel(innovation)}
                    </span>
                  </div>
                )}

                {hasShantou && (
                  <div
                    className={`flex justify-between items-center px-3 py-2.5 rounded-lg border transition-all duration-300 ${
                      isShantouStriked
                        ? "bg-slate-100 text-slate-400 border-slate-200 opacity-60 line-through"
                        : "bg-sky-50 text-sky-950 border-sky-200 shadow-sm"
                    }`}
                  >
                    <span className="text-xs font-bold">地区政策 (汕头)</span>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded shadow-sm transition-all duration-300 ${
                        isShantouStriked
                          ? "bg-slate-200 text-slate-400"
                          : "bg-white text-sky-600"
                      }`}
                    >
                      汕头籍生源 (4万/年)
                    </span>
                  </div>
                )}

                {special !== "none" && (
                  <div className="flex justify-between items-center bg-indigo-50 text-indigo-950 border border-indigo-200 shadow-sm rounded-lg px-3 py-2.5">
                    <span className="text-xs font-bold">专项奖学金</span>
                    <span className="text-xs font-bold text-indigo-600 bg-white px-2 py-1 rounded shadow-sm">
                      {getSpecialLabel(special)}
                    </span>
                  </div>
                )}
              </div>

              {rawActiveSum > 15 && (
                <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-500 rounded-lg text-xs text-red-800 font-bold flex items-start gap-1.5 shadow-sm">
                  <ShieldAlert
                    size={14}
                    className="text-red-600 shrink-0 mt-0.5"
                  />
                  <span>
                    学生每年所获我校各类非专项奖助学金总额不得超过人民币15万元。
                  </span>
                </div>
              )}

              {(derivedErrors.length > 0 || derivedWarnings.length > 0) && (
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
                  <span className="font-bold text-[#002d54] block mb-2 flex items-center gap-1.5">
                    <ShieldAlert size={14} className="text-[#ee7b11]" />
                    兼得与互斥说明：
                  </span>
                  <div className="space-y-1.5">
                    {derivedErrors.map((err, idx) => (
                      <div
                        key={idx}
                        className="bg-red-50 border-l-2 border-red-500 p-2 text-red-950 font-semibold rounded-r"
                      >
                        {err}
                      </div>
                    ))}
                    {derivedWarnings.map((warn, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 border-l-2 border-slate-400 p-2 text-slate-700 rounded-r text-[11px]"
                      >
                        • {warn}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ======================================= */}
          {/* 四年最高获得奖学金总累计额面板 */}
          {/* ======================================= */}
          <div className="bg-white text-gray-800 rounded-xl shadow-sm overflow-hidden border border-[#002d54]/10 transition-all duration-300">
            <div className="p-6 text-center border-b border-slate-100 bg-[#002d54]/5 relative overflow-hidden">
              <p className="text-slate-600 text-xs font-bold uppercase tracking-wider mb-2 relative z-10">
                四年最高获得奖学金总额
              </p>

              <div className="relative z-10 inline-flex items-baseline gap-1 bg-[#ee7b11]/10 py-2 px-8 rounded-full border border-[#ee7b11]/30 shadow-md">
                <span className="text-4xl font-black text-[#ee7b11] tracking-tight">
                  {currentResults.total_max.toFixed(2)}
                </span>
                <span className="text-xs text-[#ee7b11] font-bold ml-1">
                  万元
                </span>
              </div>
            </div>

            {/* 发放账单分段明细 */}
            <div className="p-5 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col gap-2 h-full justify-between">
                  <div className="bg-slate-50/80 hover:bg-slate-100/80 transition-all p-4 rounded-xl border border-slate-100 flex flex-col justify-between flex-1 min-h-[105px]">
                    <div>
                      <span className="text-slate-500 text-xs font-bold mb-1 block">
                        首年 (大一入学)
                      </span>
                      <span className="text-[10px] text-slate-400 block leading-tight">
                        用于抵扣首年学费，若有剩余用于抵扣次年学费。
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between mt-4">
                      <span className="text-xl font-extrabold text-[#002d54]">
                        {currentResults.y1.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-400 font-bold">
                        万元
                      </span>
                    </div>
                  </div>

                  {currentResults.y1_special > 0 && (
                    <div className="bg-indigo-50/80 border border-indigo-100 p-2.5 rounded-xl flex items-center justify-between text-[11px] text-indigo-950 animate-fadeIn">
                      <span className="font-semibold text-indigo-800">
                        专项奖学金 (额外独立发放)
                      </span>
                      <span className="font-bold text-indigo-600">
                        +{currentResults.y1_special.toFixed(2)} 万元
                      </span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 bg-[#ee7b11]/5 hover:bg-[#ee7b11]/8 transition-all p-4 rounded-xl border border-orange-100 flex flex-col justify-between min-h-[105px] h-full relative overflow-hidden">
                  <div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-[#002d54] text-xs font-bold">
                        第二、三、四学年 (按续得及进阶激励)
                      </span>
                      <span className="text-[9px] bg-[#ee7b11] text-white px-1.5 py-0.5 rounded font-semibold tracking-wide">
                        每年最高: {currentResults.y2_max.toFixed(2)} 万元
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">
                      参评学年修满专业学分，且绩点（GPA）及排名满足相应要求即可续得奖学金。
                      同时学校设立了与学业优秀奖学金联合的激励机制，对应奖项获得者若能达到更高的GPA及专业排名要求，将可获得更高额度的奖励。
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-orange-100/40 text-[11px]">
                    <div>
                      <span className="text-slate-500">每年最高:</span>
                      <strong className="text-slate-800 ml-1 text-base">
                        {currentResults.y2_max.toFixed(2)} 万元
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* ======================================================= */}
              {/* 【定制】奖励额度及续得要求表格渲染 */}
              {/* ======================================================= */}
              <div className="mt-5 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-inner">
                {/* 标题栏 */}
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 text-xs font-bold text-[#002d54] flex items-center gap-1.5">
                  <span>奖励额度及续得要求</span>
                </div>

                {/* 表格内容区域 */}
                <div className="p-3 overflow-x-auto">
                  {activeEnrollmentValue === 0 &&
                  activeSubjectValue === 0 &&
                  activeShantouValue === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400 italic">
                      请在左侧新生评估中填写信息
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-[10px] text-slate-500 uppercase font-black tracking-wider">
                          <th className="pb-2">匹配奖项类别</th>
                          <th className="pb-2">绩点要求 (GPA)</th>
                          <th className="pb-2">专业排名要求</th>
                          <th className="pb-2 text-right">后续每学年金额</th>
                        </tr>
                      </thead>
                      <tbody className="text-[11px] divide-y divide-slate-100">
                        {/* 渲染匹配的新生入学奖 */}
                        {activeEnrollmentValue > 0 &&
                          (() => {
                            const enrollmentName =
                              activeEnrollmentValue === 15
                                ? "校长奖学金"
                                : activeEnrollmentValue === 10.5
                                ? "一等奖学金"
                                : activeEnrollmentValue === 6
                                ? "二等奖学金"
                                : activeEnrollmentValue === 4
                                ? "三等奖学金"
                                : "";
                            const matchedRuleSet = ALL_RENEW_RULES.find(
                              (r) => r.name === enrollmentName
                            );
                            return matchedRuleSet?.rules.map((rule, idx) => (
                              <tr
                                key={`enroll-${idx}`}
                                className="hover:bg-slate-50/50"
                              >
                                <td className="py-2.5 font-bold text-[#002d54]">
                                  {enrollmentName}
                                </td>
                                <td className="py-2.5 text-slate-700 font-semibold">
                                  {rule.gpa}
                                </td>
                                <td className="py-2.5 text-slate-600">
                                  {rule.rank}
                                </td>
                                <td className="py-2.5 text-right font-black text-emerald-600">
                                  {rule.amount}万元
                                </td>
                              </tr>
                            ));
                          })()}

                        {/* 渲染学科特长奖续得 (格式统一为 xx万元) */}
                        {activeSubjectValue > 0 && (
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-2.5 font-bold text-[#002d54]">
                              {
                                getSubjectLabel(activeSubjectValue).split(
                                  " "
                                )[0]
                              }
                            </td>
                            <td className="py-2.5 text-slate-700 font-semibold">
                              GPA ≥ 80
                            </td>
                            <td className="py-2.5 text-slate-600">无</td>
                            <td className="py-2.5 text-right font-black text-amber-600">
                              {activeSubjectValue}万元
                            </td>
                          </tr>
                        )}

                        {/* 渲染汕头籍生源特设奖续得及其进阶要求 (合并动态4档阶梯) */}
                        {activeShantouValue > 0 &&
                          (() => {
                            const matchedRuleSet = ALL_RENEW_RULES.find(
                              (r) => r.name === "地区政策"
                            );
                            return matchedRuleSet?.rules.map((rule, idx) => (
                              <tr
                                key={`shantou-${idx}`}
                                className="hover:bg-slate-50/50"
                              >
                                <td className="py-2.5 font-bold text-[#002d54]">
                                  汕头籍奖学金
                                </td>
                                <td className="py-2.5 text-slate-700 font-semibold">
                                  {rule.gpa}
                                </td>
                                <td className="py-2.5 text-slate-600">
                                  {rule.rank}
                                </td>
                                <td className="py-2.5 text-right font-black text-sky-600">
                                  {rule.amount}万元
                                </td>
                              </tr>
                            ));
                          })()}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ======================================= */}
          {/* 页脚：信息指引与咨询联系渠道 */}
          {/* ======================================= */}
          <div className="bg-[#002d54]/5 border border-[#002d54]/15 rounded-xl p-4 text-xs text-slate-700 shadow-sm flex flex-col gap-3">
            <span className="font-bold flex items-center gap-1.5 text-sm text-[#002d54] border-b border-[#002d54]/10 pb-2">
              <BookOpen size={16} className="text-[#ee7b11]" /> 奖学金发放管理
            </span>
            <a
              href="https://sites.gtiit.edu.cn/admissions/2026freshmen-scholarship/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-[#002d54] hover:bg-[#001a33] text-white text-center font-bold rounded-lg transition-all text-[11px] block shadow-sm tracking-wider"
            >
              点击查看广东以色列理工学院2026年新生入学奖助学金实施办法 ➔
            </a>
            <div className="border-t border-[#002d54]/10 my-1"></div>
            <div className="text-[11px] text-slate-600 leading-relaxed">
              💡
              本测算结果仅供考生及家长进行奖学金额度估算，不具法律效力。新生入学奖助学金由广东以色列理工学院奖学金委员会评定，学校拥有根据实际情况调整并最终决定的权利。
            </div>
          </div>

          <div className="bg-[#002d54]/5 border border-[#002d54]/15 rounded-xl p-4 text-xs text-slate-700 shadow-sm flex flex-col gap-3">
            <span className="font-bold flex items-center gap-1.5 text-sm text-[#002d54] border-b border-[#002d54]/10 pb-2">
              <Users size={16} className="text-[#ee7b11]" /> 招生咨询与联系方式
            </span>
            <div className="space-y-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-[#002d54]" />
                <span className="font-semibold text-slate-700 w-16 shrink-0">
                  学校官网:
                </span>
                <a
                  href="https://www.gtiit.edu.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ee7b11] hover:underline break-all"
                >
                  www.gtiit.edu.cn
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-[#002d54]" />
                <span className="font-semibold text-slate-700 w-16 shrink-0">
                  招生网:
                </span>
                <a
                  href="https://sites.gtiit.edu.cn/admissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ee7b11] hover:underline break-all"
                >
                  sites.gtiit.edu.cn/admissions
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#002d54]" />
                <span className="font-semibold text-slate-700 w-16 shrink-0">
                  招生热线:
                </span>
                <a
                  href="tel:0754-88077060"
                  className="text-slate-800 hover:text-[#ee7b11] transition-colors font-medium"
                >
                  0754-88077060
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#002d54]" />
                <span className="font-semibold text-slate-700 w-16 shrink-0">
                  招生邮箱:
                </span>
                <a
                  href="mailto:admissions@gtiit.edu.cn"
                  className="text-[#ee7b11] hover:underline break-all"
                >
                  admissions@gtiit.edu.cn
                </a>
              </div>
            </div>
            <div className="border-t border-[#002d54]/10 my-1"></div>
            <a
              href="https://sites.gtiit.edu.cn/admissions/contact-student-recruitment-group/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-[#002d54] hover:bg-[#001a33] text-white text-center font-bold rounded-lg transition-all text-[11px] block shadow-sm tracking-wider"
            >
              点击查看各省（市）招生组老师联系方式 ➔
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
