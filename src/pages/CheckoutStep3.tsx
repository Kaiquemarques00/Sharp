import { useState, useEffect } from 'react';
import { ArrowLeft, Scissors, Lock, ExternalLink, AlertTriangle } from 'lucide-react';
import { plans, PlanType, BillingCycle } from '../types/plans';
import { useNavigate } from '../hooks/useNavigate';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Mapa de IDs de Planos de Assinatura do Mercado Pago (Preapproval Plan IDs)
// IMPORTANTE: VOCÊ DEVE SUBSTITUIR ESTES PLACEHOLDERS PELOS SEUS IDs REAIS!
const MERCADO_PAGO_IDS: Record<PlanType, Record<BillingCycle, string>> = {
  essencial: {
    mensal: 'MENSAL_ID_ESSENCIAL', 
    anual: 'ANUAL_ID_ESSENCIAL',
  },
  profissional: {
    mensal: 'MENSAL_ID_PROFISSIONAL',
    anual: 'ANUAL_ID_PROFISSIONAL',
  },
  premium: {
    mensal: 'MENSAL_ID_PREMIUM',
    // Usando o ID fornecido como exemplo para o plano mais completo
    anual: '4f9d4003c9ee436ca62ae8d82f16c743', 
  },
};

const getMercadoPagoLink = (planId: PlanType, billingCycle: BillingCycle): string | null => {
  const preapprovalId = MERCADO_PAGO_IDS[planId]?.[billingCycle];
  
  if (!preapprovalId) {
    console.error(`ID do plano não encontrado para: ${planId} / ${billingCycle}`);
    return null;
  }

  return `https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=${preapprovalId}`;
};

interface CheckoutStep3Props {
  planId: PlanType;
  billingCycle: BillingCycle;
}

export default function CheckoutStep3({ planId, billingCycle }: CheckoutStep3Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null); // Novo estado para mensagens de erro

  const plan = plans.find(p => p.id === planId);
  const price = billingCycle === 'mensal' ? plan?.monthlyPrice : plan?.annualPrice;
  const period = billingCycle === 'mensal' ? '/mês' : '/ano';

  useEffect(() => {
    loadCheckoutData();
  }, [navigate, planId, billingCycle]);

  const loadCheckoutData = () => {
    const data = sessionStorage.getItem('checkoutData');
    if (!data) {
      navigate(`/checkout/${planId}/${billingCycle}`);
      return;
    }
    setCheckoutData(JSON.parse(data));
  };

  const handleGoToPayment = async () => {
    setError(null); // Limpa erros anteriores
    setLoading(true);

    const subscriptionLink = getMercadoPagoLink(planId, billingCycle);

    if (!subscriptionLink) {
      setError('Erro: Link de assinatura não configurado. Por favor, verifique a configuração dos IDs do Mercado Pago.');
      setLoading(false);
      return;
    }

    try {
      // Se o usuário não tem barbershop_id, precisa criar o barbershop primeiro
      if (!checkoutData.barbershopId) {
        const { data: barbershop, error: barbershopError } = await supabase
          .from('barbershops')
          .insert({
            name: checkoutData.barbershopName,
            whatsapp_phone: checkoutData.whatsappPhone,
            barber_count: checkoutData.barberCount
          })
          .select()
          .single();

        if (barbershopError) throw barbershopError;

        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: checkoutData.userId,
            full_name: checkoutData.fullName,
            email: checkoutData.email,
            barbershop_id: barbershop.id
          });

        if (profileError) throw profileError;
      }

      // Salva informações do plano selecionado para processar depois
      sessionStorage.setItem('selectedPlan', JSON.stringify({
        planId,
        billingCycle,
        price,
        userId: checkoutData.userId,
        barbershopId: checkoutData.barbershopId || checkoutData.userId
      }));

      // Redireciona para o link do Mercado Pago dinamicamente
      window.location.href = subscriptionLink;
    } catch (err: any) {
      console.error('Error:', err);
      setError('Erro ao processar sua assinatura. Tente novamente ou entre em contato com o suporte.');
      setLoading(false);
    }
  };

  if (!checkoutData) {
    // Tela de carregamento simples enquanto carrega os dados
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Carregando dados do checkout...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(`/checkout/step2/${planId}/${billingCycle}`)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
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
                    {checkoutData?.userId ? '2' : '3'}
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Finalize sua Assinatura
                  </h2>
                </div>
                {!checkoutData?.barbershopId && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 ml-11">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-emerald-500">Dados da Conta</span>
                    <div className="w-8 h-px bg-gray-600"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-emerald-500">WhatsApp</span>
                    <div className="w-8 h-px bg-gray-600"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <span>Pagamento</span>
                  </div>
                )}
              </div>
              
              {/* Exibição da mensagem de erro */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400 text-sm">
                    {error}
                  </p>
                </div>
              )}

              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg p-4 mb-8 flex items-center gap-3">
                <Lock className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold">Pagamento 100% Seguro</p>
                  <p className="text-emerald-400 text-sm">Processado pelo Mercado Pago.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-zinc-900 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Informações do Pedido</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Nome:</span>
                      <span className="text-white font-medium">{checkoutData?.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-white font-medium">{checkoutData?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Barbearia:</span>
                      <span className="text-white font-medium">{checkoutData?.barbershopName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">WhatsApp:</span>
                      <span className="text-white font-medium">{checkoutData?.whatsappPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Barbeiros:</span>
                      <span className="text-white font-medium">{checkoutData?.barberCount}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-blue-400 text-sm flex items-start gap-2">
                    <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      Você será redirecionado para a página de pagamento seguro do Mercado Pago. 
                      Após a confirmação, você receberá um email e poderá acessar o dashboard.
                    </span>
                  </p>
                </div>

                <button
                  onClick={handleGoToPayment}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Processando...'
                  ) : (
                    <>
                      Ir para Pagamento Seguro
                      <ExternalLink className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-gray-500 text-xs">
                  Ao clicar, você concorda com nossos Termos de Serviço e Política de Privacidade
                </p>
              </div>
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

              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mb-4">
                <p className="text-emerald-400 text-sm">
                  7 dias grátis para testar todas as funcionalidades
                </p>
              </div>

              <div className="bg-zinc-900 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-gray-400" />
                  <span className="text-white text-sm font-semibold">Pagamento Seguro</span>
                </div>
                <p className="text-gray-400 text-xs">
                  Processado pelo Mercado Pago com certificado SSL
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}