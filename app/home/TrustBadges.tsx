
'use client';

const trustBadges = [
  {
    title: 'گواهی ISO 9001',
    subtitle: 'کیفیت تضمینی',
    icon: 'ri-award-line',
    color: 'blue'
  },
  {
    title: 'عضو اتحادیه',
    subtitle: 'کسب و کار',
    icon: 'ri-building-line',
    color: 'green'
  },
  {
    title: 'پرداخت امن',
    subtitle: 'SSL محافظت',
    icon: 'ri-secure-payment-line',
    color: 'red'
  },
  {
    title: 'ارسال سریع',
    subtitle: 'در کمتر از 24 ساعت',
    icon: 'ri-rocket-line',
    color: 'purple'
  }
];

export default function TrustBadges() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustBadges.map((badge, index) => (
            <div key={index} className="text-center group">
              <div className={`w-16 h-16 bg-${badge.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-${badge.color}-200 transition-colors duration-300`}>
                <i className={`${badge.icon} text-2xl text-${badge.color}-500`}></i>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">{badge.title}</h3>
              <p className="text-gray-600 text-xs">{badge.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
