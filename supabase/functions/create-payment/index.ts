import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface PaymentRequest {
  planId: string;
  billingCycle: string;
  price: number;
  userId: string;
  email: string;
  fullName: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { planId, billingCycle, price, userId, email, fullName }: PaymentRequest = await req.json();

    const MERCADO_PAGO_ACCESS_TOKEN = Deno.env.get('MERCADO_PAGO_ACCESS_TOKEN');

    if (!MERCADO_PAGO_ACCESS_TOKEN) {
      throw new Error('Mercado Pago access token not configured');
    }

    const description = `SharpBook - Plano ${planId.charAt(0).toUpperCase() + planId.slice(1)} (${billingCycle})`;

    const preferenceData = {
      items: [
        {
          title: description,
          description: description,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: price,
        },
      ],
      payer: {
        email: email,
        name: fullName,
      },
      back_urls: {
        success: `${req.headers.get('origin')}/payment/success`,
        failure: `${req.headers.get('origin')}/payment/failure`,
        pending: `${req.headers.get('origin')}/payment/pending`,
      },
      auto_return: 'approved',
      external_reference: JSON.stringify({
        userId,
        planId,
        billingCycle,
        price,
      }),
      notification_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/payment-webhook`,
      statement_descriptor: 'SHARPBOOK',
      payment_methods: {
        excluded_payment_types: [],
        installments: billingCycle === 'anual' ? 12 : 1,
      },
    };

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preferenceData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Mercado Pago API error: ${errorText}`);
    }

    const preference = await response.json();

    return new Response(
      JSON.stringify({
        preferenceId: preference.id,
        initPoint: preference.init_point,
        sandboxInitPoint: preference.sandbox_init_point,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error creating payment:', error);

    return new Response(
      JSON.stringify({
        error: error.message || 'Erro ao criar pagamento'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});