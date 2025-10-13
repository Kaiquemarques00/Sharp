import { useState, useEffect } from 'react';
import { ArrowLeft, Scissors, Lock, CreditCard } from 'lucide-react';
import { plans, PlanType, BillingCycle } from '../types/plans';
import { useNavigate } from '../hooks/useNavigate';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface CheckoutStep3Props {
  planId: PlanType;
  billingCycle: BillingCycle;
}

export default function CheckoutStep3({ planId, billingCycle }: CheckoutStep3Props) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'cartao' | 'pix' | 'boleto'>('cartao');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    cpf: ''
  });

  const plan = plans.find(p => p.id === planId);
  const price = billingCycle === 'mensal' ? plan?.monthlyPrice : plan?.annualPrice;
  const period = billingCycle === 'mensal' ? '/mês' : '/ano';

  useEffect(() => {
    const checkoutData = sessionStorage.getItem('checkoutData');
    if (!checkoutData) {
      navigate(`/checkout/${planId}/${billingCycle}`);
    }
  }, [navigate, planId, billingCycle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const checkoutDataStr = sessionStorage.getItem('checkoutData');
      if (!checkoutDataStr) throw new Error('Dados do checkout não encontrados');

      const checkoutData = JSON.parse(checkoutDataStr);

      const { data: barbershop, error: barbershopError } = await supabase
        .from('barbershops')
        .insert({
          name: checkoutData.barbershopName,
          whatsapp_phone: checkoutData.whatsappPhone,
          barber_count: checkoutData.barberCount
        })
        .select()
        .single();

      console.log(barbershopError)

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

      const expiresAt = new Date();
      if (billingCycle === 'mensal') {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      } else {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      }

      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .insert({
          barbershop_id: barbershop.id,
          plan_type: planId,
          billing_cycle: billingCycle,
          price: price,
          status: 'active',
          expires_at: expiresAt.toISOString()
        });

      if (subscriptionError) throw subscriptionError;

      sessionStorage.removeItem('checkoutData');
      navigate('/success');
    } catch (err: any) {
      setError(err.message || 'Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

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
                    3
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Finalize sua Assinatura
                  </h2>
                </div>
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
              </div>

              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg p-4 mb-8 flex items-center gap-3">
                <Lock className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold">Pagamento 100% Seguro</p>
                  <p className="text-emerald-400 text-sm">Seus dados estão criptografados.</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex gap-4 border-b border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cartao')}
                    className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                      paymentMethod === 'cartao'
                        ? 'text-emerald-400 border-emerald-400'
                        : 'text-gray-400 border-transparent hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Cartão de Crédito
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                      paymentMethod === 'pix'
                        ? 'text-emerald-400 border-emerald-400'
                        : 'text-gray-400 border-transparent hover:text-white'
                    }`}
                  >
                    PIX
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('boleto')}
                    className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                      paymentMethod === 'boleto'
                        ? 'text-emerald-400 border-emerald-400'
                        : 'text-gray-400 border-transparent hover:text-white'
                    }`}
                  >
                    Boleto
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {paymentMethod === 'cartao' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-2">
                        Número do Cartão
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        required
                        maxLength={19}
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>

                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-300 mb-2">
                        Nome no Cartão
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        required
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Nome como está no cartão"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-300 mb-2">
                          Validade (MM/AA)
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          required
                          maxLength={5}
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="MM/AA"
                        />
                      </div>

                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          required
                          maxLength={4}
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="cpf" className="block text-sm font-medium text-gray-300 mb-2">
                        CPF/CNPJ do Titular
                      </label>
                      <input
                        type="text"
                        id="cpf"
                        required
                        value={cardData.cpf}
                        onChange={(e) => setCardData({ ...cardData, cpf: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="000.000.000-00"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'pix' && (
                  <div className="bg-zinc-900 rounded-lg p-6 text-center">
                    <p className="text-white mb-4">Após confirmar, você receberá o código PIX para pagamento.</p>
                    <p className="text-gray-400 text-sm">O código será válido por 30 minutos.</p>
                  </div>
                )}

                {paymentMethod === 'boleto' && (
                  <div className="bg-zinc-900 rounded-lg p-6 text-center">
                    <p className="text-white mb-4">Após confirmar, você receberá o boleto por e-mail.</p>
                    <p className="text-gray-400 text-sm">Vencimento em 3 dias úteis.</p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processando...' : 'Assinar e Ativar o SharpBot'}
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
