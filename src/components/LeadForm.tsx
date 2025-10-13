import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      await fetch('https://kaiqueteste.app.n8n.cloud/webhook-test/7bae4e38-ec40-42cb-8f80-2e669811a998', {
        method: 'POST',
        body: formData
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="bg-gradient-to-r from-zinc-900 to-zinc-800 py-16 border-t border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Obrigado pelo interesse!
          </h2>
          <p className="text-gray-300 text-lg">
            Nossa equipe entrará em contato em breve para agendar sua demonstração gratuita.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-zinc-900 to-zinc-800 py-16 border-t border-zinc-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para ter uma Agenda Organizada pela IA?
          </h2>
          <p className="text-lg text-gray-300">
            Fale com um especialista e comece seu teste grátis agora!
          </p>
        </div>

        <form
          method="POST"
          action="https://kaiqueteste.app.n8n.cloud/webhook-test/7bae4e38-ec40-42cb-8f80-2e669811a998"
          onSubmit={handleSubmit}
          className="bg-zinc-950 rounded-2xl p-8 border border-zinc-800 shadow-2xl"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="barbershop_name" className="block text-sm font-medium text-gray-300 mb-2">
                Nome da Barbearia
              </label>
              <input
                type="text"
                id="barbershop_name"
                name="barbershop_name"
                required
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Ex: Barbearia Moderna"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone_whatsapp" className="block text-sm font-medium text-gray-300 mb-2">
                Telefone/WhatsApp
              </label>
              <input
                type="tel"
                id="phone_whatsapp"
                name="phone_whatsapp"
                required
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="(11) 99999-9999"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Enviando...' : 'Receber Demonstração Grátis'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
