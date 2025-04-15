'use client';

import { CartProvider } from "@/lib/CartContext";
import { CartConfirmationModal } from "@/components/CartConfirmationModal";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartConfirmationModal />
    </CartProvider>
  );
}