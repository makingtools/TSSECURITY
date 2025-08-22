export interface QuoteItem {
  item: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface TelegramNotificationStatus {
  sent: boolean;
  reason?: 'not_configured' | 'api_error' | 'backend_connection_error';
  message?: string;
}

export interface Quote {
  id: string;
  items: QuoteItem[];
  subtotal: number;
  total: number;
  competitor_total?: number;
  client_name?: string;
  client_phone?: string;
  client_email?: string;
  telegram_notification_status?: TelegramNotificationStatus;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  quote?: Quote;
  status?: 'thinking' | 'generating_quote' | null;
  context?: string;
  file?: { name: string; type: string; };
  filePreview?: string;
}

export interface Project {
  id: number;
  client: string;
  title: string;
  category: string;
  imageUrl: string;
  challenge: string;
  solution: string;
  results: {
    icon: string;
    text: string;
  }[];
}

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

export type AIStatus = 'idle' | 'thinking' | 'generating_quote';