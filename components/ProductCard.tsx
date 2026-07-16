import React from 'react';
import { ShoppingBag, Eye } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  material: string;
  energy: string;
  length: string;
  image: string;
  sold: boolean;
  collection: 'with-charm' | 'without-charm';
}

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails, onAddToCart }: ProductCardProps) {
  return (
    <div className="group relative bg-brand-darker/60 border border-brand-border/40 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-brand-gold/40 hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.15)] flex flex-col h-full">
      {/* Image container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-darker/80">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${product.sold ? 'opacity-60 grayscale-[30%]' : ''}`}
        />
        
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-brand-darker/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={() => onViewDetails(product)}
            className="p-3 bg-brand-light/10 hover:bg-brand-gold text-brand-light hover:text-brand-dark rounded-full backdrop-blur-md transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
            title="Ver detalles"
          >
            <Eye size={20} />
          </button>
          {!product.sold && (
            <button 
              onClick={() => onAddToCart(product)}
              className="p-3 bg-brand-light/10 hover:bg-brand-gold text-brand-light hover:text-brand-dark rounded-full backdrop-blur-md transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 delay-75"
              title="Añadir al carrito"
            >
              <ShoppingBag size={20} />
            </button>
          )}
        </div>

        {/* Sold Badge */}
        {product.sold && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
            <span className="px-6 py-2.5 bg-brand-dark border-2 border-brand-gold/70 text-brand-gold font-display font-bold text-lg tracking-widest uppercase rounded shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              Vendido
            </span>
          </div>
        )}
        
        {/* Unique label */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
          <span className="px-3 py-1 bg-brand-dark/80 border border-brand-border/60 text-brand-sand text-[10px] uppercase tracking-widest rounded-full backdrop-blur-sm">
            Pieza Única
          </span>
          <span className="px-3 py-1 bg-brand-dark/85 border border-brand-gold/40 text-brand-gold text-[9px] uppercase tracking-widest rounded-full backdrop-blur-sm font-semibold shadow-sm">
            {product.collection === 'with-charm' ? 'Dos en Uno (Con Charm)' : 'Sin Charm'}
          </span>
        </div>
      </div>

      {/* Info container */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-display text-xl text-brand-light group-hover:text-brand-gold transition-colors duration-300 leading-tight">
            {product.name}
          </h3>
          <span className="font-serif text-lg text-brand-gold font-medium shrink-0">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-brand-light/60 text-sm font-sans font-light line-clamp-2 mb-6 leading-relaxed flex-grow">
          {product.description}
        </p>

        <div className="border-t border-brand-border/30 pt-4 flex gap-3 mt-auto">
          <button 
            onClick={() => onViewDetails(product)}
            className="flex-1 py-2.5 px-4 bg-transparent hover:bg-brand-light/5 border border-brand-border hover:border-brand-light/30 text-brand-light text-xs font-sans uppercase tracking-widest rounded-lg transition-all duration-300"
          >
            Detalles
          </button>
          
          {!product.sold ? (
            <button 
              onClick={() => onAddToCart(product)}
              className="flex-1 py-2.5 px-4 bg-brand-gold hover:bg-brand-goldlight text-brand-dark text-xs font-sans font-bold uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(212,175,55,0.2)] hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)]"
            >
              <ShoppingBag size={14} />
              Comprar
            </button>
          ) : (
            <button 
              disabled
              className="flex-1 py-2.5 px-4 bg-transparent border border-brand-border/20 text-brand-light/30 text-xs font-sans uppercase tracking-widest rounded-lg cursor-not-allowed"
            >
              No Disponible
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
