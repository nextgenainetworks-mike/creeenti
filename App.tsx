import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Shield, RefreshCw, CheckCircle, Heart, Star } from 'lucide-react';
import ProductCard, { Product } from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import Notification, { NotificationType } from './components/Notification';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'rocio-gracia',
    name: 'Rocío de Gracia',
    price: 46.00,
    description: 'Delicado collar de cordón de seda rosa brillante con un hermoso dije artesanal de pez en cerámica esmaltada color rosa y verde. Un diseño suave y elegante.',
    material: 'Cordón de seda rosa trenzado y dije de pez de cerámica esmaltada',
    energy: 'Inspirado en la dulzura y delicadeza del amor del Creador. Un recordatorio diario de gracia, paz y afecto sincero en tu caminar.',
    length: '45 cm + dije',
    image: '/assets/collar-1.jpg',
    sold: false,
    collection: 'with-charm'
  },
  {
    id: 'bajo-el-mar',
    name: 'Bajo el Mar',
    price: 48.00,
    description: 'Llamativo collar de cuentas de resina craquelada en tonos azul cielo con un gran dije metálico de esqueleto de pez bañado en oro colgando del aro frontal.',
    material: 'Cuentas craqueladas azules, espaciadores verdes y dije de pez de latón bañado en oro',
    energy: 'Nos recuerda que aun en los tiempos difíciles (representados por el esqueleto), Dios tiene el control y restaura la vida y la abundancia con Su poder.',
    length: '46 cm + dije',
    image: '/assets/collar-2.jpg',
    sold: false,
    collection: 'with-charm'
  },
  {
    id: 'sendero-paz',
    name: 'Sendero de Paz',
    price: 44.00,
    description: 'Collar continuo de grandes cuentas negras pulidas de brillo intenso con espaciadores dorados y elegantes eslabones de cadena dorados en los laterales.',
    material: 'Cuentas de vidrio negro esmaltado y eslabones de latón dorado',
    energy: 'Representa la firmeza y la elegancia que provienen de caminar en rectitud y justicia. Un diseño de fuerza sobria y fe inquebrantable.',
    length: '46 cm',
    image: '/assets/collar-3.jpg',
    sold: false,
    collection: 'without-charm'
  },
  {
    id: 'sendero-verde',
    name: 'Sendero Verde',
    price: 45.00,
    description: 'Collar de cordón de seda verde esmeralda trenzado con un delicado dije de pez de cerámica en tonos verde pastel y azul. Dije desmontable.',
    material: 'Cordón trenzado verde de seda y dije de pez de cerámica',
    energy: 'Evoca los campos verdes y prados tranquilos del Salmo 23. Un símbolo de restauración, frescura de espíritu y nuevos comienzos bajo el cuidado del Pastor.',
    length: '45 cm + dije',
    image: '/assets/collar-4.jpg',
    sold: false,
    collection: 'with-charm'
  },
  {
    id: 'manantial-vida',
    name: 'Manantial de Vida',
    price: 49.00,
    description: 'Alegre collar de cuentas blancas pulidas con espaciadores en tonos neón naranja y verde, y un dije de pez plano de latón pulido dorado en el centro.',
    material: 'Cuentas acrílicas blancas, espaciadores de cuentas semilla y pez de latón',
    energy: 'La pureza de las cuentas blancas nos recuerda la redención y limpieza del alma, mientras el pez dorado proclama la alegría vibrante de la fe.',
    length: '45 cm + dije',
    image: '/assets/collar-5.jpg',
    sold: false,
    collection: 'with-charm'
  },
  {
    id: 'sol-otono',
    name: 'Sol de Otoño',
    price: 45.00,
    description: 'Collar artesanal continuo elaborado con cuentas redondas de vidrio en un tono amarillo mostaza opaco, complementado con sutiles cuentas espaciadoras en azul celeste.',
    material: 'Cuentas de vidrio pulido opaco y espaciadores celestes',
    energy: 'Inspirado en el gozo y la alegría de la luz que el Creador nos regala cada mañana. Un recordatorio para vivir con gratitud y reflejar esperanza en cada paso del camino.',
    length: '45 cm',
    image: '/assets/collar-6.jpg',
    sold: false,
    collection: 'without-charm'
  },
  {
    id: 'bruma-estelar',
    name: 'Bruma Estelar',
    price: 48.00,
    description: 'Elegante collar continuo de cuentas iridiscentes con un acabado de brillo boreal único que destella tonos azules, violetas y verdes según la luz.',
    material: 'Cuentas iridiscentes con recubrimiento boreal y cierre reforzado',
    energy: 'Evoca la paz profunda de Dios que sobrepasa todo entendimiento. Un símbolo de serenidad, fe inquebrantable y confianza en Sus promesas de gracia.',
    length: '46 cm',
    image: '/assets/collar-7.jpg',
    sold: false,
    collection: 'without-charm'
  },
  {
    id: 'perla-del-bosque',
    name: 'Perla del Bosque',
    price: 55.00,
    description: 'Exclusiva combinación de cuentas de jaspe verde jaspeado con anillos espaciadores dorados y una magnífica perla barroca de agua dulce en el centro.',
    material: 'Cuentas de piedra natural Jaspe Verde, anillos de latón dorado y perla barroca cultivada',
    energy: 'La perla en el centro nos recuerda la verdad bíblica de que somos de incalculable valor y de una belleza singular ante los ojos de Dios. Un símbolo de gracia y propósito.',
    length: '44 cm',
    image: '/assets/collar-8.jpg',
    sold: false,
    collection: 'without-charm'
  },
  {
    id: 'marea-serena',
    name: 'Marea Serena',
    price: 50.00,
    description: 'Hermosa pieza de cuentas en tono crema suave combinadas con espaciadores celestes y un colgante en forma de pez esmaltado en azul y dorado, sostenido por un aro de oro.',
    material: 'Cuentas de resina pulida, dije de pez esmaltado y aro bañado en oro',
    energy: 'Inspirado en la abundancia de la pesca milagrosa y el valor de caminar con fe sobre las aguas. Representa la guía constante del Creador en tiempos de cambio.',
    length: '48 cm + 5 cm de colgante',
    image: '/assets/collar-9.jpg',
    sold: false,
    collection: 'with-charm'
  },
  {
    id: 'canto-coral',
    name: 'Canto de Coral',
    price: 52.00,
    description: 'Vibrante collar de cuentas rojas con espaciadores rosa pálido y un elegante colgante de pez plano con acabado dorado brillante. Dije desmontable.',
    material: 'Cuentas de coral reconstituido, espaciadores de vidrio rosa y dije de pez de latón pulido',
    energy: 'El color rojo simboliza la pasión por la vida y el pez (Icthus) representa el símbolo histórico de la fe. Un de recordatorio de fortaleza espiritual, valentía y testimonio.',
    length: '47 cm + 6 cm de colgante',
    image: '/assets/collar-10.jpg',
    sold: false,
    collection: 'with-charm'
  },
  {
    id: 'pesca-galilea',
    name: 'Pesca de Galilea',
    price: 53.00,
    description: 'Collar de cordón de seda azul turquesa trenzado con un hermoso dije artesanal de pez de cerámica en color ocre y marrón. Dije desmontable.',
    material: 'Cordón de seda turquesa y pez de cerámica esmaltada',
    energy: 'Evoca la tranquilidad del mar de Galilea y el llamado a caminar con confianza sobre las aguas. Un recordatorio de propósito, paz y vocación divina.',
    length: '47 cm + dije',
    image: '/assets/collar-11.jpg',
    sold: false,
    collection: 'with-charm'
  },
  {
    id: 'estrella-mar',
    name: 'Estrella del Mar',
    price: 51.00,
    description: 'Llamativo collar de cuentas redondas verdes mate con un gran dije de estrella de mar dorada texturizada colgando del aro frontal. Dije removible.',
    material: 'Cuentas de resina verde mate y dije de estrella de mar bañado en oro',
    energy: 'La estrella representa la luz que guía en medio de la noche. Un hermoso recordatorio de que Dios es nuestra guía constante y brújula divina.',
    length: '46 cm + dije',
    image: '/assets/collar-12.jpg',
    sold: false,
    collection: 'with-charm'
  },
  {
    id: 'luz-del-alma',
    name: 'Luz del Alma',
    price: 47.00,
    description: 'Collar de cordón de seda amarillo mostaza brillante con un dije de pez de cerámica azul y amarillo de acabado rústico.',
    material: 'Cordón mostaza y pez de cerámica',
    energy: 'Combina el brillo del sol con la frescura del mar. Simboliza el gozo del corazón agradecido y la alegría de caminar en obediencia y paz.',
    length: '47 cm + dije',
    image: '/assets/collar-13.jpg',
    sold: false,
    collection: 'with-charm'
  },
  {
    id: 'promesa-alba',
    name: 'Promesa del Alba',
    price: 51.00,
    description: 'Preciosa combinación de cuentas iridiscentes color rosa durazno de brillo boreal con un dije de sol dorado con rayos detallados. Dije removible.',
    material: 'Cuentas acrílicas rosadas iridiscentes y dije de sol de latón dorado',
    energy: 'Simboliza la promesa del nuevo amanecer de Dios para tu vida. Una representación de nuevos comienzos, alegría y luz inextinguible.',
    length: '46 cm + dije',
    image: '/assets/collar-14.jpg',
    sold: false,
    collection: 'with-charm'
  },
  {
    id: 'rosa-saron',
    name: 'Rosa de Sarón',
    price: 58.00,
    description: 'Collar continuo de cuentas color fucsia intenso y vibrante con una gran perla de río blanca asimétrica en el centro. Diseño continuo de alta costura.',
    material: 'Cuentas acrílicas fucsia pulidas y perla barroca natural',
    energy: 'Inspirado en la belleza y el valor de la Rosa de Sarón. La perla central resalta la pureza y el resplandor singular de un corazón transformado por la gracia.',
    length: '46 cm',
    image: '/assets/collar-15.jpg',
    sold: false,
    collection: 'without-charm'
  },
  {
    id: 'corona-gozo',
    name: 'Corona de Gozo',
    price: 60.00,
    description: 'Collar continuo que combina cuentas amarillas de acabado brillante con tres cuentas de tamaño mayor en amarillo mostaza mate en el centro.',
    material: 'Cuentas de resina brillante y mate amarillas con espaciadores celestes',
    energy: 'El amarillo evoca la corona de gozo y la fuerza que el Creador pone en nuestro corazón. Un recordatorio diario de gratitud y regocijo espiritual.',
    length: '45 cm',
    image: '/assets/collar-16.jpg',
    sold: false,
    collection: 'without-charm'
  },
  {
    id: 'amor-celestial',
    name: 'Amor Celestial',
    price: 50.00,
    description: 'Collar de cuentas planas ovaladas en color magenta con espaciadores dorados y un gran dije de corazón dorado silueteado. Dije removible.',
    material: 'Cuentas planas magenta y dije de corazón de latón dorado',
    energy: 'El corazón representa el amor incondicional y eterno que llena nuestras vidas de propósito. Un símbolo de compasión y fe viva.',
    length: '48 cm + 4 cm de dije',
    image: '/assets/collar-17.jpg',
    sold: false,
    collection: 'with-charm'
  },
  {
    id: 'ancla-del-alma',
    name: 'Ancla del Alma',
    price: 45.00,
    description: 'Collar de cuentas negras mate con espaciadores celestes brillantes y un dije de cangrejo dorado con detalles texturizados. Dije desmontable.',
    material: 'Cuentas de resina negra mate, cuentas semilla celestes y dije de cangrejo bañado en oro',
    energy: 'Representa la firmeza y constancia de caminar firmes en la arena de la fe. Un recordatorio de perseverancia y protección divina.',
    length: '47 cm + dije',
    image: '/assets/collar-18.jpg',
    sold: false,
    collection: 'with-charm'
  },
  {
    id: 'pacto-eterno',
    name: 'Pacto Eterno',
    price: 56.00,
    description: 'Elegante collar de cuentas color verde brillante esmeralda con un aro grande dorado en forma de C gruesa colgante. Dije removible.',
    material: 'Cuentas acrílicas verde brillante y dije de aro de latón grueso dorado',
    energy: 'El verde representa la vida abundante y el círculo dorado simboliza la alianza eterna y fidelidad de Dios que nunca termina.',
    length: '47 cm + dije',
    image: '/assets/collar-19.jpg',
    sold: false,
    collection: 'with-charm'
  },
  {
    id: 'cielo-nuevo',
    name: 'Cielo Nuevo',
    price: 50.00,
    description: 'Collar de cuentas de resina azul iridiscente con espaciadores rosa pálido y un gran dije de flor de cinco pétalos dorados con una pequeña perla colgando. Dije desmontable.',
    material: 'Cuentas iridiscentes azules, perla de río y flor de latón dorado',
    energy: 'Simboliza la belleza de la creación que florece en la gracia divina. Un recordatorio de pureza, crecimiento y bendición floreciente.',
    length: '48 cm + dije',
    image: '/assets/collar-20.jpg',
    sold: false,
    collection: 'with-charm'
  }
];

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: NotificationType } | null>(null);
  
  // Tab filtering state
  const [selectedCollection, setSelectedCollection] = useState<'all' | 'with-charm' | 'without-charm'>('all');

  // Load sold products & cart from localStorage on mount
  useEffect(() => {
    const soldIds = JSON.parse(localStorage.getItem('cree_en_ti_sold_products') || '[]');
    setProducts(prev => 
      prev.map(p => soldIds.includes(p.id) ? { ...p, sold: true } : p)
    );

    const savedCart = JSON.parse(localStorage.getItem('cree_en_ti_cart') || '[]');
    // Filter out items that are sold out in the meantime
    const activeCart = savedCart.filter((item: Product) => !soldIds.includes(item.id));
    setCart(activeCart);
    localStorage.setItem('cree_en_ti_cart', JSON.stringify(activeCart));
  }, []);

  const triggerNotification = (message: string, type: NotificationType = 'success') => {
    setNotification({ message, type });
  };

  const handleAddToCart = (product: Product) => {
    if (product.sold) {
      triggerNotification('Esta pieza ya ha sido vendida.', 'warning');
      return;
    }

    if (cart.some(item => item.id === product.id)) {
      triggerNotification('Esta pieza única ya está en tu carrito.', 'info');
      return;
    }

    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem('cree_en_ti_cart', JSON.stringify(newCart));
    triggerNotification(`"${product.name}" agregado al carrito.`);
  };

  const handleRemoveFromCart = (id: string) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem('cree_en_ti_cart', JSON.stringify(newCart));
    triggerNotification('Artículo removido del carrito.', 'info');
  };

  const handlePurchaseSuccess = (purchasedItemIds: string[]) => {
    // Mark items as sold
    const updatedSoldIds = [...JSON.parse(localStorage.getItem('cree_en_ti_sold_products') || '[]'), ...purchasedItemIds];
    localStorage.setItem('cree_en_ti_sold_products', JSON.stringify(updatedSoldIds));

    // Update products state
    setProducts(prev => 
      prev.map(p => purchasedItemIds.includes(p.id) ? { ...p, sold: true } : p)
    );

    // Clear purchase items from cart
    const newCart = cart.filter(item => !purchasedItemIds.includes(item.id));
    setCart(newCart);
    localStorage.setItem('cree_en_ti_cart', JSON.stringify(newCart));

    triggerNotification('¡Gracias por tu compra! Tu orden ha sido procesada.', 'success');
  };

  const handleResetBoutique = () => {
    localStorage.removeItem('cree_en_ti_sold_products');
    localStorage.removeItem('cree_en_ti_cart');
    setProducts(INITIAL_PRODUCTS);
    setCart([]);
    triggerNotification('Boutique restablecida. Todo el inventario disponible de nuevo.', 'info');
  };

  // Filter products based on selected tab
  const filteredProducts = products.filter(product => {
    if (selectedCollection === 'all') return true;
    return product.collection === selectedCollection;
  });

  return (
    <div className="min-h-screen bg-brand-dark text-brand-light flex flex-col font-sans relative overflow-x-hidden selection:bg-brand-gold selection:text-brand-dark">
      {/* Background radial glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-brand-gold/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[150px]" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-brand-dark/85 backdrop-blur-md border-b border-brand-border/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Elegant SVG Tulip Logo */}
            <svg 
              viewBox="0 0 24 24" 
              className="w-7 h-7 text-brand-gold shrink-0" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 17c-3-1-5-4.5-5-8.5c0-1.5 1.5-2.5 3-1c1 1 1.5.5 2-2.5" />
              <path d="M12 17c3-1 5-4.5 5-8.5c0-1.5-1.5-2.5-3-1c-1 1-1.5.5-2-2.5" />
              <path d="M12 17V5.5" />
              <path d="M12 17v5" />
              <path d="M12 19.5c-2.5-0.5-4-2.5-4.5-4" />
            </svg>
            <div className="flex flex-col items-start leading-none">
              <span className="font-display text-2xl tracking-widest text-brand-gold font-bold">CREE EN TÍ</span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-brand-sand font-semibold mt-1">Uno de 1</span>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <button 
              onClick={handleResetBoutique}
              className="text-xs uppercase tracking-widest text-brand-light/40 hover:text-brand-gold flex items-center gap-1.5 transition-colors duration-300 font-sans"
              title="Restaurar inventario de prueba"
            >
              <RefreshCw size={12} />
              <span className="hidden sm:inline">Reiniciar Tienda</span>
            </button>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-brand-light/5 hover:bg-brand-gold/15 border border-brand-border/40 hover:border-brand-gold/50 rounded-full transition-all duration-300 group"
              aria-label="Abrir carrito"
            >
              <ShoppingBag size={18} className="text-brand-light group-hover:text-brand-gold transition-colors duration-300" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-brand-dark text-[10px] font-bold w-5 h-5 rounded-full border-2 border-brand-dark flex items-center justify-center animate-pulse">
                  {cart.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 py-16 md:py-24 text-center max-w-4xl mx-auto px-6">
        <h1 className="font-display tracking-wide mb-8 leading-none flex flex-col gap-4">
          <span className="text-5xl md:text-7xl lg:text-8xl text-brand-light uppercase">"Cree en Tí"</span>
          <span className="font-serif italic text-brand-gold font-normal text-2xl md:text-3xl lg:text-4xl tracking-widest mt-2 block">Uno de 1</span>
        </h1>
        
        <p className="font-serif text-lg md:text-xl font-light text-brand-sand/90 max-w-2xl mx-auto mb-8 leading-relaxed italic">
          "Cada collar de esta colección ha sido creado a mano como una pieza única e irrepetible. Diseñado con elementos de la creación para inspirar fe, paz y recordar el valor incalculable que posees. Una pieza, un alma."
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-widest text-brand-light/45">
          <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-brand-gold/70" /> 100% Piezas Únicas</span>
          <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-brand-gold/70" /> Elaboración con Propósito</span>
          <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-brand-gold/70" /> Envío Gratuito en PR / EE.UU.</span>
        </div>
      </section>

      {/* TABS / FILTERS */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-10 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-brand-border/20 pb-4 gap-4">
          
          {/* Collection Tab Buttons */}
          <div className="flex items-center bg-brand-darker/60 p-1.5 rounded-xl border border-brand-border/40 backdrop-blur-sm self-start">
            <button 
              onClick={() => setSelectedCollection('all')}
              className={`px-4 py-2 text-xs font-sans uppercase tracking-wider rounded-lg transition-all duration-300 ${selectedCollection === 'all' ? 'bg-brand-gold text-brand-dark font-bold shadow-md' : 'text-brand-light/60 hover:text-brand-light'}`}
            >
              Todas las Piezas
            </button>
            <button 
              onClick={() => setSelectedCollection('with-charm')}
              className={`px-4 py-2 text-xs font-sans uppercase tracking-wider rounded-lg transition-all duration-300 ${selectedCollection === 'with-charm' ? 'bg-brand-gold text-brand-dark font-bold shadow-md' : 'text-brand-light/60 hover:text-brand-light'}`}
            >
              Con Charms (Dos en Uno)
            </button>
            <button 
              onClick={() => setSelectedCollection('without-charm')}
              className={`px-4 py-2 text-xs font-sans uppercase tracking-wider rounded-lg transition-all duration-300 ${selectedCollection === 'without-charm' ? 'bg-brand-gold text-brand-dark font-bold shadow-md' : 'text-brand-light/60 hover:text-brand-light'}`}
            >
              Sin Charms
            </button>
          </div>

          <div className="text-xs text-brand-light/40 self-end sm:self-center">
            Mostrando {filteredProducts.length} de {products.length} collares únicos
          </div>
        </div>

        {/* Collection descriptions banner (conditional) */}
        {selectedCollection === 'with-charm' && (
          <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-2xl p-5 mb-8 animate-fade-in flex items-start gap-3">
            <Star className="text-brand-gold shrink-0 mt-0.5" size={16} />
            <div>
              <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-1">Colección con Charms (Diseño Dos en Uno)</h4>
              <p className="text-xs text-brand-sand/80 leading-relaxed font-light">
                Estas piezas exclusivas cuentan con un diseño versátil. El aro dorado de cada collar sostiene un hermoso dije (charm) removible, permitiéndote usarlo completo para un estilo audaz y lleno de simbolismo, o retirar el dije y lucir un elegante collar continuo de cuentas.
              </p>
            </div>
          </div>
        )}
        {selectedCollection === 'without-charm' && (
          <div className="bg-brand-light/5 border border-brand-border/25 rounded-2xl p-5 mb-8 animate-fade-in flex items-start gap-3">
            <Heart className="text-brand-gold/60 shrink-0 mt-0.5" size={16} />
            <div>
              <h4 className="text-xs font-bold text-brand-light/80 uppercase tracking-wider mb-1">Colección Sin Charms (Diseño Clásico)</h4>
              <p className="text-xs text-brand-light/50 leading-relaxed font-light">
                Collares diseñados en una línea clásica y continua, ideales para quienes prefieren la sobriedad geométrica y destacar la belleza natural y pureza de las cuentas seleccionadas. Perfectos para el día a día.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* PRODUCTS GRID */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-24 flex-grow w-full">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-brand-darker/20 border border-brand-border/20 rounded-3xl p-8">
            <p className="text-brand-light/40 text-sm font-light">No hay collares disponibles en esta colección en este momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                onViewDetails={setSelectedProduct}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>

      {/* FEATURES / TRUST SECTION */}
      <section className="relative z-10 bg-brand-darker/50 border-t border-b border-brand-border/30 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-brand-gold/5 flex items-center justify-center text-brand-gold">
              <Sparkles size={20} />
            </div>
            <h4 className="font-display text-base uppercase tracking-widest text-brand-light">Mensajes de Fe</h4>
            <p className="text-xs font-sans font-light text-brand-sand/70 max-w-xs mx-auto leading-relaxed">
              Cada collar está acompañado de un significado basado en la fe, la esperanza y el amor, brindándote un recordatorio diario de tu propósito.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-brand-gold/5 flex items-center justify-center text-brand-gold">
              <Shield size={20} />
            </div>
            <h4 className="font-display text-base uppercase tracking-widest text-brand-light">Compra Confiable</h4>
            <p className="text-xs font-sans font-light text-brand-sand/70 max-w-xs mx-auto leading-relaxed">
              Procesa tu pedido de forma segura mediante la conveniencia de **ATH Móvil** o con el respaldo mundial de **PayPal**.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-brand-gold/5 flex items-center justify-center text-brand-gold">
              <CheckCircle size={20} />
            </div>
            <h4 className="font-display text-base uppercase tracking-widest text-brand-light">Certificado Uno de 1</h4>
            <p className="text-xs font-sans font-light text-brand-sand/70 max-w-xs mx-auto leading-relaxed">
              Cada collar es único en el mundo. Recibirás un certificado de autenticidad impreso que constata que posees la única pieza existente.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-brand-darker border-t border-brand-border/20 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-brand-light/40">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <span className="font-display text-base tracking-widest text-brand-gold font-bold">CREE EN TÍ</span>
            <span>© 2026 Cree en Tí Jewelry. Todos los derechos reservados.</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-brand-light/5 border border-brand-border/30 rounded text-[9px] uppercase tracking-wider font-semibold">
              ATH Móvil disponible
            </span>
            <span className="px-3 py-1 bg-brand-light/5 border border-brand-border/30 rounded text-[9px] uppercase tracking-wider font-semibold">
              PayPal disponible
            </span>
          </div>

          <div className="text-center md:text-right font-light text-[10px] text-brand-sand/40">
            "Uno de 1" — Creado con propósito para reflejar tu valor.
          </div>
        </div>
      </footer>

      {/* MODALS & DRAWERS */}
      <ProductDetailModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onPurchaseSuccess={handlePurchaseSuccess}
      />

      {/* TOAST NOTIFICATION */}
      {notification && (
        <Notification 
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
