import { Sparkles, Video, FileText, Mail } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  id: string;
  label: string;
  faqs: FAQItem[];
}

interface Resource {
  icon: string;
  title: string;
  description: string;
  href: string;
}

interface FAQ5Props {
  title?: string;
  subtitle?: string;
  categories?: FAQCategory[];
  resources?: Resource[];
  showResources?: boolean;
}

export default function FAQ5({
  title = 'Frequently Asked Questions',
  subtitle = 'Get answers to common questions about our platform',
  categories = [
    {
      id: 'general',
      label: 'General',
      faqs: [
        {
          question: 'What makes your platform different?',
          answer: 'Our platform combines ease of use with powerful features. We focus on intuitive design, fast performance, and comprehensive integrations that save you time and increase productivity.'
        },
        {
          question: 'Do I need technical knowledge to use it?',
          answer: 'No! Our platform is designed for everyone. With drag-and-drop interfaces, pre-built templates, and step-by-step guides, you can get started in minutes without any coding knowledge.'
        },
        {
          question: 'Is there a free trial available?',
          answer: 'Yes! We offer a 14-day free trial with full access to all premium features. No credit card required. You can cancel anytime during the trial period.'
        },
        {
          question: 'What happens to my data if I cancel?',
          answer: 'Your data remains accessible for 30 days after cancellation. You can export all your data at any time. After 30 days, data is permanently deleted according to our privacy policy.'
        }
      ]
    },
    {
      id: 'pricing',
      label: 'Pricing & Plans',
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual Enterprise plans. All transactions are securely processed through our certified payment partners.'
        },
        {
          question: 'Can I change my plan later?',
          answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Upgrades take effect immediately with prorated billing. Downgrades apply at the end of your current billing cycle.'
        },
        {
          question: 'Do you offer discounts for annual plans?',
          answer: 'Yes! Annual plans come with a 20% discount compared to monthly billing. We also offer special pricing for nonprofits, educational institutions, and startups.'
        },
        {
          question: 'Is there a refund policy?',
          answer: 'We offer a 30-day money-back guarantee on all paid plans. If you are not satisfied, contact our support team within 30 days for a full refund, no questions asked.'
        }
      ]
    },
    {
      id: 'technical',
      label: 'Technical',
      faqs: [
        {
          question: 'What are the system requirements?',
          answer: 'Our platform works on all modern browsers (Chrome, Firefox, Safari, Edge). For the best experience, we recommend using the latest browser version. We also have native iOS and Android apps available.'
        },
        {
          question: 'Do you provide an API?',
          answer: 'Yes! All paid plans include access to our comprehensive REST API. We provide detailed documentation, SDKs for popular languages, and webhook support for real-time integrations.'
        },
        {
          question: 'How often do you release updates?',
          answer: 'We release minor updates and bug fixes weekly. Major feature updates are released monthly. All updates are automatic with zero downtime, and we always maintain backward compatibility.'
        },
        {
          question: 'What integrations do you support?',
          answer: 'We integrate with 100+ tools including Slack, Google Workspace, Microsoft 365, Salesforce, Zapier, and more. Premium plans also get access to custom integration capabilities via our API.'
        }
      ]
    },
    {
      id: 'security',
      label: 'Security',
      faqs: [
        {
          question: 'How do you protect my data?',
          answer: 'We use bank-level AES-256 encryption for data at rest and TLS 1.3 for data in transit. All servers are hosted in SOC 2 certified data centers with 24/7 monitoring, automated backups, and DDoS protection.'
        },
        {
          question: 'Are you GDPR and CCPA compliant?',
          answer: 'Yes, we are fully compliant with GDPR, CCPA, and other major privacy regulations. We have a dedicated Data Protection Officer and provide data processing agreements for Enterprise customers.'
        },
        {
          question: 'Do you conduct security audits?',
          answer: 'We perform quarterly internal security reviews and annual third-party penetration testing. We also participate in a responsible disclosure program and maintain an active bug bounty program.'
        },
        {
          question: 'Where is my data stored?',
          answer: 'Data is stored in geographically distributed data centers in the US and EU. Enterprise customers can choose their preferred data residency location. All data is encrypted and backed up daily.'
        }
      ]
    }
  ],
  resources = [
    {
      icon: 'Video',
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides to get started quickly',
      href: '#'
    },
    {
      icon: 'FileText',
      title: 'Documentation',
      description: 'Comprehensive guides and API references',
      href: '#'
    },
    {
      icon: 'Mail',
      title: 'Email Support',
      description: 'Get help from our support team within 24 hours',
      href: '#'
    }
  ],
  showResources = true
}: FAQ5Props) {
  const getResourceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video':
        return <Video className="h-6 w-6" />;
      case 'FileText':
        return <FileText className="h-6 w-6" />;
      case 'Mail':
        return <Mail className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Support Center
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* FAQ Tabs */}
        <div className="max-w-5xl mx-auto mb-16">
          <Tabs defaultValue={categories[0]?.id} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-gray-200 dark:border-gray-800 rounded-lg px-6 data-[state=open]:bg-gray-50 dark:data-[state=open]:bg-gray-900"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-5">
                        <span className="font-semibold text-base text-gray-900 dark:text-white pr-4">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 pt-2">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Resources Section */}
        {showResources && (
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Need more help?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explore our resources or get in touch with our team
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.href}
                  className="group flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-primary dark:hover:border-primary hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-4">
                    {getResourceIcon(resource.icon)}
                  </div>
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    {resource.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {resource.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
