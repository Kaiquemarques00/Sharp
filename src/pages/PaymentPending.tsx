import { Clock } from 'lucide-react';
import { useNavigate } from '../hooks/useNavigate';

export default function PaymentPending() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10 text-yellow-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Pagamento Pendente
        </h1>
        <p className="text-gray-400 mb-8">
          Seu pagamento está sendo processado. Você receberá um e-mail assim que for confirmado.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
        >
          Ir para o Dashboard
        </button>
      </div>
    </div>
  );
}
