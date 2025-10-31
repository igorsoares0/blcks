import { Search, BookOpen, Zap, Shield, CreditCard } from 'lucide-react';
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

interface FAQCategory {
  title: string;
  icon: string;
  faqs: FAQItem[];
}

interface FAQ4Props {
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  categories?: FAQCategory[];
}

export default function FAQ4({
  title = 'How can we help you?',
  description = 'Search our FAQ for answers to anything you might ask',
  searchPlaceholder = 'Search for answers...',
  categories = [
    {
      title: 'Getting Started',
      icon: 'BookOpen',
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click the "Sign Up" button in the top right corner. Enter your email, create a password, and verify your email address. You will be guided through a quick onboarding process to set up your profile.'
        },
        {
          question: 'What are the system requirements?',
          answer: 'Our platform works on all modern browsers (Chrome, Firefox, Safari, Edge) on desktop and mobile. We recommend using the latest version of your browser for the best experience. No downloads or installations required.'
        },
        {
          question: 'Is there a mobile app?',
          answer: 'Yes! We have native iOS and Android apps available on the App Store and Google Play. The mobile apps offer the same features as the web version with an optimized mobile experience.'
        }
      ]
    },
    {
      title: 'Features',
      icon: 'Zap',
      faqs: [
        {
          question: 'What features are included in each plan?',
          answer: 'Our Free plan includes basic features for individuals. Pro plan adds advanced analytics, priority support, and team collaboration. Enterprise includes everything plus custom integrations, dedicated support, and SLA guarantees.'
        },
        {
          question: 'Can I try features before upgrading?',
          answer: 'Yes! We offer a 14-day free trial of our Pro plan with full access to all premium features. No credit card required. You can downgrade to Free at any time without losing your data.'
        },
        {
          question: 'How do integrations work?',
          answer: 'We offer one-click integrations with popular tools like Slack, Google Drive, Dropbox, and more. Connect your accounts in Settings > Integrations. Premium plans also get access to our REST API for custom integrations.'
        }
      ]
    },
    {
      title: 'Billing',
      icon: 'CreditCard',
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and ACH transfers for annual Enterprise plans. All payments are processed securely through Stripe.'
        },
        {
          question: 'Can I change my plan at any time?',
          answer: 'Absolutely! You can upgrade or downgrade your plan anytime from your account settings. Upgrades take effect immediately. Downgrades apply at the end of your current billing cycle, and we prorate all charges.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'Yes, we offer a 30-day money-back guarantee on all paid plans. If you are not satisfied for any reason, contact our support team within 30 days of your purchase for a full refund.'
        }
      ]
    },
    {
      title: 'Security',
      icon: 'Shield',
      faqs: [
        {
          question: 'How do you protect my data?',
          answer: 'We use industry-standard AES-256 encryption for data at rest and TLS 1.3 for data in transit. All our servers are hosted in SOC 2 certified data centers with 24/7 monitoring and regular security audits.'
        },
        {
          question: 'Are you GDPR compliant?',
          answer: 'Yes, we are fully GDPR compliant. We have a dedicated Data Protection Officer, provide data processing agreements, and respect all data subject rights including the right to be forgotten.'
        },
        {
          question: 'Do you perform security audits?',
          answer: 'We conduct quarterly internal security audits and annual third-party penetration testing. We also participate in a responsible disclosure program and offer bug bounties for security researchers.'
        }
      ]
    }
  ]
}: FAQ4Props) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactElement> = {
      BookOpen: <BookOpen className="h-5 w-5" />,
      Zap: <Zap className="h-5 w-5" />,
      CreditCard: <CreditCard className="h-5 w-5" />,
      Shield: <Shield className="h-5 w-5" />,
    };
    return icons[iconName] || <BookOpen className="h-5 w-5" />;
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            {description}
          </p>

          {/* Search Bar (visual only) */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* FAQ Categories Grid */}
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
          {categories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                  {getIcon(category.icon)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              {/* FAQ Accordion */}
              <Accordion type="single" collapsible className="w-full">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`item-${categoryIndex}-${faqIndex}`}
                    className="border-b border-gray-200 dark:border-gray-700 last:border-0"
                  >
                    <AccordionTrigger className="text-left text-base font-semibold text-gray-900 dark:text-white hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-8 border border-primary/20">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Contact Support
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 h-11 px-8"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
