import { Check, MessageCircle, User, Bot } from 'lucide-react';

export default function Features() {
  const features = [
    'Links de agendamento inteligentes',
    'Integração nativa com WhatsApp',
    'Lembretes de corte automáticos'
  ];

  const messages = [
    { type: 'bot', text: 'Olá! Bem-vindo à Barba & Estilo! Em que posso ajudar?' },
    { type: 'user', text: 'Quero agendar um corte' },
    { type: 'bot', text: 'Perfeito! Temos os seguintes serviços:\n\n1. Corte Simples - R$ 40\n2. Corte + Barba - R$ 60\n3. Corte Premium - R$ 80\n\nQual você prefere?' },
    { type: 'user', text: 'Corte + Barba' },
    { type: 'bot', text: 'Ótima escolha! Qual barbeiro você prefere?\n\n1. João Silva\n2. Pedro Santos\n3. Carlos Oliveira' },
    { type: 'user', text: 'João Silva' },
    { type: 'bot', text: 'Horários disponíveis para João Silva:\n\n1. Hoje 14:00\n2. Hoje 16:30\n3. Amanhã 10:00\n\nQual horário funciona melhor?' },
    { type: 'user', text: 'Hoje 16:30' },
    { type: 'bot', text: 'Agendamento confirmado!\n\nServiço: Corte + Barba\nBarbeiro: João Silva\nData: Hoje\nHorário: 16:30\nValor: R$ 60,00\n\nVocê receberá um lembrete 1 hora antes. Até lá!' }
  ];

  return (
    <section className="bg-[#0A0A0A] py-20 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Agendamento Pelo WhatsApp<br />
              Sem Esforço Manual
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Simplifique a marcação de horários permitindo que o cliente escolha o serviço e o barbeiro diretamente pelo WhatsApp. Zero trabalho para você.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/30">
              Fale com Nosso Time Agora!
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-3xl rounded-full"></div>

            <div className="relative bg-gradient-to-b from-zinc-900 to-black rounded-3xl p-4 shadow-2xl border border-zinc-800 max-w-sm mx-auto">
              <div className="bg-emerald-600 rounded-t-2xl px-4 py-3 flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-white" />
                <div>
                  <div className="text-white font-semibold text-sm">SharpBot</div>
                  <div className="text-emerald-100 text-xs">Online agora</div>
                </div>
              </div>

              <div className="bg-zinc-950 rounded-b-2xl p-4 h-[600px] overflow-y-auto custom-scrollbar">
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start gap-2 max-w-[85%]">
                        {message.type === 'bot' && (
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            message.type === 'user'
                              ? 'bg-emerald-600 text-white rounded-tr-none'
                              : 'bg-zinc-800 text-white rounded-tl-none'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                        </div>
                        {message.type === 'user' && (
                          <div className="flex-shrink-0 w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-300" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
