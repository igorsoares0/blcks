import { MessageCircle, ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQ3Props {
  title?: string;
  description?: string;
  faqs?: FAQItem[];
  supportText?: string;
  supportEmail?: string;
}

export default function FAQ3({
  title = 'Got questions? We have answers',
  description = 'Find answers to the most commonly asked questions about our product',
  faqs = [
    {
      question: 'What is included in the free trial?',
      answer: 'The free trial includes full access to all premium features for 14 days. You can explore unlimited projects, advanced analytics, priority support, and all integrations without any restrictions. No credit card required to start.',
      category: 'Pricing'
    },
    {
      question: 'How do I upgrade or downgrade my plan?',
      answer: 'You can change your plan anytime from your account settings. Go to Settings > Billing > Change Plan. Upgrades take effect immediately, and downgrades apply at the end of your current billing cycle. All changes are prorated automatically.',
      category: 'Billing'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes, absolutely. We use bank-level AES-256 encryption for all data at rest and in transit. We are SOC 2 Type II certified, GDPR compliant, and ISO 27001 certified. Your data is stored in secure data centers with regular backups and 99.9% uptime SLA.',
      category: 'Security'
    },
    {
      question: 'Can I integrate with other tools?',
      answer: 'Yes! We offer native integrations with over 50 popular tools including Slack, Google Workspace, Microsoft Teams, Salesforce, and more. We also provide a robust REST API and webhooks for custom integrations. Check our integrations page for the full list.',
      category: 'Integrations'
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'We provide multiple support channels: email support for all users (24-hour response time), live chat for Pro and Enterprise plans (available 9am-6pm EST), priority support with dedicated account managers for Enterprise, and extensive documentation, video tutorials, and community forum for self-service help.',
      category: 'Support'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel anytime without penalties. Your subscription remains active until the end of your billing period, and you will not be charged again. All your data remains accessible during this time. You can also export all your data before canceling.',
      category: 'Billing'
    }
  ],
  supportText = 'Still need help?',
  supportEmail = 'support@example.com'
}: FAQ3Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
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

        {/* FAQ List - Single Column with Categories */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-primary dark:hover:border-primary transition-all duration-300"
            >
              <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                <div className="flex items-start gap-4 flex-1">
                  {faq.category && (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary shrink-0">
                      {faq.category}
                    </span>
                  )}
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-500 shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 pt-2">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed pl-0 md:pl-20">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        {/* Support CTA */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 rounded-xl p-8 border border-primary/20 dark:border-primary/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center shrink-0">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {supportText}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our support team is ready to assist you
                  </p>
                </div>
              </div>
              <a
                href={`mailto:${supportEmail}`}
                className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 whitespace-nowrap"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
