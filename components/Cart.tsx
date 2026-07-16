import React from 'react';
import { X, Trash2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Product } from './ProductCard';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  onRemoveFromCart: (id: string) => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, cartItems, onRemoveFromCart, onCheckout }: CartProps) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* Cart Panel */}
        <div className="w-screen max-w-md bg-brand-dark border-l border-brand-border/60 shadow-2xl flex flex-col justify-between animate-slide-left">
          
          {/* Header */}
          <div className="px-6 py-6 border-b border-brand-border/30 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <h2 className="font-display text-2xl text-brand-light">Tu Carrito</h2>
              <span className="text-xs font-sans text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-full border border-brand-gold/20">
                {cartItems.length} {cartItems.length === 1 ? 'pieza' : 'piezas'}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-brand-light/70 hover:text-brand-gold hover:bg-brand-light/5 rounded-full transition-all duration-300"
              aria-label="Cerrar carrito"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 bg-brand-light/5 border border-brand-border/40 rounded-full flex items-center justify-center mb-6 text-brand-light/35">
                  <X size={28} />
                </div>
                <h3 className="font-display text-xl text-brand-light mb-2">Tu carrito está vacío</h3>
                <p className="text-sm font-sans font-light text-brand-light/50 max-w-xs leading-relaxed">
                  Explora la colección "Cree en Tí" y descubre la pieza única que vibra contigo.
                </p>
                <button 
                  onClick={onClose}
                  className="mt-6 py-3 px-6 bg-transparent hover:bg-brand-light/5 border border-brand-border hover:border-brand-light/30 text-brand-light text-xs font-sans uppercase tracking-widest rounded-lg transition-all duration-300"
                >
                  Continuar Explorando
                </button>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                {cartItems.map((item) => (
                  <div 
                    key={item.id}
                    className="flex gap-4 p-3 bg-brand-darker/40 border border-brand-border/25 rounded-xl transition-all duration-300 hover:border-brand-gold/20"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-brand-darker">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-display text-base text-brand-light leading-tight line-clamp-1">
                            {item.name}
                          </h4>
                          <span className="font-serif text-sm font-medium text-brand-gold shrink-0">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-[10px] text-brand-light/40 uppercase tracking-widest mt-1">
                          Pieza única • {item.length}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-end mt-2">
                        <span className="text-[10px] text-brand-sand bg-brand-light/5 border border-brand-border/30 px-2 py-0.5 rounded italic">
                          Hecho a mano
                        </span>
                        
                        <button 
                          onClick={() => onRemoveFromCart(item.id)}
                          className="text-brand-light/40 hover:text-red-400 p-1.5 hover:bg-red-500/10 rounded transition-all duration-200"
                          title="Eliminar del carrito"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer / Summary */}
          {cartItems.length > 0 && (
            <div className="px-6 py-6 border-t border-brand-border/30 bg-brand-darker/60 backdrop-blur-sm">
              <div className="space-y-3 mb-6 text-sm font-sans font-light">
                <div className="flex justify-between text-brand-light/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-brand-light/70">
                  <span>Envío (Puerto Rico / EE.UU.)</span>
                  <span className="text-brand-gold uppercase tracking-wider text-xs font-bold">Gratis</span>
                </div>
                <div className="border-t border-brand-border/20 pt-3 flex justify-between text-brand-light font-display text-lg">
                  <span>Total</span>
                  <span className="text-brand-gold font-serif">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={onCheckout}
                  className="w-full py-4 px-6 bg-brand-gold hover:bg-brand-goldlight text-brand-dark font-sans font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.4)] active:scale-[0.98]"
                >
                  Proceder al Pago
                  <ArrowRight size={16} />
                </button>
                
                <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-brand-light/40 text-center">
                  <ShieldCheck size={12} className="text-brand-gold/60" /> Transacción Segura & Encriptada
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
