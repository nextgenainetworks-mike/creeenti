import React from 'react';
import { X, ShoppingBag, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { Product } from './ProductCard';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-brand-dark border border-brand-border/60 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row overflow-hidden animate-zoom-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 bg-brand-dark/80 border border-brand-border/40 hover:border-brand-gold hover:text-brand-gold text-brand-light rounded-full backdrop-blur-md transition-all duration-300"
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        {/* Image Column */}
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-inherit relative bg-brand-darker/60 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {product.sold && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
              <span className="px-8 py-3 bg-brand-dark border-2 border-brand-gold text-brand-gold font-display font-bold text-xl tracking-widest uppercase rounded shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                Vendido
              </span>
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
                Colección Cree en Tí
              </span>
              <span className="text-[10px] uppercase tracking-widest text-brand-sand border border-brand-border/60 px-3 py-1 rounded-full">
                Pieza Única
              </span>
              <span className="text-[10px] uppercase tracking-widest text-brand-gold/80 border border-brand-gold/30 px-3 py-1 rounded-full bg-brand-gold/5 font-semibold">
                {product.collection === 'with-charm' ? 'Dos en Uno (Con Charm)' : 'Sin Charm'}
              </span>
            </div>
            
            <h2 className="font-display text-3xl text-brand-light mb-2 leading-tight">
              {product.name}
            </h2>
            
            <div className="font-serif text-2xl text-brand-gold font-medium mb-6">
              ${product.price.toFixed(2)}
            </div>

            <div className="space-y-6 text-brand-light/75 font-sans font-light text-sm leading-relaxed">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-brand-sand font-medium mb-1.5 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-brand-gold" />
                  Significado de Fe
                </h4>
                <p className="bg-brand-light/5 border border-brand-border/20 rounded-xl p-4 text-brand-sand/90 italic font-serif text-base leading-normal">
                  "{product.energy}"
                </p>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-brand-light/50 font-medium mb-1">Descripción</h4>
                <p className="font-light">{product.description}</p>
              </div>

              {product.collection === 'with-charm' ? (
                <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-xl p-3.5 flex items-start gap-2.5">
                  <Sparkles size={16} className="text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-0.5">Diseño Dos en Uno (Con Charm)</h5>
                    <p className="text-xs text-brand-sand/80 font-light leading-relaxed">
                      Esta pieza incluye un dije (charm) removible. Puedes usar el collar con el dije para un look destacado y simbólico, o retirar el dije del aro dorado para lucirlo como un collar de cuentas clásico y minimalista.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-brand-light/5 border border-brand-border/25 rounded-xl p-3.5 flex items-start gap-2.5">
                  <ShieldCheck size={16} className="text-brand-gold/60 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-brand-light/80 uppercase tracking-wider mb-0.5">Colección Sin Charm</h5>
                    <p className="text-xs text-brand-light/65 font-light leading-relaxed">
                      Un diseño continuo que resalta la belleza natural, textura y equilibrio geométrico de las cuentas seleccionadas. Ideal para un estilo sobrio, elegante y diario.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 border-t border-b border-brand-border/30 py-4 my-2">
                <div>
                  <h5 className="text-[10px] uppercase tracking-widest text-brand-light/50 font-medium mb-0.5">Materiales</h5>
                  <p className="text-xs text-brand-light/95 font-medium">{product.material}</p>
                </div>
                <div>
                  <h5 className="text-[10px] uppercase tracking-widest text-brand-light/50 font-medium mb-0.5">Medida</h5>
                  <p className="text-xs text-brand-light/95 font-medium">{product.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {!product.sold ? (
              <button 
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full py-4 px-6 bg-brand-gold hover:bg-brand-goldlight text-brand-dark font-sans font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.5)] active:scale-[0.98]"
              >
                <ShoppingBag size={18} />
                Agregar al Carrito
              </button>
            ) : (
              <div className="w-full py-4 px-6 bg-transparent border border-brand-border/40 text-brand-light/30 font-sans font-bold uppercase tracking-widest rounded-xl text-center cursor-not-allowed">
                Pieza no disponible
              </div>
            )}
            
            <div className="flex items-center justify-center gap-6 text-[10px] uppercase tracking-wider text-brand-light/40">
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-brand-gold/60" /> Envío Asegurado
              </span>
              <span className="flex items-center gap-1">
                <Heart size={12} className="text-brand-gold/60" /> Hecho a Mano
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
