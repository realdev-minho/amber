import { OrderSuccessClient } from "./OrderSuccessClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Order #${id} Confirmed — Amber`,
    description: "Thank you for shopping with Amber. Your order is confirmed.",
  };
}

export default async function OrderSuccessPage({ params }: PageProps) {
  const { id } = await params;
  return <OrderSuccessClient orderId={id} />;
}
