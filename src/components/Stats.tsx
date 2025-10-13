export default function Stats() {
  const stats = [
    {
      header: 'Disponibilidade',
      number: '24/7',
      description: 'Sua agenda sempre online.'
    },
    {
      header: 'Agendamentos',
      number: '95%+',
      description: 'Taxa de confirmação via chat.'
    },
    {
      header: 'Atendimento',
      number: '0.5s',
      description: 'Tempo médio de resposta.'
    },
    {
      header: 'Crescimento',
      number: '10x',
      description: 'Agende 10x mais rápido.'
    }
  ];

  return (
    <section className="bg-[#0A0A0A] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Produtividade e Lucro no Seu Bolso
          </h2>
          <p className="text-lg text-gray-400">
            Diga adeus às faltas e olá para a agenda cheia de forma instantânea
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-2xl p-8 border border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-4 group-hover:text-emerald-400 transition-colors">
                {stat.header}
              </p>
              <h3 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
                {stat.number}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
