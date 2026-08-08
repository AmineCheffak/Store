import { ShieldCheck, Truck, Sparkles } from "lucide-react";

const cards = [
  {
    title: "تصميم فاخر",
    description: "واجهة مميزة تعكس جودة المنتجات وتزيد من ثقة العملاء.",
    icon: Sparkles,
  },
  {
    title: "شحن سريع",
    description: "توصيل دقيق وسريع إلى باب العميل مع متابعة فورية.",
    icon: Truck,
  },
  {
    title: "دفع آمن",
    description: "نظام دفع محمي لضمان تجربة شراء مريحة دون قلق.",
    icon: ShieldCheck,
  },
];



export default function About() {
  return (<section id="About">
    <div className="mx-auto mt-10 max-w-7xl rounded-[36px] border border-black/10 bg-white p-8 shadow-[0_40px_100px_rgba(0,0,0,0.06)] sm:p-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="flex-1 space-y-5">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">تجربة متجر إلكتروني فاخرة</p>
          <h2 className="text-3xl font-semibold text-slate-950 sm:text-4xl">نموذج واجهة مستخدم يجمع بين الأناقة والوضوح</h2>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            أضفت لك الآن بانر أكثر أناقة مع قسم ميزات مكسو بطبقات تباين، خطوط واضحة، وأزرار واضحة للمستخدمين.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">ابدأ التسوق</button>
            <button className="rounded-full border border-black bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-slate-100">اعرف المزيد</button>
          </div>
        </div>
        <div className=" flex-1 rounded-[32px] border border-black/10 bg-black p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.16)]">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">عرض مميز</p>
          <h3 className="mt-4 text-2xl font-semibold">اختر تشكيلتك المفضلة</h3>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
            <li>• تصاميم نظيفة لعرض المنتجات</li>
            <li>• أزرار CTA واضحة ومحفزة</li>
            <li>• تناسق ألوان بسيط مع تباين عالي</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {cards.map((item) => {
        const Icon = item.icon;
        return (
          <article key={item.title} className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-black text-white shadow-sm">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
          </article>
        );
      })}
    </div>
  </section>
  );
}
