import { CheckCircle, Scissors, ArrowRight, BookOpen } from 'lucide-react';

export default function Success() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Scissors className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">SharpBook</span>
        </div>

        <div className="bg-zinc-950 rounded-3xl p-12 border border-zinc-800 shadow-2xl">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-3xl"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/50">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            Parabéns! Sua Assinatura foi Ativada!
          </h1>

          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            O SharpBot está pronto para transformar sua barbearia. Use o guia abaixo para o primeiro acesso.
          </p>

          <div className="space-y-4 mb-12">
            <div className="bg-zinc-900 rounded-xl p-6 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Configure seu WhatsApp</h3>
                  <p className="text-gray-400 text-sm">
                    Conecte o número da sua barbearia e aguarde a validação automática.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Adicione seus barbeiros</h3>
                  <p className="text-gray-400 text-sm">
                    Configure os horários disponíveis de cada profissional.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Configure seus serviços</h3>
                  <p className="text-gray-400 text-sm">
                    Adicione os serviços oferecidos e seus respectivos valores.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/30"
            >
              Acessar o Painel de Controle
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="/onboarding"
              className="inline-flex items-center justify-center gap-2 bg-zinc-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-zinc-700 transition-all duration-300 border border-zinc-700"
            >
              <BookOpen className="w-5 h-5" />
              Iniciar Guia de Configuração
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-zinc-800">
            <p className="text-gray-500 text-sm">
              Dúvidas? Entre em contato com nosso suporte:{' '}
              <a href="mailto:suporte@sharpbook.com" className="text-emerald-400 hover:text-emerald-300">
                suporte@sharpbook.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
