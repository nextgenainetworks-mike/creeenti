import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, ChevronRight, Phone, CheckCircle2, QrCode, AlertCircle, Loader } from 'lucide-react';
import { Product } from './ProductCard';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  onPurchaseSuccess: (purchasedItemIds: string[]) => void;
}

type PaymentMethod = 'athmovil' | 'paypal';
type CheckoutStep = 'form' | 'ath_processing' | 'ath_success' | 'paypal_window' | 'paypal_success';

export default function CheckoutModal({ isOpen, onClose, cartItems, onPurchaseSuccess }: CheckoutModalProps) {
  const [method, setMethod] = useState<PaymentMethod>('athmovil');
  const [step, setStep] = useState<CheckoutStep>('form');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  
  // PayPal simulator states
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paypalPassword, setPaypalPassword] = useState('');
  const [paypalStep, setPaypalStep] = useState<'login' | 'review' | 'processing'>('login');

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  if (!isOpen) return null;

  // Handle Form Submission / Proceed to Payment
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address || !city || !zip) {
      alert('Por favor complete todos los campos de envío.');
      return;
    }

    if (method === 'athmovil') {
      if (!phone || phone.length < 7) {
        alert('Por favor ingrese un número de teléfono válido para ATH Móvil.');
        return;
      }
      // Start ATH Móvil push simulation
      setStep('ath_processing');
      
      // Simulate receipt of push notification after 3 seconds
      setTimeout(() => {
        // Trigger push notification pop-up state within the screen
      }, 1000);
    } else {
      // Start PayPal Simulator
      setStep('paypal_window');
      setPaypalStep('login');
      setPaypalEmail(email); // Autofill email for convenience
    }
  };

  // Simulate ATH Móvil approval
  const approveATHPayment = () => {
    setStep('ath_success');
    setTimeout(() => {
      onPurchaseSuccess(cartItems.map(item => item.id));
      onClose();
      resetForm();
    }, 4000);
  };

  // Simulate PayPal payment processing
  const processPayPalPayment = () => {
    setPaypalStep('processing');
    setTimeout(() => {
      setStep('paypal_success');
      setTimeout(() => {
        onPurchaseSuccess(cartItems.map(item => item.id));
        onClose();
        resetForm();
      }, 4000);
    }, 2000);
  };

  const resetForm = () => {
    setMethod('athmovil');
    setStep('form');
    setPhone('');
    setName('');
    setEmail('');
    setAddress('');
    setCity('');
    setZip('');
    setPaypalEmail('');
    setPaypalPassword('');
    setPaypalStep('login');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-sm"
        onClick={step === 'form' ? onClose : undefined} // Prevent closing during active transaction
      />

      {/* Main Container */}
      <div className="relative bg-brand-dark border border-brand-border/60 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-zoom-in z-10">
        
        {/* Close Button */}
        {step === 'form' && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-brand-light/60 hover:text-brand-gold hover:bg-brand-light/5 rounded-full transition-all duration-300"
          >
            <X size={20} />
          </button>
        )}

        {/* STEP 1: Billing & Shipping Form */}
        {step === 'form' && (
          <form onSubmit={handleSubmit} className="p-8 md:p-10">
            <h2 className="font-display text-2xl text-brand-light mb-1">Completar Pedido</h2>
            <p className="text-xs font-sans font-light text-brand-light/50 mb-6">
              Estás adquiriendo piezas de colección únicas. Completa tus datos para el envío.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column: Form Fields */}
              <div className="space-y-4">
                <h3 className="text-xs font-display uppercase tracking-widest text-brand-gold">
                  1. Dirección de Envío (PR / EE.UU.)
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-brand-light/60 mb-1">Nombre Completo</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. María Rivera" 
                      className="w-full bg-brand-darker/60 border border-brand-border/40 focus:border-brand-gold rounded-xl px-4 py-2.5 text-sm text-brand-light placeholder-brand-light/20 outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-brand-light/60 mb-1">Email</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="maria@correo.com" 
                      className="w-full bg-brand-darker/60 border border-brand-border/40 focus:border-brand-gold rounded-xl px-4 py-2.5 text-sm text-brand-light placeholder-brand-light/20 outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-brand-light/60 mb-1">Dirección Física o Postal</label>
                    <input 
                      type="text" 
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ej. Urb. Las Lomas, Calle 10 #123" 
                      className="w-full bg-brand-darker/60 border border-brand-border/40 focus:border-brand-gold rounded-xl px-4 py-2.5 text-sm text-brand-light placeholder-brand-light/20 outline-none transition-all duration-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-brand-light/60 mb-1">Pueblo / Ciudad</label>
                      <input 
                        type="text" 
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ej. San Juan" 
                        className="w-full bg-brand-darker/60 border border-brand-border/40 focus:border-brand-gold rounded-xl px-4 py-2.5 text-sm text-brand-light placeholder-brand-light/20 outline-none transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-brand-light/60 mb-1">Código Postal</label>
                      <input 
                        type="text" 
                        required
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        placeholder="Ej. 00926" 
                        className="w-full bg-brand-darker/60 border border-brand-border/40 focus:border-brand-gold rounded-xl px-4 py-2.5 text-sm text-brand-light placeholder-brand-light/20 outline-none transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Payment & Summary */}
              <div className="space-y-6 flex flex-col justify-between">
                
                {/* Payment Selection */}
                <div>
                  <h3 className="text-xs font-display uppercase tracking-widest text-brand-gold mb-4">
                    2. Método de Pago
                  </h3>
                  
                  <div className="space-y-3">
                    {/* ATH Movil */}
                    <div 
                      onClick={() => setMethod('athmovil')}
                      className={`relative flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all duration-300 ${method === 'athmovil' ? 'bg-brand-gold/10 border-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'bg-brand-darker/40 border-brand-border/30 hover:border-brand-border/60'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#e21a22] flex items-center justify-center font-bold text-white text-xs select-none">
                          ath
                        </div>
                        <div>
                          <p className="text-sm font-sans font-bold text-brand-light">ATH Móvil</p>
                          <p className="text-[10px] text-brand-light/40">Pago instantáneo con número de celular</p>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${method === 'athmovil' ? 'border-brand-gold' : 'border-brand-light/35'}`}>
                        {method === 'athmovil' && <div className="w-2 h-2 bg-brand-gold rounded-full" />}
                      </div>
                    </div>

                    {/* PayPal */}
                    <div 
                      onClick={() => setMethod('paypal')}
                      className={`relative flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all duration-300 ${method === 'paypal' ? 'bg-brand-gold/10 border-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'bg-brand-darker/40 border-brand-border/30 hover:border-brand-border/60'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#003087] flex items-center justify-center font-bold text-white text-xs select-none">
                          PP
                        </div>
                        <div>
                          <p className="text-sm font-sans font-bold text-brand-light">PayPal</p>
                          <p className="text-[10px] text-brand-light/40">Tarjeta de crédito o saldo PayPal</p>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${method === 'paypal' ? 'border-brand-gold' : 'border-brand-light/35'}`}>
                        {method === 'paypal' && <div className="w-2 h-2 bg-brand-gold rounded-full" />}
                      </div>
                    </div>
                  </div>

                  {/* ATH Móvil phone input (conditional) */}
                  {method === 'athmovil' && (
                    <div className="mt-4 animate-fade-in">
                      <label className="block text-[10px] uppercase tracking-wider text-brand-gold mb-1 font-semibold">
                        Número de Teléfono en ATH Móvil
                      </label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-light/40" />
                        <input 
                          type="tel" 
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Ej. (787) 555-1234" 
                          className="w-full bg-brand-darker/70 border border-brand-gold/40 focus:border-brand-gold rounded-xl pl-10 pr-4 py-2.5 text-sm text-brand-light placeholder-brand-light/20 outline-none transition-all duration-200"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Summary Box */}
                <div className="bg-brand-darker/40 border border-brand-border/30 rounded-2xl p-4 space-y-2 mt-4 text-xs">
                  <div className="flex justify-between text-brand-light/60">
                    <span>Artículos ({cartItems.length})</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-brand-light/60">
                    <span>Envío</span>
                    <span className="text-brand-gold">Gratis</span>
                  </div>
                  <div className="border-t border-brand-border/20 pt-2 flex justify-between font-display text-sm text-brand-light">
                    <span>Total a pagar</span>
                    <span className="text-brand-gold font-serif">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action button */}
                <button 
                  type="submit"
                  className="w-full py-4 bg-brand-gold hover:bg-brand-goldlight text-brand-dark font-sans font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(212,175,55,0.2)]"
                >
                  {method === 'athmovil' ? 'Pagar con ATH Móvil' : 'Pagar con PayPal'}
                  <ChevronRight size={16} />
                </button>
              </div>

            </div>
          </form>
        )}

        {/* STEP 2A: ATH Movil Processing Screen (Simulated) */}
        {step === 'ath_processing' && (
          <div className="p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
            
            {/* Simulated Mobile Notification */}
            <div className="w-full max-w-sm bg-black/90 border border-brand-gold/40 rounded-2xl p-4 mb-8 shadow-2xl flex items-center gap-3 text-left animate-bounce border-l-4 border-l-brand-gold">
              <div className="w-10 h-10 rounded-xl bg-[#e21a22] flex items-center justify-center font-bold text-white text-xs select-none shrink-0 shadow-[0_0_10px_rgba(226,26,34,0.3)]">
                ath
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase font-bold text-[#e21a22]">ATH Móvil</span>
                  <span className="text-[9px] text-brand-light/40">Ahora mismo</span>
                </div>
                <p className="text-xs font-bold text-brand-light">Cobro pendiente de: Cree en Tí</p>
                <p className="text-[11px] text-brand-light/60">Autoriza el pago por un total de ${subtotal.toFixed(2)}</p>
              </div>
            </div>

            <div className="w-16 h-16 bg-brand-gold/10 border border-brand-gold/30 rounded-full flex items-center justify-center mb-6">
              <Loader className="text-brand-gold animate-spin" size={28} />
            </div>

            <h3 className="font-display text-2xl text-brand-light mb-2">Esperando Aprobación</h3>
            <p className="text-sm font-sans font-light text-brand-light/60 max-w-md mb-8 leading-relaxed">
              Hemos enviado una notificación push de pago a tu aplicación de **ATH Móvil** asociada al teléfono <strong className="text-brand-gold">{phone}</strong>. Abre la app para confirmarlo.
            </p>

            {/* QR Code Alternative option */}
            <div className="border border-brand-border/40 bg-brand-darker/30 rounded-2xl p-6 w-full max-w-md flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-brand-sand">
                <QrCode size={16} className="text-brand-gold" />
                <span>¿No te llegó el push? Escanea este QR para pagar:</span>
              </div>
              
              {/* Simulated QR Code box */}
              <div className="w-36 h-36 bg-white p-3 rounded-xl flex items-center justify-center shadow-lg border border-brand-border/20">
                <svg viewBox="0 0 100 100" className="w-full h-full text-brand-dark">
                  {/* Outer border markers */}
                  <rect x="0" y="0" width="25" height="25" fill="currentColor" />
                  <rect x="2" y="2" width="21" height="21" fill="white" />
                  <rect x="6" y="6" width="13" height="13" fill="currentColor" />
                  
                  <rect x="75" y="0" width="25" height="25" fill="currentColor" />
                  <rect x="77" y="2" width="21" height="21" fill="white" />
                  <rect x="81" y="6" width="13" height="13" fill="currentColor" />

                  <rect x="0" y="75" width="25" height="25" fill="currentColor" />
                  <rect x="2" y="77" width="21" height="21" fill="white" />
                  <rect x="6" y="81" width="13" height="13" fill="currentColor" />

                  {/* Random pixels to simulate QR */}
                  <rect x="35" y="5" width="10" height="5" fill="currentColor" />
                  <rect x="45" y="15" width="5" height="10" fill="currentColor" />
                  <rect x="55" y="5" width="15" height="5" fill="currentColor" />
                  <rect x="65" y="15" width="5" height="15" fill="currentColor" />
                  
                  <rect x="30" y="30" width="20" height="10" fill="currentColor" />
                  <rect x="60" y="35" width="10" height="10" fill="currentColor" />
                  <rect x="35" y="50" width="15" height="5" fill="currentColor" />
                  <rect x="55" y="50" width="25" height="10" fill="currentColor" />

                  <rect x="30" y="65" width="10" height="20" fill="currentColor" />
                  <rect x="45" y="75" width="20" height="5" fill="currentColor" />
                  <rect x="70" y="75" width="10" height="15" fill="currentColor" />
                  <rect x="85" y="60" width="10" height="10" fill="currentColor" />

                  {/* Logo overlay */}
                  <rect x="40" y="40" width="20" height="20" fill="white" />
                  <rect x="43" y="43" width="14" height="14" fill="#e21a22" />
                </svg>
              </div>
              
              <button 
                onClick={approveATHPayment}
                className="py-3 px-8 bg-brand-gold hover:bg-brand-goldlight text-brand-dark font-sans font-bold uppercase tracking-widest text-xs rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              >
                Aprobar Simulación de Pago
              </button>
            </div>

            <div className="mt-8 text-[10px] text-brand-light/30 flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-brand-gold/40" />
              <span>Transacción certificada por ATH Móvil Business.</span>
            </div>

          </div>
        )}

        {/* STEP 2B: ATH Success Screen */}
        {step === 'ath_success' && (
          <div className="p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 bg-brand-gold/10 border-2 border-brand-gold rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.3)] animate-pulse">
              <CheckCircle2 className="text-brand-gold w-10 h-10" />
            </div>

            <h3 className="font-display text-3xl text-brand-light mb-3">¡Pago Autorizado!</h3>
            <p className="text-sm font-sans font-light text-brand-light/75 max-w-md leading-relaxed mb-6">
              El pago de <strong className="text-brand-gold">${subtotal.toFixed(2)}</strong> fue procesado con éxito a través de ATH Móvil. 
            </p>
            
            <div className="bg-brand-darker/60 border border-brand-border/40 rounded-2xl p-5 max-w-sm w-full text-xs text-left space-y-2">
              <div className="flex justify-between"><span className="text-brand-light/50">Comercio:</span> <span className="font-semibold text-brand-light">Cree en Tí Jewelry</span></div>
              <div className="flex justify-between"><span className="text-brand-light/50">Cliente:</span> <span className="text-brand-light">{name}</span></div>
              <div className="flex justify-between"><span className="text-brand-light/50">Teléfono:</span> <span className="text-brand-light">{phone}</span></div>
              <div className="flex justify-between"><span className="text-brand-light/50">Nº Confirmación:</span> <span className="font-mono text-brand-gold">ATH-9848012</span></div>
            </div>

            <p className="text-[11px] text-brand-sand italic mt-8 animate-pulse">
              Preparando tu orden exclusiva... Redirigiendo a la boutique.
            </p>
          </div>
        )}

        {/* STEP 3A: PayPal Window Simulator */}
        {step === 'paypal_window' && (
          <div className="p-8 min-h-[400px] flex flex-col justify-between bg-zinc-900 text-zinc-100 font-sans">
            
            {/* Header Simulator */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
              <div className="flex items-center gap-1">
                <span className="font-bold text-xl italic text-blue-500 font-serif">Pay</span>
                <span className="font-bold text-xl italic text-blue-400 font-serif">Pal</span>
              </div>
              <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Conexión Segura</span>
              </div>
            </div>

            {/* Login Step */}
            {paypalStep === 'login' && (
              <div className="space-y-5 flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                <h3 className="text-lg font-medium text-center text-zinc-100 mb-2">Pagar con PayPal</h3>
                
                <div className="space-y-3">
                  <input 
                    type="email" 
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    placeholder="Correo electrónico" 
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-blue-500"
                  />
                  <input 
                    type="password" 
                    value={paypalPassword}
                    onChange={(e) => setPaypalPassword(e.target.value)}
                    placeholder="Contraseña" 
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-blue-500"
                  />
                </div>

                <button 
                  onClick={() => setPaypalStep('review')}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-sm transition-all duration-200"
                >
                  Iniciar Sesión
                </button>
                <div className="text-center">
                  <a href="#" className="text-xs text-blue-400 hover:underline">¿Tiene problemas para iniciar sesión?</a>
                </div>
              </div>
            )}

            {/* Review Step */}
            {paypalStep === 'review' && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-3">Revisar Pago</h4>
                  
                  <div className="bg-zinc-800/80 border border-zinc-700/60 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <p className="text-sm font-bold text-zinc-200">Pagar a</p>
                        <p className="text-xs text-zinc-400">Cree en Tí Jewelry Inc.</p>
                      </div>
                      <span className="font-semibold text-zinc-100">${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-zinc-700/60 pt-3">
                      <p className="text-xs font-bold text-zinc-400 uppercase mb-1">Enviar a</p>
                      <p className="text-xs text-zinc-300">{name}</p>
                      <p className="text-xs text-zinc-400">{address}, {city}, {zip}</p>
                    </div>

                    <div className="border-t border-zinc-700/60 pt-3 flex justify-between items-center">
                      <div>
                        <p className="text-xs font-bold text-zinc-400 uppercase">Método de pago</p>
                        <p className="text-xs text-zinc-200">Visa terminada en •••• 4848</p>
                      </div>
                      <span className="text-xs text-zinc-400">Saldo PayPal ($0.00)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={processPayPalPayment}
                    className="w-full py-3.5 bg-[#ffc439] hover:bg-[#f4b82a] text-zinc-950 font-bold rounded-lg text-sm transition-all duration-200"
                  >
                    Completar Pago
                  </button>
                  <button 
                    onClick={() => setPaypalStep('login')}
                    className="w-full py-2 bg-transparent border border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-300 rounded-lg text-xs transition-all duration-200"
                  >
                    Cancelar y Volver
                  </button>
                </div>
              </div>
            )}

            {/* Processing Step */}
            {paypalStep === 'processing' && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <Loader className="text-blue-500 animate-spin mb-4" size={32} />
                <p className="text-sm text-zinc-400">Procesando transacción segura con PayPal...</p>
              </div>
            )}

            {/* Footer PayPal info */}
            <div className="text-[10px] text-zinc-500 border-t border-zinc-800 pt-3 text-center flex items-center justify-center gap-1">
              <ShieldCheck size={12} className="text-zinc-600" />
              <span>PayPal Inc. Todos los derechos reservados.</span>
            </div>
          </div>
        )}

        {/* STEP 3B: PayPal Success Screen */}
        {step === 'paypal_success' && (
          <div className="p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-pulse">
              <CheckCircle2 className="text-emerald-500 w-10 h-10" />
            </div>

            <h3 className="font-display text-3xl text-emerald-400 mb-3">¡Compra Confirmada!</h3>
            <p className="text-sm font-sans font-light text-brand-light/75 max-w-md leading-relaxed mb-6">
              Tu pago fue aprobado con éxito. Hemos enviado un recibo a tu correo <strong className="text-brand-gold">{email}</strong>.
            </p>
            
            <div className="bg-brand-darker/60 border border-brand-border/40 rounded-2xl p-5 max-w-sm w-full text-xs text-left space-y-2">
              <div className="flex justify-between"><span className="text-brand-light/50">Referencia PayPal:</span> <span className="font-mono text-brand-light">PP-SOL-89104</span></div>
              <div className="flex justify-between"><span className="text-brand-light/50">Monto Cobrado:</span> <span className="font-semibold text-brand-light">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-brand-light/50">Envío:</span> <span className="text-emerald-400">Gratuito Asegurado</span></div>
            </div>

            <p className="text-[11px] text-brand-sand italic mt-8 animate-pulse">
              Guardando el estado del inventario exclusivo...
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
