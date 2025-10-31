import { HelpCircle, Plus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQ2Props {
  title?: string;
  description?: string;
  faqs?: FAQItem[];
  contactText?: string;
  contactLink?: string;
}

export default function FAQ2({
  title = 'Frequently Asked Questions',
  description = 'Everything you need to know about our product and services',
  faqs = [
    {
      question: 'How does the free trial work?',
      answer: 'You get 14 days of free access to all premium features. No credit card required. Cancel anytime during the trial period without being charged.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans.'
    },
    {
      question: 'Can I change my plan later?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we prorate any payments.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use bank-level encryption (AES-256) and are fully compliant with GDPR, SOC 2, and ISO 27001 standards.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee. If you are not satisfied with our service, contact us for a full refund.'
    },
    {
      question: 'How can I cancel my subscription?',
      answer: 'You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period.'
    }
  ],
  contactText = "Still have questions? Contact our support team",
  contactLink = "#"
}: FAQ2Props) {
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

        {/* FAQ Grid - 2 Columns */}
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg"
            >
              {/* Question with Icon */}
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white pt-1">
                  {faq.question}
                </h3>
              </div>

              {/* Answer */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed pl-14">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Plus className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {contactText}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our team is here to help you with any questions you may have
            </p>
            <a
              href={contactLink}
              className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
