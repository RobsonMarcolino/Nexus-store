import { FaGamepad, FaTwitter, FaDiscord, FaInstagram, FaTwitch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative bg-black pt-20 pb-10 border-t border-white/5 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

            {/* Mascot Character - Peeking from Bottom Right */}
            <div className="absolute bottom-0 right-[-5%] lg:right-10 z-0 pointer-events-none opacity-40 lg:opacity-100 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700">
                <img
                    src={new URL('../features/JOGOS2.png', import.meta.url).href}
                    alt="Nexus Mascot"
                    className="w-[200px] md:w-[300px] lg:w-[400px] h-auto object-contain mask-image-gradient-to-t"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div>
                        <Link to="/" className="flex items-center mb-6 hover:opacity-80 transition-opacity">
                            <FaGamepad className="text-brand-neon text-3xl mr-3" />
                            <span className="font-display font-bold text-3xl text-white tracking-wider">NEXUS</span>
                        </Link>
                        <p className="text-gray-500 mb-6 leading-relaxed">
                            A performance extrema encontra o design definitivo. Equipamentos de elite para gamers que não aceitam perder.
                        </p>
                        <div className="flex gap-4">
                            {[FaTwitter, FaDiscord, FaInstagram, FaTwitch].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-neon hover:text-black transition-all hover:-translate-y-1">
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-brand-neon pl-3 uppercase">Loja</h4>
                        <ul className="space-y-3 text-gray-400">
                            {['Lançamentos', 'Hardware', 'Periféricos', 'Acessórios', 'Ofertas'].map(item => (
                                <li key={item}><a href="#" className="hover:text-brand-neon transition-colors">➞ {item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-brand-purple pl-3 uppercase">Suporte</h4>
                        <ul className="space-y-3 text-gray-400">
                            {['Central de Ajuda', 'Trocas e Devoluções', 'Garantia', 'Rastreio', 'Fale Conosco'].map(item => (
                                <li key={item}><a href="#" className="hover:text-brand-neon transition-colors">➞ {item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-brand-neon pl-3 uppercase">Newsletter</h4>
                        <p className="text-gray-500 mb-4 text-sm">Receba ofertas exclusivas e novidades.</p>
                        <div className="flex">
                            <input type="email" placeholder="Seu e-mail" className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-l focus:outline-none focus:border-brand-neon w-full" />
                            <button className="bg-brand-neon text-black px-4 py-2 rounded-r font-bold hover:bg-white transition-colors">
                                OK
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center bg-black/50 p-6 rounded-lg backdrop-blur-sm">
                    <p className="text-gray-600 text-sm">
                        &copy; 2024 Nexus Gaming Store. Todos os direitos reservados.
                    </p>
                    <div className="flex gap-4 mt-4 md:mt-0 text-sm font-bold text-gray-600">
                        <span>Política de Privacidade</span>
                        <span>Termos de Uso</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
