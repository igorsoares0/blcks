'use client';

import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQ1Props {
  title?: string;
  description?: string;
  faqs?: FAQItem[];
}

export default function FAQ1({
  title = 'Perguntas Frequentes',
  description = 'Encontre respostas para as dúvidas mais comuns',
  faqs = [
    {
      question: 'Como funciona o período de teste gratuito?',
      answer: 'Oferecemos 14 dias de teste gratuito sem necessidade de cartão de crédito. Você terá acesso completo a todos os recursos premium durante este período. Após o término, você pode escolher um dos nossos planos ou continuar usando a versão gratuita com recursos limitados.'
    },
    {
      question: 'Posso cancelar minha assinatura a qualquer momento?',
      answer: 'Sim! Você pode cancelar sua assinatura a qualquer momento através das configurações da sua conta. Não há taxas de cancelamento e você continuará tendo acesso aos recursos pagos até o final do período que já foi pago.'
    },
    {
      question: 'Quais formas de pagamento são aceitas?',
      answer: 'Aceitamos todos os principais cartões de crédito (Visa, Mastercard, American Express), PayPal e transferência bancária para planos anuais. Todas as transações são processadas de forma segura através de plataformas certificadas.'
    },
    {
      question: 'Vocês oferecem desconto para organizações sem fins lucrativos?',
      answer: 'Sim! Oferecemos descontos especiais de até 50% para organizações sem fins lucrativos e educacionais. Entre em contato com nossa equipe de vendas com a documentação da sua organização para obter mais informações.'
    },
    {
      question: 'Como funciona o suporte técnico?',
      answer: 'Oferecemos suporte por email para todos os planos, com tempo de resposta de até 24 horas. Planos Professional e Enterprise incluem suporte prioritário com tempo de resposta de 4 horas e acesso a chat ao vivo. Também temos uma base de conhecimento completa disponível 24/7.'
    },
    {
      question: 'É possível fazer upgrade ou downgrade do plano?',
      answer: 'Sim, você pode alterar seu plano a qualquer momento. No caso de upgrade, você será cobrado proporcionalmente pela diferença. Para downgrade, o ajuste será aplicado na próxima renovação. Todas as alterações podem ser feitas facilmente através do painel de controle.'
    }
  ]
}: FAQ1Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden transition-all duration-200 hover:border-primary dark:hover:border-primary"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="font-semibold text-lg text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
                    {openIndex === index ? (
                      <Minus className="h-5 w-5 text-primary" />
                    ) : (
                      <Plus className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Ainda tem dúvidas?{' '}
            <a href="#" className="text-primary font-medium hover:underline">
              Entre em contato conosco
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
