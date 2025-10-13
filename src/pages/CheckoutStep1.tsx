import { useState } from 'react';
import { ArrowLeft, Scissors } from 'lucide-react';
import { plans, PlanType, BillingCycle } from '../types/plans';
import { useNavigate } from '../hooks/useNavigate';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface CheckoutStep1Props {
  planId: PlanType;
  billingCycle: BillingCycle;
}

export default function CheckoutStep1({ planId, billingCycle }: CheckoutStep1Props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    barbershopName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const plan = plans.find(p => p.id === planId);
  const price = billingCycle === 'mensal' ? plan?.monthlyPrice : plan?.annualPrice;
  const period = billingCycle === 'mensal' ? '/mês' : '/ano';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });

      if (authError) throw authError;

      if (authData.user) {
        sessionStorage.setItem('checkoutData', JSON.stringify({
          userId: authData.user.id,
          fullName: formData.fullName,
          email: formData.email,
          barbershopName: formData.barbershopName,
          planId,
          billingCycle,
          price
        }));

        navigate(`/checkout/step2/${planId}/${billingCycle}`);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
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
                    1
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Ativação do Plano {plan?.name.split(' ')[1]}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 ml-11">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span>Dados da Conta</span>
                  <div className="w-8 h-px bg-gray-700"></div>
                  <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                  <span>WhatsApp</span>
                  <div className="w-8 h-px bg-gray-700"></div>
                  <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                  <span>Pagamento</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Detalhes da Conta</h3>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        E-mail (Este será seu login)
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                        Senha
                      </label>
                      <input
                        type="password"
                        id="password"
                        required
                        minLength={6}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Mínimo 6 caracteres"
                      />
                    </div>

                    <div>
                      <label htmlFor="barbershopName" className="block text-sm font-medium text-gray-300 mb-2">
                        Nome da Barbearia
                      </label>
                      <input
                        type="text"
                        id="barbershopName"
                        required
                        value={formData.barbershopName}
                        onChange={(e) => setFormData({ ...formData, barbershopName: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Nome da sua barbearia"
                      />
                    </div>
                  </div>
                </div>

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
                  {loading ? 'Criando conta...' : 'Continuar'}
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
