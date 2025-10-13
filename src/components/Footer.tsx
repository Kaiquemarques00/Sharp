import { Scissors, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const links = {
    empresa: ['Sobre Nós', 'Carreiras', 'Blog', 'Contato'],
    solucao: ['WhatsApp Bot', 'Agendamentos', 'Lembretes', 'Analytics'],
    recursos: ['Documentação', 'API', 'Suporte', 'Status'],
    juridico: ['Privacidade', 'Termos', 'Cookies', 'LGPD']
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SharpBook</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Agendamento inteligente para barbearias modernas.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Empresa</h3>
            <ul className="space-y-2">
              {links.empresa.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Solução WhatsApp</h3>
            <ul className="space-y-2">
              {links.solucao.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Recursos</h3>
            <ul className="space-y-2">
              {links.recursos.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Jurídico</h3>
            <ul className="space-y-2">
              {links.juridico.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © Copyright SharpBook 2025 - Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors group"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors group"
              aria-label="Twitter/X"
            >
              <Twitter className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors group"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
