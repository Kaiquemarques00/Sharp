import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from '../hooks/useNavigate';
import {
  Calendar,
  Users,
  MessageSquare,
  TrendingUp,
  Lock,
  Sparkles
} from 'lucide-react';
import Header from '../components/Header';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [barbershop, setBarbershop] = useState<any>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/login');
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*, barbershops(*)')
        .eq('id', user.id)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
        setBarbershop(profileData.barbershops);

        const { data: subData } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('barbershop_id', profileData.barbershop_id)
          .eq('status', 'active')
          .maybeSingle();

        setSubscription(subData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  const hasActiveSubscription = subscription && subscription.status === 'active';

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Olá, {profile?.full_name?.split(' ')[0]}!
            </h1>
            <p className="text-gray-400">
              {barbershop?.name} - {hasActiveSubscription ? `Plano ${subscription.plan_type}` : 'Conta Gratuita'}
            </p>
          </div>

          {!hasActiveSubscription && (
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30 rounded-2xl p-8 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Desbloqueie o Poder Completo do SharpBook
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Você está usando a conta gratuita. Assine um plano para ativar o agendamento automático via WhatsApp e todas as funcionalidades.
                  </p>
                  <button
                    onClick={() => navigate('/dashboard/plans')}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Ver Planos
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Calendar}
              title="Agendamentos Hoje"
              value="0"
              locked={!hasActiveSubscription}
            />
            <StatCard
              icon={Users}
              title="Clientes Ativos"
              value="0"
              locked={!hasActiveSubscription}
            />
            <StatCard
              icon={MessageSquare}
              title="Mensagens WhatsApp"
              value="0"
              locked={!hasActiveSubscription}
            />
            <StatCard
              icon={TrendingUp}
              title="Taxa de Conversão"
              value="0%"
              locked={!hasActiveSubscription}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800">
                <h2 className="text-xl font-bold text-white mb-4">Próximos Agendamentos</h2>

                {!hasActiveSubscription ? (
                  <div className="text-center py-12">
                    <Lock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">
                      Assine um plano para ativar agendamentos automáticos
                    </p>
                    <button
                      onClick={() => navigate('/dashboard/plans')}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
                    >
                      Ver Planos
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">
                      Nenhum agendamento para hoje
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800">
                <h2 className="text-xl font-bold text-white mb-4">Ações Rápidas</h2>

                <div className="space-y-3">
                  <QuickActionButton
                    icon={MessageSquare}
                    title="Configurar WhatsApp"
                    locked={!hasActiveSubscription}
                    onClick={() => {}}
                  />
                  <QuickActionButton
                    icon={Users}
                    title="Adicionar Barbeiros"
                    locked={!hasActiveSubscription}
                    onClick={() => {}}
                  />
                  <QuickActionButton
                    icon={Calendar}
                    title="Configurar Horários"
                    locked={!hasActiveSubscription}
                    onClick={() => {}}
                  />
                </div>

                {hasActiveSubscription && subscription && (
                  <div className="mt-6 pt-6 border-t border-zinc-800">
                    <div className="text-sm text-gray-400 mb-2">Sua Assinatura</div>
                    <div className="text-white font-semibold mb-1">
                      Plano {subscription.plan_type.charAt(0).toUpperCase() + subscription.plan_type.slice(1)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Próxima cobrança: {new Date(subscription.expires_at).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, locked }: any) {
  return (
    <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-8 h-8 text-emerald-500" />
        {locked && <Lock className="w-4 h-4 text-gray-600" />}
      </div>
      <div className="text-3xl font-bold text-white mb-1">
        {locked ? '---' : value}
      </div>
      <div className="text-sm text-gray-400">{title}</div>
    </div>
  );
}

function QuickActionButton({ icon: Icon, title, locked, onClick }: any) {
  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
        locked
          ? 'bg-zinc-900 text-gray-600 cursor-not-allowed'
          : 'bg-zinc-900 text-white hover:bg-zinc-800'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1 text-left">{title}</span>
      {locked && <Lock className="w-4 h-4" />}
    </button>
  );
}
