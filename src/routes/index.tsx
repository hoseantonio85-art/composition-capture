import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Check, ArrowLeft } from "lucide-react";
import {
  Home,
  Building2,
  Hand,
  Zap,
  Target,
  FileText,
  Bell,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Headphones,
  Scale,
  Megaphone,
  Plus,
  Globe,
  Users,
  Database,
  Rocket,
  Box,
  UserRound,
  Settings2,
  ArrowUp,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [{ title: "Норм — риск-менеджер" }],
  }),
});

const segments = [
  { label: "Законодательство и регуляторы", value: "538 млн/₽", color: "#FFE9A8", icon: Scale, pos: "tl" },
  { label: "Внешняя среда", value: "90 млн/₽", color: "#B8E8D4", icon: Globe, pos: "tr" },
  { label: "Клиенты и продукты", value: "557 млн/₽", color: "#F4C9C4", icon: Building2, pos: "r" },
  { label: "Партнёры и поставки", value: "85 млн/₽", color: "#F4C9C4", icon: Box, pos: "br" },
  { label: "Процессы и контроль", value: "1 078 млн/₽", color: "#F4C9C4", icon: Settings2, pos: "bb" },
  { label: "Персонал и культура", value: "125 млн/₽", color: "#FCE3B3", icon: UserRound, pos: "bl" },
  { label: "Проекты и изменения", value: "210 млн/₽", color: "#FFE9A8", icon: Rocket, pos: "l" },
  { label: "Технологии и данные", value: "61 млн/₽", color: "#FFE9A8", icon: Database, pos: "tl2" },
];

function DonutChart() {
  const cx = 200;
  const cy = 200;
  const rOuter = 130;
  const rInner = 78;
  const colors = ["#FFE0A3", "#B8E8D4", "#F4C9C4", "#F4C9C4", "#F4C9C4", "#FCE3B3", "#FFE0A3", "#FFE0A3"];
  const slices = 8;
  const angle = (2 * Math.PI) / slices;

  const arc = (i: number) => {
    const a0 = -Math.PI / 2 + i * angle;
    const a1 = a0 + angle;
    const x0 = cx + rOuter * Math.cos(a0);
    const y0 = cy + rOuter * Math.sin(a0);
    const x1 = cx + rOuter * Math.cos(a1);
    const y1 = cy + rOuter * Math.sin(a1);
    const xi1 = cx + rInner * Math.cos(a1);
    const yi1 = cy + rInner * Math.sin(a1);
    const xi0 = cx + rInner * Math.cos(a0);
    const yi0 = cy + rInner * Math.sin(a0);
    return `M ${x0} ${y0} A ${rOuter} ${rOuter} 0 0 1 ${x1} ${y1} L ${xi1} ${yi1} A ${rInner} ${rInner} 0 0 0 ${xi0} ${yi0} Z`;
  };

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <defs>
        <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#000" strokeOpacity="0.08" strokeWidth="2" />
        </pattern>
      </defs>
      {Array.from({ length: slices }).map((_, i) => (
        <g key={i}>
          <path d={arc(i)} fill={colors[i]} />
          <path d={arc(i)} fill="url(#hatch)" />
        </g>
      ))}
      {/* inner rings */}
      <circle cx={cx} cy={cy} r={70} fill="none" stroke="#22C55E" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={62} fill="none" stroke="#EF4444" strokeWidth="1.5" />
    </svg>
  );
}

function SegmentLabel({
  icon: Icon,
  title,
  value,
  className,
  align = "center",
}: {
  icon: any;
  title: string;
  value: string;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  const textAlign = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
  return (
    <div className={`absolute ${className} ${textAlign}`}>
      <div className={`flex ${align === "right" ? "justify-end" : align === "left" ? "justify-start" : "justify-center"} mb-1.5`}>
        <div className="w-7 h-7 rounded-md bg-white shadow-sm flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-slate-500" />
        </div>
      </div>
      <div className="text-[13px] font-semibold text-slate-800 leading-tight">{title}</div>
      <div className="text-[12px] text-slate-500 mt-0.5">{value}</div>
    </div>
  );
}

type GoalKey = "quick" | "real" | "yellow";

const GOALS: Record<GoalKey, {
  title: string;
  value: string;
  desc: string;
  drawerSubtitle: string;
  effect: string;
  actions: { title: string; sub: string; value: string; reason?: string; risk?: string }[];
}> = {
  quick: {
    title: "Быстрое снижение",
    value: "−500 тыс. ₽",
    desc: "2 действия, можно начать сегодня",
    drawerSubtitle: "2 действия, которые можно начать сегодня.",
    effect: "−500 тыс. ₽",
    actions: [
      { title: "Проверить меру по онлайн-расчётам", sub: "мера может работать слабее", value: "−320 тыс. ₽", reason: "3 повторяющихся инцидента за 30 дней", risk: "Массовые сбои в системе онлайн-расчётов" },
      { title: "Назначить владельца корректировки", sub: "ответственный за изменения", value: "удержит рост" },
    ],
  },
  real: {
    title: "Реалистичный план",
    value: "−1.4 млн ₽",
    desc: "5 действий за неделю",
    drawerSubtitle: "5 действий, которые могут вернуть риск ближе к жёлтой зоне.",
    effect: "−1.4 млн ₽",
    actions: [
      { title: "Проверить эффективность меры по онлайн-расчётам", sub: "мера может работать слабее", value: "−480 тыс. ₽", reason: "3 повторяющихся инцидента за 30 дней", risk: "Массовые сбои в системе онлайн-расчётов" },
      { title: "Разобрать повторяющиеся инциденты", sub: "найти корневую причину", value: "−320 тыс. ₽" },
      { title: "Назначить владельца корректировки", sub: "ответственный за изменения", value: "удержит рост" },
      { title: "Подтвердить переоценку риска", sub: "обновить оценку", value: "−260 тыс. ₽" },
      { title: "Создать или усилить превентивную меру", sub: "снизит вероятность", value: "−340 тыс. ₽" },
    ],
  },
  yellow: {
    title: "До жёлтой зоны",
    value: "−2.1 млн ₽",
    desc: "потребуется усилить меры и разобрать инциденты",
    drawerSubtitle: "Более полный маршрут: меры, инциденты и переоценка рисков.",
    effect: "−2.1 млн ₽",
    actions: [
      { title: "Усилить меру по онлайн-расчётам", sub: "поднять частоту контроля", value: "−480 тыс. ₽" },
      { title: "Разобрать 3 повторяющихся инцидента", sub: "найти корневую причину", value: "−320 тыс. ₽" },
      { title: "Проверить риски без эффективных мер", sub: "закрыть пробелы", value: "−410 тыс. ₽" },
      { title: "Назначить владельцев корректировки", sub: "ответственные за изменения", value: "удержит рост" },
      { title: "Подтвердить переоценку ключевого риска", sub: "обновить оценку", value: "−260 тыс. ₽" },
      { title: "Создать превентивную меру", sub: "снизит вероятность", value: "−340 тыс. ₽" },
      { title: "Запланировать контроль эффективности", sub: "регулярный мониторинг", value: "стабилизирует риск" },
    ],
  },
};

type DrawerMode = null | "plan" | "why" | "news";

function Dashboard() {
  const [drawer, setDrawer] = useState<DrawerMode>(null);
  const [goal, setGoal] = useState<GoalKey>("real");
  const [planStarted, setPlanStarted] = useState(false);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [detailIdx, setDetailIdx] = useState<number | null>(null);

  const openPlan = (idx: number | null = null) => {
    setDetailIdx(idx);
    setDrawer("plan");
  };

  const goalData = GOALS[goal];
  const total = goalData.actions.length;
  const doneCount = completed.size;
  const savedSum = useMemo(() => {
    let s = 0;
    completed.forEach((i) => {
      const m = goalData.actions[i]?.value.match(/−(\d+)/);
      if (m) s += parseInt(m[1]);
    });
    return s;
  }, [completed, goalData]);

  const toggleAction = (i: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const selectGoal = (g: GoalKey) => {
    setGoal(g);
    setCompleted(new Set());
  };

  const startPlan = () => {
    setPlanStarted(true);
    setCompleted(new Set());
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-16 bg-[#F4F5F7] flex flex-col items-center py-5 gap-1 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm">
          <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
        </div>
        <div className="mt-3 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
          <Building2 className="w-5 h-5 text-slate-500" />
        </div>
        <div className="flex-1 mt-10 flex flex-col gap-3 items-center">
          {[Home, Hand, Zap, Target, FileText].map((Icon, i) => (
            <button key={i} className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white">
              <Icon className="w-5 h-5" />
            </button>
          ))}
          <button className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-emerald-500">
            <Home className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col items-center gap-3 pb-2">
          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-[11px] font-semibold text-slate-600">
            ME
          </div>
          <button className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-500">
            <Headphones className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-500">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 px-8 pt-7 pb-32 relative">
        {/* Top */}
        <div className="flex items-start justify-between mb-6">
          <h1 className="text-[28px] font-semibold tracking-tight text-slate-900">
            Привет! Я твой риск-менеджер Норм.
          </h1>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium text-slate-700">
              Выявляю риски
              <Sparkles className="w-4 h-4 text-blue-500" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center relative">
              <Bell className="w-4 h-4 text-slate-500" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_360px] gap-5">
          {/* Donut card */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold">Объекты управления рисками</h2>
              <div className="flex gap-1.5">
                <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-current border-r-transparent" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                  <div className="grid grid-cols-2 gap-0.5">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-current rounded-sm" />
                    ))}
                  </div>
                </button>
              </div>
            </div>

            <div className="relative h-[440px]">
              {/* Top labels */}
              <SegmentLabel
                icon={Scale}
                title="Законодательство и регуляторы"
                value="538 млн/₽"
                className="top-2 left-1/2 -translate-x-[110%]"
              />
              <SegmentLabel
                icon={Globe}
                title="Внешняя среда"
                value="90 млн/₽"
                className="top-2 left-1/2 translate-x-[10%]"
              />
              {/* Right */}
              <SegmentLabel
                icon={Building2}
                title="Клиенты и продукты"
                value="557 млн/₽"
                className="top-1/2 right-6 -translate-y-[110%]"
                align="left"
              />
              <SegmentLabel
                icon={Box}
                title="Партнёры и поставки"
                value="85 млн/₽"
                className="top-1/2 right-6 translate-y-[20%]"
                align="left"
              />
              {/* Bottom */}
              <SegmentLabel
                icon={Settings2}
                title="Процессы и контроль"
                value="1 078 млн/₽"
                className="bottom-2 left-1/2 translate-x-[10%]"
              />
              <SegmentLabel
                icon={UserRound}
                title="Персонал и культура"
                value="125 млн/₽"
                className="bottom-2 left-1/2 -translate-x-[110%]"
              />
              {/* Left */}
              <SegmentLabel
                icon={Rocket}
                title="Проекты и изменения"
                value="210 млн/₽"
                className="top-1/2 left-6 translate-y-[20%]"
                align="right"
              />
              <SegmentLabel
                icon={Database}
                title="Технологии и данные"
                value="61 млн/₽"
                className="top-1/2 left-6 -translate-y-[110%]"
                align="right"
              />

              {/* Donut */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[360px] h-[360px]">
                  <DonutChart />
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="border-t border-slate-100 pt-4 mt-2 flex items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-200" style={{ backgroundImage: "repeating-linear-gradient(45deg,#cbd5e1 0 2px,transparent 2px 4px)" }} />
                Прямые потери
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-emerald-400" />
                Лимит
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-red-400 border-dashed" />
                Прогноз (Потенциальные потери)
              </div>
            </div>
          </div>

          {/* Right column — Риск-пульс */}
          <RiskPulse
            planStarted={planStarted}
            doneCount={doneCount}
            total={total}
            savedSum={savedSum}
            goalEffect={goalData.effect}
            openPlan={openPlan}
            openWhy={() => setDrawer("why")}
          />
        </div>

        {/* News */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Я собрал важные изменения в законах и СМИ</h3>
            <button className="text-xs text-slate-500 hover:text-slate-700">Показать все</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                tag1: "Законодательство",
                tag1c: "text-slate-600",
                tag2: "Персональные данные",
                tag2c: "text-orange-500",
                title: "Обработка персональных данных",
                desc: "Ужесточились требования к обработке персональных данных и существенно выросли штрафы за выявленные нарушения.",
                ring: "from-indigo-200",
                icon: Scale,
              },
              {
                tag1: "Новость",
                tag1c: "text-blue-500",
                tag2: "Экономика",
                tag2c: "text-orange-500",
                title: "Магазин-склад Самоката закрыт Роспотребнадзором",
                desc: "Невский районный суд Петербурга закрыл магазин-склад ООО 'Умный Ритейл' в Ростове-на-Дону по иску Роспотребнадзор…",
                ring: "from-violet-200",
                icon: Megaphone,
              },
              {
                tag1: "Законодательство",
                tag1c: "text-slate-600",
                tag2: "Налоговое право",
                tag2c: "text-orange-500",
                title: "Ужесточение требований к обработке персональных данных",
                desc: "Ужесточились требования к обработке персональных данных и существенно выросли штрафы за выявленные нарушения.",
                ring: "from-pink-200",
                icon: Scale,
              },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className={`bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)] border border-transparent bg-gradient-to-br ${c.ring} via-white to-white`}
                  style={{ backgroundOrigin: "border-box" }}
                >
                  <div className="bg-white rounded-xl">
                    <div className="flex items-center gap-2 mb-3 text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center">
                          <Icon className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                        <span className={`font-medium ${c.tag1c}`}>{c.tag1}</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <span className={`font-medium ${c.tag2c}`}>{c.tag2}</span>
                    </div>
                    <h4 className="text-sm font-semibold mb-2 leading-snug">{c.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">{c.desc}</p>
                    <button className="text-xs font-medium text-blue-500 inline-flex items-center gap-1">
                      Принять меры <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom action bar */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          <div className="bg-white rounded-full shadow-[0_8px_30px_rgba(15,23,42,0.08)] px-2 py-2 flex items-center gap-1">
            <button className="flex items-center gap-3 px-5 py-2 rounded-full text-sm font-medium text-emerald-600 hover:bg-emerald-50">
              Событие <Plus className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-slate-200" />
            <button className="flex items-center gap-3 px-5 py-2 rounded-full text-sm font-medium text-emerald-600 hover:bg-emerald-50">
              Мера <Plus className="w-4 h-4" />
            </button>
          </div>
          <button className="w-12 h-12 rounded-full bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] flex items-center justify-center">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white rotate-45" />
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}

function RiskPulse({
  planStarted,
  doneCount,
  total,
  savedSum,
  goalEffect: _goalEffect,
  openPlan,
  openWhy,
}: {
  planStarted: boolean;
  doneCount: number;
  total: number;
  savedSum: number;
  goalEffect: string;
  openPlan: (idx?: number | null) => void;
  openWhy: () => void;
}) {
  const progress = planStarted ? Math.round((doneCount / total) * 100) : 32;

  const actions = [
    { title: "Проверить меру по онлайн-расчётам", value: "−480 тыс. ₽", idx: 0 },
    { title: "Разобрать 3 повторяющихся инцидента", value: "−320 тыс. ₽", idx: 1 },
    { title: "Назначить владельца корректировки", value: "удержит рост", idx: 2 },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
        <div className="flex items-start gap-2.5 mb-3">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold">Риск-пульс</h3>
              <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full font-semibold">
                Высокий
              </span>
            </div>
            <p className="text-[12px] text-slate-500 leading-relaxed mt-1.5">
              Потенциальные потери выросли, но основная нагрузка сосредоточена в 3 зонах. Я могу собрать короткий план снижения.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="text-[11px] text-slate-500 mb-1.5">Прямые потери</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">5.1</span>
              <span className="text-[11px] text-slate-500">млн ₽</span>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="text-[11px] text-slate-500 mb-1.5">Потенциальные</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">6.2</span>
              <span className="text-[11px] text-slate-500">млн ₽</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[10px] text-amber-600 font-medium">
              <ArrowUp className="w-2.5 h-2.5" /> 320 тыс. ₽
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 mb-4">
          {planStarted ? (
            <>
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-[12px] text-slate-500">План снижения запущен</span>
                <span className="text-sm font-bold text-emerald-600">{doneCount} из {total}</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500">
                {savedSum > 0 ? `Уже снижено: −${savedSum} тыс. ₽` : `${doneCount} из ${total} действий выполнено`}
              </p>
            </>
          ) : (
            <>
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-[12px] text-slate-500">До комфортного уровня</span>
                <span className="text-sm font-bold text-emerald-600">−1.4 млн ₽</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500">
                5 действий могут вернуть риск в жёлтую зону
              </p>
            </>
          )}
        </div>

        <div className="mb-4">
          <div className="text-[12px] font-semibold text-slate-700 mb-2">
            Что можно скорректировать
          </div>
          <ul className="space-y-1">
            {actions.map((a) => (
              <li key={a.idx}>
                <button
                  onClick={() => openPlan(a.idx)}
                  className="w-full flex items-start gap-2 text-[12px] py-1.5 px-1 -mx-1 rounded-md hover:bg-slate-50 transition text-left"
                >
                  <span className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span className="flex-1 text-slate-600 leading-snug">{a.title}</span>
                  <span className="text-[11px] font-medium text-slate-500 shrink-0">{a.value}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => openPlan(null)}
          className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-sm font-medium py-2.5 rounded-xl shadow-sm hover:opacity-95 transition"
        >
          {planStarted ? "Продолжить план" : "Собрать план снижения"}
        </button>
        <button
          onClick={openWhy}
          className="w-full text-[12px] text-slate-500 hover:text-slate-700 mt-2 py-1"
        >
          Почему риск вырос?
        </button>
      </div>
    </div>
  );
}

