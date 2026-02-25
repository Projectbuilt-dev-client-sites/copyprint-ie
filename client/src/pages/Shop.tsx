import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, Upload, Check, X, Loader2, Package, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import businessCards1 from "@assets/heroes/business-cards-1.png";
import flyersLeaflets1 from "@assets/heroes/flyers-and-leaflets-1.png";
import posters1 from "@assets/heroes/posters-1.png";

const productImages: Record<string, string> = {
  "business-cards": businessCards1,
  "flyers-leaflets": flyersLeaflets1,
  "posters": posters1,
};

interface Price {
  id: string;
  unit_amount: number;
  currency: string;
  active: boolean;
  metadata: Record<string, string>;
}

interface Product {
  id: string;
  name: string;
  description: string;
  metadata: Record<string, string>;
  images: string[];
  prices: Price[];
}

interface CartItem {
  priceId: string;
  productName: string;
  priceName: string;
  unitAmount: number;
  quantity: number;
}

function formatPrice(amount: number) {
  return `€${(amount / 100).toFixed(2)}`;
}

function getPriceLabel(price: Price): string {
  const parts: string[] = [];
  if (price.metadata?.qty) parts.push(`Qty: ${price.metadata.qty}`);
  if (price.metadata?.size) parts.push(price.metadata.size);
  if (price.metadata?.print) parts.push(price.metadata.print);
  return parts.length > 0 ? parts.join(" · ") : formatPrice(price.unit_amount);
}

function getOptionsFromMetadata(metadata: Record<string, string>, key: string): string[] {
  const val = metadata?.[`options_${key}`];
  return val ? val.split(",").map(s => s.trim()) : [];
}

const optionLabels: Record<string, string> = {
  print: "Print Options",
  qty: "Quantity",
  size: "Size",
  finish: "Finish",
};

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (item: CartItem) => void }) {
  const optionKeys = Object.keys(product.metadata || {})
    .filter(k => k.startsWith("options_"))
    .map(k => k.replace("options_", ""));

  const optionValues: Record<string, string[]> = {};
  for (const key of optionKeys) {
    optionValues[key] = getOptionsFromMetadata(product.metadata, key);
  }

  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const key of optionKeys) {
      init[key] = optionValues[key]?.[0] || "";
    }
    return init;
  });

  const setSelection = (key: string, val: string) => {
    setSelections(prev => ({ ...prev, [key]: val }));
  };

  const matchingPrice = product.prices.find(p => {
    const m = p.metadata || {};
    for (const key of optionKeys) {
      if (selections[key] && m[key] && m[key] !== selections[key]) return false;
    }
    return true;
  });

  const priceRange = product.prices.length > 0
    ? `${formatPrice(Math.min(...product.prices.map(p => p.unit_amount)))} – ${formatPrice(Math.max(...product.prices.map(p => p.unit_amount)))}`
    : "Price on request";

  const serviceSlug = product.metadata?.slug;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" data-testid={`card-product-${product.id}`}>
      <div className="bg-gray-100 aspect-[4/3] flex items-center justify-center overflow-hidden">
        {serviceSlug && productImages[serviceSlug] ? (
          <Link href={`/services/${serviceSlug}`} className="w-full h-full">
            <img
              src={productImages[serviceSlug]}
              alt={`${product.name} printing at Copyprint.ie`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </Link>
        ) : (
          <Package className="w-12 h-12 text-gray-400" />
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1" data-testid={`text-product-name-${product.id}`}>{product.name}</h3>
        <p className="text-primary font-bold text-lg mb-3" data-testid={`text-product-price-${product.id}`}>{priceRange}</p>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed">{product.description}</p>

        <div className="space-y-3 mb-4">
          {optionKeys.map(key => (
            <div key={key}>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">{optionLabels[key] || key}</label>
              <div className="flex gap-2 flex-wrap">
                {(optionValues[key] || []).map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSelection(key, opt)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${selections[key] === opt ? "border-primary bg-primary/10 text-primary font-semibold" : "border-gray-200 text-gray-600"}`}
                    data-testid={`button-${key}-${opt.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {matchingPrice && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{getPriceLabel(matchingPrice)}</span>
              <span className="text-lg font-bold text-gray-900">{formatPrice(matchingPrice.unit_amount)}</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
          <Upload className="w-3.5 h-3.5" />
          <span>Upload artwork at checkout or email to info@copyprint.ie</span>
        </div>

        <Button
          className="w-full gap-2"
          disabled={!matchingPrice}
          onClick={() => {
            if (matchingPrice) {
              onAddToCart({
                priceId: matchingPrice.id,
                productName: product.name,
                priceName: getPriceLabel(matchingPrice),
                unitAmount: matchingPrice.unit_amount,
                quantity: 1,
              });
            }
          }}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          <ShoppingCart className="w-4 h-4" />
          {matchingPrice ? `Add to Cart - ${formatPrice(matchingPrice.unit_amount)}` : "Select Options"}
        </Button>
      </div>
    </div>
  );
}

function UploadArtworkBox() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isFormValid = name.trim() && email.trim() && tel.trim();

  async function handleSubmit() {
    if (!isFormValid) return;
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("phone", tel.trim());
      if (artworkFile) {
        formData.append("artwork", artworkFile);
      }
      const res = await fetch("/api/artwork-submit", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      toast({ title: "Artwork details submitted", description: "We'll be in touch shortly about your order." });
    } catch {
      toast({ title: "Submission failed", description: "Please try again or email info@copyprint.ie", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-green-200 p-5 text-center">
        <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
        <p className="text-sm font-semibold text-gray-900">Details submitted!</p>
        <p className="text-xs text-gray-500 mt-1">We'll contact you shortly about your artwork.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Upload className="w-4 h-4 text-primary" />
        Upload Artwork
      </h3>
      <p className="text-xs text-gray-500 mb-3">
        Enter your details and upload your print-ready file
      </p>

      <div className="space-y-2 mb-3">
        <div className="relative">
          <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Your name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            data-testid="input-artwork-name"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="email"
            placeholder="Email address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            data-testid="input-artwork-email"
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="tel"
            placeholder="Phone number *"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            data-testid="input-artwork-tel"
          />
        </div>
      </div>

      <label
        className={`flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-lg transition-all mb-3 ${
          isFormValid
            ? "border-gray-300 cursor-pointer hover:border-primary/50 hover:bg-primary/5"
            : "border-gray-200 cursor-not-allowed bg-gray-50"
        }`}
        data-testid="upload-artwork"
      >
        {artworkFile ? (
          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            <Check className="w-4 h-4" />
            {artworkFile.name}
          </div>
        ) : (
          <>
            <Upload className={`w-5 h-5 mb-1 ${isFormValid ? "text-gray-400" : "text-gray-300"}`} />
            <span className={`text-xs ${isFormValid ? "text-gray-500" : "text-gray-400"}`}>
              {isFormValid ? "Click to attach file (optional)" : "Fill in details above first"}
            </span>
          </>
        )}
        <input
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.ai,.eps,.tiff,.tif"
          disabled={!isFormValid}
          onChange={(e) => setArtworkFile(e.target.files?.[0] || null)}
          data-testid="input-artwork-file"
        />
      </label>

      <Button
        className="w-full gap-2"
        onClick={handleSubmit}
        disabled={!isFormValid || submitting}
        data-testid="button-submit-artwork"
      >
        {submitting ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
        ) : (
          <><ArrowRight className="w-4 h-4" /> Submit Details</>
        )}
      </Button>

      <p className="text-[11px] text-gray-400 mt-2 text-center">
        Or email artwork to <a href="mailto:info@copyprint.ie" className="text-primary hover:underline">info@copyprint.ie</a>
      </p>
    </div>
  );
}

function CartSidebar({ items, onUpdateQty, onRemove, onCheckout, isCheckingOut }: {
  items: CartItem[];
  onUpdateQty: (idx: number, qty: number) => void;
  onRemove: (idx: number) => void;
  onCheckout: () => void;
  isCheckingOut: boolean;
}) {
  const total = items.reduce((sum, item) => sum + item.unitAmount * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <ShoppingCart className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Your cart is empty</p>
          <p className="text-gray-400 text-xs mt-1">Select options and add items above</p>
        </div>
        <UploadArtworkBox />
      </div>
    );
  }

  return (
    <div className="space-y-4">
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2" data-testid="text-cart-title">
        <ShoppingCart className="w-5 h-5" />
        Cart ({items.length})
      </h3>

      <div className="space-y-3 mb-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0" data-testid={`cart-item-${idx}`}>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{item.productName}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.priceName}</p>
              <p className="text-sm font-bold text-primary mt-1">{formatPrice(item.unitAmount * item.quantity)}</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onUpdateQty(idx, Math.max(1, item.quantity - 1))}
                className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-500"
                data-testid={`button-qty-minus-${idx}`}
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-7 text-center text-sm font-medium">{item.quantity}</span>
              <button
                onClick={() => onUpdateQty(idx, item.quantity + 1)}
                className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-500"
                data-testid={`button-qty-plus-${idx}`}
              >
                <Plus className="w-3 h-3" />
              </button>
              <button
                onClick={() => onRemove(idx)}
                className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-red-400 ml-1"
                data-testid={`button-remove-${idx}`}
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">Total</span>
          <span className="text-xl font-bold text-gray-900" data-testid="text-cart-total">{formatPrice(total)}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">VAT included where applicable</p>
      </div>

      <Button
        className="w-full gap-2"
        size="lg"
        onClick={onCheckout}
        disabled={isCheckingOut}
        data-testid="button-checkout"
      >
        {isCheckingOut ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Redirecting to Stripe...
          </>
        ) : (
          <>
            Checkout <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>

      <p className="text-xs text-gray-400 text-center mt-3">
        Secure checkout powered by Stripe
      </p>
    </div>
    <UploadArtworkBox />
    </div>
  );
}

export default function Shop() {
  const [, setLocation] = useLocation();
  const [cart, setCart] = useState<CartItem[]>([]);

  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const success = searchParams.get('success') === 'true';
  const canceled = searchParams.get('canceled') === 'true';

  const { data, isLoading, error } = useQuery<{ data: Product[] }>({
    queryKey: ['/api/shop/products'],
  });

  const checkoutMutation = useMutation({
    mutationFn: async (items: CartItem[]) => {
      const res = await apiRequest('POST', '/api/shop/checkout', {
        items: items.map(i => ({ priceId: i.priceId, quantity: i.quantity })),
      });
      return await res.json();
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
  });

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.findIndex(i => i.priceId === item.priceId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { ...updated[existing], quantity: updated[existing].quantity + 1 };
        return updated;
      }
      return [...prev, item];
    });
  };

  const updateQty = (idx: number, qty: number) => {
    setCart(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], quantity: qty };
      return updated;
    });
  };

  const removeItem = (idx: number) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  };

  const products = data?.data || [];

  return (
    <div>
      <section className="relative bg-[#32373c] py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="flex-1 relative">
            <img src={businessCards1} alt="Business cards printing Dublin" className="absolute inset-0 w-full h-full object-cover opacity-25" />
          </div>
          <div className="flex-1 relative">
            <img src={flyersLeaflets1} alt="Flyers and leaflets printing Dublin" className="absolute inset-0 w-full h-full object-cover opacity-25" />
          </div>
          <div className="flex-1 relative hidden md:block">
            <img src={posters1} alt="Poster printing Dublin" className="absolute inset-0 w-full h-full object-cover opacity-25" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#32373c] via-[#32373c]/70 to-[#32373c]/50" />
        <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3" data-testid="text-shop-title">Shop Now</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Same Day Click & Collect · Bespoke Jobs Fast · Local or Nationwide Delivery
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3" data-testid="alert-success">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-green-800 font-semibold">Order placed successfully!</p>
              <p className="text-green-600 text-sm">Thank you for your order. We'll email you confirmation shortly. Please email your artwork to info@copyprint.ie</p>
            </div>
          </div>
        )}

        {canceled && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex items-center gap-3" data-testid="alert-canceled">
            <X className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            <div>
              <p className="text-yellow-800 font-semibold">Checkout canceled</p>
              <p className="text-yellow-600 text-sm">Your cart items are still saved. Continue shopping when you're ready.</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-2">Unable to load products right now.</p>
            <p className="text-gray-400 text-sm">Please try again in a moment.</p>
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="text-center py-20">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Products are being loaded. Please refresh in a moment.</p>
          </div>
        )}

        {products.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <p className="text-sm text-gray-500 mb-6" data-testid="text-product-count">Showing all {products.length} results</p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-36">
                <CartSidebar
                  items={cart}
                  onUpdateQty={updateQty}
                  onRemove={removeItem}
                  onCheckout={() => checkoutMutation.mutate(cart)}
                  isCheckingOut={checkoutMutation.isPending}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
