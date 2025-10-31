import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
  title = 'Frequently Asked Questions',
  description = 'Find answers to the most common questions',
  faqs = [
    {
      question: 'How does the free trial period work?',
      answer: 'We offer 14 days of free trial with no credit card required. You will have full access to all premium features during this period. After it ends, you can choose one of our plans or continue using the free version with limited features.'
    },
    {
      question: 'Can I cancel my subscription at any time?',
      answer: 'Yes! You can cancel your subscription at any time through your account settings. There are no cancellation fees and you will continue to have access to paid features until the end of the period that has already been paid for.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal and bank transfer for annual plans. All transactions are securely processed through certified platforms.'
    },
    {
      question: 'Do you offer discounts for non-profit organizations?',
      answer: 'Yes! We offer special discounts of up to 50% for non-profit and educational organizations. Contact our sales team with your organization\'s documentation for more information.'
    },
    {
      question: 'How does technical support work?',
      answer: 'We offer email support for all plans, with a response time of up to 24 hours. Professional and Enterprise plans include priority support with a 4-hour response time and access to live chat. We also have a complete knowledge base available 24/7.'
    },
    {
      question: 'Is it possible to upgrade or downgrade the plan?',
      answer: 'Yes, you can change your plan at any time. In case of upgrade, you will be charged proportionally for the difference. For downgrade, the adjustment will be applied at the next renewal. All changes can be easily made through the control panel.'
    }
  ]
}: FAQ1Props) {
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
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden data-[state=open]:border-primary dark:data-[state=open]:border-primary"
              >
                <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800 [&[data-state=open]>svg]:rotate-180">
                  <span className="font-semibold text-lg text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 pt-2">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Still have questions?{' '}
            <a href="#" className="text-primary font-medium hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
