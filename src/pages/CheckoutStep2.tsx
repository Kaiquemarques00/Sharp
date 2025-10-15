import { useState, useEffect } from 'react';
import { ArrowLeft, Scissors } from 'lucide-react';
import { plans, PlanType, BillingCycle } from '../types/plans';
import { useNavigate } from '../hooks/useNavigate';
import { createClient } from '@supabase/supabase-js';
import clsx from 'clsx'; // Importação adicionada para facilitar a condicionalidade de classes

interface CheckoutStep2Props {
  planId: PlanType;
  billingCycle: BillingCycle;
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function CheckoutStep2({ planId, billingCycle }: CheckoutStep2Props) {
  const navigate = useNavigate();
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [barberCount, setBarberCount] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      checkAuth();
    }, []);
  
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

  const plan = plans.find(p => p.id === planId);
  const price = billingCycle === 'mensal' ? plan?.monthlyPrice : plan?.annualPrice;
  const period = billingCycle === 'mensal' ? '/mês' : '/ano';

  useEffect(() => {
    const checkoutData = sessionStorage.getItem('checkoutData');
    if (!checkoutData) {
      navigate(`/checkout/${planId}/${billingCycle}`);
    }
  }, [navigate, planId, billingCycle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const existingData = JSON.parse(sessionStorage.getItem('checkoutData') || '{}');
    sessionStorage.setItem('checkoutData', JSON.stringify({
      ...existingData,
      whatsappPhone,
      barberCount
    }));

    navigate(`/checkout/step3/${planId}/${billingCycle}`);
  };

  // Função para lidar com o clique do botão "Voltar", checando a autenticação
  const handleGoBack = () => {
    if (!isAuthenticated) {
      navigate(`/checkout/${planId}/${billingCycle}`);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={handleGoBack} // Usa a função condicional
          disabled={isAuthenticated} // Desabilita o botão no HTML
          className={clsx( // Aplica classes condicionais
            "flex items-center gap-2 transition-colors mb-8",
            isAuthenticated 
              ? "text-gray-600 cursor-not-allowed" // Estilo desabilitado
              : "text-gray-400 hover:text-white" // Estilo habilitado
          )}
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Scissors className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">SharpBook</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-zinc-950 rounded-2xl p-8 border border-zinc-800">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Conecte o seu WhatsApp
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 ml-11">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-emerald-500">Dados da Conta</span>
                  <div className="w-8 h-px bg-gray-600"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span>WhatsApp</span>
                  <div className="w-8 h-px bg-gray-700"></div>
                  <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                  <span>Pagamento</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Conexão</h3>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="whatsappPhone" className="block text-sm font-medium text-gray-300 mb-2">
                        Telefone/WhatsApp da Barbearia (+55)
                      </label>
                      <input
                        type="tel"
                        id="whatsappPhone"
                        required
                        value={whatsappPhone}
                        onChange={(e) => setWhatsappPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="(11) 99999-9999"
                      />
                      <p className="text-gray-500 text-sm mt-2">
                        Aguarde um código de validação em seu WhatsApp para sincronizar o SharpBot.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Barbeiros</h3>

                  <div>
                    <label htmlFor="barberCount" className="block text-sm font-medium text-gray-300 mb-2">
                      Quantos Barbeiros vão utilizar o sistema?
                    </label>
                    <input
                      type="number"
                      id="barberCount"
                      required
                      min={1}
                      max={planId === 'premium' ? 999 : planId === 'profissional' ? 5 : 1}
                      value={barberCount}
                      onChange={(e) => setBarberCount(parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="1"
                    />
                    <p className="text-gray-500 text-sm mt-2">
                      Você poderá adicionar os nomes completos após o pagamento.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
                >
                  Ir para o Pagamento
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800 sticky top-8">
              <h3 className="text-lg font-semibold text-white mb-4">Resumo do Pedido</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-gray-400 text-sm mb-1">Plano Selecionado</div>
                  <div className="text-white font-semibold">{plan?.name}</div>
                </div>

                <div>
                  <div className="text-gray-400 text-sm mb-1">Cobrança</div>
                  <div className="text-white font-semibold capitalize">{billingCycle}</div>
                </div>

                <div className="border-t border-zinc-800 pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-gray-400">Total</span>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white">
                        R$ {price?.toLocaleString('pt-BR')}
                      </div>
                      <div className="text-sm text-gray-400">{period}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-emerald-400 text-sm">
                  7 dias grátis para testar todas as funcionalidades
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}