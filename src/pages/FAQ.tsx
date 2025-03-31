
import { Helmet } from 'react-helmet-async';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

const FAQ = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>FAQ | Eksejabula</title>
      </Helmet>
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-medium mb-6">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-8">
          Find answers to the most common questions about our products, orders, shipping, and more.
        </p>
        
        <Card className="p-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How long does shipping take?</AccordionTrigger>
              <AccordionContent>
                Standard shipping within South Africa takes 3-5 business days. International shipping typically takes 7-14 business days, depending on the destination and customs processing.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>What sizes do your jerseys come in?</AccordionTrigger>
              <AccordionContent>
                Our jerseys are available in sizes XS, S, M, L, XL, and XXL. Please refer to our size guide for detailed measurements to find your perfect fit.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
              <AccordionContent>
                Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location. You can view the shipping options available for your country during checkout.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                We accept returns within 30 days of purchase. Items must be unworn, unwashed, and in their original packaging with tags attached. Please visit our Returns & Refunds page for more details.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>How do I care for my jersey?</AccordionTrigger>
              <AccordionContent>
                We recommend washing your jersey inside out in cold water with similar colors. Air dry or tumble dry on low heat. Do not bleach or iron directly on prints.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger>Are your products sustainable?</AccordionTrigger>
              <AccordionContent>
                We are committed to sustainability and ethical production. Our jerseys are made using eco-friendly materials and processes. We continuously work to reduce our environmental impact throughout our supply chain.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7">
              <AccordionTrigger>Can I track my order?</AccordionTrigger>
              <AccordionContent>
                Yes, once your order ships, you will receive a confirmation email with tracking information. You can also log in to your account to view your order status.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8">
              <AccordionTrigger>Do you offer wholesale or bulk discounts?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer wholesale pricing for bulk orders. Please contact our customer service team at wholesale@eksejabula.co.za for more information.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
        
        <p className="mt-8 text-center text-muted-foreground">
          Still have questions? <a href="/contact" className="underline font-medium">Contact our support team</a>.
        </p>
      </div>
    </div>
  );
};

export default FAQ;
