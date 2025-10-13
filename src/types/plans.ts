export type PlanType = 'essencial' | 'profissional' | 'premium';
export type BillingCycle = 'mensal' | 'anual';

export interface Plan {
  id: PlanType;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  barbers: string;
  appointments: string;
  features: string[];
  highlighted?: boolean;
}

export const plans: Plan[] = [
  {
    id: 'essencial',
    name: 'PLANO ESSENCIAL',
    monthlyPrice: 99,
    annualPrice: 999,
    barbers: '1 Barbeiro',
    appointments: '500 Agendamentos',
    features: [
      'Agendamento I.A.',
      'Lembretes Automáticos',
      'WhatsApp Integrado'
    ]
  },
  {
    id: 'profissional',
    name: 'PLANO PROFISSIONAL',
    monthlyPrice: 149,
    annualPrice: 1490,
    barbers: '5 Barbeiros',
    appointments: '2.000 Agendamentos',
    features: [
      'Tudo do Essencial',
      'CRM Completo',
      'Analytics Avançado',
      'Suporte Prioritário'
    ],
    highlighted: true
  },
  {
    id: 'premium',
    name: 'PLANO PREMIUM',
    monthlyPrice: 299,
    annualPrice: 2990,
    barbers: 'Barbeiros Ilimitados',
    appointments: 'Agendamentos Ilimitados',
    features: [
      'Tudo do Profissional',
      'Multi-Unidades',
      'Suporte VIP 24/7',
      'API Customizada'
    ]
  }
];
