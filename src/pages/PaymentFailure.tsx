import { XCircle } from 'lucide-react';
import { useNavigate } from '../hooks/useNavigate';

export default function PaymentFailure() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Pagamento Não Aprovado
        </h1>
        <p className="text-gray-400 mb-8">
          Houve um problema ao processar seu pagamento. Tente novamente ou escolha outra forma de pagamento.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/dashboard/plans')}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
          >
            Tentar Novamente
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-zinc-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-zinc-700 transition-all duration-300 border border-zinc-700"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
