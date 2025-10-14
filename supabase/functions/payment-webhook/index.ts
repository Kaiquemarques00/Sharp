import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const body = await req.json();

    console.log('Webhook received:', body);

    if (body.type === 'payment') {
      const paymentId = body.data.id;

      const MERCADO_PAGO_ACCESS_TOKEN = Deno.env.get('MERCADO_PAGO_ACCESS_TOKEN');

      if (!MERCADO_PAGO_ACCESS_TOKEN) {
        throw new Error('Mercado Pago access token not configured');
      }

      const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
        },
      });

      const payment = await paymentResponse.json();

      console.log('Payment details:', payment);

      if (payment.status === 'approved') {
        const externalReference = JSON.parse(payment.external_reference);
        const { userId, planId, billingCycle, price } = externalReference;

        const supabase = createClient(
          Deno.env.get('SUPABASE_URL')!,
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        );

        const { data: profile } = await supabase
          .from('profiles')
          .select('barbershop_id')
          .eq('id', userId)
          .maybeSingle();

        if (profile) {
          const expiresAt = new Date();
          if (billingCycle === 'mensal') {
            expiresAt.setMonth(expiresAt.getMonth() + 1);
          } else {
            expiresAt.setFullYear(expiresAt.getFullYear() + 1);
          }

          const { error } = await supabase
            .from('subscriptions')
            .insert({
              barbershop_id: profile.barbershop_id,
              plan_type: planId,
              billing_cycle: billingCycle,
              price: price,
              status: 'active',
              expires_at: expiresAt.toISOString(),
            });

          if (error) {
            console.error('Error creating subscription:', error);
          } else {
            console.log('Subscription created successfully');
          }
        }
      }
    }

    return new Response(
      JSON.stringify({ received: true }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Webhook error:', error);

    return new Response(
      JSON.stringify({
        error: error.message || 'Webhook processing error'
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