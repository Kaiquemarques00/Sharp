import { useState } from 'react';
import { Check, Sparkles, ArrowLeft } from 'lucide-react';
import { plans, BillingCycle } from '../types/plans';
import { useNavigate } from '../hooks/useNavigate';
import Header from '../components/Header';

export default function DashboardPlans() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('mensal');
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    navigate(`/checkout/${planId}/${billingCycle}`);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Dashboard
          </button>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Escolha o Seu Plano
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Desbloqueie todo o potencial do SharpBook para sua barbearia
            </p>

            <div className="inline-flex items-center bg-zinc-900 rounded-full p-1 border border-zinc-800">
              <button
                onClick={() => setBillingCycle('mensal')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === 'mensal'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingCycle('anual')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  billingCycle === 'anual'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Anual
                <span className="bg-emerald-400 text-zinc-900 text-xs px-2 py-0.5 rounded-full font-bold">
                  15% OFF
                </span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const price = billingCycle === 'mensal' ? plan.monthlyPrice : plan.annualPrice;
              const period = billingCycle === 'mensal' ? '/mês' : '/ano';

              return (
                <div
                  key={plan.id}
                  className={`relative bg-[#1A1A1A] rounded-2xl p-8 ${
                    plan.highlighted
                      ? 'border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20 transform scale-105'
                      : 'border border-zinc-800'
                  } transition-all duration-300`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        MAIS VENDIDO!
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-sm text-gray-400 font-semibold mb-4 tracking-wider">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-white">
                        R$ {price.toLocaleString('pt-BR')}
                      </span>
                      <span className="text-gray-400 text-lg">{period}</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">{plan.barbers}</div>
                    <div className="text-sm text-gray-500">{plan.appointments}</div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-emerald-400" />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/30'
                        : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
                    }`}
                  >
                    {plan.highlighted ? 'Assinar Agora' : 'Selecionar Plano'}
                  </button>
                </div>
              );
            })}
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            Todos os planos incluem teste gratuito de 7 dias e podem ser cancelados a qualquer momento.
          </p>
        </div>
      </div>
    </div>
  );
}
