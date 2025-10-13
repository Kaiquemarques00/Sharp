import { Star, Quote } from 'lucide-react';

export default function Testimonial() {
  return (
    <section className="bg-[#0A0A0A] py-20 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Confiança de Barbeiros,<br />
            Aprovação de Clientes
          </h2>
          <p className="text-lg text-gray-400">
            Nossas ferramentas são testadas e aprovadas por quem mais entende do negócio.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 md:p-12 border border-zinc-800 shadow-2xl">
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center rotate-12 shadow-xl">
              <Quote className="w-8 h-8 text-white" />
            </div>

            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-emerald-500 text-emerald-500" />
              ))}
            </div>

            <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 font-light">
              "O SharpBot mudou a rotina da minha barbearia. Não perco mais tempo com mensagens e o número de faltas caiu demais!"
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                PN
              </div>
              <div>
                <div className="text-white font-semibold text-lg">Pedro "Navalha" Soares</div>
                <div className="text-gray-400">Proprietário, Barba & Estilo</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-3">
                "Agora consigo focar no que realmente importa: cortar cabelo!"
              </p>
              <div className="text-gray-500 text-xs">
                <div className="font-semibold text-gray-400">Carlos Mendes</div>
                <div>Barbearia Clássica</div>
              </div>
            </div>

            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-3">
                "Meus clientes adoram a facilidade de agendar pelo WhatsApp."
              </p>
              <div className="text-gray-500 text-xs">
                <div className="font-semibold text-gray-400">Rafael Lima</div>
                <div>The Barber Shop</div>
              </div>
            </div>

            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-3">
                "Duplicamos o faturamento desde que começamos a usar!"
              </p>
              <div className="text-gray-500 text-xs">
                <div className="font-semibold text-gray-400">Bruno Costa</div>
                <div>Studio do Corte</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
