import { MessageSquare, Scissors, Sparkles } from 'lucide-react';

export default function Hero() {
  const scrollToPlans = () => {
    document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-zinc-900 to-zinc-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.1)_0%,_transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Agende Seus Clientes Via WhatsApp,{' '}
            <span className="bg-gradient-to-r from-gray-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent">
              24/7
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Deixe a IA cuidar da agenda. Sua barbearia sempre aberta para marcações.
          </p>
          <button
            onClick={scrollToPlans}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/30"
          >
            <Sparkles className="w-5 h-5" />
            Fale com Nosso Time Agora!
          </button>
        </div>

        <div className="relative mt-20 flex items-center justify-center">
          <div className="relative transform perspective-1000 hover:scale-105 transition-transform duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-3xl rounded-full"></div>

            <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-3xl p-8 shadow-2xl border border-zinc-700/50 max-w-md mx-auto">
              <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">SharpBot</div>
                    <div className="text-xs text-emerald-500 flex items-center gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                      Online agora
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-zinc-800 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                      <p className="text-white text-sm">Olá! Qual serviço deseja?</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-emerald-600 rounded-2xl rounded-tr-none px-4 py-3 max-w-[80%]">
                      <p className="text-white text-sm">Corte + Barba</p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-zinc-800 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                      <p className="text-white text-sm">Perfeito! Reservado para 15h com João.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6">
                <div className="transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-lg p-3 border border-zinc-600/50 shadow-xl">
                    <Scissors className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>
                <div className="transform rotate-12 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-lg p-3 border border-zinc-600/50 shadow-xl">
                    <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.253 12.998l-3.098-.327.228-1.962 3.114.292zM9.384 13.265l3.488 9.107c.224.584.88.88 1.464.656l9.107-3.488c.584-.224.88-.88.656-1.464l-3.488-9.107L9.384 13.265zM3.614 11.772l2.813-.743.507 1.92-2.829.667zM8.949 8.309l2.813-.743.507 1.92-2.829.667zM14.284 4.846l2.813-.743.507 1.92-2.829.667z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent"></div>
    </section>
  );
}
